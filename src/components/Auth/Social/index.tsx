'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Api
import { getGoogleLogin, getFacebookLogin } from '@/api';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from '../authform.module.scss';

type Props = {
  dictionary: Dictionary['loginPage']
}

function SocialAuth() {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.loginPage;

  async function handleShowLoginPage(provider: 'google' | 'facebook') {
    if (provider === 'google') {
      const response = await getGoogleLogin();
    } else {
      const response = await getFacebookLogin();
    }
  }

  return (
    <div className={cls.social}>
      <div className={cls.socialDivider}>{translations.social}</div>
      <div className={cls.btns}>
        <button className={cls.google} onClick={() => handleShowLoginPage('google')}>
          <Icon icon="flat-color-icons:google" />
          {translations.google}
        </button>
        <button className={cls.facebook} onClick={() => handleShowLoginPage('facebook')}>
          <Icon icon="logos:facebook" />
          {translations.facebook}
        </button>
      </div>
    </div>
  )
}

export default SocialAuth