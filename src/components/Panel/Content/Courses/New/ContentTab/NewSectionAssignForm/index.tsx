import { useParams } from 'next/navigation';
//= Components
import Input from '@/components/UIs/Input';
import Switch from '@/components/UIs/Switch';
import TextArea from '@/components/UIs/TextArea';
import FileInput from '@/components/UIs/FileInput';
import { Icon } from '@iconify/react';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Types
import type { Dictionary, Locale, AddUpdateAssignmentInChapterPayload } from '@/types';
import { OnOffEnum, LocaleEnum } from '@/api/panel/courses/types/files';
//= Api
import { addAssignmentToChapter } from '@/api';
//= Styles
import cls from './newSectionAssignForm.module.scss';

type Props = {
  locale: Locale;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['content'];
  sectionId: number;
  refetch: () => void;
}

function NewSectionAssignForm({ locale, translations, setOpen, sectionId, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Omit<AddUpdateAssignmentInChapterPayload, 'webinar_id' | 'locale' | 'chapter_id'>>({
    title: '',
    description: '',
    grade: 0,
    pass_grade: 0,
    deadline: 0,
    attempts: 0,
    attachments: [{
      title: '',
      attach: null
    }],
    status: OnOffEnum.on,
    check_previous_parts: OnOffEnum.off,
  });
  const { id } = useParams<Record<string, string>>();

  function handleAttachments({ index, key, value }: { index: number, key: string, value: string | File | null }) {
    dispatch({ attachments: [...data.attachments.slice(0, index), { ...data.attachments[index], [key]: value }, ...data.attachments.slice(index + 1)] })
  }

  function addAttach() {
    dispatch({ attachments: [...data.attachments, { title: '', attach: null }] })
  }

  function removeAttach(index: number) {
    dispatch({ attachments: [...data.attachments.slice(0, index), ...data.attachments.slice(index + 1)] })
  }

  async function saveAssignment(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const neededData = {
      webinar_id: +id,
      locale: LocaleEnum.en,
      chapter_id: +sectionId,
      ...data,
      attachments: data.attachments[0].title ? data.attachments : [],
    }

    const response = await addAssignmentToChapter(neededData);
    try {
      // @ts-ignore
      if (response.code === 200) {
        refetch();
        setOpen(false);
        toastSuccess(translations.assignment.added);
      }
    } catch (err) { }
    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newSectionAssignForm}>
      <div className={cls.head}>
        <h4>{translations.assignment.title}</h4>
      </div>
      <form>
        <div className={cls.field}>
          <label>{translations.assignment.titleField}</label>
          <Input placeholder={translations.assignment.titleField} name="title" value={data.title} onChange={(e) => dispatch({ title: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.assignment.description}</label>
          <TextArea placeholder={translations.assignment.description} name="description" value={data.description} onChange={(e) => dispatch({ description: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.assignment.grade}</label>
          <Input placeholder={translations.assignment.grade} type="number" name="grade" value={`${data.grade}`} onChange={(e) => dispatch({ grade: +e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.assignment.passGrade}</label>
          <Input placeholder={translations.assignment.passGrade} type="number" name="pass_grade" value={`${data.pass_grade}`} onChange={(e) => dispatch({ pass_grade: +e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.assignment.deadline}</label>
          <Input placeholder={translations.assignment.deadline} type="number" name="deadline" value={`${data.deadline}`} onChange={(e) => dispatch({ deadline: +e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.assignment.attempts}</label>
          <Input placeholder={translations.assignment.attempts} type="number" name="mark" value={`${data.attempts}`} onChange={(e) => dispatch({ attempts: +e.target.value })} />
        </div>
        <div className={cls.field}>
          <div className={cls.head}>
            <label>{translations.assignment.attachments.title}</label>
            <Icon icon="ic:round-plus" onClick={addAttach} />
          </div>
          {data.attachments.map((attachment, index) => (
            <div className={cls.attachment} key={index}>
              <div className={cls.head}>
                <label>{translations.assignment.attachments.titleField}</label>
                {index !== 0 && <Icon icon="ic:round-close" onClick={() => removeAttach(index)} />}
              </div>
              <Input placeholder={translations.assignment.attachments.textPlaceholder} name="mark" value={attachment.title} onChange={(e) => handleAttachments({ index, key: 'title', value: e.target.value })} />
              <FileInput placeholder={translations.assignment.attachments.filePlaceholder} name="attach" value={attachment.attach} onChange={(e, link) => handleAttachments({ index, key: 'attach', value: link })} />
            </div>
          ))}
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div>
            <label>{translations.assignment.active}</label>
          </div>
          <Switch name="status" switched={data.status === 'on' ? true : false} setSwitched={(e) => dispatch({ status: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div>
            <label>{translations.assignment.dripContent}</label>
          </div>
          <Switch name="check_previous_parts" switched={data.check_previous_parts === 'on' ? true : false} setSwitched={(e) => dispatch({ check_previous_parts: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
        </div>
      </form>
      <div className={cls.actions}>
        <button onClick={() => setOpen(false)}>{translations.assignment.cancel}</button>
        <button onClick={saveAssignment}>{translations.assignment.save}</button>
      </div>
    </div>
  )
}

export default NewSectionAssignForm;
