export type Locale = 'en' | 'ar';

export interface I18nValue {
  __i18n: true;
  en: string;
  ar: string;
}

/** Mark a string as localized. The adapter collapses it to the request locale. */
export const t = (en: string, ar: string): any => ({ __i18n: true, en, ar });

/**
 * Extract a searchable plain string from a value that may be a `t()` marker.
 * Returns both languages joined so search matches either. Use in handlers that
 * filter/sort on localized fields BEFORE the adapter's localize() pass runs.
 */
export function txt(v: any): string {
  if (v && v.__i18n) return `${v.en} ${v.ar}`;
  return v == null ? '' : String(v);
}

/**
 * Deep-clone `value`, collapsing every `t(en, ar)` marker to the locale string.
 * Runs once per response in the adapter, so handlers/seed stay locale-agnostic.
 * Uses a WeakMap to handle shared references and cycles in the seed graph.
 */
export function localize<T>(value: T, locale: Locale): T {
  return walk(value, locale, new WeakMap());
}

function walk(value: any, locale: Locale, cache: WeakMap<object, any>): any {
  if (value == null || typeof value !== 'object') return value;
  if (value.__i18n) return value[locale] ?? value.en;
  if (cache.has(value)) return cache.get(value);

  if (Array.isArray(value)) {
    const arr: any[] = [];
    cache.set(value, arr);
    for (const v of value) arr.push(walk(v, locale, cache));
    return arr;
  }

  const out: any = {};
  cache.set(value, out);
  for (const k in value) out[k] = walk(value[k], locale, cache);
  return out;
}
