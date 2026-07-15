'use client';
//= Components
import { Icon } from '@iconify/react';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './sectionTitle.module.scss';

type Props = {
  translations: Dictionary['panel']['forums']['topicsTable'];
}

function SectionTitle({ translations }: Props) {
  return (
    <div className={cls.sectionTitle}>
      <h4 className={cls.sectionTitle}>{translations.bookmarks} <b /></h4>
    </div>
  )
}

export default SectionTitle;