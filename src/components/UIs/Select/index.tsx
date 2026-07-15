'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
//= I18n
import useDictionary from "@/dictionaries/clientDictionary";
//= Styles
import cls from './select.module.scss';

type Props = {
  icon?: string;
  options: Option[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  disabled?: boolean;
  defaultValue?: string;
  label?: string;
  noFocus?: boolean
}

type Option = {
  value: string | number;
  label: string;
  hidden?: boolean;
  isHeader?: boolean;
}

function SelectBox({ label, icon, options, disabled, defaultValue, onChange, name, noFocus }: Props) {
  const { locale } = useDictionary();

  return (
    <div className={`${cls.box} ${locale === 'ar' ? cls.ar : ''} ${noFocus ? cls.noFocus : ''}`} data-label={label ? label : ''}>
      {icon && <Icon icon={icon} />}
      <select className={cls.select_box} name={name} onChange={onChange} disabled={disabled} value={defaultValue}>
        {
          options.map((option) => (
            option.isHeader ?
              <optgroup key={option.value} label={option.label}></optgroup>
              :
              <option value={option.value} key={option.value} hidden={option.hidden}>{option.label}</option>
          ))
        }
      </select>
    </div>
  )
}

export default SelectBox