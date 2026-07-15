//= Components
import FavoriteCoursesList from '@/components/Panel/Content/Courses/List/FavoriteCoursesList';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.courses.dropdown.favourites}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelCourses(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <FavoriteCoursesList translations={(dictionary as Dictionary).panel.courses.list} locale={locale} />
    </>
  )
}

export default PanelCourses;
