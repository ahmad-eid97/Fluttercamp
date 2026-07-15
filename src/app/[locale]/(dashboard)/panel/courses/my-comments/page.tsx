//= Components
import CommentsTable from '@/components/Panel/Content/Courses/Comments/CommentsTable';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.courses.dropdown.myComments}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelMyComments(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <CommentsTable translations={(dictionary as Dictionary).panel.courses.comments} locale={locale} type='my-comments' />
  )
}

export default PanelMyComments;
