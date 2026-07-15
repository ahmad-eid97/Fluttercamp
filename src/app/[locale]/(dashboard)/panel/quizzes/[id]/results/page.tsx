//= Components
import ResultsWrapper from "@/components/Panel/Content/Quizzes/Results/StudentResults/Wrapper";
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.quizzes.dropdown.results}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function StudentResults(props: { params: Promise<{ locale: Locale, id: number }> }) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <ResultsWrapper locale={locale} dictionary={dictionary as Dictionary} quizId={id} />
    </>
  )
}

export default StudentResults
