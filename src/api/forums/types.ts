import type { DetailedUser } from "@/types";

export interface ForumTopicsFilters {
  from: string;
  to: string;
  forum_id: 'all' | string;
  status: 'all' | 'published' | 'closed';
}

/**
 * TOPICS
 */
export interface GetTopicsResponse {
  pageTitle: string;
  forums: Forum[];
  topics: TopicsWithMeta;
  publishedTopics: number;
  lockedTopics: number;
  topicMessages: number;
}

export interface Forum {
  id: number;
  slug: string;
  role_id: null;
  group_id: null;
  parent_id: string;
  icon: string;
  status: string;
  close: string;
  order: string;
  topics_count: string;
  posts_count: number;
  lastTopic: Topic;
  title: null;
  description: null;
  sub_forums?: Forum[];
  translations: {
    id: number;
    forum_id: string;
    locale: string;
    title: string;
    description: string;
  }[];
}

export interface TopicsWithMeta {
  current_page: number;
  data: Topic[];
  first_page_url: string;
  from: null;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: null;
  total: number;
}

export interface Topic {
  id: number;
  creator_id: string;
  forum_id: string;
  slug: string;
  title: string;
  description: string;
  pin: string;
  close: string;
  created_at: string;
  posts_count: string;
  forum: Forum;
  creator: DetailedUser;
  lastPost?: {
    id: number;
    user_id: string;
    topic_id: string;
    parent_id: null;
    description: string;
    attach: string;
    pin: string;
    created_at: string;
  }
}


export interface BookmarkedTopicsReponse {
  pageTitle: string;
  topics: BookmarkedTopicsWithMeta;
}

export interface BookmarkedTopicsWithMeta {
  current_page: number;
  data: BookmarkedTopic[];
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

export interface BookmarkedTopic {
  id: number;
  creator_id: string;
  forum_id: string;
  slug: string;
  title: string;
  description: string;
  pin: string;
  close: string;
  created_at: string;
  posts_count: string;
  forum: Forum;
}

/**
 * Replies
 */
export interface GetTopicRepliesResponse {
  pageTitle: string;
  forums: Forum[];
  posts: RepliesWithMeta;
}

export interface RepliesWithMeta {
  current_page: number;
  data: TopicReply[];
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

export interface TopicReply {
  id: number;
  user_id: string;
  topic_id: string;
  parent_id: null;
  description: string;
  attach: string;
  pin: string;
  created_at: string;
  replies_count: number;
  topic: Topic;
  user: {
    id: number;
    full_name: string;
    avatar: string;
    avatar_settings?: null;
  };
}

export interface GetForumsResponse {
  pageTitle: string;
  pageDescription: string;
  pageRobot: string;
  forums: DetailedForum[];
  forumsCount: number;
  topicsCount: number;
  postsCount: number;
  membersCount: string;
  featuredTopics: Topic[];
  recommendedTopics: Topic[];
}

export interface DetailedForum {
  id: number;
  slug: string;
  role_id: null;
  group_id: null;
  parent_id: null | string;
  icon: string;
  status: string;
  close: string;
  order: null | string;
  topics_count: string;
  title: null;
  description: null;
  sub_forums?: Forum[];
  translations: {
    id: number;
    forum_id: string;
    locale: string;
    title: string;
    description: string;
  }[];
  posts_count?: number;
  lastTopic?: {
    id: number;
    creator_id: string;
    forum_id: string;
    slug: string;
    title: string;
    description: string;
    pin: string;
    close: string;
    created_at: string;
  };
}

export interface GetDataForCreateTopicResponse {
  pageTitle: string;
  pageDescription: string;
  pageRobot: string;
  forums: (Forum & { sub_forums?: Forum[] })[];
}

export interface ForumTopicPayload {
  title: string;
  forum_id: number;
  description: string;
  attachments?: string[]; //==> Attachments links
}

export interface CreateTopicResponse {
  title: string;
  msg: string;
  status: string;
  data: {
    slug: string;
    creator_id: number;
    forum_id: string;
    title: string;
    description: string;
    close: boolean;
    created_at: number;
    id: number;
  };
}

export interface SearchInTopicsResponse {
  pageTitle: string;
  pageDescription: string;
  pageRobot: string;
  topics: TopicsWithMeta;
  topUsers: TopUser[];
  popularTopics: PopularTopic[];
  resultCount: number;
}

export interface PopularTopic {
  id: number;
  creator_id: string;
  forum_id: string;
  slug: string;
  title: string;
  description: string;
  pin: string;
  close: string;
  created_at: string;
  posts_count: string;
  creator: DetailedUser;
  lastPost?: LastPost | null;
}

export interface LastPost {
  id: number;
  user_id: string;
  topic_id: string;
  parent_id: null;
  description: string;
  attach: null | string;
  pin: string;
  created_at: string;
}

export interface TopUser {
  id: number;
  full_name: string;
  avatar: string;
  topics: string;
  posts: string;
  all_posts: string;
}

export interface GetForumTopicsResponse {
  pageTitle: string;
  pageDescription: string;
  pageRobot: string;
  forum: Forum;
  topics: TopicsWithMeta;
  topUsers: TopUser[];
  popularTopics: ForumPopularTopic[];
  resultCount: number;
}

export interface ForumPopularTopic {
  id: number;
  creator_id: string;
  forum_id: string;
  slug: string;
  title: string;
  description: string;
  pin: string;
  close: string;
  created_at: string;
  posts_count: string;
  creator: {
    id: number;
    full_name: string;
    avatar: string;
  };
  lastPost?: {
    id: number;
    user_id: string;
    topic_id: string;
    parent_id: null;
    description: string;
    attach: null;
    pin: string;
    created_at: string;
  };
}

export interface GetEditDataForTopicResponse {
  pageTitle: string;
  pageDescription: string;
  pageRobot: string;
  forums: Forum[];
  topic: {
    id: number;
    creator_id: string;
    forum_id: string;
    slug: string;
    title: string;
    description: string;
    pin: string;
    close: string;
    created_at: string;
    attachments: {
      id: number;
      creator_id: string;
      topic_id: string;
      path: string;
    }[];
  };
}

export interface ToggleReplyLikeResponse {
  code: number;
  likes: number;
  status: boolean;
}

export interface BookmarkTopicResponse {
  code: number;
  add: boolean;
}

export interface GetTopicRepliesWebsiteResponse {
  pageTitle: string;
  pageDescription: string;
  pageRobot: string;
  forum: Forum;
  topic: TopicWithPosts;
  likedPostsIds: Array<null | string>;
}

export interface TopicWithPosts {
  id: number;
  creator_id: string;
  forum_id: string;
  slug: string;
  title: string;
  description: string;
  pin: string;
  close: string;
  created_at: string;
  posts_count: string;
  likes_count: string;
  liked_count: boolean;
  liked: boolean;
  bookmarked: boolean;
  creator: DetailedUser;
  forum: Forum;
  attachments: {
    id: number;
    creator_id: string;
    topic_id: string;
    path: string;
  }[];
  posts: Post[];
}

export interface Post {
  id: number;
  user_id: string;
  topic_id: string;
  parent_id: string | null;
  description: string;
  attach: string | null;
  pin: string;
  created_at: string;
  likes_count: string;
  parent: Post | null;
  user: DetailedUser;
}


export interface GetEditDataForTopicReply {
  code: number;
  post: Post;
}

export interface CreateUpdateReplyPayload {
  description: string;
  reply_post_id?: number;
  attach?: string;
}

export interface ReportTopicOrReplyPayload {
  item_id: number;
  item_type: 'topic' | 'topic_post';
  message: string;
}

export interface CourseForumDataResponse {
  forums: Forums;
  questions_count: number;
  resolved_count: number;
  open_questions_count: number;
  comments_count: number;
  active_users_count: string;
}

export interface Forums {
  data: ForumData[];
  links: Links;
  meta: Meta;
}

export interface ForumData {
  id: number;
  title: string;
  user: ForumUserData;
  pin: boolean;
  description: string;
  answers_count: string;
  resolved: boolean;
  attachment: string;
  can: {
    pin: boolean;
    update: boolean;
  };
  created_at: string;
  active_users?: string[];
  more?: number;
  last_activity?: string;
  last_answer?: {
    description: string;
    user: {
      full_name: string;
      avatar: string;
    };
  };
}

export interface ForumUserData {
  id: number;
  avatar: string;
  full_name: string;
  role_name?: string;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ForumAnswerResponse {
  answers: ForumAnswer[]
  forum: ForumQuestionData;
  forum_user: ForumUserData;
}

export interface ForumQuestionData {
  id: number;
  webinar_id: string;
  user_id: string;
  title: string;
  description: string;
  attach: null;
  pin: string;
  created_at: string;
}

export interface ForumAnswer {
  id: number;
  description: string;
  pin: boolean;
  resolved: boolean;
  user: User;
  created_at: string;
  can: Can;
}

export interface Can {
  pin: boolean;
  resolve: boolean;
  update: boolean;
}

export interface User {
  id: number;
  full_name: string;
  avatar: string;
  role_name: string;
}

export interface BookmarksFilters {
  page: number;
}