'use client';
//= Styles
import cls from './textArea.module.scss';

type Props = {
  label?: string
  placeholder?: string;
  height?: string;
  name: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean
}

function TextArea({ label, placeholder, name, value, onChange, disabled }: Props) {

  return (
    <div className={cls.formGroup}>
      {label && <label htmlFor={`input-${name}`}>{label}</label>}
      <div className={cls.field}>
        <textarea disabled={disabled} id={`input-${name}`} placeholder={placeholder || ""} name={name} value={value} onChange={onChange} />
      </div>
    </div>
  )
}

export default TextArea;
