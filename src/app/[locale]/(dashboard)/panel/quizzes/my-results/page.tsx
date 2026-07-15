//= Components
import MyResultsWrapper from '@/components/Panel/Content/Quizzes/MyResults/MyResultsWrapper';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.quizzes.dropdown.myResults}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function MyQuizzesResults(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <MyResultsWrapper dictionary={dictionary as Dictionary} locale={locale} />
    </>
  )
}

export default MyQuizzesResults;
