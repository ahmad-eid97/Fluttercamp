'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
//= Components
import { Icon } from '@iconify/react';
import Table from "@/components/UIs/Table";
//= Api
// import { getInstructorCourseStatistics } from '@/api';
// import useRequest from '@/api/useRequest';
//= Types
import type { Locale, Dictionary } from '@/types';
//= Styles
import cls from './invoice.module.scss';

type Props = {
  translations: Dictionary['panel']['courses']['invoice'];
  locale: Locale;
  courseId: number;
  saleId: number
}

interface Column {
  id: number;
  item: string;
  type: string;
  price: number;
  discountRate: number;
  total: number;
}

function CourseInvoice({ translations, locale, courseId, saleId }: Props) {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const Columns: ColumnDef<Column>[] = [
    {
      header: "#",
      accessorKey: 'id',
      cell: ({ row }) => (
        <p>
          {row.original.id}
        </p>
      )
    },
    {
      header: translations.item,
      accessorKey: 'item',
      cell: ({ row }) => (
        <p>
          {row.original.item}
        </p>
      )
    },
    {
      header: translations.type,
      accessorKey: 'type',
      cell: ({ row }) => (
        <p>
          {row.original.type}
        </p>
      )
    },
    {
      header: translations.price,
      accessorKey: 'price',
      cell: ({ row }) => (
        <p>
          {formatter.format(row.original.price)}
        </p>
      )
    },
    {
      header: translations.discountRate,
      accessorKey: 'discountRate',
      cell: ({ row }) => (
        <p>
          {row.original.discountRate}%
        </p>
      )
    },
    {
      header: translations.total,
      accessorKey: 'total',
      cell: ({ row }) => (
        <p>
          {formatter.format(row.original.total)}
        </p>
      )
    }
  ]

  return (
    <>
      <button className={cls.print} onClick={() => window.print()}>
        <Icon icon='lets-icons:print' /> {translations.print}
      </button>
      <div className={cls.invoice_wrapper}>
        <div className={cls.invoice}>
          <div className={cls.header}>
            <h1>FlutterCamp</h1>
            <h3>{translations.itemId}: #{saleId}</h3>
          </div>
          <div className={cls.metadata}>
            <p className={cls.info}>
              <b>{translations.student}</b>
              <span>Hassan Ali</span>
            </p>
            <div className={cls.cells}>
              <p className={cls.info}>
                <b>{translations.address}</b>
                <span>00970 Roosevelt, Ramallah, PS</span>
              </p>
              <p className={cls.info}>
                <b>{translations.purchaseDate}</b>
                <span>12 Oct 2023 | 00:33</span>
              </p>
              <p className={cls.info}>
                <b>{translations.organization}</b>
                <span>Anas Samarah</span>
              </p>
              <p className={cls.info}>
                <b>{translations.instructors}</b>
                <span>Anas Samarah</span>
              </p>
            </div>
          </div>
          <div className={cls.table}>
            <Table
              tabledata={[
                {
                  id: 2026,
                  item: "Learn to Read and Write Arabic For Beginners",
                  type: "Live class",
                  price: 800,
                  discountRate: 5,
                  total: 760
                }
              ]}
              columns={Columns}
            />
          </div>
          <div className={cls.footer}>
            <p><b>{translations.subTotal}</b> <span>{0}</span></p>
            <p><b>{translations.tax}</b> <span>{0}</span></p>
            <p><b>{translations.discount}</b> <span>{0}</span></p>
            <p><b>{translations.total}</b> <span>{0}</span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseInvoice;