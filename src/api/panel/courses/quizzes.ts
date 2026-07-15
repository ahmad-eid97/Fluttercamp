import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type {
  AddUpdateQuizInChapterPayload,
  AddUpdateQuizQuestion,
  QuizDataResponse,
  QuizResultDataResponse
} from '@/types';

export const addQuizToChapter = cache(async (payload: AddUpdateQuizInChapterPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.set(`ajax[new][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/quizzes/store`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});


export const updateQuizInChapter = cache(async (item_id: number, payload: AddUpdateQuizInChapterPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.set(`ajax[${item_id}][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/quizzes/${item_id}/update`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const deleteQuizById = cache(async (item_id: number) => {
  const response = await API.Get<unknown>(`/instructor/quizzes/${item_id}/delete`, { withToken: true });
  return response;
});


export const addQuestionInQuiz = cache(async (payload: AddUpdateQuizQuestion) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'answers') {
      value.forEach((answer: any, index: number) => {
        formData.append(`ajax[answers][${index === 0 ? 'ans_temp' : Math.floor(Math.random() * 100000000)}][title]`, answer.title);
        formData.append(`ajax[answers][${index === 0 ? 'ans_temp' : Math.floor(Math.random() * 100000000)}][file]`, answer.file);
        formData.append(`ajax[answers][${index === 0 ? 'ans_temp' : Math.floor(Math.random() * 100000000)}][correct]`, answer.correct);
      })
    } else {
      formData.set(`ajax[${key}]`, value);
    }
  });

  const response = await API.Post<unknown>(`/instructor/quizzes-questions/store`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});


export const UpdateQuestionInQuiz = cache(async (questionId: number, payload: AddUpdateQuizQuestion) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'answers') {
      value.forEach((answer: any, index: number) => {
        formData.append(`ajax[answers][${index === 0 ? 'ans_temp' : Math.floor(Math.random() * 100000000)}][title]`, answer.title);
        formData.append(`ajax[answers][${index === 0 ? 'ans_temp' : Math.floor(Math.random() * 100000000)}][file]`, answer.file);
        formData.append(`ajax[answers][${index === 0 ? 'ans_temp' : Math.floor(Math.random() * 100000000)}][correct]`, answer.correct);
      })
    } else {
      formData.set(`ajax[${key}]`, value);
    }
  });

  const response = await API.Post<unknown>(`/instructor/quizzes-questions/${questionId}/update`, {
    withToken: true, formdata: formData, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
});

export const deleteQuizQuestion = cache(async (question_id: number) => {
  const response = await API.Get<unknown>(`/instructor/quizzes-questions/${question_id}/delete`, { withToken: true });
  return response;
});

export const getStartQuizData = cache(async (quiz_id: number) => {
  const response = await API.Get<QuizDataResponse>(`/panel/quizzes/${quiz_id}/start`, { withToken: true, disableErrorMessage: true });
  return response;
});

export const getStatusQuizData = cache(async (quiz_id: number) => {
  const response = await API.Get<QuizDataResponse>(`/panel/quizzes/${quiz_id}/result`, { withToken: true, disableErrorMessage: true });
  return response;
});

export const getResultQuizData = cache(async (quiz_id: number) => {
  const response = await API.Get<QuizResultDataResponse>(`/panel/quizzes/${quiz_id}/edit-result`, { withToken: true, disableErrorMessage: true });
  return response;
});

export const QuizStoreResultByStudent = cache(async (quiz_id: number, payload: any) => {
  const response = await API.Post<QuizDataResponse>(`/panel/quizzes/${quiz_id}/store-result`, { withToken: true, body: payload });
  return response;
});

export const QuizStoreResultByInstructor = cache(async (quiz_id: number, payload: any) => {
  const response = await API.Post<QuizDataResponse>(`/panel/quizzes/${quiz_id}/store-result`, { withToken: true, body: payload });
  return response;
});