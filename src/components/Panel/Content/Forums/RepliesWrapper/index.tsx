'use client';
import { useSearchParams } from 'next/navigation';
//= Components
import RepliesTable from "./RepliesTable";
//= Types
import { Dictionary, Locale } from "@/types";
//= Api
import { getForumsTopicReplies } from "@/api";
import useRequest from "@/api/useRequest";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
}

function RepliesWrapper({ dictionary, locale }: Props) {
  const searchParams = useSearchParams();
  const { data, isLoading, refetch } = useRequest(getForumsTopicReplies, generateFilterObject() || {});

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
      <RepliesTable
        translations={dictionary.panel.forums.repliesTable}
        locale={locale}
        isLoading={isLoading}
        posts={data?.posts}
        refetch={refetch}
      />
    </>
  )
}

export default RepliesWrapper;