'use client';
import { useSearchParams } from 'next/navigation';
//= Components
import StatisticsBoxes from "../StatisticsBoxes";
import QuizzesTable from "../QuizzesTable";
//= Types
import { Dictionary, Locale } from "@/types";
//= Api
import { getAllPanelQuizzes } from "@/api/panel/quizzes";
import useRequest from "@/api/useRequest";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
}

function QuizzesWrapper({ dictionary, locale }: Props) {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const { data, isLoading, refetch } = useRequest(getAllPanelQuizzes, { page: page ? +page : 1 });

  return (
    <>
      <StatisticsBoxes
        translations={dictionary.panel.quizzes.list.statisticsBoxes}
        isLoading={isLoading}
        data={{
          quizzesCount: data?.quizzesCount || 0,
          questionsCount: data?.questionsCount || 0,
          userCount: data?.userCount || 0,
        }}
      />
      <QuizzesTable
        translations={dictionary.panel.quizzes.list}
        locale={locale}
        isLoading={isLoading}
        quizzes={data?.quizzes}
        refetch={refetch}
      />
    </>
  )
}

export default QuizzesWrapper;