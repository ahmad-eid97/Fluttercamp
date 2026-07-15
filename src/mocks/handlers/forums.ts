import { db } from '@/mocks/seed';
import { respond } from '@/mocks/lib/envelope';
import { laravelPaginate } from '@/mocks/lib/paginate';
import type { Ctx } from './types';

/**
 * Forums are lightly mocked: enough structure that pages render with sensible
 * empty/seeded states rather than crashing. The course Q&A forum returns a few
 * seeded questions tied to real courses.
 */

export function topics(ctx: Ctx) {
  const page = Number(ctx.query.get('page') || 1);
  return respond(laravelPaginate([], page, 12, '/panel/forums/topics'));
}

export function posts(ctx: Ctx) {
  const page = Number(ctx.query.get('page') || 1);
  return respond(laravelPaginate([], page, 12, '/panel/forums/posts'));
}

export function bookmarks(ctx: Ctx) {
  const page = Number(ctx.query.get('page') || 1);
  return respond(laravelPaginate([], page, 12, '/panel/forums/bookmarks'));
}

export function allForums(_ctx: Ctx) {
  const forums = db.categories.slice(0, 6).map((c, i) => ({
    id: i + 1,
    title: `${c.title} Forum`,
    slug: `forum-${i + 1}`,
    description: `Ask questions and share tips about ${c.title}.`,
    icon: c.icon,
    topics_count: 0,
    posts_count: 0,
  }));
  return respond({ forums, count: forums.length });
}

export function courseForumData(ctx: Ctx) {
  const webinarId = Number(ctx.params.id);
  const course = db.coursesById.get(webinarId);
  return respond({
    webinar: course ? { id: course.id, title: course.title } : null,
    forums: [],
    questions: { data: [], current_page: 1, last_page: 1, total: 0 },
    statistics: { questions_count: 0, answers_count: 0, resolved_count: 0 },
  });
}

export function forumAnswers(_ctx: Ctx) {
  return respond({ question: null, answers: [] });
}
