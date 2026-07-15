'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import { Icon } from '@iconify/react';
import ViewMessageModal from './ViewMessageModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { getDashboardQuickInfo } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale, NoticeItem } from '@/types';
//= Styles
import cls from './noticeboard.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['dashboard']['noticeboard'];
}

function Noticeboard({ translations, locale }: Props) {
  const { data: info, isLoading } = useRequest(getDashboardQuickInfo);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  function handleOpenModal(notice: NoticeItem) {
    setSelectedNotice(notice);
    setOpen(true);
  }

  return (
    <div className={`${cls.noticeboard} ${locale === 'ar' ? cls.ar : ''}`}>
      <h2>{translations.title}</h2>
      <div className={cls.content}>
        {
          !isLoading && info && info.unread_noticeboards.length ?
            info.unread_noticeboards.map((notice, i) => (
              <div className={cls.notice} key={i}>
                <div>
                  <p className={cls.title}>{notice.title}</p>
                  <div>
                    <p>
                      {translations.for} {notice.type} | {translations.createdBy} <Link href={`/user/${notice.instructor_id}`}>{notice.sender}</Link>
                      <br />
                      <span><Icon icon='wi:time-2' /> {format(new Date(+notice.created_at * 1000), "dd MMM yyyy - hh:mm a", { locale: locale === 'ar' ? ar : enUS })}</span>
                    </p>
                  </div>
                </div>
                <button title={translations.viewMessage} onClick={() => handleOpenModal(notice)}><Icon icon='carbon:view-filled' /></button>
              </div>
            ))
            :
            (isLoading ?
              <>
                <LoadingSkeleton width="100%" height="45px" rounded />
                <LoadingSkeleton width="100%" height="45px" rounded />
                <LoadingSkeleton width="100%" height="45px" rounded />
              </>
              :
              <p className={cls.noData}>
                {locale === 'ar' ? 'لا توجد إشعارات بعد' : 'There are no notices yet'}
              </p>)
        }
      </div>
      {
        open && selectedNotice &&
        <ViewMessageModal
          locale={locale}
          notice={selectedNotice}
          setOpen={setOpen}
          translations={translations}
        />
      }
    </div>
  )
}

export default Noticeboard;