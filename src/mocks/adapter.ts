import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { matchRoute, fallback } from './router';
import { delay } from './lib/latency';
import { ok } from './lib/envelope';
import { localize, type Locale } from './lib/i18n';
import type { Ctx } from './handlers/types';

function readHeader(headers: any, name: string): string | undefined {
  if (!headers) return undefined;
  if (typeof headers.get === 'function') {
    const v = headers.get(name);
    if (v) return String(v);
  }
  return headers[name] || headers[name.toLowerCase()];
}

function parseBody(data: any): any {
  if (data == null) return {};
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  // FormData (browser or Node)
  if (typeof data === 'object' && typeof data.forEach === 'function' && typeof data.append === 'function') {
    const obj: Record<string, any> = {};
    (data as FormData).forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  return data;
}

function decodeUserId(authHeader?: string): number | null {
  if (!authHeader) return null;
  const m = /mock-token-(\d+)/.exec(authHeader);
  return m ? Number(m[1]) : null;
}

/**
 * Axios adapter that fully replaces the HTTP transport with the in-app mock
 * backend. Installed on the single `axios.create(...)` in src/utils/axios.ts, so
 * it covers both the normal and the with-token clients, on the server and the
 * client, with zero changes to the 70+ API modules.
 */
export const mockAdapter: AxiosAdapter = async (config: InternalAxiosRequestConfig) => {
  const method = (config.method ?? 'get').toUpperCase();
  const raw = config.url ?? '';

  // Build an absolute URL so pathname/search parse uniformly, whether the
  // endpoint was relative (`/courses`) or absolute (payment verify URL).
  let url: URL;
  if (/^https?:\/\//i.test(raw)) {
    url = new URL(raw);
  } else {
    const base = config.baseURL || 'http://mock.local';
    url = new URL((raw.startsWith('/') ? raw : '/' + raw), base.endsWith('/') ? base : base + '/');
  }

  const pathname = url.pathname.replace(/^\/api\/development/, '') || '/';
  const authHeader = readHeader(config.headers, 'Authorization');
  const localeHeader = (readHeader(config.headers, 'x-locale') || 'en').toLowerCase();
  const locale: Locale = localeHeader.startsWith('ar') ? 'ar' : 'en';

  const ctx: Ctx = {
    method,
    pathname,
    query: url.searchParams,
    params: {},
    body: parseBody(config.data),
    token: authHeader ? authHeader.replace(/^Bearer\s+/i, '') : null,
    userId: decodeUserId(authHeader),
    locale,
  };

  const handler = matchRoute(ctx) ?? fallback(ctx);

  await delay();

  let result;
  try {
    result = await handler(ctx);
  } catch (err: any) {
    result = { status: 200, envelope: ok(null, err?.message || 'Mock handler error') };
  }

  // Collapse every t(en, ar) marker in the payload to the request locale.
  if (result?.envelope?.data != null) {
    result.envelope.data = localize(result.envelope.data, locale);
  }

  // Always resolve with HTTP 200; the envelope's `success` flag carries the
  // semantics, exactly like the real Laravel backend.
  return {
    data: result.envelope,
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  } as AxiosResponse;
};
