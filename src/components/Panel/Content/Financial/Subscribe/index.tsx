'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import LoadingSkeleton from '@/components/UIs/Skeleton';
import StatisticsBoxColumn from '@/components/UIs/Statistics/SingleBoxColumn';
//= Api
import { getSubscriptionPlans } from '@/api';
import useRequest from '@/api/useRequest';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './subscribe.module.scss';

type Props = {
  translations: Dictionary['panel']['financial']['subscribe'];
  locale: Locale;
}

function SubscribePlans({ translations, locale }: Props) {
  const router = useRouter();
  const { data, isLoading } = useRequest(getSubscriptionPlans);

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  async function handleSubscribe(event: React.MouseEvent<HTMLButtonElement>, id: number) {
    event.preventDefault();
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    router.push(`/cart/checkout/subscribe/${id}`);

    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.subscribe}>
      <div className={cls.myPlan}>
        {
          data?.subscribed ?
            <div className={cls.plan_content}>
              <StatisticsBoxColumn
                title={data.subscribed_title || ''}
                number={translations.activePlan || ''}
                icon={<Icon icon='icon-park-twotone:plan' />}
              />
              <StatisticsBoxColumn
                title={translations.days_remained || ''}
                number={data.days_remained || 0}
                icon={<Icon icon='lets-icons:date-today-duotone' />}
              />
              <StatisticsBoxColumn
                title={translations.remained_downloads}
                number={data.remained_downloads || 0}
                icon={<Icon icon='solar:download-bold-duotone' />}
              />
            </div>
            :
            <p className={cls.noData}>{translations.noPlan}</p>
        }
      </div>
      <h4>{translations.title}</h4>
      <div className={cls.plans}>
        {
          !isLoading && data?.subscribes?.length ?
            data?.subscribes?.map(plan => (
              <div className={cls.item} key={plan.id}>
                {
                  plan.is_popular &&
                  <span className={cls.isPopular}>{translations.popular}</span>
                }
                <div className={cls.badge}>
                  <img src={getImageUrl(plan.image || '')} alt="plan image" />
                </div>
                <div className={cls.content}>
                  <h4>{plan.title}</h4>
                  <p>{plan.description}</p>
                  <p className={cls.price}>{formatter.format(+plan.price)}</p>
                  <ul>
                    <li><Icon icon="uim:calender" /> {plan.days} {translations.days}</li>
                    <li><Icon icon="solar:ticket-bold-duotone" /> {plan.usable_count} {translations.subscribes}</li>
                  </ul>
                  <button disabled={data?.subscribed} onClick={(event) => handleSubscribe(event, plan.id)}>{translations.subscribe}</button>
                </div>
              </div>
            ))
            :
            !isLoading ?
              <p className={cls.noData}>
                {translations.empty}
              </p>
              :
              <>
                <LoadingSkeleton width="200px" height="400px" rounded />
                <LoadingSkeleton width="200px" height="400px" rounded />
                <LoadingSkeleton width="200px" height="400px" rounded />
              </>
        }
      </div>
    </div>
  )
}

export default SubscribePlans
