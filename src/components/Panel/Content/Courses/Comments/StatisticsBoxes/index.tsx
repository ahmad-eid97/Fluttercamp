'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import StatisticsBoxColumn from '@/components/UIs/Statistics/SingleBoxColumn';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './statistics-boxes.module.scss';

type Props = {
  translations: Dictionary['panel']['courses']['comments']['statisticsBoxes'];
}

function StatisticsBoxes({ translations }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.comments}
          number={0}
          icon={<Icon icon='basil:comment-solid' />}
        />
      </div>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.replied}
          number={0}
          icon={<Icon icon='icon-park-solid:message-sent' />}
        />
      </div>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.notReplied}
          number={0}
          icon={<Icon icon='bxs:message-square-x' />}
        />
      </div>
    </div>
  )
}

export default StatisticsBoxes;