'use client';
import { useSearchParams } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
//= Modules
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import Table from "@/components/UIs/Table";
import LoadingSkeleton from '@/components/UIs/Skeleton';
import Pagination from '@/components/UIs/Pagination';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Dictionary, Locale, Promotion } from '@/types';
//= Api
import { getMarketingPromotions } from '@/api';
import useRequest from '@/api/useRequest';
//= Styles
import cls from './promotions-table.module.scss';
import { translationsHandler } from '@/utils/translationsHandler';

type Props = {
  translations: Dictionary['panel']['marketing']['promotions'];
  locale: Locale;
}

function PromotionsTable({ translations, locale }: Props) {
  const searchParams = useSearchParams();
  const { data, isLoading, refetch } = useRequest(getMarketingPromotions, generateFilterObject() || {});

  function generateFilterObject() {
    let filter: { [key: string]: string } = {};
    const searchParamsArray = Array.from(searchParams.entries());

    if (!searchParamsArray.length) return false;

    searchParamsArray.forEach(param => {
      if (param[0] === 'instructor_id') return;
      filter[param[0]] = param[1];
    });

    return filter;
  }

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const Columns: ColumnDef<Promotion>[] = [
    {
      header: translations.plan,
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className={cls.user}>
          <img src={getImageUrl(row.original.icon)} alt="user_icon" />
          <p>{translationsHandler(row.original.translations, locale).title}</p>
        </div>
      )
    },
    {
      header: translations.description,
      accessorKey: 'course',
      cell: ({ row }) => (
        <div className={cls.data}>
          {translationsHandler(row.original.translations, locale).description?.length > 25 ? translationsHandler(row.original.translations, locale).description.slice(0, 25) + '...' : translationsHandler(row.original.translations, locale).description}
        </div>
      )
    },
    {
      header: translations.days,
      accessorKey: 'course',
      cell: ({ row }) => (
        <div className={cls.data}>
          {row.original.days}
        </div>
      )
    },
    {
      header: translations.price,
      accessorKey: 'amount',
      cell: ({ row }) => (
        <div className={cls.data}>
          {formatter.format(+row.original.price)}
        </div>
      )
    },
    {
      header: translations.date,
      accessorKey: 'from',
      cell: ({ row }) => (
        <div className={cls.date}>
          {row.original.created_at ? format(new Date(+row.original.created_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    },
  ]

  return (
    <div className={cls.table_container}>
      {!isLoading && data?.promotions?.data.length ?
        <>
          <Table
            tabledata={data?.promotions?.data}
            columns={Columns}
            tableClassName={cls.table}
          />
        </>
        :
        isLoading ?
          <>
            <LoadingSkeleton width='100%' height='50px' rounded />
            <LoadingSkeleton width='100%' height='50px' rounded />
          </>
          :
          <p className={cls.noData}>
            {translations.noData}
          </p>
      }
      {
        !isLoading && data && data?.promotions?.last_page - 1 ?
          <Pagination
            pagesCount={data?.promotions?.last_page - 1}
            currentPage={data?.promotions?.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
    </div>
  )
}

export default PromotionsTable;