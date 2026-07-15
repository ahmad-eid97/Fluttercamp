'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
//= Components
import Modal from '@/components/UIs/Modal';
import Input from '@/components/UIs/Input';
//= Api
import { updateExtraDescriptionInCourse } from '@/api';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, CourseExtraDescription } from '@/types';
import { ExtraDescriptionTypes } from '@/api/panel/courses/types';
//= Styles
import cls from './requirementModal.module.scss';

type Props = {
  locale: Locale;
  requirement: CourseExtraDescription;
  refetch: () => Promise<void>;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['faq'];
}

function RequirementModal({ locale, requirement, refetch, setOpen, translations }: Props) {
  const params = useParams<Record<string, string>>();
  const [data, dispatch] = useCompoundState({
    value: translationsHandler(requirement.translations, locale).value,
  })

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const handledData = {
      webinar_id: +params.id,
      locale: "EN" as "EN",
      type: ExtraDescriptionTypes.Requirements,
      value: data.value,
    }
    const response = await updateExtraDescriptionInCourse(requirement.id, handledData);

    if (response && response.success) {
      toast.success(translations.saveSuccess);
      setOpen(false);
      refetch();
    }

    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.requirementModal}>
        <div>
          <h3>{translations.requirements.modalTitle}</h3>
        </div>
        <form>
          <div className={cls.field}>
            <label>{translations.requirements.requirementTitle}</label>
            <Input placeholder={translations.requirements.requirementPlaceholder} name="value" value={data.value} onChange={(e) => dispatch({ value: e.target.value })} />
          </div>
        </form>
        <div className={cls.actions}>
          <button onClick={() => setOpen(false)}>{translations.cancel}</button>
          <button onClick={save}>{translations.save}</button>
        </div>
      </div>
    </Modal>
  )
}

export default RequirementModal;
