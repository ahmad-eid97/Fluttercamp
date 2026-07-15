import { CommonWebinar, User } from '@/types';

export interface GetCommentsResponse {
  my_comment: MyComment;
  class_comment: CourseComment[];
}

export interface MyComment {
  blogs: CourseComment[];
  webinar: CourseComment[];
}

export interface CourseComment {
  id: number;
  status: string;
  comment_user_type: string;
  create_at: string;
  comment: string;
  blog: CommentBlog | null;
  user: User;
  webinar: CommonWebinar | null;
  product: null;
  replies: any[];
}

export interface CommentBlog {
  id: number;
  title: string;
  image: string;
  description: string;
  created_at: string;
  author: User;
  comment_count: number;
  category: string;
}

export interface AddCommentPayload {
  item_id: number;
  item_name: string;
  comment: string;
}

export interface ReplyToCommentPayload {
  reply: string;
  item_id: number;
  item_name: "blog_id" | 'webinar';
  comment_id: number;
}