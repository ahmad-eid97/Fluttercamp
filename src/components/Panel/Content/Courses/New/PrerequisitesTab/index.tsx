'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import NewPrerequisitesForm from './NewPrerequisitesForm';
import PrerequisitesList from './PrerequisitesList';
//= Api
import { getDataForEditWebinar } from '@/api';
import useRequest from '@/api/useRequest';
//= Custom Hooks
import useCompoundState from '@/hooks/useCompoundState';
//= Types
import type { Dictionary, Locale, CoursePrerequisite } from '@/types';
//= Styles
import cls from './prerequisitesTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['new']['prerequisites'];
  courseId?: number;
  isDuplicate?: boolean;
  setLockedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

type Fields = {
  prerequisites: CoursePrerequisite[];
}

function PrerequisitesTab({ locale, translations, courseId, isDuplicate, setLockedSteps, goToNextStep, goToPrevStep }: Props) {
  const isInEditMode = !isDuplicate && courseId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getDataForEditWebinar(courseId || 0, 5), undefined, {
    disabled: !isInEditMode,
    cache: {
      id: `edit-course-${courseId}-tab-5`
    }
  });
  const [openNewPrerequisite, setOpenNewPrerequisite] = useState(false);
  const [data, dispatch] = useCompoundState<Fields>({ prerequisites: [] });

  useEffect(() => {
    if (editData) {
      dispatch({
        prerequisites: editData.webinar.prerequisites,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  function nextOnly() {
    setLockedSteps(prev => prev.filter(stp => stp !== 5));
    goToNextStep();
  }

  return (
    <div className={cls.prerequisitesTab}>
      {
        isInEditMode && isLoading ?
          <p className={cls.loadingData}>
            <Icon icon='eos-icons:loading' />
            {translations.loadingData}
          </p>
          : null
      }
      <h4 className={cls.sectionTitle}>{translations.title} <b /> <button onClick={() => setOpenNewPrerequisite(true)}><Icon icon="basil:add-solid" /> {translations.new}</button></h4>
      {
        openNewPrerequisite &&
        <NewPrerequisitesForm
          locale={locale}
          translations={translations}
          refetch={refetch}
          setOpenNewPrerequisite={setOpenNewPrerequisite}
          webinar_id={courseId || 0}
        />
      }
      {
        data.prerequisites.length ?
          <PrerequisitesList
            locale={locale}
            webinar_id={courseId || 0}
            refetch={refetch}
            isLoading={isLoading}
            prerequisites={data.prerequisites}
            translations={translations}
          />
          :
          <div className={cls.emptyData}>
            <p>{translations.empty}</p>
          </div>
      }
      <div className={cls.actions}>
        <button onClick={goToPrevStep}>{translations.previous}</button>
        {isInEditMode && <button onClick={nextOnly}>{translations.next}</button>}
      </div>
    </div>
  )
}

export default PrerequisitesTab;