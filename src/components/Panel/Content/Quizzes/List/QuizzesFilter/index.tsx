import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import Input from '@/components/UIs/Input';
import DateInput from "@/components/UIs/DateInput";
import SelectBox from '@/components/UIs/Select';
import SearchSelect from '@/components/UIs/SearchSelect';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './quizzesFilter.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['quizzes']['list'];
}

interface Fields {
  from: string;
  to: string;
  course: string;
  total: string;
  status: string;
}

function QuizzesFilter({ locale, translations }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    from: '',
    to: '',
    course: '',
    total: '',
    status: ''
  });

  const quizzes = [
    { value: '1', label: 'Quiz 1' },
    { value: '2', label: 'Quiz 2' },
    { value: '3', label: 'Quiz 3' },
  ]

  const statusList = [
    { value: 'active', label: translations.filter.active },
    { value: 'inactive', label: translations.filter.inactive },
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
        <label>{translations.filter.course}</label>
        <SearchSelect placeholder={translations.filter.course} options={quizzes} selectedOption={data.course} setSelectedOption={(value) => dispatch({ course: value.value })} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.total}</label>
        <Input placeholder={translations.filter.total} name="total" value={data.total} onChange={handleFields} />
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

export default QuizzesFilter;