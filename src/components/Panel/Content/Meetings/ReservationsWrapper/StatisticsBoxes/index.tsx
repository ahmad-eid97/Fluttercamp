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
  translations: Dictionary['panel']['meetings']['statisticsBoxes'];
  isLoading: boolean;
  statistics: {
    openMeetings: number;
    totalMeetings: number;
    activeHours: number;
  }
}

function StatisticsBoxes({ translations, isLoading, statistics }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.openMeetings}
              number={new Intl.NumberFormat().format(statistics.openMeetings || 0)}
              icon={<Icon icon='streamline:group-meeting-call-solid' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.totalMeetings}
              number={new Intl.NumberFormat().format(statistics.totalMeetings || 0)}
              icon={<Icon icon='fa6-solid:users-rectangle' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.activeHours}
              number={new Intl.NumberFormat().format(+(statistics.activeHours / (60 * 60)).toFixed(2))}
              icon={<Icon icon='material-symbols:time-auto' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;