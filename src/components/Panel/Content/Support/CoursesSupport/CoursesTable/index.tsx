'use client';
import { useSearchParams } from 'next/navigation';
//= Modules
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import Table from '@/components/UIs/Table';
import IconOptions from '@/components/UIs/IconOptions';
import CoursesFilter from '../CoursesFilter';
import LoadingSkeleton from '@/components/UIs/Skeleton';
import Pagination from '@/components/UIs/Pagination';
//= Api
import { getCoursesSupports } from '@/api/panel/support';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale, Ticket } from '@/types';
//= Styles
import cls from './coursesTable.module.scss';

type Props = {
  translations: Dictionary['panel']['support']['courses']['table'];
  locale: Locale;
}

function CoursesTable({ translations, locale }: Props) {
  const searchParams = useSearchParams();
  const { data: ticketsData, isLoading, refetch } = useRequest(getCoursesSupports, generateFilterObject() || {});

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

  const Columns: ColumnDef<Ticket>[] = [
    {
      header: translations.title,
      cell: ({ row }) => (
        <div>
          {row.original.title}
        </div>
      ),
    },
    {
      header: translations.create_date,
      cell: ({ row }) => (
        <div className={cls.paleCell}>
          {row.original.created_at ? format(new Date(+row.original.created_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    },
    {
      header: translations.last_update,
      cell: ({ row }) => (
        <div className={cls.paleCell}>
          {row.original.updated_at ? format(new Date(+row.original.updated_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    },
    {
      header: translations.user,
      cell: ({ row }) => (
        <div>
          {row.original.user.full_name}
        </div>
      )
    },
    {
      header: translations.role,
      cell: ({ row }) => (
        <div>
          {row.original.user.role_name}
        </div>
      )
    },
    {
      header: translations.department,
      cell: ({ row }) => (
        <div className={cls.paleCell}>
          {row.original.department}
        </div>
      )
    },
    {
      header: translations.status,
      cell: ({ row }) => (
        <div className={`${cls.status} ${row.original.status === 'open' ? cls.Active : cls.Pending}`}>
          {row.original.status === 'open' ? translations.filter.open : translations.supporter_replied}
        </div>
      )
    },
    {
      header: translations.action,
      cell: ({ row }) => (
        <div className={`${cls.actions} ${locale === 'ar' ? cls.ar : ''}`}>
          <IconOptions className={cls.iconOptions} options={[
            {
              label: translations.reply,
              action: () => { }
            },
            {
              label: translations.delete,
              action: () => { }
            }
          ]} />
        </div>
      ),
    },
  ]

  return (
    <div className={cls.coursesTable}>
      <CoursesFilter locale={locale} translations={translations} />
      {
        ticketsData?.data.length && !isLoading ?
          <Table
            tabledata={ticketsData.data}
            columns={Columns}
          />
          :
          isLoading
            ?
            <>
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
            </>
            :
            <div className={cls.noData}>
              <p>{translations.empty}</p>
            </div>
      }
      {
        !isLoading && ticketsData && ticketsData.last_page - 1 ?
          <Pagination
            pagesCount={ticketsData.last_page - 1}
            currentPage={ticketsData.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
    </div>
  )
}

export default CoursesTable;
