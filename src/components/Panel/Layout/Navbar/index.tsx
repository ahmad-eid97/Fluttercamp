'use client';
import React from 'react'
//= Components
import { Icon } from '@iconify/react';
import Navbar from '@/components/Common/Navbar';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from './navbar.module.scss';

function PanelNavbar() {
  const { locale } = useDictionary();

  return (
    <div className={`${cls.navbar} ${locale === 'ar' ? cls.ar : ''}`}>
      <Navbar />
    </div>
  )
}

export default PanelNavbar;