'use client';
import { useSearchParams } from 'next/navigation';
//= Modules
import { enUS, ar } from 'date-fns/locale';
import { ColumnDef } from '@tanstack/react-table';
//= Components
import Table from "@/components/UIs/Table";
import IconOptions from '@/components/UIs/IconOptions';
import { format } from 'date-fns';
import LoadingSkeleton from '@/components/UIs/Skeleton';
import { confirmDialog } from '@/lib/confirm';
import Pagination from '@/components/UIs/Pagination';
//= Utils
import { toastSuccess } from '@/utils/toast';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, DiscountOffer } from '@/types';
//= Api
import { getDiscountsList, disableDiscount } from '@/api';
import useRequest from '@/api/useRequest';
//= Styles
import cls from './discounts-table.module.scss';

type Props = {
  translations: Dictionary['panel']['marketing']['discounts'];
  locale: Locale;
}

function DiscountsTable({ translations, locale }: Props) {
  const searchParams = useSearchParams();
  const { data, isLoading, refetch } = useRequest(getDiscountsList, generateFilterObject() || {});

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

  const Columns: ColumnDef<DiscountOffer>[] = [
    {
      header: translations.name,
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className={cls.title}>
          {row.original.name}
        </div>
      )
    },
    {
      header: translations.course,
      accessorKey: 'webinar',
      cell: ({ row }) => (
        <div className={cls.data}>
          {translationsHandler(row.original.webinar.translations, locale).title.length > 30 ? translationsHandler(row.original.webinar.translations, locale).title.slice(0, 30) + '...' : translationsHandler(row.original.webinar.translations, locale).title}
        </div>
      )
    },
    {
      header: translations.amount,
      accessorKey: 'amount',
      cell: ({ row }) => (
        <div className={cls.data}>
          {row.original.percent}
        </div>
      )
    },
    {
      header: translations.status,
      accessorKey: 'status',
      cell: ({ row }) => (
        <div className={`${cls.status} ${row.original.status.toLowerCase() === 'active' ? cls.open : cls.closed}`}>
          {row.original.status.toLowerCase() === 'active' ? translations.active : translations.disabled}
        </div>
      )
    },
    {
      header: translations.from,
      accessorKey: 'from',
      cell: ({ row }) => (
        <div className={cls.date}>
          {row.original.from_date ? format(new Date(+row.original.from_date * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    },
    {
      header: translations.to,
      accessorKey: 'to',
      cell: ({ row }) => (
        <div className={cls.date}>
          {row.original.to_date ? format(new Date(+row.original.to_date * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    },
    {
      header: translations.action,
      cell: ({ row }) => (
        <div className={`${cls.actions} ${locale === 'ar' ? cls.ar : ''}`}>
          <IconOptions className={cls.iconOptions} options={[
            {
              label: translations.disable,
              action: () => disableOffer(row.original.id)
            }
          ]} />
        </div>
      ),
    },
  ]

  async function disableOffer(offerId: number) {
    const result = await confirmDialog({
      icon: 'warning',
      title: translations.disableWarning,
      showCancelButton: true,
      cancelButtonText: translations.cancel,
      confirmButtonText: translations.disable,
    });

    if (result.isConfirmed) {
      const response = await disableDiscount(offerId)

      if (response?.success) {
        toastSuccess(translations.offerDisabled);
        refetch();
      }
    }
  }

  return (
    <div className={cls.table_container}>
      {!isLoading && data?.specialOffers?.data?.length ?
        <>
          <Table
            tabledata={data?.specialOffers?.data}
            columns={Columns}
            tableClassName={cls.table}
            paginationClassName={cls.pagination}
            paginationActiveClassName={cls.active}
          />
        </>
        :
        isLoading ?
          <>
            <LoadingSkeleton width='100%' height="50px" rounded />
            <LoadingSkeleton width='100%' height="50px" rounded />
            <LoadingSkeleton width='100%' height="50px" rounded />
          </>
          :
          <p className={cls.noData}>
            {translations.noData}
          </p>
      }
      {
        !isLoading && data && data?.specialOffers?.last_page - 1 ?
          <Pagination
            pagesCount={data?.specialOffers?.last_page - 1}
            currentPage={data?.specialOffers?.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
    </div>
  )
}

export default DiscountsTable;