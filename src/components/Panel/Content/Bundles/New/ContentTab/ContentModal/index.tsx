'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
//= Components
import Modal from '@/components/UIs/Modal';
import Select from '@/components/UIs/Select';
//= Api
import { updateWebinarInBundle } from '@/api';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, BundleEditWebinar, Bundle_Webinars } from '@/types';
//= Styles
import cls from './contentModal.module.scss';

type Props = {
  locale: Locale;
  course: BundleEditWebinar;
  courseAsWebinar: Bundle_Webinars;
  courses: BundleEditWebinar[];
  setOpen: (open: boolean) => void;
  refetch: () => Promise<void>;
  translations: Dictionary['panel']['bundles']['new']['content'];
}

function CourseModal({ locale, course, courseAsWebinar, courses, refetch, setOpen, translations }: Props) {
  const params = useParams<Record<string, string>>();
  const [data, dispatch] = useCompoundState({
    selectedCourseId: course.id,
  });

  const coursesOptions = courses.map(crs => ({
    label: translationsHandler(crs.translations, locale).title,
    value: crs.id.toString(),
  }))

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const handledData = {
      bundle_id: +params.id,
      webinar_id: data.selectedCourseId
    }

    const response = await updateWebinarInBundle(courseAsWebinar.id, handledData);

    // @ts-ignore
    if (response && response.code === 200) {
      toast.success(translations.updateSuccess);
      refetch();
      setOpen(false);
    }

    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.contentModal}>
        <div><h3>{translations.addNewCourse}</h3></div>
        <form>
          <div className={cls.field}>
            <label>{translations.selectCourse}</label>
            <Select
              options={coursesOptions}
              defaultValue={data.selectedCourseId.toString()}
              onChange={(option) => dispatch({ selectedCourseId: +option.target.value })}
            />
          </div>
          <div className={cls.empty}></div>
        </form>
        <div className={cls.actions}>
          <button onClick={() => setOpen(false)}>{translations.cancel}</button>
          <button onClick={save}>{translations.save}</button>
        </div>
      </div>
    </Modal>
  )
}

export default CourseModal;
