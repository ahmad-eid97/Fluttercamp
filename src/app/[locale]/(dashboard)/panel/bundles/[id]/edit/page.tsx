//= Components
import Wrapper from "@/components/Panel/Content/Bundles/New/Wrapper";
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

type Props = {
  params: Promise<{
    locale: Locale;
    id: number;
  }>;
  searchParams: Promise<{
    step: string | undefined;
  }>
}

async function EditBundlePanel(props: Props) {
  const searchParams = await props.searchParams;

  const {
    step
  } = searchParams;

  const params = await props.params;

  const {
    locale,
    id
  } = params;

  await GuardTeacherOnlyPage({ redirect_to_if_not_verified: '/panel/bundles' });
  const { translations: dictionary } = await getDictionary();

  return (
    <Wrapper
      locale={locale}
      translations={(dictionary as Dictionary).panel.bundles.new}
      bundleId={id}
      step={step ? +step : undefined}
    />
  )
}

export default EditBundlePanel
