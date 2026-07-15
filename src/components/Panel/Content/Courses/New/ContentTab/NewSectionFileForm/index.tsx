import { useParams } from 'next/navigation';
//= Components
import Input from '@/components/UIs/Input';
import Switch from '@/components/UIs/Switch';
import SelectBox from '@/components/UIs/Select';
import FileInput from '@/components/UIs/FileInput';
import TextArea from '@/components/UIs/TextArea';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Types
import type { AddUpdateFileInChapterPayload, Dictionary, Locale } from '@/types';
import { LocaleEnum, OnOffEnum, StorageEnum, AccessibilityEnum, FileTypeEnum } from '@/api/panel/courses/types/files';
//= Api
import { addFileToChapter } from '@/api';
//= Styles
import cls from './newSectionFileForm.module.scss';

type Props = {
  locale: Locale;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['content'];
  sectionId: number;
  refetch: () => void;
}

function NewSectionFileForm({ locale, translations, setOpen, sectionId, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Omit<AddUpdateFileInChapterPayload, 'webinar_id' | 'chapter_id' | 'locale' | 'access_after_day'>>({
    title: '',
    storage: 'upload' as StorageEnum,
    file_path: '',
    accessibility: AccessibilityEnum.free,
    file_type: FileTypeEnum.pdf,
    status: OnOffEnum.on,
    description: '',
    downloadable: OnOffEnum.on,
    check_previous_parts: OnOffEnum.off,
    sequence_content: OnOffEnum.on,
    online_viewer: OnOffEnum.on,
    volume: 0,
  });
  const { id } = useParams<Record<string, string>>();

  const sources = [
    {
      label: translations.file.upload,
      value: StorageEnum.upload
    },
    {
      label: translations.file.youtube,
      value: StorageEnum.youtube
    },
    {
      label: translations.file.vimeo,
      value: StorageEnum.vimeo
    },
    {
      label: translations.file.extranal,
      value: StorageEnum.external_link
    },
    {
      label: translations.file.drive,
      value: StorageEnum.google_drive
    },
    {
      label: translations.file.iframe,
      value: StorageEnum.iframe
    }
  ]

  const types = [
    {
      label: translations.file.pdf,
      value: FileTypeEnum.pdf
    },
    {
      label: translations.file.powerpoint,
      value: FileTypeEnum.powerpoint
    },
    {
      label: translations.file.sound,
      value: FileTypeEnum.sound
    },
    {
      label: translations.file.video,
      value: FileTypeEnum.video
    },
    {
      label: translations.file.image,
      value: FileTypeEnum.image
    },
    {
      label: translations.file.archive,
      value: FileTypeEnum.archive
    },
    {
      label: translations.file.document,
      value: FileTypeEnum.document
    }
  ]

  async function saveFile(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const neededData = {
      webinar_id: +id,
      locale: LocaleEnum.en,
      chapter_id: sectionId,
      ...data,
    }
    const response = await addFileToChapter(neededData);
    try {
      // @ts-ignore
      if (response.code === 200) {
        refetch();
        setOpen(false);
        toastSuccess(translations.file.added);
      }
    } catch (err) { }
    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newSectionFileForm}>
      <div className={cls.head}>
        <h4>{translations.file.title}</h4>
      </div>
      <form>
        <div className={cls.field}>
          <label>{translations.file.titleField}</label>
          <Input placeholder={translations.file.titleField} name="title" value={data.title} onChange={(e) => dispatch({ title: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.file.source}</label>
          <SelectBox options={sources} name="storage" defaultValue={data.storage} onChange={(e) => dispatch({ storage: e.target.value as StorageEnum })} noFocus={true} />
        </div>
        {data.storage === 'upload' ?
          <div className={cls.field}>
            <FileInput placeholder={translations.file.uploadPlaceholder} label={translations.file.uploadFiles} name="file_path" value={data.file_path} onChange={(e, link) => dispatch({ file_path: link })} />
          </div>
          :
          <div className={cls.field}>
            <label>{translations.file.path}</label>
            <Input placeholder={translations.file.pathPlaceholder} icon="ph:link-bold" name="file_path" value={data.file_path} onChange={(e) => dispatch({ file_path: e.target.value })} />
          </div>
        }
        {(data.storage === StorageEnum.google_drive || data.storage === StorageEnum.external_link) &&
          <>
            <div className={cls.empty}></div>
            <div className={cls.field}>
              <label>{translations.file.fileType}</label>
              <SelectBox options={types} name="file_type" defaultValue={data.file_type} onChange={(e) => dispatch({ file_type: e.target.value as FileTypeEnum })} noFocus={true} />
            </div>
            <div className={cls.field}>
              <label>{translations.file.volume} ({translations.file.inMBs})</label>
              <Input placeholder={translations.file.volume} icon="eos-icons:volume" type='number' name="file_path" value={data.volume?.toString()} onChange={(e) => dispatch({ volume: +e.target.value })} />
            </div>
            <div className={cls.empty}></div>
          </>
        }
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.file.accessibility}</label>
          <div className={cls.radioGroup}>
            <div className={cls.radio}>
              <input type="radio" name="accessibility" className='ui-radiobox' value="free" onChange={(e) => dispatch({ accessibility: e.target.value as AccessibilityEnum })} />
              <label>{translations.file.free}</label>
            </div>
            <div className={cls.radio}>
              <input type="radio" name="accessibility" className='ui-radiobox' value="paid" onChange={(e) => dispatch({ accessibility: e.target.value as AccessibilityEnum })} />
              <label>{translations.file.paid}</label>
            </div>
          </div>
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.file.description}</label>
          <TextArea placeholder={translations.file.description} name="description" value={data.description} onChange={(e) => dispatch({ description: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        {data.storage === 'upload' &&
          <>
            <div className={cls.switch}>
              <div>
                <label>{translations.file.downloadable}</label>
              </div>
              <Switch name="downloadable" switched={data.downloadable === OnOffEnum.on ? true : false} setSwitched={(e) => dispatch({ downloadable: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
            </div>
            <div className={cls.empty}></div>
          </>
        }
        <div className={cls.switch}>
          <div>
            <label>{translations.file.active}</label>
          </div>
          <Switch name="status" switched={data.status === OnOffEnum.on ? true : false} setSwitched={(e) => dispatch({ status: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div>
            <label>{translations.file.dripContent}</label>
          </div>
          <Switch name="content" switched={data.check_previous_parts === OnOffEnum.on ? true : false} setSwitched={(e) => dispatch({ check_previous_parts: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
        </div>
      </form>
      <div className={cls.actions}>
        <button onClick={() => setOpen(false)}>{translations.file.cancel}</button>
        <button onClick={saveFile}>{translations.file.save}</button>
      </div>
    </div>
  )
}

export default NewSectionFileForm;
