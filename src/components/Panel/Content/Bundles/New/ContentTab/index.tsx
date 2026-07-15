"use client";
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import NewContentForm from './NewContentForm';
import ContentList from './ContentList';
//= Custom Hooks
import useCompoundState from '@/hooks/useCompoundState';
//= Api
import { getBundleDataToEdit } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale, BundleEditWebinar, Bundle_Webinars } from '@/types';
//= Styles
import cls from './contentsTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['bundles']['new']['content'];
  bundleId?: number;
  setLockedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

type Fields = {
  webinars: BundleEditWebinar[];
  bundle_webinars: Bundle_Webinars[];
}

function ContentsTab({ locale, translations, bundleId, setLockedSteps, goToNextStep, goToPrevStep }: Props) {
  const isInEditMode = bundleId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getBundleDataToEdit(bundleId || 0, 4), undefined, {
    disabled: !isInEditMode,
    cache: {
      id: `edit-bundle-${bundleId}-tab-4`
    }
  });
  const [openNewCourse, setOpenNewCourse] = useState(false);
  const [data, dispatch] = useCompoundState<Fields>({
    webinars: [],
    bundle_webinars: []
  });

  useEffect(() => {
    if (editData) {
      dispatch({
        webinars: editData.webinars || [],
        bundle_webinars: editData.bundle.bundle_webinars || [],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  async function save() {
    setLockedSteps(prev => prev.filter(stp => stp !== 4));
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
      <div className={cls.contentsTab}>
        <h4 className={cls.sectionTitle}>
          {translations.title} <b /> <button onClick={() => setOpenNewCourse(true)}><Icon icon="basil:add-solid" />  {translations.addCourse}</button>
        </h4>
        {
          openNewCourse &&
          <NewContentForm
            courses={data.webinars}
            refetch={refetch}
            locale={locale}
            translations={translations}
            setOpenNewCourse={setOpenNewCourse}
          />
        }
        {
          data.webinars.length ?
            <ContentList
              refetch={refetch}
              isLoading={isLoading}
              locale={locale}
              selectable_courses={data.webinars}
              bundle_courses={data.bundle_webinars}
              translations={translations}
            />
            :
            <div className={cls.emptyData}>
              <p>{translations.noCourss}</p>
            </div>
        }
        <div className={cls.actions}>
          <button onClick={goToPrevStep}>{translations.previous}</button>
          <button onClick={save}>{translations.next}</button>
        </div>
      </div>
    </>
  )
}

export default ContentsTab;