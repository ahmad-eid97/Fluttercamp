'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import StatisticsBoxColumn from '@/components/UIs/Statistics/SingleBoxColumn';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './statistics-boxes.module.scss';
import LoadingSkeleton from '@/components/UIs/Skeleton';

type Props = {
  translations: Dictionary['panel']['quizzes']['results']['statisticsBoxes'];
  isLoading: boolean;
  statistics: {
    waitingCount: number;
    quizResultsCount: number;
    quizAvgGrad: number;
    successRate: number;
  }
}

function StatisticsBoxes({ isLoading, translations, statistics }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.needReview}
            number={statistics.waitingCount}
            icon={<Icon icon="material-symbols:rate-review-outline" />}
          />
          :
          <LoadingSkeleton width='100%' height='190px' rounded />
        }
      </div>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.results}
            number={statistics.quizResultsCount}
            icon={<Icon icon="carbon:result-new" />}
          />
          :
          <LoadingSkeleton width='100%' height='190px' rounded />
        }
      </div>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.averageGrade}
            number={statistics.quizAvgGrad}
            icon={<Icon icon="carbon:chart-average" />}
          />
          :
          <LoadingSkeleton width='100%' height='190px' rounded />
        }
      </div>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.successRate}
            number={statistics.successRate}
            icon={<Icon icon="icon-park-solid:inbox-success" />}
          />
          :
          <LoadingSkeleton width='100%' height='190px' rounded />
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;