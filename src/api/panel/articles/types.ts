//= Articles
export interface ArticleResponse {
  pageTitle: string;
  posts: ArticlesWithMeta;
  postsCount: number;
  commentsCount: number;
  pendingPublishCount: number;
}

export interface ArticlesWithMeta {
  current_page: number;
  data: Article[];
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

export interface Article {
  id: number;
  category_id: string;
  author_id: string;
  slug: string;
  image: string;
  visit_count: string;
  enable_comment: string;
  status: string;
  created_at: string;
  updated_at: string;
  comments_count: string;
  title: null;
  description: null;
  meta_description: null;
  content: null;
  translations: Translation[];
}

export interface Translation {
  id: number;
  blog_id: string;
  locale: string;
  title: string;
  description: string;
  content: string;
  meta_description: string;
}

export interface Author {
  full_name: string;
}

export interface User {
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
}

export interface GetDataForCreateArticleResponse {
  pageTitle: string;
  blogCategories: {
    id: number;
    title: string;
    slug: string;
  }[];
}

export interface GetDataForEditArticleResponse {
  pageTitle: string;
  blogCategories: {
    id: number;
    title: string;
    slug: string;
  }[];
  locale: string;
  post: PostForEdit;
}

export interface PostForEdit {
  id: number;
  category_id: string;
  author_id: string;
  slug: string;
  image: string;
  visit_count: string;
  enable_comment: string;
  status: string;
  created_at: string;
  updated_at: string;
  locale: string;
  title: null;
  description: null;
  meta_description: null;
  content: null;
  translations: {
    id: number;
    blog_id: string;
    locale: string;
    title: string;
    description: string;
    content: string;
    meta_description: string;
  }[];
}


export interface CreateUpdateArticlePayload {
  locale: "EN" | "AR";
  title: string;
  category_id: number;
  image: string;
  description: string;
  content: string;
}



/**
 * Comments
 */

export interface GetAllCommentsResponse {
  pageTitle: string;
  posts: CommentPost[];
  comments: Comments;
}

export interface Comments {
  data: ArticleComment[];
  links: {
    first: string;
    last: string;
    prev: null;
    next: null;
  };
  meta: {
    current_page: number;
    from: null;
    last_page: number;
    path: string;
    per_page: number;
    to: null;
    total: number;
  };
}

export interface ArticleComment {
  id: number;
  status: string;
  comment_user_type: null;
  create_at: string;
  comment: string;
  can: {
    delete: boolean;
    report: boolean;
    reply: boolean;
  };
  blog: CommentPost;
  user: {
    full_name: string;
    avatar: string;
  } | null;
  replies: Reply[];
}

export interface CommentPost {
  id: number;
  title: string;
  url: string;
}

export interface Reply {
  id: number;
  comment_user_type: null;
  user: {
    full_name: string;
    avatar: string;
  };
  create_at: string;
  comment: string;
}

export interface CommentsFilters {
  from: string;
  to: string;
  blog_id: string;
  page: number;
}

export interface ArticlesFilters {
  page: number;
}