'use client';
import { useSearchParams } from 'next/navigation';
//= Components
import StatisticsBoxes from "../StatisticsBoxes";
import MyResultsTable from "../MyResultsTable";
//= Types
import { Dictionary, Locale } from "@/types";
//= Api
import { getMyResults } from "@/api/panel/quizzes";
import useRequest from "@/api/useRequest";

type Props = {
  dictionary: Dictionary,
  locale: Locale
}

function MyResultsWrapper({ dictionary, locale }: Props) {
  const searchParams = useSearchParams();
  const { data, isLoading, refetch } = useRequest(getMyResults, generateFilterObject() || {});

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
        translations={dictionary.panel.quizzes.myResults.statisticsBoxes}
        isLoading={isLoading}
      // statistics={{
      //   quizCount: data?.results?.data || 0,
      //   questionsCount: data?.questionsCount || 0,
      //   userCount: data?.userCount || 0
      // }}
      />
      <MyResultsTable
        translations={dictionary.panel.quizzes.myResults}
        locale={locale}
        isLoading={isLoading}
        data={data}
        refetch={refetch}
      />
    </>
  )
}

export default MyResultsWrapper;