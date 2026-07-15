import { redirect } from "next/navigation";
//== Components
import PageHeader from '@/components/Common/PageHeader';
import SearchResult from "@/components/SearchResult";
//= Api
import { searchInDatabase } from '@/api/general';
//= I18n
import getDictionary from '@/dictionaries/serverDictionary';
//= Types
import type { SearchResponse } from "@/types";

export async function generateMetadata() {

  return {
    title: `FlutterCamp - Search`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

type IProps = {
  searchParams: {
    keyword: string;
  }
}

const SearchPage: React.FC<IProps> = async props => {
  const searchParams = await props.searchParams;

  const {
    keyword
  } = searchParams;

  const { locale } = await getDictionary();
  if (!keyword) redirect('/');
  let searchData: SearchResponse | null = null;

  try {
    const data = await searchInDatabase(keyword);
    if (data) searchData = data;
  } catch (err) { }

  if (!searchData) redirect('/');

  return (
    <>
      <PageHeader
        page="البحث"
        title="نتائج البحث"
        homeTranslation="الصفحة الرئيسية"
        locale={locale}
        padding="10px 0 10px"
      />
      <SearchResult data={searchData} />
    </>
  );
}

export default SearchPage;