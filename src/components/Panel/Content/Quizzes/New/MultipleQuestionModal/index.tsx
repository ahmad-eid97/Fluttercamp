//= Components
import Modal from '@/components/UIs/Modal';
import Input from '@/components/UIs/Input';
import FileInput from '@/components/UIs/FileInput';
import Switch from '@/components/UIs/Switch';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Types
import type { Dictionary, Locale, QuestionForUpdate } from '@/types';
import { OnOffEnum } from '@/api/panel/courses/types/files';
//= Api 
import { addQuestionInQuiz, UpdateQuestionInQuiz } from '@/api';
//= Styles
import cls from './multipleQuestionModal.module.scss';
import { translationsHandler } from '@/utils/translationsHandler';

type Props = {
  setOpen: (value: boolean) => void;
  locale: Locale;
  translations: Dictionary['panel']['quizzes']['new'];
  quizId: number;
  questionToUpdate: QuestionForUpdate | undefined;
  refetch: () => void;
}

type Fields = {
  type: string;
  title: string | null;
  grade: number;
  video: string | null;
  image: string | null;
  answers: {
    title: string | null,
    file: string,
    correct: string;
  }[];
}

function MultipleQuestionModal({ setOpen, locale, translations, quizId, questionToUpdate, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    type: 'multiple',
    title: questionToUpdate && questionToUpdate.translations ? translationsHandler(questionToUpdate.translations, locale).title : '',
    grade: questionToUpdate && questionToUpdate.grade ? questionToUpdate.grade : 0,
    video: questionToUpdate && questionToUpdate.video ? questionToUpdate.video : '',
    image: questionToUpdate && questionToUpdate.image ? questionToUpdate.image : '',
    answers: questionToUpdate && questionToUpdate.quizzes_questions_answers ?
      [...questionToUpdate.quizzes_questions_answers.map(item => ({ ...item, title: item.translations ? translationsHandler(item.translations, locale).title : '', file: item.image || '', correct: item.correct === '1' ? 'on' : 'off' }))]
      :
      [
        {
          title: '',
          file: '',
          correct: 'off'
        }
      ]
  });

  function answersHandler(index: number, key: string, value: string) {
    dispatch({
      answers: [
        ...data.answers.slice(0, index),
        {
          ...data.answers[index],
          [key]: value
        },
        ...data.answers.slice(index + 1)
      ]
    })
  }

  function addNewAnswer() {
    dispatch({
      answers: [
        ...data.answers,
        {
          title: '',
          file: '',
          correct: 'off'
        }
      ]
    })
  }

  async function addUpdateQuestion(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const payload = {
      quiz_id: +quizId,
      locale: 'EN' as 'EN' | 'AR',
      ...data,
      answers: data.answers[0].title ? [...data.answers] : []
    }

    if (questionToUpdate) {
      try {
        const response = await UpdateQuestionInQuiz(questionToUpdate.id ? questionToUpdate.id : 0, payload);
        // @ts-ignore
        if (response?.success) {
          refetch();
          setOpen(false);
          toastSuccess(translations.questionUpdated);
        }
      } catch (err) { }
    } else {
      try {
        const response = await addQuestionInQuiz(payload);
        // @ts-ignore
        if (response?.success) {
          refetch();
          setOpen(false);
          toastSuccess(translations.questionAdded);
        }
      } catch (err) { }
    }
    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.multipleQuestion}>
        <h5>{questionToUpdate ? translations.editMultiple : translations.newMultiple}</h5>
        <div className={cls.fields}>
          <div className={cls.field}>
            <label>{translations.questionTitle}</label>
            <Input placeholder={translations.questionTitle} name="question" value={data.title || ''} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.grade}</label>
            <Input type='number' placeholder={translations.grade} name="grade" value={`${data.grade}`} onChange={(e) => dispatch({ grade: +e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.image}</label>
            <FileInput placeholder={translations.image} name="image" value={data.image} onChange={(e, link) => dispatch({ image: link })} />
          </div>
          <div className={cls.field}>
            <label>{translations.video}</label>
            <Input icon='ph:link-bold' placeholder={translations.video} name="grade" value={data.video || ''} onChange={(e) => dispatch({ video: e.target.value })} />
          </div>
        </div>
        <div className={cls.answers}>
          <div className={cls.header}>
            <h5>{translations.answers}</h5>
            <button onClick={addNewAnswer}>{translations.addAnswer}</button>
          </div>
          <div className={cls.list}>
            {data?.answers?.map((answer, index) => (
              <div className={cls.answer} key={index}>
                <div className={cls.field}>
                  <label>{translations.answerTitle}</label>
                  <Input placeholder={translations.answerTitle} name={`answer-${answer.title}`} value={answer.title || ''} onChange={(e) => answersHandler(index, 'title', e.target.value)} />
                </div>
                <div className={cls.field}>
                  <label>{translations.answerImage}</label>
                  <FileInput placeholder={translations.answerImage} value={answer.file} onChange={(e, link) => answersHandler(index, 'file', link)} />
                </div>
                <div className={cls.switch}>
                  <label>{translations.isCorrect}</label>
                  <Switch switched={answer.correct === 'on' ? true : false} setSwitched={(e) => answersHandler(index, 'correct', e.target.checked ? OnOffEnum.on : OnOffEnum.off)} dark={true} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={cls.actions}>
          <button onClick={() => setOpen(false)}>{translations.close}</button>
          <button onClick={addUpdateQuestion}>{questionToUpdate ? translations.update : translations.add}</button>
        </div>
      </div>
    </Modal>
  )
}

export default MultipleQuestionModal;
