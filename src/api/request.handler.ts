import { AxiosRequestConfig } from 'axios';
//= Axios Util
import { clientWithToken, clientNormal } from '@/utils/axios';
//= Toasts
import { toast } from 'react-hot-toast';

interface Options {
  config?: AxiosRequestConfig;
  body?: any;
  formdata?: FormData;
  withToken?: boolean;
  disableErrorMessage?: boolean;
}

export interface Response<T> {
  success: boolean;
  status: string;
  message: string;
  data?: T;
}

class API_HANDLER {
  public async Get<T>(endpoint: string, options?: Options): Promise<T | undefined> {
    const config = options?.config || {};
    try {
      const response = await (options?.withToken ? await clientWithToken() : await clientNormal()).get<Response<T>>(endpoint, config);

      if (!response?.data) throw new Error("An Unexpected Error Occured");
      if (response.data && response.data.success === false && !options?.disableErrorMessage) {
        // @ts-ignore
        const message = response.data.data?.errors ? Object.values(response.data.data?.errors)[0][0] : undefined;
        if (message) toast.error(message);
        else toast.error(response.data.message)
      }

      const data: T = response.data.data as T;

      return data || response.data as T;
    } catch (err: any) {
      if (options?.disableErrorMessage) return;
      typeof window === 'undefined' ?
        console.log(err?.response?.data?.error || err.message)
        :
        toast.error(err?.response?.data?.error || err.message)
    }
  }

  public async Post<T>(endpoint: string, options: Options): Promise<Response<T> | undefined | null> {
    const config = options?.config;
    const body = options?.formdata ? options?.formdata : options?.body || {};

    try {
      const response = await (options?.withToken ? await clientWithToken() : await clientNormal()).post<Response<T>>(endpoint, body, config);


      if (!response?.data) throw new Error("An Unexpected Error Occured");
      if (response.data && response.data.success === false && !options?.disableErrorMessage) {
        // @ts-ignore
        const message = response.data.data?.errors ? Object.values(response.data.data?.errors)[0][0] : undefined;
        if (message) toast.error(message);
        else toast.error(response.data.message)
      }

      const data: Response<T> | null = response.data as Response<T>;

      return data;
    } catch (err: any) {
      if (options?.disableErrorMessage) return;
      // @ts-ignore
      const message = err?.response?.data?.errors ? Object.values(err?.response?.data?.errors)[0][0] : undefined;
      if (message) {
        toast.error(message);
      } else {
        typeof window === 'undefined' ?
          console.log(err?.response?.data?.error || err.message)
          :
          toast.error(err?.response?.data?.error || err.message)
      }
    }
  }

  public async Patch<T>(endpoint: string, options: Options): Promise<Response<T> | undefined> {
    const config = options?.config || {};
    const body = options?.formdata ? options?.formdata : options?.body || {};

    try {
      const response = await (options?.withToken ? await clientWithToken() : await clientNormal()).patch<Response<T>>(endpoint, body, config);

      if (!response?.data) throw new Error("An Unexpected Error Occured");
      if (response.data && response.data.success === false && !options?.disableErrorMessage) {
        // @ts-ignore
        const message = response.data.data?.errors ? Object.values(response.data.data?.errors)[0][0] : undefined;
        if (message) toast.error(message);
        else toast.error(response.data.message)
      }

      const data: Response<T> = response.data as Response<T>;

      return data;
    } catch (err: any) {
      if (options?.disableErrorMessage) return;
      // @ts-ignore
      const message = err?.response?.data?.errors ? Object.values(err?.response?.data?.errors)[0][0] : undefined;
      if (message) {
        toast.error(message);
      } else {
        typeof window === 'undefined' ?
          console.log(err?.response?.data?.error || err.message)
          :
          toast.error(err?.response?.data?.error || err.message)
      }
    }
  }

  public async Put<T>(endpoint: string, options: Options): Promise<Response<T> | undefined> {
    const config = options?.config || {};
    const body = options?.formdata ? options?.formdata : options?.body || {};

    try {
      const response = await (options?.withToken ? await clientWithToken() : await clientNormal()).put<Response<T>>(endpoint, body, config);

      if (!response?.data) throw new Error("An Unexpected Error Occured");
      if (response.data && response.data.success === false && !options?.disableErrorMessage) {
        // @ts-ignore
        const message = response.data.data?.errors ? Object.values(response.data.data?.errors)[0][0] : undefined;
        if (message) toast.error(message);
        else toast.error(response.data.message)
      }

      const data: Response<T> = response.data as Response<T>;

      return data;
    } catch (err: any) {
      if (options?.disableErrorMessage) return;
      // @ts-ignore
      const message = err?.response?.data?.errors ? Object.values(err?.response?.data?.errors)[0][0] : undefined;
      if (message) {
        toast.error(message);
      } else {
        typeof window === 'undefined' ?
          console.log(err?.response?.data?.error || err.message)
          :
          toast.error(err?.response?.data?.error || err.message)
      }
    }
  }

  public async Delete<T>(endpoint: string, options?: Options): Promise<Response<T> | undefined> {
    const config = options?.config || {};
    const body = options?.formdata ? options?.formdata : options?.body || {};

    try {
      const response = await (options?.withToken ? await clientWithToken() : await clientNormal()).delete<Response<T>>(endpoint, { ...config, data: body });

      if (!response?.data) throw new Error("An Unexpected Error Occured");
      if (response.data && response.data.success === false && !options?.disableErrorMessage) {
        // @ts-ignore
        const message = response.data.data?.errors ? Object.values(response.data.data?.errors)[0][0] : undefined;
        if (message) toast.error(message);
        else toast.error(response.data.message)
      }

      return response.data as Response<T>;
    } catch (err: any) {
      if (options?.disableErrorMessage) return;
      // @ts-ignore
      const message = err?.response?.data?.errors ? Object.values(err?.response?.data?.errors)[0][0] : undefined;
      if (message) {
        toast.error(message);
      } else {
        typeof window === 'undefined' ?
          console.log(err?.response?.data?.error || err.message)
          :
          toast.error(err?.response?.data?.error || err.message)
      }
    }
  }
}

const api = new API_HANDLER();

export default api;