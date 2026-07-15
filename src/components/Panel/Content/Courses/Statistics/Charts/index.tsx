import React from "react";
//= Components
import SalesChart from './SalesChart';
import ProgressChart from './ProgressChart';
//= Types
import type { Dictionary, Locale, GetInstructorCourseStatisticsResponse } from '@/types';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['statistics'];
  data: GetInstructorCourseStatisticsResponse | undefined;
  isLoading: boolean;
}

function StatisticsCharts({ locale, translations, data, isLoading }: Props) {
  return (
    <>
      <SalesChart
        locale={locale}
        translations={translations}
        data={data}
        isLoading={isLoading}
      />
      <ProgressChart
        locale={locale}
        translations={translations}
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}

export default StatisticsCharts