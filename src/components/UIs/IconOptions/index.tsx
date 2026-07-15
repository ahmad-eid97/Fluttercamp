'use client';
import { useState } from 'react';
import Link from 'next/link';
//= Components
import { Icon } from '@iconify/react';
// import { Tooltip } from '@mui/material';
//= I18n
import useDictionary from "@/dictionaries/clientDictionary";
//= Styles
import cls from './iconOptions.module.scss';


type Option = {
  label: string;
  action: string | (() => void);
  hidden?: boolean;
}

type Props = {
  options: Option[];
  className?: string;
  tooltip?: string;
  icon?: string;
  rtl?: boolean;
}

function IconOptions({ options, className, tooltip, icon }: Props) {
  const { locale } = useDictionary();
  const [openSelect, setOpenSelect] = useState(false);

  const chooseOption = (option: Option) => {
    if (typeof option.action === 'function') option.action();
    setOpenSelect(false);
  }

  return (
    <>
      {openSelect && <div className={cls.overlay} onClick={() => setOpenSelect(false)}></div>}
      <div className={`${cls.box} ${className ? className : ''} ${locale === 'ar' ? cls.rtl : ''}`} data-label="icon">
        <button onClick={() => setOpenSelect(!openSelect)}>
          {/* <Tooltip title={tooltip}> */}
          <Icon icon={icon || 'tabler:dots-vertical'} />
          {/* </Tooltip> */}
          {openSelect &&
            <div className={cls.selectArea}>
              {options.map((option) => (
                !option.hidden &&
                (typeof option.action === 'string' ?
                  <Link href={option.action} key={option.label}>
                    {option.label}
                  </Link>
                  :
                  <p onClick={() => chooseOption(option)} key={option.label}>{option.label}</p>)
              ))}
            </div>
          }
        </button>
      </div>
    </>
  )
}

export default IconOptions;