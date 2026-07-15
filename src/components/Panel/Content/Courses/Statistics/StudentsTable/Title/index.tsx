'use client';
//= Components
import { Icon } from '@iconify/react';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './sectionTitle.module.scss';

type Props = {
  translations: Dictionary['panel']['courses']['statistics'];
}

function SectionTitle({ translations }: Props) {
  return (
    <div className={cls.sectionTitle}>
      <h4 className={cls.sectionTitle}>{translations.courseStudents} <b /></h4>
    </div>
  )
}

export default SectionTitle;