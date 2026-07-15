import API from "@/api/request.handler";
import { cache } from "react";
//= Types
import {
  Ticket,
  TicketSupportDetailsResponse,
  CloseConversationResponse,
  SupportMessageBody,
  AllTicketsResponse,
  GetTicketsFilter
} from "./types";

export const getSupportTickets = cache(async (filters?: Partial<GetTicketsFilter>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key as keyof GetTicketsFilter]}&`;
    queryParams = queryParams.slice(0, -1);
  }
  const response = await API.Get<AllTicketsResponse>(`/panel/support/tickets${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});

export const getCoursesSupports = cache(async (filters?: Partial<GetTicketsFilter>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key as keyof GetTicketsFilter]}&`;
    queryParams = queryParams.slice(0, -1);
  }
  const response = await API.Get<AllTicketsResponse>(`/panel/support/class_support${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});

export const getTicketSupportDetails = cache(async (id: number) => {
  const response = await API.Get<TicketSupportDetailsResponse>(`/panel/support/${id}`, { withToken: true });
  return response;
});

export const sendSupportMessage = cache(async ({ id, body }: { id: number, body: SupportMessageBody }) => {
  const response = await API.Post(`/panel/support/${id}/conversations`, { withToken: true, body: body });
  return response;
});

export const closeConverstaion = cache(async (id: number) => {
  const response = await API.Get<CloseConversationResponse>(`/panel/support/${id}/close`, { withToken: true });
  return response;
});