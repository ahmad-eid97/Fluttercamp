export type Quiz = {
  id: number;
  title: string;
  time: number;
  attempts: number;
  total_mark: number;
  days: number;
  random: boolean;
  certificate: boolean;
  active: boolean;
  translations: any;
}

export type QuizToUpdate = {
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