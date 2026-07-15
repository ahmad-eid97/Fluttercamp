'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
//= Components
import CoursesList from '../CoursesList';
import StatisticsBoxes from '../StatisticsBoxes';
//= Api
import { getMyCourses } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';

type Props = {
  translations: Dictionary['panel']['courses'];
  locale: Locale;
}

function MyCoursesList({ translations, locale }: Props) {
  const searchParams = useSearchParams();
  const currentPageInUrl = searchParams.get('page');
  const { data, isLoading, refetch } = useRequest(getMyCourses, { page: currentPageInUrl ? +currentPageInUrl : 1 });

  return (
    <>
      <StatisticsBoxes
        translations={translations.statisticsBoxes}
        statistics={{
          webinarsCount: data?.webinarsCount || 0,
          webinarSalesAmount: data?.webinarSalesAmount || 0,
          courseSalesAmount: data?.courseSalesAmount || 0,
          webinarHours: data?.webinarHours ? +data.webinarHours : 0 || 0
        }}
        isLoading={isLoading}
      />
      <CoursesList
        coursesData={data?.webinars?.data || []}
        coursesDataWithPagination={data?.webinars}
        isLoading={isLoading}
        refetch={refetch}
        translations={translations.list}
        locale={locale}
      />
    </>
  )
}

export default MyCoursesList;