import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type {
  AddUpdateTextLessonInChapterPayload
} from '@/types';

export const addTextLessonToChapter = cache(async (payload: AddUpdateTextLessonInChapterPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'attachments') {
      payload?.attachments?.forEach(attachmentId => {
        formData.append(`ajax[new][attachments][]`, attachmentId.toString());
      });
    }
    else formData.set(`ajax[new][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/text-lesson/store`, { withToken: true, formdata: formData });
  return response;
});


export const updateTextLessonInChapter = cache(async (item_id: number, payload: AddUpdateTextLessonInChapterPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'attachments') {
      payload?.attachments?.forEach(attachmentId => {
        formData.append(`ajax[${item_id}][attachments][]`, attachmentId.toString());
      });
    }
    else formData.set(`ajax[${item_id}][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/text-lesson/${item_id}/update`, { withToken: true, formdata: formData });
  return response;
});

export const deleteTextLessonById = cache(async (item_id: number) => {
  const response = await API.Get<unknown>(`/instructor/text-lesson/${item_id}/delete`, { withToken: true });
  return response;
});