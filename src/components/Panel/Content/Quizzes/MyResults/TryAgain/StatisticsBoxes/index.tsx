'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import StatisticsBoxColumn from '@/components/UIs/Statistics/SingleBoxColumn';
//= Types
import type { Dictionary } from '@/types';
import { ExtendedQuiz } from '../Wrapper/types';
//= Styles
import cls from './statistics-boxes.module.scss';
import LoadingSkeleton from '@/components/UIs/Skeleton';

type Props = {
  translations: Dictionary['panel']['quizzes']['tryAgain']['statisticsBoxes'];
  isLoading: boolean;
  quiz: ExtendedQuiz | undefined;
}

function StatisticsBoxes({ translations, isLoading, quiz }: Props) {
  const router = useRouter();
  const [timeInSeconds, setTimeInSeconds] = useState(quiz ? +quiz?.time : 10 * 60);

  useEffect(() => {
    if (quiz) {
      setTimeInSeconds(+quiz?.time * 60);
    }
  }, [quiz])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeInSeconds(p => {
        if (p - 1 < 0) {
          clearIntervalAndRedirect(timer);
          return p;
        } else {
          return p - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function clearIntervalAndRedirect(timer: NodeJS.Timeout) {
    clearInterval(timer);
    if (quiz) router.push(`/panel/quizzes/${quiz?.id}/status`);
  }

  function formatTime(seconds: number) {
    // get the minutes and the remaining seconds
    const minutes = Math.floor(seconds / 60);
    const padSeconds = seconds % 60;
    // pad the minutes and seconds with zeros if needed
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = padSeconds.toString().padStart(2, "0");
    // return the formatted time
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && quiz ?
            <StatisticsBoxColumn
              title={translations.avgGrade}
              number={quiz.average_grade || 0}
              icon={<Icon icon="fluent:quiz-new-24-regular" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && quiz ?
            <StatisticsBoxColumn
              title={translations.attempts}
              number={quiz.attempt_state || '-'}
              icon={<Icon icon="carbon:exam-mode" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && quiz ?
            <StatisticsBoxColumn
              title={translations.questions}
              number={quiz.question_count || 0}
              icon={<Icon icon="material-symbols:quiz-outline" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && quiz ?
            <StatisticsBoxColumn
              title={translations.timeLeft}
              number={formatTime(timeInSeconds)}
              icon={<Icon icon="icon-park-outline:time" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;