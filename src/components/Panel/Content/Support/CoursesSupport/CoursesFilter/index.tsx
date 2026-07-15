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
import cls from './coursesFilter.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['support']['courses']['table'];
}

interface Fields {
  from: string;
  to: string;
  courses: string;
  quiz: string;
  grade: string;
}

function CoursesFilter({ locale, translations }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    from: '',
    to: '',
    courses: '',
    quiz: '',
    grade: ''
  });

  const UserTypes = [
    {
      label: translations.filter.student,
      value: 'student'
    },
    {
      label: translations.filter.instructor,
      value: 'instructor'
    },
  ]

  const courses = [
    { value: 'Course 1', label: 'Course 1' },
    { value: 'Course 2', label: 'Course 2' },
    { value: 'Course 3', label: 'Course 3' },
  ]

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
        <label>{translations.filter.userType}</label>
        <SelectBox name="quiz" options={UserTypes} defaultValue={data.quiz} onChange={handleFields} noFocus={true} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.courses}</label>
        <SearchSelect placeholder={translations.filter.courses} options={courses} selectedOption={data.courses} setSelectedOption={(value) => dispatch({ courses: value.value })} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.status}</label>
        <SelectBox name="quiz" options={statusList} defaultValue={data.quiz} onChange={handleFields} noFocus={true} />
      </div>
      <div className={cls.button}>
        <button><Icon icon='uil:filter' /> {translations.filter.filter}</button>
      </div>
    </div>
  )
}

export default CoursesFilter;