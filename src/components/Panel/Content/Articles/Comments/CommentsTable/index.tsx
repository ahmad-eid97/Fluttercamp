'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import { Icon } from '@iconify/react';
import CommentsFilter from '../CommentsFilter';
import Table from "@/components/UIs/Table";
import Tooltip from '@mui/material/Tooltip';
import ViewCommentContentModal from './ViewContentModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
import Pagination from '@/components/UIs/Pagination';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Dictionary, Locale, ArticleComment } from '@/types';
//= Api
import { getArticlesComments } from '@/api';
import useRequest from '@/api/useRequest';
//= Styles
import cls from './comments-table.module.scss';
import Link from 'next/link';

type Props = {
  translations: Dictionary['panel']['articles']['comments'];
  locale: Locale;
}

function CommentsTable({ translations, locale }: Props) {
  const searchParams = useSearchParams();
  const { data, isLoading, refetch } = useRequest(getArticlesComments, generateFilterObject() || { from: '', to: '', blog_id: '', page: 1 });
  const [isShown, setIsShown] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  function generateFilterObject() {
    let filter: { [key: string]: string } = {};
    const searchParamsArray = Array.from(searchParams.entries());

    if (!searchParamsArray.length) return false;
    searchParamsArray.forEach(param => filter[param[0]] = param[1]);

    return filter;
  }


  function handleViewContent(comment: string) {
    setCommentContent(comment);
    setIsShown(true);
  }

  const Columns: ColumnDef<ArticleComment>[] = [
    {
      header: translations.user,
      cell: ({ row }) => (
        <div className={cls.userCell}>
          {
            row.original.user ?
              <>
                <img src={getImageUrl(row.original.user.avatar || '')} alt="user image" />
                <span>{row.original.user.full_name}</span>
              </>
              :
              "-"
          }
        </div>
      ),
    },
    {
      header: translations.article,
      cell: ({ row }) => (
        <Link href={`/articles/${row.original.blog.id}`}>
          {row.original.blog.title.length > 25 ? row.original.blog.title.slice(0, 25) + '...' : row.original.blog.title}
        </Link>
      )
    },
    {
      header: translations.comment,
      cell: ({ row }) => (
        <Tooltip title={translations.viewContent} placement="top">
          <div className={cls.btn} onClick={() => handleViewContent(row.original.comment)}>
            <Icon icon='carbon:view-filled' />
          </div>
        </Tooltip>
      )
    },
    {
      header: translations.status,
      cell: ({ row }) => (
        <div className={`${cls.status} ${row.original.status.toLowerCase() === 'active' ? cls.open : cls.closed}`}>
          {row.original.status.toLowerCase() === 'active' ? translations.open : translations.closed}
        </div>
      )
    },
    {
      header: translations.date,
      cell: ({ row }) => (
        <div className={cls.date}>
          {row.original.create_at ? format(new Date(+row.original.create_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    },
  ]

  return (
    <div className={cls.table_container}>
      <CommentsFilter
        locale={locale}
        translations={translations}
        posts={data?.posts}
        refetch={refetch}
      />
      {
        !isLoading && data?.comments?.data.length ?
          <Table
            tabledata={data.comments.data}
            columns={Columns}
          />
          :
          !isLoading ?
            <p className={cls.noData}>
              {translations.noComments}
            </p>
            :
            <>
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
            </>
      }
      {
        !isLoading && data && data.comments.meta.last_page - 1 ?
          <Pagination
            pagesCount={data.comments.meta.last_page - 1}
            currentPage={data.comments.meta.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
      {
        isShown &&
        <ViewCommentContentModal
          translations={translations}
          content={commentContent}
          setIsShown={setIsShown}
        />
      }
    </div>
  )
}

export default CommentsTable;