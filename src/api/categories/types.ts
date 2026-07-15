import type { Course } from "@/types";

export interface CategoriesResponse {
  count: number;
  categories: Category[];
}

export interface Category {
  id: number;
  title: string;
  color: null;
  icon: string;
  sub_categories: Category[];
  webinars_count: number;
}

export interface CategoryWebinars {
  filters: any[];
  webinars: Course[];
}