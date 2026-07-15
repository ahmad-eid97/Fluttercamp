import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type {
  AddUpdateFAQPayload,
  AddUpdateExtraDescriptionPayload,
} from '@/types';

export const addNewFaqToCourse = cache(async (payload: AddUpdateFAQPayload) => {
  const formdata = new FormData();
  Object.entries(payload).forEach(([key, value]) => formdata.set(`ajax[new][${key}]`, value));

  const response = await API.Post<unknown>(`/instructor/faqs/store`, {
    withToken: true, formdata, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});


export const updateFaqInCourse = cache(async (faq_id: number, payload: AddUpdateFAQPayload) => {
  const formdata = new FormData();
  Object.entries(payload).forEach(([key, value]) => formdata.set(`ajax[${faq_id}][${key}]`, value));

  const response = await API.Post<unknown>(`/instructor/faqs/${faq_id}/update`, {
    withToken: true, formdata, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const deleteFaqById = cache(async (faq_id: number) => {
  const response = await API.Get<unknown>(`/instructor/faqs/${faq_id}/delete`, { withToken: true });
  return response;
});


export const addExtraDescriptionToCourse = cache(async (payload: AddUpdateExtraDescriptionPayload) => {
  const formdata = new FormData();
  Object.entries(payload).forEach(([key, value]) => formdata.set(`ajax[new][${key}]`, value));

  const response = await API.Post<unknown>(`/instructor/webinar-extra-description/store`, {
    withToken: true, formdata, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const updateExtraDescriptionInCourse = cache(async (desc_id: number, payload: AddUpdateExtraDescriptionPayload) => {
  const formdata = new FormData();
  Object.entries(payload).forEach(([key, value]) => formdata.set(`ajax[${desc_id}][${key}]`, value));

  const response = await API.Post<unknown>(`/instructor/webinar-extra-description/${desc_id}/update`, {
    withToken: true, formdata, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const deleteExtraDescriptionById = cache(async (desc_id: number) => {
  const response = await API.Get<unknown>(`/instructor/webinar-extra-description/${desc_id}/delete`, { withToken: true });
  return response;
});