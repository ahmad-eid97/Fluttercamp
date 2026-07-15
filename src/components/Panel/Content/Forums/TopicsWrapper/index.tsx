'use client';
import { useSearchParams } from 'next/navigation';
//= Components
import StatisticsBoxes from "../StatisticsBoxes";
import TopicsTable from "./TopicsTable";
//= Types
import { Dictionary, Locale } from "@/types";
//= Api
import { getForumsTopics } from "@/api";
import useRequest from "@/api/useRequest";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
}

function TopicsWrapper({ dictionary, locale }: Props) {
  const searchParams = useSearchParams();
  const { data, isLoading, refetch } = useRequest(getForumsTopics, generateFilterObject() || {});

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
      <StatisticsBoxes
        translations={dictionary.panel.forums.statisticsBoxes}
        isLoading={isLoading}
        statistics={{
          publishedTopics: data?.publishedTopics || 0,
          closedTopics: data?.lockedTopics || 0,
          topicReplies: data?.topicMessages || 0
        }} />
      <TopicsTable
        translations={dictionary.panel.forums.topicsTable}
        locale={locale}
        isLoading={isLoading}
        topics={data?.topics}
        refetch={refetch}
      />
    </>
  )
}

export default TopicsWrapper;
