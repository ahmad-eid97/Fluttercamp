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
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && data ?
            <StatisticsBoxColumn
              title={translations.students}
              number={data.studentsCount}
              icon={<Icon icon='fluent-emoji-high-contrast:student' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="180px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && data ?
            <StatisticsBoxColumn
              title={translations.comments}
              number={data.commentsCount}
              icon={<Icon icon='mingcute:comment-fill' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="180px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && data ?
            <StatisticsBoxColumn
              title={translations.sales}
              number={data.salesCount}
              icon={<Icon icon='fontisto:wallet' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="180px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && data ?
            <StatisticsBoxColumn
              title={translations.salesAmount}
              number={formatter.format(+data.salesAmount || 0)}
              icon={<Icon icon='game-icons:wallet' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="180px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;