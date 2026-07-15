'use client';
//= Components
import { Icon } from '@iconify/react';
import SelectBox from '@/components/UIs/Select';
import DateInput from "@/components/UIs/DateInput";
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './filter.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['forums']['repliesTable'];
}

interface Fields {
  from: string;
  to: string;
  forum: string;
  status: string;
}

function RepliesTableFilter({ locale, translations }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    from: '',
    to: '',
    forum: 'all',
    status: 'all'
  });

  const statuses = [
    {
      label: translations.filter.all,
      value: 'all'
    },
    {
      label: translations.filter.published,
      value: 'published'
    },
    {
      label: translations.filter.closed,
      value: 'closed'
    }
  ]

  const forums = [
    {
      label: translations.filter.all,
      value: 'all'
    }
  ]

  function handleFields(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.getAttribute('name') as keyof Fields;
    const value = e.target.value;

    dispatch({ [name]: value });
  }

  async function handleFilter() {
    console.log(data);
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
        <label>{translations.filter.forum}</label>
        <SelectBox options={forums} name="category" defaultValue={data.forum} onChange={(e) => dispatch({ forum: e.target.value })} noFocus={true} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.status}</label>
        <SelectBox options={statuses} name="category" defaultValue={data.status} onChange={(e) => dispatch({ status: e.target.value })} noFocus={true} />
      </div>
      <div className={cls.button}>
        <button onClick={handleFilter}><Icon icon='uil:filter' /> {translations.filter.filter}</button>
      </div>
    </div>
  )
}

export default RepliesTableFilter;
