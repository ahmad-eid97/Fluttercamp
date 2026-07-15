'use client';
import React from 'react';
import Link from 'next/link';
//= Components
import { Icon } from '@iconify/react';
import Container from '@mui/material/Container';
import { icons } from '@/lib/icons';
import { LogoMark } from '@/components/ui';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from '../authform.module.scss';

function LoginForm() {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.forgetPage;

  return (
    <Container>
      <div className={cls.auth_form}>
        <aside className={cls.brandPanel}>
          <div className={cls.panelGrid} />
          <span className={cls.panelGlow} />

          <span className={cls.panelBrand}>
            <span className={cls.panelMark}><LogoMark /></span>
            Flutter<b>Camp</b>
          </span>

          <div className={cls.panelHeading}>
            <h2>{locale === 'ar' ? 'لا تقلق، يحدث ذلك' : "Forgot it? It happens"}</h2>
            <p>
              {locale === 'ar'
                ? 'أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور والعودة إلى التعلم.'
                : "Enter your email and we'll send you a link to reset your password and get back to learning."}
            </p>
          </div>

          <ul className={cls.panelProps}>
            <li>
              <span className={cls.propIcon}><Icon icon={icons.mail} /></span>
              {locale === 'ar' ? 'رابط آمن لإعادة التعيين' : 'A secure reset link by email'}
            </li>
            <li>
              <span className={cls.propIcon}><Icon icon={icons.lightning} /></span>
              {locale === 'ar' ? 'عُد لدوراتك في دقائق' : 'Back to your courses in minutes'}
            </li>
          </ul>
        </aside>

        <div className={cls.form}>
          <div className={cls.header}>
            <span className={cls.headerIcon}><Icon icon="solar:lock-keyhole-unlocked-bold-duotone" /></span>
            <h1>{translations.title}</h1>
            <p className={cls.subtitle}>
              {locale === 'ar' ? 'أدخل البريد الإلكتروني المرتبط بحسابك.' : 'Enter the email linked to your account.'}
            </p>
          </div>
          <div className={cls.body}>
            <form>
              <div className={cls.formGroup}>
                <label><Icon icon={icons.mail} /> {translations.email}</label>
                <input type="email" placeholder="you@email.com" />
              </div>
              <button className={cls.btn} type="submit">{translations.btn}</button>
            </form>
            <p>
              {translations.createTxt} <Link href='/login'>{translations.link}</Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default LoginForm