'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import StatisticsBoxColumn from '@/components/UIs/Statistics/SingleBoxColumn';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { getMyBundles } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './statistics-boxes.module.scss';

type Props = {
  translations: Dictionary['panel']['bundles']['statisticsBoxes'];
}

function StatisticsBoxes({ translations }: Props) {
  const { data, isLoading, isError } = useRequest(getMyBundles);

  const statistics = data ? {
    bundles_count: data.bundles_count,
    bundle_sales_amount: data.bundle_sales_amount,
    bundle_sales_count: data.bundle_sales_count,
    bundles_hours: data.bundles_hours
  } : null;

  return (
    <div className={`${cls.box}`}>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.courseBundles}
              number={new Intl.NumberFormat().format(statistics.bundles_count || 0) || 0}
              icon={<Icon icon='clarity:bundle-solid' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="160px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.totalHours}
              number={new Intl.NumberFormat().format(+statistics.bundles_hours || 0) || 0}
              icon={<Icon icon='zondicons:hour-glass' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="160px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.bundlesSales}
              number={new Intl.NumberFormat().format(statistics.bundle_sales_amount || 0) || 0}
              icon={<Icon icon='game-icons:wallet' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="160px" rounded /> : null
        }
      </div>
      <div className={cls.item}>
        {
          !isLoading && statistics ?
            <StatisticsBoxColumn
              title={translations.salesCount}
              number={new Intl.NumberFormat().format(statistics.bundle_sales_count || 0) || 0}
              icon={<Icon icon='mingcute:counter-2-fill' />}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="160px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StatisticsBoxes;