'use client';
//= Components
import { Icon } from '@iconify/react';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { getPanelBundleById } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './sectionTitle.module.scss';

type Props = {
  translations: Dictionary['panel']['bundles']['courses'];
  bundleId: number;
}

function SectionTitle({ translations, bundleId }: Props) {
  const { data } = useRequest(() => getPanelBundleById(bundleId));

  return (
    <div className={cls.sectionTitle}>
      <h4 className={cls.sectionTitle}>{translations.title} <b /> {data ? data.title : ''}</h4>
    </div>
  )
}

export default SectionTitle;