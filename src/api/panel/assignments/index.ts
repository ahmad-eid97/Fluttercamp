import { cache } from "react";
import API from "../../request.handler";
//= Types
import type {
  GetAssignmentResponse,
  AddUpdateAssignmentPayload,
  GetAssignmentStudentsResponse,
  StudentAssignmentPayload,
  AssignmentMessage,
  AssignmentResponse
} from './types';

export const getAllAssignments = cache(async () => {
  const response = await API.Get<GetAssignmentResponse>(`/panel/my_assignments`, { withToken: true });
  return response;
});


export const getStudentsAssignments = cache(async () => {
  const response = await API.Get<GetAssignmentResponse>(`/instructor/assignments`, { withToken: true });
  return response;
});


export const getAssignmentStudents = cache(async (assignment_id: number) => {
  const response = await API.Get<GetAssignmentStudentsResponse[]>(`/instructor/assignments/${assignment_id}/students`, { withToken: true });
  return response;
});


export const addAssignment = async (assignment_id: number, payload: AddUpdateAssignmentPayload) => {
  const formdata = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formdata.set(`ajax[new][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/assignments/${assignment_id}/store`, { withToken: true, formdata });
  return response;
};


export const updateAssignment = async (assignment_id: number, payload: AddUpdateAssignmentPayload) => {
  const formdata = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formdata.set(`ajax[${assignment_id}][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/assignments/${assignment_id}/update`, { withToken: true, formdata });
  return response;
};


export const deleteAssignment = async (assignment_id: number) => {
  const response = await API.Get<unknown>(`/instructor/assignments/${assignment_id}/delete`, { withToken: true });
  return response;
};


export const getAssignmentById = async (assignment_id: number) => {
  const response = await API.Get<AssignmentResponse>(`/panel/assignments/${assignment_id}`, { withToken: true });
  return response;
};

export const getSolutionsOfAssignment = async (assignment_id: number) => {
  const response = await API.Get<AssignmentMessage[]>(`/panel/assignments/${assignment_id}/messages`, { withToken: true });
  return response;
};

export const addSolutionToAssignment = async (assignment_id: number, payload: StudentAssignmentPayload) => {
  const response = await API.Post<unknown>(`/panel/assignments/${assignment_id}/messages`, { withToken: true, body: payload });
  return response;
};