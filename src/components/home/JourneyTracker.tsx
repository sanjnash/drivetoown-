import { cn } from '@/lib/utils';

interface JourneyStep {
  label: string;
  status: 'done' | 'active' | 'upcoming';
  icon: string;
}

const STEPS: JourneyStep[] = [
  { label: 'Apply',         status: 'done',     icon: '✓' },
  { label: 'Pick Your Car', status: 'active',   icon: '🚗' },
  { label: 'Drive',         status: 'upcoming', icon: '▶' },
  { label: 'Own It',        status: 'upcoming', icon: '🔑' },
];

export function JourneyTracker() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted">
        Your ownership journey
      </p>
      <div className="flex items-center">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {/* Left connector */}
              {i > 0 && (
                <div
                  className={cn(
                    'h-0.5 flex-1',
                    STEPS[i - 1].status === 'done' ? 'bg-green-400' : 'bg-slate-200'
                  )}
                />
              )}
              {/* Circle */}
              <div
                className={cn(
                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  step.status === 'done'     && 'bg-green-500 text-white',
                  step.status === 'active'   && 'bg-navy text-white ring-4 ring-navy/20',
                  step.status === 'upcoming' && 'bg-slate-100 text-slate-400'
                )}
              >
                {step.icon}
              </div>
              {/* Right connector */}
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1',
                    step.status === 'done' ? 'bg-green-400' : 'bg-slate-200'
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                'mt-1.5 text-center text-[10px]',
                step.status === 'active' ? 'font-bold text-navy' : 'font-medium text-muted'
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
