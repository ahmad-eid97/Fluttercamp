'use client';
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from 'next/link';
//= Components
import ChartJs from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Chart } from "react-chartjs-2";
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import type { Dictionary, Locale, GetInstructorCourseStatisticsResponse } from '@/types';
//= Styles
import cls from './progress-chart.module.scss';

ChartJs.register(CategoryScale);
ChartJs.defaults.font.size = 13;
ChartJs.defaults.font.family = 'NotoSans';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['statistics'];
  data: GetInstructorCourseStatisticsResponse | undefined;
  isLoading: boolean;
}

function ProgressChart({ translations, locale, data, isLoading }: Props) {
  const [series, setSeries] = useState([
    {
      name: 'Progress',
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
  const [labels, setLabels] = useState(['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'])

  useEffect(() => {
    if (data) {
      setSeries([
        {
          name: 'Progress',
          data: data.courseProgressLineChart.data,
          backgroundColor: '#383e506e',
          borderWidth: 2,
          borderColor: "#383e50",
          pointRadius: 4,
          fill: true,
          bezierCurve: true,
          lineTension: 0.4
        }
      ]);

      setLabels(data.courseProgressLineChart.labels);
    }
  }, [data]);

  return (
    <div className={`${cls.progress_chart} ${locale === 'ar' ? cls.ar : ''}`}>
      <h2>{translations.courseProgressPercent}</h2>
      {
        !isLoading && data ?
          <Chart
            data={{
              labels: labels,
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

export default ProgressChart;