//= Components
import StatusScreen from '@/components/Checkout/StatusScreen';
//= Auth Guard
import AuthGuard from "@/utils/authGuard";
//= Api
import { verifyPaymentApi } from '@/api';
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

async function CheckoutSuccessPage(
  props: {
    params: Promise<{ locale: Locale }>, searchParams: Promise<{
      "gateway": string;
      "order_id": string;
      "user_id": string;
      "?trxref": string;
      "reference": string;
    }>
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    locale
  } = params;

  await AuthGuard({ ifUserExist: false, redirectTo: '/login' });
  const response = await verifyPaymentApi(searchParams.gateway, `?order_id=${searchParams.order_id}&user_id=${searchParams.user_id}&?trxref=${searchParams['?trxref']}&reference=${searchParams.reference}`);

  return (
    <>
      {
        response ?
          <StatusScreen statusInfo={response} />
          :
          <p style={{ textAlign: 'center', padding: '80px 0' }}>حدث خطأ ما في عرض نتيجة عملية الدفع</p>
      }
    </>
  );
};

export default CheckoutSuccessPage;