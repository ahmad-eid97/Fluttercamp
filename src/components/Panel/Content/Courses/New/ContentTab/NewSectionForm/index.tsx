import React from 'react'
//= Components
import Input from '@/components/UIs/Input';
import Switch from '@/components/UIs/Switch';
import { Icon } from '@iconify/react';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
import type { Chapter } from '../types';
import { LocaleEnum, OnOffEnum } from '@/api/panel/courses/types/files';
//= Api
import { addChapterToWebinar } from '@/api';
//= Styles
import cls from './newSectionForm.module.scss';
import { toastSuccess } from '@/utils/toast';

type Props = {
  locale: Locale;
  courseId: number | undefined;
  setOpenNewSection: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['content'];
  refetch: () => void;
}

function NewSectionForm({ locale, courseId, setOpenNewSection, translations, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Pick<Chapter, 'title' | 'status' | 'check_all_contents_pass'>>({
    title: '',
    status: OnOffEnum.on,
    check_all_contents_pass: OnOffEnum.off,
  })

  async function addSection(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const payload = {
      webinar_id: courseId ? +courseId : 0,
      locale: LocaleEnum.en,
      title: data.title,
      status: OnOffEnum.on,
      check_all_contents_pass: OnOffEnum.off,
    }
    const response = await addChapterToWebinar(payload);
    // @ts-ignore
    if (response?.code === 200) {
      refetch();
      toastSuccess(translations.section.added);
      setOpenNewSection(false);
    }
    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newSectionForm}>
      <div className={cls.head}>
        <h4>{translations.section.title}</h4>
        <Icon icon="iconoir:cancel" onClick={() => setOpenNewSection(false)} />
      </div>
      <form>
        <div className={cls.field}>
          <label>{translations.section.sectionTitle}</label>
          <Input placeholder={translations.section.sectionTitle} name="title" value={data.title || ''} onChange={(e) => dispatch({ title: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div>
            <label>{translations.section.active}</label>
          </div>
          <Switch name="status" switched={data.status === 'on' ? true : false} setSwitched={(e) => dispatch({ status: e.target.checked ? 'on' : 'off' })} dark={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div>
            <label>{translations.section.pass}</label>
          </div>
          <Switch name="check_all_contents_pass" switched={data.check_all_contents_pass === 'on' ? true : false} setSwitched={(e) => dispatch({ check_all_contents_pass: e.target.checked ? 'on' : 'off' })} dark={true} />
        </div>
      </form>
      <div className={cls.actions}>
        <button onClick={() => setOpenNewSection(false)}>{translations.section.cancel}</button>
        <button onClick={addSection}>{translations.section.save}</button>
      </div>
    </div>
  )
}

export default NewSectionForm;
