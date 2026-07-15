'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import StatisticsBoxColumn from '@/components/UIs/Statistics/SingleBoxColumn';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import type { Dictionary, GetInstructorCourseStatisticsResponse } from '@/types';
//= Styles
import cls from './statistics-boxes.module.scss';

type Props = {
  translations: Dictionary['panel']['courses']['statistics'];
  data: GetInstructorCourseStatisticsResponse | undefined;
  isLoading: boolean;
}

function StatisticsBoxes({ translations, data, isLoading }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && data ?
            <StatisticsBoxColumn
              title={translations.rating}
              number={data.courseRateCount}
              icon={<Icon icon='solar:stars-bold' />}
              bottomValue={{
                text: translations.totalRating,
                value: data.courseRate
              }}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="220px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && data ?
            <StatisticsBoxColumn
              title={translations.quizzes}
              number={data.quizStatusChart.data.reduce((total, num) => total + num, 0)}
              icon={<Icon icon='fluent:quiz-new-28-filled' />}
              bottomValue={{
                text: translations.averageGrade,
                value: data.quizzesAverageGrade
              }}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="220px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && data ?
            <StatisticsBoxColumn
              title={translations.assignments}
              number={data.assignmentsStatusChart.data.reduce((total, num) => total + num, 0)}
              icon={<Icon icon='material-symbols-light:assignment-add' />}
              bottomValue={{
                text: translations.averageGrade,
                value: data.assignmentsAverageGrade
              }}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="220px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;