'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
//= Components
import StatisticsBoxes from "../StatisticsBoxes";
import TryAgainForm from "../TryAgainForm";
//= Utils
import { toastError } from "@/utils/toast";
//= Types
import type { Dictionary } from "@/types";
//= Api
import { getStartQuizData } from "@/api";
import useRequest from "@/api/useRequest";

type Props = {
  dictionary: Dictionary;
  quizId: number;
}

function QuizStartWrapper({ dictionary, quizId }: Props) {
  const { data: quizData, isLoading } = useRequest(() => getStartQuizData(quizId));
  const router = useRouter();

  useEffect(() => {
    // @ts-ignore
    if (!isLoading && !quizData?.success && !quizData?.quiz) {
      // @ts-ignore
      switch (quizData?.status) {
        case 'max_attempt':
          toastError('You reached max attempts to solve this quiz');
          break;
        case 'passed':
          toastError('You already passed this quiz!');
          break;
        case 'failed':
          toastError('You already failed in this quiz!');
          break;
        default:
          toastError('Something went wrong');
          break;
      }
      router.push(`/panel/quizzes/${quizId}/status`);
    }
  }, [isLoading, quizData, quizId, router]);

  return (
    <>
      <StatisticsBoxes translations={dictionary.panel.quizzes.tryAgain.statisticsBoxes} isLoading={isLoading} quiz={quizData?.quiz} />
      <TryAgainForm translations={dictionary.panel.quizzes.tryAgain} isLoading={isLoading} questionsCount={quizData?.quiz?.question_count || 0} quizTitle={quizData?.quiz?.title || ''} questions={quizData?.quiz?.questions} />
    </>
  )
}

export default QuizStartWrapper;