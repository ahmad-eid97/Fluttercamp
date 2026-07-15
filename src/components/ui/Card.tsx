import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({
  className,
  hover = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-border/70 bg-card text-card-foreground shadow-sm',
        hover && 'transition-all duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-lg hover:border-primary/20',
        className,
      )}
      {...props}
    />
  );
}
