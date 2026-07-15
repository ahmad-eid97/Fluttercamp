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
  translations: Dictionary['panel']['achievements']['statisticsBoxes'];
}

function StatisticsBoxes({ translations }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.certificates}
          number={0}
          icon={<Icon icon="mdi:certificate" />}
        />
      </div>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.averageGrade}
          number={0}
          icon={<Icon icon="game-icons:achievement" />}
        />
      </div>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.failedQuizzes}
          number={0}
          icon={<Icon icon="ep:failed" />}
        />
      </div>
    </div>
  )
}

export default StatisticsBoxes;