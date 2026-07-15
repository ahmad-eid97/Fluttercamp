'use client';
import { useRouter } from "next/navigation";
//= Components
import StatisticsBoxes from "../StatisticsBoxes";
import ResultsForm from "../ResultsForm";
//= Types
import { Dictionary, Locale } from "@/types";
//= Api
import useRequest from "@/api/useRequest";
import { getResultQuizData } from "@/api";
import { useEffect } from "react";
import { toastError } from "@/utils/toast";
import { translationsHandler } from "@/utils/translationsHandler";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
  quizId: number;
}

function ResultsWrapper({ locale, dictionary, quizId }: Props) {
  const { data: quizData, isLoading } = useRequest(() => getResultQuizData(quizId));
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !quizData) {
      toastError(dictionary.panel.quizzes.studentResults.notFound);
      router.back();
    };
    if (quizData?.quizResult?.status === 'passed' || quizData?.quizResult?.status === 'failed') router.push('/panel/quizzes/my-results');
    // eslint-disable-next-line
  }, [quizData])

  return (
    <>
      <StatisticsBoxes
        translations={dictionary.panel.quizzes.studentResults.statisticsBoxes}
        isLoading={isLoading}
        statistics={{
          average_grade: quizData?.questionsSumGrade || 0,
          attempt_state: quizData?.numberOfAttempt || 0,
          question_count: quizData?.quizQuestions?.length || 0,
          auth_status: quizData?.quizResult?.status || '-'
        }}
      />
      <ResultsForm locale={locale} translations={dictionary.panel.quizzes.studentResults} isLoading={isLoading} quizTitle={quizData?.quiz ? translationsHandler(quizData?.quiz?.translations, locale).title : ''} questions={quizData?.quizQuestions || []} userAnswers={quizData?.userAnswers || null} />
    </>
  )
}

export default ResultsWrapper;