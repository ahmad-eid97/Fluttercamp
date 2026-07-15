'use client';
//= Components
import StatisticsBoxes from '../StatisticsBoxes';
import AchievementsTable from '../AchievementsTable';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Api
import { getAchievementCertificates } from '@/api';
import useRequest from '@/api/useRequest';

type Props = {
  dictionary: Dictionary
  locale: Locale
}

function AchievementsWrapper({ dictionary, locale }: Props) {
  const { data, isLoading, refetch } = useRequest(getAchievementCertificates);

  return (
    <>
      <StatisticsBoxes translations={dictionary.panel.achievements.statisticsBoxes} />
      <AchievementsTable translations={dictionary.panel.certificates.table} locale={locale} isLoading={isLoading} certificates={data?.certificates || []} />
    </>
  )
}

export default AchievementsWrapper;
