'use client';
//= Components
import { Icon } from '@iconify/react';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Api
import { listAllBankAccounts } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './bankAccounts.module.scss';

type Props = {
  translations: Dictionary['panel']['financial']['account']['accounts'];
  locale: Locale
}

function BankAccounts({ translations, locale }: Props) {
  const { data, isLoading } = useRequest(listAllBankAccounts);

  return (
    <div className={cls.bankAccounts}>
      <h4>{translations.title}</h4>
      <div className={cls.items}>
        {
          !isLoading && data ?
            (data.data?.offlineBanks || []).map((bank, index) => (
              <div className={cls.item} key={index}>
                <div className={cls.badge}>
                  <Icon icon="emojione-monotone:bank" />
                </div>
                <div className={cls.content}>
                  <ul>
                    <li>{translations.name}: <span>{translationsHandler(bank.translations, locale).title}</span></li>
                    <li>{translations.account}: <span>{translationsHandler(bank.translations, locale).offline_bank_id}</span></li>
                  </ul>
                </div>
              </div>
            ))
            :
            isLoading ?
              <>
                <LoadingSkeleton width='100%' height='300px' rounded />
                <LoadingSkeleton width='100%' height='300px' rounded />
                <LoadingSkeleton width='100%' height='300px' rounded />
              </>
              :
              <div className={cls.emptyData}>
                <p>{translations.empty}</p>
              </div>
        }
      </div>
    </div>
  )
}

export default BankAccounts
