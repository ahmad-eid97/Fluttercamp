'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import { icons } from '@/lib/icons';
//= Api
import { registerStepOne } from '@/api';
//= Types
import type { RegisterStepOnePayload } from '@/types';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from '../../authform.module.scss';

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function Step1({ setCurrentStep, setUserId }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.signupPage;
  const [data, setData] = useState({ email: '', password: '', password_confirmation: '' });
  const [signAs, setSignAs] = useState<RegisterStepOnePayload['account_type']>('user');

  async function toNextStep(event: React.MouseEvent) {
    event.preventDefault();

    const btn = event.currentTarget;
    btn.setAttribute('disabled', 'disabled');
    btn.classList.add(cls.disabled);

    const response = await registerStepOne({ ...data, account_type: signAs });

    if (response?.status === 'go_step_2') {
      setUserId(response?.data?.user_id.toString());
      return setCurrentStep(2);
    }

    if (response?.data?.user_id) {
      toast.success(translations.codeSentMessage);
      setUserId(response?.data.user_id.toString());
      setCurrentStep(2);
    }

    btn.removeAttribute('disabled');
    btn.classList.remove(cls.disabled);
  }

  return (
    <div className={`${cls.form}`}>
      <div className={cls.header}>
        <span className={cls.headerIcon}><Icon icon={icons.user} /></span>
        <h1>{translations.title}</h1>
        <div className={cls.stepper}>
          <span className={cls.active}></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p className={cls.joinLabel}><Icon icon="mdi:shield-account-outline" /> {translations.joinAs}</p>
      <div className={cls.signAs}>
        <button className={signAs === 'user' ? cls.active : ''} onClick={() => setSignAs('user')}><Icon icon="ph:student-bold" /> {translations.student}</button>
        <button className={signAs === 'teacher' ? cls.active : ''} onClick={() => setSignAs('teacher')}><Icon icon="fluent-emoji-high-contrast:teacher" /> {translations.instructor}</button>
      </div>
      <div className={cls.body}>
        <form>
          <div className={cls.formGroup}>
            <label><Icon icon={icons.mail} /> {translations.email}</label>
            <input type="email" placeholder="email-address@gmail.com" value={data.email} onChange={e => setData(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div className={cls.formGroup}>
            <label><Icon icon="solar:password-broken" /> {translations.password}</label>
            <input type="password" placeholder="**********" value={data.password} onChange={e => setData(p => ({ ...p, password: e.target.value }))} />
          </div>
          <div className={cls.formGroup}>
            <label><Icon icon="solar:password-broken" /> {translations.confirmPassword}</label>
            <input type="password" placeholder="**********" value={data.password_confirmation} onChange={e => setData(p => ({ ...p, password_confirmation: e.target.value }))} />
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

export default Step1