import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center section-padding">
      <p className="mb-2 text-sm font-bold uppercase tracking-widest text-red">404</p>
      <h1 className="mb-4 text-4xl font-bold text-navy">Page Not Found</h1>
      <p className="mb-8 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on the road.
      </p>
      <div className="flex gap-4">
        <Button href="/">Go Home</Button>
        <Button href="/fleet" variant="secondary">Browse Fleet</Button>
      </div>
    </div>
  );
}
