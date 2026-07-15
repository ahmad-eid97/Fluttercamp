//= Components
import QuizStartWrapper from '@/components/Panel/Content/Quizzes/MyResults/TryAgain/Wrapper';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.quizzes.dropdown.list}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function QuizTryAgain(props: { params: Promise<{ locale: Locale, id: number }> }) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <QuizStartWrapper dictionary={dictionary as Dictionary} quizId={id} />
    </>
  )
}

export default QuizTryAgain;
