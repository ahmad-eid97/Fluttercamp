'use client';
import React from 'react';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Modules
import { ColumnDef } from '@tanstack/react-table';
import { confirmDialog } from '@/lib/confirm';
//= Components
import Table from '@/components/UIs/Table';
import IconOptions from '@/components/UIs/IconOptions';
import QuizzesFilter from '../QuizzesFilter';
import LoadingSkeleton from '@/components/UIs/Skeleton';
import Pagination from '@/components/UIs/Pagination';
//= Utils
import { toastSuccess } from '@/utils/toast';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, ExternalQuiz } from '@/types';
//= Api
import { deleteQuizById } from '@/api';
//= Styles
import cls from './quizzesTable.module.scss';

type Props = {
  translations: Dictionary['panel']['quizzes']['list'];
  locale: Locale;
  isLoading: boolean;
  quizzes: any;
  refetch: () => Promise<void>;
}

function QuizzesTable({ translations, locale, isLoading, quizzes, refetch }: Props) {
  const Columns: ColumnDef<ExternalQuiz>[] = [
    {
      header: translations.table.title,
      accessorKey: 'title',
      cell: ({ row }) => (
        <div className={cls.detailsCell}>
          <p>{translationsHandler(row.original.translations, locale).title}</p>
        </div>
      ),
    },
    {
      header: translations.table.time,
      accessorKey: 'time',
      cell: ({ row }) => (
        <p>
          {row.original.time}
        </p>
      )
    },
    {
      header: translations.table.total,
      accessorKey: 'total_mark',
      cell: ({ row }) => (
        <p>
          {row.original.total_mark}
        </p>
      )
    },
    {
      header: translations.table.passMark,
      accessorKey: 'pass_mark',
      cell: ({ row }) => (
        <p>
          {row.original.pass_mark}
        </p>
      )
    },
    {
      header: translations.table.status,
      accessorKey: 'status',
      cell: ({ row }) => (
        <div className={`${cls.status} ${row.original.status === 'active' ? cls.active : cls.inactive}`}>
          {row.original.status === 'active' ? translations.table.active : null}
          {row.original.status === 'inactive' ? translations.table.inactive : null}
        </div>
      )
    },
    {
      header: translations.table.date,
      accessorKey: 'date_created',
      cell: ({ row }) => (
        <p className={cls.date}>
          {format(new Date(+row.original.created_at * 1000), "dd MMM yyyy", { locale: locale === 'ar' ? ar : enUS })}
        </p>
      )
    },
    {
      header: translations.table.action,
      cell: ({ row }) => (
        <div className={`${cls.actions} ${locale === 'ar' ? cls.ar : ''}`}>
          <IconOptions className={cls.iconOptions} options={[
            {
              label: translations.table.edit,
              action: `/panel/quizzes/${row.original.id}/edit`
            },
            {
              label: translations.table.delete,
              action: () => deleteYourQuiz(row.original.id)
            }
          ]} />
        </div>
      ),
    },
  ]

  async function deleteYourQuiz(quiz_id: number) {
    const result = await confirmDialog({
      icon: 'warning',
      title: translations.table.deleteQuiz,
      text: translations.table.deleteWarning,
      showCancelButton: true,
      cancelButtonText: translations.table.cancel,
      confirmButtonText: translations.table.delete,
    });

    if (result.isConfirmed) {
      const response = await deleteQuizById(quiz_id);
      // @ts-ignore
      if (response?.success) {
        toastSuccess(translations.table.deleted);
        refetch();
      }
    }
  }

  return (
    <div className={cls.quizzesTable}>
      <QuizzesFilter locale={locale} translations={translations} />
      {quizzes?.data.length && !isLoading ?
        <Table
          tabledata={quizzes.data || []}
          columns={Columns}
        />
        :
        isLoading ?
          <>
            <LoadingSkeleton width="100%" height='50px' />
            <LoadingSkeleton width="100%" height='50px' />
            <LoadingSkeleton width="100%" height='50px' />
          </>
          :
          <div className={cls.noData}>
            <p>{translations.table.empty}</p>
          </div>
      }
      {!isLoading ?
        <Pagination
          pagesCount={quizzes?.last_page}
          currentPage={quizzes?.current_page}
          refetch={refetch}
        />
        :
        isLoading &&
        <LoadingSkeleton width="100%" height="65px" rounded />
      }
    </div>
  )
}

export default QuizzesTable;
