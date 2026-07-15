/** Laravel-style paginator: `{ current_page, data, last_page, ... }`. */
export function laravelPaginate<T>(items: T[], page = 1, perPage = 12, path = '/api') {
  const total = items.length;
  const last_page = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page || 1), last_page);
  const start = (current - 1) * perPage;
  const data = items.slice(start, start + perPage);
  const from = total === 0 ? 0 : start + 1;
  const to = total === 0 ? 0 : from + data.length - 1;
  const url = (p: number) => `${path}?page=${p}`;
  return {
    current_page: current,
    data,
    first_page_url: url(1),
    from,
    last_page,
    last_page_url: url(last_page),
    next_page_url: current < last_page ? url(current + 1) : null,
    path,
    per_page: perPage,
    prev_page_url: current > 1 ? url(current - 1) : null,
    to,
    total,
  };
}

/** `{ data, links, meta }` paginator (used by bundles / forums). */
export function metaPaginate<T>(items: T[], page = 1, perPage = 12, path = '/api') {
  const total = items.length;
  const last_page = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page || 1), last_page);
  const start = (current - 1) * perPage;
  const data = items.slice(start, start + perPage);
  const from = total === 0 ? 0 : start + 1;
  const to = total === 0 ? 0 : from + data.length - 1;
  const url = (p: number) => `${path}?page=${p}`;
  return {
    data,
    links: {
      first: url(1),
      last: url(last_page),
      prev: current > 1 ? url(current - 1) : null,
      next: current < last_page ? url(current + 1) : null,
    },
    meta: { current_page: current, from, last_page, path, per_page: perPage, to, total },
  };
}
