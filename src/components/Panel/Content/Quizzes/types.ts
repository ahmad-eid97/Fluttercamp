export type Quiz = {
  course: any;
  title: string;
  time: number;
  attempts: number;
  questions?: number;
  mark: number;
  days: number;
  random: boolean;
  certificate: boolean;
  active: boolean;
  date_created?: string;
  quizQuestions?: []
}