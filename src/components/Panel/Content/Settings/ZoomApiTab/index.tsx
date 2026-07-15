'use client';
import { useEffect } from 'react';
//= Components
import TextArea from '@/components/UIs/TextArea';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, SettingsUser } from '@/types';
//= Api
import { updateProfileSettigs } from '@/api';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Styles
import cls from './zoomApiTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['settings']['tabs']['zoomApiTab'];
  settingsData: SettingsUser | undefined;
}

interface Fields {
  apiKey: string;
  apiSecret: string;
}

function ZoomApiTab({ translations, locale, settingsData }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    apiKey: '',
    apiSecret: ''
  });

  // useEffect(() => {
  //   if (settingsData) {
  //     dispatch({
  //       cover: settingsData?.identity_scan || null,
  //       profile: settingsData?.avatar || null,
  //     });
  //   }
  // }, [settingsData]);

  async function updateProfile() {
    const response = await updateProfileSettigs(data);
    if (response?.success) {
      toastSuccess(translations.updatedSuccessfully);
    }
  }

  return (
    <div className={cls.wrapper}>
      <h4>{translations.title}</h4>
      <div className={cls.zoomApi}>
        <div className={cls.field}>
          <TextArea placeholder={translations.apiKey} label={translations.apiKey} name="apiKey" value={data.apiKey} onChange={(e) => dispatch({ apiKey: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <TextArea placeholder={translations.apiSecret} label={translations.apiSecret} name="apiSecret" value={data.apiSecret} onChange={(e) => dispatch({ apiSecret: e.target.value })} />
        </div>
      </div>
      <div className={cls.actions}>
        <button onClick={updateProfile}>{translations.save}</button>
      </div>
    </div>
  )
}

export default ZoomApiTab;
