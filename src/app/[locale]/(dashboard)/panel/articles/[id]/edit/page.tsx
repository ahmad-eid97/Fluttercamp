//= Components
import EditArticle from '@/components/Panel/Content/Articles/New';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.articles.dropdown.newArticle}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelArticles(props: { params: Promise<{ locale: Locale, id: string }> }) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <EditArticle locale={locale} translations={(dictionary as Dictionary).panel.articles.new} articleId={id} />
  )
}

export default PanelArticles;
