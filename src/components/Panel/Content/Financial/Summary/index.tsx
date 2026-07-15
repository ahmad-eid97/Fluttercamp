'use client';
//= Modules
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import Table from '@/components/UIs/Table';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { getFinancialSummary } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale, FinancialHistory } from '@/types';
//= Styles
import cls from './summary.module.scss';

type Props = {
  translations: Dictionary['panel']['financial']['summary'];
  locale: Locale;
}

function Summary({ translations, locale }: Props) {
  const { data, isLoading } = useRequest(getFinancialSummary);

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const Columns: ColumnDef<FinancialHistory>[] = [
    {
      header: translations.type,
      accessorKey: 'type',
      cell: ({ row }) => (
        <div>
          {row.original.type}
        </div>
      )
    },
    {
      header: translations.description,
      accessorKey: 'description',
      cell: ({ row }) => (
        <div>
          {row.original.description}
        </div>
      )
    },
    {
      header: translations.amount,
      accessorKey: 'amount',
      cell: ({ row }) => (
        <div className={cls.amountCell}>
          {formatter.format(row.original.amount)}
        </div>
      )
    },
    {
      header: translations.date,
      accessorKey: 'created_at',
      cell: ({ row }) => (
        <div className={cls.dateCell}>
          {row.original.created_at ? format(new Date(+row.original.created_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    }
  ]

  return (
    <div className={cls.summary}>
      <h4>{translations.title}</h4>
      <div>
        {/* {data.map(item => (
          <div className={cls.item} key={item.id}>
            <div className={cls.badge}>
              <span><Icon icon="icon-park-outline:sales-report" /></span>
            </div>
            <div className={cls.content}>
              <h3>{item.title}</h3>
              <p>{translations.amount}: ${item.amount}</p>
              <span className={cls.discount}>{translations.discount}: %{item.discount}</span>
              <span className={cls.date}><Icon icon="uiw:date" /> {item.date}</span>
              <button><Icon icon="ph:download-bold" /> {translations.download}</button>
            </div>
            <Icon icon="streamline:bag-dollar" />
          </div>
        ))} */}
        {!isLoading && data?.history?.length ?
          <Table
            tabledata={data?.history || []}
            columns={Columns}
          />
          :
          isLoading ?
            <>
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
            </>
            :
            <div className={cls.emptyData}>
              <p>{translations.empty}</p>
            </div>
        }
      </div>
    </div>
  )
}

export default Summary;
