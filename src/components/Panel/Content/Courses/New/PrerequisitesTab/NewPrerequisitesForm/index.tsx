'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
//= Components
import Switch from '@/components/UIs/Switch';
import SearchSelect from '@/components/UIs/SearchSelect';
import { Icon } from '@iconify/react';
//= Api
import { addNewPrerequisiteToCourse } from '@/api';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
import { OnOffEnum } from '@/api/panel/courses/types/files';
//= Styles
import cls from './newPrerequisitesForm.module.scss';

type Props = {
  locale: Locale;
  setOpenNewPrerequisite: (open: boolean) => void;
  webinar_id: number;
  refetch: () => Promise<void>;
  translations: Dictionary['panel']['courses']['new']['prerequisites'];
}

function NewPrerequisitesForm({ locale, translations, setOpenNewPrerequisite, refetch, webinar_id }: Props) {
  const [prerequisitesOptions, setPrerequisitesOptions] = useState<{
    label: string;
    value: string;
  }[]>([]);
  const [data, dispatch] = useCompoundState({
    prerequisite: {
      label: '',
      value: ''
    },
    required: false,
  });

  async function savePlan(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const handledData = {
      webinar_id: webinar_id,
      prerequisite_id: +data.prerequisite.value,
      required: data.required ? OnOffEnum.on : OnOffEnum.off
    }
    const response = await addNewPrerequisiteToCourse(handledData);

    if (response && response.success) {
      toast.success(translations.saveSuccess);
      setOpenNewPrerequisite(false);
      refetch();
    }

    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newPrerequisitesForm}>
      <div className={cls.head}>
        <h4>{translations.new}</h4>
        <Icon icon="iconoir:cancel" onClick={() => setOpenNewPrerequisite(false)} />
      </div>
      <form>
        <div className={cls.field}>
          <label>{translations.select}</label>
          <SearchSelect
            placeholder={translations.select}
            options={prerequisitesOptions}
            selectedOption={data.prerequisite}
            setSelectedOption={(prerequisite) => dispatch({ prerequisite })}
            useSearchInWebinar={webinar_id}
          />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div className={cls.content}>
            <label>{translations.required}</label>
            <span>{translations.requiredDescription}</span>
          </div>
          <div className={cls.trigger}>
            <Switch name="active" switched={data.required} setSwitched={(e) => dispatch({ required: e.target.checked })} dark={true} />
          </div>
        </div>
      </form>
      <div className={cls.actions}>
        <button onClick={() => setOpenNewPrerequisite(false)}>{translations.cancel}</button>
        <button onClick={savePlan}>{translations.save}</button>
      </div>
    </div>
  )
}

export default NewPrerequisitesForm;
