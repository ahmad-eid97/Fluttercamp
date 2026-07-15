import { cache } from 'react';
import API from "../../request.handler";
//= Types
import {
  GetAllQuizzesResponse,
  GetQuizzesFilters,
  AddUpdateQuizPayload,
  AddUpdateQuizQuestionPayload,
  QuizDataToEdit,
  InstructorCoursesResponse,
  MyResultsResponse,
  ResultsResponse
} from './types';

export const getAllQuizzes = cache(async (filters?: Partial<GetQuizzesFilters>) => {
  let query = '';
  if (filters && JSON.stringify(filters) !== '{}') query += '?';
  if (filters) Object.entries(filters).forEach(([key, value]) => {
    if (query === '?') query += `${key}=${value}`;
    else query += `&${key}=${value}`
  });

  const response = await API.Get<GetAllQuizzesResponse>(`/instructor/quizzes${query}`, { withToken: true });
  return response;
});


export const deleteQuiz = async (quiz_id: number) => {
  const response = await API.Delete<unknown>(`/instructor/quizzes/${quiz_id}`, { withToken: true });
  return response;
};


export const addQuiz = async (payload: AddUpdateQuizPayload) => {
  const response = await API.Post<unknown>(`/instructor/quizzes/store`, { withToken: true, body: payload });
  return response;
};


export const updateQuiz = async (quiz_id: number, payload: AddUpdateQuizPayload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.set(`ajax[${quiz_id}][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/quizzes/${quiz_id}/update`, { withToken: true, formdata: formData });
  return response;
};


export const addNewQuiz = async (payload: AddUpdateQuizPayload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.set(`ajax[new][${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/quizzes/store`, { withToken: true, formdata: formData });
  return response;
};

/**
 * Questions Section
 */

export const getQuizEditData = cache(async (question_id: number) => {
  const response = await API.Get<unknown>(`/instructor/quizzes-questions/${question_id}/edit`, { withToken: true });
  return response;
});

export const getQuizDataToEdit = cache(async (question_id: number) => {
  const response = await API.Get<QuizDataToEdit>(`/instructor/quizzes/${question_id}/edit`, { withToken: true });
  return response;
});

export const getQuizQuestion = cache(async (question_id: number) => {
  const response = await API.Get<unknown>(`/instructor/quizzes-questions/${question_id}/getQuestionByLocale`, { withToken: true });
  return response;
});

export const deleteQuizQuestion = cache(async (question_id: number) => {
  const response = await API.Get<unknown>(`/instructor/quizzes-questions/${question_id}/delete`, { withToken: true });
  return response;
});


export const addQuizQuestion = cache(async (payload: AddUpdateQuizQuestionPayload) => {
  const formdata = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formdata.set(`ajax[${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/quizzes-questions`, { withToken: true, formdata });
  return response;
});


export const updateQuizQuestion = cache(async (question_id: number, payload: AddUpdateQuizQuestionPayload) => {
  const formdata = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formdata.set(`ajax[${key}]`, value);
  });

  const response = await API.Post<unknown>(`/instructor/quizzes-questions/${question_id}/update`, { withToken: true, formdata });
  return response;
});

export const getAllPanelQuizzes = cache(async (filters?: Partial<GetQuizzesFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key as keyof GetQuizzesFilters]}&`;
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<GetAllQuizzesResponse>(`/instructor/quizzes${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});

export const getAllInstructorCourses = cache(async () => {
  const response = await API.Get<InstructorCoursesResponse>(`/instructor/quizzes/new`, { withToken: true });
  return response;
});

export const getResultsQuizzes = cache(async () => {
  const response = await API.Get<GetAllQuizzesResponse>(`/instructor/quizzes/:id/results`, { withToken: true });
  return response;
});

export const getResults = cache(async (filters?: Partial<GetQuizzesFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key as keyof GetQuizzesFilters]}&`;
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<ResultsResponse>(`/panel/quizzes/results${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});

export const getMyResults = cache(async (filters?: Partial<GetQuizzesFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key as keyof GetQuizzesFilters]}&`;
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<MyResultsResponse>(`/panel/quizzes/results/my-results${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});