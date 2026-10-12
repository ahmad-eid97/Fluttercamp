'use client';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//== Modules
import Cookies from 'universal-cookie';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from './style.module.scss';

const LANGS = [
  { code: 'ar', label: 'العربية', short: 'ع', flag: '/imgs/locales/ksa.webp' },
  { code: 'en', label: 'English', short: 'EN', flag: '/imgs/locales/en.png' },
];

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale } = useDictionary();
  const pathName = usePathname();
  const cookies = useMemo(() => new Cookies(), []);

  function switchLang(next: string) {
    const segments = pathName.split('/');
    cookies.set('fluttercamp-locale', next, { path: '/' });
    segments[1] = next;
    window.location.pathname = segments.join('/');
  }

  const current = LANGS.find((l) => l.code === locale) || LANGS[0];

  return (
    <div className={`${cls.lang_switcher} ${compact ? cls.compact : ''}`}>
      {/* modal={false} → no scroll-lock, avoids the scrollbar-compensation layout shift */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button type="button" className={cls.trigger} aria-label="Language">
            <Icon icon="solar:global-linear" className={cls.globe} />
            <span className={cls.code}>{current.short}</span>
            <Icon icon="solar:alt-arrow-down-linear" className={cls.chev} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={12} className={cls.dropdown}>
          <div className={cls.menu_content}>
            <p className={cls.menuTitle}>{locale === 'ar' ? 'اختر اللغة' : 'Select language'}</p>
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => switchLang(l.code)}
                className={`${cls.item} ${locale === l.code ? cls.active : ''}`}
              >
                <span className={cls.flag}>
                  <img src={l.flag} alt="" />
                </span>
                <span className={cls.name}>{l.label}</span>
                {locale === l.code && <Icon icon="solar:check-circle-bold" className={cls.check} />}
              </button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default LanguageSwitcher;
