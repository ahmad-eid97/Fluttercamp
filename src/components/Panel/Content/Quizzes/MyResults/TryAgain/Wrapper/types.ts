import type { Quiz } from "@/types";

export interface ExtendedQuiz extends Quiz {
  questions: StudentQuizQuestion[];
}

export interface StudentQuizQuestion {
  id: number;
  title: string;
  type: string;
  descriptive_correct_answer: null;
  grade: string;
  created_at: string;
  answers: StudentQuestionAnswer[];
  updated_at: string | null;
}

export interface StudentQuestionAnswer {
  id: number;
  title: string;
  correct: string;
  image: null;
  created_at: string;
  updated_at: null;
}