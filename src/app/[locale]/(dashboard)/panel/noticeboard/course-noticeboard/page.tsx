//= Components
import NoticesTable from '@/components/Panel/Content/Noticeboard/CourseNotices/NoticesTable';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.noticeboard.dropdown.courseNotices}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelPage(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <NoticesTable translations={(dictionary as Dictionary).panel.noticeboard.courseNotices} locale={locale} />
    </>
  )
}

export default PanelPage;