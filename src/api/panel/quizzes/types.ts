import { OnOffEnum } from "../courses/types";

export interface GetQuizzesFilters {
  from: string;
  to: string;
  quiz_id: number;
  total_mark: number;
  status: 'passed' | 'failed' | 'waiting';
  user_id: number;
  instructor: string; //= Fullname
  page: number;
}

export interface GetAllQuizzesResponse {
  pageTitle: string;
  quizzes: Quizzes;
  userSuccessRate: any[];
  questionsCount: number;
  quizzesCount: number;
  userCount: number;
  allQuizzesLists: AllQuizzesList[];
}

export interface AllQuizzesList {
  id: number;
  webinar_id: null | string;
  title: null;
  translations: AllQuizzesListTranslation[];
}

export interface AllQuizzesListTranslation {
  id: number;
  quiz_id: string;
  locale: Locale;
  title: string;
}

export enum Locale {
  En = "en",
}

export interface Quizzes {
  current_page: number;
  data: Datum[];
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

export interface Datum {
  id: number;
  webinar_id: null | string;
  creator_id: string;
  chapter_id: null | string;
  time: null | string;
  attempt: null | string;
  pass_mark: string;
  certificate: string;
  status: string;
  total_mark: null | string;
  display_limited_questions: string;
  display_number_of_questions: null;
  display_questions_randomly: string;
  expiry_days: null | string;
  created_at: string;
  updated_at: null | string;
  userSuccessRate: number;
  title: null;
  webinar: Webinar | null;
  quiz_questions: QuizQuestion[];
  quiz_results: QuizResult[];
  translations: AllQuizzesListTranslation[];
}

export interface QuizQuestion {
  id: number;
  quiz_id: string;
  creator_id: string;
  grade: string;
  type: string;
  image: null | string;
  video: null;
  order: string;
  created_at: string;
  updated_at: null | string;
  title: null;
  correct: null;
  translations: QuizQuestionTranslation[];
}

export interface QuizQuestionTranslation {
  id: number;
  quizzes_question_id: string;
  locale: Locale;
  title: string;
  correct: null | string;
}

export interface QuizResult {
  id: number;
  quiz_id: string;
  user_id: string;
  results: string;
  user_grade: string;
  status: Status;
  created_at: string;
}

export enum Status {
  Failed = "failed",
  Passed = "passed",
  Waiting = "waiting",
}

export interface Webinar {
  id: number;
  teacher_id: string;
  creator_id: string;
  category_id: string;
  type: string;
  private: string;
  slug: string;
  start_date: null | string;
  duration: string;
  timezone: string;
  thumbnail: string;
  image_cover: string;
  video_demo: string;
  video_demo_source: string;
  capacity: null | string;
  price: string;
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
  updated_at: string;
  deleted_at: null;
  locale: null | string;
  title: null;
  description: null;
  seo_description: null;
  translations: WebinarTranslation[];
}

export interface WebinarTranslation {
  id: number;
  webinar_id: string;
  locale: Locale;
  title: string;
  seo_description: string;
  description: string;
}


export interface AddUpdateQuizPayload {
  title: string | null;
  webinar_id?: string;
  chapter_id?: number;
  pass_mark: number;
  attempt: number;
  time: string;
  status: OnOffEnum;
  certificate: OnOffEnum;
}

export interface AddUpdateQuizQuestionPayload {
  title: string;
}

export interface ExternalQuiz {
  id: number;
  webinar_id: string;
  creator_id: string;
  chapter_id: null;
  time: string;
  attempt: string;
  pass_mark: string;
  certificate: string;
  status: string;
  total_mark: null;
  display_limited_questions: string;
  display_number_of_questions: null;
  display_questions_randomly: string;
  expiry_days: string;
  created_at: string;
  updated_at: string;
  userSuccessRate: number;
  title: null;
  quiz_questions: any[];
  webinar: Webinar;
  quiz_results: any[];
  translations: ExternalQuizTranslations[];
}

export interface ExternalQuizTranslations {
  id: number;
  quiz_id: string;
  locale: string;
  title: string;
}

export interface QuizDataToEdit {
  pageTitle: string;
  quiz: QuizToEdit;
  quizQuestions: QuizQuestion[];
}

export interface QuizToEdit {
  id: number;
  webinar_id: string;
  creator_id: string;
  chapter_id: null;
  time: string;
  attempt: string;
  pass_mark: string;
  certificate: string;
  status: Status;
  total_mark: string;
  display_limited_questions: string;
  display_number_of_questions: null;
  display_questions_randomly: string;
  expiry_days: null;
  created_at: string;
  updated_at: string;
  title: string;
  quiz_questions: QuizQuestion[];
  translations: {
    id: number;
    webinar_id: string;
    title: string;
    seo_description: null | string;
    description: string;
  }[];
}

export interface InstructorCoursesResponse {
  webinars: InstructorWebinar[];
}

export interface InstructorWebinar {
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
  translations: {
    id: number;
    webinar_id: string;
    locale: string;
    title: string;
    seo_description: string;
    description: string;
  }[];
}

export interface MyResultsResponse {
  pageTitle: string;
  quizzesResults: QuizzesResults;
  quizResultsCount: number;
  successRate: number;
  quizAvgGrad: number;
  waitingCount: number;
  quizzes: QuizElement[];
  allStudents: {
    id: number,
    full_name: string
  }[];
}

export interface Results {
  current_page: number;
  data: ResultData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface ResultData {
  id: number;
  quiz_id: string;
  user_id: string;
  results: string;
  user_grade: string;
  status: string;
  created_at: string;
}

export interface ResultsResponse {
  pageTitle: string;
  quizzesResults: QuizzesResults;
  quizResultsCount: number;
  successRate: number;
  quizAvgGrad: number;
  waitingCount: number;
  quizzes: QuizElement[];
  allStudents: {
    id: number,
    full_name: string
  }[];
}

export interface QuizElement {
  id: number;
  webinar_id: string;
  creator_id: string;
  chapter_id: null | string;
  time: string;
  attempt: string;
  pass_mark: string;
  certificate: string;
  status: string;
  total_mark: null | string;
  display_limited_questions: string;
  display_number_of_questions: null;
  display_questions_randomly: string;
  expiry_days: null | string;
  created_at: string;
  updated_at: null | string;
  title: null;
  quiz_questions: QuizQuestion[];
  translations: any;
}

export interface QuizzesResults {
  current_page: number;
  data: QuizResultData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface QuizResultData {
  id: number;
  quiz_id: string;
  user_id: string;
  results: string;
  user_grade: string;
  status: string;
  created_at: string;
  quiz: Quiz;
  user: User;
}

export interface Quiz {
  id: number;
  webinar_id: string;
  creator_id: string;
  chapter_id: string;
  time: string;
  attempt: string;
  pass_mark: string;
  certificate: string;
  status: string;
  total_mark: string;
  display_limited_questions: string;
  display_number_of_questions: null;
  display_questions_randomly: string;
  expiry_days: null;
  created_at: string;
  updated_at: null;
  title: null;
  quiz_questions: QuizQuestion[];
  creator: User;
  webinar: Webinar;
  translations: QuizzesQuestionsAnswerTranslation[];
}

export interface User {
  id: number;
  full_name: string;
  role_name: string;
  organ_id: null;
  mobile: null | string;
  email: string;
  bio: null | string;
  logged_count: string;
  verified: string;
  financial_approval: string;
  installment_approval: string;
  enable_installments: string;
  disable_cashback: string;
  enable_registration_bonus: string;
  registration_bonus_amount: null;
  avatar: string;
  avatar_settings: null | string;
  cover_img: null | string;
  headline: null;
  about: null | string;
  address: null | string;
  country_id: null;
  province_id: null;
  city_id: null;
  district_id: null;
  location: string[] | null;
  level_of_training: string[] | null;
  meeting_type: string;
  status: string;
  access_content: string;
  language: string;
  currency: null;
  timezone: null | string;
  newsletter: string;
  public_message: string;
  identity_scan: null | string;
  certificate: null | string;
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
}

export interface QuizQuestion {
  id: number;
  quiz_id: string;
  creator_id: string;
  grade: string;
  type: string;
  image: null | string;
  video: null;
  order: string;
  created_at: string;
  updated_at: string | null;
  title: null;
  correct: null;
  quizzes_questions_answers: QuizzesQuestionsAnswer[];
  translations: QuizQuestionTranslation[];
}

export interface QuizzesQuestionsAnswer {
  id: number;
  creator_id: string;
  question_id: string;
  image: null;
  correct: string;
  created_at: string;
  updated_at: null;
  title: null;
  translations: QuizzesQuestionsAnswerTranslation[];
}

export interface QuizzesQuestionsAnswerTranslation {
  id: number;
  quizzes_questions_answer_id?: string;
  locale: string;
  title: string;
  quiz_id?: string;
}