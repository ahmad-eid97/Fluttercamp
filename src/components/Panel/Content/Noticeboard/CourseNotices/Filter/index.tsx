'use client';
import React, { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import Input from '@/components/UIs/Input';
import SelectBox from '@/components/UIs/Select';
import DateInput from "@/components/UIs/DateInput";
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, NoticeboardWebinar } from '@/types';
//= Styles
import cls from './filter.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['noticeboard']['courseNotices']['filter'];
  webinars: NoticeboardWebinar[] | undefined;
  refetch: (filters?: any) => Promise<void>;
}

interface Fields {
  from: string;
  to: string;
  title: string;
  course: string;
  color: string;
}

function NoticesFilter({ locale, translations, webinars, refetch }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, dispatch, reset] = useCompoundState<Fields>({
    from: '',
    to: '',
    title: '',
    course: 'all',
    color: ''
  });

  const colors = [
    {
      label: translations.yellow,
      value: 'warning',
    },
    {
      label: translations.red,
      value: 'danger',
    },
    {
      label: translations.blue,
      value: 'info',
    },
    {
      label: translations.green,
      value: 'success',
    },
    {
      label: translations.grey,
      value: 'neutral',
    }
  ]

  const handledWebinars = Array.isArray(webinars) ? webinars.map(webinar => ({
    label: translationsHandler(webinar.translations, locale).title,
    value: webinar.id.toString()
  })) : [];

  const courses = [{
    label: translations.all,
    value: ''
  }].concat(...handledWebinars)

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

    await refetch(data);

    btn.classList.remove('loading-btn');
  }

  async function clearFilters() {
    router.replace(`${pathname}`);
    reset();
    await refetch({
      from: '',
      to: '',
      course: 'all',
      color: '',
    });
  }

  return (
    <div className={cls.filter}>
      <div className={cls.field}>
        <DateInput label={translations.from} name="from" value={data.from} onChange={handleFields} />
      </div>
      <div className={cls.field}>
        <DateInput label={translations.to} name="to" value={data.to} onChange={handleFields} />
      </div>
      <div className={cls.field}>
        <label>{translations.course}</label>
        <SelectBox options={courses} name="course" defaultValue={data.course} onChange={(e) => dispatch({ course: e.target.value })} noFocus={true} />
      </div>
      <div className={cls.field}>
        <label>{translations.title}</label>
        <Input placeholder={translations.title} name="title" value={data.title} onChange={handleFields} />
      </div>
      <div className={cls.field}>
        <label>{translations.color}</label>
        <SelectBox options={colors} name="color" defaultValue={data.color} onChange={(e) => dispatch({ color: e.target.value })} noFocus={true} />
      </div>
      <div className={cls.button}>
        {
          Array.from(searchParams.entries()).length ?
            <span onClick={clearFilters}>{translations.clear}</span> : null
        }
        <button onClick={handleFilter}><Icon icon='uil:filter' /> {translations.filter}</button>
      </div>
    </div>
  )
}

export default NoticesFilter;
