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
    webinarsCount: number;
    webinarSalesAmount: number;
    courseSalesAmount: number;
    webinarHours: number;
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
              title={translations.courses}
              number={new Intl.NumberFormat().format(statistics.webinarsCount || 0)}
              icon={<Icon icon='ph:video-fill' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="160px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.totalHours}
              number={new Intl.NumberFormat().format(statistics.webinarHours || 0)}
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
              title={translations.liveClassesSales}
              number={new Intl.NumberFormat().format(statistics.webinarSalesAmount || 0)}
              icon={<Icon icon='fontisto:wallet' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="160px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.totalSales}
              number={new Intl.NumberFormat().format(statistics.courseSalesAmount || 0)}
              icon={<Icon icon='game-icons:wallet' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="160px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;