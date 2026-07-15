//= Components
import PageHeader from "@/components/Common/PageHeader";
import BlogsWrapper from "@/components/Blogs";
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Types
import { Dictionary } from "@/types";
//= Api
import { getAllArticles } from "@/api";

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    title: `FlutterCamp - Blogs`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

export default async function Blogs() {
  const { locale, translations } = await getDictionary();
  const blogs = await getAllArticles();

  return (
    <main>
      <PageHeader
        title={translations.navbar.blog}
        homeTranslation={translations.pagesHeader.home}
        locale={locale}
      />
      <BlogsWrapper dictionary={translations as Dictionary} blogs={blogs?.data || []} />
    </main>
  );
}
