import { useParams } from 'next/navigation';
//= Components
import Modal from '@/components/UIs/Modal';
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
import { translationsHandler } from '@/utils/translationsHandler';
//= Api
import { updateTextLessonInChapter } from '@/api';
//= Types
import type { Dictionary, Locale, AddUpdateTextLessonInChapterPayload } from '@/types';
import { AccessibilityEnum, OnOffEnum, LocaleEnum } from '@/api/panel/courses/types/files';
import type { Lesson } from '../types';
//= Styles
import cls from './lessonModal.module.scss';

type Props = {
  locale: Locale;
  lesson: Lesson;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['content'];
  refetch: () => void;
}

function LessonModal({ locale, lesson, setOpen, translations, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Omit<AddUpdateTextLessonInChapterPayload, 'webinar_id' | 'locale' | 'chapter_id' | 'attachments' | 'sequence_content' | 'access_after_day'>>({
    title: translationsHandler(lesson.translations, locale).title || '',
    study_time: +lesson.study_time,
    image: lesson.image,
    // attachments: lesson.attachments,
    accessibility: lesson.accessibility as AccessibilityEnum,
    summary: translationsHandler(lesson.translations, locale).summary || '',
    content: translationsHandler(lesson.translations, locale).content || '',
    status: lesson.status === 'active' ? OnOffEnum.on : OnOffEnum.off,
    check_previous_parts: lesson.check_previous_parts === '1' ? OnOffEnum.on : OnOffEnum.off,
  });
  const { id } = useParams<Record<string, string>>();

  async function saveLesson(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const neededData = {
      webinar_id: +id,
      locale: LocaleEnum.en,
      chapter_id: +lesson.chapter_id,
      ...data
    }
    const response = await updateTextLessonInChapter(lesson.id, neededData);
    try {
      // @ts-ignore
      if (response.code === 200) {
        refetch();
        setOpen(false);
        toastSuccess(translations.lesson.updated);
      }
    } catch (err) { }
    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.lessonModal}>
        <div className={cls.head}>
          <h4>{translations.lesson.modalTitle}</h4>
        </div>
        <form>
          <div className={cls.field}>
            <label>{translations.lesson.titleField}</label>
            <Input placeholder={translations.lesson.titleField} name="title" value={data.title || ''} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.lesson.studyTime}</label>
            <Input placeholder={translations.lesson.studyTime} type="number" name="study_time" value={`${data.study_time}`} onChange={(e) => dispatch({ study_time: +e.target.value })} />
          </div>
          <div className={cls.field}>
            <FileInput placeholder={translations.lesson.uploadPlaceholder} label={translations.lesson.udploadImage} name="image" value={data.image} onChange={(e, link) => dispatch({ image: link ? link : '' })} />
          </div>
          {/* <div className={cls.field}>
            <label>{translations.lesson.attachments}</label>
            <SelectBox options={[]} name="attachment" defaultValue={data.attachments[0]} onChange={(e) => dispatch({ attachments: e.target.value })} noFocus={true} />
          </div> */}
          <div className={cls.field}>
            <label>{translations.lesson.accessibility}</label>
            <div className={cls.radioGroup}>
              <div className={cls.radio}>
                <input type="radio" name="accessibility" className='ui-radiobox' value="free" checked={data.accessibility === 'free'} onChange={(e) => dispatch({ accessibility: e.target.value as AccessibilityEnum })} />
                <label>{translations.lesson.free}</label>
              </div>
              <div className={cls.radio}>
                <input type="radio" name="accessibility" className='ui-radiobox' value="paid" checked={data.accessibility === 'paid'} onChange={(e) => dispatch({ accessibility: e.target.value as AccessibilityEnum })} />
                <label>{translations.lesson.paid}</label>
              </div>
            </div>
          </div>
          <div className={cls.field}>
            <label>{translations.lesson.summary}</label>
            <TextArea placeholder={translations.lesson.summary} name="summary" value={data.summary || ''} onChange={(e) => dispatch({ summary: e.target.value })} />
          </div>
          <div className={cls.fullField}>
            <label>{translations.lesson.content}</label>
            <TextEditor defaultValue={data.content || ''} onChange={(value) => dispatch({ content: value })} />
          </div>
          <div className={cls.switch}>
            <div>
              <label>{translations.lesson.active}</label>
            </div>
            <Switch name="active" switched={data.status === 'on' ? true : false} setSwitched={(e) => dispatch({ status: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
          <div className={cls.switch}>
            <div>
              <label>{translations.lesson.dripContent}</label>
            </div>
            <Switch name="content" switched={data.check_previous_parts === 'on' ? true : false} setSwitched={(e) => dispatch({ check_previous_parts: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
        </form>
        <div className={cls.actions}>
          <button onClick={() => setOpen(false)}>{translations.lesson.cancel}</button>
          <button onClick={(e) => saveLesson(e)}>{translations.lesson.save}</button>
        </div>
      </div>
    </Modal>
  )
}

export default LessonModal;
