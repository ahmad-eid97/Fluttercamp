import { cache } from 'react';
import API from "../request.handler";
//= Types
import { CategoriesResponse, CategoryWebinars } from './types';

export const getAllCategories = cache(async (section_id?: string) => {
  const response = await API.Get<CategoriesResponse>(`/categories${section_id ? `?main_section_id=${section_id}` : ''}`, { withToken: true });

  if (response) {
    return response;
  }
});

export const getCategoryCourses = cache(async (category_id: number) => {
  const response = await API.Get<CategoryWebinars>(`/categorie/${category_id}/webinars`, { withToken: true });

  if (response) {
    return response;
  }
});