//= Components
import FinancialSummary from '@/components/Panel/Content/Financial/Summary';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.financial.dropdown.financialSummary}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function Summary(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <FinancialSummary locale={locale} translations={(dictionary as Dictionary).panel.financial.summary} />
    </>
  )
}

export default Summary;
