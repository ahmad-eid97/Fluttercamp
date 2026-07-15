//= Components
import Modal from "@/components/UIs/Modal";
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './payoutDetailsModal.module.scss';

type Props = {
  setOpenModal: (openModal: boolean) => void;
  translations: Dictionary['panel']['financial']['payout']['list'];
  locale: Locale;
  payoutDetails: {
    name: string;
    bank: string;
    accountNumber: string;
  } | null;
}

function PayoutDetailsModal({ setOpenModal, translations, locale, payoutDetails }: Props) {
  return (
    <Modal setOpenModal={setOpenModal}>
      <div className={cls.payoutDetailsModal}>
        <h3>{translations.payoutDetails}</h3>
        <ul>
          <li>
            <p>{translations.accountHolder}</p>
            <p>{payoutDetails?.name}</p>
          </li>
          <li>
            <p>{translations.bankName}</p>
            <p>{payoutDetails?.bank}</p>
          </li>
          <li>
            <p>{translations.accountNumber}</p>
            <p>{payoutDetails?.accountNumber}</p>
          </li>
        </ul>
        <div className={cls.actions}>
          <button onClick={() => setOpenModal(false)}>{translations.cancel}</button>
        </div>
      </div>
    </Modal>
  )
}

export default PayoutDetailsModal
