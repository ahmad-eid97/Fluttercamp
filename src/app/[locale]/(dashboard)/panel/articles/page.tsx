//= Components
import ArticlesList from '@/components/Panel/Content/Articles/ArticlesList';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.articles.dropdown.myArticles}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelArticles(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations } = await getDictionary();

  return (
    <>
      <ArticlesList dictionary={translations as Dictionary} locale={locale} />
    </>
  )
}

export default PanelArticles;
