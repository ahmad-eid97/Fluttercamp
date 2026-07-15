'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
//= Components
import Modal from '@/components/UIs/Modal';
import FileInput from '@/components/UIs/FileInput';
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
import cls from './logoModal.module.scss';

type Props = {
  locale: Locale;
  logo: CourseExtraDescription;
  refetch: () => Promise<void>;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['faq'];
}

function LogoModal({ locale, logo, setOpen, refetch, translations }: Props) {
  const params = useParams<Record<string, string>>();
  const [data, dispatch] = useCompoundState({
    value: translationsHandler(logo.translations, locale).value
  })

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const handledData = {
      webinar_id: +params.id,
      locale: "EN" as "EN",
      type: ExtraDescriptionTypes.Logos,
      value: data.value,
    }
    const response = await updateExtraDescriptionInCourse(logo.id, handledData);

    if (response && response.success) {
      toast.success(translations.saveSuccess);
      setOpen(false);
      refetch();
    }

    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.logoModal}>
        <div>
          <h3>{translations.logos.modalTitle}</h3>
        </div>
        <form>
          <div className={cls.field}>
            <label>{translations.logos.image}</label>
            <FileInput placeholder={translations.logos.logoPlaceholder} name="title" value={data.value} onChange={(e, link) => dispatch({ value: link })} />
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

export default LogoModal;
