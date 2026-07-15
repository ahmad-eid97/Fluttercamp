'use client';
import { useSearchParams } from 'next/navigation';
//= Components
import StatisticsBoxes from './StatisticsBoxes';
import MeetingsTable from '../MeetingsTable';
//= Api
import { getMeetingsReservations } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';

type Props = {
  translations: Dictionary['panel']['meetings'];
  locale: Locale;
}

function MeetingsReservationsWrapper({ translations, locale }: Props) {
  const searchParams = useSearchParams();
  const { data: reservations, isLoading, refetch } = useRequest(getMeetingsReservations, generateFilterObject() || { from: '', to: '', day: 'all', instructor_id: 'all', status: 'All' });

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
    openMeetings: 0,
    totalMeetings: 0,
    activeHours: 0
  }

  return (
    <>
      <StatisticsBoxes
        translations={translations.statisticsBoxes}
        isLoading={false}
        statistics={statistics}
      />
      <MeetingsTable
        translations={translations.list}
        locale={locale}
        isLoading={false}
        refetch={refetch}
        requests={reservations}
        type="reservations"
      />
    </>
  )
}

export default MeetingsReservationsWrapper;
