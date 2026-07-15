'use client';
import React from 'react';
//= Components
import Course from './Course';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { getPanelBundleWebinars } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './courses-list.module.scss';

type Props = {
  translations: Dictionary['panel']['courses']['list'];
  locale: Locale;
  bundleId: number;
}

function CoursesList({ translations, locale, bundleId }: Props) {
  const { data, isLoading, refetch } = useRequest(() => getPanelBundleWebinars(bundleId));

  return (
    <div className={`${cls.list}`}>
      {
        !isLoading && data && data.length ?
          data.map(course => (
            <Course translations={translations} locale={locale} course={course} refetchBundleCourses={refetch} key={course.id} />
          ))
          :
          isLoading ?
            <LoadingSkeleton width="100%" height="180px" rounded />
            :
            <p className={cls.noData}>
              {translations.noCourses}
            </p>
      }
    </div>
  )
}

export default CoursesList;