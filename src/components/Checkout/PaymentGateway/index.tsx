'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Cookies from "universal-cookie";
//= Components
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui';
import { icons } from '@/lib/icons';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Api
import { checkoutWithCredits, checkoutWithGateway } from '@/api';
//= Types
import type { GetCheckoutResponse, PaySubscriptionPlanResponse } from '@/types';
//= Styles
import cls from './paymentGateway.module.scss';

type Props = {
  paymentData: GetCheckoutResponse | PaySubscriptionPlanResponse;
}

function PaymentGateway({ paymentData }: Props) {
  const [selectedGateway, setSelectedGateway] = useState<number>(-1);
  const [gateways, setGateways] = useState<Gateways>([]);

  useEffect(() => {
    if (paymentData.paymentChannels?.length) {
      const handledGateways = [
        ...(paymentData.paymentChannels.map(gate => ({
          name: gate.title,
          value: gate.class_name,
          image: getImageUrl(gate.image || ''),
          id: gate.id
        }))),
        {
          name: "غير متصل",
          value: "withBalance",
          icon: 'material-symbols-light:account-balance-wallet',
          id: -1
        }
      ];

      setGateways(handledGateways);
    }
  }, [paymentData.paymentChannels]);

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  async function handlePaymentStart(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    // Pay with Creidts
    if (selectedGateway === -1) {
      const response = await checkoutWithCredits(paymentData.order.id);
      if (response && response.success) {
        const cookies = new Cookies();
        cookies.set('imtyaz-checkout-success', '1', { path: '/' });
        toast.success("تم الدفع بنجاح");
        setTimeout(() => window.location.pathname = '/cart/checkout/success', 1000);
      }
    }
    // Pay with Gateway
    else {
      const data = {
        order_id: paymentData.order.id,
        gateway_id: selectedGateway
      }

      const response = await checkoutWithGateway(data);
      if (response && response.success) {
        window.location.href = response.data?.data.authorization_url || window.location.origin;
      } else if (response && !response.success) {
        toast.error(response.message);
      }
    }

    btn.classList.remove('loading-btn');
  }

  const total = 'total' in paymentData ? paymentData.total : paymentData.amounts.total;

  return (
    <div className={cls.paymentGateway}>
      <div className={cls.header}>
        <span className={cls.headerIcon}>
          <Icon icon={icons.money} />
        </span>
        <div>
          <h4>الدفع</h4>
          <p className={cls.subtitle}>اختر وسيلة الدفع المناسبة لإتمام طلبك</p>
        </div>
      </div>

      <div className={cls.gateways}>
        {gateways.map((item, index) => {
          const isActive = selectedGateway === item.id;
          return (
            <button
              type="button"
              className={`${cls.gateway} ${isActive ? cls.active : ''}`}
              key={index}
              onClick={() => setSelectedGateway(item.id)}
              aria-pressed={isActive}
            >
              <span className={cls.check} aria-hidden="true">
                <Icon icon={icons.check} />
              </span>
              <span className={cls.media}>
                {item.icon && <Icon icon={item.icon} />}
                {item.image && <img src={item.image} alt="payment gateway image" />}
              </span>
              <p className={cls.method}>دفع بواسطة <span>{item.name}</span></p>
              {item.value === 'withBalance'
                ? <span className={cls.balance}>{formatter.format(paymentData.userCharge)}</span>
                : <span className={cls.balance} />}
            </button>
          );
        })}
      </div>

      <div className={cls.summary}>
        <span className={cls.summaryLabel}>الإجمالي</span>
        <span className={cls.summaryValue}>{formatter.format(total)}</span>
      </div>

      <button className={cls.payBtn} onClick={handlePaymentStart}>
        <Icon icon={icons.check} />
        دفع
      </button>
    </div>
  )
}

type Gateways = ({
  name: string;
  value: string;
  image?: string;
  icon?: string;
  id: number;
})[]

export default PaymentGateway
