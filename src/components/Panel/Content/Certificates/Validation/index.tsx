'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import Input from '@/components/UIs/Input';
//= Api
import { validateCertificate } from '@/api';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './validation.module.scss';

type Props = {
  translations: Dictionary['panel']['certificates']['validation'];
  locale: Locale
}

interface Fields {
  cert_id: string;
  captcha: string;
}

function CertificateValidation({ translations, locale }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    cert_id: '',
    captcha: ''
  });

  async function handleValidate(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const originalCaptcha = document.getElementById('original-captcha')!.textContent;

    if (data.captcha.toLowerCase() !== originalCaptcha!.toLowerCase()) {
      toast.error(translations.captchaWrong);
    } else {
      const response = await validateCertificate(data.cert_id);
      if (response) {
        if (response.is_valid) toast.success(translations.valid);
        else toast.error(translations.notValid);
      }
    }

    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.validation}>
      <h3>{translations.title}</h3>
      <p>{translations.details}</p>
      <form>
        <div className={cls.field}>
          <Input placeholder={translations.cert_id} label={translations.cert_id} name="cert_id" value={data.cert_id} onChange={(e) => dispatch({ cert_id: e.target.value })} />
        </div>
        <div className={`${cls.field} ${cls.captcha_field}`}>
          <Input withCaptcha placeholder={translations.captcha} label={translations.captcha} name="captcha" value={data.captcha} onChange={(e) => dispatch({ captcha: e.target.value })} />
        </div>
        <div className={cls.button}>
          <button onClick={handleValidate}><Icon icon='grommet-icons:validate' /> {translations.btn}</button>
        </div>
      </form>
    </div>
  )
}

export default CertificateValidation;
