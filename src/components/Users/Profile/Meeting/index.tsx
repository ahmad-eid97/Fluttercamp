'use client';
import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
//= Api
import { getUserMeetings, reserveAMeeting } from "@/api";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import type { DetailedUser, Time } from '@/types';
//= Styles
import cls from "./meeting.module.scss";

type Props = {
  user: DetailedUser;
}

function ReserveAMeeting({ user }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.instructorPage;

  const [data, setData] = useState({
    date: format(new Date(), 'yyyy-MM-dd', { locale: locale === 'ar' ? ar : enUS }),
    isGroup: false,
    studentsCount: 1,
    type: 'online'
  });
  const [meetings, setMeetings] = useState<Time[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Time>();

  useEffect(() => {
    getDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getDates(date = new Date()) {
    const today = format(date, 'yyyy-MM-dd');
    const response = await getUserMeetings(user.id, today);
    if (response) setMeetings(response);
  }

  async function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
    setData(p => ({ ...p, date: format(new Date(event.target.value), 'yyyy-MM-dd', { locale: locale === 'ar' ? ar : enUS }) }));
    await getDates(new Date(event.target.value));
  }

  async function handleReserve(event: React.MouseEvent) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.setAttribute('disabled', 'disabled');
    btn.classList.add(cls.disabled);

    if (!selectedMeeting) {
      btn.removeAttribute('disabled');
      btn.classList.remove(cls.disabled);
      toast.error(translations.errors.dateTime);
      return;
    }

    if (data.isGroup) {
      const max = data.type === 'online' ? +user.meeting.online_group_max_student : +user.meeting.in_person_group_max_student;
      if (data.studentsCount > max) {
        btn.removeAttribute('disabled');
        btn.classList.remove(cls.disabled);
        toast.error(translations.errors.max);
        return;
      }

      const min = data.type === 'online' ? +user.meeting.online_group_min_student : +user.meeting.in_person_group_min_student;
      if (data.studentsCount < min) {
        btn.removeAttribute('disabled');
        btn.classList.remove(cls.disabled);
        toast.error(translations.errors.min);
        return;
      }
    }

    const response = await reserveAMeeting({
      time_id: selectedMeeting.id,
      date: format(new Date(data.date), 'yyyy-MM-dd', { locale: locale === 'ar' ? ar : enUS }),
      meeting_type: data.type as ("online" | "in_person"),
      student_count: data.studentsCount
    });

    if (response && response.success) toast.success(translations.content.done);

    btn.removeAttribute('disabled');
    btn.classList.remove(cls.disabled);
  }

  return (
    <div className={cls.meeting}>
      {
        user.meeting_status === 'available'
          ?
          <form>
            <div className={cls.formHead}>
              <span className={cls.iconTile}><Icon icon="solar:calendar-mark-bold-duotone" /></span>
              <h3>
                {translations.content.reserveAMeetingInstructor}
              </h3>
            </div>
            <div className={cls.formGroup}>
              <label><Icon icon="mdi:virtual-meeting" /> {translations.content.pickADate}</label>
              <input type="date" value={data.date} onChange={e => handleChangeDate(e)} />
            </div>
            <div className={cls.formGroup}>
              <label><Icon icon="uiw:date" /> {translations.content.pickTime} <span>({user.meeting.gmt})</span></label>
              <div className={cls.meetingsList}>
                {
                  meetings.length ? meetings.map(meeting => (
                    <div className={`${cls.meetingsItem} ${selectedMeeting?.id === meeting.id ? cls.selected : ''}`} key={meeting.id} onClick={() => setSelectedMeeting(meeting)}>
                      <span>{meeting.time}</span>
                    </div>
                  ))
                    :
                    <p>No meetings available on the selected date</p>
                }
              </div>
            </div>
            <div className={cls.formGroup}>
              <label><Icon icon="mdi:virtual-meeting" /> {translations.content.meetingType}</label>
              <select value={data.type} onChange={e => setData(p => ({ ...p, type: e.target.value }))}>
                <option value="online">{translations.content.online}</option>
                {
                  user.meeting.in_person === "1" &&
                  <option value="in_person">{translations.content.offline}</option>
                }
              </select>
            </div>
            {
              user.meeting.group_meeting === "1" &&
              <div className={cls.formGroup}>
                <label htmlFor="group-meeting"><Icon icon="fluent-mdl2:group" /> {translations.content.groupMeeting}</label>
                <input id="group-meeting" type="checkbox" className="ui-checkbox" checked={data.isGroup} onChange={e => setData(p => ({ ...p, isGroup: e.target.checked }))} />
              </div>
            }
            {
              data.isGroup &&
              <div className={cls.formGroup}>
                <label>
                  <Icon icon="ci:users-group" /> {translations.content.studentsCount}
                  {
                    data.type === 'online' ?
                      <span>(Min: {user.meeting.online_group_min_student}, Max: {user.meeting.online_group_max_student})</span>
                      :
                      <span>(Min: {user.meeting.in_person_group_min_student}, Max: {user.meeting.in_person_group_max_student})</span>
                  }
                </label>
                <input type="number" value={data.studentsCount.toString()} onChange={e => setData(p => ({ ...p, studentsCount: e.target.valueAsNumber }))} />
              </div>
            }
            <button className={cls.btn} onClick={handleReserve}>
              <Icon icon="eos-icons:three-dots-loading" />
              <span>{translations.content.reserveAMeeting}</span>
            </button>
            <hr />
            <div className={cls.metadata}>
              <p>{translations.content.onlineRate} ${user.meeting.price}</p>
              <p>{translations.content.onlineGroupRate} ${user.meeting.online_group_amount}</p>
              <p>{translations.content.inPersonRate} ${user.meeting.in_person_price}</p>
              <p>{translations.content.inPersonGroupRate} is ${user.meeting['in_person_group_amount ']}</p>
            </div>
          </form>
          :
          <p className={cls.noData}>{translations.content.noMeetings}</p>
      }
    </div>
  )
}

export default ReserveAMeeting