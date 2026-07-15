"use client";
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
//= Components
import { Icon } from '@iconify/react';
import SelectBox from '@/components/UIs/Select';
import TagsInput from '@/components/UIs/TagsInput';
//= Api
import { getBundleDataToEdit, updateBundle } from '@/api';
import useRequest from '@/api/useRequest';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './extraInfoTab.module.scss';

interface Fields {
  tags: string[];
  category: string;
}

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['bundles']['new']['extraInformation'];
  bundleId?: number;
  setLockedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

function ExtraInfoTab({ locale, translations, bundleId, setLockedSteps, goToNextStep, goToPrevStep }: Props) {
  const isInEditMode = bundleId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getBundleDataToEdit(bundleId || 0, 2), undefined, {
    disabled: !isInEditMode,
    cache: {
      id: `edit-bundle-${bundleId}-tab-2`
    }
  });
  const [data, dispatch] = useCompoundState<Fields>({
    tags: [],
    category: '',
  });

  useEffect(() => {
    if (editData) {
      dispatch({
        tags: editData.bundleTags || [],
        category: editData.bundle.category?.id.toString() || '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  const allCategories: {
    label: string;
    value: string;
    isHeader: boolean;
  }[] = [];

  editData?.categories?.forEach(category => {
    if (category.sub_categories.length) {
      allCategories.push({
        label: translationsHandler(category.translations, locale).title,
        value: category.id.toString(),
        isHeader: true
      });
      category.sub_categories.forEach(subCategory => {
        allCategories.push({
          label: translationsHandler(category.translations, locale).title,
          value: subCategory.id.toString(),
          isHeader: false
        });
      })
    } else {
      allCategories.push({
        label: translationsHandler(category.translations, locale).title,
        value: category.id.toString(),
        isHeader: false
      });
    }
  });

  const categories = editData ? allCategories : [];

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    if (!bundleId || !editData) return;

    const handledData = {
      current_step: "2",
      draft: 0,
      get_next: 1,
      get_step: 3,
      tags: data.tags.join(),
      category_id: +data.category
    }

    const response = await updateBundle(bundleId, handledData);

    if (response) {
      await refetch();
      toast.success(translations.saveSuccess);
      nextOnly();
    }

    button.classList.remove('loading-btn');
  }

  function nextOnly() {
    setLockedSteps(prev => prev.filter(stp => stp !== 2));
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
      <div className={cls.basicInfo}>
        <form>
          <div className={cls.field}>
            <label>{translations.tags}</label>
            <TagsInput placeholder={translations.tags} name="tags" value={data.tags} onChange={(value) => dispatch({ tags: value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.category}</label>
            <SelectBox options={categories} name="category" defaultValue={data.category} onChange={(e) => dispatch({ category: e.target.value })} noFocus={true} />
          </div>
        </form>
        <div className={cls.actions}>
          <button onClick={goToPrevStep}>{translations.previous}</button>
          {/* {isInEditMode && <button onClick={nextOnly}>{translations.next}</button>} */}
          <button onClick={save} disabled={isInEditMode && isLoading}>{translations.save}</button>
        </div>
      </div>
    </>
  )
}

export default ExtraInfoTab;
