import { cache } from 'react';
import API from "../request.handler";
//= Types
import { SearchResponse, ContactFormPayload, GeneralDataResponse, GetWebsitePageDataResponse } from './types';
import { Locale } from '@/types';

export const searchInDatabase = cache(async (searchText: string) => {
  const response = await API.Get<SearchResponse>(`/search?search=${searchText}`, { withToken: true });
  return response;
});

export const sendContactForm = async (payload: ContactFormPayload) => {
  const formdata = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formdata.append(key, value);
  });

  const response = await API.Post<unknown>(`/contact`, {
    withToken: true, formdata,
    config: {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }
  });
  return response;
};


export const uploadFileToStorage = async (file: File) => {
  const formdata = new FormData();
  formdata.append('file', file);

  const response = await API.Post<{ path: string; }>(`/panel/laravel-filemanager/upload`,
    {
      withToken: true,
      formdata,
      config: {
        headers: {
          'Content-Type': undefined
        }
      }
    });

  if (response && response.data) return response.data.path;
};


export const getGeneralConfigData = cache(async (locale: Locale) => {
  const response = await API.Get<GeneralDataResponse>(`/config`, {
    withToken: true,
  });
  return response;
});


export const subscribeNewsletter = async (payload: { email: string }) => {
  const response = await API.Post<unknown>(`/newsletter`, { withToken: true, body: payload });
  return response;
};


export const getWebsitePageData = cache(async (link: string) => {
  const response = await API.Get<GetWebsitePageDataResponse>(`/pages/${link}`, { withToken: true });
  return response;
});