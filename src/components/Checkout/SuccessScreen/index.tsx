'use client';
import React, { useLayoutEffect } from 'react';
import Cookies from "universal-cookie";
//= Components
import Container from "@mui/material/Container";
import { Icon } from "@iconify/react";
import { Button } from '@/components/ui';
import { icons } from '@/lib/icons';
//= Styles
import cls from './checkout_success.module.scss';

function CheckoutSuccess() {
  useLayoutEffect(() => {
    const cookies = new Cookies();
    cookies.set('FlutterCamp-checkout-success', '0', { path: '/' });
  }, []);

  return (
    <section className={cls.checkout_success}>
      <Container maxWidth="xl">
        <div className={cls.content}>
          <span className={cls.celebrate} aria-hidden="true">
            <Icon icon="solar:confetti-minimalistic-bold-duotone" className={cls.confetti} />
            <span className={cls.iconTile}>
              <Icon icon={icons.verified} />
            </span>
          </span>
          <h2>تم الدفع والشراء بنجاح</h2>
          <p>شكراً لك! تم تأكيد طلبك ويمكنك الآن البدء في رحلتك التعليمية</p>
          <div className={cls.actions}>
            <Button href="/" variant="primary" icon={icons.rocket}>
              ابدأ التعلم الآن
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CheckoutSuccess;
