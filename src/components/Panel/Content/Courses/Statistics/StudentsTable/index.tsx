'use client';
import React from 'react';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Modules
import { ColumnDef } from '@tanstack/react-table';
//= Components
import SectionTitle from './Title';
import Table from '@/components/UIs/Table';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Dictionary, Locale, GetInstructorCourseStatisticsResponse, StatisticsUser } from '@/types';
//= Styles
import cls from './table.module.scss';


type Props = {
  translations: Dictionary['panel']['courses']['statistics'];
  locale: Locale;
  data: GetInstructorCourseStatisticsResponse | undefined;
  isLoading: boolean;
}

function StudentsTable({ translations, locale, data, isLoading }: Props) {

  const Columns: ColumnDef<StatisticsUser>[] = [
    {
      header: translations.student,
      accessorKey: 'student.name',
      cell: ({ row }) => (
        <div className={cls.studentCell}>
          <img src={getImageUrl(row.original.avatar || '')} alt="student_image" />
          <div>
            <p>{row.original.full_name}</p>
            <span>{row.original.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: translations.progress,
      accessorKey: 'course_progress',
      cell: ({ row }) => (
        <p>
          {row.original.course_progress}%
        </p>
      )
    },
    {
      header: translations.passedQuizzes,
      accessorKey: 'passed_quizzes',
      cell: ({ row }) => (
        <p>
          {row.original.passed_quizzes}
        </p>
      )
    },
    {
      header: translations.unsentAssignments,
      accessorKey: 'unsent_assignments',
      cell: ({ row }) => (
        <p>
          {row.original.unsent_assignments}
        </p>
      )
    },
    {
      header: translations.pendingAssignments,
      accessorKey: 'pending_assignments',
      cell: ({ row }) => (
        <p>
          {row.original.pending_assignments}
        </p>
      )
    },
    {
      header: translations.purchaseDate,
      accessorKey: 'purchaseDate',
      cell: ({ row }) => (
        <div className={cls.dateCell}>
          {row.original.created_at ? format(new Date(+row.original.created_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    }
  ]

  return (
    <div className={cls.studentsTable}>
      <SectionTitle translations={translations} />
      {
        !isLoading && data ?
          <Table
            tabledata={data.students.data}
            columns={Columns}
          />
          :
          isLoading ?
            <LoadingSkeleton width="100%" height="350px" rounded />
            :
            <div className={cls.noData}>
              <p>{translations.empty}</p>
            </div>
      }
    </div>
  )
}

export default StudentsTable;
