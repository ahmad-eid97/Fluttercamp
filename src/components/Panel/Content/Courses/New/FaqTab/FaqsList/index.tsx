'use client';
import React, { useState } from 'react';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import FaqModal from '../FaqModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { deleteFaqById } from '@/api';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, CourseFAQ } from '@/types';
//= Styles
import cls from './faqsList.module.scss';

type Props = {
  locale: Locale;
  faqs: CourseFAQ[];
  isLoading: boolean;
  refetch: () => Promise<void>;
  translations: Dictionary['panel']['courses']['new']['faq'];
}

function FaqsList({ locale, refetch, isLoading, faqs, translations }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<CourseFAQ>(faqs[0]);

  const viewDetails = (prerequisite: CourseFAQ) => {
    setSelectedSection(prerequisite);
    setOpen(true);
  }

  async function handleDeleteFaq(id: number) {
    const result = await confirmDialog({
      icon: 'question',
      title: translations.faqs.deleteQuestion,
      showCancelButton: true,
      cancelButtonText: translations.cancel,
      confirmButtonText: translations.faqs.confirmDelete,
    });

    if (result.isConfirmed) {
      const response = await deleteFaqById(id);
      if (response) {
        toast.success(translations.faqs.deleteSuccess);
        refetch();
      }
    }
  }

  return (
    <div className={cls.faqsList}>
      <div className={cls.items}>
        {
          !isLoading && faqs.length ?
            faqs.map((faq, i) => (
              <div className={`${cls.item}`} key={i}>
                <h5>{translationsHandler(faq.translations, locale).title}</h5>
                <div className={cls.actions}>
                  <button onClick={() => viewDetails(faq)}><Icon icon="basil:edit-solid" /></button>
                  <button onClick={() => handleDeleteFaq(faq.id)}><Icon icon="fluent:delete-48-filled" /></button>
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
        <FaqModal
          refetch={refetch}
          locale={locale}
          faq={selectedSection}
          setOpen={setOpen}
          translations={translations}
        />
      }
    </div>
  )
}

export default FaqsList;
