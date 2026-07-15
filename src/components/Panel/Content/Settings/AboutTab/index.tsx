'use client';
import { useEffect } from 'react';
//= Components
import Input from '@/components/UIs/Input';
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
import cls from './aboutTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['settings']['tabs']['aboutTab'];
  settingsData: SettingsUser | undefined;
}

interface Fields {
  bio: string;
  title: string;
}

function AboutTab({ translations, locale, settingsData }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    bio: '',
    title: ''
  });

  useEffect(() => {
    if (settingsData) {
      dispatch({
        bio: settingsData?.bio || '',
        title: settingsData?.address || '',
      });
    }
  }, [settingsData]);

  async function updateProfile() {
    const response = await updateProfileSettigs(data);
    if (response?.success) {
      toastSuccess(translations.updatedSuccessfully);
    }
  }

  return (
    <div className={cls.wrapper}>
      <h4>{translations.title}</h4>
      <div className={cls.about}>
        <div className={cls.field}>
          <TextArea placeholder={translations.biography} label={translations.biography} name="bio" value={data.bio} onChange={(e) => dispatch({ bio: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.jobTitle}</label>
          <Input placeholder={translations.jobTitle} name="title" value={data.title} onChange={(e) => dispatch({ title: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <p>
            {translations.jobHelpOne}
          </p>
          <p>
            {translations.jobHelpTwo}
          </p>
        </div>
      </div>
      <div className={cls.actions}>
        <button onClick={updateProfile}>{translations.save}</button>
      </div>
    </div>
  )
}

export default AboutTab;
