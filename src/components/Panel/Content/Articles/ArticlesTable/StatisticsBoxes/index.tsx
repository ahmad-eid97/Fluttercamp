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
  translations: Dictionary['panel']['articles']['table']['statisticsBoxes'];
  isLoading: boolean;
  statistics: {
    posts_count: number,
    comment_count: number,
    pending_publish_count: number
  };
}

function StatisticsBoxes({ translations, isLoading, statistics }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.articles}
              number={new Intl.NumberFormat().format(statistics.posts_count || 0) || 0}
              icon={<Icon icon='ooui:articles-ltr' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.comments}
              number={new Intl.NumberFormat().format(statistics.comment_count || 0) || 0}
              icon={<Icon icon='mingcute:comment-fill' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.pendingForPublish}
              number={new Intl.NumberFormat().format(statistics.pending_publish_count || 0) || 0}
              icon={<Icon icon='mdi:receipt-text-pending' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;