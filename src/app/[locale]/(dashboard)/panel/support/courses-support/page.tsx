//= Components
import StatisticsBoxes from '@/components/Panel/Content/Support/CoursesSupport/StatisticsBoxes';
import CoursesTable from '@/components/Panel/Content/Support/CoursesSupport/CoursesTable';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.support.dropdown.coursesSupport}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function CoursesSupport(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <StatisticsBoxes translations={(dictionary as Dictionary).panel.support.courses.statisticsBoxes} />
      <CoursesTable locale={locale} translations={(dictionary as Dictionary).panel.support.courses.table} />
    </>
  )
}

export default CoursesSupport;
