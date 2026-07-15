import { db } from '@/mocks/seed';
import { txt } from '@/mocks/lib/i18n';
import { respond, error } from '@/mocks/lib/envelope';
import { metaPaginate } from '@/mocks/lib/paginate';
import type { Ctx } from './types';

export function list(ctx: Ctx) {
  let items = [...db.bundles];
  const search = (ctx.query.get('search') || '').toLowerCase();
  if (search) items = items.filter((b) => txt(b.title).toLowerCase().includes(search));

  switch (ctx.query.get('sort')) {
    case 'expensive': items.sort((a, b) => Number(b.price) - Number(a.price)); break;
    case 'inexpensive': items.sort((a, b) => Number(a.price) - Number(b.price)); break;
    case 'best_rates': items.sort((a, b) => b.rate - a.rate); break;
    default: break;
  }

  const page = Number(ctx.query.get('page') || 1);
  return respond({ bundles: metaPaginate(items, page, 9, '/bundles') });
}

export function detail(ctx: Ctx) {
  const bundle = db.bundlesById.get(Number(ctx.params.id));
  if (!bundle) return error('Track not found', 404);
  // Expose the full instructor object for the detail page.
  const teacher = db.usersById.get(bundle.teacher.id) || bundle.teacher;
  return respond({ bundle: { ...bundle, teacher } });
}

export function webinars(ctx: Ctx) {
  const id = Number(ctx.params.id);
  const ids = db.bundleCourseIds.get(id) || [];
  const courses = ids.map((cid) => db.coursesById.get(cid)).filter(Boolean);
  return respond({ webinars: courses });
}
