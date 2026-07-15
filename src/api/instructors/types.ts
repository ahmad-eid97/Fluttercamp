import type { Course, ArticlePost } from "@/types";

export interface InstructorsResponse {
  count: number;
  users: UsersWithMeta;
}

export interface UsersWithMeta {
  current_page: number;
  data: User[];
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

export interface User {
  id: number;
  full_name: string;
  role_name: string;
  organ_id: null;
  mobile: null | string;
  email: string;
  rate: number;
  bio: null | string;
  logged_count: string;
  verified: string;
  financial_approval: string;
  installment_approval: string;
  enable_installments: string;
  disable_cashback: string;
  enable_registration_bonus: string;
  registration_bonus_amount: null | number;
  avatar: null | string;
  avatar_settings: null | string;
  cover_img: null | string;
  headline: null | string;
  about: null | string;
  address: null | string;
  country_id: null | number;
  province_id: null | number;
  city_id: null | number;
  district_id: null | number;
  location: string[] | null;
  level_of_training: string[] | null;
  meeting_type: string;
  status: string;
  access_content: string;
  language: null | string;
  currency: null | string;
  timezone: null | string;
  newsletter: string;
  public_message: string;
  identity_scan: null | string;
  certificate: null | string;
  commission: null | string;
  affiliate: string;
  can_create_store: string;
  ban: string;
  ban_start_at: null | string;
  ban_end_at: null | string;
  offline: string;
  offline_message: null | string;
  created_at: string;
  updated_at: null | string;
  deleted_at: null | string;
}

export interface DetailedUser {
  id: number;
  full_name: string;
  role_name: string;
  bio: string;
  offline: string;
  offline_message: string;
  verified: string;
  rate: number;
  avatar: string;
  meeting_status: string;
  user_group: null;
  address: string;
  status: string;
  email: string;
  mobile: string;
  language: string;
  newsletter: boolean;
  public_message: string;
  active_subscription: null;
  headline: null;
  courses_count: number;
  reviews_count: number;
  appointments_count: number;
  students_count: number;
  followers_count: number;
  following_count: number;
  badges: Badge[];
  students: any[];
  followers: any[];
  following: any[];
  auth_user_is_follower: boolean;
  referral: null;
  education: any[];
  experience: any[];
  occupations: string[];
  about: string;
  webinars: Course[];
  meeting: Meeting;
  blog: ArticlePost[] | null;
  organization_teachers: any[];
  country_id: null;
  province_id: null;
  city_id: null;
  district_id: null;
  account_type: 'user' | 'teacher' | 'organization';
  iban: null;
  account_id: null;
  identity_scan: string;
  certificate: null;
  created_at: string;
}

export interface Badge {
  id: number;
  title: string;
  type: string;
  condition: string;
  image: string;
  locale: string;
  description: string;
  created_at: string;
}

export interface ShortUser {
  full_name: string;
  avatar: string;
}

export interface SendMessagePayload {
  title: string;
  email: string;
  message: string;
}

export interface InstructorsFilters {
  page: number;
  available_for_meetings: string;
  free_meetings: string;
  discount: string;
  sort: string;
  category_id: string;
  level_of_training: string;
  gender: string;
  meeting_type: string;
  population: string;
  country_id: string;
  province_id: string;
  city_id: string;
  district_id: string;
  main_section_id: string;
  day: string[];
  search: string;
  [key: string]: string | number | string[];
}

export interface MeetingPayload {
  time_id: number;
  date: string;
  meeting_type: 'in_person' | 'online';
  student_count: number;
  description?: string;
}

export interface MeetingsResponse {
  count: number;
  times: Time[];
}

export interface Time {
  id: number;
  time: string;
  can_reserve: boolean;
  description?: string;
  meeting_type: 'in_person' | 'online';
  meeting: Meeting;
  auth_reservation: null;
}

export interface Meeting {
  time_zone: string;
  gmt: string;
  id: number;
  disabled: string;
  discount: null;
  price: number;
  price_with_discount: string;
  in_person: string;
  in_person_price: number;
  in_person_price_with_discount: number;
  in_person_group_min_student: string;
  in_person_group_max_student: string;
  "in_person_group_amount ": string;
  group_meeting: string;
  online_group_min_student: string;
  online_group_max_student: string;
  online_group_amount: string;
  timing: Timing[];
  timing_group_by_day: TimingGroupByDay;
}

export interface Timing {
  id: number;
  day_label: string;
  time: string;
}

export interface TimingGroupByDay {
  sunday?: Timing[];
  monday?: Timing[];
  tuesday?: Timing[];
  wedensday?: Timing[];
  thursday?: Timing[];
  friday?: Timing[];
  saturday?: Timing[];
}

export interface GetUserContactPayload {
  user_id: number;
  user_type: 'student' | 'instructor';
  item_id: number;
}

export interface GetUserContactResponse {
  avatar: string;
  description: string | null;
  email: string;
  location: string;
  name: string;
  phone: string;
}