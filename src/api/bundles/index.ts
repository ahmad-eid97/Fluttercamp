import { cache } from 'react';
import API from "../request.handler";
//= Types
import { GetClientBundlesResponse, DetailedBundle, BundleCourses, CoursesBundlesFilters } from '@/types';

export const getAllBundles = cache(async (filters?: Partial<CoursesBundlesFilters>) => {
  let queryParams = `?`;
  if (filters) {
    for (const key in filters) {
      // @ts-ignore
      queryParams += `${encodeURIComponent(key)}=${filters[key]}&`;
    }
    queryParams = queryParams.slice(0, -1);
  }

  const response = await API.Get<{ bundles: GetClientBundlesResponse }>(`/bundles${queryParams ? queryParams : ''}`, { withToken: true });

  if (response) {
    return response.bundles;
  }
});

export const getBundleById = cache(async (bundle_id: number) => {
  const response = await API.Get<{ bundle: DetailedBundle }>(`/bundles/${bundle_id}`, { withToken: true });

  if (response) {
    return response.bundle;
  }
});

export const getBundleCourses = cache(async (bundle_id: string) => {
  const response = await API.Get<BundleCourses>(`/bundles/${bundle_id}/webinars`, { withToken: true });

  if (response) {
    return response.webinars;
  }
});