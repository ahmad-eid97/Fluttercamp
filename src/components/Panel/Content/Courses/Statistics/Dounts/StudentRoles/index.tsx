'use client';
import React, { useState, useEffect } from "react";
//= Components
import ChartJs from "chart.js/auto";
import { CategoryScale, Legend, Title } from "chart.js";
import { Chart } from "react-chartjs-2";
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import type { Dictionary, Locale, GetInstructorCourseStatisticsResponse } from '@/types';
//= Styles
import cls from './chart.module.scss';

ChartJs.register(CategoryScale, Legend, Title);
ChartJs.defaults.font.size = 13;
ChartJs.defaults.font.family = 'NotoSans';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['statistics'];
  data: GetInstructorCourseStatisticsResponse | undefined;
  isLoading: boolean;
}

function StudentsRolesChart({ translations, locale, data, isLoading }: Props) {
  const [series, setSeries] = useState([
    {
      name: 'Roles',
      data: [76, 24],
      backgroundColor: ['#383e506e', '#dddddd'],
      borderWidth: 2,
      borderColor: "#383e506e",
      pointRadius: 4,
      fill: true,
      bezierCurve: true,
      lineTension: 1
    }
  ]);

  useEffect(() => {
    if (data) {
      setSeries([
        {
          name: 'Roles',
          data: data.studentsUserRolesChart.data,
          backgroundColor: ['#383e506e', '#dddddd'],
          borderWidth: 2,
          borderColor: "#383e506e",
          pointRadius: 4,
          fill: true,
          bezierCurve: true,
          lineTension: 1
        }
      ]);
    }
  }, [data]);

  return (
    <div className={`${cls.chart} ${locale === 'ar' ? cls.ar : ''}`}>
      <h2>{translations.studentsRoles}</h2>
      <div>
        {
          !isLoading && data ?
            <Chart
              data={{
                labels: [translations.students, translations.instructors],
                datasets: series
              }}
              height={100}
              type="pie"
              options={{
                responsive: true
              }}
            />
            :
            isLoading ? <LoadingSkeleton width="100%" height="250px" rounded /> : null
        }
      </div>
    </div>
  )
}

export default StudentsRolesChart;