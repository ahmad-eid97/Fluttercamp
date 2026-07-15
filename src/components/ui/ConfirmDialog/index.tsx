'use client';
import * as React from 'react';
import { Icon } from '@iconify/react';
import { _setConfirmHandler, type ConfirmOptions, type ConfirmResult } from '@/lib/confirm';
import cls from './confirm.module.scss';

type Tone = 'brand' | 'danger' | 'success';

type Pending = {
  opts: ConfirmOptions;
  resolve: (r: ConfirmResult) => void;
};

const ICON_FOR: Record<string, string> = {
  question: 'solar:question-circle-bold-duotone',
  warning: 'solar:danger-triangle-bold-duotone',
  error: 'solar:close-circle-bold-duotone',
  success: 'solar:check-circle-bold-duotone',
  info: 'solar:info-circle-bold-duotone',
};

const TONE_FOR: Record<string, Tone> = {
  question: 'brand',
  warning: 'danger',
  error: 'danger',
  success: 'success',
  info: 'brand',
};

/**
 * Mounted once in the root layout. Renders the branded confirm dialog and
 * registers the imperative handler consumed by `confirmDialog()`.
 */
export default function ConfirmDialogHost() {
  const [pending, setPending] = React.useState<Pending | null>(null);
  const confirmBtnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    _setConfirmHandler(
      (opts) => new Promise<ConfirmResult>((resolve) => setPending({ opts, resolve })),
    );
    return () => _setConfirmHandler(null);
  }, []);

  const close = React.useCallback(
    (isConfirmed: boolean) => {
      setPending((cur) => {
        cur?.resolve({ isConfirmed, isDismissed: !isConfirmed });
        return null;
      });
    },
    [],
  );

  // Lock scroll + focus + Escape handling while open.
  React.useEffect(() => {
    if (!pending) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const id = window.requestAnimationFrame(() => confirmBtnRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(id);
      window.removeEventListener('keydown', onKey);
    };
  }, [pending, close]);

  if (!pending) return null;

  const { opts } = pending;
  const icon = opts.icon ?? 'question';
  const tone: Tone = opts.tone ?? TONE_FOR[icon] ?? 'brand';
  const showCancel = opts.showCancelButton ?? true;

  return (
    <div className={cls.overlay} onMouseDown={(e) => e.target === e.currentTarget && close(false)}>
      <div
        className={cls.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <span className={`${cls.iconChip} ${cls[tone]}`}>
          <Icon icon={ICON_FOR[icon] ?? ICON_FOR.question} />
        </span>

        {opts.title && (
          <h3 id="confirm-title" className={cls.title}>
            {opts.title}
          </h3>
        )}
        {opts.text && <p className={cls.text}>{opts.text}</p>}

        <div className={cls.actions}>
          {showCancel && (
            <button type="button" className={cls.cancelBtn} onClick={() => close(false)}>
              {opts.cancelButtonText ?? 'Cancel'}
            </button>
          )}
          <button
            ref={confirmBtnRef}
            type="button"
            className={`${cls.confirmBtn} ${cls[tone]}`}
            onClick={() => close(true)}
          >
            {opts.confirmButtonText ?? 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}
