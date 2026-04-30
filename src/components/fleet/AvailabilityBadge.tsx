export interface AvailabilityBadgeProps {
  available?: boolean;
}

export function AvailabilityBadge({ available = true }: AvailabilityBadgeProps) {
  if (!available) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
      </span>
      Available Now
    </span>
  );
}
