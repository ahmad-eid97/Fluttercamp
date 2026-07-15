import type { Locale } from "@/i18n.config";

export function translationsHandler<T extends Record<string, any>>(translations: T[], locale: Locale) {
  if (!translations) return {} as T;
  return translations.find(translation => translation.locale === locale) || {} as T;
}