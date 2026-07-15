import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type {
  AddUpdateSessionInChapterPayload
} from '@/types';

export const addSessionToChapter = cache(async (payload: AddUpdateSessionInChapterPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.set(`ajax[new][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/sessions/store`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});


export const updateSessionInChapter = cache(async (item_id: number, payload: AddUpdateSessionInChapterPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.set(`ajax[${item_id}][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/sessions/${item_id}/update`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const deleteSessionById = cache(async (item_id: number) => {
  const response = await API.Get<unknown>(`/instructor/sessions/${item_id}/delete`, { withToken: true });
  return response;
});