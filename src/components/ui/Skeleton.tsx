import { cn } from '@/lib/utils';

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-lg bg-slate-200', className)} />;
}

export function CarCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="mb-4 h-8 w-1/3" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-6 h-4 w-2/3" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
