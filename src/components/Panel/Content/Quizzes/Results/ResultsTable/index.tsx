'use client';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Modules
import { ColumnDef } from '@tanstack/react-table';
//= Components
import Table from '@/components/UIs/Table';
import IconOptions from '@/components/UIs/IconOptions';
import ResultsFilter from '../ResultsFilter';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, ResultsResponse, QuizResultData, RootState } from '@/types';
//= Styles
import cls from './resultsTable.module.scss';
import Pagination from '@/components/UIs/Pagination';

type Props = {
  translations: Dictionary['panel']['quizzes']['results'];
  locale: Locale;
  isLoading: boolean;
  data: ResultsResponse | undefined;
  refetch: () => Promise<void>
}

function ResultsTable({ translations, locale, isLoading, data, refetch }: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const Columns: ColumnDef<QuizResultData>[] = [
    {
      header: translations.table.student,
      accessorKey: 'user',
      cell: ({ row }) => (
        <div className={cls.studentCell}>
          <img src={getImageUrl(row.original.user.avatar || '')} alt="student_image" />
          <div>
            <p>{row.original.user.full_name}</p>
            <span>{row.original.user.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: translations.table.quiz,
      accessorKey: 'quiz.title',
      cell: ({ row }) => (
        <div className={cls.detailsCell}>
          <p>{translationsHandler(row.original.quiz.translations, locale).title}</p>
        </div>
      )
    },
    {
      header: translations.table.quizGrade,
      accessorKey: 'quizGrade',
      cell: ({ row }) => (
        <p>
          {row.original.quiz.total_mark}
        </p>
      )
    },
    {
      header: translations.table.studentGrade,
      accessorKey: 'studentGrade',
      cell: ({ row }) => (
        <p>
          {row.original.user_grade}
        </p>
      )
    },
    {
      header: translations.table.status,
      accessorKey: 'status',
      cell: ({ row }) => (
        <div className={`
          ${cls.status} 
          ${row.original.status === 'passed' ? cls.passed : ''}
          ${row.original.status === 'failed' ? cls.failed : ''}
          ${row.original.status === 'waiting' ? cls.waiting : ''}
        `}>
          {row.original.status === 'passed' ? translations.table.passed : null}
          {row.original.status === 'failed' ? translations.table.failed : null}
          {row.original.status === 'waiting' ? translations.table.waiting : null}
        </div>
      )
    },
    {
      header: translations.table.date,
      accessorKey: 'date',
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
              label: translations.table.review,
              action: row.original.status === 'waiting' ? (user?.role === 'teacher' ? `/panel/quizzes/${row.original.quiz_id}/results` : `/panel/quizzes/${row.original.quiz_id}/start`) : `/panel/quizzes/${row.original.quiz_id}/status`
            },
            {
              label: translations.table.view,
              action: `/course/${row.original.quiz.webinar_id}`
            }
          ]} />
        </div>
      ),
    },
  ]

  return (
    <div className={cls.quizzesTable}>
      <ResultsFilter locale={locale} translations={translations} data={data} />
      {!isLoading && data?.quizzesResults?.data?.length ?
        <Table
          tabledata={data.quizzesResults.data}
          columns={Columns}
        />
        :
        isLoading ?
          <>
            <LoadingSkeleton width='100%' height='50px' rounded />
            <LoadingSkeleton width='100%' height='50px' rounded />
            <LoadingSkeleton width='100%' height='50px' rounded />
          </>
          :
          <div className={cls.noData}>
            <p>{translations.table.empty}</p>
          </div>
      }
      {
        !isLoading && data && data.quizzesResults.last_page - 1 ?
          <Pagination
            pagesCount={data.quizzesResults.last_page - 1}
            currentPage={data.quizzesResults.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
    </div>
  )
}

export default ResultsTable;
