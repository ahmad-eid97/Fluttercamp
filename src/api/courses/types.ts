import type { User, DetailedUser, ShortUser, Bundle } from "@/types";

export interface GetClientCoursesResponse {
  current_page: number;
  data: Course[] | Bundle[];
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

export interface Course {
  image: string;
  auth: boolean;
  can: Can;
  can_view_error: null;
  id: number;
  status: string;
  label: string;
  title: string;
  type: string;
  link: string;
  access_days: null;
  live_webinar_status: null;
  auth_has_bought: null;
  sales: Sales;
  is_favorite: boolean;
  price_string: null;
  best_ticket_string: null;
  price: string;
  tax: number;
  tax_with_discount: number;
  best_ticket_price: number;
  discount_percent: string;
  course_page_tax: number;
  price_with_discount: number;
  discount_amount: number;
  active_special_offer: ActiveSpecialOffer;
  duration: string;
  teacher: User;
  students_count: number;
  rate: number;
  rate_type: RateType;
  created_at: string;
  start_date: string | null;
  purchased_at: null;
  reviews_count: number;
  points: null;
  progress: number | null;
  progress_percent: string | null;
  category: string;
  capacity: null;
}

export interface DetailedCourse {
  image: string;
  auth: boolean;
  can: Can;
  can_view_error: null;
  id: number;
  status: string;
  label: string;
  title: string;
  type: string;
  link: string;
  access_days: null;
  live_webinar_status: null;
  auth_has_bought: null;
  sales: Sales;
  is_favorite: boolean;
  price_string: string;
  best_ticket_string: null;
  price: string;
  tax: number;
  tax_with_discount: number;
  best_ticket_price: number;
  discount_percent: number;
  course_page_tax: number;
  price_with_discount: number;
  discount_amount: number;
  active_special_offer: null;
  duration: string;
  teacher: User;
  students_count: number;
  rate: number;
  rate_type: RateType;
  created_at: string;
  start_date: null;
  purchased_at: null;
  reviews_count: number;
  points: null;
  progress: number | null;
  progress_percent: string | null;
  category: string;
  capacity: null;
  support: boolean;
  subscribe: boolean;
  description: string;
  prerequisites: any[];
  faqs: FAQ[];
  comments: Comment[];
  session_chapters: Chapter[];
  sessions_without_chapter: any[];
  sessions_count: number;
  files_chapters: Chapter[];
  files_without_chapter: any[];
  files_count: number;
  text_lesson_chapters: Chapter[];
  text_lessons_without_chapter: any[];
  text_lessons_count: number;
  quizzes: Quiz[];
  quizzes_count: number;
  certificate: any[];
  auth_certificates: any[];
  reviews: Review[];
  video_demo: string;
  video_demo_source: 'youtube' | 'vimeo';
  image_cover: string;
  tickets: any[];
  isDownloadable: boolean;
  teacher_is_offline: boolean;
  tags: Tag[];
  auth_has_subscription: null;
  can_add_to_cart: null;
  can_buy_with_points: boolean;
  chapters?: Chapter[];
  forum?: boolean;
}

export interface Comment {
  id: number;
  status: string;
  comment_user_type: string;
  create_at: string;
  comment: string;
  blog: null;
  user: DetailedUser;
  webinar: Course;
  product: null;
  replies: any[];
}

export interface Review {
  id: number;
  auth: null;
  user: ShortUser;
  created_at: string;
  description: string;
  rate: string;
  rate_type: RateType;
  replies: Reply[];
}

export interface Reply {
  id: number;
  user: {
    full_name: string;
    avatar: string;
  };
  created_at: string;
  comment: string;
}

export interface ActiveSpecialOffer {
  id: number;
  creator_id: string;
  webinar_id: string;
  bundle_id: null;
  subscribe_id: null;
  registration_package_id: null;
  name: string;
  percent: string;
  status: string;
  created_at: string;
  from_date: string;
  to_date: string;
}

export interface Can {
  view: boolean;
}

export interface RateType {
  content_quality: number;
  instructor_skills: number;
  purchase_worth: number;
  support_quality: number;
}

export interface Sales {
  count: number;
  amount: number;
}

export interface FAQ {
  id: number;
  title: string;
  answer: string;
  order: string;
  created_at: string;
  updated_at: null;
}

export interface RateType {
  content_quality: number;
  instructor_skills: number;
  purchase_worth: number;
  support_quality: number;
}

export interface Quiz {
  id: number;
  title: string;
  time: string;
  auth_status: null;
  question_count: number;
  total_mark: number;
  pass_mark: string;
  average_grade: number;
  student_count: number;
  certificates_count: number;
  success_rate: number;
  status: string;
  attempt: string;
  created_at: string;
  certificate: string;
  teacher: User;
  auth_attempt_count: null;
  attempt_state: string;
  auth_can_start: null;
  webinar: Course;
}

export interface Tag {
  id: number;
  title: string;
}

export interface Can {
  view: boolean;
}

export interface Chapter {
  id: number;
  user_id: string;
  webinar_id: string;
  order: null;
  check_all_contents_pass: string;
  status: string;
  created_at: string;
  title: null;
  chapter_items: ChapterItem[];
  translations: Translations[];
}

export interface ChapterItem {
  id: number;
  user_id: string;
  chapter_id: string;
  item_id: string;
  type: string;
  order: string;
  created_at: string;
  file: File | null;
  session: Session | null;
  text_lesson: TextLesson | null;
  quiz: null;
  assignment: any;
}

export interface Session {
  id: number;
  title: string;
  auth_has_read: null;
  user_has_access: boolean;
  is_finished: boolean;
  is_started: boolean;
  status: string;
  order: null;
  moderator_secret: null;
  date: string;
  duration: string;
  link: string;
  join_link: null;
  can_join: boolean;
  session_api: string;
  zoom_start_link: null;
  api_secret: string;
  description: string;
  created_at: string;
  updated_at: null;
  is_video: undefined;
  "agora_settings ": null;
}

export interface File {
  id: number;
  title: string;
  auth_has_read: null;
  status: string;
  order: null;
  downloadable: string;
  accessibility: string;
  description: string;
  storage: 'upload' | 'youtube' | 'vimeo' | 'external_link' | 'google_drive';
  download_link: string;
  auth_has_access: null;
  user_has_access: boolean;
  file: string;
  volume: string;
  file_type: string;
  is_video: boolean;
  interactive_type: null;
  interactive_file_name: null;
  interactive_file_path: null;
  created_at: string;
  updated_at: null;
  duration?: string;
  session_api: undefined;
}

export interface TextLesson {
  id: number;
  title: string;
  auth_has_read: null;
  auth_has_access: null;
  user_has_access: boolean;
  study_time: string;
  order: string;
  created_at: string;
  accessibility: string;
  status: string;
  updated_at: null;
  summary: string;
  content: string;
  locale: string;
  attachments: any[];
  is_video: undefined;
  duration: undefined;
  attachments_count: number;
  session_api: undefined;
}

export interface RateType {
  content_quality: number;
  instructor_skills: number;
  purchase_worth: number;
  support_quality: number;
}

export interface Sales {
  count: number;
  amount: number;
}

export interface Tag {
  id: number;
  title: string;
}

export enum ReportReasons {
  "InappropriateCourseContent" = "Inappropriate Course Content",
  "InappropriateBehavior" = "Inappropriate Behavior",
  "PolicyViolation" = "Policy Violation",
  "SpammyContent" = "Spammy Content",
  "Other" = "Other"
}

export interface CourseChapters {
  type: string;
  id: number;
  title: string;
  topics_count: number;
  created_at: string;
  check_all_contents_pass: string;
  items: ContentItem[];
}

export interface ContentItem {
  can: Can;
  can_view_error: string;
  auth_has_read: boolean;
  type: string;
  created_at: string;
  link: string;
  id: number;
  title: string;
  file_type?: string;
  storage?: 'upload' | 'youtube' | 'vimeo';
  volume?: string;
  downloadable?: string;
  date?: string;
}


export interface ReportCoursePayload {
  reason: ReportReasons | string;
  message: string;
}

export interface ValidateCertificateResponse {
  is_valid: boolean;
  certificate: null;
}

export interface CoursesBundlesFilters {
  page: number;
  sort: 'newest' | 'expensive' | 'inexpensive' | 'bestsellers' | 'best_rates';
  upcoming: "1" | "0";
  free: "1" | "0";
  discount: "1" | "0";
  downloadable: "1" | "0";
  type: "webinar" | "course" | "text_lesson" | "bundle" | undefined;
  cat: number;
  filter_option: number;
  'moreOptions[]': string;
  main_section_id: string;
}

export interface ToggleLessonViewPayload {
  item: 'file_id' | 'session_id' | 'text_lesson_id' | 'assignment_id' | 'quiz_id';
  item_id: string;
  status: '1' | '0'
}

export interface AddReviewPayload {
  webinar_id: number;
  content_quality: number;
  instructor_skills: number;
  purchase_worth: number;
  support_quality: number;
  description: string;
}

export interface LocalVideoLesson {
  id: number;
  title: string;
  description: string;
  can_view_error: null;
  auth_has_read: boolean;
  auth_has_access: boolean;
  user_has_access: boolean;
  file_type: string;
  volume: string;
  storage: string;
  created_at: string;
  download_link: string;
  file: string;
}

export interface Translations {
  id: number;
  webinar_chapter_id: string;
  locale: string;
  title: string;
}




export interface JoinAgoraResponse {
  pageTitle: string;
  session: AgoraSession;
  isHost: boolean;
  appId: string;
  accountName: string;
  userName: string;
  channelName: string;
  rtcToken: string;
  rtmToken: string;
  streamRole: string;
  notStarted: boolean;
  streamStartAt: number;
  authUserId: number;
  hostUserId: string;
  sessionStreamType: string;
}

export interface AgoraSession {
  id: number;
  creator_id: string;
  webinar_id: string;
  chapter_id: string;
  reserve_meeting_id: null;
  date: string;
  duration: string;
  link: null;
  extra_time_to_join: string;
  zoom_start_link: null;
  zoom_id: null;
  session_api: string;
  api_secret: null;
  moderator_secret: null;
  agora_settings: {
    chat: boolean;
    record: boolean;
    users_join: boolean;
  };
  check_previous_parts: string;
  access_after_day: string;
  order: null;
  status: string;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  title: null;
  description: null;
  translations: {
    id: number;
    session_id: string;
    locale: string;
    title: string;
    description: string;
  }[];
}
