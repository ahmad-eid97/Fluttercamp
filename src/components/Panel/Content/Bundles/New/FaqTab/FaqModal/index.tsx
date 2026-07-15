'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
//= Components
import Modal from '@/components/UIs/Modal';
import Input from '@/components/UIs/Input';
import TextArea from '@/components/UIs/TextArea';
//= Api
import { updateFaqInCourse } from '@/api';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, CourseFAQ } from '@/types';
//= Styles
import cls from './faqModal.module.scss';

type Props = {
  locale: Locale;
  faq: CourseFAQ;
  refetch: () => Promise<void>;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['bundles']['new']['faq'];
}

function FaqModal({ locale, faq, setOpen, refetch, translations }: Props) {
  const params = useParams<Record<string, string>>();
  const [data, dispatch] = useCompoundState({
    title: translationsHandler(faq.translations, locale).title,
    answer: translationsHandler(faq.translations, locale).answer,
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
    const response = await updateFaqInCourse(faq.id, handledData);

    // @ts-ignore
    if (response && response.code === 200) {
      toast.success(translations.saveSuccess);
      setOpen(false);
      refetch();
    }

    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.faqModal}>
        <div>
          <h3>{translations.details}</h3>
        </div>
        <form>
          <div className={cls.field}>
            <label>{translations.inputs.question}</label>
            <Input placeholder={translations.inputs.questionPlaceholder} name="title" value={data.title} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.inputs.answer}</label>
            <TextArea placeholder={translations.inputs.answer} name="answer" value={data.answer} onChange={(e) => dispatch({ answer: e.target.value })} />
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

export default FaqModal;
