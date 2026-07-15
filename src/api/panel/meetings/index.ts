import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type { GetMeetingSettingsResponse, GetMeetingsRequests, ReservationsMeetings, GetMeetingsFilters, AddMeetingTimePayload, UpdateMeetingPayload } from './types';


export const getMeetingsRequests = cache(async (filters?: Partial<GetMeetingsFilters>) => {
  let query = '';
  if (filters && JSON.stringify(filters) !== '{}') query += '?';
  if (filters) Object.entries(filters).forEach(([key, value]) => {
    if (query === '?') query += `${key}=${value}`;
    else query += `&${key}=${value}`
  });

  const response = await API.Get<GetMeetingsRequests>(`/instructor/meetings/requestsJson${query}`, { withToken: true });
  return response;
});


export const getMeetingsReservations = cache(async (filters?: Partial<GetMeetingsFilters>) => {
  let query = '';
  if (JSON.stringify(filters) !== '{}') query += '?';
  if (filters) Object.entries(filters).forEach(([key, value]) => {
    if (query === '?') query += `${key}=${value}`;
    else query += `&${key}=${value}`
  });

  const response = await API.Get<ReservationsMeetings[]>(`/panel/meetings/reservations${query}`, { withToken: true });
  return response;
});

export const getMeetingById = cache(async (meeting_id: number) => {
  const response = await API.Get<unknown>(`/panel/meetings/${meeting_id}`, { withToken: true });
  return response;
});

export const getMeetingSettings = cache(async () => {
  const response = await API.Get<GetMeetingSettingsResponse>(`/instructor/meetings/settings`, { withToken: true });
  return response;
});

export const addMeetingTime = async (payload: AddMeetingTimePayload) => {
  const response = await API.Post<unknown>(`/instructor/meetings/saveTime`, { withToken: true, body: payload });
  return response;
};

export const updateMeetingSettings = async (meeting_id: number, payload: UpdateMeetingPayload) => {
  const response = await API.Post<unknown>(`/instructor/meetings/${meeting_id}/update`, { withToken: true, body: payload });
  return response;
};

export const deleteMeetingTime = async (time_id: number) => {
  const response = await API.Post<unknown>(`/instructor/meetings/deleteTime`, { withToken: true, body: { time_id: time_id.toString() } });
  return response;
};


export const temporaryDisableMeetings = async (disable: boolean) => {
  const response = await API.Post<unknown>(`/instructor/meetings/temporaryDisableMeetings`, { withToken: true, body: { disable } });
  return response;
};


export const createMeetingLink = async (payload: { link: string; reserved_meeting_id: string }) => {
  const response = await API.Post<unknown>(`/instructor/meetings/create-link`, { withToken: true, body: payload });
  return response;
};


export const addMeetingLiveSession = async (meeting_id: number) => {
  const response = await API.Post<unknown>(`/instructor/meetings/${meeting_id}/add-session`, { withToken: true });
  return response;
};


export const finishMeeting = async (meeting_id: number) => {
  const response = await API.Post<unknown>(`/panel/meetings/${meeting_id}/finish`, { withToken: true });
  return response;
};


export const getProfileSettings = cache(async () => {
  const response = await API.Get<GetMeetingSettingsResponse>(`/panel/profile-setting`, { withToken: true });

  return response;
})