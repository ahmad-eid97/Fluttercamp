import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-bold rounded-[var(--radius-md)] transition-all duration-200 ease-[var(--ease-out)] outline-none focus-visible:ring-[3px] focus-visible:ring-primary/35 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap select-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow-sm hover:shadow-brand hover:-translate-y-0.5 active:translate-y-0',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
        gold: 'bg-accent text-accent-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5',
        outline: 'border border-primary/30 text-primary bg-transparent hover:bg-primary hover:text-primary-foreground',
        ghost: 'bg-transparent text-foreground hover:bg-muted',
        soft: 'bg-primary/10 text-primary hover:bg-primary/15',
        white: 'bg-white text-primary shadow-sm hover:shadow-md hover:-translate-y-0.5',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-[0.95rem]',
        lg: 'h-13 px-8 text-base py-3.5',
        icon: 'h-11 w-11',
      },
      block: { true: 'w-full' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  icon?: string;
  iconRight?: string;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant, size, block, icon, iconRight, loading, className, children, ...rest } = props as any;
  const classes = cn(buttonVariants({ variant, size, block }), className);

  const content = (
    <>
      {loading && <Icon icon="svg-spinners:ring-resize" className="text-[1.1em]" />}
      {!loading && icon && <Icon icon={icon} className="text-[1.25em]" />}
      {children}
      {!loading && iconRight && <Icon icon={iconRight} className="text-[1.25em]" />}
    </>
  );

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={loading || rest.disabled} {...rest}>
      {content}
    </button>
  );
}

export { buttonVariants };
