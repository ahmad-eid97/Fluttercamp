'use client';
//= Components
import { Icon } from '@iconify/react';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './sectionTitle.module.scss';

type Props = {
  translations: Dictionary['panel']['notifications'];
}

function SectionTitle({ translations }: Props) {
  async function markAllAsRead() {
  }

  return (
    <div className={cls.sectionTitle}>
      <h4 className={cls.sectionTitle}>{translations.title} <b /> <button onClick={markAllAsRead}><Icon icon='solar:check-read-bold' /> {translations.markAllAsRead}</button></h4>
    </div>
  )
}

export default SectionTitle;