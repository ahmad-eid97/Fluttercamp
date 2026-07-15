//= Components
import AssignmentsWrapper from '@/components/Panel/Content/Assignments/AssignmentsWrapper';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.assignments.dropdown.myAssignments}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelAssignments(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <AssignmentsWrapper dictionary={dictionary as Dictionary} locale={locale} />
    </>
  )
}

export default PanelAssignments;
