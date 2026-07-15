'use client';
import React, { useState } from 'react';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import ContentModal from '../ContentModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Api
import { removeWebinarFromBundle } from '@/api';
//= Types
import type { Dictionary, Locale, BundleEditWebinar, Bundle_Webinars } from '@/types';
//= Styles
import cls from './contentList.module.scss';

type Props = {
  locale: Locale;
  selectable_courses: BundleEditWebinar[];
  bundle_courses: Bundle_Webinars[];
  refetch: () => Promise<void>;
  isLoading: boolean;
  translations: Dictionary['panel']['bundles']['new']['content'];
}

function ContentList({ locale, bundle_courses, selectable_courses, isLoading, translations, refetch }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<BundleEditWebinar>(selectable_courses[0]);
  const [selectedSectionAsWebinar, setSelectedSectionAsWebinar] = useState<Bundle_Webinars>(bundle_courses[0]);


  const viewDetails = (course: Bundle_Webinars) => {
    const selected = selectable_courses.find(cors => cors.id === +course.webinar_id);
    if (selected) {
      setSelectedSection(selected);
      setSelectedSectionAsWebinar(course);
      setOpen(true);
    }
  }

  async function handleRemoveWebinar(id: number) {
    const result = await confirmDialog({
      icon: 'question',
      title: translations.deleteQuestion,
      showCancelButton: true,
      cancelButtonText: translations.cancel,
      confirmButtonText: translations.confirmDelete,
    });

    if (result.isConfirmed) {
      const response = await removeWebinarFromBundle(id);
      if (response) {
        toast.success(translations.deleteSuccess);
        refetch();
      }
    }
  }

  return (
    <div className={cls.contentList}>
      <div className={cls.items}>
        {
          !isLoading && bundle_courses.length ?
            bundle_courses.map((course, i) => (
              <div className={`${cls.item}`} key={i}>
                <h5>{translationsHandler(course.webinar.translations, locale).title}</h5>
                <div className={cls.actions}>
                  {/* <button onClick={() => viewDetails(course)}><Icon icon="basil:edit-solid" /></button> */}
                  <button onClick={() => handleRemoveWebinar(course.id)}><Icon icon="fluent:delete-48-filled" /></button>
                </div>
              </div>
            ))
            :
            <>
              <LoadingSkeleton width='100%' height='65px' rounded />
              <LoadingSkeleton width='100%' height='65px' rounded />
            </>
        }
      </div>
      {
        open &&
        <ContentModal
          locale={locale}
          courses={selectable_courses}
          refetch={refetch}
          course={selectedSection}
          courseAsWebinar={selectedSectionAsWebinar}
          setOpen={setOpen}
          translations={translations}
        />
      }
    </div>
  )
}

export default ContentList;
