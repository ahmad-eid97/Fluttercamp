//= Components
import CertificatesWrapper from '@/components/Panel/Content/Certificates/List/CertificatesWrapper';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.certificates.dropdown.list}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelCertificates(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <CertificatesWrapper dictionary={dictionary as Dictionary} locale={locale} />
    </>
  )
}

export default PanelCertificates;
