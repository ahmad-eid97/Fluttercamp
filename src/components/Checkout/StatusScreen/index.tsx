'use client';
import React from 'react';
//= Components
import Container from "@mui/material/Container";
import { Icon } from "@iconify/react";
import { Button } from '@/components/ui';
import { icons } from '@/lib/icons';
//= Types
import type { PaymentStatus } from '@/types';
//= Styles
import cls from './checkout_status.module.scss';

type Props = {
  statusInfo: PaymentStatus;
}

function CheckoutSuccess({ statusInfo }: Props) {
  const isError = statusInfo.status === 'error';

  return (
    <section className={`${cls.checkout_status} ${isError ? cls.failed : ''}`}>
      <Container maxWidth="xl">
        <div className={cls.content}>
          <span className={cls.iconTile}>
            {
              isError ?
                <Icon icon={icons.close} />
                :
                <Icon icon={icons.verified} />
            }
          </span>
          {
            isError ?
              <>
                <h3>{statusInfo.title}</h3>
                <p className={cls.message}>{statusInfo.msg}</p>
                <Button href="/cart" variant="primary" icon={icons.cart}>
                  العودة إلى السلة
                </Button>
              </>
              :
              <>
                <h3>تم الدفع بنجاح</h3>
                <p className={cls.totalRow}>الإجمالي <span>{statusInfo.total_amount}</span></p>
              </>
          }
        </div>
      </Container>
    </section>
  )
}

export default CheckoutSuccess;
