'use client';
import { useRef } from 'react';
//= Components
import { Icon } from '@iconify/react';
import Captcha from '@/components/UIs/Recaptcha';
//= Styles
import cls from './input.module.scss';

type Props = {
  type?: string
  icon?: string
  label?: string
  placeholder?: string
  name: string
  value?: string
  disabled?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  withCaptcha?: boolean;
}

function Input({ type, icon, label, placeholder, disabled, name, value, withCaptcha, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cls.formGroup}>
      {label && <label htmlFor={`input-${name}`}>{label}</label>}
      <div className={cls.field}>
        {icon && <div className={cls.icon} onClick={() => inputRef.current?.focus()}>{<Icon icon={icon} />}</div>}
        <input type={type || "text"} id={`input-${name}`} name={name} placeholder={placeholder || ""} ref={inputRef} value={value || ''} onChange={onChange} disabled={disabled} />
        {withCaptcha && <Captcha />}
      </div>
    </div>
  )
}

export default Input
