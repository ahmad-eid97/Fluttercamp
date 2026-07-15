export interface CoursesListResponse {
  webinars: CourseListItem[]
}

export interface DiscountPayload {
  from_date: string;
  to_date: string;
  name: string;
  percent: string;
  webinar_id: string;
}

export interface CourseListItem {
  id: number;
  title: null;
  description: null;
  seo_description: null;
  translations: Translation[];
}

export interface Translation {
  id: number;
  webinar_id: string;
  locale: string;
  title: string;
  seo_description: string;
  description: string;
}

export interface DiscountsListResponse {
  specialOffers: {
    current_page: number;
    data: DiscountOffer[];
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
  },
}

export interface DiscountOffer {
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
  webinar: DiscountOfferWebinar;
}

export interface DiscountOfferWebinar {
  id: number;
  teacher_id: string;
  creator_id: string;
  category_id: null;
  type: string;
  private: string;
  slug: string;
  start_date: null;
  duration: null;
  timezone: null;
  thumbnail: string;
  image_cover: string;
  video_demo: string;
  video_demo_source: string;
  capacity: null;
  price: null;
  organization_price: null;
  support: string;
  certificate: string;
  downloadable: string;
  partner_instructor: string;
  subscribe: string;
  forum: string;
  enable_waitlist: string;
  access_days: null;
  points: null;
  message_for_reviewer: null;
  status: string;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  title: null;
  description: null;
  seo_description: null;
  translations: Translation[];
}

export interface DisableDiscountResponse {
  success: boolean
}

export interface PromotionsResponse {
  promotions: {
    current_page: 1;
    data: Promotion[];
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
}

export interface Promotion {
  id: number;
  days: string;
  price: string;
  icon: string;
  is_popular: string;
  created_at: string;
  title: null;
  description: null;
  translations: PromotionTranslation[];
}

export interface PromotionTranslation {
  id: number;
  promotion_id: string;
  locale: string;
  title: string;
  description: string;
}

export interface GetDiscountsFilters {
  from: string;
  to: string;
  quiz_id: number;
  total_mark: number;
  status: 'passed' | 'failed' | 'waiting';
  user_id: number;
  instructor: string; //= Fullname
  page: number;
}