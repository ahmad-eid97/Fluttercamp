//= Components
import SubscribePlans from '@/components/Panel/Content/Financial/Subscribe';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.financial.dropdown.subscribe}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function Subscribe(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <SubscribePlans translations={(dictionary as Dictionary).panel.financial.subscribe} locale={locale} />
    </>
  )
}

export default Subscribe;
