'use client';
import React from 'react';
import toast from 'react-hot-toast';
//= Components
import Modal from '@/components/UIs/Modal';
import Input from '@/components/UIs/Input';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Api
import { createMeetingLink } from '@/api';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './modal.module.scss';

type Props = {
  locale: Locale;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['meetings']['list'];
  meetingId: number;
}

function CreateLinkModal({ locale, setOpen, meetingId, translations }: Props) {
  const [data, dispatch] = useCompoundState<{ url: string; password: string; }>({
    url: '',
    password: ''
  });

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    const response = await createMeetingLink({ link: data.url, reserved_meeting_id: meetingId.toString() });
    if (response) {
      toast.success(translations.meetingLinkCreated);
      setOpen(false);
    }

    btn.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.modal}>
        <div className={cls.head}>
          <h4>{translations.addLink}</h4>
        </div>
        <form>
          <div className={cls.field}>
            <label>{translations.url}</label>
            <Input placeholder={translations.url} type="url" name="url" value={data.url} onChange={(e) => dispatch({ url: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.password} <span>({translations.optional})</span></label>
            <Input placeholder={translations.password} name="password" value={data.password} onChange={(e) => dispatch({ password: e.target.value })} />
          </div>
          <div className={cls.field}>
            <p>{translations.liveLinkText}</p>
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

export default CreateLinkModal;
