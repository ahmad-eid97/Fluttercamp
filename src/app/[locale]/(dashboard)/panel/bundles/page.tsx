//= Components
import StatisticsBoxes from '@/components/Panel/Content/Bundles/List/StatisticsBoxes';
import BundlesList from '@/components/Panel/Content/Bundles/List/BundlesList';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.courseBundles.dropdown.myBundles}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelBundles(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <StatisticsBoxes translations={(dictionary as Dictionary).panel.bundles.statisticsBoxes} />
      <BundlesList translations={(dictionary as Dictionary).panel.bundles.list} locale={locale} />
    </>
  )
}

export default PanelBundles;
