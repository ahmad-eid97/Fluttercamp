import type { MockResult } from '@/mocks/lib/envelope';

export interface Ctx {
  method: string;
  /** Normalized pathname (no /api/development prefix, no query string). */
  pathname: string;
  query: URLSearchParams;
  params: Record<string, string>;
  body: any;
  token: string | null;
  /** Current user id decoded from a `mock-token-<id>` bearer token. */
  userId: number | null;
  /** Request locale from the `x-locale` header. */
  locale: 'en' | 'ar';
}

export type Handler = (ctx: Ctx) => MockResult | Promise<MockResult>;
