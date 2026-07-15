'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/lib/confirm';
//= Components
import { Icon } from '@iconify/react';
import Modal from '@/components/UIs/Modal';
import SelectBox from '@/components/UIs/Select';
import Input from "@/components/UIs/Input";
import TimeInput from "@/components/UIs/TimeInput";
//= Api
import { addMeetingTime } from '@/api';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './timesheet-modal.module.scss';

type Days = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

type Props = {
  translations: Dictionary['panel']['meetings']['settings']['timesheet'];
  locale: Locale;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  day: Days;
  refetch: () => Promise<void>;
}
interface Fields {
  from: string;
  to: string;
  type: 'all' | 'online' | 'in_person';
  description: string;
  day: Days;
}

function TimesheetModal({ translations, locale, day, setOpenModal, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    from: '',
    to: '',
    type: 'all',
    description: '',
    day
  });

  const types = [
    {
      label: translations.modal.both,
      value: 'all'
    },
    {
      label: translations.modal.in_person,
      value: 'in_person'
    },
    {
      label: translations.modal.online,
      value: 'online'
    }
  ]

  function transformTimeFormat(inputTime: string) {
    const [hourStr, minuteStr] = inputTime.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;

    const period = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    const transformedTime = `${hour.toString().padStart(2, '0')}:${minute}${period}`;

    return transformedTime;
  }

  async function saveTime(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    event.preventDefault();
    btn.classList.add('loading-btn');

    const timeData = {
      time: `${transformTimeFormat(data.from)}-${transformTimeFormat(data.to)}`,
      day: data.day.toLowerCase() as Days,
      meeting_type: data.type,
      description: data.description
    }

    const response = await addMeetingTime(timeData);

    if (response && response.success) {
      toast.success(translations.modal.timeSaved);
      await refetch();
      setOpenModal(false);
    }
    btn.classList.remove('loading-btn');
  }

  return (
    <div className={cls.modal}>
      <Modal setOpenModal={setOpenModal}>
        <h4 className={cls.title}>{translations.modal.title}</h4>
        <form>
          <div className={cls.field}>
            <Input label={translations.modal.day} name="day" value={data.day} disabled />
          </div>
          <div className={cls.field}>
            <TimeInput label={translations.modal.from} name="from" value={data.from} onChange={(e) => dispatch({ from: e.target.value })} />
          </div>
          <div className={cls.field}>
            <TimeInput label={translations.modal.to} name="to" value={data.to} onChange={(e) => dispatch({ to: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.modal.type}</label>
            <SelectBox options={types} name="day" defaultValue={data.type} onChange={(e) => dispatch({ type: e.target.value as ('all' | 'online' | 'in_person') })} noFocus={true} />
          </div>
          <div className={cls.field}>
            <label>{translations.modal.description}</label>
            <textarea rows={5} name="description" placeholder={translations.modal.description} defaultValue={data.description} onChange={(e) => dispatch({ description: e.target.value })} />
          </div>
          <div className={cls.actions}>
            <button onClick={() => setOpenModal(false)}>{translations.modal.cancel}</button>
            <button onClick={saveTime}>{translations.modal.save}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default TimesheetModal;