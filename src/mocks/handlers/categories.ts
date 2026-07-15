import { db } from '@/mocks/seed';
import { respond } from '@/mocks/lib/envelope';
import type { Ctx } from './types';

export function list(_ctx: Ctx) {
  return respond({ count: db.categories.length, categories: db.categories });
}

export function categoryCourses(ctx: Ctx) {
  const id = Number(ctx.params.id);
  const cat = db.categories.find((c) => c.id === id);
  const webinars = db.courses.filter((c) => c.category_id === id);
  return respond({ filters: [], webinars, _category: cat?.title });
}
