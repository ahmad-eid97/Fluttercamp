import React from "react";
//= Components
import StudentRoles from './StudentRoles';
import CourseProgress from './CourseProgress';
import StatusQuiz from './StatusQuiz';
//= Types
import type { Dictionary, Locale, GetInstructorCourseStatisticsResponse } from '@/types';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['statistics'];
  data: GetInstructorCourseStatisticsResponse | undefined;
  isLoading: boolean;
}

function DountsCharts({ locale, translations, data, isLoading }: Props) {
  return (
    <>
      <StudentRoles
        locale={locale}
        translations={translations}
        data={data}
        isLoading={isLoading}
      />
      <CourseProgress
        locale={locale} translations={translations}
        data={data}
        isLoading={isLoading}
      />
      <StatusQuiz
        locale={locale}
        translations={translations}
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}

export default DountsCharts