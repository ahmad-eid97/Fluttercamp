import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import DateInput from "@/components/UIs/DateInput";
import SelectBox from '@/components/UIs/Select';
import SearchSelect from '@/components/UIs/SearchSelect';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, ResultsResponse } from '@/types';
//= Styles
import cls from './resultsFilter.module.scss';
import { translationsHandler } from '@/utils/translationsHandler';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['quizzes']['results'];
  data: ResultsResponse | undefined;
}

interface Fields {
  from: string;
  to: string;
  course: string;
  student: string;
  status: string;
}

function ResultsFilter({ locale, translations, data }: Props) {
  const [fields, dispatch] = useCompoundState<Fields>({
    from: '',
    to: '',
    course: '',
    student: '',
    status: ''
  });

  const quizzes = [
    { value: '1', label: 'Quiz 1' },
    { value: '2', label: 'Quiz 2' },
    { value: '3', label: 'Quiz 3' },
  ]

  const statusList = [
    { value: 'passed', label: translations.filter.passed },
    { value: 'failed', label: translations.filter.failed },
    { value: 'waiting', label: translations.filter.waiting },
  ]

  function handleFields(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = e.target.getAttribute('name') as keyof Fields;
    const value = e.target.value;

    dispatch({ [name]: value });
  }

  return (
    <div className={cls.filter}>
      <div className={cls.field}>
        <DateInput label={translations.filter.from} name="from" value={fields.from} onChange={handleFields} />
      </div>
      <div className={cls.field}>
        <DateInput label={translations.filter.to} name="to" value={fields.to} onChange={handleFields} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.course}</label>
        <SearchSelect placeholder={translations.filter.course} options={Array.isArray(data?.quizzes) ? data.quizzes.map(quiz => ({ label: translationsHandler(quiz.translations, locale).title, value: `${quiz.id}` })) : []} selectedOption={fields.course} setSelectedOption={(value) => dispatch({ course: value.value })} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.student}</label>
        <SearchSelect placeholder={translations.filter.student} options={Array.isArray(data?.allStudents) ? data.allStudents.map(student => ({ label: student.full_name, value: `${student.id}` })) : []} selectedOption={fields.student} setSelectedOption={(value) => dispatch({ student: value.value })} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.status}</label>
        <SelectBox name="status" options={statusList} defaultValue={fields.status} onChange={handleFields} noFocus={true} />
      </div>
      <div className={cls.button}>
        <button><Icon icon='uil:filter' /> {translations.filter.filter}</button>
      </div>
    </div>
  )
}

export default ResultsFilter;