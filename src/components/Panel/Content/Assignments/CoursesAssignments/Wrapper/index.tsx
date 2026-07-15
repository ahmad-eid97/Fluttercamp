'use client';
//= Components
import StatisticsBoxes from '../StatisticsBoxes';
import AssignmentsTable from '../AssignmentsTable';
//= Api
import useRequest from '@/api/useRequest';
import { getAssignmentStudents } from '@/api';
//= Types
import type { Dictionary, Locale } from '@/types';

type Props = {
  dictionary: Dictionary;
  locale: Locale;
  assignment_id: number;
}

function CoursesAssignmentsWrapper({ dictionary, locale, assignment_id }: Props) {
  const { data, isLoading, refetch } = useRequest(() => getAssignmentStudents(assignment_id));

  return (
    <>
      {/* <StatisticsBoxes translations={dictionary.panel.assignments.statisticsBoxes} isLoading={isLoading} statistics={statistics} /> */}
      <AssignmentsTable translations={dictionary.panel.assignments.list} locale={locale} isLoading={isLoading} data={data ? data : []} />
    </>
  )
}

export default CoursesAssignmentsWrapper;