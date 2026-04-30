import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn('bg-navy py-16 text-white md:py-20', className)}>
      <div className="container-custom">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-white/80 md:text-xl">{subtitle}</p>}
      </div>
    </div>
  );
}
