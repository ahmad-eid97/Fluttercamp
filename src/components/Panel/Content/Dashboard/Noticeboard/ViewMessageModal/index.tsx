'use client';
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import { Icon } from '@iconify/react';
import Modal from '@/components/UIs/Modal';
//= Types
import type { Dictionary, Locale, NoticeItem } from '@/types';
//= Styles
import cls from './modal.module.scss';

type Props = {
  locale: Locale;
  notice: NoticeItem;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['dashboard']['noticeboard'];
}

function ViewNotice({ locale, notice, setOpen, translations }: Props) {

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.modal}>
        <div className={cls.head}>
          <h4>{translations.viewNotice}</h4>
        </div>
        <div className={cls.content}>
          <div className={cls.topInfo}>
            <p>
              {notice.title}
              <span>{translations.for} {notice.type} | {translations.createdBy} <Link href={`/user/${notice.instructor_id}`}>{notice.sender}</Link></span>
              <span>{format(new Date(+notice.created_at * 1000), "dd MMM yyyy - hh:mm a", { locale: locale === 'ar' ? ar : enUS })}</span>
            </p>
          </div>
          <div className={cls.bottomInfo}>
            <div dangerouslySetInnerHTML={{ __html: notice.message }}></div>
          </div>
        </div>
        <div className={cls.actions}>
          <button onClick={() => setOpen(false)}>{translations.cancel}</button>
        </div>
      </div>
    </Modal>
  )
}

export default ViewNotice;
