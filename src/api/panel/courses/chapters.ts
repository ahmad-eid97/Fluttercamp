import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type {
  GetChapterResponse,
  GetAllChaptersByWebinarIdReponse,
  AddUpdateChapterPayload,
  MoveItemToAnotherChapterPayload,
} from '@/types';

export const getChapter = cache(async (chapter_id: number) => {
  const response = await API.Get<GetChapterResponse>(`/instructor/chapters/${chapter_id}`, { withToken: true });
  return response;
});

export const getAllChaptersByWebinarId = cache(async (webinar_id: number) => {
  const response = await API.Get<GetAllChaptersByWebinarIdReponse>(`/instructor/chapters/getAllByWebinarId/${webinar_id}`, { withToken: true });
  return response;
});

export const deleteChapterById = cache(async (chapter_id: number) => {
  const response = await API.Get<unknown>(`/instructor/chapters/${chapter_id}/delete`, { withToken: true });
  return response;
});

export const addChapterToWebinar = cache(async (payload: AddUpdateChapterPayload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.set(`ajax[chapter][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/chapters/store`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const updateChapter = cache(async (chapter_id: number, payload: AddUpdateChapterPayload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.set(`ajax[chapter][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/chapters/${chapter_id}/update`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const moveItemToAnotherChapter = cache(async (payload: MoveItemToAnotherChapterPayload) => {
  const response = await API.Post<unknown>(`/instructor/chapters/change`, { withToken: true, body: payload });
  return response;
});