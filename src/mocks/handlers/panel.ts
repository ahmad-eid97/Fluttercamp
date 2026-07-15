import { db } from '@/mocks/seed';
import { faker, hashInt, NOW } from '@/mocks/lib/rng';
import { respond } from '@/mocks/lib/envelope';
import { laravelPaginate } from '@/mocks/lib/paginate';
import { state, withStore } from '@/mocks/store/store';
import type { Ctx } from './types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function isInstructor(ctx: Ctx) {
  const user = ctx.userId ? db.usersById.get(ctx.userId) : null;
  return user?.role_name === 'teacher';
}

export function dashboard(ctx: Ctx) {
  const teacher = isInstructor(ctx);
  const chart = MONTHS.map((_, i) => {
    const base = teacher ? 1200 : 6;
    const amp = teacher ? 2600 : 9;
    return base + Math.round((Math.sin(i / 1.7) * 0.5 + 0.5) * amp) + hashInt((ctx.userId || 1) * 13 + i, 0, teacher ? 600 : 3);
  });
  return respond({
    pageTitle: 'Dashboard',
    nextBadge: { percent: 68, earned: {
      id: 1, image: '', type: 'instructor', condition: '', score: '100', created_at: new Date(NOW).toISOString(),
      locale: 'en', title: null, description: null,
      translations: [{ id: 1, badge_id: '1', locale: 'en', title: 'Rising Star', description: 'Almost there!' }],
    } },
    supportsCount: teacher ? hashInt(2, 0, 8) : 0,
    commentsCount: teacher ? hashInt(3, 2, 40) : 0,
    monthlySalesCount: teacher ? hashInt(4, 8, 120) : undefined,
    pendingAppointments: teacher ? hashInt(5, 0, 6) : undefined,
    webinarsCount: teacher ? db.courses.filter((c) => c.teacher.id === ctx.userId).length : undefined,
    reserveMeetingsCount: teacher ? hashInt(6, 0, 12) : undefined,
    monthlyChart: { months: MONTHS, data: chart },
    financial: { can_drawable: teacher, drawable: teacher ? hashInt(7, 500, 8000) : 0 },
    giftModal: null,
    account_balance: teacher ? hashInt(8, 1000, 12000) : hashInt(8, 0, 200),
    is_user: !teacher,
  });
}

export function quickInfo(ctx: Ctx) {
  return withStore(() => {
    const teacher = isInstructor(ctx);
    const user = ctx.userId ? db.usersById.get(ctx.userId) : null;
    // smooth, rising-ish series (no jagged 1-5 noise)
    const chart = MONTHS.map((_, i) => {
      const base = teacher ? 1200 : 6;
      const amp = teacher ? 2600 : 9;
      const v = base + Math.round((Math.sin(i / 1.7) * 0.5 + 0.5) * amp) + hashInt((ctx.userId || 1) * 17 + i, 0, teacher ? 600 : 3);
      return v;
    });
    const enrolled = state.enrolled.length || hashInt((ctx.userId || 1) + 20, 4, 9);
    return respond({
      offline: '0',
      spent_points: 120,
      total_points: 480,
      available_points: 360,
      role_name: user?.role_name || 'user',
      full_name: user?.full_name || 'Guest',
      financial_approval: '1',
      unread_notifications: { count: 2, notifications: notificationItems().slice(0, 2) },
      unread_noticeboards: notificationItems().slice(0, 1),
      balance: teacher ? hashInt(8, 1800, 12000) : hashInt(8, 60, 480),
      can_drawable: teacher,
      badges: { next_badge: 'Rising Star', percent: 68, earned: '4' },
      monthlyChart: { months: MONTHS, data: chart },
      count_cart_items: state.cartItems.length,
      pendingAppointments: teacher ? hashInt(5, 1, 6) : hashInt(25, 0, 3),
      monthlySalesCount: teacher ? hashInt(4, 8, 120) : enrolled,
      webinarsCount: teacher ? db.courses.filter((c) => c.teacher.id === ctx.userId).length : enrolled,
      reserveMeetingsCount: teacher ? hashInt(6, 1, 12) : hashInt(23, 0, 4),
      supportsCount: teacher ? hashInt(2, 1, 8) : hashInt(21, 0, 3),
      commentsCount: teacher ? hashInt(3, 4, 40) : hashInt(22, 2, 14),
    });
  });
}

function notificationItems() {
  const now = Math.floor(NOW / 1000); // Unix seconds (component multiplies by 1000)
  return [
    { id: 1, webinar_id: null, user_id: null, instructor_id: '1002', type: 'system', sender: 'FlutterCamp', title: 'Welcome to FlutterCamp 🎉', message: 'Start your first Flutter course today and earn your first certificate!', created_at: String(now - 3600) },
    { id: 2, webinar_id: null, user_id: null, instructor_id: '1002', type: 'course', sender: 'FlutterCamp', title: 'New course available', message: 'Material 3 Design Systems in Flutter is now live.', created_at: String(now - 86400) },
  ];
}

export function notifications(_ctx: Ctx) {
  const items = notificationItems();
  // Consumed two ways: the topbar dropdown reads `.notifications`, the list page
  // reads the paginator `.data` — provide both.
  return respond({
    count: items.length,
    unread_count: 2,
    notifications: items,
    data: items,
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: items.length,
    from: 1,
    to: items.length,
    meta: { current_page: 1, last_page: 1, per_page: 12, total: items.length, from: 1, to: items.length, path: '' },
  });
}

/** Map a seeded public course into the panel "webinar" row shape (reuses fields). */
function toPanelWebinar(c: any, index = 0) {
  const start = Math.floor(NOW / 1000) - (index + 1) * 14 * 86400; // staggered recent dates
  return {
    ...c,
    thumbnail: c.image,
    students: c.students_count,
    sales: c.sales,
    sale_count: c.sales?.count ?? 0,
    amount: c.sales?.amount ?? 0,
    status: 'active',
    private: '0',
    start_date: c.start_date || start,
    created_at: c.created_at || start,
    can: { view: true, edit: true, delete: true },
  };
}

/** GET /instructor/webinar — the instructor's own courses (main panel page). */
export function instructorWebinars(ctx: Ctx) {
  const courses = db.courses.filter((c) => c.teacher.id === ctx.userId).map(toPanelWebinar);
  const page = Number(ctx.query.get('page') || 1);
  const totalSales = courses.reduce((s, c) => s + (c.sales?.amount || 0), 0);
  const hours = courses.reduce((s, c) => s + (c.hours || 0), 0);
  return respond({
    webinars: laravelPaginate(courses, page, 10, '/instructor/webinar'),
    webinarsCount: courses.length,
    webinarSalesAmount: Math.round(totalSales),
    courseSalesAmount: 0,
    webinarHours: String(hours),
    pageTitle: 'My Courses',
  });
}

/** GET /panel/financial/platform-bank-accounts — nested { accounts, data:{ offlineBanks, … } }. */
export function bankAccounts(_ctx: Ctx) {
  return respond({
    accounts: [],
    data: {
      offlineBanks: [
        { id: 1, title: 'FlutterCamp Bank', account_number: 'SA00 0000 0000 0000 0000', cart_number: null, status: 'active' },
      ],
      OfflinePayment: null,
      offlinePayments: [],
      userBanks: [],
    },
  });
}

/** GET /panel/favorites — the student's favourited courses (array of { webinar }). */
export function favorites(_ctx: Ctx) {
  return withStore(() => {
    const ids = state.favorites?.length ? state.favorites : db.courses.slice(0, 3).map((c) => c.id);
    const favorites = ids
      .map((id) => db.coursesById.get(id))
      .filter(Boolean)
      .map((c, i) => ({ id: 70000 + i, webinar: c, webinar_id: c.id }));
    return respond({ favorites });
  });
}

/** GET /panel/webinars/purchases — the student's enrolled/purchased courses (flat array). */
export function myPurchases(_ctx: Ctx) {
  return withStore(() => {
    const ids = state.enrolled.length ? state.enrolled : db.courses.slice(0, 5).map((c) => c.id);
    const courses = ids.map((id) => db.coursesById.get(id)).filter(Boolean).map(toPanelWebinar);
    return respond({ webinars: courses });
  });
}

/**
 * Permissive empty payload for un-modelled panel GET endpoints. It carries every
 * common nested shape the panel components read (`webinars.data`, `users.data`,
 * `times`, `count`, …) so pages render clean empty states instead of crashing on
 * `undefined` access.
 */
export function emptyList(_ctx: Ctx) {
  const emptyMeta = { current_page: 1, from: 0, last_page: 1, path: '', per_page: 12, to: 0, total: 0 };
  // Carries paginator fields (data/meta/last_page) AND chart fields (labels/series)
  // so both table and chart consumers read a safe empty value.
  const emptyPaginator = { current_page: 1, data: [], first_page_url: '', from: 0, last_page: 1, last_page_url: '', next_page_url: null, path: '', per_page: 12, prev_page_url: null, to: 0, total: 0, meta: { ...emptyMeta }, links: { first: '', last: '', prev: null, next: null }, labels: [], series: [], datasets: [] };
  return respond({
    ...emptyPaginator,
    pageTitle: '',
    webinars: { ...emptyPaginator },
    webinarsCount: 0,
    webinarSalesAmount: 0,
    courseSalesAmount: 0,
    webinarHours: '0',
    bundles: { ...emptyPaginator },
    users: { ...emptyPaginator },
    posts: { ...emptyPaginator },
    topics: { ...emptyPaginator },
    quizzes: { ...emptyPaginator },
    assignments: { ...emptyPaginator },
    certificates: { ...emptyPaginator },
    sales: { ...emptyPaginator },
    payouts: { ...emptyPaginator },
    specialOffers: { ...emptyPaginator },
    promotions: { ...emptyPaginator },
    results: { ...emptyPaginator },
    quizzesResults: { ...emptyPaginator },
    comments: { ...emptyPaginator },
    discounts: { ...emptyPaginator },
    students: { ...emptyPaginator },
    // dashboard/statistics chart objects
    quizStatusChart: { ...emptyPaginator },
    monthlySalesChart: { ...emptyPaginator },
    studentsUserRolesChart: { ...emptyPaginator },
    courseProgressChart: { ...emptyPaginator },
    courseProgressLineChart: { ...emptyPaginator },
    assignmentsStatusChart: { ...emptyPaginator },
    times: [],
    meetings: [],
    notifications: [],
    // numeric stat fields read by various statistics boxes (avoid NaN)
    total_sales: 0, meeting_sales: 0, sales_count: 0, students_count: 0, meetings_count: 0,
    totalNoticeboards: 0, totalCourseNotices: 0, totalGeneralNotices: 0,
    bundles_count: 0, totalAmount: 0, balance: 0,
    favorites: [],
    subscribes: [],
    history: [],
    offlineBanks: [],
    items: [],
    list: [],
    count: 0,
    meta: { current_page: 1, from: 0, last_page: 1, path: '', per_page: 12, to: 0, total: 0 },
    links: { first: '', last: '', prev: null, next: null },
  });
}
