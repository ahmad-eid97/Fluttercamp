'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import NewSectionForm from './NewSectionForm';
//= Custom Hooks
import SectionsList from './SectionsList';
import useCompoundState from '@/hooks/useCompoundState';
//= Types
import type { Dictionary, Locale } from '@/types';
import type { Chapter } from './types';
//= Api
import { getDataForEditWebinar } from '@/api';
import useRequest from '@/api/useRequest';
//= Styles
import cls from './contentTab.module.scss';
import LoadingSkeleton from '@/components/UIs/Skeleton';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['new']['content'];
  courseId?: number;
  isDuplicate?: boolean;
  setLockedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

interface Fields {
  sections: Chapter[]
}

function ContentTab({ locale, translations, courseId, isDuplicate, setLockedSteps, goToNextStep, goToPrevStep }: Props) {
  const isInEditMode = !isDuplicate && courseId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getDataForEditWebinar(courseId || 0, 4), undefined,
    {
      disabled: !isInEditMode, cache: {
        id: `edit-webinar-${courseId}-tab-2`
      }
    });

  const [openNewSection, setOpenNewSection] = useState(false);
  const [data, dispatch] = useCompoundState<Fields>({
    sections: []
  })

  useEffect(() => {
    if (editData && editData.webinar.chapters) {
      // @ts-ignore
      dispatch({ sections: [...editData.webinar.chapters] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData])

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    toast.success(translations.saveSuccess);
    setLockedSteps(prev => prev.filter(stp => stp !== 1));
    goToNextStep();

    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.contentTab}>
      {
        isInEditMode && isLoading ?
          <p className={cls.loadingData}>
            <Icon icon='eos-icons:loading' />
            {translations.loadingData}
          </p>
          : null
      }
      <h4 className={cls.sectionTitle}>
        {translations.sectionAndContent}
        <b />
        <button onClick={() => setOpenNewSection(true)}><Icon icon="basil:add-solid" /> {translations.newSection}</button>
      </h4>
      {openNewSection && <NewSectionForm locale={locale} courseId={courseId} translations={translations} setOpenNewSection={setOpenNewSection} refetch={refetch} />}

      {data.sections.length && !isLoading ?
        <SectionsList
          webinar={editData?.webinar}
          locale={locale}
          translations={translations}
          courseId={courseId}
          sections={data.sections}
          refetch={refetch}
        />
        :
        isLoading ?
          null :
          <div className={cls.emptyData}>
            <p>{translations.noSections}</p>
          </div>
      }
      {isLoading ?
        <>
          <LoadingSkeleton width='100%' height='60px' rounded />
          <LoadingSkeleton width='100%' height='60px' rounded />
          <LoadingSkeleton width='100%' height='60px' rounded />
          <LoadingSkeleton width='100%' height='60px' rounded />
          <LoadingSkeleton width='100%' height='60px' rounded />
        </>
        :
        null
      }
      <div className={cls.actions}>
        <button onClick={goToPrevStep}>{translations.previous}</button>
        <button onClick={save}>{translations.next}</button>
      </div>
    </div>
  )
}

export default ContentTab;