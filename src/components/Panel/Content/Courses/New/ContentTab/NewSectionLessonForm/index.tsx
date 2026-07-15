import { useParams } from 'next/navigation';
//= Components
import Input from '@/components/UIs/Input';
import Switch from '@/components/UIs/Switch';
import SelectBox from '@/components/UIs/Select';
import FileInput from '@/components/UIs/FileInput';
import TextArea from '@/components/UIs/TextArea';
import TextEditor from '@/components/UIs/TextEditor';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Types
import type { AddUpdateTextLessonInChapterPayload, Dictionary, Locale } from '@/types';
import { AccessibilityEnum, OnOffEnum, LocaleEnum } from '@/api/panel/courses/types/files';
//= Api
import { addTextLessonToChapter } from '@/api';
//= Styles
import cls from './newSectionLessonForm.module.scss';

type Props = {
  locale: Locale;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['content'];
  sectionId: number;
  refetch: () => void;
}

function NewSectionLessonForm({ locale, translations, setOpen, sectionId, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Omit<AddUpdateTextLessonInChapterPayload, 'webinar_id' | 'locale' | 'chapter_id' | 'attachments' | 'sequence_content' | 'access_after_day'>>({
    title: '',
    study_time: 0,
    image: '',
    // attachments: lesson.attachments,
    accessibility: '' as AccessibilityEnum,
    summary: '',
    content: '',
    status: OnOffEnum.on,
    check_previous_parts: OnOffEnum.off,
  });
  const { id } = useParams<Record<string, string>>();

  async function saveLesson(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const neededData = {
      webinar_id: +id,
      locale: LocaleEnum.en,
      chapter_id: +sectionId,
      ...data
    }
    const response = await addTextLessonToChapter(neededData);
    try {
      // @ts-ignore
      if (response.code === 200) {
        refetch();
        setOpen(false);
        toastSuccess(translations.lesson.added);
      }
    } catch (err) { }
    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newSectionLessonForm}>
      <div className={cls.head}>
        <h4>{translations.lesson.title}</h4>
      </div>
      <form>
        <div className={cls.field}>
          <label>{translations.lesson.titleField}</label>
          <Input placeholder={translations.lesson.titleField} name="title" value={data.title} onChange={(e) => dispatch({ title: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.lesson.studyTime}</label>
          <Input placeholder={translations.lesson.studyTime} type="number" name="time" value={`${data.study_time}`} onChange={(e) => dispatch({ study_time: +e.target.value })} />
        </div>
        <div className={cls.field}>
          <FileInput placeholder={translations.lesson.uploadPlaceholder} label={translations.lesson.udploadImage} name="image" value={data.image} onChange={(e, link) => dispatch({ image: link })} />
        </div>
        {/* <div className={cls.field}>
          <label>{translations.lesson.attachments}</label>
          <SelectBox options={[]} name="attachments" defaultValue={data.attachments} onChange={(e) => dispatch({ attachments: e.target.value })} noFocus={true} />
        </div> */}
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.lesson.accessibility}</label>
          <div className={cls.radioGroup}>
            <div className={cls.radio}>
              <input type="radio" name="accessibility" className='ui-radiobox' value="free" onChange={(e) => dispatch({ accessibility: e.target.value as AccessibilityEnum })} />
              <label>{translations.lesson.free}</label>
            </div>
            <div className={cls.radio}>
              <input type="radio" name="accessibility" className='ui-radiobox' value="paid" onChange={(e) => dispatch({ accessibility: e.target.value as AccessibilityEnum })} />
              <label>{translations.lesson.paid}</label>
            </div>
          </div>
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.lesson.summary}</label>
          <TextArea placeholder={translations.lesson.summary} name="summary" value={data.summary} onChange={(e) => dispatch({ summary: e.target.value })} />
        </div>
        <div className={cls.fullField}>
          <label>{translations.lesson.content}</label>
          <TextEditor onChange={(value) => dispatch({ content: value })} />
        </div>
        <div className={cls.switch}>
          <div>
            <label>{translations.lesson.active}</label>
          </div>
          <Switch name="status" switched={data.status === 'on' ? true : false} setSwitched={(e) => dispatch({ status: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div>
            <label>{translations.lesson.dripContent}</label>
          </div>
          <Switch name="check_previous_parts" switched={data.check_previous_parts === 'on' ? true : false} setSwitched={(e) => dispatch({ check_previous_parts: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
        </div>
      </form>
      <div className={cls.actions}>
        <button onClick={() => setOpen(false)}>{translations.lesson.cancel}</button>
        <button onClick={saveLesson}>{translations.lesson.save}</button>
      </div>
    </div>
  )
}

export default NewSectionLessonForm;
