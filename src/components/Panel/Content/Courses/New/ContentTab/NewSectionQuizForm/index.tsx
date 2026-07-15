import { useParams } from 'next/navigation';
//= Components
import Input from '@/components/UIs/Input';
import Switch from '@/components/UIs/Switch';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Types
import type { Dictionary, Locale, AddUpdateQuizInChapterPayload } from '@/types';
import { OnOffEnum, LocaleEnum } from '@/api/panel/courses/types/files';
//= Api
import { addQuizToChapter } from '@/api';
//= Styles
import cls from './newSectionQuizForm.module.scss';

type Props = {
  locale: Locale;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['content'];
  sectionId: number;
  refetch: () => void;
}

function NewSectionQuizForm({ locale, translations, setOpen, sectionId, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Omit<AddUpdateQuizInChapterPayload, 'locale' | 'webinar_id' | 'chapter_id' | 'creator_id'>>({
    title: '',
    time: '',
    attempt: 0,
    pass_mark: 0,
    expiry_days: '',
    display_questions_randomly: OnOffEnum.off,
    certificate: OnOffEnum.off,
    status: OnOffEnum.off,
  });
  const { id } = useParams<Record<string, string>>();

  async function saveQuiz(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const neededData = {
      webinar_id: id.toString(),
      locale: LocaleEnum.en,
      chapter_id: +sectionId,
      ...data
    }
    const response = await addQuizToChapter(neededData);
    // @ts-ignore
    if (response.success) {
      await refetch();
      setOpen(false);
      toastSuccess(translations.quiz.added);
    }
    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newSectionQuizForm}>
      <div className={cls.head}>
        <h4>{translations.quiz.title}</h4>
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
      <div className={cls.actions}>
        <button onClick={() => setOpen(false)}>{translations.quiz.cancel}</button>
        <button onClick={saveQuiz}>{translations.quiz.save}</button>
      </div>
    </div>
  )
}

export default NewSectionQuizForm;
