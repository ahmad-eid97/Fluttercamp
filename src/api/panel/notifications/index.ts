import API from "@/api/request.handler";
import { cache } from "react";
//= Types
import { GetAllNotificationsResponse, NotificationsFilters } from "./types";

export const getAllNotifications = cache(async (filters?: Partial<NotificationsFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) {
      // @ts-ignore
      queryParams += `${encodeURIComponent(key)}=${filters[key]}&`;
    }
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<GetAllNotificationsResponse>(`/panel/notifications${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});

export const markNotificationAsRead = async (notification_id: number) => {
  const response = await API.Post<unknown>(`/panel/notifications/${notification_id}/seen`, { withToken: true });
  return response;
};