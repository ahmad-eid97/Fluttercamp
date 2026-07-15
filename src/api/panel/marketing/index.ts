import API from "@/api/request.handler";
import { cache } from "react";
//= Types
import {
  CoursesListResponse,
  DiscountsListResponse,
  DisableDiscountResponse,
  PromotionsResponse,
  DiscountPayload,
  GetDiscountsFilters
} from "./types";

export const getCoursesList = cache(async () => {
  const response = await API.Get<CoursesListResponse>(`/instructor/course-noticeboard/new`, { withToken: true });
  return response;
});

export const createNewDiscount = cache(async (payload: DiscountPayload) => {
  const response = await API.Post<unknown>(`/instructor/marketing/special_offers/store`, { withToken: true, body: payload });
  return response;
});

export const getDiscountsList = cache(async (filters?: Partial<GetDiscountsFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key as keyof GetDiscountsFilters]}&`;
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<DiscountsListResponse>(`/instructor/marketing/special_offers${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});

export const disableDiscount = cache(async (offerId: number) => {
  const response = await API.Get<DisableDiscountResponse>(`/instructor/special_offers/${offerId}/disable`, { withToken: true });
  return response;
});

export const getMarketingPromotions = cache(async (filters?: Partial<GetDiscountsFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key as keyof GetDiscountsFilters]}&`;
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<PromotionsResponse>(`/instructor/marketing/promotions${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});

export const createNewPromotion = cache(async (payload: any) => {
  const response = await API.Post<unknown>(`/instructor/marketing/pay-promotion`, { withToken: true, body: payload });
  return response;
});