'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
//= Components
import Bundle from './Bundle';
import Pagination from '@/components/UIs/Pagination';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { getMyBundles } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './bundles-list.module.scss';

type Props = {
  translations: Dictionary['panel']['bundles']['list'];
  locale: Locale;
}

function BundlesList({ translations, locale }: Props) {
  const searchParams = useSearchParams();
  const currentPageInUrl = searchParams.get('page');
  const { data, isLoading, refetch } = useRequest(getMyBundles, { page: currentPageInUrl ? +currentPageInUrl : 1 });

  return (
    <div className={`${cls.list}`}>
      {
        !isLoading && data && data.bundles.data.length ?
          data.bundles.data.map((bundle, i) => (
            <Bundle translations={translations} locale={locale} bundle={bundle} refetchBundles={refetch} key={i} />
          ))
          :
          isLoading ?
            <LoadingSkeleton width="100%" height="180px" rounded />
            :
            <p className={cls.noData}>
              {translations.noBundles}
            </p>
      }
      {
        !isLoading && data && data.bundles.data.length && data.bundles.meta.last_page - 1 ?
          <Pagination
            pagesCount={data.bundles.meta.last_page - 1}
            currentPage={data.bundles.meta.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
    </div>
  )
}

export default BundlesList;