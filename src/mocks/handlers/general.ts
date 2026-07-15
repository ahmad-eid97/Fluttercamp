import { db } from '@/mocks/seed';
import { NOW } from '@/mocks/lib/rng';
import { txt } from '@/mocks/lib/i18n';
import { respond, error } from '@/mocks/lib/envelope';
import type { Ctx } from './types';

export function config(_ctx: Ctx) {
  return respond(db.config);
}

export function search(ctx: Ctx) {
  const q = (ctx.query.get('search') || '').toLowerCase().trim();
  const match = (s: any) => !q || txt(s).toLowerCase().includes(q);

  const webinars = db.courses.filter((c) => match(c.title) || match(c.category));
  const teachers = db.instructors.filter((t) => match(t.full_name) || match(t.headline));
  const users = db.students.filter((u) => match(u.full_name));

  return respond({
    webinars: { webinars: webinars.slice(0, 8), count: webinars.length },
    users: { users: users.slice(0, 6), count: users.length },
    teachers: { teachers: teachers.slice(0, 6), count: teachers.length },
    organizations: { organizations: [], count: 0 },
  });
}

export function contact(_ctx: Ctx) {
  return respond({}, 'Your message has been sent. We will get back to you soon!');
}

export function newsletter(_ctx: Ctx) {
  return respond({}, 'You are subscribed to the FlutterCamp newsletter!');
}

export function page(ctx: Ctx) {
  const link = ctx.params.link || 'home';
  return respond({
    pageTitle: 'FlutterCamp',
    pageDescription: 'Learn Flutter & Dart',
    pageRobot: 'index,follow',
    page: {
      id: 1, link, name: link, robot: 'index,follow', status: 'active',
      created_at: new Date(NOW).toISOString(), locale: 'en', title: null, seo_description: null, content: null,
      translations: [{ id: 1, page_id: '1', locale: 'en', title: link, seo_description: '', content: '<p>FlutterCamp.</p>' }],
    },
  });
}

export function uploadFile(_ctx: Ctx) {
  return respond({ path: '/imgs/placeholder-image.png' }, 'Uploaded');
}

/** GET /timezones — flat string[] the settings form maps into a select. */
export function timezones(_ctx: Ctx) {
  return respond([
    'UTC', 'Africa/Cairo', 'Africa/Casablanca', 'Asia/Riyadh', 'Asia/Dubai', 'Asia/Amman',
    'Asia/Baghdad', 'Asia/Beirut', 'Asia/Jerusalem', 'Asia/Istanbul', 'Asia/Karachi',
    'Asia/Kolkata', 'Asia/Tokyo', 'Asia/Singapore', 'Europe/London', 'Europe/Paris',
    'Europe/Berlin', 'Europe/Madrid', 'Europe/Moscow', 'America/New_York', 'America/Chicago',
    'America/Denver', 'America/Los_Angeles', 'America/Sao_Paulo', 'Australia/Sydney',
  ]);
}

export function notFound(_ctx: Ctx) {
  // Safe empty success so no page crashes on an un-mocked endpoint.
  return respond(null);
}

export { error };
