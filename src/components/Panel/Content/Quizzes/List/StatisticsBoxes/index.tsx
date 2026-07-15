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
  translations: Dictionary['panel']['quizzes']['list']['statisticsBoxes'];
  isLoading: boolean;
  data: {
    quizzesCount: number;
    questionsCount: number;
    userCount: number;
  }
}

function StatisticsBoxes({ translations, isLoading, data }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.quizzes}
            number={data.quizzesCount || 0}
            icon={<Icon icon="fluent:quiz-new-24-regular" />}
          />
          :
          <LoadingSkeleton width='100%' height='190px' />
        }
      </div>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.questions}
            number={data.questionsCount || 0}
            icon={<Icon icon="mdi:frequently-asked-questions" />}
          />
          :
          <LoadingSkeleton width='100%' height='190px' />
        }
      </div>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.students}
            number={data.userCount || 0}
            icon={<Icon icon="fa6-solid:users" />}
          />
          :
          <LoadingSkeleton width='100%' height='190px' />
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;