'use client';
import React from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import Input from '@/components/UIs/Input';
//= Api
import { validateCoupon } from '@/api';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Styles
import cls from './cart_coupon.module.scss';

type Props = {
  refetch: () => Promise<void>;
}

interface Fields {
  coupon: string;
}

function CartCoupon({ refetch }: Props) {
  const [fields, dispatch] = useCompoundState<Fields>({
    coupon: '',
  });

  async function validate(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    const response = await validateCoupon(fields.coupon);
    if (response && response.success) {
      await refetch();
      toast.success("تم تطبيق الكوبون بنجاح");
    } else {
      toast.error("الكوبون غير صالح للاستخدام");
    }

    btn.classList.remove('loading-btn');
  }

  return (
    <div className={cls.cart_coupon}>
      <div className={cls.head}>
        <span className={cls.iconTile}>
          <Icon icon="solar:ticket-sale-bold-duotone" />
        </span>
        <div>
          <h4>كوبون الخصم</h4>
          <p>إذا كان لديك قسيمة، أدخل الرمز في الإدخال التالي وانقر على زر التحقق</p>
        </div>
      </div>

      <div className={cls.field}>
        <label>أدخل كود الخصم هنا</label>
        <Input placeholder="أدخل كود الخصم هنا" name="coupon" value={fields.coupon} onChange={(e) => dispatch({ coupon: e.target.value })} />
      </div>

      <div className={cls.actions}>
        <button onClick={validate}>
          <Icon icon="solar:check-circle-bold" />
          التحقق
        </button>
      </div>
    </div>
  )
}

export default CartCoupon;
