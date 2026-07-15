'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import MeetingsFilter from './Filter';
import ContactModal from './ContactModal';
import CreateLinkModal from './CreateLinkModal';
import Table from "@/components/UIs/Table";
import IconOptions from '@/components/UIs/IconOptions';
import Pagination from '@/components/UIs/Pagination';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { addMeetingLiveSession, finishMeeting } from '@/api';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Dictionary, Locale, ReserveMeetingsWithMeta, ReservationsMeetings, ReserveMeeting, RootState } from '@/types';
//= Styles
import cls from './meetings-table.module.scss';

type Props = {
  translations: Dictionary['panel']['meetings']['list'];
  locale: Locale;
  isLoading: boolean;
  refetch: (filters?: any) => Promise<void>;
  requests: ReserveMeetingsWithMeta | ReservationsMeetings[] | undefined;
  type: 'requests' | 'reservations';
}

function MeetingsTable({ translations, locale, isLoading, requests, refetch, type }: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [selectedMeetingId, setSelectedMeetingId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [createLinkOpen, setCreateLinkOpen] = useState<boolean>(false);
  const [userModalInfo, setUserModalInfo] = useState<{
    user_id: number;
    user_type: 'student' | 'instructor';
    item_id: number;
  }>({
    user_id: 0,
    user_type: 'instructor',
    item_id: 0
  });

  const [columnsData, setColumnsData] = useState((requests && 'length' in requests && requests.length) ? requests as ReservationsMeetings[] : (requests as ReserveMeetingsWithMeta)?.data || []);

  useEffect(() => {
    if (requests) setColumnsData((requests && 'length' in requests && requests.length) ? requests as ReservationsMeetings[] : (requests as ReserveMeetingsWithMeta)?.data || [])
  }, [requests]);

  const Columns: ColumnDef<ReserveMeeting | ReservationsMeetings>[] = [
    {
      header: translations.user,
      accessorKey: 'user.fullname',
      cell: ({ row }) => (
        <div className={cls.userCell}>
          <img src={getImageUrl(row.original.user.avatar || '')} alt="user image" />
          <span>{row.original.user.full_name} <br /> {'email' in row.original.user ? <i>{row.original.user.email}</i> : null}</span>
        </div>
      ),
    },
    {
      header: translations.day,
      accessorKey: 'day',
      cell: ({ row }) => (
        <p className={cls.date}>
          {
            type === 'requests' ?
              format(new Date(row.original.day), "EEEE", { locale: locale === 'ar' ? ar : enUS })
              :
              format(new Date(+row.original.date * 1000), "EEEE", { locale: locale === 'ar' ? ar : enUS })
          }
        </p>
      )
    },
    {
      header: translations.date,
      accessorKey: 'date',
      cell: ({ row }) => (
        <p className={cls.date}>{format(new Date(+row.original.date * 1000), "dd MMM yyyy", { locale: locale === 'ar' ? ar : enUS })}</p>
      )
    },
    {
      header: translations.time,
      accessorKey: 'meeting_time.time',
      cell: ({ row }) => (
        <p className={cls.date}>{
          locale === 'ar' ?
            'meeting_time' in row.original ?
              row.original.meeting_time.time.replaceAll('AM', 'ص').replaceAll('PM', 'م').split('-').join(' - ')
              :
              (row.original.time.start + '-' + row.original.time.end).replaceAll('AM', 'ص').replaceAll('PM', 'م').split('-').join(' - ')
            :
            'meeting_time' in row.original ?
              row.original.meeting_time.time.split('-').join(' - ')
              :
              (row.original.time.start + '-' + row.original.time.end).split('-').join(' - ')

        }</p>
      )
    },
    {
      header: translations.type,
      accessorKey: 'meeting_type',
      cell: ({ row }) => (
        <p>
          {'meeting_time' in row.original ? row.original.meeting_type.toLowerCase() === 'all' ? translations.all : null : '-'}
          {'meeting_time' in row.original ? row.original.meeting_type.toLowerCase() === 'in_person' ? translations.in_person : null : '-'}
          {'meeting_time' in row.original ? row.original.meeting_type.toLowerCase() === 'online' ? translations.online : null : '-'}
        </p>
      )
    },
    {
      header: translations.studentsCount,
      accessorKey: 'student_count',
      cell: ({ row }) => (
        <p>{row.original.student_count}</p>
      )
    },
    {
      header: translations.status,
      accessorKey: 'status',
      cell: ({ row }) => (
        <div className={`
          ${cls.status} 
          ${row.original.status.toLowerCase() === 'pending' ? cls.pending : ''}
          ${row.original.status.toLowerCase() === 'open' ? cls.open : ''}
          ${row.original.status.toLowerCase() === 'finished' ? cls.finished : ''}
        `}>
          {row.original.status.toLowerCase() === 'pending' ? translations.pending : null}
          {row.original.status.toLowerCase() === 'open' ? translations.open : null}
          {row.original.status.toLowerCase() === 'finished' ? translations.finished : null}
        </div>
      )
    },
    {
      header: translations.action,
      cell: ({ row }) => (
        row.original.status.toLowerCase() !== 'finished' ?
          <div className={`${cls.actions} ${locale === 'ar' ? cls.ar : ''}`}>
            <IconOptions className={cls.iconOptions} rtl={locale === 'ar'} options={[
              (row.original.status.toLowerCase() === 'open' ? {
                label: translations.join,
                action: `/session/${row.original.session?.id || 1}`
              } : { label: '', action: () => { }, hidden: true }),
              ('meeting_time' in row.original && row.original.meeting_type === 'online' && row.original.status.toLowerCase() !== 'open' && type === 'requests' ? {
                label: translations.createSession,
                action: async () => {
                  const response = await addMeetingLiveSession(row.original.id);
                  // @ts-ignore
                  if (response && response.code === 200) {
                    toast.success(translations.sessionCreatedSuccess)
                    location.reload();
                  }
                }
              } : { label: '', action: () => { }, hidden: true }),
              {
                label: translations.addToCalender,
                action: () => {
                  const start = {
                    day: encodeURI(new Date('start_at' in row.original ? (+row.original.start_at) : 0 * 1000).toISOString().replaceAll(':', '').replaceAll('.', '')).split('T')[0].split('-').join(' '),
                    time: encodeURI(new Date('start_at' in row.original ? (+row.original.start_at) : 0 * 1000).toISOString().replaceAll(':', '').replaceAll('.', '')).split('T')[1]
                  }
                  const end = {
                    day: encodeURI(new Date('end_at' in row.original ? (+row.original.end_at) : 0 * 1000).toISOString().replaceAll(':', '').replaceAll('.', '')).split('T')[0].split('-').join(' '),
                    time: encodeURI(new Date('end_at' in row.original ? (+row.original.end_at) : 0 * 1000).toISOString().replaceAll(':', '').replaceAll('.', '')).split('T')[1]
                  }

                  const calenderLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${start.day}T${start.time}/${end.day}T${end.time}&ctz=UTC&text=${encodeURI(`Meeting with (${row.original.user.full_name}) at FlutterCamp`)}`;

                  window.open(calenderLink, '_blank');
                }
              },
              (type === 'reservations' ? {
                label: translations.contactInstructor,
                action: () => {
                  setUserModalInfo({
                    user_id: row.original.user.id,
                    user_type: 'instructor',
                    item_id: row.original.id
                  });
                  setOpen(true);
                }
              } : { label: '', action: () => { }, hidden: true }),
              (type === 'requests' ? {
                label: translations.contactStudent,
                action: () => {
                  setUserModalInfo({
                    user_id: row.original.user.id,
                    user_type: 'student',
                    item_id: row.original.id
                  });
                  setOpen(true);
                }
              } : { label: '', action: () => { }, hidden: true }),
              {
                label: translations.finishMeeting,
                action: async () => {
                  const result = await confirmDialog({
                    icon: 'question',
                    title: translations.finishQuestion,
                    showCancelButton: true,
                    cancelButtonText: translations.cancel,
                    confirmButtonText: translations.finishConfirm,
                  });

                  if (result.isConfirmed) {
                    const response = await finishMeeting(row.original.id);
                    if (response?.success) {
                      refetch();
                      toast.success(translations.finishSuccess);
                    }
                  }
                }
              }
            ]} />
          </div>
          :
          null
      ),
    },
  ]

  return (
    <div className={cls.container}>
      {
        type === 'requests' &&
        <MeetingsFilter
          translations={translations}
          locale={locale}
          type={type}
          users={columnsData?.length ? (columnsData as ReserveMeeting[]).map(col => col.user) : []}
          refetch={refetch}
        />
      }
      {
        !isLoading && columnsData?.length ?
          <Table
            tabledata={columnsData}
            columns={Columns}
            tableClassName={cls.table}
          />
          :
          !isLoading ?
            <p className={cls.noData}>
              {translations.noMeetings}
            </p>
            :
            <>
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
              <LoadingSkeleton width="100%" height="50px" rounded />
            </>
      }
      {
        !isLoading && requests && 'last_page' in requests && requests.last_page - 1 ?
          <Pagination
            pagesCount={requests.last_page - 1}
            currentPage={requests.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
      {open &&
        <ContactModal
          locale={locale}
          userInfo={userModalInfo}
          setOpen={setOpen}
          translations={translations}
        />}
      {
        createLinkOpen &&
        <CreateLinkModal
          locale={locale}
          meetingId={selectedMeetingId}
          setOpen={setCreateLinkOpen}
          translations={translations}
        />
      }
    </div>
  )
}

export default MeetingsTable;