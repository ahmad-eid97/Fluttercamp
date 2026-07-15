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
  translations: Dictionary['panel']['financial']['sales']['statisticsBoxes'];
  isLoading: boolean;
  statistics: {
    students_count: number;
    meetings_count: number;
    meeting_sales: number;
    total_sales: string;
  };
}

function StatisticsBoxes({ translations, isLoading, statistics }: Props) {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.students}
              number={new Intl.NumberFormat().format(statistics.students_count || 0)}
              icon={<Icon icon="fa-solid:users" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.sales}
              number={new Intl.NumberFormat().format(statistics.meetings_count || 0)}
              icon={<Icon icon="icon-park-solid:sales-report" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.meetingSales}
              number={formatter.format(statistics.meeting_sales || 0)}
              icon={<Icon icon="icon-park-solid:online-meeting" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.totalSales}
              number={formatter.format(+statistics.total_sales || 0)}
              icon={<Icon icon="fluent-mdl2:financial-solid" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;