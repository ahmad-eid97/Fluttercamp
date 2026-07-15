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
import cls from './newQuizForm.module.scss';

type Props = {
  locale: Locale;
  setOpenNewQuiz: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['quizNCertificates'];
  refetch: () => Promise<void>;
}

function NewQuizForm({ locale, translations, setOpenNewQuiz, refetch }: Props) {
  const [data, dispatch, reset] = useCompoundState<Omit<AddUpdateQuizInChapterPayload, 'locale' | 'webinar_id' | 'chapter_id' | 'creator_id'>>({
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

  async function addQuiz(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const neededData = {
      webinar_id: id.toString(),
      locale: LocaleEnum.en,
      ...data
    }
    const response = await addQuizToChapter(neededData);
    // @ts-ignore
    if (response.success) {
      reset();
      await refetch();
      setOpenNewQuiz(false);
      toastSuccess(translations.quizAdded);
    }
    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newQuizForm}>
      <div className={cls.head}>
        <h5>{translations.addNew}</h5>
      </div>
      <form>
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
          <Input placeholder={translations.number} type="number" name="attempt" value={`${data.attempt}`} onChange={(e) => dispatch({ attempt: +e.target.value })} />
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
          <div className={cls.content}>
            <label>{translations.displayQuestions}</label>
          </div>
          <Switch name="radisplay_questions_randomlyndom" switched={data.display_questions_randomly === 'on' ? true : false} setSwitched={(e) => dispatch({ display_questions_randomly: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
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
          <Switch name="status" switched={data.status === 'on' ? true : false} setSwitched={(e) => dispatch({ status: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
        </div>
      </form>
      <div className={cls.actions}>
        <button onClick={() => setOpenNewQuiz(false)}>{translations.cancel}</button>
        <button onClick={addQuiz}>{translations.save}</button>
      </div>
    </div>
  )
}

export default NewQuizForm;
