import React from 'react'
//= Components
import Modal from '@/components/UIs/Modal';
import Input from '@/components/UIs/Input';
import Switch from '@/components/UIs/Switch';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
import { toastSuccess } from '@/utils/toast';
//= Api
import { updateChapter } from '@/api';
//= Types
import type { Dictionary, Locale } from '@/types';
import type { Chapter } from '../types';
import { OnOffEnum } from '@/api/panel/courses/types/files';
//= Styles
import cls from './sectionModal.module.scss';

type Props = {
  locale: Locale;
  section: Chapter;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['content'];
  refetch: () => void;
}

function SectionModal({ locale, section, setOpen, translations, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Pick<Chapter, 'title' | 'status' | 'check_all_contents_pass'>>({
    title: translationsHandler(section.translations, locale).title || '',
    status: section.status === 'active' ? 'on' : 'off',
    check_all_contents_pass: section.check_all_contents_pass === '1' ? 'on' : 'off',
  })

  async function saveSection(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const payload = {
      webinar_id: +section.webinar_id,
      locale: 'EN' as 'EN' | 'AR',
      title: data.title || '',
      status: data.status === 'on' ? OnOffEnum.on : OnOffEnum.off,
      check_all_contents_pass: data.check_all_contents_pass === 'on' ? OnOffEnum.on : OnOffEnum.off,
    }
    const response = await updateChapter(section.id, payload);
    // @ts-ignore
    if (response?.code === 200) {
      refetch();
      setOpen(false)
      toastSuccess(translations.section.updated);
    }
    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.sectionModal}>
        <h3>{translations.section.modalTitle}</h3>
        <form>
          <div className={cls.field}>
            <label>{translations.section.sectionTitle}</label>
            <Input placeholder={translations.section.sectionTitle} name="title" value={data.title || ''} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.switch}>
            <div className={cls.content}>
              <label>{translations.section.active}</label>
            </div>
            <Switch name="status" switched={data.status === 'on' ? true : false} setSwitched={(e) => dispatch({ status: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
          <div className={cls.switch}>
            <div className={cls.content}>
              <label>{translations.section.pass}</label>
            </div>
            <Switch name="check_all_contents_pass" switched={data.check_all_contents_pass === 'on' ? true : false} setSwitched={(e) => dispatch({ check_all_contents_pass: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
        </form>
        <div className={cls.actions}>
          <button onClick={() => setOpen(false)}>{translations.section.cancel}</button>
          <button onClick={(e) => saveSection(e)}>{translations.section.save}</button>
        </div>
      </div>
    </Modal>
  )
}

export default SectionModal;
