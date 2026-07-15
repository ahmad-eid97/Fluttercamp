'use client';
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
//= Components
import { Icon } from '@iconify/react';
import { icons } from '@/lib/icons';
//= Types
import type { Locale, RootState } from '@/types';
//= Styles
import cls from './quick-actions.module.scss';

type Action = { icon: string; label: string; href: string; tone: string };

export default function QuickActions({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  // role comes from client-only Redux — gate behind `mounted` to avoid the
  // hydration mismatch every panel page is prone to.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const { user } = useSelector((s: RootState) => s.user);
  const isTeacher = mounted && user?.role === 'teacher';

  const teacherActions: Action[] = [
    { icon: 'solar:notebook-bookmark-bold-duotone', label: ar ? 'دورة جديدة' : 'New course', href: '/panel/courses/new', tone: cls.brand },
    { icon: 'solar:checklist-minimalistic-bold-duotone', label: ar ? 'اختبار جديد' : 'New quiz', href: '/panel/quizzes/new', tone: cls.gold },
    { icon: 'solar:document-add-bold-duotone', label: ar ? 'مقال جديد' : 'New article', href: '/panel/articles/new', tone: cls.secondary },
    { icon: icons.chart, label: ar ? 'المبيعات' : 'Sales', href: '/panel/financial/sales', tone: cls.success },
  ];

  const commonActions: Action[] = [
    { icon: icons.calendar, label: ar ? 'المقابلات' : 'Meetings', href: '/panel/meetings', tone: cls.brand },
    { icon: icons.book, label: ar ? 'دوراتي' : 'My courses', href: isTeacher ? '/panel/courses' : '/panel/courses/purchases', tone: cls.gold },
    { icon: icons.certificate, label: ar ? 'الشهادات' : 'Certificates', href: '/panel/certificates/achievements', tone: cls.secondary },
    { icon: icons.chat, label: ar ? 'الدعم' : 'Support', href: '/panel/support/new', tone: cls.success },
  ];

  const actions = isTeacher ? teacherActions : commonActions;

  return (
    <div className={cls.quick}>
      <h2 className={cls.title}>
        <Icon icon={icons.lightning} />
        {ar ? 'إجراءات سريعة' : 'Quick actions'}
      </h2>
      <div className={cls.grid}>
        {actions.map((a, i) => (
          <Link key={i} href={a.href} className={cls.tile}>
            <span className={`${cls.iconChip} ${a.tone}`}>
              <Icon icon={a.icon} />
            </span>
            <span className={cls.label}>{a.label}</span>
            <Icon icon={ar ? icons.arrowLeft : icons.arrowRight} className={cls.arrow} />
          </Link>
        ))}
      </div>
    </div>
  );
}
