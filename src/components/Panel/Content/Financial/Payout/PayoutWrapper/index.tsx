'use client';
//= Components
import StatisticsBoxes from "../StatisticsBoxes";
import PayoutList from "../PayoutList";
//= Types
import type { Dictionary, Locale } from '@/types';
//= Api
import { getFinancialPayout } from "@/api";
import useRequest from "@/api/useRequest";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
}

function PayoutWrapper({ dictionary, locale }: Props) {
  const { data, isLoading } = useRequest(getFinancialPayout);

  return (
    <>
      <StatisticsBoxes
        translations={dictionary.panel.financial.payout.statisticsBoxes}
        isLoading={isLoading}
        statistics={{
          account_charge: data?.current_payout.account_charge || 0,
          minimum_payout: data?.current_payout?.amount || 0,
          total_income: data?.current_payout?.total_income || 0,
        }}
      />
      <PayoutList
        translations={dictionary.panel.financial.payout.list}
        locale={locale}
        isLoading={isLoading}
        payouts={data?.payouts || []}
      />
    </>
  )
}

export default PayoutWrapper;