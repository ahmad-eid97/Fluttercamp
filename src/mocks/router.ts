import type { Ctx, Handler } from './handlers/types';
import * as general from './handlers/general';
import * as courses from './handlers/courses';
import * as categories from './handlers/categories';
import * as instructors from './handlers/instructors';
import * as bundles from './handlers/bundles';
import * as articles from './handlers/articles';
import * as testimonials from './handlers/testimonials';
import * as cart from './handlers/cart';
import * as auth from './handlers/auth';
import * as forums from './handlers/forums';
import * as panel from './handlers/panel';

interface Route {
  method: string;
  re: RegExp;
  handler: Handler;
}

const r = (method: string, pattern: string, handler: Handler): Route => ({
  method,
  // Convert `/courses/:id` → `^/courses/(?<id>[^/]+)$`
  re: new RegExp(
    '^' + pattern.replace(/:[a-zA-Z_]+/g, (m) => `(?<${m.slice(1)}>[^/]+)`) + '$',
  ),
  handler,
});

/** Ordered route table — first match wins, so specific routes precede generic. */
const routes: Route[] = [
  // ---- General ----
  r('GET', '/config', general.config),
  r('GET', '/search', general.search),
  r('POST', '/contact', general.contact),
  r('POST', '/newsletter', general.newsletter),
  r('POST', '/panel/laravel-filemanager/upload', general.uploadFile),
  r('GET', '/pages/:link', general.page),
  r('GET', '/timezones', general.timezones),

  // ---- Auth ----
  r('POST', '/login', auth.login),
  r('POST', '/logout', auth.logout),
  r('POST', '/register/step/1', auth.registerStep1),
  r('POST', '/register/step/2', auth.registerStep2),
  r('POST', '/register/step/3', auth.registerStep3),
  r('GET', '/google', auth.google),
  r('GET', '/facebook', auth.facebook),

  // ---- Courses (specific before /courses/:id) ----
  r('GET', '/courses', courses.list),
  r('GET', '/courses/:id/content', courses.content),
  r('GET', '/courses/:id/quizzes', courses.quizzes),
  r('GET', '/courses/:id', courses.detail),
  r('GET', '/certificate_validation', courses.validateCertificate),
  r('POST', '/courses/:id/toggle', courses.toggleLesson),
  r('POST', '/courses/:id/report', courses.report),
  r('POST', '/panel/webinars/:id/free', courses.enroll),
  r('POST', '/panel/webinars/:id/favorite', courses.toggleFavorite),
  r('POST', '/panel/reviews', courses.addReview),
  r('POST', '/panel/reviews/:id/reply', courses.reviewReply),
  r('DELETE', '/panel/reviews/:id', courses.deleteReview),

  // ---- Categories ----
  r('GET', '/categories', categories.list),
  r('GET', '/categorie/:id/webinars', categories.categoryCourses),

  // ---- Instructors / users ----
  r('GET', '/providers/instructors', instructors.list),
  r('GET', '/users/:id/profile', instructors.profile),
  r('GET', '/users/:id/meetings', instructors.meetings),
  r('POST', '/panel/users/:id/follow', instructors.follow),
  r('POST', '/panel/users/contact-info', instructors.contactInfo),
  r('POST', '/users/:id/send-message', instructors.sendMessage),
  r('POST', '/meetings/reserve', instructors.reserveMeeting),

  // ---- Bundles / tracks ----
  r('GET', '/bundles', bundles.list),
  r('GET', '/bundles/:id/webinars', bundles.webinars),
  r('GET', '/bundles/:id', bundles.detail),

  // ---- Articles / blogs (categories before :id) ----
  r('GET', '/blogs/categories', articles.categories),
  r('GET', '/blogs', articles.list),
  r('GET', '/blogs/:id', articles.detail),

  // ---- Testimonials ----
  r('GET', '/testimonials', testimonials.list),

  // ---- Cart ----
  r('GET', '/panel/cart/list', cart.list),
  r('POST', '/panel/cart/coupon/validate', cart.validateCoupon),
  r('POST', '/panel/cart/checkout', cart.checkout),
  r('POST', '/panel/cart/store', cart.storeCart),
  r('POST', '/panel/cart', cart.add),
  r('DELETE', '/panel/cart/:id', cart.remove),
  r('POST', '/panel/payments/request', cart.paymentRequest),
  r('POST', '/panel/payments/credit', cart.paymentCredit),
  r('GET', '/payments/verify_api/:gateway', cart.paymentVerify),

  // ---- Dashboard / panel ----
  r('GET', '/panel/quick-info', panel.quickInfo),
  r('GET', '/panel/notifications', panel.notifications),
  r('GET', '/instructor/webinar', panel.instructorWebinars),
  r('GET', '/panel/webinars/purchases', panel.myPurchases),
  r('GET', '/panel/favorites', panel.favorites),
  r('GET', '/panel/financial/platform-bank-accounts', panel.bankAccounts),
  r('GET', '/panel', panel.dashboard),

  // ---- Forums ----
  r('GET', '/panel/forums/topics', forums.topics),
  r('GET', '/panel/forums/posts', forums.posts),
  r('GET', '/panel/forums/bookmarks', forums.bookmarks),
  r('GET', '/forums', forums.allForums),
  r('GET', '/panel/webinars/:id/forums', forums.courseForumData),
  r('GET', '/panel/webinars/forums/:id/answers', forums.forumAnswers),
];

export function matchRoute(ctx: Ctx): Handler | null {
  for (const route of routes) {
    if (route.method !== ctx.method) continue;
    const m = route.re.exec(ctx.pathname);
    if (m) {
      ctx.params = m.groups ?? {};
      return route.handler;
    }
  }
  return null;
}

/** Fallback when no explicit route matched. */
export function fallback(ctx: Ctx): Handler {
  // Panel + instructor GETs share the permissive empty payload so un-modelled
  // dashboard pages render clean empty states instead of crashing on undefined.
  if (ctx.method === 'GET' && (ctx.pathname.startsWith('/panel') || ctx.pathname.startsWith('/instructor'))) {
    return panel.emptyList;
  }
  return general.notFound; // ok(null) — safe empty success
}
