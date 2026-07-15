import { cache } from 'react';
import API from "../request.handler";
//= Types
import {
  ForumTopicsFilters,
  GetTopicsResponse,
  GetTopicRepliesResponse,
  BookmarkedTopicsReponse,
  GetForumsResponse,
  GetDataForCreateTopicResponse,
  ForumTopicPayload,
  CreateTopicResponse,
  SearchInTopicsResponse,
  GetForumTopicsResponse,
  GetEditDataForTopicResponse,
  ToggleReplyLikeResponse,
  BookmarkTopicResponse,
  GetTopicRepliesWebsiteResponse,
  GetEditDataForTopicReply,
  CreateUpdateReplyPayload,
  ReportTopicOrReplyPayload,
  CourseForumDataResponse,
  ForumAnswerResponse,
  BookmarksFilters
} from './types';


export const getForumsTopics = cache(async (filters?: Partial<ForumTopicsFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) {
      // @ts-ignore
      queryParams += `${encodeURIComponent(key)}=${filters[key]}&`;
    }
    queryParams = queryParams.slice(0, -1);
  }
  const response = await API.Get<GetTopicsResponse>(`/panel/forums/topics${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});

export const getForumsTopicReplies = cache(async (filters?: Partial<ForumTopicsFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) {
      // @ts-ignore
      queryParams += `${encodeURIComponent(key)}=${filters[key]}&`;
    }
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<GetTopicRepliesResponse>(`/panel/forums/posts${queryParams ? queryParams : ''}`, { withToken: true });

  return response;
});

export const getForumsBookmarkedTopics = cache(async (filters?: Partial<BookmarksFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) queryParams += `${encodeURIComponent(key)}=${filters[key as keyof BookmarksFilters]}&`;
    queryParams = queryParams.slice(0, -1);
  }
  const response = await API.Get<BookmarkedTopicsReponse>(`/panel/forums/bookmarks${queryParams ? queryParams : ''}`, { withToken: true });
  return response;
});

export const removeTopicFromBookmarks = async (topic_id: number) => {
  const response = await API.Get<{ code: 200 }>(`/panel/forums/topics/${topic_id}/removeBookmarks`, { withToken: true });
  return response;
};


export const getAllForums = cache(async () => {
  const response = await API.Get<GetForumsResponse>(`/forums`, { withToken: true });
  return response;
});

export const getDataForCreateTopic = cache(async () => {
  const response = await API.Get<GetDataForCreateTopicResponse>(`/forums/create-topic`, { withToken: true });
  return response;
});

export const createForumTopic = async (payload: ForumTopicPayload) => {
  const formdata = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'attachments' && payload?.attachments?.length) {
      payload.attachments.forEach((attachment) => {
        formdata.append('attachments[]', attachment);
      });
    }
    else formdata.set(key, value);
  });

  const response = await API.Post<CreateTopicResponse>(`/forums/create-topic`, { withToken: true, formdata });
  return response;
};



export const searchInForums = cache(async (searchText: string, sort: 'newest' | 'desc') => {
  const response = await API.Get<SearchInTopicsResponse>(`/forums/search?search=${searchText}&sort=${sort}`, { withToken: true });
  return response;
});

export const getForumTopics = cache(async ({ forum_slug, page = 1, sort }: { forum_slug: string; sort?: 'newest' | 'popular_topics' | 'not_answered'; page?: number }) => {
  const response = await API.Get<GetForumTopicsResponse>(`/forums/${forum_slug}/topics${page ? `?page=${page}` : ''}${sort ? `&sort=${sort}` : ''}`, { withToken: true });
  return response;
});

export const getEditDataForTopic = cache(async (forum_slug: string, topic_slug: string) => {
  const response = await API.Get<GetEditDataForTopicResponse>(`/forums/${forum_slug}/topics/${topic_slug}/edit`, { withToken: true });
  return response;
});

export const toggleTopicLike = async (forum_slug: string, topic_slug: string) => {
  const response = await API.Post<ToggleReplyLikeResponse>(`/forums/${forum_slug}/topics/${topic_slug}/likeToggle`, { withToken: true });
  return response;
};

export const bookmarkForumTopic = async (forum_slug: string, topic_slug: string) => {
  const response = await API.Post<BookmarkTopicResponse>(`/forums/${forum_slug}/topics/${topic_slug}/bookmark`, { withToken: true });
  return response;
};

export const downloadTopicAttachment = async ({ forum_slug, topic_slug, attachment_id }: { forum_slug: string, topic_slug: string, attachment_id: number }) => {
  const response = await API.Post<BookmarkTopicResponse>(`/forums/${forum_slug}/topics/${topic_slug}/downloadAttachment/${attachment_id}`, { withToken: true });
  return response;
};

export const updateForumTopic = async ({ forum_slug, topic_slug, payload }: { forum_slug: string, topic_slug: string, payload: ForumTopicPayload }) => {
  const formdata = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'attachments' && payload?.attachments?.length) {
      payload.attachments.forEach((attachment) => {
        formdata.append('attachments[]', attachment);
      });
    }
    else formdata.set(key, value);
  });

  const response = await API.Post<CreateTopicResponse>(`/forums/${forum_slug}/topics/${topic_slug}/edit`, {
    withToken: true, formdata, config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  });
  return response;
};

/**
 * Replies
 */
export const getTopicRepliesInWebsite = cache(async (forum_slug: string, topic_slug: string) => {
  const response = await API.Get<GetTopicRepliesWebsiteResponse>(`/forums/${forum_slug}/topics/${topic_slug}/posts`, { withToken: true });
  return response;
});


export const getEditDataForTopicReply = cache(async ({ forum_slug, topic_slug, post_id }: { forum_slug: string, topic_slug: string, post_id: number }) => {
  const response = await API.Get<GetEditDataForTopicReply>(`/forums/${forum_slug}/topics/${topic_slug}/posts/${post_id}/edit`, { withToken: true });
  return response;
});


export const createTopicReply = async ({ forum_slug, topic_slug, payload }: { forum_slug: string, topic_slug: string, payload: CreateUpdateReplyPayload }) => {
  const response = await API.Post<{ code: 200 }>(`/forums/${forum_slug}/topics/${topic_slug}/posts`, { withToken: true, body: payload });
  return response;
};


export const updateTopicReply = async ({ forum_slug, topic_slug, post_id, payload }: { forum_slug: string, topic_slug: string, post_id: number, payload: CreateUpdateReplyPayload }) => {
  const response = await API.Post<{ code: 200 }>(`/forums/${forum_slug}/topics/${topic_slug}/posts/${post_id}/edit`, { withToken: true, body: payload });
  return response;
};


export const reportTopicOrReply = async ({ forum_slug, topic_slug, payload }: { forum_slug: string, topic_slug: string, payload: ReportTopicOrReplyPayload }) => {
  const response = await API.Post<{ code: 200 }>(`/forums/${forum_slug}/topics/${topic_slug}/posts/report`, { withToken: true, body: payload });
  return response;
};


export const toggleTopicReplyLike = async ({ forum_slug, topic_slug, post_id }: { forum_slug: string, topic_slug: string, post_id?: number }) => {
  const response = await API.Post<ToggleReplyLikeResponse>(`/forums/${forum_slug}/topics/${topic_slug}/posts/${post_id}/likeToggle`, { withToken: true });
  return response;
};


export const pinTopicReply = async ({ forum_slug, topic_slug, post_id }: { forum_slug: string, topic_slug: string, post_id: number }) => {
  const response = await API.Post<{ code: 200 }>(`/forums/${forum_slug}/topics/${topic_slug}/posts/${post_id}/pin`, { withToken: true });
  return response;
};


export const unPinTopicReply = async ({ forum_slug, topic_slug, post_id }: { forum_slug: string, topic_slug: string, post_id: number }) => {
  const response = await API.Post<{ code: 200 }>(`/forums/${forum_slug}/topics/${topic_slug}/posts/${post_id}/un_pin`, { withToken: true });
  return response;
};


export const downloadTopicReplyAttachment = async ({ forum_slug, topic_slug, post_id }: { forum_slug: string, topic_slug: string, post_id: number }) => {
  const response = await API.Post<BookmarkTopicResponse>(`/forums/${forum_slug}/topics/${topic_slug}/posts/${post_id}/downloadAttachment`, { withToken: true });
  return response;
};


export const getCourseForumData = cache(async (webinar_id: number) => {
  const response = await API.Get<CourseForumDataResponse>(`/panel/webinars/${webinar_id}/forums`, { withToken: true });
  return response;
});


export const askQuestionInForum = async (webinar_id: string, payload: any) => {
  const response = await API.Post<unknown>(`/panel/webinars/${webinar_id}/forums`, { withToken: true, body: payload });
  return response;
};


export const pinForumQuestion = async (forum_id: number) => {
  const response = await API.Post<unknown>(`/panel/webinars/forums/${forum_id}/pin`, { withToken: true });
  return response;
};


export const editForumQuestion = async (forum_id: string, payload: { title: string, description: string, attachment: string }) => {
  const response = await API.Put<unknown>(`/panel/webinars/forums/${forum_id}`, { withToken: true, body: payload });
  return response;
};


export const getForumAnswers = cache(async (forum_id: number) => {
  const response = await API.Get<ForumAnswerResponse>(`/panel/webinars/forums/${forum_id}/answers`, { withToken: true });
  return response;
});


export const postForumQuestionAnswer = async (forum_id: number, payload: { description: string }) => {
  const response = await API.Post<unknown>(`/panel/webinars/forums/${forum_id}/answers`, { withToken: true, body: payload });
  return response;
};


export const pinForumQuestionAnswer = async (answerId: number) => {
  const response = await API.Post<unknown>(`/panel/webinars/forums/answers/${answerId}/pin`, { withToken: true });
  return response;
};


export const resolveForumQuestionAnswer = async (answerId: number) => {
  const response = await API.Post<unknown>(`/panel/webinars/forums/answers/${answerId}/resolve`, { withToken: true });
  return response;
};


export const EditForumQuestionAnswer = async (answerId: string, payload: { description: string }) => {
  const response = await API.Put<unknown>(`/panel/webinars/forums/answers/${answerId}`, { withToken: true, body: payload });
  return response;
};