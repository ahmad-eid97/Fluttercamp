import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type {
  AddUpdateFileInChapterPayload
} from '@/types';

export const addFileToChapter = cache(async (payload: AddUpdateFileInChapterPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.set(`ajax[new][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/files/store`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});


export const updateFileInChapter = cache(async (item_id: number, payload: AddUpdateFileInChapterPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.set(`ajax[${item_id}][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/files/${item_id}/update`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const deleteFileById = cache(async (item_id: number) => {
  const response = await API.Get<unknown>(`/instructor/files/${item_id}/delete`, { withToken: true });
  return response;
});