'use client';
import { useState } from "react";
//= Components
import ChatHead from "../ChatHead";
import ChatBody from "../ChatBody";
import ChatBottom from "../ChatBottom";
//= Api
import { getTicketSupportDetails } from "@/api";
import useRequest from '@/api/useRequest';
//= Types
import { Dictionary, Locale } from "@/types";

type Props = {
  translations: Dictionary['panel']['support']['tickets']['reply'];
  locale: Locale;
  ticketId: number;
}

function ChatWrapper({ translations, locale, ticketId }: Props) {
  const { data, isLoading, refetch } = useRequest(() => getTicketSupportDetails(ticketId));
  const [message, setMessage] = useState('');

  return (
    <>
      <ChatHead translations={translations} isLoading={isLoading} user={data?.user} ticketId={ticketId} />
      <ChatBody translations={translations} locale={locale} allMessages={data?.conversations || []} isLoading={isLoading} />
      <ChatBottom translations={translations} isLoading={isLoading} ticketId={ticketId} message={message} setMessage={setMessage} refetch={refetch} />
    </>
  )
}

export default ChatWrapper;