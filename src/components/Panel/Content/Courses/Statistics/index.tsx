'use client';
import React from 'react';
//= Components
import StatisticsBoxes from './StatisticsBoxes';
import HorizontalBoxes from './HorizontalBoxes';
import BottomBoxes from './BottomBoxes';
import StatisticsCharts from './Charts';
import DountsCharts from './Dounts';
import StudentsTable from './StudentsTable';
//= Api
import { getInstructorCourseStatistics } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Locale, Dictionary } from '@/types';

type Props = {
  translations: Dictionary['panel']['courses']['statistics'];
  locale: Locale;
  courseId: number;
}

function StatisticsWrapper({ translations, locale, courseId }: Props) {
  const { data, isLoading } = useRequest(() => getInstructorCourseStatistics(courseId));

  return (
    <>
      <StatisticsBoxes
        translations={translations}
        data={data}
        isLoading={isLoading}
      />
      <HorizontalBoxes
        translations={translations}
        data={data}
        isLoading={isLoading}
      />
      <BottomBoxes
        translations={translations}
        data={data}
        isLoading={isLoading}
      />
      <DountsCharts
        locale={locale}
        translations={translations}
        data={data}
        isLoading={isLoading}
      />
      <StatisticsCharts
        locale={locale}
        translations={translations}
        data={data}
        isLoading={isLoading}
      />
      <StudentsTable
        translations={translations}
        locale={locale}
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}

export default StatisticsWrapper;