'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import SelectBox from '@/components/UIs/Select';
import SearchSelect from '@/components/UIs/SearchSelect';
import DateInput from "@/components/UIs/DateInput";
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './filter.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['meetings']['list'];
  refetch: (filters?: any) => Promise<void>;
  users: {
    id: number;
    full_name: string;
    avatar: string;
    avatar_settings: string;
    email: string;
  }[];
  type: 'requests' | 'reservations';
}

interface Fields {
  from: string;
  to: string;
  day: string;
  instructor_id: string;
  student_id: string;
  status: string;
}

function MeetingsFilter({ locale, translations, users, refetch, type }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [userOptions, setUserOptions] = useState([
    {
      label: translations.filter.statuses.all,
      value: 'all'
    }
  ]);
  const [data, dispatch, reset] = useCompoundState<Fields>({
    from: '',
    to: '',
    day: 'all',
    instructor_id: 'all',
    student_id: 'all',
    status: 'All'
  });

  /**
   * Handle users list
   */
  useEffect(() => {
    const uniqueIds: number[] = [];
    if (users && users.length) {
      const usersAsOptions = [
        {
          label: translations.filter.statuses.all,
          value: 'all'
        },
        ...(users.filter(user => {
          const isDuplicate = uniqueIds.includes(user.id);

          if (!isDuplicate) {
            uniqueIds.push(user.id);
            return true;
          }

          return false;
        }).map(user => ({
          label: user.full_name,
          value: user.id.toString()
        })))]

      setUserOptions(usersAsOptions);
    }
  }, [users, translations.filter.statuses.all]);

  const statuses = [
    {
      label: translations.filter.statuses.all,
      value: 'All'
    },
    {
      label: translations.filter.statuses.pending,
      value: 'pending'
    },
    {
      label: translations.filter.statuses.open,
      value: 'open'
    },
    {
      label: translations.filter.statuses.finished,
      value: 'finished'
    }
  ]

  const days = [
    {
      label: translations.filter.days.all,
      value: 'all'
    },
    {
      label: translations.filter.days.saturday,
      value: 'saturday'
    },
    {
      label: translations.filter.days.sunday,
      value: 'sunday'
    },
    {
      label: translations.filter.days.monday,
      value: 'monday'
    },
    {
      label: translations.filter.days.tuesday,
      value: 'tuesday'
    },
    {
      label: translations.filter.days.wednesday,
      value: 'wednesday'
    },
    {
      label: translations.filter.days.thursday,
      value: 'thursday'
    },
    {
      label: translations.filter.days.friday,
      value: 'friday'
    }
  ]

  function handleFields(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.getAttribute('name') as keyof Fields;
    const value = e.target.value;

    dispatch({ [name]: value });
  }

  useEffect(() => {
    checkURLSearchParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkURLSearchParams() {
    Array.from(searchParams.entries()).forEach(param => {
      dispatch({ [param[0] as keyof Fields]: param[1] });
    });
  }

  function handleChangeURL() {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'student_id' && type === 'reservations') return;
      if (key === 'instructor_id' && type === 'requests') return;
      current.set(key, value);
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`);
  }

  async function handleFilter(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    handleChangeURL();

    let filters;
    if (type === 'requests') {
      filters = {
        from: data.from,
        to: data.to,
        day: data.day,
        student_id: data.student_id,
        status: data.status
      }
    } else {
      filters = {
        from: data.from,
        to: data.to,
        day: data.day,
        instructor_id: data.instructor_id,
        status: data.status
      }
    }

    await refetch(filters);

    btn.classList.remove('loading-btn');
  }

  async function clearFilters() {
    router.replace(`${pathname}`);
    reset();
    await refetch({
      from: '',
      to: '',
      day: 'all',
      instructor_id: 'all',
      student_id: 'all',
      status: 'All'
    });
  }

  return (
    <div className={cls.filter}>
      <div className={cls.field}>
        <DateInput label={translations.filter.from} name="from" value={data.from} onChange={handleFields} />
      </div>
      <div className={cls.field}>
        <DateInput label={translations.filter.to} name="to" value={data.to} onChange={handleFields} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.day}</label>
        <SelectBox options={days} name="day" defaultValue={data.day} onChange={(e) => dispatch({ day: e.target.value })} noFocus={true} />
      </div>
      {
        type === 'requests' ?
          <div className={cls.field}>
            <label>{translations.filter.student}</label>
            <SearchSelect placeholder={translations.filter.student} options={userOptions} selectedOption={data.student_id} setSelectedOption={(value) => dispatch({ student_id: value.value })} />
          </div>
          :
          <div className={cls.field}>
            <label>{translations.filter.instructor}</label>
            <SearchSelect placeholder={translations.filter.instructor} options={userOptions} selectedOption={data.instructor_id} setSelectedOption={(value) => dispatch({ instructor_id: value.value })} />
          </div>
      }
      <div className={cls.field}>
        <label>{translations.filter.status}</label>
        <SelectBox options={statuses} name="statuses" defaultValue={data.status} onChange={(e) => dispatch({ status: e.target.value })} noFocus={true} />
      </div>
      <div className={cls.button}>
        {
          Array.from(searchParams.entries()).length ?
            <span onClick={clearFilters}>{translations.filter.clear}</span> : null
        }
        <button onClick={handleFilter}><Icon icon='uil:filter' /> {translations.filter.filter}</button>
      </div>
    </div>
  )
}

export default MeetingsFilter;
