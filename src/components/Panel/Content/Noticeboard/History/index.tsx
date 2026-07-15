'use client';
import { useSearchParams } from 'next/navigation';
//= Components
import StatisticsBoxes from './StatisticsBoxes';
import NoticesTable from './NoticesTable';
//= Api
import { getAllNoticeboards } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';

type Props = {
  translations: Dictionary['panel']['noticeboard'];
  locale: Locale;
}

function HistoryNoticeboardWrapper({ translations, locale }: Props) {
  const searchParams = useSearchParams();
  const { data: notices, isLoading, refetch } = useRequest(getAllNoticeboards, generateFilterObject() || { from: '', to: '', webinar_id: '', title: '' });

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

  return (
    <>
      <StatisticsBoxes
        translations={translations.statisticsBoxes}
        statistics={{
          totalNoticeboards: notices?.totalNoticeboards || 0,
          totalCourseNotices: notices?.totalCourseNotices || 0,
          totalGeneralNotices: notices?.totalGeneralNotices || 0,
        }}
        isLoading={isLoading}
      />
      <NoticesTable
        translations={translations}
        locale={locale}
        data={notices?.noticeboards}
        webinars={notices?.webinars}
        refetch={refetch}
        isLoading={isLoading}
      />
    </>
  )
}

export default HistoryNoticeboardWrapper;
