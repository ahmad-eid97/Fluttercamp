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
  translations: Dictionary['panel']['certificates']['statisticsBoxes'];
}

function StatisticsBoxes({ translations }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.activeCertificates}
          number={0}
          icon={<Icon icon="mdi:certificate" />}
        />
      </div>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.studentAchievements}
          number={0}
          icon={<Icon icon="game-icons:achievement" />}
        />
      </div>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.failedStudents}
          number={0}
          icon={<Icon icon="ep:failed" />}
        />
      </div>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.averageGrade}
          number={0}
          icon={<Icon icon="material-symbols:grade-outline" />}
        />
      </div>
    </div>
  )
}

export default StatisticsBoxes;