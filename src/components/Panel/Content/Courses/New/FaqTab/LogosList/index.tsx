'use client';
import React, { useState } from 'react';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import LogoModal from '../LogoModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { deleteExtraDescriptionById } from '@/api';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, CourseExtraDescription } from '@/types';
//= Styles
import cls from './logosList.module.scss';

type Props = {
  locale: Locale;
  logos: CourseExtraDescription[];
  refetch: () => Promise<void>;
  isLoading: boolean;
  translations: Dictionary['panel']['courses']['new']['faq'];
}

function LogosList({ locale, logos, refetch, isLoading, translations }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<CourseExtraDescription>(logos[0]);

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
    <div className={cls.logosList}>
      <div className={cls.items}>
        {
          !isLoading && logos.length ?
            logos.map((logo, i) => (
              <div className={`${cls.item}`} key={i}>
                <img src={getImageUrl(translationsHandler(logo.translations, locale).value || '' || '')} alt="logo image" />
                <div className={cls.actions}>
                  <button onClick={() => viewDetails(logo)}><Icon icon="basil:edit-solid" /></button>
                  <button onClick={() => handleDeleteExtraDescription(logo.id)}><Icon icon="fluent:delete-48-filled" /></button>
                </div>
              </div>
            ))
            :
            <>
              <LoadingSkeleton width='100%' height='80px' rounded />
              <LoadingSkeleton width='100%' height='80px' rounded />
            </>
        }
      </div>
      {
        open &&
        <LogoModal
          refetch={refetch}
          locale={locale}
          logo={selectedSection}
          setOpen={setOpen}
          translations={translations}
        />
      }
    </div>
  )
}

export default LogosList;
