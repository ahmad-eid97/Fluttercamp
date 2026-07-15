'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
//= Components
import Input from '@/components/UIs/Input';
import { Icon } from '@iconify/react';
//= Api
import { addExtraDescriptionToCourse } from '@/api';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
import { ExtraDescriptionTypes } from '@/api/panel/courses/types';
//= Styles
import cls from './newRequirementForm.module.scss';

type Props = {
  locale: Locale;
  refetch: () => Promise<void>;
  setOpenNew: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['faq'];
}

function NewRequirementForm({ translations, refetch, setOpenNew }: Props) {
  const params = useParams<Record<string, string>>();
  const [data, dispatch] = useCompoundState({
    value: '',
  });

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const handledData = {
      webinar_id: +params.id,
      locale: "EN" as "EN",
      type: ExtraDescriptionTypes.Requirements,
      value: data.value,
    }
    const response = await addExtraDescriptionToCourse(handledData);

    if (response && response.success) {
      toast.success(translations.saveSuccess);
      setOpenNew(false);
      refetch();
    }

    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newRequirementForm}>
      <div className={cls.head}>
        <h4>{translations.requirements.newRequirement}</h4>
        <Icon icon="iconoir:cancel" onClick={() => setOpenNew(false)} />
      </div>
      <form>
        <div className={cls.field}>
          <label>{translations.requirements.requirementTitle}</label>
          <Input placeholder={translations.requirements.requirementPlaceholder} name="value" value={data.value} onChange={(e) => dispatch({ value: e.target.value })} />
        </div>
      </form>
      <div className={cls.actions}>
        <button onClick={() => setOpenNew(false)}>{translations.cancel}</button>
        <button onClick={save}>{translations.save}</button>
      </div>
    </div>
  )
}

export default NewRequirementForm;
