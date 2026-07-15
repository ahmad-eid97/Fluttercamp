'use client';
import { ColumnDef } from '@tanstack/react-table';
//= Components
import AssignmentsFilter from './Filter';
import Table from "@/components/UIs/Table";
import IconOptions from '@/components/UIs/IconOptions';
//= Types
import type { Dictionary, Locale, Assignment } from '@/types';
//= Styles
import cls from './assignments-table.module.scss';
import LoadingSkeleton from '@/components/UIs/Skeleton';

type Props = {
  translations: Dictionary['panel']['assignments']['list'];
  locale: Locale;
  isLoading: boolean;
  data: Assignment[];
}

function AssignmentsTable({ translations, locale, isLoading, data }: Props) {
  const Columns: ColumnDef<Assignment>[] = [
    {
      header: `${translations.title}/${translations.course}`,
      accessorKey: 'title',
      cell: ({ row }) => (
        <div className={cls.titleCourse}>
          <span>{row.original.title}</span>
          <span>{row.original.description}</span>
        </div>
      ),
    },
    {
      header: translations.minGrade,
      accessorKey: 'min_grade',
      cell: ({ row }) => (
        <p>{row.original.min_grade}</p>
      )
    },
    {
      header: translations.average,
      accessorKey: 'avg_grade',
      cell: ({ row }) => (
        <p>{row.original.avg_grade}</p>
      )
    },
    {
      header: translations.submissions,
      accessorKey: 'submissions_count',
      cell: ({ row }) => (
        <p>{row.original.submissions_count}</p>
      )
    },
    {
      header: translations.pending,
      accessorKey: 'pending_count',
      cell: ({ row }) => (
        <p>{row.original.pending_count}</p>
      )
    },
    {
      header: translations.passed,
      accessorKey: 'passed_count',
      cell: ({ row }) => (
        <p>{row.original.passed_count}</p>
      )
    },
    {
      header: translations.failed,
      accessorKey: 'failed_count',
      cell: ({ row }) => (
        <p>{row.original.failed_count}</p>
      )
    },
    {
      header: translations.status,
      accessorKey: 'status',
      cell: ({ row }) => (
        <div className={`${cls.status} ${row.original.status.toLowerCase() === 'active' ? cls.active : cls.idle}`}>
          {row.original.status.toLowerCase() === 'active' ? translations.active : translations.idle}
        </div>
      )
    },
    {
      header: translations.action,
      cell: ({ row }) => (
        <div className={`${cls.actions} ${locale === 'ar' ? cls.ar : ''}`}>
          <IconOptions className={cls.iconOptions} options={[
            {
              label: translations.pendingReview,
              action: `/panel/assignments/${row.original.id}/students?status=pending`
            },
            {
              label: translations.allAssignments,
              action: `/panel/assignments/${row.original.id}/students`
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