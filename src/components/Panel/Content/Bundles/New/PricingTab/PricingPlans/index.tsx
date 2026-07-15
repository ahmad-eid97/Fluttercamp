'use client';
import React, { useState } from 'react';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import PlanModal from '../PlanModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { deletePlanById } from '@/api';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, CourseTicket } from '@/types';
//= Styles
import cls from './pricingPlans.module.scss';

type Props = {
  locale: Locale;
  refetch: () => Promise<void>;
  isLoading: boolean;
  plans: CourseTicket[];
  translations: Dictionary['panel']['courses']['new']['pricing'];
}

function PricingPlans({ locale, plans, refetch, isLoading, translations }: Props) {
  const [openPlan, setOpenPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<CourseTicket>(plans[0]);

  const viewPlan = (plan: CourseTicket) => {
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
      {
        !isLoading && plans.length ?
          plans.map((plan, i) => (
            <div className={`${cls.plan} ${locale === 'ar' ? cls.ar : ''}`} key={i}>
              <h5>{translationsHandler(plan.translations, locale).title}</h5>
              <p>{translations.capacity}: <span>({plan.capacity || '-'})</span></p>
              <div className={cls.icons}>
                <Icon icon="basil:edit-solid" onClick={() => viewPlan(plan)} />
                <Icon onClick={() => handleDeletePlan(plan.id)} icon="fluent:delete-48-filled" />
              </div>
            </div>
          ))
          :
          <>
            <LoadingSkeleton width='100%' height='65px' rounded />
            <LoadingSkeleton width='100%' height='65px' rounded />
          </>
      }
      {
        openPlan &&
        <PlanModal
          locale={locale}
          plan={selectedPlan}
          refetch={refetch}
          setOpenPlan={setOpenPlan}
          translations={translations}
        />
      }
    </div>
  )
}

export default PricingPlans;
