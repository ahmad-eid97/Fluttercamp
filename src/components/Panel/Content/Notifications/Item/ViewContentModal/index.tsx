'use client';
import React from 'react';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Types
import { Locale, SingleNotification } from '@/types';
//= Styles
import cls from './view_content_modal.module.scss';

type Props = {
  notification: SingleNotification;
  locale: Locale;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

function ViewContentModal({ notification, locale, setIsShown }: Props) {
  function hideModal(event: React.MouseEvent<HTMLDivElement>) {
    // @ts-ignore
    if (event.target.className === cls.view_content_modal) setIsShown(false)
  }

  return (
    <div className={cls.view_content_modal} onClick={hideModal}>
      <div className={cls.content}>
        <h4>{notification.title} <span>({format(new Date(+notification.created_at * 1000).getTime(), 'dd MMMM yyyy | hh:mm a', { locale: locale === 'ar' ? ar : enUS })})</span></h4>
        <p dangerouslySetInnerHTML={{ __html: notification.message }} />
      </div>
    </div>
  )
}

export default ViewContentModal