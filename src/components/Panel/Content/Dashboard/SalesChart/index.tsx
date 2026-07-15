'use client';
import React, { useState, useEffect } from "react";
//= Components
import LoadingSkeleton from '@/components/UIs/Skeleton';
import ChartJs from "chart.js/auto";
import { CategoryScale, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
//= Api
import { getDashboardQuickInfo } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './sales-chart.module.scss';

ChartJs.register(CategoryScale, Tooltip, Legend);
ChartJs.defaults.font.size = 13;
ChartJs.defaults.font.family = 'NotoSans';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['dashboard']['salesChart'];
}

const LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function lineDataset(data: number[]) {
  return {
    label: 'Sales',
    data,
    borderColor: '#1671b2',
    borderWidth: 3,
    pointRadius: 0,
    pointHoverRadius: 6,
    pointBackgroundColor: '#1671b2',
    pointHoverBackgroundColor: '#1671b2',
    pointHoverBorderColor: '#fff',
    pointHoverBorderWidth: 2,
    fill: true,
    backgroundColor: 'rgba(22, 113, 178, 0.14)',
    tension: 0.4,
  };
}

function SalesChart({ translations, locale }: Props) {
  const { data: statistics, isLoading } = useRequest(getDashboardQuickInfo);
  const [series, setSeries] = useState([lineDataset([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])]);

  useEffect(() => {
    if (statistics) {
      setSeries([lineDataset(statistics?.monthlyChart.data || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])]);
    }
  }, [statistics]);

  return (
    <div className={`${cls.sales_chart} ${locale === 'ar' ? cls.ar : ''}`}>
      <h2>{translations.title}</h2>
      {
        isLoading && !statistics ?
          <LoadingSkeleton width="100%" height="350px" rounded />
          :
          <div>
            <Chart
              data={{ labels: LABELS, datasets: series }}
              height={150}
              type="line"
              options={{
                responsive: true,
                interaction: { intersect: false, mode: 'index' },
                scales: {
                  y: {
                    beginAtZero: true,
                    border: { display: false },
                    grid: { color: 'rgba(17,24,39,0.06)' },
                    ticks: { color: '#9aa1ad', padding: 8, maxTicksLimit: 6 },
                  },
                  x: {
                    border: { display: false },
                    grid: { display: false },
                    ticks: { color: '#9aa1ad', padding: 6 },
                  },
                },
                plugins: {
                  title: { display: false, text: translations.chartTitle },
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: '#1b2433',
                    padding: 12,
                    cornerRadius: 10,
                    titleColor: '#cbd5e1',
                    bodyColor: '#fff',
                    bodyFont: { weight: 700 },
                    displayColors: false,
                  },
                },
              }}
            />
          </div>
      }
    </div>
  )
}

export default SalesChart;