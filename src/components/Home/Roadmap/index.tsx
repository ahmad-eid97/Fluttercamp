'use client';
//= Components
import { Icon } from '@iconify/react';
import Container from '@mui/material/Container';
import { SectionHeading, Reveal, Button } from '@/components/ui';
import { icons } from '@/lib/icons';
//= Types
import type { Locale } from '@/types';
//= Styles
import cls from './roadmap.module.scss';

type Props = {
  locale: Locale;
};

function Roadmap({ locale }: Props) {
  const ar = locale === 'ar';

  const t = {
    eyebrow: ar ? 'مسار التعلّم' : 'Learning path',
    title: ar ? 'من أول Widget إلى تطبيق منشور' : 'From your first widget to a published app',
    description: ar
      ? 'مسار متدرّج يأخذك خطوة بخطوة من الأساسيات حتى نشر تطبيق احترافي على المتاجر.'
      : 'A guided path that takes you step by step from the fundamentals to shipping a polished, cross-platform app.',
    cta: ar ? 'استكشف المسارات' : 'Explore tracks',
  };

  const stages = [
    {
      level: ar ? 'مبتدئ' : 'Beginner',
      icon: icons.book,
      tone: cls.brand,
      title: ar ? 'دارت والـ Widgets' : 'Dart & Widgets',
      desc: ar
        ? 'تعلّم أساسيات لغة Dart وابنِ أول واجهاتك وتخطيطاتك.'
        : 'Master Dart fundamentals and build your first widgets and layouts.',
      skills: ar
        ? ['أساسيات Dart', 'Widgets', 'التخطيطات', 'الحالة الأساسية']
        : ['Dart basics', 'Widgets', 'Layouts', 'Basic state'],
    },
    {
      level: ar ? 'متوسط' : 'Intermediate',
      icon: icons.widget,
      tone: cls.gold,
      title: ar ? 'إدارة الحالة والتنقّل' : 'State & Navigation',
      desc: ar
        ? 'أدِر الحالة والتنقّل والاتصال بالشبكة وتخزين البيانات.'
        : 'Manage state, navigation, networking and local persistence.',
      skills: ar
        ? ['Provider / Riverpod', 'التنقّل', 'REST APIs', 'التخزين المحلي']
        : ['Provider / Riverpod', 'Navigation', 'REST APIs', 'Local storage'],
    },
    {
      level: ar ? 'متقدّم' : 'Advanced',
      icon: icons.rocket,
      tone: cls.secondary,
      title: ar ? 'الإطلاق للإنتاج' : 'Ship to production',
      desc: ar
        ? 'الحركات والاختبارات وأتمتة النشر والإطلاق على المتاجر.'
        : 'Animations, testing, CI/CD and publishing to the app stores.',
      skills: ar
        ? ['الحركات', 'الاختبارات', 'CI/CD', 'App Store / Play']
        : ['Animations', 'Testing', 'CI/CD', 'App Store / Play'],
    },
  ];

  return (
    <section className={cls.roadmap}>
      <div className={cls.bgGrid} aria-hidden />
      {/* @ts-ignore */}
      <Container maxWidth="xl" className={cls.inner}>
        <SectionHeading
          eyebrow={t.eyebrow}
          eyebrowIcon={icons.graduation}
          title={t.title}
          description={t.description}
        />

        <Reveal className={cls.journey} delay={120}>
          <img src="/illustrations/learning-journey.svg" alt="" aria-hidden />
        </Reveal>

        <div className={cls.track}>
          <div className={cls.line} aria-hidden />
          {stages.map((stage, idx) => (
            <Reveal key={idx} delay={idx * 120} className={cls.stageWrap}>
              <article className={cls.stage}>
                <div className={cls.stageHead}>
                  <span className={`${cls.iconChip} ${stage.tone}`}>
                    <Icon icon={stage.icon} />
                  </span>
                  <span className={cls.step}>{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <span className={cls.level}>{stage.level}</span>
                <h3 className={cls.stageTitle}>{stage.title}</h3>
                <p className={cls.stageDesc}>{stage.desc}</p>
                <ul className={cls.skills}>
                  {stage.skills.map((skill, i) => (
                    <li key={i}>
                      <Icon icon={icons.check} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className={cls.cta}>
          <Button href="/tracks" variant="primary" size="lg" iconRight={icons.arrowRight}>
            {t.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Roadmap;
