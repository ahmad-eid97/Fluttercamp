'use client';
import React from 'react';
import Link from 'next/link';
//= Components
import CourseCard from '@/components/Course/CourseCard';
import { SectionHeading, Button, Carousel } from '@/components/ui';
import { icons } from '@/lib/icons';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import { Course, Dictionary } from '@/types';
//= Styles
import cls from './latesetCourses.module.scss';

type Props = {
  dictionary: Dictionary;
  courses: Course[];
};

const LatestCourses = ({ dictionary, courses }: Props) => {
  const translations = dictionary.home.latestCourses;
  const { locale } = useDictionary();

  return (
    <section className={cls.latestCourses}>
      <div className={cls.glow} />

      <div className={`${cls.inner} container`}>
      <div className={cls.head}>
        <SectionHeading
          align="start"
          eyebrow={locale === 'ar' ? 'الأكثر رواجاً' : 'Most popular'}
          eyebrowIcon={icons.fire}
          title={translations.title}
          description={translations.sub_title}
        />
        <Button href="/search" variant="soft" iconRight={icons.arrowRight} className={cls.headBtn}>
          {translations.showMore}
        </Button>
      </div>

      <Carousel
        className={cls.carousel}
        slideClassName={cls.slide}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        perView={{ base: 1.1, sm: 2, md: 3, lg: 3, xl: 4 }}
        gap={22}
        arrows
      >
        {courses?.map((course, idx) => (
          <CourseCard course={course} key={idx} />
        ))}
      </Carousel>
      </div>
    </section>
  );
};

export default LatestCourses;
