'use client';
import React from 'react'
import toast from 'react-hot-toast';
import { format } from 'date-fns';
//= Components
import Input from '@/components/UIs/Input';
import DateInput from '@/components/UIs/DateInput';
import { Icon } from '@iconify/react';
//= Api
import { addNewPlanToCourse } from '@/api';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './newPlanForm.module.scss';

type Props = {
  webinar_id: number;
  refetch: () => Promise<void>;
  locale: Locale;
  setOpenNewPlan: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['pricing'];
}

interface Fields {
  title: string;
  discount: string;
  capacity: string;
  start_date: string;
  end_date: string;
}

function NewPlanForm({ locale, translations, setOpenNewPlan, webinar_id, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    title: '',
    discount: '',
    capacity: '',
    start_date: '',
    end_date: '',
  })

  async function savePlan(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const handledData = {
      webinar_id,
      locale: "EN",
      title: data.title,
      discount: +data.discount,
      capacity: +data.capacity,
      start_date: format(new Date(data.start_date), 'yyyy-MM-dd'),
      end_date: format(new Date(data.end_date), 'yyyy-MM-dd'),
    }

    const response = await addNewPlanToCourse(handledData);
    if (response && response.success) {
      toast.success(translations.planAddedSuccess);
      refetch();
      setOpenNewPlan(false);
    }

    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newPlanForm}>
      <div className={cls.head}>
        <h4>{translations.newPlan}</h4>
        <Icon icon="iconoir:cancel" onClick={() => setOpenNewPlan(false)} />
      </div>
      <form>
        <div className={cls.field}>
          <label>{translations.title}</label>
          <Input placeholder={translations.title} name="title" value={data.title} onChange={(e) => dispatch({ title: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.discount} (%)</label>
          <Input type='number' placeholder={translations.discount} name="discount" value={data.discount} onChange={(e) => dispatch({ discount: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.capacity}</label>
          <Input type='number' placeholder={translations.capacityPlaceholder} name="capacity" value={data.capacity} onChange={(e) => dispatch({ capacity: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <DateInput label={translations.startDate} name="start_date" value={data.start_date} onChange={(e) => dispatch({ start_date: e.target.value })} />
        </div>
        <div className={cls.field}>
          <DateInput label={translations.endDate} name="end_date" value={data.end_date} onChange={(e) => dispatch({ end_date: e.target.value })} />
        </div>
      </form>
      <div className={cls.actions}>
        <button onClick={() => setOpenNewPlan(false)}>{translations.cancel}</button>
        <button onClick={savePlan}>{translations.save}</button>
      </div>
    </div>
  )
}

export default NewPlanForm
