import axios from 'axios';
import { mockAdapter } from '@/mocks/adapter';

const isServer = typeof window === 'undefined';
// FlutterCamp ships as a self-contained demo: all data is mocked, no real backend.
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== 'false';

async function createAxiosClient() {
  let locale = 'EN';
  if (isServer) {
    const { cookies } = await import('next/headers');
    const savedLocale = (await cookies()).get('fluttercamp-locale')?.value;
    if (savedLocale) locale = savedLocale.toUpperCase();
  } else {
    const savedLocale = document.cookie.replace(/(?:(?:^|.*;\s*)fluttercamp-locale\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (savedLocale) locale = savedLocale.toUpperCase();
  }

  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY,
      'x-locale': locale,
      'Accept-Language': locale,
    },
    ...(USE_MOCKS ? { adapter: mockAdapter } : {}),
  });

  return client;
}


async function createAxiosClientWithToken() {
  const client = await createAxiosClient();

  client.interceptors.request.use(async (config) => {
    if (isServer) {
      const { cookies } = await import('next/headers');
      const token = (await cookies()).get('fluttercamp-auth-token')?.value;
      if (token) config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)fluttercamp-auth-token\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return client;
}

export const clientWithToken = async () => await createAxiosClientWithToken();
export const clientNormal = async () => await createAxiosClient();