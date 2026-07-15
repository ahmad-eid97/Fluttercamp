//= Components
import PageHeader from "@/components/Common/PageHeader";
import TrackDetailsWrapper from "@/components/TrackDetails";
//= Api
import { getBundleById, getBundleCourses } from "@/api";
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

type Props = {
  params: Promise<{
    id: string;
  }>;
}

export default async function TrackDetails(props: Props) {
  const params = await props.params;

  const {
    id
  } = params;

  const { locale, translations } = await getDictionary();
  const bundle = await asyncHandler(() => getBundleById(+id));
  const bundleCourses = await asyncHandler(() => getBundleCourses(id));

  return (
    <main>
      <PageHeader
        title={translations.navbar.tracks}
        homeTranslation={translations.pagesHeader.home}
        locale={locale}
      />
      <TrackDetailsWrapper
        bundle={bundle}
        bundleCourses={bundleCourses}
      />
    </main>
  )
}
