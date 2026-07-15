'use client';
//= Components
import StatisticsBoxes from '../StatisticsBoxes';
import AssignmentsTable from '../AssignmentsTable';
//= Api
import useRequest from '@/api/useRequest';
import { getStudentsAssignments } from '@/api';
//= Types
import type { Dictionary, Locale } from '@/types';

type Props = {
  dictionary: Dictionary;
  locale: Locale;
}

function StudentsAssignmentsWrapper({ dictionary, locale }: Props) {
  const { data, isLoading, refetch } = useRequest(getStudentsAssignments);

  const statistics = {
    course_assignments_count: data ? data.course_assignments_count : 0,
    pending_reviews_count: data ? data.pending_reviews_count : 0,
    passed_count: data ? data.passed_count : 0,
    failed_count: data ? data.failed_count : 0
  }

  return (
    <>
      <StatisticsBoxes translations={dictionary.panel.assignments.statisticsBoxes} isLoading={isLoading} statistics={statistics} />
      <AssignmentsTable translations={dictionary.panel.assignments.list} locale={locale} isLoading={isLoading} data={data?.assignments ? data.assignments : []} />
    </>
  )
}

export default StudentsAssignmentsWrapper;