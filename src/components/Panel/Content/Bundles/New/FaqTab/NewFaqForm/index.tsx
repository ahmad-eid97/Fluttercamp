'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
//= Components
import Input from '@/components/UIs/Input';
import TextArea from '@/components/UIs/TextArea';
import { Icon } from '@iconify/react';
//= Api
import { addNewFaqToCourse } from '@/api';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
import { FAQ } from '../types';
//= Styles
import cls from './newFaqForm.module.scss';

type Props = {
  locale: Locale;
  setOpenNew: (open: boolean) => void;
  refetch: () => Promise<void>;
  translations: Dictionary['panel']['bundles']['new']['faq'];
}

function NewFaqForm({ locale, translations, refetch, setOpenNew }: Props) {
  const params = useParams<Record<string, string>>();
  const [data, dispatch] = useCompoundState({
    title: '',
    answer: '',
  })

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const handledData = {
      bundle_id: +params.id,
      locale: "EN" as "EN",
      title: data.title,
      answer: data.answer,
    }
    const response = await addNewFaqToCourse(handledData);

    if (response && response.success) {
      toast.success(translations.saveSuccess);
      setOpenNew(false);
      refetch();
    }

    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newFaqForm}>
      <div className={cls.head}>
        <h4>{translations.addNewFaq}</h4>
        <Icon icon="iconoir:cancel" onClick={() => setOpenNew(false)} />
      </div>
      <form>
        <div className={cls.field}>
          <label>{translations.inputs.question}</label>
          <Input placeholder={translations.inputs.questionPlaceholder} name="title" value={data.title} onChange={(e) => dispatch({ title: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.inputs.answer}</label>
          <TextArea placeholder={translations.inputs.answer} name="answer" value={data.answer} onChange={(e) => dispatch({ answer: e.target.value })} />
        </div>
      </form>
      <div className={cls.actions}>
        <button onClick={() => setOpenNew(false)}>{translations.cancel}</button>
        <button onClick={save}>{translations.save}</button>
      </div>
    </div>
  )
}

export default NewFaqForm;
