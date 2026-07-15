import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type { AddUpdatePricingPlanPayload, } from '@/types';

export const addNewPlanToCourse = cache(async (payload: AddUpdatePricingPlanPayload) => {
  const formdata = new FormData();
  Object.entries(payload).forEach(([key, value]) => formdata.set(`ajax[new][${key}]`, value));

  const response = await API.Post<unknown>(`/instructor/tickets/store`, {
    withToken: true, formdata, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});


export const updatePlanInCourse = cache(async (plan_id: number, payload: AddUpdatePricingPlanPayload) => {
  const formdata = new FormData();
  Object.entries(payload).forEach(([key, value]) => formdata.set(`ajax[${plan_id}][${key}]`, value));

  const response = await API.Post<unknown>(`/instructor/tickets/${plan_id}/update`, {
    withToken: true, formdata, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const deletePlanById = cache(async (plan_id: number) => {
  const response = await API.Get<unknown>(`/instructor/tickets/${plan_id}/delete`, { withToken: true });
  return response;
});