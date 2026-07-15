'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import Input from '@/components/UIs/Input';
import SelectBox from '@/components/UIs/Select';
import DateInput from '@/components/UIs/DateInput';
import FileInput from '@/components/UIs/FileInput';
//= Api
import { chargeAccountWithGateway, listAllGateways } from '@/api';
import useRequest from '@/api/useRequest';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './paymentGateway.module.scss';

type Fields = {
  amount: string;
  account: string;
  code: string;
  date: string;
  receipt: File | null;
}

type Props = {
  translations: Dictionary['panel']['financial']['account']['payment'];
  locale: Locale
}

function PaymentGateway({ translations, locale }: Props) {
  const { data: gatewaysData, isLoading } = useRequest(listAllGateways);

  const [data, dispatch] = useCompoundState<Fields>({
    amount: '',
    account: '',
    code: '',
    date: '',
    receipt: null
  })

  const [selectedGateway, setSelectedGateway] = useState<number>(-1);
  const [gateways, setGateways] = useState<Gateways>([]);

  useEffect(() => {
    if (gatewaysData?.length) {
      const handledGateways = [
        ...(gatewaysData.map(gate => ({
          name: gate.title,
          value: gate.class_name,
          image: getImageUrl(gate.image || ''),
          id: gate.id
        }))),
        {
          name: translations.offline,
          value: "withBalance",
          icon: 'material-symbols-light:account-balance-wallet',
          id: -1
        }
      ];

      setGateways(handledGateways);
    }
  }, [gatewaysData, translations]);

  async function handlePaymentStart(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    // Pay with Creidts
    if (selectedGateway === -1) {
    }
    // Pay with Gateway
    else {
      const handledData = {
        amount: +data.amount,
        gateway_id: selectedGateway
      }

      const response = await chargeAccountWithGateway(handledData);
      if (response && response.success) {
        window.location.href = response.data?.data.authorization_url || window.location.origin;
      } else if (response && !response.success) {
        toast.error(response.message);
      }
    }

    btn.classList.remove('loading-btn');
  }

  return (
    <div className={cls.paymentGateway}>
      <h4>{translations.title}</h4>
      <div className={cls.gateways}>
        {gateways.map((item, index) => (
          <div className={`${cls.gateway} ${selectedGateway === item.id ? cls.active : ''}`} key={index} onClick={() => setSelectedGateway(item.id)}>
            <Icon icon={item.icon || ''} />
            <p>{translations.payWith} <span>{item.name}</span></p>
          </div>
        ))}
      </div>
      <h4>{translations.finalize}</h4>
      <div className={cls.form}>
        <div className={cls.fields}>
          <div className={cls.field}>
            <label>{translations.amount}</label>
            <Input icon="mdi:dollar" placeholder={translations.amount} name='amount' value={data.amount} onChange={(e) => dispatch({ amount: e.target.value })} />
          </div>
          {selectedGateway === -1 ?
            <>
              <div className={cls.field}>
                <label>{translations.account}</label>
                <SelectBox options={[]} name="acccount" defaultValue={data.account} onChange={(e) => dispatch({ account: e.target.value })} noFocus={true} />
              </div>
              <div className={cls.field}>
                <label>{translations.referenceCode}</label>
                <Input placeholder={translations.referenceCode} name='code' value={data.code} onChange={(e) => dispatch({ code: e.target.value })} />
              </div>
              <div className={cls.field}>
                <DateInput label={translations.date} name="date" value={data.date} onChange={(e) => dispatch({ date: e.target.value })} />
              </div>
              <div className={cls.field}>
                <FileInput label={translations.attach} placeholder={translations.attach} name="receipt" value={data.receipt} onChange={(e) => dispatch({ receipt: e.files ? e.files[0] : null })} />
              </div>
            </>
            :
            null
          }
        </div>
        <button onClick={handlePaymentStart}>{translations.pay}</button>
      </div>
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
