'use client';
import React from 'react';
//= Components
import StatisticsBoxColumn from '@/components/UIs/Statistics/SingleBoxColumn';
import LoadingSkeleton from '@/components/UIs/Skeleton';
import { Icon } from '@iconify/react';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './statistics-boxes.module.scss';

type Props = {
  translations: Dictionary['panel']['financial']['payout']['statisticsBoxes'];
  isLoading: boolean;
  statistics: {
    account_charge: number;
    minimum_payout: number;
    total_income: number;
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
              title={translations.accountCharge}
              number={formatter.format(statistics.account_charge || 0) || 0}
              icon={<Icon icon="solar:wallet-bold" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.readyToPayout}
              number={formatter.format(+statistics.minimum_payout || 0)}
              icon={<Icon icon="grommet-icons:currency" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.totalIncome}
              number={formatter.format(statistics.total_income || 0) || 0}
              icon={<Icon icon="ri:currency-fill" />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="190px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;