import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type {
  AddUpdateAssignmentInChapterPayload
} from '@/types';

export const addAssignmentToChapter = cache(async (payload: AddUpdateAssignmentInChapterPayload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'attachments') {
      value.forEach((attachment: any, index: number) => {
        formData.append(`ajax[new][attachments][${index === 0 ? 'assignmentTemp' : Math.floor(Math.random() * 100000000)}][title]`, attachment.title);
        formData.append(`ajax[new][attachments][${index === 0 ? 'assignmentTemp' : Math.floor(Math.random() * 100000000)}][attach]`, attachment.attach);
      })
    } else {
      formData.set(`ajax[new][${key}]`, value);
    }
  });

  const response = await API.Post<unknown>(`/instructor/assignments/store`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});


export const updateAssignmentInChapter = cache(async (item_id: number, payload: AddUpdateAssignmentInChapterPayload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'attachments') {
      value.forEach((attachment: any, index: number) => {
        formData.append(`ajax[${item_id}][attachments][${index === 0 ? 'assignmentTemp' : Math.floor(Math.random() * 100000000)}][title]`, attachment.title);
        formData.append(`ajax[${item_id}][attachments][${index === 0 ? 'assignmentTemp' : Math.floor(Math.random() * 100000000)}][attach]`, attachment.attach);
      })
    } else {
      formData.set(`ajax[${item_id}][${key}]`, value);
    }
  });

  const response = await API.Post<unknown>(`/instructor/assignments/${item_id}/update`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const deleteAssignmentById = cache(async (item_id: number) => {
  const response = await API.Get<unknown>(`/instructor/assignments/${item_id}/delete`, { withToken: true });
  return response;
});