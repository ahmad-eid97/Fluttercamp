import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import Input from '@/components/UIs/Input';
import DateInput from "@/components/UIs/DateInput";
import SelectBox from '@/components/UIs/Select';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './certificatesFilter.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['certificates']['table'];
}

interface Fields {
  from: string;
  to: string;
  course: string;
  quiz: string;
  grade: string;
}

function CertificatesFilter({ locale, translations }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    from: '',
    to: '',
    course: '',
    quiz: '',
    grade: ''
  });

  const courses = [
    { value: '1', label: 'Course 1' },
    { value: '2', label: 'Course 2' },
    { value: '3', label: 'Course 3' },
  ]

  const quizzes = [
    { value: '1', label: 'Quiz 1' },
    { value: '2', label: 'Quiz 2' },
    { value: '3', label: 'Quiz 3' },
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
        <SelectBox name="course" options={courses} defaultValue={data.course} onChange={handleFields} noFocus={true} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.quiz}</label>
        <SelectBox name="quiz" options={quizzes} defaultValue={data.quiz} onChange={handleFields} noFocus={true} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.grade}</label>
        <Input placeholder={translations.filter.grade} name="grade" value={data.grade} onChange={handleFields} />
      </div>
      <div className={cls.button}>
        <button><Icon icon='uil:filter' /> {translations.filter.filter}</button>
      </div>
    </div>
  )
}

export default CertificatesFilter;