//= Components
import Input from '@/components/UIs/Input';
import TextArea from '@/components/UIs/TextArea';
import FileInput from '@/components/UIs/FileInput';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { toastSuccess } from '@/utils/toast';
import { translationsHandler } from '@/utils/translationsHandler';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Api
import { addQuestionInQuiz, UpdateQuestionInQuiz } from '@/api';
//= Types
import type { Dictionary, Locale, QuestionForUpdate } from '@/types';
//= Styles
import cls from './descriptiveQuestion.module.scss';

type Props = {
  setOpen: (value: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['quizNCertificates'];
  quizId: number;
  questionToUpdate: QuestionForUpdate | undefined;
  refetch: () => void;
}

type Fields = {
  type: string;
  title: string | null;
  grade: number;
  image: string | null;
  video: string | null;
  current_answer: string | undefined;
}

function DescriptiveQuestion({ setOpen, translations, quizId, questionToUpdate, refetch }: Props) {
  const { locale } = useDictionary();
  const [data, dispatch] = useCompoundState<Fields>({
    type: 'descriptive',
    title: questionToUpdate && questionToUpdate.translations ? translationsHandler(questionToUpdate.translations, locale as Locale).title : '',
    grade: questionToUpdate && questionToUpdate.grade ? questionToUpdate.grade : 0,
    video: questionToUpdate && questionToUpdate.video ? questionToUpdate.video : '',
    image: questionToUpdate && questionToUpdate.image ? questionToUpdate.image : '',
    current_answer: questionToUpdate ? questionToUpdate.current_answer : '',
  });

  async function addUpdateQuestion(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const payload = {
      quiz_id: +quizId,
      locale: 'EN' as 'EN' | 'AR',
      ...data
    }
    if (questionToUpdate) {
      try {
        const response = await UpdateQuestionInQuiz(questionToUpdate.id ? questionToUpdate.id : 0, payload);
        // @ts-ignore
        if (response?.success) {
          refetch();
          setOpen(false);
          toastSuccess(translations.multipleQuestion.questionAdded);
        }
      } catch (err) { }
    } else {
      try {
        const response = await addQuestionInQuiz(payload);
        // @ts-ignore
        if (response?.success) {
          refetch();
          setOpen(false);
          toastSuccess(translations.multipleQuestion.questionAdded);
        }
      } catch (err) { }
    }
    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.descriptiveQuestion}>
      <h5>{questionToUpdate ? translations.descriptiveQuestion.editDescriptive : translations.descriptiveQuestion.newDescriptive}</h5>
      <div className={cls.fields}>
        <div className={cls.field}>
          <label>{translations.descriptiveQuestion.questionTitle}</label>
          <Input placeholder={translations.descriptiveQuestion.questionTitle} name="question" value={data.title || ''} onChange={(e) => dispatch({ title: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.descriptiveQuestion.grade}</label>
          <Input type='number' placeholder={translations.descriptiveQuestion.grade} name="grade" value={`${data.grade}`} onChange={(e) => dispatch({ grade: +e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.descriptiveQuestion.image}</label>
          <FileInput placeholder={translations.descriptiveQuestion.image} name="image" value={data.image} onChange={(e, link) => dispatch({ image: link })} />
        </div>
        <div className={cls.field}>
          <label>{translations.descriptiveQuestion.video}</label>
          <Input icon='ph:link-bold' placeholder={translations.descriptiveQuestion.video} name="grade" value={data.video || ''} onChange={(e) => dispatch({ video: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.descriptiveQuestion.correctAnswer}</label>
          <TextArea placeholder={translations.descriptiveQuestion.correctAnswer} name="correct" value={data.current_answer || ''} onChange={(e) => dispatch({ current_answer: e.target.value })} />
        </div>
      </div>
      <div className={cls.actions}>
        <button onClick={() => setOpen(false)}>{translations.descriptiveQuestion.close}</button>
        <button onClick={addUpdateQuestion}>{questionToUpdate ? translations.descriptiveQuestion.updateDescriptive : translations.descriptiveQuestion.addDescriptive}</button>
      </div>
    </div>
  )
}

export default DescriptiveQuestion;