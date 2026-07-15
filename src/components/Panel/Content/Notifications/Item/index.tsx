'use client';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import Tooltip from '@mui/material/Tooltip';
import ViewContentModal from './ViewContentModal';
//= Api
import { markNotificationAsRead } from '@/api';
//= Types
import type { Dictionary, Locale, SingleNotification } from '@/types';
//= Styles
import cls from './notification.module.scss';

type Props = {
  locale: Locale;
  notification: SingleNotification;
  translations: Dictionary['panel']['notifications'];
}

function NotificationItem({ notification, locale, translations }: Props) {
  const [isShown, setIsShown] = useState(false);
  const [controlledNotification, setNotification] = useState<SingleNotification>(notification);

  async function markAsRead() {
    const response = await markNotificationAsRead(notification.id);
    if (response && response.success) {
      setNotification(p => ({ ...p, read: true }));
    }
  }

  return (
    <>
      <Tooltip
        title={controlledNotification.status === 'read' ? '' : translations.markAsRead}
        placement="top"
      >
        <div className={`${cls.item} ${controlledNotification.status === 'read' ? cls.read : ''}`}>
          <div className={cls.title} onClick={markAsRead}>
            <p>{controlledNotification.title}</p>
            <span>{format(new Date(+controlledNotification.created_at * 1000).getTime(), 'dd MMM yyyy | hh:mm a', { locale: locale === 'ar' ? ar : enUS })}</span>
          </div>
          <div onClick={markAsRead} className={cls.content} dangerouslySetInnerHTML={{ __html: controlledNotification.message }} />
          <div className={cls.action}>
            <button onClick={() => setIsShown(true)}>{translations.view}</button>
          </div>
        </div>
      </Tooltip>
      {
        isShown &&
        <ViewContentModal
          locale={locale}
          notification={controlledNotification}
          setIsShown={setIsShown}
        />
      }
    </>
  )
}

export default NotificationItem