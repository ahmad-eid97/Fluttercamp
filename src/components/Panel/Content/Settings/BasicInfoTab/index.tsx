'use client';
import { useEffect } from 'react';
//= Components
import SelectBox from '@/components/UIs/Select';
import SearchSelect from '@/components/UIs/SearchSelect';
import Input from '@/components/UIs/Input';
import Switch from '@/components/UIs/Switch';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, SettingsUser } from '@/types';
//= Api
import { updateProfileSettigs, getTimezones } from '@/api';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Styles
import cls from './basicInfo.module.scss';
import useRequest from '@/api/useRequest';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['settings']['tabs']['basicInfoTab'];
  settingsData: SettingsUser | undefined
}

interface Fields {
  email: string;
  full_name: string;
  password: string;
  confirmed_password: string;
  mobile: string;
  language: string;
  timezone: string;
  newsletter: boolean;
  messages: boolean;
}

function BasicInfoTab({ translations, locale, settingsData }: Props) {
  const { data: responseData, isLoading } = useRequest(getTimezones);

  const [data, dispatch] = useCompoundState<Fields>({
    email: '',
    full_name: '',
    password: '',
    confirmed_password: '',
    mobile: '',
    language: '',
    timezone: '',
    newsletter: false,
    messages: false
  });

  useEffect(() => {
    if (settingsData) {
      dispatch({
        email: settingsData?.email || '',
        full_name: settingsData?.full_name || '',
        mobile: settingsData?.mobile || '',
        language: settingsData?.language || '',
        newsletter: settingsData?.newsletter || false,
        messages: settingsData?.offline_message || false
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsData]);

  const languages = [
    {
      label: translations.arabic,
      value: 'arabic',
    },
    {
      label: translations.english,
      value: 'english',
    }
  ];

  async function updateProfile() {
    const response = await updateProfileSettigs(data);
    if (response?.success) {
      toastSuccess(translations.updatedSuccessfully);
    }
  }

  return (
    <div className={cls.wrapper}>
      <h4>{translations.title}</h4>
      <div className={cls.basicInfo}>
        <div className={cls.field}>
          <label>{translations.email}</label>
          <Input placeholder={translations.email} name="email" value={data.email} onChange={(e) => dispatch({ email: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.name}</label>
          <Input placeholder={translations.name} name="full_name" value={data.full_name} onChange={(e) => dispatch({ full_name: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.password}</label>
          <Input placeholder={translations.password} name="password" value={data.password} onChange={(e) => dispatch({ password: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.retypePassword}</label>
          <Input placeholder={translations.retypePassword} name="confirmed_password" value={data.confirmed_password} onChange={(e) => dispatch({ confirmed_password: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.phone}</label>
          <Input placeholder={translations.phone} name="mobile" value={data.mobile} onChange={(e) => dispatch({ mobile: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.language}</label>
          <SelectBox options={languages} name="language" defaultValue={data.language} onChange={(e) => dispatch({ language: e.target.value })} noFocus={true} />
        </div>
        <div className={cls.field}>
          <label>{translations.timeZone}</label>
          <SearchSelect placeholder={translations.timeZone} options={(Array.isArray(responseData) ? responseData : []).map((item) => ({ label: item, value: item }))} selectedOption={data.language} setSelectedOption={(value) => dispatch({ timezone: value.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div className={cls.content}>
            <label>{translations.join}</label>
          </div>
          <Switch name="newsletter" switched={data.newsletter} setSwitched={(e) => dispatch({ newsletter: e.target.checked })} dark={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div className={cls.content}>
            <label>{translations.messages}</label>
          </div>
          <Switch name="messages" switched={data.messages} setSwitched={(e) => dispatch({ messages: e.target.checked })} dark={true} />
        </div>
      </div>
      <div className={cls.actions}>
        <button onClick={updateProfile}>{translations.save}</button>
      </div>
    </div>
  )
}

export default BasicInfoTab;
