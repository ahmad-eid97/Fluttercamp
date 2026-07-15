//= Components
import BookmarksWrapper from '@/components/Panel/Content/Forums/BookmarksWrapper';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.forums.dropdown.bookmarks}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelFourms(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <BookmarksWrapper dictionary={dictionary as Dictionary} locale={locale} />
    </>
  )
}

export default PanelFourms;
