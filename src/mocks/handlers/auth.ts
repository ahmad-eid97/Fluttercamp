import { db } from '@/mocks/seed';
import { respond, error } from '@/mocks/lib/envelope';
import type { Ctx } from './types';

export const DEMO_PASSWORD = 'password';

export function tokenFor(userId: number) {
  return `mock-token-${userId}`;
}

export function login(ctx: Ctx) {
  const username = String(ctx.body?.username || '').toLowerCase().trim();
  const password = String(ctx.body?.password || '');

  const user = [...db.instructors, ...db.students].find(
    (u) => u.email.toLowerCase() === username,
  );

  if (!user || password !== DEMO_PASSWORD) {
    return error('These credentials do not match our records.', 422, {
      errors: { username: ['These credentials do not match our records.'] },
    });
  }

  return respond({ token: tokenFor(user.id), user_id: user.id }, 'Logged in');
}

export function logout(_ctx: Ctx) {
  return respond({}, 'Logged out');
}

export function registerStep1(_ctx: Ctx) {
  // New sign-ups become the demo student so the rest of the flow has real data.
  return respond({ user_id: db.demo.student.id });
}

export function registerStep2(_ctx: Ctx) {
  return respond({ code: '123456' }, 'Verification code accepted');
}

export function registerStep3(ctx: Ctx) {
  const user = db.demo.student;
  return respond({ user_id: user.id, full_name: ctx.body?.full_name || user.full_name, token: tokenFor(user.id) }, 'Welcome to FlutterCamp!');
}

export function google(_ctx: Ctx) {
  return respond({ url: '/login' });
}

export function facebook(_ctx: Ctx) {
  return respond({ url: '/login' });
}
