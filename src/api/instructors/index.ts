import { cache } from 'react';
import API from "../request.handler";
//= Types
import { InstructorsResponse, DetailedUser, InstructorsFilters, SendMessagePayload, MeetingPayload, MeetingsResponse, GetUserContactPayload, GetUserContactResponse } from './types';

export const getAllInstructors = cache(async (filters?: Partial<InstructorsFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) {
      // @ts-ignore
      queryParams += `${encodeURIComponent(key)}=${filters[key]}&`;
    }
    queryParams = queryParams.slice(0, -1);
  }
  const response = await API.Get<InstructorsResponse>(`/providers/instructors${queryParams ? queryParams : ''}`, { withToken: true });

  if (response) {
    return response;
  }
});

export const getUserById = cache(async (user_id: number) => {
  const response = await API.Get<{ user: DetailedUser }>(`/users/${user_id}/profile`, { withToken: true });

  if (response) {
    return response.user;
  }
});

export const getUserMeetings = cache(async (user_id: number, date: string) => {
  const response = await API.Get<MeetingsResponse>(`/users/${user_id}/meetings?date=${date}`, { withToken: true });

  if (response) {
    return response.times;
  }
});

export const reserveAMeeting = async (payload: MeetingPayload) => {
  const response = await API.Post<unknown>(`/meetings/reserve`, { withToken: true, body: payload });

  if (response) {
    return response;
  }
};

export const followUser = async (user_id: number, status: "1" | "0") => {
  const response = await API.Post<unknown>(`/panel/users/${user_id}/follow`, { withToken: true, body: { status } });

  if (response) {
    return response;
  }
};

export const sendMessageToUser = async (user_id: number, payload: SendMessagePayload) => {
  const response = await API.Post<unknown>(`/users/${user_id}/send-message`, { body: payload, withToken: true });

  if (response) {
    return response;
  }
};

export const getUserContactInfo = async (payload: GetUserContactPayload) => {
  const response = await API.Post<GetUserContactResponse>(`/panel/users/contact-info`, { body: payload, withToken: true });

  if (response) {
    return response;
  }
};