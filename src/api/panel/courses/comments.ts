import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type {
  GetCommentsResponse,
  AddCommentPayload,
  ReplyToCommentPayload,
} from '@/types';

export const getComments = cache(async (type: 'my-comments' | 'course-comments') => {
  const response = await API.Get<GetCommentsResponse>(`/panel/comments`, { withToken: true });
  if (response) {
    const handledResponse = [];
    type === 'my-comments' ? handledResponse.push(...response.my_comment.blogs, ...response.my_comment.webinar) : handledResponse.push(...response.class_comment)
    return handledResponse;
  }
});

export const deleteComment = async (comment_id: number) => {
  const response = await API.Delete<unknown>(`/panel/comments/${comment_id}`, { withToken: true });
  if (response) return response;
};

export const createComment = async (payload: AddCommentPayload) => {
  const response = await API.Post<unknown>(`/panel/comments`, { body: payload, withToken: true });
  if (response) return response;
};

export const replyToComment = async (comment_id: number, payload: ReplyToCommentPayload) => {
  const response = await API.Post<unknown>(`/panel/comments/${comment_id}/reply`, { body: payload, withToken: true });
  if (response) return response;
};

export const reportComment = async (comment_id: number, message: string) => {
  const response = await API.Post<unknown>(`/panel/comments/${comment_id}/report`, { body: { message }, withToken: true });
  if (response) return response;
};