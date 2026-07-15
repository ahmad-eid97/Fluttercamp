//= Components
import StatisticsBoxes from '@/components/Panel/Content/Financial/Account/StatisticsBoxes';
import PaymentGateway from '@/components/Panel/Content/Financial/Account/PaymentGateway';
import BankAccounts from '@/components/Panel/Content/Financial/Account/BankAccounts';
import OfflinePaymentRequests from '@/components/Panel/Content/Financial/Account/OfflinePaymentRequests';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.financial.dropdown.chargeAccount}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function Account(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <StatisticsBoxes translations={(dictionary as Dictionary).panel.financial.account.statisticsBoxes} />
      <PaymentGateway translations={(dictionary as Dictionary).panel.financial.account.payment} locale={locale} />
      <BankAccounts translations={(dictionary as Dictionary).panel.financial.account.accounts} locale={locale} />
      <OfflinePaymentRequests translations={(dictionary as Dictionary).panel.financial.account.offline} locale={locale} />
    </>
  )
}

export default Account;
