import React from 'react';
import Link from 'next/link';
//= Styles
import cls from './single-box-column.module.scss';

type Props = {
  title: string;
  number: number | string;
  icon: React.ReactNode;
  smallBox?: boolean;
  bottomButton?: {
    href: string;
    text: string;
  };
  bottomValue?: {
    text: string;
    value: number
  }
}

function StatisticsBoxColumn({ title, number, icon, bottomButton, bottomValue, smallBox }: Props) {
  return (
    <div className={`${cls.box_column} ${bottomButton ? '' : cls.noBottom} ${smallBox ? cls.smallBox : ''}`}>
      <div className={cls.top}>
        <div className={cls.icon}>{icon}</div>
        <div className={cls.info}>
          <h2>{number}</h2>
          <p>{title}</p>
        </div>
      </div>
      {
        bottomValue &&
        <p className={cls.bottomValue}><span>{bottomValue.text}</span> <b>{bottomValue.value}</b></p>
      }
      {
        bottomButton &&
        <Link href={bottomButton.href}>{bottomButton.text}</Link>
      }
    </div>
  )
}

export default StatisticsBoxColumn