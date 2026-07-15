import { cache } from 'react';
import API from "../request.handler";
//= Types
import { GetAssignmentStatsResponse, SendMessageToAssignmentPayload } from './types';

export const getAssignmentStats = cache(async (assignment_id: number) => {
  const response = await API.Get<GetAssignmentStatsResponse>(`/panel/assignments/${assignment_id}`, { withToken: true });
  return response;
});

export const getAssignmentSubmissions = cache(async (assignment_id: number) => {
  const response = await API.Get<unknown>(`/instructor/assignments/${assignment_id}/students`, { withToken: true });
  return response;
});

export const sendSolutionOrReplyToAssignment = async (assignment_id: number, payload: SendMessageToAssignmentPayload) => {
  const response = await API.Post<unknown>(`/panel/assignments/${assignment_id}/messages`, { withToken: true, body: payload });
  return response;
};