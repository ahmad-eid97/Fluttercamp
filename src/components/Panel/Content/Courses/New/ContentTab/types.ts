import { StorageEnum, AccessibilityEnum, FileTypeEnum, OnOffEnum } from "@/types";

export interface Chapter {
  id: number;
  user_id: string;
  webinar_id: string;
  order: null;
  check_all_contents_pass: string;
  status: string;
  created_at: string;
  title: string;
  chapter_items: ChapterItem[];
  translations: Translation[];
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
  text_lesson: Lesson | null;
  quiz: any | Quiz | null;
  assignment: Assignment | null;
}

export type Session = {
  id: number;
  creator_id: string;
  webinar_id: string;
  chapter_id: string;
  reserve_meeting_id: null;
  date: string;
  duration: string;
  link: string;
  extra_time_to_join: string;
  zoom_start_link: null;
  zoom_id: null;
  session_api: string;
  api_secret: string;
  moderator_secret: null;
  agora_settings: string | null;
  check_previous_parts: string;
  access_after_day: null;
  order: null;
  status: string;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  title: null;
  description: null;
  translations: Translation[];
}

export type SectionFile = {
  id: number;
  creator_id: string;
  webinar_id: number;
  chapter_id: number;
  accessibility: AccessibilityEnum;
  downloadable: '1' | '0';
  storage: StorageEnum;
  file: string | null;
  volume: number;
  file_type: FileTypeEnum;
  interactive_type: null;
  interactive_file_name: null;
  interactive_file_path?: string | null;
  file_path?: string | null;
  check_previous_parts: '1' | '0';
  access_after_day: number;
  online_viewer: '1' | '0';
  order: null;
  status: string;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  title: string | null;
  description: string | null;
  translations: Translation[];
}

export type Lesson = {
  id: number;
  creator_id: string;
  webinar_id: string;
  chapter_id: string;
  image: string;
  study_time: string;
  accessibility: string;
  check_previous_parts: string;
  access_after_day: null;
  order: string;
  status: string;
  created_at: string;
  updated_at: null;
  title: string | null;
  summary: string | null | undefined;
  content: string | null | undefined;
  translations: Translation[];
}

export type Quiz = {
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
  expiry_days: string;
  created_at: string;
  updated_at: null;
  title: null;
  quiz_questions: QuizQuestion[];
  translations: QuizTranslation[];
}

export interface QuizQuestion {
  id: number;
  quiz_id: string;
  creator_id: string;
  grade: string;
  type: string;
  image: null;
  video: null;
  order: string;
  created_at: string;
  updated_at: null;
  title: null;
  correct: null;
  translations: QuizQuestionTranslation[];
}

export interface QuizQuestionTranslation {
  id: number;
  quizzes_question_id: string;
  locale: string;
  title: string;
  correct: null;
}

export interface QuizTranslation {
  id: number;
  quiz_id: string;
  locale: string;
  title: string | null;
}

export type Assignment = {
  id: number;
  creator_id: string;
  webinar_id: string;
  chapter_id: string;
  grade: string;
  pass_grade: string;
  deadline: string;
  attempts: string;
  check_previous_parts: string;
  access_after_day: string;
  status: string;
  created_at: string;
  title: null;
  description: null;
  attachments: Attachment[]
  translations: Translation[];
}

export interface Attachment {
  id: number;
  creator_id: string;
  assignment_id: string;
  title: string;
  attach: string;
}

export interface Translation {
  id: number;
  file_id: string;
  locale: string;
  title: string | null;
  description: string | null;
  summary?: string | null;
  content?: string | null;
}