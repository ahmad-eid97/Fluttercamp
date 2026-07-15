//= Components
import LoadingSkeleton from '@/components/UIs/Skeleton';
import { confirmDialog } from '@/lib/confirm';
//= Api
import { closeConverstaion } from '@/api';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Types
import { Dictionary, TicketUser } from '@/types';
//= Styles
import cls from './chatHead.module.scss';

type Props = {
  translations: Dictionary['panel']['support']['tickets']['reply'];
  isLoading: boolean;
  user: TicketUser | undefined;
  ticketId: number;
}

function ChatHead({ translations, isLoading, user, ticketId }: Props) {
  async function closeSupportConverstaion() {
    const result = await confirmDialog({
      icon: 'warning',
      title: translations.closeTitle,
      text: translations.closeDesc,
      showCancelButton: true,
      cancelButtonText: translations.cancel,
      confirmButtonText: translations.closeConversation,
    });
    if (result.isConfirmed) {
      const response = await closeConverstaion(ticketId);
      if (response?.success) {
        toastSuccess(translations.closed);
      }
    }
  }

  return (
    <div className={cls.chatHead}>
      {!isLoading ?
        <>
          <div className={cls.chatHead__user}>
            <img src={user?.avatar} alt="userImage" />
            <div>
              <p>
                {user?.full_name}
              </p>
              <span>
                {user?.address}
              </span>
            </div>
          </div>
          <div className={cls.actions}>
            <button onClick={closeSupportConverstaion}>{translations.closeConversation}</button>
          </div>
        </>
        :
        <div className={cls.userLoading}>
          <div className={`${cls.loader} ${cls.circle}`}>
            <LoadingSkeleton width="40px" height="40px" circle />
          </div>
          <div className={`${cls.loader} ${cls.details}`}>
            <LoadingSkeleton width="150px" height="20px" rounded />
            <LoadingSkeleton width="150px" height="20px" rounded />
          </div>
        </div>
      }
    </div>
  )
}

export default ChatHead;