import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type Params = {
  ifUserExist: boolean;
  redirectTo: string;
}

export default async function AuthGuard({ ifUserExist, redirectTo }: Params) {
  const token = (await cookies()).get('fluttercamp-auth-token')?.value;

  if ((ifUserExist && token) && redirectTo) {
    redirect(redirectTo);
  }

  if ((!ifUserExist && !token) && redirectTo) {
    redirect(redirectTo);
  }

  return {};
}