import { faker } from '@faker-js/faker';

/**
 * Deterministic faker instance.
 *
 * The whole mock dataset (`db`) is built once, in a fixed order, immediately
 * after re-seeding. Because faker is a singleton driven by a seeded PRNG, the
 * exact same graph is produced on every server render and on the client — which
 * is essential: a course's instructor, a track's courses, etc. must be identical
 * across the server/client boundary or hydration would mismatch.
 */
export const SEED = 20260601;

/**
 * Fixed "now" timestamp (ms). The mock DB is built on BOTH the server and the
 * client; using the real Date.now()/new Date() would produce different values in
 * each, causing React hydration mismatches. This constant keeps every mock
 * timestamp identical across the SSR/CSR boundary.
 */
export const NOW = 1751328000000; // 2025-07-01T00:00:00Z

export function reseed() {
  faker.seed(SEED);
}

export { faker };

/** Deterministic pick from an array by index (wraps around). */
export function pick<T>(arr: T[], i: number): T {
  return arr[((i % arr.length) + arr.length) % arr.length];
}

/** Deterministic pseudo-random integer in [min, max] from a numeric key. */
export function hashInt(key: number, min: number, max: number): number {
  const x = Math.sin(key * 999.13) * 10000;
  const frac = x - Math.floor(x);
  return min + Math.floor(frac * (max - min + 1));
}
