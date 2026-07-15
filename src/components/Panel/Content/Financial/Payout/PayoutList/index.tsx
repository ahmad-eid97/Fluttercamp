'use client';
import { useState } from 'react';
//= Modules
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import PayoutModal from './PayoutModal';
import PayoutDetailsModal from './PayoutDetailsModal';
import Table from '@/components/UIs/Table';
import IconOptions from '@/components/UIs/IconOptions';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Dictionary, Locale, FinancialPayout } from '@/types';
//= Styles
import cls from './payoutList.module.scss';

export interface Column {
  id: number,
  instructor: {
    image: string;
    name: string;
    email: string;
  };
  payout: number;
  date: string;
}

type Props = {
  translations: Dictionary['panel']['financial']['payout']['list'];
  locale: Locale;
  isLoading: boolean;
  payouts: FinancialPayout[];
}

function PayoutList({ translations, locale, isLoading, payouts }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState<{ name: string, bank: string, accountNumber: string } | null>(null);

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const Columns: ColumnDef<FinancialPayout>[] = [
    {
      header: translations.table.account,
      accessorKey: 'account_name',
      cell: ({ row }) => (
        <div>
          {row.original.account_name || '-'}
        </div>
      )
    },
    {
      header: translations.table.bankName,
      accessorKey: 'account_bank_name',
      cell: ({ row }) => (
        <div>
          {row.original.account_bank_name || '-'}
        </div>
      )
    },
    {
      header: translations.table.amount,
      accessorKey: 'amount',
      cell: ({ row }) => (
        <div className={cls.dateCell}>
          {formatter.format(+row.original.amount)}
        </div>
      )
    },
    {
      header: translations.table.date,
      accessorKey: 'date',
      cell: ({ row }) => (
        <div className={cls.dateCell}>
          {row.original.created_at ? format(new Date(+row.original.created_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}
        </div>
      )
    },
    {
      header: translations.table.action,
      cell: ({ row }) => (
        <div className={`${cls.actions} ${locale === 'ar' ? cls.ar : ''}`}>
          <IconOptions options={[
            {
              label: translations.table.show,
              action: () => {
                setPayoutDetails({
                  name: row.original.account_name || '-',
                  bank: row.original.account_bank_name || '-',
                  accountNumber: row.original.account_number || '-',
                });
                setOpenDetailsModal(true);
              }
            },
            {
              label: translations.table.delete,
              action: () => { }
            }
          ]} />
        </div>
      ),
    },
  ]

  return (
    <div className={cls.payoutList}>
      <button onClick={() => setOpenModal(true)}>{translations.request}</button>
      {!isLoading && payouts.length ?
        <Table
          tabledata={payouts}
          columns={Columns}
        />
        :
        isLoading
          ?
          <>
            <LoadingSkeleton width="100%" height="50px" rounded />
            <LoadingSkeleton width="100%" height="50px" rounded />
            <LoadingSkeleton width="100%" height="50px" rounded />
          </>
          :
          <div className={cls.noData}>
            <p>{translations.table.empty}</p>
          </div>
      }

      {openModal && <PayoutModal setOpenModal={setOpenModal} translations={translations} locale={locale} />}
      {openDetailsModal &&
        <PayoutDetailsModal
          setOpenModal={setOpenDetailsModal}
          translations={translations}
          locale={locale}
          payoutDetails={payoutDetails}
        />}
    </div>
  )
}

export default PayoutList;