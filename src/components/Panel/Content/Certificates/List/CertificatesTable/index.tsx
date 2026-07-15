'use client';
import React from 'react';
//= Modules
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
import { ColumnDef } from '@tanstack/react-table';
//= Components
import Table from '@/components/UIs/Table';
import CertificatesFilter from '../CertificatesFilter';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import type { Dictionary, Locale, Certificate } from '@/types';
//= Styles
import cls from './certificatesTable.module.scss';

type Props = {
  translations: Dictionary['panel']['certificates']['table'];
  locale: Locale;
  isLoading: boolean;
  certificates: Certificate[];
}

function CertificatesTable({ translations, locale, isLoading, certificates }: Props) {

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
      header: translations.date,
      accessorKey: 'date',
      cell: ({ row }) => (
        <div>
          {row.original.created_at ? format(new Date(+row.original.created_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    },
  ]

  return (
    <div className={cls.certificates}>
      <CertificatesFilter locale={locale} translations={translations} />
      {!isLoading && certificates && certificates.length ?
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

export default CertificatesTable;
