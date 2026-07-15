'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import Filter from './Filter';
import Table from "@/components/UIs/Table";
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, Topic, TopicsWithMeta } from '@/types';
//= Styles
import cls from './table.module.scss';
import Pagination from '@/components/UIs/Pagination';

type Props = {
  translations: Dictionary['panel']['forums']['topicsTable'];
  locale: Locale;
  isLoading: boolean;
  topics: TopicsWithMeta | undefined;
  refetch: () => Promise<void>
}

function TopicsTable({ translations, locale, isLoading, topics, refetch }: Props) {
  const Columns: ColumnDef<Topic>[] = [
    {
      header: `${translations.title}`,
      accessorKey: 'title',
      cell: ({ row }) => (
        <div className={cls.userCell}>
          <img src={getImageUrl(row.original.forum.icon || '')} alt="title icon" />
          <span>{row.original.title}</span>
        </div>
      ),
    },
    {
      header: translations.forum,
      accessorKey: 'category',
      cell: ({ row }) => (
        <p>
          {translationsHandler(row.original.forum.translations, locale).title.length > 25 ? translationsHandler(row.original.forum.translations, locale).title.slice(0, 25) + '...' : translationsHandler(row.original.forum.translations, locale).title}
        </p>
      )
    },
    {
      header: translations.posts,
      accessorKey: 'replies',
      cell: ({ row }) => (
        <p>
          {row.original.posts_count}
        </p>
      )
    },
    {
      header: translations.status,
      accessorKey: 'status',
      cell: ({ row }) => (
        <div className={`${cls.status} ${row.original.forum.status.toLowerCase() === 'active' ? cls.published : cls.closed}`}>
          {row.original.forum.status.toLowerCase() === 'active' ? translations.active : translations.closed}
        </div>
      )
    },
    {
      header: translations.publishedAt,
      accessorKey: 'publishedAt',
      cell: ({ row }) => (
        <p className={cls.date}>
          {format(new Date(+row.original.created_at * 1000), "dd MMM yyyy | hh:mm a", { locale: locale === 'ar' ? ar : enUS })}
        </p>
      )
    }
  ]

  return (
    <div className={cls.container}>
      <Filter
        translations={translations}
        locale={locale}
      />
      {!isLoading && topics && topics.data.length ?
        <Table
          tabledata={topics.data}
          columns={Columns}
          tableClassName={cls.table}
        />
        :
        isLoading ?
          <>
            <LoadingSkeleton width='100%' height='50px' rounded />
            <LoadingSkeleton width='100%' height='50px' rounded />
            <LoadingSkeleton width='100%' height='50px' rounded />
          </>
          :
          <p className={cls.noData}>
            {translations.noData}
          </p>
      }
      {
        !isLoading && topics && topics.last_page - 1 ?
          <Pagination
            pagesCount={topics.last_page - 1}
            currentPage={topics.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
    </div>
  )
}

export default TopicsTable;