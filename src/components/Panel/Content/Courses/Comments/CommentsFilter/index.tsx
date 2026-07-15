'use client';
//= Components
import { Icon } from '@iconify/react';
import Input from '@/components/UIs/Input';
import DateInput from "@/components/UIs/DateInput";
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './filter.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['comments']['table'];
}

interface Fields {
  from: string;
  to: string;
  user: string;
  course: string;
}

function CommentsFilter({ locale, translations }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    from: '',
    to: '',
    user: '',
    course: ''
  });

  function handleFields(e: React.ChangeEvent<HTMLInputElement>) {
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
        <label>{translations.filter.user}</label>
        <Input placeholder={translations.filter.user} name="title" value={data.user} onChange={handleFields} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.course}</label>
        <Input placeholder={translations.filter.course} name="meta" value={data.course} onChange={handleFields} />
      </div>
      <div className={cls.button}>
        <button><Icon icon='uil:filter' /> {translations.filter.filter}</button>
      </div>
    </div>
  )
}

export default CommentsFilter;
