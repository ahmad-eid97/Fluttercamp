'use client';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
//= Components
import SelectBox from '@/components/UIs/Select';
import Input from '@/components/UIs/Input';
import TextEditor from '@/components/UIs/TextEditor';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Api
import { getDataForCreateCourseNoticeboard, getDataForEditCourseNoticeboard, createNewCourseNotice, updateCourseNotice } from '@/api';
import useRequest from '@/api/useRequest';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Locale, Dictionary, DataForEditNoticeboard, CreateCourseNoticeboardPayload } from '@/types';
//= Styles
import cls from './tab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['noticeboard']['newCourseNotice'];
  noticeId?: string;
}

interface Fields {
  title: string;
  webinar_id: string;
  color: string;
  message: string;
}

function AddNewNotice({ locale, translations, noticeId }: Props) {
  const router = useRouter();
  const isInEditMode = noticeId !== undefined;
  const { data, isLoading } = useRequest(isInEditMode ? () => getDataForEditCourseNoticeboard(+noticeId) : getDataForCreateCourseNoticeboard, undefined);

  const [fields, dispatch] = useCompoundState<Fields>({
    title: '',
    webinar_id: '',
    color: '',
    message: '',
  });

  useEffect(() => {
    if (data && isInEditMode) {
      const editData = data as DataForEditNoticeboard;
      dispatch({
        title: editData.noticeboard.title,
        webinar_id: editData.noticeboard.webinar_id?.toString() || '',
        color: editData.noticeboard.color || '',
        message: editData.noticeboard.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const colors = [
    {
      label: translations.yellow,
      value: 'warning',
    },
    {
      label: translations.red,
      value: 'danger',
    },
    {
      label: translations.blue,
      value: 'info',
    },
    {
      label: translations.green,
      value: 'success',
    },
    {
      label: translations.grey,
      value: 'neutral',
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
      webinar_id: fields.webinar_id,
      color: fields.color as CreateCourseNoticeboardPayload['color'],
      message: fields.message,
    };
    let response;

    if (isInEditMode) {
      response = await updateCourseNotice(+noticeId, handledData);
    } else {
      response = await createNewCourseNotice(handledData);
    }

    if (response) {
      toast.success(translations.saveSuccess);
      router.push('/panel/noticeboard/course-noticeboard')
    }

    button.classList.remove('loading-btn');
  }

  return (
    <>
      <h3 className={cls.section_title}>{isInEditMode ? <>{translations.editTitle} <b /> <span>{(data as DataForEditNoticeboard)?.noticeboard.title}</span></> : translations.title}</h3>
      <div className={cls.addNewNotice}>
        <form>
          <div className={cls.field}>
            <label>{translations.title}</label>
            <Input placeholder={translations.title} name="title" value={fields.title} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.course}</label>
            <SelectBox options={courses} name="course" defaultValue={fields.webinar_id} onChange={(e) => dispatch({ webinar_id: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.color}</label>
            <SelectBox options={colors} name="color" defaultValue={fields.color} onChange={(e) => dispatch({ color: e.target.value })} />
          </div>
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