import { cache } from 'react';
import API from "../../request.handler";
//= Types
import type {
  CreateData,
  BundleDataToEdit,
  CreateBundlePayload,
  CreatedBundle,
  UpdateBundlePayload,
  GetBundlesResponse,
  PanelBundle,
  BundleWebinar
} from '@/types';
//= Export Bundle Webinars API handlers
export * from './bundle-webinars';

export const getCreateData = cache(async () => {
  const response = await API.Get<CreateData>(`/instructor/bundles/new`, { withToken: true });
  if (response) return response;
});


export const getBundleDataToEdit = cache(async (bundle_id: number, step: number) => {
  const response = await API.Get<BundleDataToEdit>(`/instructor/bundles/${bundle_id}/step/${step}`, { withToken: true });
  if (response) return response;
});


export const exportBundleStudents = async (bundle_id: number) => {
  const response = await API.Get<unknown>(`/instructor/bundles/${bundle_id}/export`, { withToken: true });
  if (response) return response;
};


export const createNewBundle = async (payload: Partial<CreateBundlePayload>) => {
  const response = await API.Post<CreatedBundle>(`/instructor/bundles/store`, { body: payload, withToken: true });
  if (response?.data) return response.data;
};


export const updateBundle = async (bundle_id: number, payload: Partial<UpdateBundlePayload>) => {
  const response = await API.Post<{ nextstep: number }>(`/instructor/bundles/${bundle_id}/update`, { body: payload, withToken: true });
  if (response?.data) return response.data;
};


export const getMyBundles = cache(async (filter?: { [key: string]: string | number }) => {
  const response = await API.Get<GetBundlesResponse>(`/instructor/bundles?page=${filter?.page || 1}`, { withToken: true });
  if (response) return response;
});


export const getPanelBundleById = cache(async (bundle_id: number) => {
  const response = await API.Get<PanelBundle>(`/instructor/bundles/${bundle_id}`, { withToken: true });
  if (response) return response;
});


export const getPanelBundleWebinars = cache(async (bundle_id: number) => {
  const response = await API.Get<{ webinars: BundleWebinar[] }>(`/instructor/bundles/${bundle_id}/webinars`, { withToken: true });
  if (response) return response.webinars;
});


export const deleteBundle = async (bundle_id: number) => {
  const response = await API.Delete<unknown>(`/instructor/bundles/${bundle_id}`, { withToken: true });
  if (response) return response;
};
