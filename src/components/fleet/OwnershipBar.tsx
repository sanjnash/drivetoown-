export interface OwnershipBarProps {
  weeksToOwn: number;
  weeksPaid?: number;
  hintText?: string;
}

export function OwnershipBar({ weeksToOwn, weeksPaid = 0, hintText }: OwnershipBarProps) {
  const pct = weeksToOwn > 0 ? Math.min((weeksPaid / weeksToOwn) * 100, 100) : 0;

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-slate-600">🏁 Path to ownership</span>
        <span className="text-[10px] font-bold text-navy">{weeksToOwn} wks</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-navy to-indigo-600"
          style={{
            width: `${pct}%`,
            transition: 'width 1.5s ease',
          }}
        />
      </div>
      {hintText && (
        <p className="mt-1.5 text-[10px] leading-tight text-muted">{hintText}</p>
      )}
    </div>
  );
}
