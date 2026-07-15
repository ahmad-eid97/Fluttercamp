'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import SelectBox from '@/components/UIs/Select';
import Input from '@/components/UIs/Input';
import FileInput from '@/components/UIs/FileInput';
import TextEditor from '@/components/UIs/TextEditor';
//= Api
import { getBundleDataToEdit, createNewBundle, updateBundle } from '@/api';
import useRequest from '@/api/useRequest';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './tab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['bundles']['new']['basicInformation'];
  bundleId?: number;
  setLockedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  goToNextStep: () => void;
}

interface Fields {
  title: string;
  seo_description: string;
  thumbnail: string;
  image_cover: string;
  video_demo_source: string;
  video_file: string;
  video_demo: string;
  description: string;
}

function BasicInfoTab({ locale, translations, bundleId, setLockedSteps, goToNextStep }: Props) {
  const router = useRouter();
  const isInEditMode = bundleId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getBundleDataToEdit(bundleId ? bundleId : 0, 1), undefined, {
    disabled: !isInEditMode,
    cache: {
      id: `edit-bundle-${bundleId}-tab-1`
    }
  });

  const [fields, dispatch] = useCompoundState<Fields>({
    title: '',
    seo_description: '',
    thumbnail: '',
    image_cover: '',
    video_demo_source: 'upload',
    video_file: '',
    video_demo: '',
    description: '',
  });

  useEffect(() => {
    if (editData) {
      dispatch({
        title: translationsHandler(editData.bundle.translations, locale).title || '',
        seo_description: translationsHandler(editData.bundle.translations, locale).seo_description || '',
        video_demo_source: editData.bundle.video_demo_source || 'upload',
        video_demo: editData.bundle.video_demo || '',
        description: translationsHandler(editData.bundle.translations, locale).description || '',
        thumbnail: editData.bundle.thumbnail || '',
        image_cover: editData.bundle.image_cover || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

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
    const value = e.target.value!;

    if (name !== 'video_file' && name !== 'thumbnail' && name !== 'image_cover') dispatch({ [name]: value });
  }

  async function handleFileFields(input: HTMLInputElement, uploadedLink: string) {
    const name = input.getAttribute('name') as keyof Fields;
    if (name === 'video_file' || name === 'thumbnail' || name === 'image_cover') dispatch({ [name]: uploadedLink });
  }

  function handleTextEditor(value: string) {
    dispatch({ description: value });
  }

  async function saveAndNext(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const fullData = {
      ...fields,
      duration: 0,
      category_id: 612,
      get_next: 1,
      locale: "EN"
    }

    if (isInEditMode && bundleId) {
      const response = await updateBundle(bundleId, {
        current_step: "1",
        draft: 0,
        get_next: 1,
        get_step: 2,
        ...(fields.title ? { title: fields.title } : {}),
        ...(fields.seo_description ? { seo_description: fields.seo_description } : {}),
        ...(fields.description ? { description: fields.description } : {}),
        ...(fields.thumbnail ? { thumbnail: fields.thumbnail } : {}),
        ...(fields.image_cover ? { image_cover: fields.image_cover } : {}),
        ...(fields.video_demo_source ? { video_demo_source: fields.video_demo_source } : {}),
        ...(fields.video_demo ? { video_demo: fields.video_demo } : {}),
        ...(fields.video_file ? { video_file: fields.video_file } : {}),
        locale: "EN",
      });

      if (response) {
        await refetch();
        toast.success(translations.saveSuccess);
        nextOnly();
      }
    } else {
      const response = await createNewBundle(fullData);

      if (response) {
        toast.success(translations.saveSuccess);
        router.push(`/panel/bundles/${response.id}/edit?step=2`);
      }
    }

    button.classList.remove('loading-btn');
  }

  function nextOnly() {
    setLockedSteps(prev => prev.filter(stp => stp !== 1));
    goToNextStep();
  }

  return (
    <>
      {
        isInEditMode && isLoading ?
          <p className={cls.loadingData}>
            <Icon icon='eos-icons:loading' />
            {translations.loadingData}
          </p>
          : null
      }
      <div className={cls.basicInfo}>
        <form>
          <div className={cls.field}>
            <label>{translations.title}</label>
            <Input placeholder={translations.title} name="title" value={fields.title} onChange={handleFields} />
          </div>
          <div className={cls.field}>
            <label>{translations.meta}</label>
            <Input placeholder={translations.meta} name="seo_description" value={fields.seo_description} onChange={handleFields} />
          </div>
          <div className={cls.field}>
            <FileInput placeholder='360x250px preferred' label={translations.thumbnail} name="thumbnail" value={fields.thumbnail} onChange={handleFileFields} />
          </div>
          <div className={cls.field}>
            <FileInput placeholder='1920x530px preferred' label={translations.cover} name="image_cover" value={fields.image_cover} onChange={handleFileFields} />
          </div>
          <div className={cls.field}>
            <label>{translations.demoVideoSource}</label>
            <SelectBox options={videoSources} name="video_demo_source" defaultValue={fields.video_demo_source} onChange={handleFields} />
          </div>
          {fields.video_demo_source === 'upload' ?
            <div className={cls.field}>
              <FileInput placeholder={translations.uploadFile} label={translations.path} name="video_file" value={fields.video_file} onChange={handleFileFields} />
            </div>
            :
            <div className={cls.field}>
              <label>{translations.videoLink}</label>
              <Input placeholder={translations.videoLink} name="video_demo" value={fields.video_demo} onChange={handleFields} />
            </div>
          }
          <div className={cls.fullField}>
            <label>{translations.description}</label>
            <TextEditor onChange={handleTextEditor} defaultValue={fields.description} />
          </div>
        </form>
        <div className={cls.actions}>
          {/* {isInEditMode && <button onClick={nextOnly}>{translations.next}</button>} */}
          <button onClick={saveAndNext}>{translations.save}</button>
        </div>
      </div>
    </>
  )
}

export default BasicInfoTab;
