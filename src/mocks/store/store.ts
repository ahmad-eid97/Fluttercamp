/**
 * Mutable, session-scoped state layered on top of the immutable seed (`db`).
 *
 * On the client this is mirrored to localStorage (see persist.ts) so the cart,
 * enrollments and favourites survive navigation and reloads. On the server it is
 * ephemeral per-request (the seed baseline) — which is invisible in practice
 * because every mutation (add to cart, enroll, favourite) is triggered from
 * client components and rendered after hydration.
 */

const isClient = typeof window !== 'undefined';

export interface MockState {
  cartItems: any[];
  enrolled: number[];
  favorites: number[];
  following: number[];
  hydrated: boolean;
}

export const state: MockState = {
  cartItems: [],
  enrolled: [],
  favorites: [],
  following: [],
  hydrated: false,
};

const KEY = 'fluttercamp.mock.state';

export function hydrate() {
  if (!isClient || state.hydrated) return;
  state.hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.cartItems = parsed.cartItems ?? [];
      state.enrolled = parsed.enrolled ?? [];
      state.favorites = parsed.favorites ?? [];
      state.following = parsed.following ?? [];
    }
  } catch {
    /* ignore corrupt storage */
  }
}

export function persist() {
  if (!isClient) return;
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({
        cartItems: state.cartItems,
        enrolled: state.enrolled,
        favorites: state.favorites,
        following: state.following,
      }),
    );
  } catch {
    /* ignore quota errors */
  }
}

export function resetState() {
  state.cartItems = [];
  state.enrolled = [];
  state.favorites = [];
  state.following = [];
  persist();
}

/** Ensure the store is hydrated before any handler reads it (client only). */
export function withStore<T>(fn: () => T): T {
  hydrate();
  return fn();
}
