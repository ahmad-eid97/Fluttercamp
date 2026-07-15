import API from "@/api/request.handler";
import { cache } from "react";
//= Types
import { GetAllNoticeboardsResponse, NoticeboardFilters, DataForCreateNoticeboard, DataForEditNoticeboard, CreateNoticeboardPayload, GetAllCourseNoticeboardsResponse, CreateCourseNoticeboardPayload } from "./types";

export const getAllNoticeboards = cache(async (filters?: Partial<NoticeboardFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key as keyof NoticeboardFilters]}&`;
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<GetAllNoticeboardsResponse>(`/instructor/noticeboard${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});

export const getDataForCreateNoticeboard = cache(async () => {
  const response = await API.Get<DataForCreateNoticeboard>(`/instructor/noticeboard/new`, { withToken: true });
  return response;
});

export const getDataForEditNoticeboard = cache(async (notice_id: number) => {
  const response = await API.Get<DataForEditNoticeboard>(`/instructor/noticeboard/${notice_id}/edit`, { withToken: true });
  return response;
});

export const createNewNotice = async (payload: CreateNoticeboardPayload) => {
  const response = await API.Post<unknown>(`/instructor/noticeboard/store`, { withToken: true, body: payload });
  return response;
};

export const updateNotice = async (notice_id: number, payload: Partial<CreateNoticeboardPayload>) => {
  const response = await API.Post<unknown>(`/instructor/noticeboard/${notice_id}/update`, { withToken: true, body: payload });
  return response;
};

export const saveNoticeStatus = cache(async (notice_id: number) => {
  const response = await API.Get<unknown>(`/instructor/noticeboard/${notice_id}/saveStatus`, { withToken: true });
  return response;
});

export const deleteNotice = cache(async (notice_id: number) => {
  const response = await API.Get<unknown>(`/instructor/noticeboard/${notice_id}/delete`, { withToken: true });
  return response;
});

/**
 * Course Notices
 */

export const getAllCourseNoticeboards = cache(async (filters?: Partial<NoticeboardFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key as keyof NoticeboardFilters]}&`;
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<GetAllCourseNoticeboardsResponse>(`/instructor/course-noticeboard${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});

export const getDataForCreateCourseNoticeboard = cache(async () => {
  const response = await API.Get<DataForCreateNoticeboard>(`/instructor/course-noticeboard/new`, { withToken: true });
  return response;
});

export const getDataForEditCourseNoticeboard = cache(async (notice_id: number) => {
  const response = await API.Get<DataForEditNoticeboard>(`/instructor/course-noticeboard/${notice_id}/edit`, { withToken: true });
  return response;
});

export const createNewCourseNotice = async (payload: CreateCourseNoticeboardPayload) => {
  const response = await API.Post<unknown>(`/instructor/course-noticeboard/store`, { withToken: true, body: payload });
  return response;
};

export const updateCourseNotice = async (notice_id: number, payload: Partial<CreateCourseNoticeboardPayload>) => {
  const response = await API.Post<unknown>(`/instructor/course-noticeboard/${notice_id}/update`, { withToken: true, body: payload });
  return response;
};

export const saveCourseNoticeStatus = cache(async (notice_id: number) => {
  const response = await API.Get<unknown>(`/instructor/course-noticeboard/${notice_id}/saveStatus`, { withToken: true });
  return response;
});

export const deleteCourseNotice = cache(async (notice_id: number) => {
  const response = await API.Get<unknown>(`/instructor/course-noticeboard/${notice_id}/delete`, { withToken: true });
  return response;
});