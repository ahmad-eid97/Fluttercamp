'use client';
import React from 'react'
import toast from 'react-hot-toast';
import { format } from 'date-fns';
//= Components
import Modal from '@/components/UIs/Modal';
import Input from '@/components/UIs/Input';
import DateInput from '@/components/UIs/DateInput';
//= Api
import { updatePlanInCourse } from '@/api';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, CourseTicket } from '@/types';
//= Styles
import cls from './planModal.module.scss';

type Props = {
  locale: Locale;
  plan: CourseTicket;
  refetch: () => Promise<void>;
  setOpenPlan: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['pricing'];
}

function PlanModal({ locale, plan, setOpenPlan, refetch, translations }: Props) {
  const [data, dispatch] = useCompoundState({
    title: translationsHandler(plan.translations, locale).title || '',
    discount: plan.discount || 0,
    capacity: plan.capacity || 0,
    start_date: plan.start_date ? format(new Date(+plan.start_date * 1000), 'yyyy-MM-dd') : '',
    end_date: plan.end_date ? format(new Date(+plan.end_date * 1000), 'yyyy-MM-dd') : '',
  })

  async function savePlan(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const handledData = {
      webinar_id: +plan.webinar_id,
      locale: "EN",
      title: data.title,
      discount: +data.discount,
      capacity: +data.capacity,
      start_date: format(new Date(data.start_date), 'yyyy-MM-dd'),
      end_date: format(new Date(data.end_date), 'yyyy-MM-dd'),
    }

    const response = await updatePlanInCourse(plan.id, handledData);
    if (response && response.success) {
      toast.success(translations.planAddedSuccess);
      refetch();
      setOpenPlan(false);
    }

    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpenPlan}>
      <div className={cls.planModal}>
        <h3>{translations.pricingPlans}</h3>
        <form>
          <div className={cls.field}>
            <label>{translations.title}</label>
            <Input placeholder={translations.title} name="title" value={data.title} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.discount} (%)</label>
            <Input type='number' placeholder={translations.discount} name="discount" value={`${data.discount}`} onChange={(e) => dispatch({ discount: +e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.capacity}</label>
            <Input type='number' placeholder={translations.capacityPlaceholder} name="capacity" value={`${data.capacity}`} onChange={(e) => dispatch({ capacity: +e.target.value })} />
          </div>
          <div className={cls.field}>
            <DateInput label={translations.startDate} name="start_date" value={data.start_date} onChange={(e) => dispatch({ start_date: e.target.value })} />
          </div>
          <div className={cls.field}>
            <DateInput label={translations.endDate} name="end_date" value={data.end_date} onChange={(e) => dispatch({ end_date: e.target.value })} />
          </div>
        </form>
        <div className={cls.actions}>
          <button onClick={() => setOpenPlan(false)}>{translations.cancel}</button>
          <button onClick={savePlan}>{translations.save}</button>
        </div>
      </div>
    </Modal>
  )
}

export default PlanModal;
