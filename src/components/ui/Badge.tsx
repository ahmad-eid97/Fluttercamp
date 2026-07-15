import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-bold rounded-[var(--radius-pill)] leading-none whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/12 text-secondary',
        gold: 'bg-accent/20 text-accent-foreground',
        success: 'bg-success/12 text-success',
        muted: 'bg-muted text-muted-foreground',
        solid: 'bg-primary text-primary-foreground',
        live: 'bg-secondary text-white',
        glass: 'bg-white/85 text-primary backdrop-blur-sm shadow-sm',
      },
      size: {
        sm: 'text-[11px] px-2.5 py-1',
        md: 'text-xs px-3 py-1.5',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export function Badge({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants> & { icon?: string }) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <Icon icon={icon} className="text-[1.15em]" />}
      {children}
    </span>
  );
}
