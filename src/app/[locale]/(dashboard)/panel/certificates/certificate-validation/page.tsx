//= Components
import CertificateValidation from '@/components/Panel/Content/Certificates/Validation';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.certificates.dropdown.certificateValidation}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function CompletionCertificates(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <CertificateValidation translations={(dictionary as Dictionary).panel.certificates.validation} locale={locale} />
    </>
  )
}

export default CompletionCertificates;
