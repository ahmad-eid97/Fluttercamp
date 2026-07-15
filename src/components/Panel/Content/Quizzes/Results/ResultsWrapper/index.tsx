'use client';
import { useSearchParams } from 'next/navigation';
//= Components
import StatisticsBoxes from "../StatisticsBoxes";
import ResultsTable from "../ResultsTable";
//= Types
import { Dictionary, Locale } from "@/types";
//= Api
import { getResults } from "@/api/panel/quizzes";
import useRequest from "@/api/useRequest";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
}

function ResultsWrapper({ dictionary, locale }: Props) {
  const searchParams = useSearchParams();
  const { data, isLoading, refetch } = useRequest(getResults, generateFilterObject() || {});

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
        translations={dictionary.panel.quizzes.results.statisticsBoxes}
        isLoading={isLoading}
        statistics={{
          waitingCount: data?.waitingCount || 0,
          quizResultsCount: data?.quizResultsCount || 0,
          quizAvgGrad: data?.quizAvgGrad || 0,
          successRate: data?.successRate || 0
        }}
      />
      <ResultsTable
        translations={dictionary.panel.quizzes.results}
        locale={locale}
        isLoading={isLoading}
        data={data}
        refetch={refetch}
      />
    </>
  )
}

export default ResultsWrapper;