'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import StatisticsBoxColumn from '@/components/UIs/Statistics/SingleBoxColumn';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import type { Dictionary } from '@/types';
import { ExtendedQuiz } from '../../../MyResults/TryAgain/Wrapper/types';
//= Styles
import cls from './statistics-boxes.module.scss';

type Props = {
  translations: Dictionary['panel']['quizzes']['studentResults']['statisticsBoxes'];
  isLoading: boolean;
  statistics: {
    average_grade: number;
    attempt_state: number;
    question_count: number;
    auth_status: string;
  };
}

function StatisticsBoxes({ translations, isLoading, statistics }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.avgGrade}
              number={statistics.average_grade || 0}
              icon={<Icon icon="fluent:quiz-new-24-regular" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.attempts}
              number={statistics.attempt_state || '-'}
              icon={<Icon icon="carbon:exam-mode" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.questions}
              number={statistics.question_count || 0}
              icon={<Icon icon="material-symbols:quiz-outline" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.status}
              number={statistics.auth_status || ''}
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