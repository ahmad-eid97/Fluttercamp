'use client';
import { useEffect, useState } from 'react';
//= Modules
import { confirmDialog } from '@/lib/confirm';
//= Components
import Input from '@/components/UIs/Input';
import Switch from '@/components/UIs/Switch';
import SearchSelect from '@/components/UIs/SearchSelect';
import { Icon } from '@iconify/react';
import MultipleQuestionModal from './MultipleQuestionModal';
import DescriptiveQuestionModal from './DescriptiveQuestionModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { toastSuccess } from '@/utils/toast';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, AddUpdateQuizInChapterPayload, QuestionForUpdate } from '@/types';
import { OnOffEnum, LocaleEnum } from '@/api/panel/courses/types/files';
//= Api
import useRequest from '@/api/useRequest';
import { getAllInstructorCourses, getQuizDataToEdit, deleteQuizQuestion, addNewQuiz, updateQuiz } from '@/api/panel/quizzes';
//= Styles
import cls from './newQuiz.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['quizzes']['new'];
  quizId?: number;
}

function NewQuiz({ locale, translations, quizId }: Props) {
  const [showModal, setShowModal] = useState<string | boolean>(false);
  const isInEditMode = quizId !== undefined;
  const { data: quizData, isLoading, refetch } = useRequest(() => getQuizDataToEdit(quizId || 0), undefined, { disabled: !isInEditMode });
  const { data: coursesList, isLoading: isLoadingCourses } = useRequest(getAllInstructorCourses);
  const [questionToUpdate, setQuestionToUpdate] = useState<QuestionForUpdate | undefined>();
  const [data, dispatch, reset] = useCompoundState<Omit<AddUpdateQuizInChapterPayload, 'locale' | 'chapter_id' | 'creator_id'>>({
    webinar_id: '',
    title: '',
    time: '',
    attempt: 0,
    pass_mark: 0,
    expiry_days: '',
    display_questions_randomly: OnOffEnum.off,
    certificate: OnOffEnum.off,
    status: OnOffEnum.off,
    quiz_questions: []
  });

  useEffect(() => {
    if (quizData) {
      dispatch({
        webinar_id: quizData.quiz.webinar_id,
        title: quizData.quiz.title,
        time: quizData.quiz.time,
        attempt: +quizData.quiz.attempt,
        pass_mark: +quizData.quiz.pass_mark,
        expiry_days: quizData.quiz.expiry_days || '',
        display_questions_randomly: quizData.quiz.display_questions_randomly === '1' ? OnOffEnum.on : OnOffEnum.off,
        certificate: quizData.quiz.certificate === '1' ? OnOffEnum.on : OnOffEnum.off,
        // @ts-ignore
        status: quizData.quiz.status === "active" ? OnOffEnum.on : OnOffEnum.off,
        // @ts-ignore
        quiz_questions: quizData.quizQuestions
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizData])

  function openAddQuestion(type: string) {
    setQuestionToUpdate(undefined);
    setShowModal(type);
  }

  function editQuestion(question: QuestionForUpdate) {
    setQuestionToUpdate(question);
    if (question.type === 'descriptive') {
      setShowModal('descriptive');
    } else {
      setShowModal('multiple');
    }
  }

  async function saveQuiz(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    delete data?.quiz_questions;
    const neededData = {
      locale: LocaleEnum.en,
      ...data,
    }
    if (isInEditMode) {
      const response = await updateQuiz(quizData?.quiz.id || 0, neededData);
      // @ts-ignore
      if (response.success) {
        await refetch();
        toastSuccess(translations.updated);
      }
    } else {
      const response = await addNewQuiz(neededData);

      if (response && response.success) {
        reset();
        await refetch();
        toastSuccess(translations.added);
      }
    }
    button.classList.remove('loading-btn');
  }

  async function deleteQuestion(questionId: number) {
    const result = await confirmDialog({
      icon: 'warning',
      title: translations.questionDeleteWarning,
      showCancelButton: true,
      cancelButtonText: translations.cancel,
      confirmButtonText: translations.delete,
    });

    if (result.isConfirmed) {
      const response = await deleteQuizQuestion(questionId);
      // @ts-ignore
      if (response.code === 200) {
        await refetch();
        toastSuccess(translations.questionDeleted);
      }
    }
  }

  return (
    <>
      {isInEditMode && isLoading ?
        <p className={cls.loadingData}>
          <Icon icon='eos-icons:loading' />
          {translations.loadingData}
        </p>
        : null
      }
      <div className={cls.newQuiz}>
        <div>
          <h4>{isInEditMode ? <>{translations.editTitle} <b /></> : translations.title}</h4>
        </div>
        <form>
          <div className={cls.field}>
            <label>{translations.course}</label>
            <SearchSelect placeholder={translations.course} options={coursesList?.webinars.map(item => ({ label: translationsHandler(item.translations, locale).title, value: `${item.id}` })) || []} selectedOption={data.webinar_id} setSelectedOption={(e) => dispatch({ webinar_id: e.value })} disabled={isLoadingCourses} />
          </div>
          <div className={cls.empty}></div>
          <div className={cls.field}>
            <label>{translations.quizTitle}</label>
            <Input placeholder={translations.quizTitle} name="title" value={data.title || ''} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.time}</label>
            <Input placeholder={translations.time} type="number" name="time" value={`${data.time}`} onChange={(e) => dispatch({ time: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.number}</label>
            <Input placeholder={translations.number} type="number" name="mark" value={`${data.attempt}`} onChange={(e) => dispatch({ attempt: +e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.passMark}</label>
            <Input placeholder={translations.passMark} type="number" name="mark" value={`${data.pass_mark}`} onChange={(e) => dispatch({ pass_mark: +e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.expiryDays}</label>
            <Input placeholder={translations.expiryDays} type="number" name="days" value={`${data.expiry_days}`} onChange={(e) => dispatch({ expiry_days: e.target.value })} />
          </div>
          <div className={cls.empty}></div>
          <div className={cls.switch}>
            <div className={cls.content}>
              <label>{translations.displayQuestions}</label>
            </div>
            <Switch name="random" switched={data.display_questions_randomly === 'on' ? true : false} setSwitched={(e) => dispatch({ display_questions_randomly: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
          <div className={cls.empty}></div>
          <div className={cls.switch}>
            <div className={cls.content}>
              <label>{translations.certificate}</label>
            </div>
            <Switch name="certificate" switched={data.certificate === 'on' ? true : false} setSwitched={(e) => dispatch({ certificate: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
          <div className={cls.empty}></div>
          <div className={cls.switch}>
            <div className={cls.content}>
              <label>{translations.active}</label>
            </div>
            <Switch name="active" switched={(data.status === 'on') ? true : false} setSwitched={(e) => dispatch({ status: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
          <div className={cls.empty}></div>
        </form>
        {isInEditMode ?
          <div className={cls.questions}>
            <div className={cls.header}>
              <h4>
                {translations.questions}
                <b />
                <div>
                  <button onClick={() => openAddQuestion('multiple')}>{translations.addMultiple}</button>
                  <button onClick={() => openAddQuestion('descriptive')}>{translations.addDescriptive}</button>
                </div>
              </h4>
            </div>
            <div className={cls.list}>
              {data?.quiz_questions?.length ?
                <>
                  {data?.quiz_questions?.map((question, index) => (
                    <div className={cls.singleQuestion} key={index}>
                      <div className={cls.head}>
                        <h5><span>{translations.questionTitle}:</span> {translationsHandler(question.translations, locale).title || '-'}</h5>
                        <div className={cls.icons}>
                          <Icon icon="tabler:edit" onClick={() => editQuestion({ ...question, grade: +question.grade })} />
                          <Icon icon="ic:round-close" onClick={() => deleteQuestion(question.id)} />
                        </div>
                      </div>
                      <div className={cls.details}>
                        <p><span>{translations.type}:</span> {question.type || '-'}</p>
                        <p><span>{translations.grade}:</span> {question.grade || '-'}</p>
                      </div>
                    </div>
                  ))}
                </>
                :
                isLoading
                  ?
                  <>
                    <LoadingSkeleton width='100%' height='100px' />
                    <LoadingSkeleton width='100%' height='100px' />
                  </>
                  :
                  <div className={cls.noData}>
                    <p>{translations.noQuestions}</p>
                  </div>
              }
            </div>
          </div>
          :
          null
        }
        <div className={cls.actions}>
          <button onClick={saveQuiz}>{isInEditMode ? translations.edit : translations.create}</button>
        </div>
        {showModal === 'multiple' &&
          <MultipleQuestionModal
            setOpen={setShowModal}
            locale={locale}
            translations={translations}
            quizId={quizId || 0}
            questionToUpdate={questionToUpdate}
            refetch={refetch}
          />
        }
        {showModal === 'descriptive' &&
          <DescriptiveQuestionModal
            setOpen={setShowModal}
            locale={locale}
            translations={translations}
            quizId={quizId || 0}
            questionToUpdate={questionToUpdate}
            refetch={refetch}
          />
        }
      </div>
    </>
  )
}

export default NewQuiz;