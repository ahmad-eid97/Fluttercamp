import { db } from '@/mocks/seed';
import { respond } from '@/mocks/lib/envelope';
import { laravelPaginate } from '@/mocks/lib/paginate';
import type { Ctx } from './types';

export function list(_ctx: Ctx) {
  return respond({ testimonials: laravelPaginate(db.testimonials, 1, 20, '/testimonials') });
}
