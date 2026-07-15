import type { User } from "@/types";

export interface getArticlesResponse {
  current_page: number;
  data: ArticlePost[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface ArticleCategory {
  id: number;
  title: string;
}

export interface ArticlePost {
  id: number;
  title: string;
  image: string;
  description: string;
  content: string;
  created_at: string;
  locale: string;
  author: User;
  comment_count: number;
  comments: IArticleComment[];
  category: string;
}

export interface ArticlesFilters {
  page: number;
  main_section_id: string;
}

export interface IArticleComment {
  id: number;
  status: string;
  comment_user_type: string;
  create_at: string;
  comment: string;
  blog: ArticleCommentBlog;
  user: User;
  webinar: null;
  product: null;
  replies: {
    id: number;
    comment_user_type: string;
    user: User;
    create_at: string;
    comment: string;
  }[];
}

export interface ArticleCommentBlog {
  id: number;
  title: string;
  image: string;
  description: string;
  created_at: string;
  author: {
    id: number;
    full_name: string;
    role_name: string;
    bio: string;
    offline: string;
    offline_message: null;
    verified: string;
    rate: string;
    avatar: string;
    meeting_status: string;
    user_group: null;
    address: string;
  };
  comment_count: number;
  category: string;
}
