//= Components
import StudentsAssignmentsWrapper from '@/components/Panel/Content/Assignments/StudentsAssignments/Wrapper';
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Utils
import GuardTeacherOnlyPage from '@/utils/teacherOnlyGuard';
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

async function PanelAssignments(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <StudentsAssignmentsWrapper dictionary={dictionary as Dictionary} locale={locale} />
    </>
  )
}

export default PanelAssignments;
