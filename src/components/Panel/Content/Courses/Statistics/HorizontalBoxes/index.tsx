'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import StatisticsBox from '@/components/UIs/Statistics/SingleBox';
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

function HorizontalStatisticsBoxes({ translations, data, isLoading }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && data ?
            <StatisticsBox
              title={translations.sections}
              number={data.chaptersCount}
              icon={<Icon icon='uis:web-section' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="130px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && data ?
            <StatisticsBox
              title={translations.sessions}
              number={data.sessionsCount}
              icon={<Icon icon='mingcute:black-board-fill' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="130px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && data ?
            <StatisticsBox
              title={translations.pendingQuizzes}
              number={data.pendingQuizzesCount}
              icon={<Icon icon='fluent:quiz-new-28-filled' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="130px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && data ?
            <StatisticsBox
              title={translations.pendingAssignments}
              number={data.pendingAssignmentsCount}
              icon={<Icon icon='material-symbols-light:assignment-add' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="130px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default HorizontalStatisticsBoxes;