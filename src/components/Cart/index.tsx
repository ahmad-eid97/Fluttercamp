'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import Container from "@mui/material/Container";
import CartItems from './Items';
import CartCoupon from './Coupon';
import CartTotal from './Total';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Api
import { getCartListItems } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Locale } from '@/types';
//= Styles
import cls from './cart_wrapper.module.scss';

function CartWrapper() {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.cartPage;
  const { data: cart, isLoading, refetch } = useRequest(getCartListItems);

  return (
    <section className={cls.cart_wrapper}>
      <div className={cls.banner}>
        <Container maxWidth="xl">
          <div className={cls.bannerInner}>
            <span className={cls.bannerIcon}>
              <Icon icon="solar:cart-large-2-bold-duotone" />
            </span>
            <div className={cls.bannerText}>
              <h1>سلة التسوق</h1>
              <p>راجع عناصرك قبل إتمام عملية الدفع</p>
            </div>
            {cart?.items?.length ? (
              <span className={cls.bannerCount}>
                {cart.items.length} عناصر
              </span>
            ) : null}
          </div>
        </Container>
      </div>

      <CartItems
        items={cart?.items}
        refetch={refetch}
        isLoading={isLoading}
      />
      <Container maxWidth="xl">
        <div className={cls.couponNtotal}>
          <CartCoupon refetch={refetch} />
          <CartTotal amounts={cart?.amounts} />
        </div>
      </Container>
    </section>
  )
}

export default CartWrapper;