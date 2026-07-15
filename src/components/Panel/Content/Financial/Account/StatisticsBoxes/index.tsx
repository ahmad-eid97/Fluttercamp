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
  translations: Dictionary['panel']['financial']['account']['statisticsBoxes'];
}

function StatisticsBoxes({ translations }: Props) {
  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.accountCharge}
          number={0}
          icon={<Icon icon="solar:wallet-bold" />}
        />
      </div>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.readyToPayout}
          number={0}
          icon={<Icon icon="grommet-icons:currency" />}
        />
      </div>
      <div className={cls.item}>
        <StatisticsBoxColumn
          title={translations.totalIncome}
          number={0}
          icon={<Icon icon="ri:currency-fill" />}
        />
      </div>
    </div>
  )
}

export default StatisticsBoxes;