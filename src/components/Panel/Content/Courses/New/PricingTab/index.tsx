'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import Input from '@/components/UIs/Input';
import Switch from '@/components/UIs/Switch';
import NewPlanForm from './NewPlanForm';
import PricingPlans from './PricingPlans';
//= Api
import { removeCache, getDataForEditWebinar, updateCourseData } from '@/api';
import useRequest from '@/api/useRequest';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, CourseTicket } from '@/types';
//= Styles
import cls from './pricingTab.module.scss';

interface Fields {
  subscribe: boolean;
  access_days: string;
  price: string;
  tickets: CourseTicket[];
}

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['new']['pricing'];
  courseId?: number;
  isDuplicate?: boolean;
  setLockedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

function PricingTab({ locale, translations, courseId, isDuplicate, setLockedSteps, goToNextStep, goToPrevStep }: Props) {
  const isInEditMode = !isDuplicate && courseId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getDataForEditWebinar(courseId || 0, 3), undefined, {
    disabled: !isInEditMode,
    cache: {
      id: `edit-course-${courseId}-tab-3`
    }
  });
  const [data, dispatch] = useCompoundState<Fields>({
    subscribe: false,
    access_days: '',
    price: '',
    tickets: []
  });
  const [openNewPlan, setOpenNewPlan] = useState(false);

  useEffect(() => {
    if (editData) {
      dispatch({
        subscribe: editData.webinar.subscribe == "1" || false,
        access_days: editData.webinar.access_days || '',
        price: editData.webinar.price || '',
        ...(editData.webinar.tickets?.length ? { tickets: editData.webinar.tickets } : {})
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    if (!courseId) return;

    const response = await updateCourseData(courseId, {
      current_step: 3,
      draft: "0",
      get_next: 1,
      get_step: 4,
      subscribe: data.subscribe ? 1 : 0,
      access_days: +data.access_days,
      price: +data.price,
    });

    if (response && response.success) {
      toast.success(translations.saveSuccess);
      removeCache(`edit-course-${courseId}-tab-3`);
      nextOnly();
    }

    button.classList.remove('loading-btn');
  }

  function nextOnly() {
    setLockedSteps(prev => prev.filter(stp => stp !== 2));
    goToNextStep();
  }

  return (
    <div className={cls.pricingTab}>
      {
        isInEditMode && isLoading ?
          <p className={cls.loadingData}>
            <Icon icon='eos-icons:loading' />
            {translations.loadingData}
          </p>
          : null
      }
      <form>
        <div className={cls.switch}>
          <div className={cls.content}>
            <label>{translations.enableSubscribe}</label>
            <span>- {translations.subscribeText}</span>
            <span></span>
          </div>
          <Switch name="subscribe" switched={data.subscribe} setSwitched={(e) => dispatch({ subscribe: e.target.checked })} dark={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.accessPeriod} <span>({translations.days})</span> <span>({translations.optional})</span></label>
          <Input type="number" placeholder={translations.accessPeriod} name="access_days" value={data.access_days} onChange={(e) => dispatch({ access_days: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.price} ($)</label>
          <Input type="number" placeholder={translations.price} name="price" value={data.price} onChange={(e) => dispatch({ price: e.target.value })} />
        </div>
      </form>
      <div className={cls.plans}>
        <h4>{translations.pricingPlans} <span>({translations.optional})</span></h4>
        <ul>
          <li>- {translations.plansTexts[0]}</li>
          <li>- {translations.plansTexts[1]}</li>
          <li>- {translations.plansTexts[2]}</li>
        </ul>
        <button onClick={() => setOpenNewPlan(true)}>{translations.newPlan}</button>
        {
          openNewPlan && courseId &&
          <NewPlanForm
            refetch={refetch}
            webinar_id={courseId}
            locale={locale}
            setOpenNewPlan={setOpenNewPlan}
            translations={translations}
          />
        }
        {data.tickets.length ?
          <PricingPlans
            refetch={refetch}
            locale={locale}
            plans={data.tickets}
            translations={translations}
          />
          :
          <div className={cls.emptyData}>
            <p>{translations.noPlans}</p>
          </div>
        }
      </div>
      <div className={cls.actions}>
        <button onClick={goToPrevStep}>{translations.previous}</button>
        {/* {isInEditMode && <button onClick={nextOnly}>{translations.next}</button>} */}
        <button onClick={save} disabled={isInEditMode && isLoading}>{translations.save}</button>
      </div>
    </div>
  )
}

export default PricingTab;
