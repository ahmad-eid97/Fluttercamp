'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui';
//= Types
import type { Dictionary, CartAmounts } from '@/types';
//= Styles
import cls from './cart_total.module.scss';

type Props = {
  amounts: CartAmounts | undefined;
}

function CartTotal({ amounts }: Props) {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className={cls.cart_total}>
      <h4 className={cls.heading}>
        <Icon icon="solar:bill-list-bold-duotone" />
        ملخص الطلب
      </h4>

      <ul className={cls.rows}>
        <li><b>المجموع الفرعي</b> <span>{amounts ? formatter.format(amounts.sub_total) : 0}</span></li>
        <li><b>الخصم</b> <span>{amounts ? formatter.format(amounts.total_discount) : 0}</span></li>
        <li><b>الضريبة</b> <span>{amounts ? formatter.format(amounts.tax_price) : 0}</span></li>
      </ul>

      <p className={cls.grandTotal}><b>الاجمالي</b> <span>{amounts ? formatter.format(amounts.total) : 0}</span></p>

      <div className={cls.actions}>
        <Button href="/cart/checkout" variant="primary" size="lg" block iconRight="solar:arrow-left-linear">
          الدفع
        </Button>
      </div>
    </div>
  )
}

export default CartTotal;
