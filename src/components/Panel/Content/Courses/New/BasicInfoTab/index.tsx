'use client';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import SelectBox from '@/components/UIs/Select';
import Input from '@/components/UIs/Input';
import FileInput from '@/components/UIs/FileInput';
import TextEditor from '@/components/UIs/TextEditor';
//= Api
import { getDataForEditWebinar, addNewCourse, updateCourseData } from '@/api';
import useRequest from '@/api/useRequest';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './basicInfo.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['new']['basicInformation'];
  courseId?: number;
  isDuplicate?: boolean;
  setLockedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  goToNextStep: () => void;
}

interface Fields {
  type: string;
  title: string;
  seo_description: string;
  thumbnail: string;
  image_cover: string;
  video_demo_source: string;
  video_file: string;
  video_demo: string;
  description: string;
}

function BasicInfoTab({ translations, locale, courseId, isDuplicate, setLockedSteps, goToNextStep }: Props) {
  const router = useRouter();
  const isInEditMode = !isDuplicate && courseId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getDataForEditWebinar(courseId || 0, 1), undefined, {
    disabled: !isInEditMode,
    cache: {
      id: `edit-course-${courseId}-tab-1`
    }
  });

  const [data, dispatch] = useCompoundState<Fields>({
    type: 'webinar',
    title: '',
    seo_description: '',
    thumbnail: '',
    image_cover: '',
    video_demo_source: 'youtube',
    video_file: '',
    video_demo: '',
    description: '',
  });

  useEffect(() => {
    if (editData) {
      const translatedData = editData.webinar.translations;
      dispatch({
        type: editData.webinar.type || 'webinar',
        title: translatedData.length && translatedData[0].title || '',
        seo_description: translatedData.length && translatedData[0].seo_description || '',
        thumbnail: editData.webinar.thumbnail || '',
        image_cover: editData.webinar.image_cover || '',
        video_demo_source: editData.webinar.video_demo_source || '',
        video_file: '',
        video_demo: editData.webinar.video_demo || '',
        description: translatedData.length && translatedData[0].description || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  const courseTypes = [
    {
      label: translations.courseTypes.liveClass,
      value: 'webinar',
    },
    {
      label: translations.courseTypes.videoCourse,
      value: 'course',
    },
    {
      label: translations.courseTypes.textCourse,
      value: 'text_lesson',
    },
  ]

  const videoSources = [
    {
      label: translations.videoSources.upload,
      value: 'upload',
    },
    {
      label: translations.videoSources.youtube,
      value: 'youtube',
    },
    {
      label: translations.videoSources.vimeo,
      value: 'vimeo',
    },
    {
      label: translations.videoSources.externalLink,
      value: 'external-link',
    },
  ]

  function handleFields(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = e.target.getAttribute('name') as keyof Fields;
    const value = e.target.value;

    if (name !== 'video_file' && name !== 'thumbnail' && name !== 'image_cover') dispatch({ [name]: value });
  }

  async function handleFileFields(input: HTMLInputElement, uploadedLink: string) {
    const name = input.getAttribute('name') as keyof Fields;
    const files = input.files;

    if (name === 'video_file' || name === 'thumbnail' || name === 'image_cover') dispatch({ [name]: uploadedLink });
  }

  function handleTextEditor(value: string) {
    dispatch({ description: value });
  }

  async function saveAndNext(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const fullData = {
      ...data,
      rules: true,
      duration: 0,
      category_id: 612,
      locale: "EN"
    }

    if (isInEditMode && courseId) {
      const response = await updateCourseData(courseId, {
        current_step: 1,
        draft: "0",
        get_next: 1,
        get_step: 2,
        ...(data.title ? { title: data.title } : {}),
        ...(data.seo_description ? { seo_description: data.seo_description } : {}),
        ...(data.description ? { description: data.description } : {}),
        ...(data.thumbnail ? { thumbnail: data.thumbnail } : {}),
        ...(data.image_cover ? { image_cover: data.image_cover } : {}),
        ...(data.video_demo_source ? { video_demo_source: data.video_demo_source } : {}),
        ...(data.video_demo ? { video_demo: data.video_demo } : {}),
        ...(data.video_file ? { video_file: data.video_file } : {}),
        locale: "EN",
        type: data.type as ("webinar" | "course" | "text_lesson")
      });

      if (response && response.success) {
        await refetch();
        toast.success(translations.saveSuccess);
        nextOnly();
      }
    } else {
      const response = await addNewCourse(fullData);

      if (response && response.success) {
        toast.success(translations.saveSuccess);
        router.push(`/panel/courses/${response.data?.id}/edit?step=2`);
      }
    }

    button.classList.remove('loading-btn');
  }

  function nextOnly() {
    setLockedSteps(prev => prev.filter(stp => stp !== 1));
    goToNextStep();
  }

  return (
    <div className={cls.wrapper}>
      {
        isInEditMode && isLoading ?
          <p className={cls.loadingData}>
            <Icon icon='eos-icons:loading' />
            {translations.loadingData}
          </p>
          : null
      }
      <div className={cls.basicInfo}>
        <div className={cls.field}>
          <label>{translations.type}</label>
          <SelectBox options={courseTypes} name="type" defaultValue={data.type} onChange={handleFields} noFocus={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.title}</label>
          <Input placeholder={translations.title} name="title" value={data.title} onChange={handleFields} />
        </div>
        <div className={cls.field}>
          <label>{translations.meta}</label>
          <Input placeholder={translations.meta} name="seo_description" value={data.seo_description} onChange={handleFields} />
        </div>
        <div className={cls.field}>
          <FileInput placeholder='360x250px preferred' label={translations.thumbnail} name="thumbnail" value={data.thumbnail} onChange={handleFileFields} />
        </div>
        <div className={cls.field}>
          <FileInput placeholder='1920x530px preferred' label={translations.cover} name="image_cover" value={data.image_cover} onChange={handleFileFields} />
        </div>
        <div className={cls.field}>
          <label>{translations.demoVideoSource}</label>
          <SelectBox options={videoSources} name="video_demo_source" defaultValue={data.video_demo_source} onChange={handleFields} noFocus={true} />
        </div>
        {data.video_demo_source === 'upload' ?
          <div className={cls.field}>
            <FileInput placeholder={translations.uploadFile} label={translations.path} name="video_file" value={data.video_file} onChange={handleFileFields} />
          </div>
          :
          <div className={cls.field}>
            <label>{translations.videoLink}</label>
            <Input placeholder={translations.videoLink} name="video_demo" value={data.video_demo || ''} onChange={handleFields} />
          </div>
        }
        <div className={cls.fullField}>
          <label>{translations.description}</label>
          <TextEditor defaultValue={data.description} onChange={(value) => handleTextEditor(value)} />
        </div>
      </div>
      <div className={cls.actions}>
        {/* {isInEditMode && <button onClick={nextOnly}>{translations.next}</button>} */}
        <button onClick={saveAndNext}>{translations.save}</button>
      </div>
    </div>
  )
}

export default BasicInfoTab;
