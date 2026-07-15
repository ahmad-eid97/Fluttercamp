import { headers } from 'next/headers';
import Cookies from 'universal-cookie';
//= Translations
import en from './en.json';
import ar from './ar.json';

export default async function getDictionary() {
  const cookie = (await headers()).get('cookie');
  const cookies = new Cookies(cookie, { path: '/' });
  const locale = cookies.get('fluttercamp-locale');

  if (!locale) cookies.set('fluttercamp-locale', 'ar', { path: '/' });

  const translations = (locale || 'ar') === 'ar' ? ar : en;
  return { translations, locale };
}