import { db } from '@/mocks/seed';
import { txt } from '@/mocks/lib/i18n';
import { respond, error } from '@/mocks/lib/envelope';
import { laravelPaginate } from '@/mocks/lib/paginate';
import type { Ctx } from './types';

export function list(ctx: Ctx) {
  let items = [...db.articles];
  const search = (ctx.query.get('search') || '').toLowerCase();
  if (search) items = items.filter((a) => txt(a.title).toLowerCase().includes(search));
  const page = Number(ctx.query.get('page') || 1);
  return respond(laravelPaginate(items, page, 9, '/blogs'));
}

export function categories(_ctx: Ctx) {
  const seen = new Set<string>();
  const cats: { id: number; title: string }[] = [];
  db.articles.forEach((a, i) => {
    if (!seen.has(a.category)) {
      seen.add(a.category);
      cats.push({ id: i + 1, title: a.category });
    }
  });
  return respond(cats);
}

export function detail(ctx: Ctx) {
  const blog = db.articlesById.get(Number(ctx.params.id));
  if (!blog) return error('Article not found', 404);
  return respond({ blog });
}
