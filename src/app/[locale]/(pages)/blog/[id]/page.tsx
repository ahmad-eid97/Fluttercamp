//= Components
import PageHeader from "@/components/Common/PageHeader";
import BlogWrapper from "@/components/Blog";
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Api
import { getArticleById } from "@/api";

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    title: `FlutterCamp - Blog Details`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Blog(props: Props) {
  const params = await props.params;

  const {
    id
  } = params;

  const { locale, translations } = await getDictionary();
  const blog = await getArticleById(+id);

  return (
    <main>
      <PageHeader
        title={translations.navbar.blog}
        homeTranslation={translations.pagesHeader.home}
        locale={locale}
      />
      <BlogWrapper blog={blog} />
    </main>
  );
}
