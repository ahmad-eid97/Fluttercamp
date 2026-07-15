'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import FaqsList from './FaqsList';
import MaterialList from './MaterialsList';
import LogosList from './LogosList';
import RequirementsList from './RequirementsList';
import NewFaqForm from './NewFaqForm';
import NewMaterialForm from './NewMaterialForm';
import NewRequirementForm from './NewRequirementForm';
import NewLogoForm from './NewLogoForm';
//= Api
import { getDataForEditWebinar } from '@/api';
import useRequest from '@/api/useRequest';
//= Custom Hooks
import useCompoundState from '@/hooks/useCompoundState';
//= Types
import type { Dictionary, Locale, CourseFAQ, CourseExtraDescription } from '@/types';
import { ExtraDescriptionTypes } from '@/api/panel/courses/types';
//= Styles
import cls from './faqTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['new']['faq'];
  courseId?: number;
  isDuplicate?: boolean;
  setLockedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

type Fields = {
  faqs: CourseFAQ[];
  materials: CourseExtraDescription[];
  logos: CourseExtraDescription[];
  requirements: CourseExtraDescription[];
}

function FaqsTab({ locale, translations, courseId, isDuplicate, setLockedSteps, goToNextStep, goToPrevStep }: Props) {
  const isInEditMode = !isDuplicate && courseId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getDataForEditWebinar(courseId || 0, 6), undefined, {
    disabled: !isInEditMode,
    cache: {
      id: `edit-course-${courseId}-tab-6`
    }
  });
  const [openNew, setOpenNew] = useState<boolean | string>(false);
  const [data, dispatch] = useCompoundState<Fields>({
    faqs: [],
    materials: [],
    logos: [],
    requirements: [],
  });

  useEffect(() => {
    if (editData && editData.webinar.webinar_extra_description) {
      dispatch({
        faqs: editData.webinar.faqs,
        materials: editData.webinar.webinar_extra_description.filter(extra_desc => extra_desc.type === ExtraDescriptionTypes.Materials),
        logos: editData.webinar.webinar_extra_description.filter(extra_desc => extra_desc.type === ExtraDescriptionTypes.Logos),
        requirements: editData.webinar.webinar_extra_description.filter(extra_desc => extra_desc.type === ExtraDescriptionTypes.Requirements),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  function nextOnly() {
    setLockedSteps(prev => prev.filter(stp => stp !== 5));
    goToNextStep();
  }

  return (
    <div className={cls.faqs}>
      {
        isInEditMode && isLoading ?
          <p className={cls.loadingData}>
            <Icon icon='eos-icons:loading' />
            {translations.loadingData}
          </p>
          : null
      }
      <div className={cls.section}>
        <h4>{translations.faqs.title} <b /> <button onClick={() => setOpenNew('faq')}><Icon icon="basil:add-solid" /> {translations.faqs.newFaq}</button></h4>
        {
          openNew === 'faq' &&
          <NewFaqForm
            refetch={refetch}
            locale={locale}
            translations={translations}
            setOpenNew={setOpenNew}
          />
        }
        {
          data.faqs.length ?
            <FaqsList
              refetch={refetch}
              locale={locale}
              faqs={data.faqs}
              isLoading={isLoading}
              translations={translations}
            />
            :
            !isLoading &&
            <div className={cls.emptyData}>
              <p>{translations.faqs.empty}</p>
            </div>
        }
      </div>
      <div className={cls.section}>
        <h4>{translations.materials.title} <b /> <button onClick={() => setOpenNew('material')}><Icon icon="basil:add-solid" /> {translations.materials.newMaterial}</button></h4>
        {
          openNew === 'material' &&
          <NewMaterialForm
            refetch={refetch}
            locale={locale}
            translations={translations}
            setOpenNew={setOpenNew}
          />
        }
        {
          data.materials.length ?
            <MaterialList
              refetch={refetch}
              locale={locale}
              isLoading={isLoading}
              materials={data.materials}
              translations={translations}
            />
            :
            !isLoading &&
            <div className={cls.emptyData}>
              <p>{translations.materials.empty}</p>
            </div>
        }
      </div>
      <div className={cls.section}>
        <h4>{translations.logos.title} <b /> <button onClick={() => setOpenNew('logo')}><Icon icon="basil:add-solid" /> {translations.logos.newLogo}</button></h4>
        {
          openNew === 'logo' &&
          <NewLogoForm
            refetch={refetch}
            locale={locale}
            translations={translations}
            setOpenNew={setOpenNew}
          />
        }
        {
          data.logos.length ?
            <LogosList
              refetch={refetch}
              locale={locale}
              isLoading={isLoading}
              logos={data.logos}
              translations={translations}
            />
            :
            !isLoading &&
            <div className={cls.emptyData}>
              <p>{translations.logos.empty}</p>
            </div>
        }
      </div>
      <div className={cls.section}>
        <h4>{translations.requirements.title} <b /> <button onClick={() => setOpenNew('requirement')}><Icon icon="basil:add-solid" /> {translations.requirements.newRequirement}</button></h4>
        {
          openNew === 'requirement' &&
          <NewRequirementForm
            refetch={refetch}
            locale={locale}
            translations={translations}
            setOpenNew={setOpenNew}
          />
        }
        {
          data.requirements.length ?
            <RequirementsList
              refetch={refetch}
              locale={locale}
              isLoading={isLoading}
              requirements={data.requirements}
              translations={translations}
            />
            :
            !isLoading &&
            <div className={cls.emptyData}>
              <p>{translations.requirements.empty}</p>
            </div>
        }
      </div>
      <div className={cls.actions}>
        <button onClick={goToPrevStep}>{translations.previous}</button>
        <button onClick={nextOnly}>{translations.next}</button>
      </div>
    </div>
  )
}

export default FaqsTab;