//= Types
import type { InitialUserState } from '@/store/slices/user';

const isServer = typeof window === 'undefined';

export async function isLoggedIn() {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const token = (await cookies()).get('fluttercamp-auth-token')?.value;
    if (token) return true;
  } else {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)fluttercamp-auth-token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (token) return true;
  }
  return false;
}

export async function getCurrentUser() {
  let user: InitialUserState['user'] = null;;

  if (isServer) {
    const { cookies } = await import('next/headers');
    const userString = (await cookies()).get('fluttercamp-auth-user')?.value;
    if (userString) user = JSON.parse(userString);
  } else {
    const userString = document.cookie.replace(/(?:(?:^|.*;\s*)fluttercamp-auth-user\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (userString) user = JSON.parse(userString);
  }

  if (user) return user;
  return null;
}