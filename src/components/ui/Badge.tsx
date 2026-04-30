import { cn } from '@/lib/utils';

export interface BadgeProps {
  variant?: 'green' | 'blue' | 'yellow' | 'red' | 'navy';
  children: React.ReactNode;
  className?: string;
}

const variants = {
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  navy: 'bg-navy text-white',
};

export function Badge({ variant = 'blue', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
