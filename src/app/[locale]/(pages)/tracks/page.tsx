//= Components
import PageHeader from "@/components/Common/PageHeader";
import TracksWrapper from "@/components/Tracks";
//= Api
import { getAllBundles } from "@/api";
//= Utils
import { asyncHandler } from "@/utils/asyncHandler";
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    // title: `${translations.pagesTitles.websiteName} - ${translations.pagesTitles.dashboard}`,
    title: `FlutterCamp - Tracks`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

export default async function Tracks() {
  const { locale, translations } = await getDictionary();
  const bundles = await asyncHandler(() => getAllBundles({ page: 1 }));

  return (
    <main>
      <PageHeader
        title={translations.navbar.tracks}
        homeTranslation={translations.pagesHeader.home}
        locale={locale}
      />
      <TracksWrapper tracks={bundles} />
    </main>
  )
}
