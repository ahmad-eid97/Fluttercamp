'use client';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import SelectBox from '@/components/UIs/Select';
import Input from '@/components/UIs/Input';
import TextEditor from '@/components/UIs/TextEditor';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Api
import { getDataForCreateNoticeboard, getDataForEditNoticeboard, createNewNotice, updateNotice } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Locale, Dictionary, DataForEditNoticeboard, CreateNoticeboardPayload } from '@/types';
//= Styles
import cls from './tab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['noticeboard']['new'];
  noticeId?: string;
}

interface Fields {
  title: string;
  type: string;
  webinar_id: string;
  message: string;
}

function AddNewNotice({ locale, translations, noticeId }: Props) {
  const router = useRouter();
  const isInEditMode = noticeId !== undefined;
  const { data, isLoading } = useRequest(isInEditMode ? () => getDataForEditNoticeboard(+noticeId) : getDataForCreateNoticeboard, undefined);
  const [fields, dispatch] = useCompoundState<Fields>({
    title: '',
    type: '',
    webinar_id: '',
    message: '',
  });

  useEffect(() => {
    if (data && isInEditMode) {
      const editData = data as DataForEditNoticeboard;
      dispatch({
        title: editData.noticeboard.title,
        type: editData.noticeboard.webinar_id ? 'course-students' : 'all-students',
        webinar_id: editData.noticeboard.webinar_id || undefined,
        message: editData.noticeboard.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const types = [
    {
      label: translations.allStudents,
      value: 'all-students',
    },
    {
      label: translations.courseStudents,
      value: 'course-students',
    }
  ]

  const handledWebinars = Array.isArray(data?.webinars) ? data.webinars.map(webinar => ({
    label: translationsHandler(webinar.translations, locale).title,
    value: webinar.id.toString()
  })) : [];

  const courses = [{
    label: translations.all,
    value: ''
  }].concat(...handledWebinars)

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const handledData = {
      title: fields.title,
      type: fields.type as CreateNoticeboardPayload['type'],
      message: fields.message,
      ...(fields.webinar_id ? { webinar_id: fields.webinar_id } : {})
    };
    let response;

    if (isInEditMode) {
      response = await updateNotice(+noticeId, handledData);
    } else {
      response = await createNewNotice(handledData);
    }

    if (response) {
      toast.success(translations.saveSuccess);
      router.push('/panel/noticeboard')
    }

    button.classList.remove('loading-btn');
  }

  return (
    <>
      <h3 className={cls.section_title}>{isInEditMode ? <>{translations.editTitle} <b /> <span>{(data as DataForEditNoticeboard)?.noticeboard.title}</span></> : translations.title}</h3>
      {
        isInEditMode && isLoading ?
          <p className={cls.loadingData}>
            <Icon icon='eos-icons:loading' />
            {translations.loadingData}
          </p>
          : null
      }
      <div className={cls.addNewNotice}>
        <form>
          <div className={cls.field}>
            <label>{translations.title}</label>
            <Input placeholder={translations.title} name="title" value={fields.title} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.type}</label>
            <SelectBox options={types} name="type" defaultValue={fields.type} onChange={(e) => dispatch({ type: e.target.value })} />
          </div>
          {
            fields.type === 'course-students' &&
            <div className={cls.field}>
              <label>{translations.course}</label>
              <SelectBox options={courses} name="webinar_id" defaultValue={fields.webinar_id} onChange={(e) => dispatch({ webinar_id: e.target.value })} />
            </div>
          }
          <div className={cls.field}></div>
          <div className={cls.fullField}>
            <label>{translations.message}</label>
            <TextEditor defaultValue={fields.message} onChange={(value) => dispatch({ message: value })} />
          </div>
          <div className={cls.actions}>
            <button onClick={save}>{translations.sendNotice}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddNewNotice;