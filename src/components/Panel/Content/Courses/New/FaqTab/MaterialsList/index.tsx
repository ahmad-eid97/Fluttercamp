'use client';
import React, { useState } from 'react';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import MaterialModal from '../MaterialModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { deleteExtraDescriptionById } from '@/api';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, CourseExtraDescription } from '@/types';
//= Styles
import cls from './materialsList.module.scss';

type Props = {
  locale: Locale;
  materials: CourseExtraDescription[];
  refetch: () => Promise<void>;
  isLoading: boolean;
  translations: Dictionary['panel']['courses']['new']['faq'];
}

function MaterialsList({ locale, materials, isLoading, refetch, translations }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<CourseExtraDescription>(materials[0]);

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
    <div className={cls.materialsList}>
      <div className={cls.items}>
        {
          !isLoading && materials.length ?
            materials.map((material, i) => (
              <div className={`${cls.item}`} key={i}>
                <h5>{translationsHandler(material.translations, locale).value}</h5>
                <div className={cls.actions}>
                  <button onClick={() => viewDetails(material)}><Icon icon="basil:edit-solid" /></button>
                  <button onClick={() => handleDeleteExtraDescription(material.id)}><Icon icon="fluent:delete-48-filled" /></button>
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
        <MaterialModal
          refetch={refetch}
          locale={locale}
          material={selectedSection}
          setOpen={setOpen}
          translations={translations}
        />
      }
    </div>
  )
}

export default MaterialsList;
