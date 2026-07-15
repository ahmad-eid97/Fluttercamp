//= Components
import PageHeader from "@/components/Common/PageHeader";
import LibraryWrapper from "@/components/Library";
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Api
import { getAllCategories } from "@/api";

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    title: `FlutterCamp - Library`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

export default async function Library() {
  const { locale, translations } = await getDictionary();
  const categories = await getAllCategories();

  return (
    <main>
      <PageHeader
        title={translations.navbar.library}
        homeTranslation={translations.pagesHeader.home}
        locale={locale}
      />
      <LibraryWrapper categories={categories?.categories || []} />
    </main>
  )
}
