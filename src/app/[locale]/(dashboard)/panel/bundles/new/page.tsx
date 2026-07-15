//= Components
import CreateBundleWrapper from "@/components/Panel/Content/Bundles/New/Wrapper";
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.courseBundles.dropdown.newBundle}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function NewBundlePanel(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await GuardTeacherOnlyPage({ redirect_to_if_not_verified: '/panel/bundles' });
  const { translations: dictionary } = await getDictionary();

  return (
    <CreateBundleWrapper
      locale={locale}
      translations={(dictionary as Dictionary).panel.bundles.new}
    />
  )
}

export default NewBundlePanel;
