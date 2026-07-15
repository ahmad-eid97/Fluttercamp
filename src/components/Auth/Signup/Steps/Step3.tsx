'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
//= Api
import { registerStepThree } from '@/api';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from '../../authform.module.scss';

type Props = {
  userId: string | undefined;
}

function Step3({ userId }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.signupPage;
  const [data, setData] = useState({ fullname: '', referral_code: '' });

  async function finishSignup(event: React.MouseEvent) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.setAttribute('disabled', 'disabled');
    btn.classList.add(cls.disabled);

    if (userId) {
      const response = await registerStepThree({ full_name: data.fullname, referral_code: data.referral_code, user_id: userId });
      if (response?.response?.success) {
        if (response.user) toast.success(translations.welcome);
        setTimeout(() => {
          window.location.href = "/login";
        }, 100);
      }
    }

    btn.removeAttribute('disabled');
    btn.classList.remove(cls.disabled);
  }
  return (
    <div className={`${cls.form}`}>
      <div className={cls.header}>
        <span className={cls.headerIcon}><Icon icon="solar:user-id-bold-duotone" /></span>
        <h1>{translations.title}</h1>
        <div className={cls.stepper}>
          <span className={cls.active}></span>
          <span className={cls.active}></span>
          <span className={cls.active}></span>
        </div>
      </div>
      <div className={cls.body}>
        <form>
          <div className={cls.formGroup}>
            <label><Icon icon="ph:user-bold" /> {translations.username}</label>
            <input type="text" placeholder="John Doe" value={data.fullname} onChange={e => setData(p => ({ ...p, fullname: e.target.value }))} />
          </div>
          <div className={cls.formGroup}>
            <label><Icon icon="fluent-mdl2:number-field" /> {translations.referral_code} <span>({translations.optional})</span></label>
            <input type="text" placeholder="123456" value={data.referral_code} onChange={e => setData(p => ({ ...p, referral_code: e.target.value }))} />
          </div>
          <button className={cls.btn} onClick={finishSignup}>
            <Icon icon="eos-icons:three-dots-loading" />
            <span>{translations.btn}</span>
          </button>
        </form>
        <p>
          {translations.createTxt} <Link href='/login'>{translations.link}</Link>
        </p>
      </div>
    </div>
  )
}

export default Step3