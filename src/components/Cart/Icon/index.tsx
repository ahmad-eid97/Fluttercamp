'use client';
import React from 'react';
import Link from 'next/link';
//= Components
import { Icon } from '@iconify/react';
//= Api
import { getCartListItems } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Locale } from '@/types';
//= Styles
import cls from './icon.module.scss';

type Props = {
  locale: Locale;
  isLoggedIn: boolean;
}

function CartIcon({ locale, isLoggedIn }: Props) {
  const { data: cart } = useRequest(getCartListItems, undefined, { disabled: !isLoggedIn });

  return (
    <Link href="/cart" className={`${cls.cart_icon} ${locale === 'ar' ? cls.ar : ''}`}>
      <Icon icon='solar:cart-large-linear' />
      {cart && cart.items.length ? <span>{cart.items.length}</span> : null}
    </Link>
  )
}

export default CartIcon;