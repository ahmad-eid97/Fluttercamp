'use client';
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
//= Components
import { Icon } from '@iconify/react';
//= Types
import type { Dictionary, Locale, RootState } from '@/types';
//= Styles
import cls from './welcome-box.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['dashboard']['welcomeBox'];
}


function WelcomeBox({ translations, locale }: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  // user comes from client-only Redux state — gate so the server and first client
  // render match (avoids a name hydration mismatch on the dashboard).
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div className={`${cls.box} ${locale === 'ar' ? cls.ar : ''}`}>
      <div className={cls.left_side}>
        <h1>{translations.hi} {mounted ? user?.fullname : ''}</h1>
        <div className={cls.buttons}>
          <Link href={`/panel/financial/${mounted && user?.role === 'teacher' ? 'sales' : 'summary'}`}>
            <Icon icon='mdi:report-box' /> {translations.checkReports}
          </Link>
          <Link href='/panel/notifications'>
            <Icon icon='clarity:event-solid' /> {translations.viewEvents}
          </Link>
        </div>
      </div>
      <div className={cls.right_side}>
        <img src="/imgs/panel/panel/welcome.svg" alt="panel" />
      </div>
    </div>
  )
}

export default WelcomeBox;