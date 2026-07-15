'use client';
//= I18n
import useDictionary from "@/dictionaries/clientDictionary";
//= Styles
import cls from './timeInput.module.scss';

type Props = {
  label: string;
  value: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TimeInput({ label, value, name, onChange }: Props) {
  const { locale } = useDictionary();

  return (
    <div className={cls.formGroup}>
      <label>{label}</label>
      <div className={`${cls.field} ${locale === 'ar' ? cls.ar : ''}`}>
        <input type="time" value={value} onChange={onChange} name={name || ''} />
      </div>
    </div>
  )
}

export default TimeInput;
