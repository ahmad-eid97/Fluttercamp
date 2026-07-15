import { LocaleEnum, OnOffEnum } from ".";
import { ExtendedQuiz } from "@/components/Panel/Content/Quizzes/MyResults/TryAgain/Wrapper/types";

export interface AddUpdateQuizInChapterPayload {
  locale: LocaleEnum;
  webinar_id: string;
  chapter_id?: number;
  creator_id?: string;
  title: string | null;
  time: string;
  attempt: number;
  pass_mark: number;
  certificate: OnOffEnum;
  status: OnOffEnum;
  total_mark?: string;
  display_limited_questions?: OnOffEnum;
  display_number_of_questions?: number;
  display_questions_randomly: OnOffEnum;
  expiry_days: string;
  quiz_questions?: QuizQuestion[]
}

export interface QuizQuestion {
  id: number;
  quiz_id: string;
  creator_id: string;
  grade: string;
  type: string;
  image: string | null;
  video: string | null;
  order: string;
  created_at: string;
  updated_at: null;
  title: string | null;
  correct: null;
  translations: QuizTranslation[];
  quizzes_questions_answers?: any;
}

export interface QuizTranslation {
  id: number;
  quizzes_question_id: string;
  locale: string;
  title: string | null;
  correct: null;
}

export interface AddUpdateQuizQuestion {
  type: string;
  title: string | null;
  grade: number;
  video: string | null;
  image: string | null;
  answers?: Answer[];
  translations?: QuizTranslation[];
}

export interface Answer {
  id?: number;
  title: string | null;
  file: string;
  image?: string;
  correct: string;
  translations?: QuizTranslation[];
}

export interface QuestionForUpdate {
  id?: number;
  type: string;
  title: string | null;
  grade: number;
  video: string | null;
  image: string | null;
  current_answer?: string;
  quizzes_questions_answers?: Answer[];
  translations?: QuizTranslation[];
}

export interface QuizDataResponse {
  quiz_result_id: number;
  quiz: ExtendedQuiz;
  attempt_number: number;
  quiz_review?: QuizReview[];
  status?: string;
}

export interface QuizReview {
  id: number;
  title: string;
  type: string;
  descriptive_correct_answer: null;
  grade: string;
  created_at: string;
  answers: Answer[];
  updated_at: null;
  user_answer: UserAnswer;
  multiple_correct_answer: Answer;
}

export interface QuizQuestionReview {
  answers: Answer[];
  created_at: string;
  descriptive_correct_answer: string | null;
  grade: string;
  id: number;
  title: string;
  type: string;
  updated_at: string | null
}

export interface UserAnswer {
  grade: string;
  status: boolean;
  answer: string;
}

export interface QuizResultDataResponse {
  pageTitle: string;
  teacherReviews: boolean;
  quiz: Quiz;
  quizResult: NewQuizStart;
  newQuizStart: NewQuizStart;
  userAnswers: ResultUserAnswer | null;
  numberOfAttempt: number;
  questionsSumGrade: number;
  quizQuestions: QuizQuestion[];
}

export interface ResultUserAnswer {
  [key: string]: {
    correct_answer: string;
    grade: string;
  }
}

export interface NewQuizStart {
  id: number;
  quiz_id: string;
  user_id: string;
  results: string;
  user_grade: string;
  status: string;
  created_at: string;
  quiz: Quiz;
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
  expiry_days: string;
  created_at: string;
  updated_at: string;
  title: null;
  quiz_questions: QuizQuestion[];
  webinar: Webinar;
  translations: QuizzesQuestionsAnswerTranslation[];
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

export interface QuizQuestionTranslation {
  id: number;
  quizzes_question_id: string;
  locale: string;
  title: string;
  correct: null;
}

export interface Webinar {
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
  translations: WebinarTranslation[];
}

export interface WebinarTranslation {
  id: number;
  webinar_id: string;
  locale: string;
  title: string;
  seo_description: string;
  description: string;
}