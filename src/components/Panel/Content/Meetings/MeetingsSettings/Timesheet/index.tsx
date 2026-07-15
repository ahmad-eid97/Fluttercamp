'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/lib/confirm';
//= Components
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';
import AddTimeModal from './AddTimeModal';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { deleteMeetingTime } from '@/api';
//= Types
import type { Dictionary, Locale, GetMeetingSettingsResponse } from '@/types';
//= Styles
import cls from './timesheet.module.scss';

type Props = {
  translations: Dictionary['panel']['meetings']['settings']['timesheet'];
  locale: Locale;
  meetingsData: GetMeetingSettingsResponse | undefined;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

type Days = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

function Timesheet({ translations, locale, meetingsData, isLoading, refetch }: Props) {
  const [selectedDay, setSelectedDay] = useState<Days>('saturday');
  const [openModal, setOpenModal] = useState(false);

  function handleViewModal(day: Days) {
    setSelectedDay(day);
    setOpenModal(true);
  }

  const available_times_days = [
    {
      name: translations.saturday,
      day: 'saturday',
      available_times: meetingsData ? meetingsData.meetingTimes.saturday?.times || [] : []
    },
    {
      name: translations.sunday,
      day: 'sunday',
      available_times: meetingsData ? meetingsData.meetingTimes.sunday?.times || [] : []
    },
    {
      name: translations.monday,
      day: 'monday',
      available_times: meetingsData ? meetingsData.meetingTimes.monday?.times || [] : []
    },
    {
      name: translations.tuesday,
      day: 'tuesday',
      available_times: meetingsData ? meetingsData.meetingTimes.tuesday?.times || [] : []
    },
    {
      name: translations.wednesday,
      day: 'wedensday',
      available_times: meetingsData ? meetingsData.meetingTimes.wedensday?.times || [] : []
    },
    {
      name: translations.thursday,
      day: 'thursday',
      available_times: meetingsData ? meetingsData.meetingTimes.thursday?.times || [] : []
    },
    {
      name: translations.friday,
      day: 'friday',
      available_times: meetingsData ? meetingsData.meetingTimes.friday?.times || [] : []
    }
  ]

  async function handleDeleteTime(timeId: number) {
    const result = await confirmDialog({
      icon: 'question',
      title: translations.removeQuestion,
      showCancelButton: true,
      cancelButtonText: translations.cancel,
      confirmButtonText: translations.confirm,
    });

    if (result.isConfirmed) {
      const response = await deleteMeetingTime(timeId);
      if (response) {
        await refetch();
        toast.success(translations.success);
      }
    }
  }

  return (
    <div className={cls.container}>
      <h4 className={cls.title}><Icon icon='uim:calender' /> {translations.title}</h4>
      <div className={cls.days__grid}>
        {
          available_times_days.map(day => (
            <div className={cls.day_container} key={day.name}>
              <p className={cls.day__name}>
                <span>{day.name}</span>
                <Tooltip title={translations.modal.title} placement={locale === 'ar' ? 'right' : 'left'}>
                  <Icon icon='basil:add-solid' onClick={() => handleViewModal(day.day as Days)} />
                </Tooltip>
              </p>
              <div className={cls.day__available_times}>
                {
                  !isLoading && day.available_times.length ?
                    day.available_times.map(time => (
                      <div className={cls.time__container} key={time.id}>
                        <Tooltip title={translations.removeTime} placement={locale === 'ar' ? 'right' : 'left'}>
                          <button className={cls.delete} onClick={() => handleDeleteTime(time.id)}>
                            <Icon icon='octicon:x-12' />
                          </button>
                        </Tooltip>
                        <p>{time.time}</p>
                        <p>{time.meeting_type}</p>
                      </div>
                    ))
                    :
                    isLoading ?
                      <>
                        <LoadingSkeleton width="100%" height="35px" rounded bordered />
                        <LoadingSkeleton width="100%" height="35px" rounded bordered />
                        <LoadingSkeleton width="100%" height="35px" rounded bordered />
                      </>
                      :
                      <p className={cls.noTimes}>{translations.noTimes}</p>
                }
              </div>
            </div>
          ))
        }
      </div>
      {
        openModal &&
        <AddTimeModal translations={translations} locale={locale} setOpenModal={setOpenModal} day={selectedDay} refetch={refetch} />
      }
    </div>
  )
}

export default Timesheet;