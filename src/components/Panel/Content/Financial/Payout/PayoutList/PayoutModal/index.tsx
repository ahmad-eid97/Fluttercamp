//= Components
import Modal from "@/components/UIs/Modal";
//= Types
import type { Dictionary, Locale } from '@/types';
//= Api
import { requestPayout } from "@/api";
//= Styles
import cls from './payoutModal.module.scss';
import { toastSuccess } from "@/utils/toast";

type Props = {
  setOpenModal: (openModal: boolean) => void;
  translations: Dictionary['panel']['financial']['payout']['list'];
  locale: Locale;
}

function PayoutModal({ setOpenModal, translations, locale }: Props) {
  async function requestPayoutHandler() {
    const response = await requestPayout();
    if (response?.success) toastSuccess(response.message);
    setOpenModal(false)
  }

  return (
    <Modal setOpenModal={setOpenModal}>
      <div className={cls.payoutModal}>
        <h3>{translations.confirmation}</h3>
        <p>{translations.confirmDescription}</p>
        <div className={cls.actions}>
          <button onClick={() => setOpenModal(false)}>{translations.cancel}</button>
          <button onClick={requestPayoutHandler}>{translations.request}</button>
        </div>
      </div>
    </Modal>
  )
}

export default PayoutModal
