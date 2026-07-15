'use client';
//= I18n
import useDictionary from "@/dictionaries/clientDictionary";
//= Styles
import cls from './dateTimeInput.module.scss';

type Props = {
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function DateTimeInput({ label, value, name, onChange }: Props) {
  const { locale } = useDictionary();

  return (
    <div className={cls.formGroup}>
      <label htmlFor={`datepicker-${name}`}>{label}</label>
      <div className={`${cls.field} ${locale === 'ar' ? cls.ar : ''}`}>
        <input type="datetime-local" value={value} onChange={onChange} id={`datepicker-${name}`} />
      </div>
    </div>
  )
}

export default DateTimeInput;
