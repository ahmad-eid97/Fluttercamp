import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import DateInput from "@/components/UIs/DateInput";
import SelectBox from '@/components/UIs/Select';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './ticketsFilter.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['support']['tickets']['table'];
}

interface Fields {
  from: string;
  to: string;
  department: string;
  status: string;
}

function TicketsFilter({ locale, translations }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    from: '',
    to: '',
    department: '',
    status: ''
  });

  const statusList = [
    {
      label: translations.filter.open,
      value: 'open'
    },
    {
      label: translations.filter.close,
      value: 'close'
    },
    {
      label: translations.filter.replied,
      value: 'replied'
    },
  ]

  function handleFields(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = e.target.getAttribute('name') as keyof Fields;
    const value = e.target.value;

    dispatch({ [name]: value });
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
        <label>{translations.filter.department}</label>
        <SelectBox name="department" options={[]} defaultValue={data.department} onChange={handleFields} noFocus={true} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.status}</label>
        <SelectBox name="status" options={statusList} defaultValue={data.status} onChange={handleFields} noFocus={true} />
      </div>
      <div className={cls.button}>
        <button><Icon icon='uil:filter' /> {translations.filter.filter}</button>
      </div>
    </div>
  )
}

export default TicketsFilter;