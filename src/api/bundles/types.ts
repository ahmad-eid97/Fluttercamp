import type { Course, RateType, FAQ, User, Tag, Review } from "@/types";

export interface GetClientBundlesResponse {
  data: Bundle[];
  links: Links;
  meta: Meta;
}

export interface Bundle {
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
  price: string;
  price_details: {
    price: string;
    tax: number;
  };
  active_special_offer: null;
  best_ticket: number | string;
  category: string;
  access_days: null | string;
  duration: number | string;
  webinar_count: number;
  teacher: {
    id: number;
    full_name: string;
    role_name: string;
    bio: string;
    offline: string;
    offline_message: null;
    verified: string;
    rate: number;
    avatar: string;
    meeting_status: string;
    user_group: null;
    address: string;
  };
  sale_amount: number;
  sales_count: number;
  students_count: number;
  created_at: string;
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

export interface DetailedBundle {
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
  price: string;
  active_special_offer: null;
  best_ticket: string;
  category: string;
  access_days: null;
  duration: string;
  webinar_count: number;
  teacher: User;
  sale_amount: number;
  sales_count: number;
  students_count: number;
  created_at: string;
  rate_type: RateType;
  video_demo: string;
  tickets: any[];
  subscribable: string;
  points: null;
  description: string;
  tags: Tag[];
  faqs: FAQ[];
  comments: any[];
  reviews: Review[];
}

export interface BundleCourses {
  webinars: Course[];
}