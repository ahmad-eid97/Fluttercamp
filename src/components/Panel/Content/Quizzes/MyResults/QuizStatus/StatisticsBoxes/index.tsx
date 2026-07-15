'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import StatisticsBoxColumn from '@/components/UIs/Statistics/SingleBoxColumn';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import type { Dictionary } from '@/types';
import { ExtendedQuiz } from '../../TryAgain/Wrapper/types';
//= Styles
import cls from './statistics-boxes.module.scss';

type Props = {
  translations: Dictionary['panel']['quizzes']['tryAgain']['statisticsBoxes'];
  isLoading: boolean;
  quiz: ExtendedQuiz | undefined;
}

function StatisticsBoxes({ translations, isLoading, quiz }: Props) {
  const router = useRouter();

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
              title={translations.status}
              number={quiz?.auth_status || '-'}
              icon={<Icon icon="fluent:status-12-regular" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;