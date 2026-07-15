'use client';
import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
//= Moduels
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import NoticesFilter from '../Filter';
import Table from "@/components/UIs/Table";
import IconOptions from '@/components/UIs/IconOptions';
import Tooltip from '@mui/material/Tooltip';
import ViewContentModal from './ViewContentModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
import Pagination from '@/components/UIs/Pagination';
//= Api
import { deleteNotice } from '@/api';
//= Types
import type { Dictionary, Locale, NoticeboardsWithMeta, NoticeboardWebinar, Noticeboard } from '@/types';
//= Styles
import cls from './table.module.scss';

type Props = {
  translations: Dictionary['panel']['noticeboard'];
  locale: Locale;
  data: NoticeboardsWithMeta | undefined;
  webinars: NoticeboardWebinar[] | undefined;
  refetch: () => Promise<void>;
  isLoading: boolean;
}

function NoticesTable({ translations, locale, data, webinars, isLoading, refetch }: Props) {
  const [isShown, setIsShown] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  function handleViewContent(comment: string) {
    setCommentContent(comment);
    setIsShown(true);
  }

  const Columns: ColumnDef<Noticeboard>[] = [
    {
      header: translations.title,
      accessorKey: 'title',
      cell: ({ row }) => (
        <p className={cls.title}>
          {row.original.title}
        </p>
      )
    },
    {
      header: translations.type,
      accessorKey: 'type',
      cell: ({ row }) => (
        <p>
          {row.original.type}
        </p>
      )
    },
    {
      header: translations.message,
      accessorKey: 'message',
      cell: ({ row }) => (
        <Tooltip title={translations.viewContent} placement="top">
          <div className={cls.btn} onClick={() => handleViewContent(row.original.message)}>
            <Icon icon='carbon:view-filled' />
          </div>
        </Tooltip>
      )
    },
    {
      header: translations.date,
      accessorKey: 'date',
      cell: ({ row }) => (
        <div className={cls.date}>
          {format(new Date((+row.original.created_at) * 1000), 'd MMM yyyy | hh:mm a', { locale: locale === 'ar' ? ar : enUS })}
        </div>
      )
    },
    {
      header: translations.action,
      cell: ({ row }) => (
        <div className={`${cls.actions} ${locale === 'ar' ? cls.ar : ''}`}>
          <IconOptions className={cls.iconOptions} options={[
            {
              label: translations.edit,
              action: `/panel/noticeboard/${row.original.id}/edit`
            },
            {
              label: translations.delete,
              action: async () => {
                const result = await confirmDialog({
                  icon: 'question',
                  title: translations.deleteQuestion,
                  showCancelButton: true,
                  cancelButtonText: translations.cancel,
                  confirmButtonText: translations.confirm,
                });

                if (result.isConfirmed) {
                  const response = await deleteNotice(row.original.id);
                  if (response) {
                    refetch();
                    toast.success(translations.deleteSuccess);
                  }
                }
              }
            }
          ]} />
        </div>
      ),
    },
  ]

  return (
    <div className={cls.table_container}>
      <NoticesFilter
        locale={locale}
        translations={translations.filter}
        webinars={webinars}
        refetch={refetch}
      />
      {
        !isLoading && data?.data?.length ?
          <Table
            tabledata={data.data}
            columns={Columns}
          />
          :
          !isLoading ?
            <p className={cls.noData}>
              {translations.noData}
            </p>
            :
            <>
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
            </>
      }
      {
        !isLoading && data && data.last_page - 1 ?
          <Pagination
            pagesCount={data.last_page - 1}
            currentPage={data.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
      {
        isShown &&
        <ViewContentModal
          content={commentContent}
          setIsShown={setIsShown}
        />
      }
    </div>
  )
}

export default NoticesTable;