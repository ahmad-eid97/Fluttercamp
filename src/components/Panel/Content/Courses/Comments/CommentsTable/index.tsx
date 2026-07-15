'use client';
import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
//= Components
import { Icon } from '@iconify/react';
import StatisticsBoxes from '../StatisticsBoxes';
import CommentsFilter from '../CommentsFilter';
import Table from "@/components/UIs/Table";
import IconOptions from '@/components/UIs/IconOptions';
import Tooltip from '@mui/material/Tooltip';
import ViewCommentContentModal from './ViewContentModal';
import ReplyModal from './ReplyModal';
import ReportModal from './ReportModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Api
import { getComments } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale, CourseComment } from '@/types';
//= Styles
import cls from './comments-table.module.scss';

type Props = {
  translations: Dictionary['panel']['courses']['comments'];
  locale: Locale;
  type: 'my-comments' | 'course-comments';
}

function CommentsTable({ translations, locale, type }: Props) {
  const { data, isLoading, refetch } = useRequest(() => getComments(type));
  const [isShown, setIsShown] = useState(false);
  const [replyIsShown, setReplyIsShown] = useState(false);
  const [reportIsShown, setReportIsShown] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [selectedComment, setSelectedComment] = useState<CourseComment>();

  function handleViewContent(comment: string) {
    setCommentContent(comment);
    setIsShown(true);
  }

  const Columns: ColumnDef<CourseComment>[] = [
    {
      header: translations.table.user,
      cell: ({ row }) => (
        <div className={cls.userCell}>
          <img src={getImageUrl(row.original.user.avatar || '')} alt="user image" />
          <span>{row.original.user.full_name}</span>
        </div>
      ),
    },
    {
      header: translations.table.courseOrBlog,
      cell: ({ row }) => (
        <p>
          {row.original.webinar ? row.original.webinar.title.length > 25 ? row.original.webinar.title.slice(0, 25) + '...' : row.original.webinar.title : ''}
          {row.original.blog ? row.original.blog.title.length > 25 ? row.original.blog.title.slice(0, 25) + '...' : row.original.blog.title : ''}
        </p>
      )
    },
    {
      header: translations.table.comment,
      cell: ({ row }) => (
        <Tooltip title={translations.table.viewContent} placement="top">
          <div className={cls.btn} onClick={() => handleViewContent(row.original.comment)}>
            <Icon icon='carbon:view-filled' />
          </div>
        </Tooltip>
      )
    },
    {
      header: translations.table.status,
      cell: ({ row }) => (
        <div className={`${cls.status} ${row.original.status.toLowerCase() === 'active' ? cls.open : cls.closed}`}>
          {row.original.status.toLowerCase() === 'active' ? translations.table.active : translations.table.pending}
        </div>
      )
    },
    {
      header: translations.table.date,
      cell: ({ row }) => (
        <div className={cls.date}>
          {format(+row.original.create_at * 1000, 'dd/MM/yyyy')}
        </div>
      )
    },
    {
      header: translations.table.action,
      cell: ({ row }) => (
        <div className={`${cls.actions} ${locale === 'ar' ? cls.ar : ''}`}>
          <IconOptions className={cls.iconOptions} options={[
            {
              label: translations.table.reply,
              action: () => {
                setSelectedComment(row.original);
                setReplyIsShown(true);
              }
            },
            {
              label: translations.table.report,
              action: () => {
                setSelectedComment(row.original);
                setReportIsShown(true);
              }
            }
          ]} />
        </div>
      ),
    },
  ]

  return (
    <>
      <StatisticsBoxes translations={translations.statisticsBoxes} />
      <div className={cls.table_container}>
        <CommentsFilter locale={locale} translations={translations.table} />
        {
          !isLoading && data && data.length ?
            <>
              <Table
                tabledata={data}
                // @ts-ignore
                columns={Columns}
                searchPlaceholder={translations.table.searchPlaceholder}
                tableClassName={cls.table}
              />
              {
                isShown &&
                <ViewCommentContentModal
                  translations={translations.table}
                  content={commentContent}
                  setIsShown={setIsShown}
                />
              }
              {
                replyIsShown &&
                <ReplyModal
                  translations={translations.table}
                  setIsShown={setReplyIsShown}
                  comment={selectedComment}
                />
              }
              {
                reportIsShown &&
                <ReportModal
                  translations={translations.table}
                  setIsShown={setReportIsShown}
                  commentId={selectedComment?.id || 0}
                />
              }
            </>
            :
            isLoading ?
              <>
                <LoadingSkeleton width="100%" height="50px" rounded />
                <LoadingSkeleton width="100%" height="50px" rounded />
                <LoadingSkeleton width="100%" height="50px" rounded />
              </>
              :
              <p className={cls.noData}>
                {translations.table.noComments}
              </p>
        }
      </div>
    </>
  )
}

export default CommentsTable;