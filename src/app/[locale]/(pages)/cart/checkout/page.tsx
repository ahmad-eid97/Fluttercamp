import { redirect } from 'next/navigation';
//= Components
import AuthGuard from '@/utils/authGuard';
import PageHeader from '@/components/Common/PageHeader';
import CheckoutWrapper from '@/components/Checkout';
//= Api
import { getCheckoutData } from '@/api';
//= I18n
import getDictionary from '@/dictionaries/serverDictionary';
//= Types
import type { Locale } from '@/types';

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dictionary = await getDictionary();

  return {
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.translations.pagesMetadata.checkout}`,
    description: 'FlutterCamp is an lms created by grids apps',
    icons: {
      icon: '/imgs/favicon.svg',
      shortcut: '/imgs/favicon.svg'
    }
  }
}

async function CheckoutPage(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await AuthGuard({ ifUserExist: false, redirectTo: '/login' });
  const dictionary = await getDictionary();

  const response = await getCheckoutData();
  if (!response || !response.success) redirect('/cart');

  return (
    <>
      <PageHeader
        page={dictionary.translations.checkoutPage.header.title}
        title={dictionary.translations.checkoutPage.header.title}
        homeTranslation={dictionary.translations.pagesHeader.home}
        locale={locale}
        padding="120px 0 50px"
      />
      <CheckoutWrapper locale={locale} translations={dictionary.translations.checkoutPage.items} />
    </>
  );
};

export default CheckoutPage;
