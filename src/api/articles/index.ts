import { cache } from 'react';
import API from "../request.handler";
//= Types
import { ArticlePost, getArticlesResponse, ArticleCategory, ArticlesFilters } from './types';

export const getAllArticles = cache(async (filters?: Partial<ArticlesFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) {
      // @ts-ignore
      queryParams += `${encodeURIComponent(key)}=${filters[key]}&`;
    }
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<getArticlesResponse>(`/blogs${queryParams ? queryParams : ''}`);

  if (response) {
    return response;
  }
});

export const getArticlesCategories = cache(async () => {
  const response = await API.Get<ArticleCategory[]>(`/blogs/categories`);

  if (response) {
    return response;
  }
});

export const getArticleById = cache(async (article_id: number) => {
  const response = await API.Get<{ blog: ArticlePost }>(`/blogs/${article_id}`);

  if (response) {
    return response.blog;
  }
});