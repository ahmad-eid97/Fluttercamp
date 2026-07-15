import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
//= Components
import SuccessScreen from '@/components/Checkout/SuccessScreen';
import PageHeader from '@/components/Common/PageHeader';
//= Auth Guard
import AuthGuard from "@/utils/authGuard";
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Types
import type { Locale } from '@/types';

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dictionary = await getDictionary();

  return {
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.translations.pagesMetadata.checkoutSuccess}`,
    description: 'FlutterCamp is an lms created by grids apps',
    icons: {
      icon: '/imgs/favicon.svg',
      shortcut: '/imgs/favicon.svg'
    }
  }
}

async function CheckoutSuccessPage(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await AuthGuard({ ifUserExist: false, redirectTo: '/login' });
  const dictionary = await getDictionary();
  const isCookieExist = (await cookies()).get('FlutterCamp-checkout-success')?.value;

  if (!isCookieExist || isCookieExist !== '1') {
    redirect('/cart/checkout');
  }

  return (
    <>
      <PageHeader
        page={dictionary.translations.checkoutPage.header.successTitle}
        title={dictionary.translations.checkoutPage.header.successTitle}
        homeTranslation={dictionary.translations.pagesHeader.home}
        locale={locale}
        padding="120px 0 80px"
      />
      <SuccessScreen />
    </>
  );
};

export default CheckoutSuccessPage;