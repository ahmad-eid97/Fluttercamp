'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Api
import { deleteArticle } from '@/api';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Components
import Table from "@/components/UIs/Table";
import IconOptions from '@/components/UIs/IconOptions';
import LoadingSkeleton from '@/components/UIs/Skeleton';
import Pagination from '@/components/UIs/Pagination';
//= Types
import type { ArticlesWithMeta, Dictionary, Locale } from '@/types';
//= Styles
import cls from './table.module.scss';

type Props = {
  translations: Dictionary['panel']['articles']['table'];
  locale: Locale;
  isLoading: boolean;
  data: ArticlesWithMeta | undefined;
  refetch: () => Promise<void>;
}

function ArticlesTable({ translations, locale, isLoading, data, refetch }: Props) {
  const Columns: ColumnDef<ArticlesWithMeta['data'][0]>[] = [
    {
      header: translations.title,
      accessorKey: 'title',
      cell: ({ row }) => (
        <p className={cls.title}>{translationsHandler(row.original.translations, locale).title}</p>
      ),
    },
    {
      header: translations.comments,
      accessorKey: 'comments_count',
      cell: ({ row }) => (
        <p className={cls.title}>{row.original.comments_count}</p>
      )
    },
    {
      header: translations.views,
      accessorKey: 'visit_count',
      cell: ({ row }) => (
        <p className={cls.title}>{row.original.visit_count}</p>
      )
    },
    {
      header: translations.status,
      accessorKey: 'status',
      cell: ({ row }) => (
        <div className={`${cls.status} ${row.original.status.toLowerCase() === 'publish' ? cls.open : cls.closed}`}>
          {row.original.status.toLowerCase() === 'publish' ? translations.published : translations.pending}
        </div>
      )
    },
    {
      header: translations.date,
      accessorKey: 'created_at',
      cell: ({ row }) => (
        <div className={cls.date}>
          {row.original.created_at ? format(new Date(+row.original.created_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    },
    {
      header: translations.action,
      cell: ({ row }) => (
        <div className={`${cls.actions} ${locale === 'ar' ? cls.ar : ''}`}>
          <IconOptions className={cls.iconOptions} options={[
            {
              label: translations.edit,
              action: `/panel/articles/${row.original.id}/edit`
            },
            {
              label: translations.delete,
              action: async () => {
                const result = await confirmDialog({
                  icon: 'question',
                  title: translations.deleteQuestion,
                  showCancelButton: true,
                  cancelButtonText: translations.cancel,
                  confirmButtonText: translations.confirm,
                });

                if (result.isConfirmed) {
                  const response = await deleteArticle(row.original.id);
                  if (response) {
                    refetch();
                    toast.success(translations.deleteSuccess);
                  }
                }
              }
            }
          ]} />
        </div>
      ),
    },
  ]

  return (
    <div className={cls.table_container}>
      {
        !isLoading && data?.data?.length ?
          <Table
            tabledata={data?.data}
            columns={Columns}
          />
          :
          !isLoading ?
            <p className={cls.noData}>
              {translations.noData}
            </p>
            :
            <>
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
            </>
      }
      {
        !isLoading && data && data?.last_page - 1 ?
          <Pagination
            pagesCount={data.last_page - 1}
            currentPage={data.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
    </div>
  )
}

export default ArticlesTable;