import { redirect } from 'next/navigation';
//= Components
import CheckoutSubscribeWrapper from '@/components/Checkout/SubscribeWrapper';
import PageHeader from '@/components/Common/PageHeader';
//= Auth Guard
import AuthGuard from "@/utils/authGuard";
//= Api
import { PaySubscriptionPlan } from '@/api';
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Types
import type { Locale } from '@/types';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dictionary = await getDictionary();

  return {
    title: `${lang === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.translations.pagesMetadata.checkout}`,
    description: 'FlutterCamp is an lms created by grids apps',
    icons: {
      icon: '/imgs/favicon.svg',
      shortcut: '/imgs/favicon.svg'
    }
  }
}

async function CheckoutSubscribePage(props: { params: Promise<{ locale: Locale, id: string }> }) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  await AuthGuard({ ifUserExist: false, redirectTo: '/login' });
  const dictionary = await getDictionary();

  const response = await PaySubscriptionPlan(+id);
  if (!response || !response.success) redirect('/panel/financial/subscribe');

  return (
    <>
      <PageHeader
        page={dictionary.translations.checkoutPage.header.title}
        title={dictionary.translations.checkoutPage.header.title}
        homeTranslation={dictionary.translations.pagesHeader.home}
        locale={locale}
        padding="120px 0 50px"
      />
      <CheckoutSubscribeWrapper locale={locale} translations={dictionary.translations.checkoutPage.items} subscribeId={id} />
    </>
  );
};

export default CheckoutSubscribePage;
