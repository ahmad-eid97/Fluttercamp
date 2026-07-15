/**
 * Image helpers. Everything returns an absolute https URL so the app's
 * `getImageUrl()` passes them through untouched (it short-circuits on http/https),
 * and Next/Image accepts them via the hosts allow-listed in next.config.mjs.
 *
 * - Avatars  → DiceBear (deterministic per seed, free, no auth)
 * - Covers   → Picsum   (deterministic per seed, free, no auth)
 */

const DICEBEAR = 'https://api.dicebear.com/9.x';

/** Stable hash of a seed string → 1..max. */
function hashTo(seed: string | number, max: number): number {
  const s = String(seed);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return (h % max) + 1;
}

/** Real human portrait photos (deterministic per seed) — not cartoon avatars. */
export function avatar(seed: string | number): string {
  return `https://i.pravatar.cc/300?img=${hashTo(seed, 70)}`;
}

/** Square-ish course/card thumbnail. */
export function courseImage(id: number | string): string {
  return `https://picsum.photos/seed/fluttercamp-c${id}/640/420`;
}

/** Wide hero/cover image. */
export function coverImage(id: number | string): string {
  return `https://picsum.photos/seed/fluttercamp-cover${id}/1280/640`;
}

/** Blog/article cover. */
export function blogImage(id: number | string): string {
  return `https://picsum.photos/seed/fluttercamp-blog${id}/960/560`;
}

/** Badge / achievement icon. */
export function badgeImage(id: number | string): string {
  return `${DICEBEAR}/shapes/svg?seed=badge-${id}&backgroundColor=f2b24e,1671b2`;
}
