'use client';
import React from 'react';
//= Components
import CoursesList from '../CoursesList';
import StatisticsBoxes from './StatisticsBoxes';
//= Api
import { getPurchasesCourses } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';

type Props = {
  translations: Dictionary['panel']['courses'];
  locale: Locale;
}

function MyPurchasesCoursesList({ translations, locale }: Props) {
  const { data, isLoading, refetch } = useRequest(getPurchasesCourses);

  return (
    <>
      <StatisticsBoxes
        translations={translations.statisticsBoxes}
        statistics={{
          purchased: 0,
          hours: 0,
          upcoming: 0
        }}
        isLoading={isLoading}
      />
      <CoursesList
        coursesData={(Array.isArray(data?.webinars) ? data.webinars : []).filter(webinar => webinar.type !== 'bundle')}
        isLoading={isLoading}
        refetch={refetch}
        translations={translations.list}
        locale={locale}
      />
    </>
  )
}

export default MyPurchasesCoursesList;