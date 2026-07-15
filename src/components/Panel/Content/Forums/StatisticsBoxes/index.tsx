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
  translations: Dictionary['panel']['forums']['statisticsBoxes'];
  isLoading: boolean;
  statistics: {
    publishedTopics: number;
    closedTopics: number;
    topicReplies: number;
  }
}

function StatisticsBoxes({ translations, isLoading, statistics }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.publishedTopics}
            number={statistics.publishedTopics}
            icon={<Icon icon='icon-park-solid:message-sent' />}
          />
          :
          <LoadingSkeleton width="100%" height="192px" rounded />
        }
      </div>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.closedTopics}
            number={statistics.closedTopics}
            icon={<Icon icon='mdi:forum-remove' />}
          />
          :
          <LoadingSkeleton width="100%" height="192px" rounded />
        }
      </div>
      <div className={cls.item}>
        {!isLoading ?
          <StatisticsBoxColumn
            title={translations.topicReplies}
            number={statistics.topicReplies}
            icon={<Icon icon='mdi:message-badge' />}
          />
          :
          <LoadingSkeleton width="100%" height="192px" rounded />
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;