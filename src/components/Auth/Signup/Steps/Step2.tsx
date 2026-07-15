'use client';
import React, { useState } from 'react';
import Link from 'next/link';
//= Components
import { Icon } from '@iconify/react';
//= Api
import { registerStepTwo } from '@/api';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from '../../authform.module.scss';

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  userId: string | undefined;
}

function Step2({ setCurrentStep, userId }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.signupPage;
  const [data, setData] = useState({ code: '' });

  async function toNextStep(event: React.MouseEvent) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.setAttribute('disabled', 'disabled');
    btn.classList.add(cls.disabled);

    if (userId) {
      const response = await registerStepTwo({ code: data.code, user_id: userId });
      if (response?.success) setCurrentStep(3);
    }

    btn.removeAttribute('disabled');
    btn.classList.remove(cls.disabled);
  }

  return (
    <div className={`${cls.form}`}>
      <div className={cls.header}>
        <span className={cls.headerIcon}><Icon icon="solar:letter-bold-duotone" /></span>
        <h1>{translations.title}</h1>
        <div className={cls.stepper}>
          <span className={cls.active}></span>
          <span className={cls.active}></span>
          <span></span>
        </div>
      </div>
      <div className={cls.body}>
        <form>
          <div className={cls.formGroup}>
            <label><Icon icon="ph:user-bold" /> {translations.code}</label>
            <input type="text" placeholder="123456" value={data.code} onChange={e => setData(({ code: e.target.value }))} />
          </div>
          <button className={cls.btn} onClick={toNextStep}>
            <Icon icon="eos-icons:three-dots-loading" />
            <span>{translations.continue}</span>
          </button>
        </form>
        <p>
          {translations.createTxt} <Link href='/login'>{translations.link}</Link>
        </p>
      </div>
    </div>
  )
}

export default Step2