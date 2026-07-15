//= Components
import PageHeader from '@/components/Common/PageHeader';
import CartWrapper from '@/components/Cart';
//= Utils
import AuthGuard from '@/utils/authGuard';
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    title: `FlutterCamp - Cart`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}


async function CartPage() {
  await AuthGuard({ ifUserExist: false, redirectTo: '/login' });
  const { locale, translations } = await getDictionary();

  return (
    <>
      <PageHeader
        title={translations.navbar.cart}
        homeTranslation={translations.pagesHeader.home}
        locale={locale}
      />
      <CartWrapper />
    </>
  );
};

export default CartPage;
