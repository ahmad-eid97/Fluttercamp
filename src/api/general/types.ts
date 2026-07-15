import type { User, DetailedUser, Course } from "@/types";

export interface SearchResponse {
  webinars: Webinars;
  users: Users;
  teachers: Teachers;
  organizations: Organizations;
}

export interface Organizations {
  organizations: any[];
  count: number;
}

export interface Teachers {
  teachers: User[];
  count: number;
}

export interface Users {
  users: DetailedUser[];
  count: number;
}

export interface Webinars {
  webinars: Course[];
  count: number;
}


export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface GeneralDataResponse {
  register_method: string;
  offline_bank_account: null[];
  user_language: UserLanguage;
  payment_channels: PaymentChannels;
  minimum_payout_amount: string;
  currency: Currency;
  videoDemoSource: string[];
  file: File;
  AllSessionApis: string[];
  AvailableSessionApis: string[];
  price_display: string;
  currency_position: string;
  socials: Socials;
  footerColumns: FooterColumns;
  main_sections: MainSection[];
  api_videsdk: string;
  heroSectionData: IHeroSectionData;
  becomeInstructorSection: IBecomeInstructorSection;
  theme_fonts: ThemeFonts;
  theme_colors: ThemeColors;
  general: General;
  about_section: IAboutSection;
  faqs: Faq[];
}

export interface IHeroSectionData {
  title: string;
  main_title: string;
  description: string;
  hero_background: string;
  hero_vector: string;
  has_lottie: string;
  button1: {
    title: string;
    link: string;
  }
}

export interface IBecomeInstructorSection {
  image: string;
  title: string;
  description: string;
  button1: {
    title: string;
    link: string;
  };
  button2: {
    title: string;
    link: string;
  };
}


export interface Currency {
  sign: string;
  name: string;
}

export interface File {
  videoTypes: string[];
  fileTypes: string[];
  fileSources: string[];
}

export interface FooterColumns {
  first_column: Column;
  second_column: Column;
  third_column: Column;
  forth_column: Column;
}

export interface Column {
  title: null | string;
  value: null | string;
}

export interface MainSection {
  id: number;
  icon: string;
  order: string;
  created_at: null;
  updated_at: null;
  title: string;
  slug: string;
  description: string;
  header_title: string;
  header_description: string;
  header_gallery: string | null;
  translations: Translation[];
}

export interface Translation {
  id: number;
  main_section_id: string;
  locale: string;
  title: string;
  description: string;
  header_title: string;
  header_description: string;
  header_gallery: string;
}

export interface PaymentChannels {
  active: Active[];
}

export interface Active {
  id: number;
  title: string;
  class_name: string;
  status: string;
  image: string;
  settings: string;
  currencies: string[];
  created_at: string;
}

export interface Socials {
  Instagram: Facebook;
  Whatsapp: Facebook;
  Twitter: Facebook;
  Facebook: Facebook;
}

export interface Facebook {
  title: string;
  image: string;
  link: string;
  order: string;
}

export interface UserLanguage {
  AR: string;
  EN: string;
}

export interface GetWebsitePageDataResponse {
  pageTitle: string;
  pageDescription: string;
  pageRobot: string;
  page: Page;
}

export interface Page {
  id: number;
  link: string;
  name: string;
  robot: string;
  status: string;
  created_at: string;
  locale: string;
  title: null;
  seo_description: null;
  content: null;
  translations: {
    id: number;
    page_id: string;
    locale: string;
    title: string;
    seo_description: string;
    content: string;
  }[];
}


export interface ThemeColors {
  primary: string | null;
  "primary-bg": string | null;
  "primary-border": string | null;
  "primary-hover": string | null;
  "primary-border-hover": string | null;
  "primary-btn-shadow": string | null;
  "primary-btn-shadow-hover": string | null;
  "primary-btn-color": string | null;
  "primary-btn-color-hover": string | null;
  secondary: string | null;
  "secondary-bg": string | null;
  "secondary-border": string | null;
  "secondary-hover": string | null;
  "secondary-border-hover": string | null;
  "secondary-btn-shadow": string | null;
  "secondary-btn-shadow-hover": string | null;
  "secondary-btn-color": string | null;
  "secondary-btn-color-hover": string | null;
  admin_primary: string | null;
  locale: string;
}

export interface ThemeFonts {
  main: Main;
  rtl: Main;
  locale: string;
}

export interface Main {
  regular: string;
  bold: string;
  medium: string;
}

export interface General {
  site_name: string;
  site_email: string;
  site_phone: null;
  site_language: string;
  register_method: string;
  default_time_zone: string;
  date_format: string;
  time_format: string;
  user_languages: string[];
  rtl_languages: string[];
  fav_icon: string;
  logo: string;
  footer_logo: string;
  rtl_layout: string;
  preloading: string;
  hero_section1: string;
  hero_section2: string;
  content_translate: string;
  app_debugbar: string;
  locale: string;
}

export interface IAboutSection {
  video_link: string;
  title: string;
  sub_title: string;
  description: string;
  background: string;
  about_additional_steps_title_1: string;
  about_additional_steps_description_1: string;
  about_additional_steps_background_1: string;
  about_additional_steps_title_2: string;
  about_additional_steps_description_2: string;
  about_additional_steps_background_2: string;
  about_steps_title: string;
  about_steps_sub_title: string;
  about_steps_link: string;
  about_steps_list: AboutStepsList[];
  locale: string;
}

export interface AboutStepsList {
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface Faq {
  id: number;
  title: string;
  answer: string;
  order: number;
  created_at: number;
  updated_at: string | null;
}