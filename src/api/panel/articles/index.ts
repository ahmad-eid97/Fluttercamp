import API from "@/api/request.handler";
import { cache } from "react";
//= Types
import { ArticleResponse, GetAllCommentsResponse, CommentsFilters, CreateUpdateArticlePayload, GetDataForCreateArticleResponse, GetDataForEditArticleResponse, ArticlesFilters } from "./types";

export const getArticles = cache(async (filters?: Partial<ArticlesFilters>) => {
  let queryParams = `?`;
  if (filters) {
    // @ts-ignore
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key]}&`;
    queryParams = queryParams.slice(0, -1);
  }
  const response = await API.Get<ArticleResponse>(`/panel/blog/posts${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
})

export const getArticlesComments = cache(async (filters?: Partial<CommentsFilters>) => {
  let queryParams = `?`;
  if (filters) {
    // @ts-ignore
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key]}&`;
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<GetAllCommentsResponse>(`/panel/blog/comments${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
})

export const getDataForCreateArticle = async () => {
  const response = await API.Get<GetDataForCreateArticleResponse>(`/panel/blog/posts/new`, { withToken: true });
  return response;
};

export const createNewArticle = async (payload: CreateUpdateArticlePayload) => {
  const response = await API.Post<unknown>(`/panel/blog/posts/store`, { withToken: true, body: payload });
  return response;
};

export const getDataForEditArticle = async (article_id: number) => {
  const response = await API.Get<GetDataForEditArticleResponse>(`/panel/blog/posts/${article_id}/edit`, { withToken: true });
  return response;
};

export const updateArticle = async (article_id: number, payload: Partial<CreateUpdateArticlePayload>) => {
  const response = await API.Post<unknown>(`/panel/blog/posts/${article_id}/update`, { withToken: true, body: payload });
  return response;
};

export const deleteArticle = async (article_id: number) => {
  const response = await API.Get<unknown>(`/panel/blog/posts/${article_id}/delete`, { withToken: true });
  return response;
};