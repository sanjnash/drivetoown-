import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="container-custom section-padding space-y-6">
      <Skeleton className="h-12 w-1/2" />
      <Skeleton className="h-6 w-3/4" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    </div>
  );
}
