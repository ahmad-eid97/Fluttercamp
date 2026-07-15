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
  translations: Dictionary['panel']['quizzes']['myResults']['statisticsBoxes'];
  isLoading: boolean;
}

function StatisticsBoxes({ isLoading, translations }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.quizzes}
            number={0}
            icon={<Icon icon="material-symbols:quiz-outline" />}
          />
          :
          <LoadingSkeleton width='100%' height='190px' rounded />
        }
      </div>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.passed}
            number={0}
            icon={<Icon icon="fluent:quiz-new-24-regular" />}
          />
          :
          <LoadingSkeleton width='100%' height='190px' rounded />
        }
      </div>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.failed}
            number={0}
            icon={<Icon icon="icon-park:message-failed" />}
          />
          :
          <LoadingSkeleton width='100%' height='190px' rounded />
        }
      </div>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.openResults}
            number={0}
            icon={<Icon icon="fluent-mdl2:poll-results" />}
          />
          :
          <LoadingSkeleton width='100%' height='190px' rounded />
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;