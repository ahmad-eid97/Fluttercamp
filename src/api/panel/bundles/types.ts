import type { Can, User, CourseFAQ, CourseTicket } from "@/types";

export interface CreateData {
  pageTitle: string;
  teachers: User[];
  categories: Category[];
  isOrganization: boolean;
  currentStep: number;
  userLanguages: UserLanguages;
}

export interface Category {
  id: number;
  slug: string;
  parent_id: null;
  icon: string;
  order: string;
  title: null;
  sub_categories: any[];
  translations: Translation[];
}

export interface Translation {
  id: number;
  category_id: string;
  locale: Locale;
  title: string;
}

export enum Locale {
  En = "en",
}

export interface UserLanguages {
  EN: string;
  AR: string;
}


export interface BundleDataToEdit {
  pageTitle: string;
  currentStep: string;
  isOrganization: boolean;
  userLanguages: UserLanguages;
  locale: string;
  defaultLocale: string;
  teachers: any[];
  bundle: PanelEditBundle;
  categories?: BundleEditCategory[];
  definedLanguage: string[];
  bundleTags?: string[];
  webinars?: BundleEditWebinar[];
}

export interface PanelEditBundle {
  id: number;
  creator_id: string;
  teacher_id: string;
  category_id: string;
  slug: string;
  thumbnail: string;
  image_cover: string;
  video_demo: string | null;
  video_demo_source: string | null;
  price: string;
  points: null;
  subscribe: string;
  access_days: number | null;
  message_for_reviewer: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  locale: string;
  title: string | null;
  description: string | null;
  seo_description: string | null;
  category?: BundleEditCategory;
  tickets?: CourseTicket[];
  bundle_webinars?: Bundle_Webinars[];
  faqs?: CourseFAQ[];
  translations: BundleDataToEditTranslation[];
}

export interface Bundle_Webinars {
  id: number;
  creator_id: string;
  bundle_id: string;
  webinar_id: string;
  order: null;
  webinar: Bundle_Webinars_SingleWebinar;
}

export interface Bundle_Webinars_SingleWebinar {
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
  video_demo: null;
  video_demo_source: null;
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
  translations: {
    id: number;
    webinar_id: string;
    locale: string;
    title: string;
    seo_description: null;
    description: string;
  }[];
}


export interface BundleDataToEditTranslation {
  id: number;
  bundle_id: string;
  locale: string;
  title: string;
  seo_description: string;
  description: string;
}

export interface BundleEditWebinar {
  id: number;
  creator_id: string;
  teacher_id: string;
  title: null;
  description: null;
  seo_description: null;
  translations: {
    id: number;
    webinar_id: string;
    locale: string;
    title: string;
    seo_description: null;
    description: string;
  }[];
}


export interface BundleEditCategory {
  id: number;
  slug: string;
  parent_id: null;
  icon: string;
  order: string;
  title: null;
  sub_categories: any[];
  translations: {
    id: number;
    category_id: string;
    locale: string;
    title: string;
  }[];
}

export interface CreateBundlePayload {
  title: string;
  thumbnail: string;
  image_cover: string;
  description: string;
  category_id: number;
  video_demo: string;
  video_demo_source: string;
  filters: any[];
  tags: string;
  subscribe: boolean;
  price: number;
  seo_description: string;
  teacher_id: string;
  creator_id: string;
  draft: number;
  locale: string;
  get_next: number;
}

export interface CreatedBundle {
  id: number;
  image: string;
  image_cover: string;
  status: string;
  label: string;
  link: string;
  title: string;
  type: string;
  rate: number;
  rates_count: number;
  reviews_count: number;
  price: null;
  price_details: {
    price: null;
    tax: number;
  };
  active_special_offer: null;
  best_ticket: null;
  category: null;
  access_days: null;
  duration: number;
  webinar_count: number;
  teacher: null;
  sale_amount: number;
  sales_count: number;
  students_count: number;
  created_at: number;
}

export interface UpdateBundlePayload {
  current_step: string;
  get_step: number;
  get_next: number;
  draft: number;
  title: string;
  thumbnail: string;
  image_cover: string;
  description: string;
  category_id: number;
  video_demo: string;
  video_demo_source: string;
  filters: any[];
  tags: string;
  subscribe: boolean;
  price: string;
  access_days: number;
  seo_description: string;
  teacher_id: number;
  message_for_reviewer: string;
  locale: string;
}


export interface GetBundlesResponse {
  bundles: {
    data: PanelBundle[];
    links: Links;
    meta: Meta;
  };
  bundles_count: number;
  bundle_sales_amount: number;
  bundle_sales_count: number;
  bundles_hours: string;
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

export interface PanelBundle {
  id: number;
  image: string;
  image_cover: string;
  status: string;
  label: string;
  link: string;
  title: string;
  type: string;
  rate: number;
  rates_count: number;
  reviews_count: number;
  price: null | string;
  price_details: {
    price: null | string;
    tax: number;
  };
  active_special_offer: null;
  best_ticket: null | string;
  category: null | string;
  access_days: null;
  duration: number | string;
  webinar_count: number;
  teacher: null;
  sale_amount: number;
  sales_count: number;
  students_count: number;
  created_at: string;
}

export interface BundleWebinar {
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
  access_days: null;
  category: string;
  sales_amount: string;
  sales_count: number;
  created_at: string;
  purchased_at: null;
  start_date: null;
  duration: string;
  specification: Specification;
  teacher: User;
  capacity: string;
}

export interface Specification {
  duration: string;
  files_count: number;
  downloadable: boolean;
}