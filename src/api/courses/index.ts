import { cache } from 'react';
import API from "../request.handler";
//= Types
import {
  Course,
  GetClientCoursesResponse,
  DetailedCourse,
  ReportCoursePayload,
  AddReviewPayload,
  ToggleLessonViewPayload,
  Quiz,
  ValidateCertificateResponse,
  CourseChapters,
  CoursesBundlesFilters,
  Session,
  TextLesson,
  File,
  LocalVideoLesson,
  JoinAgoraResponse
} from './types';

export const getAllCourses = cache(async (filters?: Partial<CoursesBundlesFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) {
      // @ts-ignore
      queryParams += `${encodeURIComponent(key)}=${filters[key]}&`;
    }
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<GetClientCoursesResponse>(`/courses${queryParams ? queryParams : ''}`, { withToken: true });

  return response;
});

export const getCourseById = cache(async (courseId: number) => {
  const response = await API.Get<DetailedCourse>(`/courses/${courseId}`, { withToken: true });
  return response;
});

export const getCourseContent = cache(async (courseId: number) => {
  const response = await API.Get<CourseChapters[]>(`/courses/${courseId}/content`, { withToken: true, disableErrorMessage: true });
  return response;
});

export const getCourseQuizzes = cache(async (courseId: number) => {
  const response = await API.Get<Quiz[]>(`/courses/${courseId}/quizzes`, { withToken: true });
  return response;
});

export const validateCourseCertificate = cache(async (certificate_id: number) => {
  const response = await API.Get<ValidateCertificateResponse>(`/certificate_validation?certificate_id=${certificate_id}`, { withToken: true });
  return response;
});

export const toggleLessonView = async (courseId: number, payload: ToggleLessonViewPayload) => {
  const response = await API.Post<unknown>(`/courses/${courseId}/toggle`, { withToken: true, body: payload });
  return response;
};

export const reportCourse = async (courseId: number, payload: ReportCoursePayload) => {
  const response = await API.Post<unknown>(`/courses/${courseId}/report`, { withToken: true, body: payload });
  return response;
};

export const loadLessonContent = cache(async (src: string) => {
  const response = await API.Get<File | TextLesson | Session>(src.replace('http://', 'https://'), { withToken: true });
  return response;
});

export const deleteReview = async (review_id: number) => {
  const response = await API.Delete<unknown>(`/panel/reviews/${review_id}`, { withToken: true });
  return response;
};


export const addReplyToReview = async (review_id: number, reply: string) => {
  const response = await API.Post<unknown>(`/panel/reviews/${review_id}/reply`, { withToken: true, body: { reply } });

  return response;
};


export const addReview = async (payload: AddReviewPayload) => {
  const response = await API.Post<unknown>(`/panel/reviews`, { withToken: true, body: payload });

  return response;
};

export const enrollToCourse = async (course_id: number) => {
  const response = await API.Post<unknown>(`/panel/webinars/${course_id}/free`, { withToken: true });
  return response;
};


export const fetchCourseLocaleVideoLesson = cache(async (link: string) => {
  const response = await API.Get<LocalVideoLesson>(link, { withToken: true });
  return response;
});


export const joinToAgora = cache(async (session_id: string) => {
  const response = await API.Get<JoinAgoraResponse>(`/panel/sessions/${session_id}/joinToAgora`, { withToken: true });
  return response;
});


export const endAgora = cache(async (session_id: string) => {
  const response = await API.Get<{ code: 200 }>(`/panel/sessions/${session_id}/endAgora`, { withToken: true });
  return response;
});


export const toggleUsersJoinToAgora = cache(async (session_id: string) => {
  const response = await API.Get<{ code: 200 | 422 }>(`/panel/sessions/${session_id}/toggleUsersJoinToAgora`, { withToken: true });
  return response;
});


