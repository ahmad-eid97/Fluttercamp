//= Components
import PageHeader from "@/components/Common/PageHeader";
import AboutWrapper from "@/components/About";
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Types
import { Dictionary } from "@/types";

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    title: `FlutterCamp - About`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

export default async function About() {
  const { locale, translations } = await getDictionary();

  return (
    <main>
      <PageHeader
        title={translations.about.header.title}
        homeTranslation={translations.pagesHeader.home}
        locale={locale}
      />
      <AboutWrapper dictionary={translations as Dictionary} />
    </main>
  )
}
