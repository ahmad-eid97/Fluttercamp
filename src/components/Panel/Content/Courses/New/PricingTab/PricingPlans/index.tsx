'use client';
import React, { useState } from 'react'
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import PlanModal from '../PlanModal';
//= Api
import { deletePlanById } from '@/api';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { CourseTicket, Dictionary, Locale } from '@/types';
//= Styles
import cls from './pricingPlans.module.scss';

type Props = {
  locale: Locale;
  refetch: () => Promise<void>;
  plans: CourseTicket[];
  translations: Dictionary['panel']['courses']['new']['pricing'];
}

function PricingPlans({ locale, plans, translations, refetch }: Props) {
  const [openPlan, setOpenPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<CourseTicket>(plans[0]);

  const viewEditPlanModal = (plan: CourseTicket) => {
    setOpenPlan(true);
    setSelectedPlan(plan)
  }

  async function handleDeletePlan(id: number) {
    const result = await confirmDialog({
      icon: 'question',
      title: translations.deleteQuestion,
      showCancelButton: true,
      cancelButtonText: translations.cancel,
      confirmButtonText: translations.confirmDelete,
    });

    if (result.isConfirmed) {
      const response = await deletePlanById(id);
      if (response) {
        toast.success(translations.deleteSuccess);
        refetch();
      }
    }
  }

  return (
    <div className={cls.pricingPlans}>
      <div>
        <h4>{translations.pricingPlans}</h4>
      </div>
      <div className={cls.plansList}>
        {plans.map((plan, i) => (
          <div className={`${cls.plan} ${locale === 'ar' ? cls.ar : ''}`} key={i}>
            <h5>{translationsHandler(plan.translations, locale).title}</h5>
            <div className={cls.actions}>
              <p>{translations.capacity}: <span>({plan.capacity || '-'})</span></p>
              <div className={cls.buttons}>
                <button onClick={() => viewEditPlanModal(plan)}><Icon icon="mynaui:edit-one" /></button>
                <button onClick={() => handleDeletePlan(plan.id)}><Icon icon="fluent:delete-12-regular" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openPlan &&
        <PlanModal
          refetch={refetch}
          locale={locale}
          plan={selectedPlan}
          setOpenPlan={setOpenPlan}
          translations={translations}
        />}
    </div>
  )
}

export default PricingPlans;
