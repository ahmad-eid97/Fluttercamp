import * as React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

type Props = {
  icon?: string;
  /** Optional branded SVG illustration (path under /public). Overrides `icon`. */
  illustration?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ icon = 'solar:inbox-line-duotone', illustration, title, description, action, className }: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 px-6 text-center', className)}>
      {illustration ? (
        <img src={illustration} alt="" aria-hidden className="w-48 max-w-[72%] h-auto mb-1" />
      ) : (
        <span className="grid place-items-center w-20 h-20 rounded-full bg-primary/8 text-primary">
          <Icon icon={icon} className="text-4xl" />
        </span>
      )}
      <h3 className="text-lg font-bold text-foreground mt-1">{title}</h3>
      {description && <p className="text-muted-foreground max-w-sm">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
