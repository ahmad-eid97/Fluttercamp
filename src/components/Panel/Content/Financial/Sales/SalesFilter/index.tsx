import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import DateInput from "@/components/UIs/DateInput";
import SelectBox from '@/components/UIs/Select';
import SearchSelect from '@/components/UIs/SearchSelect';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './salesFilter.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['financial']['sales'];
}

interface Fields {
  from: string;
  to: string;
  liveClass: string;
  student: string;
  type: string;
}

function SalesFilter({ locale, translations }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    from: '',
    to: '',
    liveClass: '',
    student: '',
    type: ''
  });

  const quizzes = [
    { value: '1', label: 'Quiz 1' },
    { value: '2', label: 'Quiz 2' },
    { value: '3', label: 'Quiz 3' },
  ]

  const typeList = [
    { value: 'live_class', label: translations.filter.liveClass },
    { value: 'meeting', label: translations.filter.meeting },
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
        <label>{translations.filter.liveClass}</label>
        <SearchSelect placeholder={translations.filter.liveClass} options={[]} selectedOption={data.liveClass} setSelectedOption={(value) => dispatch({ liveClass: value.value })} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.student}</label>
        <SearchSelect placeholder={translations.filter.student} options={[]} selectedOption={data.student} setSelectedOption={(value) => dispatch({ student: value.value })} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.type}</label>
        <SelectBox name="type" options={typeList} defaultValue={data.type} onChange={handleFields} noFocus={true} />
      </div>
      <div className={cls.button}>
        <button><Icon icon='uil:filter' /> {translations.filter.filter}</button>
      </div>
    </div>
  )
}

export default SalesFilter;