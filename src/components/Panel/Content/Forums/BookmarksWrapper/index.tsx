'use client';
import { useSearchParams } from 'next/navigation';
//= Components
import SectionTitle from "./BookmarkedTopicsTable/Title";
import BookmarksTable from "./BookmarkedTopicsTable";
//= Types
import { Dictionary, Locale } from "@/types";
//= Api
import { getForumsBookmarkedTopics } from "@/api";
import useRequest from "@/api/useRequest";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
}

function BookmarksWrapper({ dictionary, locale }: Props) {
  const searchParams = useSearchParams();
  const { data, isLoading, refetch } = useRequest(getForumsBookmarkedTopics, generateFilterObject() || {});

  function generateFilterObject() {
    let filter: { [key: string]: string } = {};
    const searchParamsArray = Array.from(searchParams.entries());

    if (!searchParamsArray.length) return false;

    searchParamsArray.forEach(param => {
      if (param[0] === 'instructor_id') return;
      filter[param[0]] = param[1];
    });

    return filter;
  }

  return (
    <>
      <SectionTitle translations={dictionary.panel.forums.topicsTable} />
      <BookmarksTable
        translations={dictionary.panel.forums.topicsTable}
        locale={locale}
        isLoading={isLoading}
        topics={data?.topics}
        refetch={refetch}
      />
    </>
  )
}

export default BookmarksWrapper;
