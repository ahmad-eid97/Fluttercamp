'use client';
import React from 'react'
//= Components
import { Icon } from '@iconify/react';
import Modal from '@/components/UIs/Modal';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Api
import { getUserContactInfo } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './modal.module.scss';

type Props = {
  locale: Locale;
  userInfo: {
    user_id: number;
    user_type: 'student' | 'instructor';
    item_id: number;
  }
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['meetings']['list'];
}

function ContactModal({ locale, userInfo, setOpen, translations }: Props) {
  const { data: info, isLoading } = useRequest(() => getUserContactInfo(userInfo));

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.modal}>
        <div className={cls.head}>
          <h4>{translations.contactInfo}</h4>
        </div>
        <div className={cls.content}>
          <div className={cls.topInfo}>
            <img src={getImageUrl('/store/1049/avatar/65616a5dcdd96.png')} alt="user image" />
            <p>Hassan Ali</p>
          </div>
          <div className={cls.bottomInfo}>
            <p><b><Icon icon='mi:email' /> {translations.email}</b> <span>instructor@fluttercamp.co</span></p>
            <p><b><Icon icon='bi:phone' /> {translations.phone}</b> <span>009705454545454</span></p>
            <p><b><Icon icon='mingcute:location-line' /> {translations.location}</b> <span>Luib, 72 Wern Ddu Lane</span></p>
          </div>
        </div>
        <div className={cls.actions}>
          <button onClick={() => setOpen(false)}>{translations.cancel}</button>
        </div>
      </div>
    </Modal>
  )
}

export default ContactModal;
