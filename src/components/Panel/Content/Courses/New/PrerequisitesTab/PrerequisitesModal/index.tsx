'use client';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
//= Components
import Modal from '@/components/UIs/Modal';
import Switch from '@/components/UIs/Switch';
import SearchSelect from '@/components/UIs/SearchSelect';
//= Api
import { updatePrerequisiteInCourse } from '@/api';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, CoursePrerequisite } from '@/types';
import { OnOffEnum } from '@/api/panel/courses/types/files';
//= Styles
import cls from './prerequisitesModal.module.scss';

type Props = {
  locale: Locale;
  prerequisite: CoursePrerequisite;
  setOpen: (open: boolean) => void;
  webinar_id: number;
  refetch: () => Promise<void>;
  translations: Dictionary['panel']['courses']['new']['prerequisites'];
}

function PrerequisitesModal({ locale, prerequisite, setOpen, refetch, webinar_id, translations }: Props) {
  const [prerequisitesOptions] = useState<{
    label: string;
    value: string;
  }[]>([{
    label: translationsHandler(prerequisite.prerequisite_webinar.translations, locale).title,
    value: prerequisite.prerequisite_id.toString()
  }]);
  const [data, dispatch] = useCompoundState({
    prerequisite: prerequisitesOptions[0],
    required: prerequisite.required === '1',
  });

  async function savePlan(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const handledData = {
      webinar_id,
      prerequisite_id: +data.prerequisite.value,
      required: data.required ? OnOffEnum.on : OnOffEnum.off
    }
    const response = await updatePrerequisiteInCourse(prerequisite.id, handledData);

    if (response && response.success) {
      toast.success(translations.saveSuccess);
      setOpen(false);
      refetch();
    }

    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.prerequisitesModal}>
        <div>
          <h3>{translations.title}</h3>
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
            <Switch name="active" switched={data.required} setSwitched={(e) => dispatch({ required: e.target.checked })} dark={true} />
          </div>
        </form>
        <div className={cls.actions}>
          <button onClick={() => setOpen(false)}>{translations.cancel}</button>
          <button onClick={savePlan}>{translations.save}</button>
        </div>
      </div>
    </Modal>
  )
}

export default PrerequisitesModal;
