//= Components
import CoursesAssignmentsWrapper from '@/components/Panel/Content/Assignments/CoursesAssignments/Wrapper';
//= Utils
import GuardTeacherOnlyPage from '@/utils/teacherOnlyGuard';
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Types
import type { Locale, Dictionary } from '@/types';

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return {
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.assignments.dropdown.studentAssignments}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function StudentsAssignments(props: { params: Promise<{ locale: Locale, id: string }> }) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <CoursesAssignmentsWrapper dictionary={dictionary as Dictionary} locale={locale} assignment_id={+id} />
    </>
  )
}

export default StudentsAssignments;
