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
//= Api
import { updateQuizInChapter, deleteQuizQuestion } from '@/api';
//= Types
import type { Dictionary, Locale, AddUpdateQuizInChapterPayload, QuestionForUpdate } from '@/types';
import type { QuizToUpdate } from '../types';
import { OnOffEnum, LocaleEnum } from '@/api/panel/courses/types/files';
//= Styles
import cls from './quizModal.module.scss';

type Props = {
  locale: Locale;
  quiz: QuizToUpdate | any;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['quizNCertificates'];
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
    // @ts-ignore
    if (response.success) {
      await refetch();
      setOpen(false);
      toastSuccess(translations.updated);
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
      try {
        // @ts-ignore
        if (response.code === 200) {
          refetch();
          setOpen(false);
          toastSuccess(translations.questionDeleted);
        }
      } catch (err) { }
    }
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.quizModal}>
        <div className={cls.head}>
          <h5>{translations.modalTitle}</h5>
        </div>
        <form>
          <div className={cls.field}>
            <label>{translations.titleField}</label>
            <Input placeholder={translations.titleField} name="title" value={data.title || ''} onChange={(e) => dispatch({ title: e.target.value })} />
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
            <Input placeholder={translations.passMark} type="number" name="pass_mark" value={`${data.pass_mark}`} onChange={(e) => dispatch({ pass_mark: +e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.expiryDays}</label>
            <Input placeholder={translations.expiryDays} type="number" name="days" value={`${data.expiry_days}`} onChange={(e) => dispatch({ expiry_days: e.target.value })} />
          </div>
          <div className={cls.empty}></div>
          <div className={cls.switch}>
            <div>
              <label>{translations.displayQuestions}</label>
            </div>
            <Switch name="display_questions_randomly" switched={data.display_questions_randomly === 'on' ? true : false} setSwitched={(e) => dispatch({ display_questions_randomly: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
          <div className={cls.empty}></div>
          <div className={cls.switch}>
            <div>
              <label>{translations.certificate}</label>
            </div>
            <Switch name="certificate" switched={data.certificate === 'on' ? true : false} setSwitched={(e) => dispatch({ certificate: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
          <div className={cls.empty}></div>
          <div className={cls.switch}>
            <div>
              <label>{translations.active}</label>
            </div>
            <Switch name="status" switched={data.status === 'on' ? true : false} setSwitched={(e) => dispatch({ status: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
        </form>
        {data?.quiz_questions?.length ?
          <div className={cls.questions}>
            <h5>{translations.questions}</h5>
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
          </div>
          :
          null
        }
        <div className={cls.questionActions}>
          <button onClick={() => { setQuestionToUpdate(undefined); setOpenMultipleQuestion(true) }}>{translations.addMultiple}</button>
          <button onClick={() => { setQuestionToUpdate(undefined); setOpenDescriptiveQuestion(true) }}>{translations.addDescriptiveQuestion}</button>
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
          <button onClick={() => setOpen(false)}>{translations.cancel}</button>
          <button onClick={saveQuiz}>{translations.save}</button>
        </div>
      </div>
    </Modal>
  )
}

export default QuizModal;
