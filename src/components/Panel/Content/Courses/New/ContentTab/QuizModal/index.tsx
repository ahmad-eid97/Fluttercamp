import { useState } from 'react';
import { useParams } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import Modal from '@/components/UIs/Modal';
import Input from '@/components/UIs/Input';
import Switch from '@/components/UIs/Switch';
import MultipleQuestion from './MultipleQuestion';
import DescriptiveQuestion from './DescriptiveQuestion';
import { confirmDialog } from '@/lib/confirm';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { toastSuccess } from '@/utils/toast';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, AddUpdateQuizInChapterPayload, QuestionForUpdate } from '@/types';
import type { Quiz } from '../types';
import { OnOffEnum, LocaleEnum } from '@/api/panel/courses/types/files';
//= Api
import { updateQuizInChapter, deleteQuizQuestion } from '@/api';
//= Styles
import cls from './quizModal.module.scss';

type Props = {
  locale: Locale;
  quiz: Quiz;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['content'];
  refetch: () => void;
}

function QuizModal({ locale, quiz, setOpen, translations, refetch }: Props) {
  const [openMultipleQuestion, setOpenMultipleQuestion] = useState(false);
  const [openDescriptiveQuestion, setOpenDescriptiveQuestion] = useState(false);
  const [questionToUpdate, setQuestionToUpdate] = useState<QuestionForUpdate | undefined>();
  const [data, dispatch] = useCompoundState<Omit<AddUpdateQuizInChapterPayload, 'locale' | 'webinar_id' | 'chapter_id' | 'creator_id'>>({
    title: translationsHandler(quiz.translations, locale).title || '',
    time: quiz.time,
    attempt: +quiz.attempt,
    pass_mark: +quiz.pass_mark,
    expiry_days: quiz.expiry_days,
    display_questions_randomly: quiz.display_questions_randomly === '1' ? OnOffEnum.on : OnOffEnum.off,
    certificate: quiz.certificate === '1' ? OnOffEnum.on : OnOffEnum.off,
    status: quiz.status === 'active' ? OnOffEnum.on : OnOffEnum.off,
    quiz_questions: quiz.quiz_questions
  });
  const { id } = useParams<Record<string, string>>();

  function editQuestion(question: QuestionForUpdate) {
    setQuestionToUpdate(question);
    if (question.type === 'descriptive') {
      setOpenDescriptiveQuestion(true);
    } else {
      setOpenMultipleQuestion(true);
    }
  }

  async function saveQuiz(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const neededData = {
      webinar_id: id.toString(),
      locale: LocaleEnum.en,
      chapter_id: +quiz.chapter_id,
      ...data,
    }
    const response = await updateQuizInChapter(quiz.id, neededData);
    try {
      // @ts-ignore
      if (response.success) {
        refetch();
        setOpen(false);
        toastSuccess(translations.quiz.updated);
      }
    } catch (err) { }
    button.classList.remove('loading-btn');
  }

  async function deleteQuestion(questionId: number) {
    const result = await confirmDialog({
      icon: 'warning',
      title: translations.quiz.questionDeleteWarning,
      showCancelButton: true,
      cancelButtonText: translations.quiz.cancel,
      confirmButtonText: translations.quiz.delete,
    });

    if (result.isConfirmed) {
      const response = await deleteQuizQuestion(questionId);
      try {
        // @ts-ignore
        if (response.code === 200) {
          refetch();
          setOpen(false);
          toastSuccess(translations.quiz.questionDeleted);
        }
      } catch (err) { }
    }
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.quizModal}>
        <div className={cls.head}>
          <h4>{translations.quiz.modalTitle}</h4>
        </div>
        <form>
          <div className={cls.field}>
            <label>{translations.quiz.titleField}</label>
            <Input placeholder={translations.quiz.titleField} name="title" value={data.title || ''} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.quiz.time}</label>
            <Input placeholder={translations.quiz.time} type="number" name="time" value={`${data.time}`} onChange={(e) => dispatch({ time: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.quiz.number}</label>
            <Input placeholder={translations.quiz.number} type="number" name="mark" value={`${data.attempt}`} onChange={(e) => dispatch({ attempt: +e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.quiz.passMark}</label>
            <Input placeholder={translations.quiz.passMark} type="number" name="pass_mark" value={`${data.pass_mark}`} onChange={(e) => dispatch({ pass_mark: +e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.quiz.expiryDays}</label>
            <Input placeholder={translations.quiz.expiryDays} type="number" name="days" value={`${data.expiry_days}`} onChange={(e) => dispatch({ expiry_days: e.target.value })} />
          </div>
          <div className={cls.empty}></div>
          <div className={cls.switch}>
            <div>
              <label>{translations.quiz.displayQuestions}</label>
            </div>
            <Switch name="display_questions_randomly" switched={data.display_questions_randomly === 'on' ? true : false} setSwitched={(e) => dispatch({ display_questions_randomly: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
          <div className={cls.empty}></div>
          <div className={cls.switch}>
            <div>
              <label>{translations.quiz.certificate}</label>
            </div>
            <Switch name="certificate" switched={data.certificate === 'on' ? true : false} setSwitched={(e) => dispatch({ certificate: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
          <div className={cls.empty}></div>
          <div className={cls.switch}>
            <div>
              <label>{translations.quiz.active}</label>
            </div>
            <Switch name="status" switched={data.status === 'on' ? true : false} setSwitched={(e) => dispatch({ status: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
        </form>
        {data?.quiz_questions?.length ?
          <div className={cls.questions}>
            <h4>{translations.quiz.questions}</h4>
            {data?.quiz_questions?.map((question, index) => (
              <div className={cls.singleQuestion} key={index}>
                <div className={cls.head}>
                  <h5><span>{translations.quiz.questionTitle}:</span> {translationsHandler(question.translations, locale).title || '-'}</h5>
                  <div className={cls.icons}>
                    <Icon icon="tabler:edit" onClick={() => editQuestion({ ...question, grade: +question.grade })} />
                    <Icon icon="ic:round-close" onClick={() => deleteQuestion(question.id)} />
                  </div>
                </div>
                <div className={cls.details}>
                  <p><span>{translations.quiz.type}:</span> {question.type || '-'}</p>
                  <p><span>{translations.quiz.grade}:</span> {question.grade || '-'}</p>
                </div>
              </div>
            ))}
          </div>
          :
          null
        }
        <div className={cls.questionActions}>
          <button onClick={() => { setQuestionToUpdate(undefined); setOpenMultipleQuestion(true) }}>{translations.quiz.addMultiple}</button>
          <button onClick={() => { setQuestionToUpdate(undefined); setOpenDescriptiveQuestion(true) }}>{translations.quiz.addDescriptiveQuestion}</button>
        </div>
        {openMultipleQuestion &&
          <MultipleQuestion
            setOpen={setOpenMultipleQuestion}
            translations={translations}
            quizId={quiz.id}
            questionToUpdate={questionToUpdate}
            refetch={refetch}
          />
        }
        {openDescriptiveQuestion &&
          <DescriptiveQuestion
            setOpen={setOpenDescriptiveQuestion}
            translations={translations}
            quizId={quiz.id}
            questionToUpdate={questionToUpdate}
            refetch={refetch}
          />
        }
        <div className={cls.actions}>
          <button onClick={() => setOpen(false)}>{translations.quiz.cancel}</button>
          <button onClick={saveQuiz}>{translations.quiz.save}</button>
        </div>
      </div>
    </Modal>
  )
}

export default QuizModal;
