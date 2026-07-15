'use client';
import * as React from 'react';
import { Icon } from '@iconify/react';
import CountUp from 'react-countup';
import { cn } from '@/lib/utils';

type Props = {
  icon: string;
  label: string;
  value: number | string;
  hint?: string;
  tone?: 'primary' | 'secondary' | 'success' | 'gold';
  prefix?: string;
  suffix?: string;
  className?: string;
};

const tones: Record<NonNullable<Props['tone']>, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/12 text-secondary',
  success: 'bg-success/12 text-success',
  gold: 'bg-accent/20 text-accent-foreground',
};

export function StatCard({ icon, label, value, hint, tone = 'primary', prefix, suffix, className }: Props) {
  const numeric = typeof value === 'number' ? value : Number(String(value).replace(/[^\d.]/g, ''));
  const isNumber = !Number.isNaN(numeric) && String(value).trim() !== '';

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-[var(--radius-lg)] border border-border/70 bg-card p-6 shadow-[0_1px_2px_rgba(17,24,39,0.03)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_6px_20px_rgba(17,24,39,0.07)]',
        className,
      )}
    >
      <span className={cn('grid place-items-center w-14 h-14 rounded-[var(--radius-md)] shrink-0', tones[tone])}>
        <Icon icon={icon} className="text-2xl" />
      </span>
      <div className="min-w-0">
        <div className="text-2xl font-extrabold leading-tight text-foreground">
          {prefix}
          {isNumber ? <CountUp end={numeric} duration={1.4} separator="," /> : value}
          {suffix}
        </div>
        <div className="text-sm font-semibold text-muted-foreground truncate">{label}</div>
        {hint && <div className="text-xs text-muted-foreground/80 mt-0.5">{hint}</div>}
      </div>
    </div>
  );
}
