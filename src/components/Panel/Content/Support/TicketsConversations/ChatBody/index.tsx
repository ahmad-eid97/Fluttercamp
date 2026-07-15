'use client';
import { useEffect, useRef, useState } from "react";
//= Modules
import { format } from "date-fns";
import { enUS, ar } from 'date-fns/locale';
//= Components
import LoadingSkeleton from "@/components/UIs/Skeleton";
//= Types
import { Dictionary, Locale, Conversation } from "@/types";
//= Styles
import cls from './chatBody.module.scss';

type Props = {
  translations: Dictionary['panel']['support']['tickets']['reply'];
  locale: Locale;
  isLoading: boolean;
  allMessages: Conversation[];
}

function ChatBody({ translations, locale, isLoading, allMessages }: Props) {
  const [messages, setMessages] = useState([...allMessages]);
  const messageEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEl.current?.scroll({ top: messageEl.current.scrollHeight, behavior: 'smooth' });
    if (messageEl) {
      messageEl.current?.addEventListener('DOMNodeInserted', (event: any) => {
        const { currentTarget: target } = event;
        if (target) target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  useEffect(() => {
    if (allMessages.length) {
      setMessages([...allMessages]);
    }
  }, [allMessages])

  return (
    <div className={cls.chatBody} ref={messageEl}>
      {messages.length >= 1 ? (
        <>
          {messages.map((message, idx) => (
            <div
              className={`${cls.chatBody__message} ${message.sender ? cls.me : ""
                } ${cls.en}`}
              key={idx}
            >
              <div className={cls.messageBox}>
                <img className={cls.userAvatar} src={message.sender ? message.sender?.avatar : message.supporter?.avatar} alt="" />
                <div className={cls.messageContent}>
                  {message.message && <p>{message.message}</p>}
                  {message.attach &&
                    <img
                      src={message.attach}
                      alt="chatImage"

                    />
                  }
                </div>
              </div>

              <span>
                {format(new Date(+message.created_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS })}
              </span>
            </div>
          ))}
        </>
      ) :
        isLoading && !messages.length ? (
          <div className={cls.loading}>
            <div className={cls.messageSkeleton}>
              <LoadingSkeleton width="40px" height="40px" circle />
              <LoadingSkeleton width="70%" height="40px" rounded />
            </div>
            <div className={`${cls.messageSkeleton} ${cls.me}`}>
              <LoadingSkeleton width="40px" height="40px" circle />
              <LoadingSkeleton width="70%" height="40px" rounded />
            </div>
            <div className={cls.messageSkeleton}>
              <LoadingSkeleton width="40px" height="40px" circle />
              <LoadingSkeleton width="70%" height="40px" rounded />
            </div>
            <div className={`${cls.messageSkeleton} ${cls.me}`}>
              <LoadingSkeleton width="40px" height="40px" circle />
              <LoadingSkeleton width="70%" height="40px" rounded />
            </div>
            <div className={cls.messageSkeleton}>
              <LoadingSkeleton width="40px" height="40px" circle />
              <LoadingSkeleton width="70%" height="40px" rounded />
            </div>
            <div className={`${cls.messageSkeleton} ${cls.me}`}>
              <LoadingSkeleton width="40px" height="40px" circle />
              <LoadingSkeleton width="70%" height="40px" rounded />
            </div>
          </div>
        ) :
          (
            <div className={cls.empty}>
              <p>{translations.noMessages}</p>
            </div>
          )}
    </div>
  )
}

export default ChatBody;