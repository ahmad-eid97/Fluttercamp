import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type { AddUpdatePrerequisitePayload, } from '@/types';

export const addNewPrerequisiteToCourse = cache(async (payload: AddUpdatePrerequisitePayload) => {
  const formdata = new FormData();
  Object.entries(payload).forEach(([key, value]) => formdata.set(`ajax[new][${key}]`, value));

  const response = await API.Post<unknown>(`/instructor/prerequisites/store`, {
    withToken: true, formdata, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});


export const updatePrerequisiteInCourse = cache(async (prerequisite_id: number, payload: AddUpdatePrerequisitePayload) => {
  const formdata = new FormData();
  Object.entries(payload).forEach(([key, value]) => formdata.set(`ajax[${prerequisite_id}][${key}]`, value));

  const response = await API.Post<unknown>(`/instructor/prerequisites/${prerequisite_id}/update`, {
    withToken: true, formdata, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const deletePrerequisiteById = cache(async (prerequisite_id: number) => {
  const response = await API.Get<unknown>(`/instructor/prerequisites/${prerequisite_id}/delete`, { withToken: true });
  return response;
});