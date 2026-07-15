'use client';
//= Components
import StatisticsBox from '../StatisticsBoxes'
import SalesTable from '../SalesTable'
//= Types
import type { Dictionary, Locale } from '@/types';
//= Api
import { getFinancialSales } from '@/api/panel/financial';
import useRequest from '@/api/useRequest';

type Props = {
  dictionary: Dictionary
  locale: Locale
}

function SalesWrapper({ dictionary, locale }: Props) {
  const { data, isLoading } = useRequest(getFinancialSales);

  return (
    <>
      <StatisticsBox
        translations={dictionary.panel.financial.sales.statisticsBoxes}
        isLoading={isLoading}
        statistics={{
          students_count: data?.students_count || 0,
          meetings_count: data?.meetings_count || 0,
          meeting_sales: data?.meeting_sales || 0,
          total_sales: data?.total_sales || '-',
        }}
      />
      <SalesTable
        translations={dictionary.panel.financial.sales}
        locale={locale}
        isLoading={isLoading}
        tableData={data?.sales || []}
      />
    </>
  )
}

export default SalesWrapper
