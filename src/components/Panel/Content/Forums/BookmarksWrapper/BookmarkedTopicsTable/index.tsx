'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';
import Table from "@/components/UIs/Table";
import LoadingSkeleton from '@/components/UIs/Skeleton';
import Pagination from '@/components/UIs/Pagination';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
import { toastSuccess } from '@/utils/toast';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale, BookmarkedTopic, BookmarkedTopicsWithMeta } from '@/types';
//= Api
import { removeTopicFromBookmarks } from '@/api';
//= Styles
import cls from './table.module.scss';

type Props = {
  translations: Dictionary['panel']['forums']['topicsTable'];
  locale: Locale;
  isLoading: boolean;
  topics: BookmarkedTopicsWithMeta | undefined;
  refetch: () => Promise<void>;
}

function BookmarksTable({ translations, locale, isLoading, topics, refetch }: Props) {
  const Columns: ColumnDef<BookmarkedTopic>[] = [
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
      accessorKey: 'posts',
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
        <div className={`${cls.status} ${row.original.forum.status.toLowerCase() === 'active' ? cls.active : cls.closed}`}>
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
    },
    {
      header: translations.unBookmark,
      cell: ({ row }) => (
        <Tooltip title={translations.unBookmark} placement="top">
          <button className={cls.btn} onClick={(e) => removeBookmark(e, row.original.id)}><Icon icon="bi:bookmark-x-fill" /></button>
        </Tooltip >
      )
    }
  ]

  async function removeBookmark(event: React.MouseEvent, topicId: number) {
    event.preventDefault();
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const response = await removeTopicFromBookmarks(topicId);
    if (response?.code === 200) {
      refetch()
      toastSuccess(translations.bookmarkRemoved);
    }
    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.container}>
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

export default BookmarksTable;