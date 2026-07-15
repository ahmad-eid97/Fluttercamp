//= Components
import CreateTopic from '@/components/Panel/Content/Forums/CreateTopic';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.forums.dropdown.newTopic}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelFourms(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <CreateTopic translations={(dictionary as Dictionary).panel.forums.create} locale={locale} />
  )
}

export default PanelFourms;
