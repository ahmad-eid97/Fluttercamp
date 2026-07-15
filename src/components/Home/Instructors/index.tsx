'use client';
//= Components
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Container from '@mui/material/Container';
import { SectionHeading, Reveal, Button } from '@/components/ui';
import { icons } from '@/lib/icons';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Locale, User } from '@/types';
//= Styles
import cls from './instructors.module.scss';

type Props = {
  locale: Locale;
  instructors: (User | any)[];
};

function Instructors({ locale, instructors }: Props) {
  const ar = locale === 'ar';
  const list = (Array.isArray(instructors) ? instructors : []).slice(0, 8);

  if (!list.length) return null;

  const t = {
    eyebrow: ar ? 'فريق التدريب' : 'Meet the team',
    title: ar ? 'تعلّم على يد أفضل المدرّبين' : 'Learn from our best instructors',
    description: ar
      ? 'خبراء في فلاتر ودارت يرافقونك خطوة بخطوة حتى الاحتراف.'
      : 'Flutter & Dart experts who guide you every step of the way to mastery.',
    cta: ar ? 'شاهد كل المدرّبين' : 'See all instructors',
    courses: ar ? 'دورة' : 'courses',
    viewProfile: ar ? 'عرض الملف' : 'View profile',
  };

  return (
    <section className={cls.instructors}>
      {/* @ts-ignore */}
      <Container maxWidth="xl">
        <SectionHeading
          eyebrow={t.eyebrow}
          eyebrowIcon={icons.users}
          title={t.title}
          description={t.description}
        />

        <div className={cls.grid}>
          {list.map((user, idx) => {
            const rate = Math.round(Number(user.rate) || 0);
            return (
              <Reveal key={user.id ?? idx} delay={(idx % 4) * 80}>
                <article className={cls.card}>
                  <Link href={`/user/${user.id}`} className={cls.avatarLink} aria-label={user.full_name}>
                    <span className={cls.avatarRing}>
                      <img
                        src={getImageUrl(user.avatar || '')}
                        alt={user.full_name || 'instructor'}
                        loading="lazy"
                      />
                    </span>
                    <Icon icon={icons.verified} className={cls.verified} />
                  </Link>

                  <Link href={`/user/${user.id}`} className={cls.name}>
                    {user.full_name}
                  </Link>
                  <p className={cls.role}>
                    {user.headline || user.role_name || (ar ? 'مدرّب فلاتر' : 'Flutter Instructor')}
                  </p>

                  <div className={cls.rating} aria-label={`rating ${rate} of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        icon={icons.star}
                        className={i < rate ? cls.starOn : cls.starOff}
                      />
                    ))}
                  </div>

                  <Link href={`/user/${user.id}`} className={cls.profileBtn}>
                    <Icon icon={icons.arrowRight} />
                    {t.viewProfile}
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className={cls.cta}>
          <Button href="/search" variant="outline" size="lg" icon={icons.users}>
            {t.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Instructors;
