'use client';
import { usePathname } from 'next/navigation';
//= Translations
import en from './en.json';
import ar from './ar.json';

export default function useDictionary() {
  const locale = usePathname().split('/')[1];
  const translations = locale === 'ar' ? ar : en;
  return { translations, locale };
}
