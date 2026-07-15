import * as React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  eyebrowIcon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'start' | 'center';
  className?: string;
};

export function SectionHeading({ eyebrow, eyebrowIcon, title, description, align = 'center', className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 max-w-2xl',
        align === 'center' ? 'items-center !text-center mx-auto' : 'items-start !text-start',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-primary/10 px-3.5 py-1.5 text-sm font-bold text-primary">
          {eyebrowIcon && <Icon icon={eyebrowIcon} className="text-base" />}
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'text-[clamp(1.6rem,1.2rem+1.4vw,2.25rem)] font-extrabold leading-tight text-foreground',
          align === 'center' ? '!text-center' : '!text-start',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('text-lead text-muted-foreground', align === 'center' ? '!text-center' : '!text-start')}>
          {description}
        </p>
      )}
    </div>
  );
}
