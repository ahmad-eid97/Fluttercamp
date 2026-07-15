import type { Can, RateType, User, Review, Locale } from '@/types';

export interface NewCoursePayload {
  type: string;
  title: string;
  seo_description: string;
  thumbnail: string;
  image_cover: string;
  video_demo_source: string;
  video_file: string;
  video_demo: string;
  description: string;
}

export interface UpdateCoursePayload {
  current_step: number;
  draft: "1" | "0";
  get_next: number;
  get_step: number;
  capacity: number;
  duration: number;
  timezone: string;
  forum: 'on' | 'off';
  support: 'on' | 'off';
  partner_instructor: 'on' | 'off';
  tags: string;
  category_id: number;
  type: 'webinar' | 'course' | 'text_lesson';
  title: string;
  thumbnail: string;
  image_cover: string;
  description: string;
  partners: number[];
  start_date: string;
  rules: 0 | 1;
  private: 0 | 1;
  video_demo: string;
  video_demo_source: string;
  subscribe: 1 | 0;
  organization_price: number;
  price: number;
  filters: any;
  locale: 'EN' | 'AR';
  seo_description: string;
  access_days: number;
  message_for_reviewer: string;
}

export interface GetCoursesResponse {
  webinars: WebinarsWithMeta;
  webinarsCount: number;
  webinarSalesAmount: number;
  courseSalesAmount: number;
  webinarHours: string;
  pageTitle: string;
}

export interface WebinarsWithMeta {
  current_page: number;
  data: PanelWebinar[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface PanelWebinar {
  id: number;
  teacher_id: string;
  creator_id: string;
  category_id: string;
  type: WebinarType;
  private: string;
  slug: string;
  start_date: null | string;
  duration: string;
  timezone: string | null;
  thumbnail: string;
  image_cover: string;
  video_demo: string;
  video_demo_source: VideoDemoSource;
  capacity: string;
  price: string;
  organization_price: null;
  support: number | string;
  certificate: number | string;
  downloadable: number | string;
  partner_instructor: number | string;
  subscribe: string;
  forum: number | string;
  enable_waitlist: string;
  access_days: null | string;
  points: null;
  message_for_reviewer: null;
  status: WebinarStatus;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  locale: null;
  title: null;
  description: null;
  seo_description: null;
  reviews: Review[];
  category: Category;
  teacher: DetailedPanelUser;
  sales: {
    count: number;
    amount: number;
  }[];
  chapters?: Chapter[];
  quizzes?: any;
  translations: {
    id: number;
    webinar_id: string;
    locale: Locale;
    title: string;
    seo_description: string;
    description: string;
  }[];
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
  chapter_items?: {
    id: number;
    user_id: string;
    chapter_id: string;
    item_id: string;
    type: string;
    order: string;
    created_at: string;
    quiz: null;
  }[];
  translations: {
    id: number;
    webinar_chapter_id: string;
    locale: string;
    title: string;
  }[];
}

export interface Category {
  id: number;
  slug: string;
  parent_id: null;
  icon: string;
  order: string;
  title: string | null;
  sub_categories: Category[];
  translations: {
    id: number;
    category_id: string;
    locale: Locale;
    title: string;
  }[];
}

export enum WebinarStatus {
  Active = "active",
  IsDraft = "is_draft",
  Pending = "pending",
}

export interface DetailedPanelUser {
  id: number;
  full_name: string;
  role_name: RoleName;
  organ_id: null;
  mobile: string;
  email: string;
  bio: string;
  logged_count: string;
  verified: string;
  financial_approval: string;
  installment_approval: string;
  enable_installments: string;
  disable_cashback: string;
  enable_registration_bonus: string;
  registration_bonus_amount: null;
  avatar: string;
  avatar_settings: null;
  cover_img: string;
  headline: null;
  about: string;
  address: string;
  country_id: string | null;
  province_id: string | null;
  city_id: string | null;
  district_id: string | null;
  location: string | null;
  level_of_training: string | null;
  meeting_type: MeetingType;
  status: string;
  access_content: string;
  language: string;
  currency: string | null;
  timezone: string;
  newsletter: string;
  public_message: string;
  identity_scan: string;
  certificate: string;
  commission: string | null;
  affiliate: string;
  can_create_store: string;
  ban: string;
  ban_start_at: string | null;
  ban_end_at: string | null;
  offline: string;
  offline_message: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export enum MeetingType {
  All = "all",
  InPerson = 'in_person',
  Online = "online"
}

export enum RoleName {
  Teacher = "teacher",
  User = "user",
  Admin = 'admin'
}

export enum WebinarType {
  Course = "course",
  TextLesson = "text_lesson",
  Webinar = "webinar",
}

export enum VideoDemoSource {
  Vimeo = "vimeo",
  Youtube = "youtube",
  External = "external-link",
  Upload = "upload",
}

export interface GetInstructorCourseStatisticsResponse {
  pageTitle: string;
  webinar: CommonWebinar;
  students: {
    current_page: number;
    data: StatisticsUser[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
  };
  unregisteredUsers: StatisticsUser[];
  studentsCount: number;
  commentsCount: number;
  salesCount: number;
  salesAmount: number;
  chaptersCount: number;
  sessionsCount: number;
  pendingQuizzesCount: number;
  pendingAssignmentsCount: number;
  courseRate: number;
  courseRateCount: number;
  quizzesAverageGrade: number;
  assignmentsAverageGrade: number;
  courseForumsMessagesCount: number;
  courseForumsStudentsCount: number;
  studentsUserRolesChart: Chart;
  courseProgressChart: Chart;
  quizStatusChart: Chart;
  assignmentsStatusChart: Chart;
  monthlySalesChart: Chart;
  courseProgressLineChart: Chart;
}

export interface StatisticsUser {
  id: number;
  full_name: string;
  role_name: string;
  organ_id: null;
  mobile: null;
  email: string;
  bio: null;
  logged_count: string;
  verified: string;
  financial_approval: string;
  installment_approval: string;
  enable_installments: string;
  disable_cashback: string;
  enable_registration_bonus: string;
  registration_bonus_amount: null;
  avatar: string;
  avatar_settings: string;
  cover_img: null;
  headline: null;
  about: null;
  address: null;
  country_id: null;
  province_id: null;
  city_id: null;
  district_id: null;
  location: null;
  level_of_training: null;
  meeting_type: string;
  status: string;
  access_content: string;
  language: null;
  currency: null;
  timezone: null;
  newsletter: string;
  public_message: string;
  identity_scan: null;
  certificate: null;
  commission: null;
  affiliate: string;
  can_create_store: string;
  ban: string;
  ban_start_at: null;
  ban_end_at: null;
  offline: string;
  offline_message: null;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  course_progress: number;
  passed_quizzes: string;
  unsent_assignments: number;
  pending_assignments: number;
}
export interface Chart {
  labels: string[];
  data: number[];
}

export interface GetMyPurchasesResponse {
  webinars: PurchaseWebinar[];
}

export interface PurchaseWebinar {
  id: number;
  image: string;
  image_cover: string;
  status: string;
  label: string;
  link: string;
  title: string;
  type: string;
  rate: number | string;
  rates_count?: number;
  reviews_count: number;
  price: string;
  price_details?: {
    price: string;
    tax: number;
  };
  active_special_offer: null;
  best_ticket: string;
  category: string;
  access_days: null | string;
  expired: boolean;
  expire_on: number | null;
  duration: string;
  webinar_count?: number;
  teacher: User | null;
  sale_amount?: number;
  sales_count: number;
  students_count?: number;
  created_at: string;
  can?: Can;
  can_view_error?: null;
  progress?: number | string;
  progress_percent?: number;
  sales_amount?: string;
  purchased_at?: string;
  start_date?: null | string;
  specification?: {
    duration: string;
    start_date?: string;
    files_count?: number;
    downloadable?: boolean;
  };
  capacity?: string;
}

export interface GetUserCourseStatisticsResponse {
  webinar: WebinarWithStatistics;
}

export interface WebinarWithStatistics {
  id: number;
  image: string;
  image_cover: string;
  status: string;
  title: string;
  can: Can;
  reviews_count: number;
  can_view_error: null;
  type: string;
  link: string;
  label: string;
  progress: number;
  progress_percent: number;
  price: string;
  best_ticket: string;
  active_special_offer: null;
  rate: number;
  access_days: string;
  category: string;
  sales_amount: number;
  sales_count: number;
  created_at: string;
  purchased_at: null;
  start_date: null;
  duration: string;
  specification: {
    duration: string;
    files_count: number;
    downloadable: boolean;
  };
  teacher: User;
  capacity: string;
  students_count: number;
  comments_count: number;
  chapters_count: number;
  sessions_count: number;
  pending_quizzes_count: number;
  pending_assignments_count: number;
  rates_count: number;
  quizzes_count: number;
  quizzes_average_grade: null;
  assignments_count: number;
  assignments_average_grade: number;
  forums_messages_count: number;
  forums_students_count: number;
  students_roles: StudentsRoles;
  quizzes_result_status: Status;
  assignments_status: Status;
  monthly_sales: { [key: string]: number };
  course_progress_line: { [key: string]: number };
  course_progress: CourseProgress;
  students: any[];
}

export interface Status {
  Passed: number;
  Pending: number;
  Failed: number;
}

export interface CourseProgress {
  Completed: number;
  "In Progress": number;
  "Not Started": number;
}

export interface StudentsRoles {
  students: number;
  instructors: number;
  organizations: number;
}

export interface GetFavoritesCoursesResponse {
  favorites: {
    id: number;
    webinar: CommonWebinar;
    created_at: string;
  }[];
}

export interface OrderItemsPayload {
  table: 'tickets' | 'sessions' | 'files' | 'text_lessons' | 'prerequisites' | 'faqs' | 'webinar_chapters';
  items: string;
}

export interface GetDataForCreateResponse {
  pageTitle: string;
  teachers: null;
  categories: Category[];
  isOrganization: boolean;
  currentStep: number;
}

export interface CommonWebinar {
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
  live_webinar_status: string;
  auth_has_bought: boolean;
  sales: {
    count: number;
    amount: number;
  };
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
  rate: string;
  rate_type: RateType;
  created_at: string;
  start_date: string;
  purchased_at: string;
  reviews_count: number;
  points: null;
  progress: string;
  progress_percent: number;
  category: string;
  capacity: string;
}

export interface GetDataForEditWebinarResponse {
  pageTitle: string;
  currentStep: string;
  isOrganization: boolean;
  userLanguages: {
    EN: string;
    AR: string;
  };
  locale: Locale;
  defaultLocale: string;
  stepCount: number;
  categories: Category[];
  webinar: PanelWebinar & {
    tickets?: CourseTicket[];
    prerequisites?: CoursePrerequisite[];
    faqs?: CourseFAQ[];
    webinar_extra_description?: CourseExtraDescription[];
  };
  definedLanguage: Locale[];
  webinarTags: any[];
  webinarCategoryFilters: any[];
}

export interface CourseTicket {
  id: number;
  creator_id: string;
  webinar_id: string;
  bundle_id: null;
  start_date: string;
  end_date: string;
  discount: string;
  capacity: string;
  order: null;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  title: null;
  translations: {
    id: number;
    ticket_id: string;
    locale: string;
    title: string;
  }[];
}

export interface AddNewCourseResponse {
  teacher_id: number;
  creator_id: number;
  type: string;
  private: boolean;
  slug: string;
  thumbnail: string;
  image_cover: string;
  video_demo: null;
  status: string;
  created_at: number;
  id: number;
  duration: number;
  category_id: number;
  support: boolean;
  downloadable: boolean;
  partner_instructor: boolean;
  subscribe: boolean;
  title: null;
  description: null;
  seo_description: null;
  translations: any[];
}

export interface CoursePrerequisite {
  id: number;
  webinar_id: string;
  prerequisite_id: string;
  required: string;
  order: null;
  created_at: string;
  updated_at: null;
  prerequisite_webinar: PrerequisiteWebinar;
}

export interface PrerequisiteWebinar {
  id: number;
  teacher_id: string;
  creator_id: string;
  category_id: string;
  type: string;
  private: string;
  slug: string;
  start_date: string;
  duration: string;
  timezone: string;
  thumbnail: string;
  image_cover: string;
  video_demo: string;
  video_demo_source: string;
  capacity: string;
  price: string;
  organization_price: null;
  support: string;
  certificate: string;
  downloadable: string;
  partner_instructor: string;
  subscribe: string;
  forum: string;
  enable_waitlist: string;
  access_days: string;
  points: null;
  message_for_reviewer: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  title: null;
  description: null;
  seo_description: null;
  teacher: {
    id: number;
    full_name: string;
  };
  translations: {
    id: number;
    webinar_id: string;
    locale: string;
    title: string;
    seo_description: string;
    description: string;
  }[];
}

export interface CourseFAQ {
  id: number;
  creator_id: string;
  webinar_id: string;
  bundle_id: null;
  upcoming_course_id: null;
  order: string;
  created_at: string;
  updated_at: null;
  title: null;
  answer: null;
  translations: {
    id: number;
    faq_id: string;
    locale: string;
    title: string;
    answer: string;
  }[];
}

export interface CourseExtraDescription {
  id: number;
  creator_id: string;
  webinar_id: string;
  upcoming_course_id: null;
  type: string;
  order: string;
  created_at: string;
  value: null;
  translations: {
    id: number;
    webinar_extra_description_id: string;
    locale: string;
    value: string;
  }[];
}


export interface SearchInWebinarResponse {
  id: number;
  teacher_id: string;
  locale: string;
  title: string;
  description: null;
  seo_description: null;
  teacher: {
    id: number;
    full_name: string;
  };
  translations: {
    id?: number;
    webinar_id?: string;
    locale: string;
    title: string;
    seo_description?: string;
    description?: string;
  }[];
}