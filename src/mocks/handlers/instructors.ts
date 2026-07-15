import { db } from '@/mocks/seed';
import { faker } from '@/mocks/lib/rng';
import { badgeImage } from '@/mocks/lib/images';
import { respond, error } from '@/mocks/lib/envelope';
import { laravelPaginate } from '@/mocks/lib/paginate';
import { state, withStore, persist } from '@/mocks/store/store';
import type { Ctx } from './types';

/** Build a DetailedUser for the public profile + login flow. */
export function buildDetailedUser(user: any) {
  const isTeacher = user.role_name === 'teacher';
  const webinars = isTeacher ? db.courses.filter((c) => c.teacher.id === user.id) : [];
  const blog = isTeacher ? db.articles.filter((a) => a.author.id === user.id) : [];

  const badges = isTeacher
    ? [
        { id: 1, title: 'Top Instructor', type: 'instructor', condition: '', image: badgeImage(1), locale: 'en', description: 'Highly rated instructor', created_at: user.created_at },
        { id: 2, title: 'Verified Expert', type: 'instructor', condition: '', image: badgeImage(2), locale: 'en', description: 'Verified Flutter expert', created_at: user.created_at },
      ]
    : [
        { id: 3, title: 'Fast Learner', type: 'user', condition: '', image: badgeImage(3), locale: 'en', description: 'Completed 5 courses', created_at: user.created_at },
      ];

  return {
    id: user.id,
    full_name: user.full_name,
    role_name: user.role_name,
    bio: user.bio || '',
    offline: '0',
    offline_message: '',
    verified: user.verified || '1',
    rate: user.rate || 0,
    avatar: user.avatar,
    meeting_status: 'online',
    user_group: null,
    address: user.address || '',
    status: 'active',
    email: user.email,
    mobile: user.mobile || '',
    language: user.language || 'en',
    newsletter: true,
    public_message: '1',
    active_subscription: null,
    headline: user.headline || null,
    courses_count: webinars.length,
    reviews_count: user.reviews_count || 0,
    appointments_count: isTeacher ? faker.number.int({ min: 5, max: 120 }) : 0,
    students_count: user.students_count || 0,
    followers_count: isTeacher ? faker.number.int({ min: 50, max: 5000 }) : faker.number.int({ min: 0, max: 30 }),
    following_count: faker.number.int({ min: 1, max: 40 }),
    badges,
    students: [],
    followers: [],
    following: [],
    auth_user_is_follower: state.following.includes(user.id),
    referral: null,
    education: [],
    experience: [],
    occupations: user.occupations || [],
    about: user.about || '',
    webinars,
    meeting: buildMeeting(user.id),
    blog,
    organization_teachers: [],
    country_id: null, province_id: null, city_id: null, district_id: null,
    account_type: isTeacher ? 'teacher' : 'user',
    iban: null, account_id: null, identity_scan: '', certificate: null,
    created_at: user.created_at,
  };
}

function buildMeeting(userId: number) {
  return {
    time_zone: 'UTC', gmt: '+00:00', id: userId, disabled: '0', discount: null,
    price: 25, price_with_discount: '25', in_person: '0', in_person_price: 0, in_person_price_with_discount: 0,
    in_person_group_min_student: '1', in_person_group_max_student: '5', 'in_person_group_amount ': '0',
    group_meeting: '0', online_group_min_student: '1', online_group_max_student: '10', online_group_amount: '0',
    timing: [], timing_group_by_day: {},
  };
}

export function list(ctx: Ctx) {
  const search = (ctx.query.get('search') || '').toLowerCase();
  let users = [...db.instructors];
  if (search) users = users.filter((u) => u.full_name.toLowerCase().includes(search));
  const page = Number(ctx.query.get('page') || 1);
  const paged = laravelPaginate(users, page, 9, '/providers/instructors');
  return respond({ count: users.length, users: paged });
}

export function profile(ctx: Ctx) {
  return withStore(() => {
    const user = db.usersById.get(Number(ctx.params.id));
    if (!user) return error('User not found', 404);
    return respond({ user: buildDetailedUser(user) });
  });
}

export function meetings(ctx: Ctx) {
  return respond({ count: 0, times: [] });
}

export function follow(ctx: Ctx) {
  return withStore(() => {
    const id = Number(ctx.params.id);
    const status = ctx.body?.status;
    const idx = state.following.indexOf(id);
    if (status === '1' && idx < 0) state.following.push(id);
    if (status === '0' && idx >= 0) state.following.splice(idx, 1);
    persist();
    return respond({}, status === '1' ? 'Following' : 'Unfollowed');
  });
}

export function sendMessage(_ctx: Ctx) {
  return respond({}, 'Message sent');
}

export function contactInfo(ctx: Ctx) {
  const user = db.usersById.get(Number(ctx.body?.user_id));
  return respond({
    avatar: user?.avatar || '',
    description: user?.bio || null,
    email: user?.email || 'hello@fluttercamp.dev',
    location: user?.address || 'Online',
    name: user?.full_name || 'FlutterCamp',
    phone: user?.mobile || '',
  });
}

export function reserveMeeting(_ctx: Ctx) {
  return respond({}, 'Meeting reserved');
}
