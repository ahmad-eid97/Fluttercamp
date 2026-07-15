//= Components
import AchievementsWrapper from '@/components/Panel/Content/Certificates/Achievements/Wrapper';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.certificates.dropdown.achievements}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function Achievements(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <AchievementsWrapper dictionary={dictionary as Dictionary} locale={locale} />
    </>
  )
}

export default Achievements;
