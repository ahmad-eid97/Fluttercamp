'use client';
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from 'next/link';
//= Components
import ChartJs from "chart.js/auto";
import { CategoryScale, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import type { Dictionary, Locale, GetInstructorCourseStatisticsResponse } from '@/types';
//= Styles
import cls from './sales-chart.module.scss';

ChartJs.register(CategoryScale, Tooltip, Legend);
ChartJs.defaults.font.size = 13;
ChartJs.defaults.font.family = 'NotoSans';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['statistics'];
  data: GetInstructorCourseStatisticsResponse | undefined;
  isLoading: boolean;
}

function SalesChart({ translations, locale, data, isLoading }: Props) {
  const [series, setSeries] = useState([
    {
      name: 'Sales',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#383e506e',
      borderWidth: 2,
      borderColor: "#383e50",
      pointRadius: 4,
      fill: true,
      bezierCurve: true,
      lineTension: 0.4
    }
  ]);

  useEffect(() => {
    if (data) {
      setSeries([
        {
          name: 'Sales',
          data: data.monthlySalesChart.data,
          backgroundColor: '#383e506e',
          borderWidth: 2,
          borderColor: "#383e50",
          pointRadius: 4,
          fill: true,
          bezierCurve: true,
          lineTension: 0.4
        }
      ]);
    }
  }, [data]);

  return (
    <div className={`${cls.sales_chart} ${locale === 'ar' ? cls.ar : ''}`}>
      <h2>{translations.monthlySales}</h2>
      {
        !isLoading && data ?
          <Chart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: series
            }}
            height={200}
            type="line"
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
          :
          isLoading ? <LoadingSkeleton width="100%" height="350px" rounded /> : null
      }
    </div>
  )
}

export default SalesChart;