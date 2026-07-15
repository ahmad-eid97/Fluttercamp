'use client';
import React, { useState } from 'react';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import RequirementModal from '../RequirementModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { deleteExtraDescriptionById } from '@/api';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, CourseExtraDescription } from '@/types';
//= Styles
import cls from './requirementsList.module.scss';

type Props = {
  locale: Locale;
  requirements: CourseExtraDescription[];
  refetch: () => Promise<void>;
  isLoading: boolean;
  translations: Dictionary['panel']['courses']['new']['faq'];
}

function RequirementsList({ locale, requirements, refetch, isLoading, translations }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<CourseExtraDescription>(requirements[0]);

  const viewDetails = (prerequisite: CourseExtraDescription) => {
    setSelectedSection(prerequisite);
    setOpen(true);
  }

  async function handleDeleteExtraDescription(id: number) {
    const result = await confirmDialog({
      icon: 'question',
      title: translations.materials.deleteQuestion,
      showCancelButton: true,
      cancelButtonText: translations.cancel,
      confirmButtonText: translations.materials.confirmDelete,
    });

    if (result.isConfirmed) {
      const response = await deleteExtraDescriptionById(id);
      if (response) {
        toast.success(translations.materials.deleteSuccess);
        refetch();
      }
    }
  }

  return (
    <div className={cls.requirementsList}>
      <div className={cls.items}>
        {
          !isLoading && requirements.length ?
            requirements.map((requirement, i) => (
              <div className={`${cls.item}`} key={i}>
                <h5>{translationsHandler(requirement.translations, locale).value}</h5>
                <div className={cls.actions}>
                  <button onClick={() => viewDetails(requirement)}><Icon icon="basil:edit-solid" /></button>
                  <button onClick={() => handleDeleteExtraDescription(requirement.id)}><Icon icon="fluent:delete-48-filled" /></button>
                </div>
              </div>
            ))
            :
            <>
              <LoadingSkeleton width='100%' height='60px' rounded />
              <LoadingSkeleton width='100%' height='60px' rounded />
            </>
        }
      </div>
      {
        open &&
        <RequirementModal
          refetch={refetch}
          locale={locale}
          requirement={selectedSection}
          setOpen={setOpen}
          translations={translations}
        />
      }
    </div>
  )
}

export default RequirementsList;
