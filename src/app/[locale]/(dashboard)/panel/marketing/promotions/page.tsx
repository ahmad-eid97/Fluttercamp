//= Components
import SectionTitle from '@/components/Panel/Content/Marketing/Promotions/Title';
import PromotionsTable from '@/components/Panel/Content/Marketing/Promotions/PromotionsTable';
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Utils
import GuardTeacherOnlyPage from '@/utils/teacherOnlyGuard';
//= Types
import type { Locale, Dictionary } from '@/types';

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return {
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.marketing.dropdown.promotions}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function MarketingPromotions(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <SectionTitle translations={(dictionary as Dictionary).panel.marketing.promotions} />
      <PromotionsTable translations={(dictionary as Dictionary).panel.marketing.promotions} locale={locale} />
    </>
  )
}

export default MarketingPromotions;
