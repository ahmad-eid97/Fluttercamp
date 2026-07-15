export interface ProfileSettingsResponse {
  user: SettingsUser;
}

export interface SettingsUser {
  id: number;
  full_name: FullName;
  role_name: RoleName;
  bio: Bio;
  offline: string;
  offline_message: null;
  verified: string;
  rate: string;
  avatar: string;
  meeting_status: MeetingStatus;
  user_group: null;
  address: Address;
  status: Status;
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
  students: Student[];
  followers: Follower[];
  following: Following[];
  auth_user_is_follower: boolean;
  referral: null;
  education: string[];
  experience: string[];
  occupations: string[];
  about: string;
  webinars: Webinar[];
  meeting: Meeting;
  blog: Blog[];
  organization_teachers: any[];
  country_id: null;
  province_id: null;
  city_id: null;
  district_id: null;
  selectedBank: ISelectedBank | null;
  iban: null;
  account_id: null;
  identity_scan: string;
  certificate: null;
}

export enum Address {
  Luib72WernDduLane = "Luib, 72 Wern Ddu Lane",
}

export interface ISelectedBank {
  id: number;
  user_id: number;
  user_bank_id: number;
  specifications: Specification[];
  bank: Bank;
}

export interface Bank {
  id: number;
  logo: string;
  created_at: number;
  title: null;
  translations: Translation[];
}

export interface Translation {
  id: number;
  user_bank_id: number;
  locale: string;
  title: string;
}

export interface Specification {
  id: number;
  user_selected_bank_id: number;
  user_bank_specification_id: number;
  value: string;
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

export enum Bio {
  DataAnalystMicrosoft = "Data Analyst @ Microsoft",
}

export interface Blog {
  id: number;
  title: string;
  category_title: string;
  status: string;
  author: Author;
  url: string;
  comments_count: number;
  visit_count: string;
  created_at: string;
  locale: string;
  image: string;
  description: string;
}

export interface Author {
  full_name: FullName;
}

export enum FullName {
  AnasSamarah = "Anas Samarah",
}

export interface Follower {
  id: number;
  full_name: string;
  role_name: string;
  bio: Bio | null;
  offline: string;
  offline_message: null;
  verified: string;
  rate: number | string;
  avatar: string;
  meeting_status: string;
  user_group: null;
  address: Address | null;
}

export interface Following {
  id: number;
  full_name: FullName;
  role_name: RoleName;
  bio: Bio;
  offline: string;
  offline_message: null;
  verified: string;
  rate: string;
  avatar: string;
  meeting_status: MeetingStatus;
  user_group: null;
  address: Address;
}

export enum MeetingStatus {
  Available = "available",
}

export enum RoleName {
  Teacher = "teacher",
}

export interface Meeting {
  time_zone: string;
  gmt: string;
  id: number;
  disabled: string;
  discount: string;
  price: number;
  price_with_discount: number;
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
  monday: Timing[];
  saturday: Timing[];
}

export enum Status {
  Active = "active",
  IsDraft = "is_draft",
  Pending = "pending",
}

export interface Student {
  id: number;
  full_name: string;
  role_name: string;
  bio: null;
  offline: string;
  offline_message: null;
  verified: string;
  rate: number;
  avatar: string;
  meeting_status: string;
  user_group: null;
  address: null;
}

export interface Webinar {
  image: string;
  auth: boolean;
  can: Can;
  can_view_error: null;
  id: number;
  status: Status;
  label: string;
  title: string;
  type: Type;
  link: string;
  access_days: null | string;
  live_webinar_status: LiveWebinarStatus | null;
  auth_has_bought: boolean;
  sales: Sales;
  is_favorite: boolean;
  price_string: null | string;
  best_ticket_string: null;
  price: null | string;
  tax: number;
  tax_with_discount: number;
  best_ticket_price: number;
  discount_percent: number;
  course_page_tax: number;
  price_with_discount: number;
  discount_amount: number;
  active_special_offer: null;
  duration: null | string;
  teacher: Following;
  students_count: number;
  rate: number | string;
  rate_type: RateType;
  created_at: string;
  start_date: null | string;
  purchased_at: null;
  reviews_count: number;
  points: null;
  progress: number | string;
  progress_percent: number;
  category: null | string;
  capacity: null | string;
}

export interface Can {
  view: boolean;
}

export enum LiveWebinarStatus {
  Finished = "finished",
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

export enum Type {
  Course = "course",
  TextLesson = "text_lesson",
  Webinar = "webinar",
}


export interface AccountsTypeResponse {
  accounts_type: AccountsType[];
}

export interface AccountsType {
  id: number;
  logo: string;
  created_at: number;
  title: null;
  specifications: Specification[];
  translations: AccountsTypeTranslation[];
}

export interface Specification {
  id: number;
  user_bank_id: number;
  name: null;
  translations: SpecificationTranslation[];
}

export interface SpecificationTranslation {
  id: number;
  user_bank_specification_id: number;
  locale: string;
  name: string;
}

export interface AccountsTypeTranslation {
  id: number;
  user_bank_id: number;
  locale: string;
  title: string;
}
