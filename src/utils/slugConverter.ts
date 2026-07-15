export function convertToSlug(title: string) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-');

  return slug;
}

export function convertToNormalString(slug: string) {
  const normalString = slug
    .replace(/-/g, ' ')

  return normalString;
}