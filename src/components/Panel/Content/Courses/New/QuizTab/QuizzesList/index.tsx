import React, { useState } from 'react'
//= Components
import { Icon } from '@iconify/react';
import QuizModal from '../QuizModal';
import { confirmDialog } from '@/lib/confirm';
//= Utils
import { toastSuccess } from '@/utils/toast';
import { translationsHandler } from '@/utils/translationsHandler';
//= Api
import { deleteQuizById } from '@/api';
//= Types
import type { Dictionary, Locale } from '@/types';
import type { Quiz } from '../types';
//= Styles
import cls from './quizzesList.module.scss';

type Props = {
  locale: Locale;
  quizzes: Quiz[];
  translations: Dictionary['panel']['courses']['new']['quizNCertificates'];
  refetch: () => void;
}

function QuizzesList({ locale, quizzes, translations, refetch }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<Quiz>(quizzes[0]);

  const viewDetails = (quiz: Quiz) => {
    setSelectedSection(quiz);
    setOpen(true);
  }

  async function deleteQuiz(quizId: number) {
    const result = await confirmDialog({
      icon: 'warning',
      title: translations.deleteWarning,
      showCancelButton: true,
      cancelButtonText: translations.cancel,
      confirmButtonText: translations.delete,
    });

    if (result.isConfirmed) {

      try {
        const response = await deleteQuizById(quizId)
        // @ts-ignore
        if (response?.success) {
          toastSuccess(translations.deleted);
          refetch();
        }
      } catch (err) { }
    } else return;
  }

  return (
    <div className={cls.quizzesList}>
      <div className={cls.items}>
        {quizzes.map((quiz, i) => (
          <div className={`${cls.item}`} key={i}>
            <h5>{translationsHandler(quiz.translations, locale).title} <p>( {translations.mark}: {quiz.total_mark || 0} )</p></h5>
            <div className={cls.actions}>
              <button onClick={() => viewDetails(quiz)}><Icon icon="basil:edit-solid" /></button>
              <button onClick={() => deleteQuiz(quiz.id)}><Icon icon="fluent:delete-48-filled" /></button>
            </div>
          </div>
        ))}
      </div>
      {open && <QuizModal locale={locale} quiz={selectedSection} setOpen={setOpen} translations={translations} refetch={refetch} />}
    </div>
  )
}

export default QuizzesList;
