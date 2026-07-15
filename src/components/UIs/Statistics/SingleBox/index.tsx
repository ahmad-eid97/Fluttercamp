'use client';
import React from 'react';
import Link from 'next/link';
//= Styles
import cls from './single-box.module.scss';

type Props = {
  title: string;
  number: number | string;
  icon: React.ReactNode;
  link?: string;
}

function StatisticsBox({ title, number, icon, link }: Props) {
  return (
    <div className={`${cls.box} ${link ? cls.hoverable : ''}`}>
      {
        link ?
          <Link href={link}>
            <div className={cls.icon}>{icon}</div>
            <div className={cls.content}>
              <h2>{number}</h2>
              <p>{title}</p>
            </div>
          </Link>
          :
          <button>
            <div className={cls.icon}>{icon}</div>
            <div className={cls.content}>
              <h2>{number}</h2>
              <p>{title}</p>
            </div>
          </button>
      }
    </div>
  )
}

export default StatisticsBox