'use client';
//= Components
import StatisticsBoxes from '../StatisticsBoxes';
import CertificatesTable from '../CertificatesTable';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Api
import { getCreatedCertificates } from '@/api';
import useRequest from '@/api/useRequest';

type Props = {
  dictionary: Dictionary
  locale: Locale
}

function CertificatesWrapper({ dictionary, locale }: Props) {
  const { data, isLoading, refetch } = useRequest(getCreatedCertificates, undefined, { disabled: true });

  return (
    <>
      <StatisticsBoxes translations={dictionary.panel.certificates.statisticsBoxes} />
      <CertificatesTable translations={dictionary.panel.certificates.table} locale={locale} isLoading={isLoading} certificates={data?.certificates || []} />
    </>
  )
}

export default CertificatesWrapper;
