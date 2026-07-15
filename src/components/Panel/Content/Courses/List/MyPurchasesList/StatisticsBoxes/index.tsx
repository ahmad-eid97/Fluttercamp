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
  translations: Dictionary['panel']['courses']['statisticsBoxes'];
  statistics: {
    purchased: number;
    hours: number;
    upcoming: number;
  };
  isLoading: boolean;
}

function StatisticsBoxes({ translations, statistics, isLoading }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.purchased}
              number={new Intl.NumberFormat().format(statistics.purchased || 0)}
              icon={<Icon icon='solar:card-bold' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="160px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.hours}
              number={new Intl.NumberFormat().format(statistics.hours || 0)}
              icon={<Icon icon='zondicons:hour-glass' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="160px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.upcoming}
              number={new Intl.NumberFormat().format(statistics.upcoming || 0)}
              icon={<Icon icon='raphael:future' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="160px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;