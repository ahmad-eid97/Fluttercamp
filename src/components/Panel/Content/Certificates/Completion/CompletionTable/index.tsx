'use client';
import React from 'react';
//= Modules
import { ColumnDef } from '@tanstack/react-table';
//= Components
import Table from '@/components/UIs/Table';
import IconOptions from '@/components/UIs/IconOptions';
import CompletionFilter from '../CompletionFilter';
//= Types
import type { Dictionary, Locale, Certificate } from '@/types';
//= Styles
import cls from './completionTable.module.scss';
import LoadingSkeleton from '@/components/UIs/Skeleton';

type Props = {
  translations: Dictionary['panel']['completion']['table'];
  locale: Locale;
  isLoading: boolean;
  certificates: Certificate[]
}

function CompletionTable({ translations, locale, isLoading, certificates }: Props) {

  const Columns: ColumnDef<Certificate>[] = [
    {
      header: translations.quiz,
      accessorKey: 'webinar_title',
      cell: ({ row }) => (
        <div className={cls.detailsCell}>
          <p>{row.original.webinar_title}</p>
          {/* <span>{row.original.details.description}</span> */}
        </div>
      ),
    },
    {
      header: translations.grade,
      accessorKey: 'pass_mark',
      cell: ({ row }) => (
        <div>
          {row.original.pass_mark}
        </div>
      )
    },
    {
      header: translations.average,
      accessorKey: 'average_grade',
      cell: ({ row }) => (
        <div>
          {row.original.average_grade}
        </div>
      )
    },
    {
      header: translations.generatedCertificates,
      accessorKey: 'certificates_count',
      cell: ({ row }) => (
        <div>
          {row.original.certificates_count}
        </div>
      )
    },
    {
      header: translations.action,
      cell: ({ row }) => (
        <div className={`${cls.actions} ${locale === 'ar' ? cls.ar : ''}`}>
          <IconOptions className={cls.iconOptions} options={[
            {
              label: translations.show,
              action: () => { }
            },
            {
              label: translations.delete,
              action: () => { }
            }
          ]} />
        </div>
      ),
    },
  ]

  return (
    <div className={cls.certificates}>
      <CompletionFilter locale={locale} translations={translations} />
      {certificates.length && !isLoading ?
        <Table
          tabledata={certificates}
          columns={Columns}
        />
        :
        isLoading ?
          <>
            <LoadingSkeleton width="100%" height="50px" rounded />
            <LoadingSkeleton width="100%" height="50px" rounded />
            <LoadingSkeleton width="100%" height="50px" rounded />
          </>
          :
          <div className={cls.noData}>
            <p>{translations.empty}</p>
          </div>
      }
    </div>
  )
}

export default CompletionTable;
