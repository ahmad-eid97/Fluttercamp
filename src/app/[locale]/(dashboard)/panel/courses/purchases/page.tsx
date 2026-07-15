//= Components
import StatisticsBoxes from '@/components/Panel/Content/Courses/List/StatisticsBoxes';
import MyPurchasesCoursesList from '@/components/Panel/Content/Courses/List/MyPurchasesList';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.courses.dropdown.myPurchases}`,
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
      <MyPurchasesCoursesList translations={(dictionary as Dictionary).panel.courses} locale={locale} />
    </>
  )
}

export default PanelCourses;
