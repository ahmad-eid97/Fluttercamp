"use client";
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
//= Components
import { Icon } from '@iconify/react';
import Select from '@/components/UIs/Select';
import Input from '@/components/UIs/Input';
import TagsInput from '@/components/UIs/TagsInput';
import DateTimeInput from '@/components/UIs/DateTimeInput';
import Switch from '@/components/UIs/Switch';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Api
import { getDataForEditWebinar, updateCourseData } from '@/api';
import useRequest from '@/api/useRequest';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, UpdateCoursePayload } from '@/types';
//= Styles
import cls from './extraInfoTab.module.scss';

interface Fields {
  capacity: string;
  duration: string;
  forum: boolean
  support: boolean
  certificate: boolean
  downloadable: boolean
  partner_instructor: boolean;
  partners: string[];
  start_date: string;
  tags: string[];
  category: string;
}

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['new']['extraInformation'];
  courseId?: number;
  isDuplicate?: boolean;
  setLockedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

function ExtraInfoTab({ locale, translations, courseId, isDuplicate, setLockedSteps, goToNextStep, goToPrevStep }: Props) {
  const isInEditMode = !isDuplicate && courseId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getDataForEditWebinar(courseId || 0, 2), undefined, {
    disabled: !isInEditMode,
    cache: {
      id: `edit-course-${courseId}-tab-2`
    }
  });

  const [data, dispatch] = useCompoundState<Fields>({
    capacity: '',
    duration: '',
    forum: false,
    support: false,
    certificate: false,
    downloadable: false,
    partner_instructor: false,
    partners: [],
    tags: [],
    start_date: '',
    category: '',
  });

  useEffect(() => {
    if (editData) {
      dispatch({
        capacity: editData.webinar.capacity || '',
        duration: editData.webinar.duration || '',
        forum: editData.webinar.forum === 1 || false,
        support: editData.webinar.support === 1 || false,
        certificate: editData.webinar.certificate === 1 || false,
        downloadable: editData.webinar.downloadable === 1 || false,
        partner_instructor: editData.webinar.partner_instructor === 1 || false,
        start_date: editData.webinar.start_date ? format(new Date(+editData.webinar.start_date * 1000), 'yyyy-MM-dd HH:mm').split(' ').join('T') : '',
        partners: [],
        tags: editData.webinarTags || [],
        category: editData.webinar.category?.id.toString(),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  const allCategories: {
    label: string;
    value: string;
    isHeader: boolean;
  }[] = [];
  editData?.categories.forEach(category => {
    if (category.sub_categories.length) {
      allCategories.push({
        label: translationsHandler(category.translations, locale).title,
        value: category.id.toString(),
        isHeader: true
      });
      category.sub_categories.forEach(subCategory => {
        allCategories.push({
          label: translationsHandler(category.translations, locale).title,
          value: subCategory.id.toString(),
          isHeader: false
        });
      })
    } else {
      allCategories.push({
        label: translationsHandler(category.translations, locale).title,
        value: category.id.toString(),
        isHeader: false
      });
    }
  });

  const categories = editData ? allCategories : [];

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    if (!courseId || !editData) return;

    let firstCat = document.querySelector('#category_select option')!.getAttribute('value');

    const handledData: Partial<UpdateCoursePayload> = {
      ...data,
      duration: +data.duration,
      capacity: +data.capacity,
      forum: data.forum ? 'on' : 'off',
      support: data.support ? 'on' : 'off',
      // partner_instructor: data.partner_instructor ? 'on' : 'off',
      partner_instructor: 'off',
      tags: data.tags.join(),
      partners: [],
      current_step: 2,
      draft: "0",
      get_next: 1,
      get_step: 3,
      category_id: +data.category || (firstCat ? +firstCat : 0),
      ...(editData.webinar.type === 'webinar' ? { start_date: data.start_date.split('T').join(' ') } : {}),
      timezone: "Africa/Cairo"
    }


    const response = await updateCourseData(courseId, handledData);

    if (response && response.success) {
      await refetch();
      toast.success(translations.saveSuccess);
      nextOnly();
    }

    button.classList.remove('loading-btn');
  }

  function nextOnly() {
    setLockedSteps(prev => prev.filter(stp => stp !== 2));
    goToNextStep();
  }

  return (
    <div className={cls.extraInfo}>
      {
        isInEditMode && isLoading ?
          <p className={cls.loadingData}>
            <Icon icon='eos-icons:loading' />
            {translations.loadingData}
          </p>
          : null
      }
      <form>
        <div className={cls.field}>
          <label>{translations.capacity}</label>
          <Input type="number" placeholder={translations.capacity} name="capacity" value={data.capacity} onChange={(e) => dispatch({ capacity: e.target.value })} />
        </div>
        {
          editData && editData.webinar.type === 'webinar' &&
          <div className={cls.field}>
            <DateTimeInput label={translations.start_date} name="start_date" value={data.start_date} onChange={(e) => dispatch({ start_date: e.target.value })} />
          </div>
        }
        <div className={cls.field}>
          <label>{translations.duration} ({translations.minutes})</label>
          <Input type="number" placeholder={translations.duration} icon="mdi:clock-outline" name="duration" value={data.duration} onChange={(e) => dispatch({ duration: e.target.value })} />
        </div>
        {
          editData && editData.webinar.type === 'webinar' &&
          <div className={cls.field} />
        }
        <div className={cls.switch}>
          <div className={cls.content}>
            <label>{translations.courseForum}</label>
            <span>- {translations.forumText}</span>
          </div>
          <Switch name="forum" switched={data.forum} setSwitched={(e) => dispatch({ forum: e.target.checked })} dark={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div className={cls.content}>
            <label>{translations.support}</label>
          </div>
          <Switch name="support" switched={data.support} setSwitched={(e) => dispatch({ support: e.target.checked })} dark={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div className={cls.content}>
            <label>{translations.completionCertificate}</label>
            <span>- {translations.completionCertificateText}</span>
          </div>
          <Switch name="certificate" switched={data.certificate} setSwitched={(e) => dispatch({ certificate: e.target.checked })} dark={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div className={cls.content}>
            <label>{translations.downloadable}</label>
          </div>
          <Switch name="downloadable" switched={data.downloadable} setSwitched={(e) => dispatch({ downloadable: e.target.checked })} dark={true} />
        </div>
        {/* <div className={cls.empty}></div>
        <div className={cls.switch}>
          <div className={cls.content}>
            <label>{translations.partnerInstructor}</label>
          </div>
          <Switch name="partner_instructor" switched={data.partner_instructor} setSwitched={(e) => dispatch({ partner_instructor: e.target.checked })} dark={true} />
        </div> */}
        <div className={cls.empty}></div>
        {
          // data.partner_instructor 
          false &&
          <>
            <div className={cls.field}>
              <label>{translations.selectPartnerInstructor}</label>
              {/* TODO: ADD TAGs Input With Search ability */}
              <TagsInput placeholder={translations.selectPartnerInstructor} name="partners" value={data.partners} onChange={(value) => dispatch({ partners: value })} />
            </div>
            <div className={cls.empty}></div>
          </>
        }
        <div className={cls.field}>
          <label>{translations.tags}</label>
          <TagsInput placeholder={translations.tags} name="tags" value={data.tags} onChange={(value) => dispatch({ tags: value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.category}</label>
          <Select options={categories} defaultValue={data.category} onChange={(e) => dispatch({ category: e.target.value })} />
        </div>
      </form >
      <div className={cls.actions}>
        <button onClick={goToPrevStep}>{translations.previous}</button>
        {/* {isInEditMode && <button onClick={nextOnly}>{translations.next}</button>} */}
        <button onClick={save} disabled={isInEditMode && isLoading}>{translations.save}</button>
      </div>
    </div >
  )
}

export default ExtraInfoTab;
