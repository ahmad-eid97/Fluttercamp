'use client';
import { ColumnDef } from '@tanstack/react-table';
//= Modules
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import AssignmentsFilter from './Filter';
import Table from "@/components/UIs/Table";
import IconOptions from '@/components/UIs/IconOptions';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import type { Dictionary, Locale, GetAssignmentStudentsResponse } from '@/types';
//= Styles
import cls from './assignments-table.module.scss';

type Props = {
  translations: Dictionary['panel']['assignments']['list'];
  locale: Locale;
  isLoading: boolean;
  data: GetAssignmentStudentsResponse[];
}

function AssignmentsTable({ translations, locale, isLoading, data }: Props) {
  const Columns: ColumnDef<GetAssignmentStudentsResponse>[] = [
    {
      header: translations.student,
      accessorKey: 'student',
      cell: ({ row }) => (
        <div className={cls.user}>
          <img src={row.original.student.avatar} alt="user_image" />
          <div className={cls.content}>
            <span>{row.original.student.full_name}</span>
            <span className={cls.email}>{row.original.student.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: translations.purchaseDate,
      accessorKey: 'purchase_date',
      cell: ({ row }) => (
        <p>{row.original.purchase_date ? format(new Date(+row.original.purchase_date * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}</p>
      )
    },
    {
      header: translations.firstSubmission,
      accessorKey: 'first_submission',
      cell: ({ row }) => (
        <p>{row.original.first_submission ? format(new Date(+row.original.first_submission * 1000).getTime(), 'dd MMM yyyy | hh:mm a', { locale: locale === 'ar' ? ar : enUS }) : '-'}</p>
      )
    },
    {
      header: translations.lastSubmission,
      accessorKey: 'last_submission',
      cell: ({ row }) => (
        <p>{row.original.last_submission ? format(new Date(+row.original.last_submission * 1000).getTime(), 'dd MMM yyyy | hh:mm a', { locale: locale === 'ar' ? ar : enUS }) : '-'}</p>
      )
    },
    {
      header: translations.attempts,
      accessorKey: 'attempts',
      cell: ({ row }) => (
        <p>{row.original.attempts}</p>
      )
    },
    {
      header: translations.grade,
      accessorKey: 'grade',
      cell: ({ row }) => (
        <p>{row.original.grade || '-'}</p>
      )
    },
    {
      header: translations.status,
      accessorKey: 'user_status',
      cell: ({ row }) => (
        <div className={`${cls.status} ${row.original.user_status.toLowerCase() === 'active' ? cls.active : cls.pending}`}>
          {row.original.user_status.toLowerCase() === 'active' ? translations.active : translations.pending}
        </div>
      )
    },
    {
      header: translations.action,
      cell: ({ row }) => (
        <div className={`${cls.actions} ${locale === 'ar' ? cls.ar : ''}`}>
          <IconOptions className={cls.iconOptions} options={[
            {
              label: translations.view,
              action: `/panel/assignments/${row.original.id}/students/${row.original.student.id}`
            }
          ]} />
        </div>
      ),
    },
  ]

  return (
    <div className={cls.container}>
      <AssignmentsFilter
        translations={translations}
        locale={locale}
      />
      {!isLoading && data && data.length ?
        <Table
          tabledata={data}
          columns={Columns}
          tableClassName={cls.table}
        />
        :
        isLoading ?
          <>
            <LoadingSkeleton width="100%" height="50px" rounded />
            <LoadingSkeleton width="100%" height="50px" rounded />
            <LoadingSkeleton width="100%" height="50px" rounded />
          </>
          :
          <p className={cls.noData}>
            {translations.noAssignments}
          </p>
      }
    </div>
  )
}

export default AssignmentsTable;