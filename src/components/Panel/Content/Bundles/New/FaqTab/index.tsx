'use client';
import React, { useState, useEffect } from 'react';
//= Components
import { Icon } from '@iconify/react';
import FaqsList from './FaqsList';
import NewFaqForm from './NewFaqForm';
//= Custom Hooks
import useCompoundState from '@/hooks/useCompoundState';
//= Api
import { getBundleDataToEdit } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale, CourseFAQ } from '@/types';
//= Styles
import cls from './faqTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['bundles']['new']['faq'];
  bundleId?: number;
  setLockedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

type Fields = {
  faqs: CourseFAQ[];
}

function FaqsTab({ locale, translations, bundleId, setLockedSteps, goToNextStep, goToPrevStep }: Props) {
  const isInEditMode = bundleId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getBundleDataToEdit(bundleId || 0, 5), undefined, {
    disabled: !isInEditMode,
    cache: {
      id: `edit-bundle-${bundleId}-tab-5`
    }
  });
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [data, dispatch] = useCompoundState<Fields>({
    faqs: []
  });

  useEffect(() => {
    if (editData) {
      dispatch({
        faqs: editData.bundle.faqs
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  function nextOnly() {
    setLockedSteps(prev => prev.filter(stp => stp !== 5));
    goToNextStep();
  }

  return (
    <>
      {
        isInEditMode && isLoading ?
          <p className={cls.loadingData}>
            <Icon icon='eos-icons:loading' />
            {translations.loadingData}
          </p>
          : null
      }
      <div className={cls.faqs}>
        <div className={cls.section}>
          <h4>{translations.title} <b /> <button onClick={() => setOpenNew(true)}><Icon icon="basil:add-solid" /> {translations.addFaq}</button></h4>
          {
            openNew &&
            <NewFaqForm
              locale={locale}
              refetch={refetch}
              translations={translations}
              setOpenNew={setOpenNew}
            />
          }
          {
            data.faqs.length ?
              <FaqsList
                refetch={refetch}
                isLoading={isLoading}
                locale={locale}
                faqs={data.faqs}
                translations={translations}
              />
              :
              <div className={cls.emptyData}>
                <p>{translations.noData}</p>
              </div>
          }
        </div>
        <div className={cls.actions}>
          <button onClick={goToPrevStep}>{translations.previous}</button>
          <button onClick={nextOnly}>{translations.next}</button>
        </div>
      </div>
    </>
  )
}

export default FaqsTab;