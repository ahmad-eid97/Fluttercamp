'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import IconOptions from '@/components/UIs/IconOptions';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Api
import { deleteBundle, exportBundleStudents } from '@/api';
//= Types
import type { Dictionary, Locale, PanelBundle } from '@/types';
//= Styles
import cls from './bundles-list.module.scss';

type Props = {
  translations: Dictionary['panel']['bundles']['list'];
  locale: Locale;
  bundle: PanelBundle;
  refetchBundles: () => Promise<void>;
}

function Bundle({ translations, locale, bundle, refetchBundles }: Props) {
  const router = useRouter();

  const options = [
    {
      label: translations.options.editBundle,
      action: `/panel/bundles/${bundle.id}/edit`
    },
    {
      label: translations.options.bundleCourses,
      action: `/panel/bundles/${bundle.id}/courses`
    },
    {
      label: translations.options.exportStudents,
      action: async () => {
        const response = await exportBundleStudents(bundle.id);
        if (!response) toast.error(translations.options.modal.noStudentsInBundle);
      }
    },
    {
      label: translations.options.delete,
      action: async () => {
        const result = await confirmDialog({
          icon: 'question',
          title: translations.options.modal.question,
          showCancelButton: true,
          cancelButtonText: translations.options.modal.cancel,
          confirmButtonText: translations.options.modal.confirm,
        });

        if (result.isConfirmed) {
          const response = await deleteBundle(bundle.id);
          if (response?.success) {
            refetchBundles();
            toast.success(translations.options.modal.success);
          }
        }
      }
    },
  ]

  return (
    <div className={`${cls.bundle} ${locale === 'ar' ? cls.ar : ''}`}>
      <IconOptions options={options} className={cls.iconOptions} rtl={locale === 'ar'} />
      <div className={cls.image}>
        <img src={getImageUrl(bundle.image || '') || bundle.image_cover} alt="bundle image" />
      </div>
      <div className={cls.info}>
        <h3><Link href={`/bundles/${bundle.id}`}>{bundle.title}</Link></h3>
        <p className={cls.price}>{bundle.price && +bundle.price > 0 ? '$' + bundle.price : translations.free}</p>
        <div className={cls.metadata}>
          <div className={cls.item}>
            <p><Icon icon='ph:hash-fill' /> {translations.id}</p>
            <span>{bundle.id}</span>
          </div>
          <div className={cls.item}>
            <p><Icon icon='material-symbols:category' /> {translations.category}</p>
            <span>{bundle.category || '-'}</span>
          </div>
          <div className={cls.item}>
            <p><Icon icon='icon-park-solid:time' /> {translations.duration}</p>
            <span>{bundle.duration} {translations.hour}</span>
          </div>
          <div className={cls.item}>
            <p><Icon icon='ph:video-fill' /> {translations.courses}</p>
            <span>{bundle.webinar_count}</span>
          </div>
          <div className={cls.item}>
            <p><Icon icon='mdi:printer-point-of-sale-cog' /> {translations.sales}</p>
            <span>{bundle.sales_count}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bundle;