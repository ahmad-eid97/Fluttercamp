'use client';
//= Components
import CompletionTable from '../CompletionTable';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Api
import { getStudentsCertificates } from '@/api';
import useRequest from '@/api/useRequest';

type Props = {
  dictionary: Dictionary
  locale: Locale
}

function CompletionWrapper({ dictionary, locale }: Props) {
  const { data, isLoading, refetch } = useRequest(getStudentsCertificates);

  return (
    <>
      <CompletionTable translations={dictionary.panel.completion.table} locale={locale} isLoading={isLoading} certificates={data?.certificates || []} />
    </>
  )
}

export default CompletionWrapper;
