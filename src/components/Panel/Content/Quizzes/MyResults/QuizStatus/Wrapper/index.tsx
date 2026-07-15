'use client';
//= Components
import StatisticsBoxes from "../StatisticsBoxes";
import QuizStatus from "../Status";
//= Types
import type { Dictionary } from "@/types";
//= Api
import { getStatusQuizData } from "@/api";
import useRequest from "@/api/useRequest";

type Props = {
  dictionary: Dictionary;
  quizId: number;
}

function QuizStatusWrapper({ dictionary, quizId }: Props) {
  const { data: quizStatusData, isLoading } = useRequest(() => getStatusQuizData(quizId));

  return (
    <>
      <StatisticsBoxes translations={dictionary.panel.quizzes.tryAgain.statisticsBoxes} isLoading={isLoading} quiz={quizStatusData?.quiz} />
      <QuizStatus translations={dictionary.panel.quizzes.tryAgain} isLoading={isLoading} quiz={quizStatusData?.quiz} />
    </>
  )
}

export default QuizStatusWrapper;