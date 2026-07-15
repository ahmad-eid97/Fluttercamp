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
  translations: Dictionary['panel']['noticeboard']['statisticsBoxes'];
  statistics: {
    totalNoticeboards: number;
    totalCourseNotices: number;
    totalGeneralNotices: number;
  }
  isLoading: boolean;
}

function StatisticsBoxes({ translations, statistics, isLoading }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.totalNotices}
              number={new Intl.NumberFormat().format(statistics.totalNoticeboards || 0)}
              icon={<Icon icon='ph:bell-fill' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="180px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.courseNotices}
              number={new Intl.NumberFormat().format(statistics.totalCourseNotices || 0)}
              icon={<Icon icon='mdi:doorbell-video' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="180px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.generalNotices}
              number={new Intl.NumberFormat().format(statistics.totalGeneralNotices || 0)}
              icon={<Icon icon='ri:bell-fill' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="180px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;