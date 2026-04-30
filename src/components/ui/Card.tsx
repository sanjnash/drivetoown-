import { cn } from '@/lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white shadow-card',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover',
        className
      )}
    >
      {children}
    </div>
  );
}
