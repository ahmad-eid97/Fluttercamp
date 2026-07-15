//= Components
import New from '@/components/Panel/Content/Quizzes/New';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.quizzes.dropdown.newQuiz}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function NewQuiz(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <New locale={locale} translations={(dictionary as Dictionary).panel.quizzes.new} />
    </>
  )
}

export default NewQuiz;
