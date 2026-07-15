import { db } from '@/mocks/seed';
import { txt } from '@/mocks/lib/i18n';
import { respond, error } from '@/mocks/lib/envelope';
import { laravelPaginate } from '@/mocks/lib/paginate';
import { state, withStore, persist } from '@/mocks/store/store';
import type { Ctx } from './types';

/** Apply session state (favourite / purchased / progress) onto a course copy. */
function decorate(course: any) {
  const enrolled = state.enrolled.includes(course.id);
  return {
    ...course,
    is_favorite: state.favorites.includes(course.id),
    auth: enrolled,
    auth_has_bought: enrolled ? true : null,
    progress: enrolled ? course.__progress ?? 0 : null,
  };
}

export function list(ctx: Ctx) {
  return withStore(() => {
    let items = [...db.courses];

    const cat = ctx.query.get('cat');
    if (cat) items = items.filter((c) => String(c.category_id) === cat);

    if (ctx.query.get('free') === '1') items = items.filter((c) => Number(c.price) === 0);
    if (ctx.query.get('discount') === '1') items = items.filter((c) => c.active_special_offer);
    if (ctx.query.get('downloadable') === '1') items = items.filter((c) => c.isDownloadable);

    const search = (ctx.query.get('search') || '').toLowerCase();
    if (search) items = items.filter((c) => txt(c.title).toLowerCase().includes(search) || txt(c.category).toLowerCase().includes(search));

    switch (ctx.query.get('sort')) {
      case 'expensive': items.sort((a, b) => b.price_with_discount - a.price_with_discount); break;
      case 'inexpensive': items.sort((a, b) => a.price_with_discount - b.price_with_discount); break;
      case 'bestsellers': items.sort((a, b) => b.sales.count - a.sales.count); break;
      case 'best_rates': items.sort((a, b) => b.rate - a.rate); break;
      case 'newest':
      default: items.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    }

    const page = Number(ctx.query.get('page') || 1);
    const paged = laravelPaginate(items.map(decorate), page, 12, '/courses');
    return respond(paged);
  });
}

export function detail(ctx: Ctx) {
  return withStore(() => {
    const course = db.coursesById.get(Number(ctx.params.id));
    if (!course) return error('Course not found', 404);
    return respond(decorate(course));
  });
}

export function content(ctx: Ctx) {
  const course = db.coursesById.get(Number(ctx.params.id));
  if (!course) return error('Not found', 404);

  const chapters: any[] = [];
  course.text_lesson_chapters.forEach((ch: any) => {
    chapters.push({
      type: 'text_lesson',
      id: ch.id,
      title: ch.title,
      topics_count: ch.chapter_items.length,
      created_at: ch.created_at,
      check_all_contents_pass: ch.check_all_contents_pass,
      items: ch.chapter_items.map((it: any) => ({
        can: { view: true }, can_view_error: '', auth_has_read: false, type: 'text_lesson',
        created_at: it.created_at, link: `/course/${course.id}/learning`, id: Number(it.item_id),
        title: it.text_lesson?.title || 'Lesson',
      })),
    });
  });
  course.files_chapters.forEach((ch: any) => {
    chapters.push({
      type: 'file',
      id: ch.id,
      title: ch.title,
      topics_count: ch.chapter_items.length,
      created_at: ch.created_at,
      check_all_contents_pass: ch.check_all_contents_pass,
      items: ch.chapter_items.map((it: any) => ({
        can: { view: true }, can_view_error: '', auth_has_read: false, type: 'file',
        created_at: it.created_at, link: `/course/${course.id}/learning`, id: Number(it.item_id),
        title: it.file?.title || 'File', file_type: 'pdf', storage: 'upload', volume: it.file?.volume, downloadable: '1',
      })),
    });
  });

  return respond(chapters);
}

export function quizzes(_ctx: Ctx) {
  return respond([]);
}

export function enroll(ctx: Ctx) {
  return withStore(() => {
    const id = Number(ctx.params.id);
    if (!db.coursesById.get(id)) return error('Course not found', 404);
    if (!state.enrolled.includes(id)) {
      state.enrolled.push(id);
      persist();
    }
    return respond({ enrolled: true }, 'You are now enrolled in this course!');
  });
}

export function toggleFavorite(ctx: Ctx) {
  return withStore(() => {
    const id = Number(ctx.params.id);
    const idx = state.favorites.indexOf(id);
    if (idx >= 0) state.favorites.splice(idx, 1);
    else state.favorites.push(id);
    persist();
    return respond({ is_favorite: state.favorites.includes(id) });
  });
}

export function toggleLesson(_ctx: Ctx) {
  return respond({}, 'Saved');
}

export function report(_ctx: Ctx) {
  return respond({}, 'Thank you. Your report has been submitted.');
}

export function addReview(_ctx: Ctx) {
  return respond({}, 'Your review has been submitted!');
}

export function reviewReply(_ctx: Ctx) {
  return respond({}, 'Reply added');
}

export function deleteReview(_ctx: Ctx) {
  return respond({}, 'Review deleted');
}

export function validateCertificate(ctx: Ctx) {
  return respond({ is_valid: true, certificate: null });
}
