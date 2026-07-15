'use client';
import { useEffect } from 'react';
//= Components
import SelectBox from '@/components/UIs/Select';
import Input from '@/components/UIs/Input';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, SettingsUser } from '@/types';
//= Api
import { updateProfileSettigs } from '@/api';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Styles
import cls from './extraInfoTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['settings']['tabs']['extraInfoTab'];
  settingsData: SettingsUser | undefined;
}

interface Fields {
  gender: string;
  age: string;
  meetingType: string;
  trainingLevel: string;
  country_id: string;
  province_id: string;
  city_id: string;
  district_id: string;
}

function ExtraInfoTab({ translations, locale, settingsData }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    gender: '',
    age: '',
    meetingType: '',
    trainingLevel: '',
    country_id: '',
    province_id: '',
    city_id: '',
    district_id: ''
  });

  useEffect(() => {
    if (settingsData) {
      dispatch({
        country_id: settingsData?.country_id || '',
        city_id: settingsData?.city_id || '',
        province_id: settingsData?.province_id || '',
        district_id: settingsData?.district_id || '',
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
      <div className={cls.fields}>
        <div className={cls.field}>
          <label>{translations.gender}</label>
          <div className={cls.radioGroup}>
            <div className={cls.radio}>
              <input type="radio" name="gender" className='ui-radiobox' value="free" onChange={(e) => dispatch({ gender: e.target.value })} />
              <label>{translations.male}</label>
            </div>
            <div className={cls.radio}>
              <input type="radio" name="gender" className='ui-radiobox' value="paid" onChange={(e) => dispatch({ gender: e.target.value })} />
              <label>{translations.female}</label>
            </div>
          </div>
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.age}</label>
          <Input type='number' placeholder={translations.age} name="age" value={data.age} onChange={(e) => dispatch({ age: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.meetingType}</label>
          <div className={cls.radioGroup}>
            <div className={cls.radio}>
              <input type="radio" name="meetingType" className='ui-radiobox' value="free" onChange={(e) => dispatch({ meetingType: e.target.value })} />
              <label>{translations.inPerson}</label>
            </div>
            <div className={cls.radio}>
              <input type="radio" name="meetingType" className='ui-radiobox' value="paid" onChange={(e) => dispatch({ meetingType: e.target.value })} />
              <label>{translations.online}</label>
            </div>
            <div className={cls.radio}>
              <input type="radio" name="meetingType" className='ui-radiobox' value="paid" onChange={(e) => dispatch({ meetingType: e.target.value })} />
              <label>{translations.all}</label>
            </div>
          </div>
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.trainingLevel}</label>
          <div className={cls.radioGroup}>
            <div className={cls.radio}>
              <input type="checkbox" name="trainingLevel" className='ui-checkbox' value="free" onChange={(e) => dispatch({ trainingLevel: e.target.value })} />
              <label>{translations.beginner}</label>
            </div>
            <div className={cls.radio}>
              <input type="checkbox" name="trainingLevel" className='ui-checkbox' value="paid" onChange={(e) => dispatch({ trainingLevel: e.target.value })} />
              <label>{translations.intermediate}</label>
            </div>
            <div className={cls.radio}>
              <input type="checkbox" name="trainingLevel" className='ui-checkbox' value="paid" onChange={(e) => dispatch({ trainingLevel: e.target.value })} />
              <label>{translations.advanced}</label>
            </div>
          </div>
        </div>
        <div className={cls.empty}></div>
      </div>
      <h4 className={cls.secondHeader}>{translations.region}</h4>
      <div className={cls.fields}>
        <div className={cls.field}>
          <label>{translations.country}</label>
          <SelectBox options={[]} name="country" defaultValue={data.country_id} onChange={(e) => dispatch({ country_id: e.target.value })} noFocus={true} />
        </div>
        <div className={cls.field}>
          <label>{translations.province}</label>
          <SelectBox options={[]} name="province" defaultValue={data.province_id} onChange={(e) => dispatch({ province_id: e.target.value })} noFocus={true} />
        </div>
        <div className={cls.field}>
          <label>{translations.city}</label>
          <SelectBox options={[]} name="city" defaultValue={data.city_id} onChange={(e) => dispatch({ city_id: e.target.value })} noFocus={true} />
        </div>
        <div className={cls.field}>
          <label>{translations.district}</label>
          <SelectBox options={[]} name="district" defaultValue={data.district_id} onChange={(e) => dispatch({ district_id: e.target.value })} noFocus={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.empty}></div>
      </div>
      <div className={cls.actions}>
        <button>{translations.deleteAccount}</button>
        <button onClick={updateProfile}>{translations.save}</button>
      </div>
    </div>
  )
}

export default ExtraInfoTab;
