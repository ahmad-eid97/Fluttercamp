'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import StatisticsBoxColumn from '@/components/UIs/Statistics/SingleBoxColumn';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './statistics-boxes.module.scss';

type Props = {
  translations: Dictionary['panel']['assignments']['statisticsBoxes'];
  isLoading: boolean;
  statistics: {
    course_assignments_count: number;
    pending_reviews_count: number;
    passed_count: number;
    failed_count: number;
  };
}

function StatisticsBoxes({ translations, isLoading, statistics }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.courseAssignments}
              number={new Intl.NumberFormat().format(statistics.course_assignments_count || 0)}
              icon={<Icon icon='material-symbols:assignment' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.pendingReview}
              number={new Intl.NumberFormat().format(statistics.pending_reviews_count || 0)}
              icon={<Icon icon='mdi:receipt-pending' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.passed}
              number={new Intl.NumberFormat().format(statistics.passed_count || 0)}
              icon={<Icon icon='mdi:paper-check' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.failed}
              number={new Intl.NumberFormat().format(statistics.failed_count || 0)}
              icon={<Icon icon='mdi:paper-remove' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;