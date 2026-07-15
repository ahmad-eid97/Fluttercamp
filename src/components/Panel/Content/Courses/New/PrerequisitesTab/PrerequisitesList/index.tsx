'use client';
import React, { useState } from 'react';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import PrerequisitesModal from '../PrerequisitesModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { deletePrerequisiteById } from '@/api';
//= Types
import type { Dictionary, Locale, CoursePrerequisite } from '@/types';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Styles
import cls from './prerequisitesList.module.scss';

type Props = {
  locale: Locale;
  prerequisites: CoursePrerequisite[];
  refetch: () => Promise<void>;
  isLoading: boolean;
  webinar_id: number;
  translations: Dictionary['panel']['courses']['new']['prerequisites'];
}

function PrerequisitesList({ locale, prerequisites, refetch, webinar_id, isLoading, translations }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<CoursePrerequisite>(prerequisites[0]);

  const viewDetails = (prerequisite: CoursePrerequisite) => {
    setSelectedSection(prerequisite);
    setOpen(true);
  }

  async function handleDeletePrerequisite(id: number) {
    const result = await confirmDialog({
      icon: 'question',
      title: translations.deleteQuestion,
      showCancelButton: true,
      cancelButtonText: translations.cancel,
      confirmButtonText: translations.confirmDelete,
    });

    if (result.isConfirmed) {
      const response = await deletePrerequisiteById(id);
      if (response) {
        toast.success(translations.deleteSuccess);
        refetch();
      }
    }
  }

  return (
    <div className={cls.prerequisitesList}>
      <div className={cls.items}>
        {
          !isLoading && prerequisites.length ?
            prerequisites.map((prerequisite, i) => (
              <div className={`${cls.item}`} key={i}>
                <h5>{translationsHandler(prerequisite.prerequisite_webinar.translations, locale).title}</h5>
                <div className={cls.actions}>
                  <button onClick={() => viewDetails(prerequisite)}><Icon icon="basil:edit-solid" /></button>
                  <button onClick={() => handleDeletePrerequisite(prerequisite.id)}><Icon icon="fluent:delete-48-filled" /></button>
                </div>
              </div>
            ))
            :
            <>
              <div className={cls.item}><LoadingSkeleton width='100%' height='60px' rounded /></div>
              <div className={cls.item}><LoadingSkeleton width='100%' height='60px' rounded /></div>
              <div className={cls.item}><LoadingSkeleton width='100%' height='60px' rounded /></div>
            </>
        }
      </div>
      {
        open &&
        <PrerequisitesModal
          webinar_id={webinar_id}
          locale={locale}
          prerequisite={selectedSection}
          setOpen={setOpen}
          refetch={refetch}
          translations={translations}
        />
      }
    </div>
  )
}

export default PrerequisitesList;
