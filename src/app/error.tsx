'use client';

import { Button } from '@/components/ui/Button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center section-padding">
      <p className="mb-2 text-sm font-bold uppercase tracking-widest text-red">Error</p>
      <h1 className="mb-4 text-4xl font-bold text-navy">Something went wrong</h1>
      <p className="mb-8 max-w-md text-muted">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset}>Try Again</Button>
        <Button href="/" variant="secondary">Go Home</Button>
      </div>
    </div>
  );
}
