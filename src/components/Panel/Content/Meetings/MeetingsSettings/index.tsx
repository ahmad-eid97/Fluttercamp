'use client';
import React from 'react';
//= Components
import Timesheet from './Timesheet';
import Charges from './Charges';
//= Api
import { getMeetingSettings } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['meetings']['settings'];
}

function MeetingSettingsWrapper({ locale, translations }: Props) {
  const { data, isLoading, refetch } = useRequest(getMeetingSettings);

  return (
    <>
      <Timesheet
        locale={locale}
        translations={translations.timesheet}
        meetingsData={data}
        isLoading={isLoading}
        refetch={refetch}
      />
      <Charges
        translations={translations.charges}
        meetingsData={data?.meeting}
        isLoading={isLoading}
        refetch={refetch}
      />
    </>
  )
}

export default MeetingSettingsWrapper