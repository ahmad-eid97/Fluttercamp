'use client';
import React from 'react';
//= Components
import CoursesList from '../CoursesList';
import StatisticsBoxes from '../StatisticsBoxes';
//= Api
import { getInvitationsCourses } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';

type Props = {
  translations: Dictionary['panel']['courses'];
  locale: Locale;
}

function InvitedCoursesList({ translations, locale }: Props) {
  const { data, isLoading, refetch } = useRequest(getInvitationsCourses);

  return (
    <>
      <StatisticsBoxes
        translations={translations.statisticsBoxes}
        statistics={{
          webinarsCount: 0,
          webinarSalesAmount: 0,
          courseSalesAmount: 0,
          webinarHours: 0
        }}
        isLoading={isLoading}
      />
      <CoursesList
        coursesData={data?.webinars.data || []}
        coursesDataWithPagination={data?.webinars}
        isLoading={isLoading}
        refetch={refetch}
        translations={translations.list}
        locale={locale}
      />
    </>
  )
}

export default InvitedCoursesList;