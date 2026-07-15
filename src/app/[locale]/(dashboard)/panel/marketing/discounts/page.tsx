//= Components
import AddNewDiscount from '@/components/Panel/Content/Marketing/Discounts/New';
import DiscountsTable from '@/components/Panel/Content/Marketing/Discounts/DiscountsTable';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.marketing.dropdown.discounts}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function MarketingDiscounts(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <AddNewDiscount translations={(dictionary as Dictionary).panel.marketing.discounts} locale={locale} />
      <DiscountsTable translations={(dictionary as Dictionary).panel.marketing.discounts} locale={locale} />
    </>
  )
}

export default MarketingDiscounts;