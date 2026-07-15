'use client';
import { useSearchParams } from 'next/navigation';
//= Components
import StatisticsBoxes from './StatisticsBoxes';
import MeetingsTable from '../MeetingsTable';
//= Api
import { getMeetingsRequests } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';

type Props = {
  translations: Dictionary['panel']['meetings'];
  locale: Locale;
}

function MeetingsRequestsWrapper({ translations, locale }: Props) {
  const searchParams = useSearchParams();
  const { data: requests, isLoading, refetch } = useRequest(getMeetingsRequests, generateFilterObject() || { from: '', to: '', day: 'all', instructor_id: 'all', status: 'All' });

  function generateFilterObject() {
    let filter: { [key: string]: string } = {};
    const searchParamsArray = Array.from(searchParams.entries());

    if (!searchParamsArray.length) return false;

    searchParamsArray.forEach(param => {
      if (param[0] === 'instructor_id') return;
      filter[param[0]] = param[1];
    });

    return filter;
  }

  const statistics = {
    pendingMeetings: requests && requests.pendingReserveCount ? requests.pendingReserveCount : 0,
    totalMeetings: requests && requests.totalReserveCount ? requests.totalReserveCount : 0,
    salesAmount: requests && requests.sumReservePaid ? requests.sumReservePaid : 0,
    activeHours: requests && requests.activeHoursCount ? requests.activeHoursCount : 0
  }

  return (
    <>
      <StatisticsBoxes
        translations={translations.statisticsBoxes}
        isLoading={isLoading}
        statistics={statistics}
      />
      <MeetingsTable
        translations={translations.list}
        locale={locale}
        isLoading={isLoading}
        refetch={refetch}
        requests={requests?.reserveMeetings}
        type="requests"
      />
    </>
  )
}

export default MeetingsRequestsWrapper;
