import { cache } from "react";
import API from "@/api/request.handler";

export const addWebinarToBundle = cache(async (payload: { bundle_id: number; webinar_id: number }) => {
  const formdata = new FormData();
  Object.entries(payload).forEach(([key, value]) => formdata.set(`ajax[new][${key}]`, value.toString()));

  const response = await API.Post<unknown>(`/instructor/bundle-webinars/store`, {
    withToken: true, formdata, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});


export const updateWebinarInBundle = cache(async (webinar_id: number, payload: { bundle_id: number; webinar_id: number }) => {
  const formdata = new FormData();
  Object.entries(payload).forEach(([key, value]) => formdata.set(`ajax[${webinar_id}][${key}]`, value.toString()));

  const response = await API.Post<unknown>(`/instructor/bundle-webinars/${webinar_id}/update`, {
    withToken: true, formdata, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const removeWebinarFromBundle = cache(async (webinar_id: number) => {
  const response = await API.Get<unknown>(`/instructor/bundle-webinars/${webinar_id}/delete`, { withToken: true });
  return response;
});

