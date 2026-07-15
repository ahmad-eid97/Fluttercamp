'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import NewQuizForm from './NewQuizForm';
import QuizzesList from './QuizzesList';
//= Custom Hooks
import useCompoundState from '@/hooks/useCompoundState';
//= Types
import type { Dictionary, Locale } from '@/types';
import type { Quiz } from './types';
//= Api
import { getDataForEditWebinar } from '@/api';
import useRequest from '@/api/useRequest';
//= Styles
import cls from './quizTab.module.scss';
import LoadingSkeleton from '@/components/UIs/Skeleton';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['new']['quizNCertificates'];
  courseId?: number;
  isDuplicate?: boolean;
  setLockedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

type Fields = {
  quizzes: Quiz[];
}

function QuizTab({ locale, translations, courseId, isDuplicate, setLockedSteps, goToNextStep, goToPrevStep }: Props) {
  const isInEditMode = !isDuplicate && courseId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getDataForEditWebinar(courseId || 0, 7), undefined, {
    disabled: !isInEditMode,
    cache: {
      id: `edit-certificates-${courseId}-tab-7`
    }
  });
  const [openNewQuiz, setOpenNewQuiz] = useState(false);
  const [data, dispatch] = useCompoundState<Fields>(
    {
      quizzes: []
    });

  useEffect(() => {
    if (editData) {
      dispatch({ quizzes: editData?.webinar.quizzes })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    toast.success(translations.saveSuccess);
    setLockedSteps(prev => prev.filter(stp => stp !== 1));
    goToNextStep();

    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.quizTab}>
      {
        isInEditMode && isLoading ?
          <p className={cls.loadingData}>
            <Icon icon='eos-icons:loading' />
            {translations.loadingData}
          </p>
          : null
      }
      <h4>{translations.title} <b /> <button onClick={() => setOpenNewQuiz(true)}><Icon icon="basil:add-solid" />  {translations.newQuiz}</button></h4>
      {openNewQuiz && <NewQuizForm locale={locale} translations={translations} setOpenNewQuiz={setOpenNewQuiz} refetch={refetch} />}
      {data?.quizzes?.length && !isLoading ?
        <QuizzesList locale={locale} quizzes={data.quizzes} translations={translations} refetch={refetch} />
        :
        isLoading ?
          <>
            <LoadingSkeleton width='100%' height="50px" rounded />
            <LoadingSkeleton width='100%' height="50px" rounded />
            <LoadingSkeleton width='100%' height="50px" rounded />
            <LoadingSkeleton width='100%' height="50px" rounded />
          </>
          :
          <div className={cls.emptyData}>
            <p>{translations.empty}</p>
          </div>
      }
      <div className={cls.actions}>
        <button onClick={goToPrevStep}>{translations.previous}</button>
        <button onClick={save}>{translations.next}</button>
      </div>
    </div>
  )
}

export default QuizTab;