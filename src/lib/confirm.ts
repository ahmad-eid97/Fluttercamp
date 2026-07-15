// Lightweight, framework-agnostic imperative confirm/alert API.
// Replaces SweetAlert2 — the call sites keep the same shape:
//   const result = await confirmDialog({ icon, title, ... });
//   if (result.isConfirmed) { ... }
// The actual UI is rendered by <ConfirmDialogHost /> (mounted once in the
// root layout), which registers a handler here on mount.

export type ConfirmIcon = 'question' | 'warning' | 'error' | 'success' | 'info';

export interface ConfirmOptions {
  /** Visual tone of the leading icon chip. */
  icon?: ConfirmIcon;
  title?: string;
  /** Optional supporting line under the title (plain text). */
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  /** Defaults to true — set false for an acknowledge-only dialog. */
  showCancelButton?: boolean;
  /** Force the confirm button colour. Inferred from `icon` when omitted. */
  tone?: 'brand' | 'danger' | 'success';
}

export interface ConfirmResult {
  isConfirmed: boolean;
  isDismissed: boolean;
}

type Handler = (opts: ConfirmOptions) => Promise<ConfirmResult>;

let handler: Handler | null = null;

/** Registered by <ConfirmDialogHost />. Internal use only. */
export function _setConfirmHandler(next: Handler | null) {
  handler = next;
}

/**
 * Open the branded confirm dialog and resolve with the user's choice.
 * Falls back to the native `window.confirm` if the host isn't mounted yet.
 */
export function confirmDialog(opts: ConfirmOptions = {}): Promise<ConfirmResult> {
  if (handler) return handler(opts);

  if (typeof window !== 'undefined') {
    const ok = window.confirm(opts.title || opts.text || 'Are you sure?');
    return Promise.resolve({ isConfirmed: ok, isDismissed: !ok });
  }
  return Promise.resolve({ isConfirmed: false, isDismissed: true });
}
