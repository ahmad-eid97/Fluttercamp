'use client';
//= Components
import { Icon } from '@iconify/react';
import CountUp from 'react-countup';
import Container from '@mui/material/Container';
import { SectionHeading, Reveal } from '@/components/ui';
import { icons } from '@/lib/icons';
//= Types
import type { Locale } from '@/types';
//= Styles
import cls from './impact.module.scss';

type Props = {
  locale: Locale;
  coursesCount?: number;
  instructorsCount?: number;
};

function Impact({ locale, coursesCount = 24, instructorsCount = 12 }: Props) {
  const ar = locale === 'ar';

  const t = {
    eyebrow: ar ? 'لماذا فلاتر كامب' : 'Why FlutterCamp',
    title: ar ? 'منصة يثق بها آلاف المطوّرين' : 'Trusted by thousands of developers',
    description: ar
      ? 'انضم إلى مجتمع متنامٍ من متعلّمي فلاتر — أرقام تعكس جودة المحتوى والتجربة.'
      : 'Join a growing community of Flutter learners — numbers that reflect real outcomes.',
  };

  const stats = [
    {
      icon: icons.users,
      value: 30000,
      suffix: '+',
      label: ar ? 'متعلّم نشط' : 'Active learners',
      tone: cls.brand,
    },
    {
      icon: icons.book,
      value: Math.max(coursesCount, 1),
      suffix: '+',
      label: ar ? 'دورة ومسار' : 'Courses & tracks',
      tone: cls.gold,
    },
    {
      icon: icons.graduation,
      value: Math.max(instructorsCount, 1),
      suffix: '+',
      label: ar ? 'مدرّب خبير' : 'Expert instructors',
      tone: cls.secondary,
    },
    {
      icon: icons.star,
      value: 4.8,
      decimals: 1,
      suffix: '/5',
      label: ar ? 'متوسط التقييم' : 'Average rating',
      tone: cls.success,
    },
  ];

  return (
    <section className={cls.impact}>
      <div className={cls.glow} aria-hidden />
      {/* @ts-ignore — xxl is a custom Container maxWidth */}
      <Container maxWidth="xl" className={cls.inner}>
        <SectionHeading
          eyebrow={t.eyebrow}
          eyebrowIcon={icons.chart}
          title={t.title}
          description={t.description}
        />

        <div className={cls.grid}>
          {stats.map((s, idx) => (
            <Reveal key={idx} delay={idx * 90}>
              <article className={`${cls.card} ${s.tone}`}>
                <Icon icon={s.icon} className={cls.watermark} aria-hidden />
                <span className={cls.iconChip}>
                  <Icon icon={s.icon} />
                </span>
                <div className={cls.value}>
                  <CountUp
                    end={s.value}
                    duration={1.6}
                    separator=","
                    decimals={s.decimals ?? 0}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  <span className={cls.suffix}>{s.suffix}</span>
                </div>
                <p className={cls.label}>{s.label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Impact;
