import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type { GetDashboardDataResponse, GetQuickInfoResponse } from './types';


export const getDashboardStatistics = cache(async () => {
  const response = await API.Get<GetDashboardDataResponse>(`/panel`, { withToken: true });
  return response;
});

export const getDashboardQuickInfo = cache(async () => {
  const response = await API.Get<GetQuickInfoResponse>(`/panel/quick-info`, { withToken: true });
  return response;
});
