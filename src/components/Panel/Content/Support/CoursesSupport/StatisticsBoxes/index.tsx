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
  translations: Dictionary['panel']['support']['courses']['statisticsBoxes'];
}

function StatisticsBoxes({ translations }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.openConversations}
          number={0}
          icon={<Icon icon="fa6-solid:envelope-open-text" />}
        />
      </div>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.closedConversations}
          number={0}
          icon={<Icon icon="ph:envelope-fill" />}
        />
      </div>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.totalConversations}
          number={0}
          icon={<Icon icon="vaadin:envelopes" />}
        />
      </div>
    </div>
  )
}

export default StatisticsBoxes;