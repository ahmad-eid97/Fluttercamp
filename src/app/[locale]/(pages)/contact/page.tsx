//= Components
import PageHeader from "@/components/Common/PageHeader";
import ContactWrapper from "@/components/Contact";
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    title: `FlutterCamp - Contact Us`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

export default async function Contact() {
  const { locale, translations } = await getDictionary();

  return (
    <main>
      <PageHeader
        title={translations.navbar.contact}
        homeTranslation={translations.pagesHeader.home}
        locale={locale}
      />
      <ContactWrapper />
    </main>
  );
}
