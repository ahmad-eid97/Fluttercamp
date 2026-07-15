'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
import { deleteCourseNotice, getAllCourseNoticeboards } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { CourseNoticeboard, Dictionary, Locale } from '@/types';
//= Styles
import cls from './table.module.scss';

type Props = {
  translations: Dictionary['panel']['noticeboard']['courseNotices'];
  locale: Locale;
}

function NoticesTable({ translations, locale }: Props) {
  const searchParams = useSearchParams();
  const { data: notices, isLoading, refetch } = useRequest(getAllCourseNoticeboards, generateFilterObject() || { from: '', to: '', webinar_id: '', title: '' });
  const [isShown, setIsShown] = useState(false);
  const [commentContent, setCommentContent] = useState('');

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

  function handleViewContent(comment: string) {
    setCommentContent(comment);
    setIsShown(true);
  }

  const Columns: ColumnDef<CourseNoticeboard>[] = [
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
      header: translations.color,
      accessorKey: 'color',
      cell: ({ row }) => (
        <p className={`
          ${cls.color}
          ${row.original.color.toLowerCase() === 'danger' && cls.red}
          ${row.original.color.toLowerCase() === 'success' && cls.green}
          ${row.original.color.toLowerCase() === 'info' && cls.blue}
          ${row.original.color.toLowerCase() === 'neutral' && cls.grey}
          ${row.original.color.toLowerCase() === 'warning' && cls.yellow}
        `}>
          {row.original.color.toLowerCase() === 'danger' && translations.filter.red}
          {row.original.color.toLowerCase() === 'success' && translations.filter.green}
          {row.original.color.toLowerCase() === 'info' && translations.filter.blue}
          {row.original.color.toLowerCase() === 'neutral' && translations.filter.grey}
          {row.original.color.toLowerCase() === 'warning' && translations.filter.yellow}
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
          {format(new Date(+row.original.created_at * 1000), 'd MMM yyyy | hh:mm a', { locale: locale === 'ar' ? ar : enUS })}
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
              action: `/panel/noticeboard/course-noticeboard/${row.original.id}/edit`
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
                  const response = await deleteCourseNotice(row.original.id);
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
        webinars={notices?.webinars}
        refetch={refetch}
      />
      {
        !isLoading && notices?.noticeboards.data.length ?
          <Table
            tabledata={notices?.noticeboards.data}
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
        !isLoading && notices && notices.noticeboards.last_page - 1 ?
          <Pagination
            pagesCount={notices.noticeboards.last_page - 1}
            currentPage={notices.noticeboards.current_page - 1}
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