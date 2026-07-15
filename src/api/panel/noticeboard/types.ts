export interface NoticeboardFilters {
  from: string;
  to: string;
  webinar_id: string;
  title: string;
  color?: string;
}

export interface GetAllNoticeboardsResponse {
  pageTitle: string;
  noticeboards: NoticeboardsWithMeta;
  webinars: NoticeboardWebinar[];
  totalNoticeboards: number;
  totalCourseNotices: number;
  totalGeneralNotices: number;
}

export interface NoticeboardsWithMeta {
  current_page: number;
  data: Noticeboard[];
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

export interface Noticeboard {
  id: number;
  organ_id: null;
  instructor_id: string;
  webinar_id: string | null;
  user_id: string | null;
  type: string;
  sender: string;
  title: string;
  message: string;
  color?: string;
  created_at: string;
}

export interface NoticeboardWebinar {
  id: number;
  title: null;
  description: null;
  seo_description: null;
  translations: {
    id: number;
    webinar_id: string;
    locale: string;
    title: string;
    seo_description: null | string;
    description: string;
  }[];
}

export interface DataForCreateNoticeboard {
  pageTitle: string;
  webinars: NoticeboardWebinar[];
}

export interface DataForEditNoticeboard {
  pageTitle: string;
  noticeboard: Noticeboard;
  webinars: NoticeboardWebinar[];
}

export interface CreateNoticeboardWebinar {
  id: number;
  title: null;
  description: null;
  seo_description: null;
  translations: {
    id: number;
    webinar_id: string;
    locale: string;
    title: string;
    seo_description: null | string;
    description: string;
  }[];
}

export interface CreateNoticeboardPayload {
  title: string;
  type: 'all' | 'organizations' | 'students' | 'instructors' | 'students_and_instructors';
  message: string;
}



export interface GetAllCourseNoticeboardsResponse {
  pageTitle: string;
  noticeboards: Noticeboards;
  isCourseNotice: boolean;
  webinars: {
    id: number;
    title: null;
    description: null;
    seo_description: null;
    translations: {
      id: number;
      webinar_id: string;
      locale: "en";
      title: string;
      seo_description: null | string;
      description: string;
    }[];
  }[];
}

export interface Noticeboards {
  current_page: number;
  data: CourseNoticeboard[];
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

export interface CourseNoticeboard {
  id: number;
  creator_id: string;
  webinar_id: string;
  color: string;
  title: string;
  message: string;
  created_at: string;
  webinar: CourseNoticeboardWebinar;
}

export interface CourseNoticeboardWebinar {
  id: number;
  teacher_id: string;
  creator_id: string;
  category_id: null | string;
  type: string;
  private: string;
  slug: string;
  start_date: null;
  duration: null | string;
  timezone: null | string;
  thumbnail: string;
  image_cover: string;
  video_demo: null | string;
  video_demo_source: null | string;
  capacity: null | string;
  price: null | string;
  organization_price: null;
  support: string;
  certificate: string;
  downloadable: string;
  partner_instructor: string;
  subscribe: string;
  forum: string;
  enable_waitlist: string;
  access_days: null | string;
  points: null;
  message_for_reviewer: null | string;
  status: string;
  created_at: string;
  updated_at: null | string;
  deleted_at: null;
  title: null;
  description: null;
  seo_description: null;
  translations: {
    id: number;
    webinar_id: string;
    locale: "en";
    title: string;
    seo_description: null | string;
    description: string;
  }[];
}

export interface CreateCourseNoticeboardPayload {
  title: string;
  webinar_id: string;
  message: string;
  color: 'warning' | 'danger' | 'success' | 'red' | 'yellow' | 'green' | 'gray' | 'blue';
}