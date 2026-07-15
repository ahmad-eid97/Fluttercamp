'use client';
import { useParams } from 'next/navigation';
import { format, parse } from 'date-fns';
//= Components
import Modal from '@/components/UIs/Modal';
import Input from '@/components/UIs/Input';
import Switch from '@/components/UIs/Switch';
import TextArea from '@/components/UIs/TextArea';
import DateTimeInput from '@/components/UIs/DateTimeInput';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { toastSuccess } from '@/utils/toast';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import { type Dictionary, type Locale, type AddUpdateSessionInChapterPayload } from '@/types';
import type { Session } from '../types';
import { SessionEnum } from '@/api/panel/courses/types/sessions';
import { OnOffEnum, LocaleEnum } from '@/api/panel/courses/types/files';
//= Api
import { updateSessionInChapter } from '@/api';
//= Styles
import cls from './sessionModal.module.scss';

type Props = {
  locale: Locale;
  session: Session;
  setOpen: (open: boolean) => void;
  translations: Dictionary['panel']['courses']['new']['content'];
  refetch: () => void;
}

function SecssonModal({ locale, session, setOpen, translations, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Omit<AddUpdateSessionInChapterPayload, 'chapter_id' | 'webinar_id'>>({
    session_api: session.session_api as SessionEnum,
    link: session.link,
    title: translationsHandler(session.translations, locale).title || '',
    date: format(new Date(+session.date * 1000), 'yyyy-MM-dd*HH:mm').replace('*', 'T'),
    duration: +session.duration,
    description: translationsHandler(session.translations, locale).description || '',
    extra_time_to_join: +session.extra_time_to_join,
    status: session.status === 'active' ? OnOffEnum.on : OnOffEnum.off,
    agora_chat: session.agora_settings && JSON.parse(session.agora_settings).chat ? OnOffEnum.on : OnOffEnum.off,
    check_previous_parts: session.check_previous_parts as OnOffEnum,
  });
  const { id } = useParams<Record<string, string>>();

  async function saveSession(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const neededData = {
      webinar_id: +id,
      locale: LocaleEnum.en,
      chapter_id: +session.chapter_id,
      ...data,
    }
    const response = await updateSessionInChapter(session.id, neededData);
    try {
      // @ts-ignore
      if (response.code === 200) {
        refetch();
        setOpen(false);
        toastSuccess(translations.session.updated);
      }
    } catch (err) { }
    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.sessionModal}>
        <div className={cls.head}>
          <h4>{translations.session.modalTitle}</h4>
        </div>
        <form>
          <div className={cls.field}>
            <label>{translations.session.provider}</label>
            <div className={cls.radioGroup}>
              <div className={cls.radio}>
                <input type="radio" name="session_api" className='ui-radiobox' value="local" checked={data.session_api === 'local'} onChange={(e) => dispatch({ session_api: e.target.value as SessionEnum })} />
                <label>{translations.session.custom}</label>
              </div>
              <div className={cls.radio}>
                <input type="radio" name="session_api" className='ui-radiobox' value="zoom" checked={data.session_api === 'agora'} onChange={(e) => dispatch({ session_api: e.target.value as SessionEnum })} />
                <label>{translations.session.agora}</label>
              </div>
            </div>
          </div>
          {data.session_api === 'local' &&
            <>
              <div className={cls.field}>
                <label>{translations.session.password}</label>
                <Input placeholder={translations.session.password} name="api_secret" value={data.api_secret} onChange={(e) => dispatch({ api_secret: e.target.value })} />
              </div>
              <div className={cls.field}>
                <label>{translations.session.link}</label>
                <Input placeholder={translations.session.link} name="link" value={data.link} onChange={(e) => dispatch({ link: e.target.value })} />
              </div>
            </>
          }
          <div className={cls.field}>
            <label>{translations.session.titleField}</label>
            <Input placeholder={translations.session.titlePlaceholder} name="title" value={data.title} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.field}>
            <DateTimeInput label={translations.session.date} name="date" value={data.date} onChange={(e) => dispatch({ date: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.session.duration}</label>
            <Input placeholder={translations.session.duration} type="number" name="duration" value={`${data.duration}`} onChange={(e) => dispatch({ duration: +e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.session.description}</label>
            <TextArea placeholder={translations.session.description} name="description" value={data.description} onChange={(e) => dispatch({ description: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.session.delay}</label>
            <Input placeholder={translations.session.delay} type="number" name="extra_time_to_join" value={`${data.extra_time_to_join}`} onChange={(e) => dispatch({ extra_time_to_join: +e.target.value })} />
          </div>
          <div className={cls.switch}>
            <div>
              <label>{translations.session.active}</label>
            </div>
            <Switch name="status" switched={data.status === 'on' ? true : false} setSwitched={(e) => dispatch({ status: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
          <div className={cls.switch}>
            <div>
              <label>{translations.session.dripContent}</label>
            </div>
            <Switch name="check_previous_parts" switched={data.check_previous_parts === 'on' ? true : false} setSwitched={(e) => dispatch({ check_previous_parts: e.target.checked ? OnOffEnum.on : OnOffEnum.off })} dark={true} />
          </div>
        </form>
        <div className={cls.actions}>
          <button onClick={() => setOpen(false)}>{translations.session.cancel}</button>
          <button onClick={saveSession}>{translations.session.save}</button>
        </div>
      </div>
    </Modal>
  )
}

export default SecssonModal;
