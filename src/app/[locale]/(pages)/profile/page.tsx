//= Components
import PageHeader from "@/components/Common/PageHeader";
import ProfileComponent from "@/components/Profile";
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    title: `FlutterCamp - Profile`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

export default async function Profile() {
  const { locale, translations } = await getDictionary();

  return (
    <main>
      <PageHeader
        title={translations.navbar.user_menu.profile}
        homeTranslation={translations.pagesHeader.home}
        locale={locale}
      />
      <ProfileComponent />
    </main>
  )
}
