'use client';
import React from 'react';
//= Types
import type { Dictionary } from "@/types";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from './error.module.scss';

type Props = {
  error: string;
}

function ViewError({ error }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.lessonPage;
  return (
    <div className={cls.view_error}>
      {
        error === 'You dont have access to this content!' ?
          translations.content.noAccess
          :
          error
      }
    </div>
  )
}

export default ViewError