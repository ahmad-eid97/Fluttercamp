import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type {
  NewCoursePayload,
  AddNewCourseResponse,
  UpdateCoursePayload,
  GetCoursesResponse,
  GetInstructorCourseStatisticsResponse,
  GetUserCourseStatisticsResponse,
  GetMyPurchasesResponse,
  GetFavoritesCoursesResponse,
  OrderItemsPayload,
  GetDataForCreateResponse,
  GetDataForEditWebinarResponse,
  SearchInWebinarResponse,
} from '@/types';


/**
 * Courses Section
*/
export const addNewCourse = cache(async (payload: NewCoursePayload) => {
  const response = await API.Post<AddNewCourseResponse>(`/instructor/webinar`, { withToken: true, body: payload });
  return response;
});

export const updateCourseData = cache(async (webinar_id: number, payload: Partial<UpdateCoursePayload>) => {
  const response = await API.Post<unknown>(`/instructor/webinar/${webinar_id}/update`, { withToken: true, body: payload });
  return response;
});

export const getMyCourses = cache(async (filter?: { [key: string]: string | number }) => {
  const response = await API.Get<GetCoursesResponse>(`/instructor/webinar?page=${filter?.page || 1}`, { withToken: true });
  return response;
});

export const getPurchasesCourses = cache(async () => {
  const response = await API.Get<GetMyPurchasesResponse>(`/panel/webinars/purchases`, { withToken: true });
  return response;
});

export const getInvitationsCourses = cache(async () => {
  const response = await API.Get<GetCoursesResponse>(`/instructor/webinar/invitations`, { withToken: true });
  return response;
});

export const getFavoritesCourses = cache(async () => {
  const response = await API.Get<GetFavoritesCoursesResponse>(`/panel/favorites`, { withToken: true });
  return response;
});

export const getInstructorCourseStatistics = cache(async (webinar_id: number) => {
  const response = await API.Get<GetInstructorCourseStatisticsResponse>(`/instructor/webinar/${webinar_id}/statistics`, { withToken: true });
  return response;
});

export const getUserCourseStatistics = cache(async (webinar_id: number) => {
  const response = await API.Get<GetUserCourseStatisticsResponse>(`/panel/webinars/${webinar_id}/statistic`, { withToken: true });
  return response;
});

export const getDataForCreateWebinar = cache(async () => {
  const response = await API.Get<GetDataForCreateResponse>(`/instructor/webinars/new`, { withToken: true });
  return response;
});

export const getDataForEditWebinar = cache(async (webinar_id: number, step: number) => {
  const response = await API.Get<GetDataForEditWebinarResponse>(`/instructor/webinar/${webinar_id}/step/${step}`, { withToken: true });
  return response;
});

export const orderItemsInWebinars = async (webinar_id: number, payload: OrderItemsPayload) => {
  const response = await API.Post<unknown>(`/instructor/webinars/${webinar_id}/order-items`, { withToken: true, body: payload });
  return response;
};

export const duplicateWebinar = async (webinar_id: number) => {
  const response = await API.Post<unknown>(`/instructor/webinars/${webinar_id}/duplicate`, { withToken: true });
  return response;
};

export const toggleFavouriteWebinar = async (payload: { item: 'bundle' | 'webinar', id: number }) => {
  const response = await API.Post<unknown>(`/panel/favorites/toggle2`, { withToken: true, body: payload });
  return response;
};

export const deleteWebinar = async (webinar_id: number) => {
  const response = await API.Delete<unknown>(`/instructor/webinars/${webinar_id}`, { withToken: true });
  return response;
};

export const searchInWebinar = async (paylaod: { webinar_id: number; term: string; }) => {
  const response = await API.Post<unknown>(`/instructor/webinar/search`, { withToken: true, body: paylaod });
  return response;
};