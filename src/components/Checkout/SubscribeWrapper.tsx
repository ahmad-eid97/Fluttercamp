'use client';
import React from 'react';
//= Components
import Container from "@mui/material/Container";
import { Icon } from "@iconify/react";
import LoadingSkeleton from "@/components/UIs/Skeleton";
import PaymentGateway from './PaymentGateway';
import { icons } from '@/lib/icons';
//= Api
import { getCheckoutData, PaySubscriptionPlan } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale, PaySubscriptionPlanResponse, GetCheckoutResponse } from '@/types';
import type { Response } from '@/api/request.handler'
//= Styles
import cls from './checkout_wrapper.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['checkoutPage']['items'];
  subscribeId: string;
}

function CheckoutWrapper({ locale, translations, subscribeId }: Props) {
  const { data, isLoading } = useRequest(() => PaySubscriptionPlan(+subscribeId));
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const paymentData = data?.data;

  return (
    <section className={cls.checkout_wrapper}>
      <Container maxWidth="xl">
        <div className={cls.grid}>
          <div className={cls.main}>
            {
              !isLoading && paymentData ?
                <div className={cls.items}>
                  <PaymentGateway
                    paymentData={paymentData}
                  />
                </div>
                :
                <LoadingSkeleton width="100%" height="500px" rounded />
            }
          </div>

          <aside className={cls.aside}>
            {
              !isLoading && paymentData ?
                <div className={cls.orderCard}>
                  <div className={cls.orderHead}>
                    <span className={cls.orderIcon}>
                      <Icon icon={icons.cart} />
                    </span>
                    <h3>ملخص الطلب</h3>
                  </div>
                  <div className={cls.orderRow}>
                    <span>عدد العناصر</span>
                    <span className={cls.count}>{paymentData.count}</span>
                  </div>
                  <div className={`${cls.orderRow} ${cls.orderTotal}`}>
                    <span>الإجمالي</span>
                    <span>{formatter.format(paymentData.total)}</span>
                  </div>
                </div>
                :
                <LoadingSkeleton width="100%" height="180px" rounded />
            }
          </aside>
        </div>
      </Container>
    </section>
  )
}

export default CheckoutWrapper;
