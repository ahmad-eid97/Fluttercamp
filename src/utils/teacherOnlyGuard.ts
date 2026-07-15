import { redirect } from 'next/navigation';
import { getUserById } from '@/api';

const isServer = typeof window === 'undefined';

export default async function GuardTeacherOnlyPage({ redirect_to_if_not_verified }: { redirect_to_if_not_verified?: string }) {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const user = (await cookies()).get('fluttercamp-auth-user')?.value;

    if (user) {
      const userData = JSON.parse(decodeURIComponent(user));
      if (userData.role !== 'teacher' && userData.role !== 'admin') redirect('/panel');

      if (redirect_to_if_not_verified) {
        const userInDatabase = await getUserById(userData.id);
        if (userInDatabase?.verified == "0") redirect(redirect_to_if_not_verified);
      }
    }
  }
}