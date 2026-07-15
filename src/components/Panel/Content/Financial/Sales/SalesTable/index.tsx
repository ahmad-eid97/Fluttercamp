'use client';
import React from 'react';
//= Modules
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import Table from '@/components/UIs/Table';
import SalesFilter from '../SalesFilter';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Dictionary, Locale, FinancialSale } from '@/types';
//= Styles
import cls from './salesTable.module.scss';
import LoadingSkeleton from '@/components/UIs/Skeleton';

type Props = {
  translations: Dictionary['panel']['financial']['sales'];
  locale: Locale;
  isLoading: boolean;
  tableData: FinancialSale[];
}

function SalesTable({ translations, locale, isLoading, tableData }: Props) {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const Columns: ColumnDef<FinancialSale>[] = [
    {
      header: translations.table.student,
      accessorKey: 'full_name',
      cell: ({ row }) => (
        <div className={cls.studentCell}>
          <img src={getImageUrl(row.original.buyer.avatar || '')} alt="student_image" />
          <div>
            <p>{row.original.buyer.full_name}</p>
          </div>
        </div>
      ),
    },
    {
      header: translations.table.price,
      accessorKey: 'amount',
      cell: ({ row }) => (
        <div>
          {formatter.format(+row.original.amount)}
        </div>
      )
    },
    {
      header: translations.table.discount,
      accessorKey: 'discount',
      cell: ({ row }) => (
        <div>
          {row.original.discount || '-'}
        </div>
      )
    },
    {
      header: translations.table.totalAmount,
      accessorKey: 'total_amount',
      cell: ({ row }) => (
        <div>
          {formatter.format(+row.original.total_amount)}
        </div>
      )
    },
    {
      header: translations.table.income,
      accessorKey: 'income',
      cell: ({ row }) => (
        <div>
          {formatter.format(row.original.income)}
        </div>
      )
    },
    {
      header: translations.table.type,
      accessorKey: 'type',
      cell: ({ row }) => (
        <div className={cls.typeCell}>
          {row.original.type === 'meeting' ? translations.table.meeting : translations.table.webinar}
        </div>
      )
    },
    {
      header: translations.table.date,
      accessorKey: 'created_at',
      cell: ({ row }) => (
        <div className={cls.dateCell}>
          {row.original.created_at ? format(new Date(+row.original.created_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    }
  ]

  return (
    <div className={cls.salesTable}>
      <SalesFilter locale={locale} translations={translations} />
      {!isLoading && tableData.length ?
        <Table
          tabledata={tableData}
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
          <div className={cls.noData}>
            <p>{translations.table.empty}</p>
          </div>
      }
    </div>
  )
}

export default SalesTable;
