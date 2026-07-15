'use client';
//= Modules
import { ColumnDef } from '@tanstack/react-table';
//= Components
import Table from '@/components/UIs/Table';
import IconOptions from '@/components/UIs/IconOptions';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Dictionary, Locale, OfflinePayment } from '@/types';
//= Api
import { getOfflinePayments } from '@/api';
import useRequest from '@/api/useRequest';
//= Styles
import cls from './offlinePayments.module.scss';

type Props = {
  translations: Dictionary['panel']['financial']['account']['offline'];
  locale: Locale;
}

function OfflinePaymentRequests({ translations, locale }: Props) {
  const { data, isLoading } = useRequest(getOfflinePayments);

  const Columns: ColumnDef<OfflinePayment>[] = [
    {
      header: translations.table.bank,
      accessorKey: 'payment',
      cell: ({ row }) => (
        <div>
          {row.original.bank || '-'}
        </div>
      )
    },
    {
      header: translations.table.reference,
      accessorKey: 'reference',
      cell: ({ row }) => (
        <div>
          {row.original.reference_number}
        </div>
      )
    },
    {
      header: translations.table.amount,
      accessorKey: 'amount',
      cell: ({ row }) => (
        <div className={cls.dateCell}>
          {row.original.amount}
        </div>
      )
    },
    {
      header: translations.table.attachment,
      accessorKey: 'attachment',
      cell: ({ row }) => (
        <div className={cls.dateCell}>
          {row.original.attachment || '-'}
        </div>
      )
    },
    {
      header: translations.table.status,
      accessorKey: 'status',
      cell: ({ row }) => (
        <div className={cls.dateCell}>
          {row.original.status}
        </div>
      )
    },
  ]

  return (
    <div className={cls.offlinePayments}>
      {!isLoading && data?.length ?
        <Table
          tabledata={data}
          columns={Columns}
        />
        :
        isLoading ?
          <>
            <LoadingSkeleton width="100%" height="50px" />
            <LoadingSkeleton width="100%" height="50px" />
            <LoadingSkeleton width="100%" height="50px" />
          </>
          :
          <div className={cls.noData}>
            <p>{translations.table.empty}</p>
          </div>
      }
    </div>
  )
}

export default OfflinePaymentRequests;