'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import Filter from './Filter';
import Table from "@/components/UIs/Table";
import LoadingSkeleton from '@/components/UIs/Skeleton';
import Pagination from '@/components/UIs/Pagination';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, TopicReply, RepliesWithMeta } from '@/types';
//= Styles
import cls from './table.module.scss';

type Props = {
  translations: Dictionary['panel']['forums']['repliesTable'];
  locale: Locale;
  isLoading: boolean;
  posts: RepliesWithMeta | undefined;
  refetch: () => Promise<void>
}

function RepliesTable({ translations, locale, isLoading, posts, refetch }: Props) {
  const Columns: ColumnDef<TopicReply>[] = [
    {
      header: `${translations.topic}`,
      accessorKey: 'topic',
      cell: ({ row }) => (
        <div className={cls.userCell}>
          <img src={getImageUrl(row.original.topic.creator.avatar || '')} alt="user image" />
          <span>{row.original.topic.title} <i>{translations.by} {row.original.topic.creator.full_name}</i></span>
        </div>
      ),
    },
    {
      header: translations.forum,
      accessorKey: 'category',
      cell: ({ row }) => (
        <p>
          {translationsHandler(row.original.topic.forum.translations, locale).title.length > 25 ? translationsHandler(row.original.topic.forum.translations, locale).title.slice(0, 25) + '...' : translationsHandler(row.original.topic.forum.translations, locale).title.length}
        </p>
      )
    },
    {
      header: translations.replies,
      accessorKey: 'replies',
      cell: ({ row }) => (
        <p>
          {row.original.replies_count}
        </p>
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
      {!isLoading && posts && posts.data.length ?
        <Table
          tabledata={posts.data}
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
        !isLoading && posts && posts.last_page - 1 ?
          <Pagination
            pagesCount={posts.last_page - 1}
            currentPage={posts.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
    </div>
  )
}

export default RepliesTable;