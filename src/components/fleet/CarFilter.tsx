'use client';

import { cn } from '@/lib/utils';

type PriceRange = 'all' | 'under-200' | '200-250' | '250-300' | 'over-300';
type CarTypeFilter = 'all' | 'sedan' | 'suv' | 'hybrid' | 'hatchback';
type SeatFilter = 'all' | '5' | '7';

interface Filters {
  price: PriceRange;
  type: CarTypeFilter;
  seats: SeatFilter;
}

export interface CarFilterProps {
  filters: Filters;
  onFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onClear: () => void;
  isFiltered: boolean;
  resultCount: number;
}

function FilterPills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-150',
            value === opt.value
              ? 'border-navy bg-navy text-white'
              : 'border-border bg-white text-text hover:border-navy hover:text-navy'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const priceOptions = [
  { value: 'all' as PriceRange, label: 'All Prices' },
  { value: 'under-200' as PriceRange, label: 'Under $200' },
  { value: '200-250' as PriceRange, label: '$200–$250' },
  { value: '250-300' as PriceRange, label: '$250–$300' },
  { value: 'over-300' as PriceRange, label: 'Over $300' },
];

const typeOptions = [
  { value: 'all' as CarTypeFilter, label: 'All Types' },
  { value: 'sedan' as CarTypeFilter, label: 'Sedan' },
  { value: 'suv' as CarTypeFilter, label: 'SUV' },
  { value: 'hybrid' as CarTypeFilter, label: 'Hybrid' },
  { value: 'hatchback' as CarTypeFilter, label: 'Hatchback' },
];

const seatOptions = [
  { value: 'all' as SeatFilter, label: 'All Seats' },
  { value: '5' as SeatFilter, label: '5 Seats' },
  { value: '7' as SeatFilter, label: '7 Seats' },
];

export function CarFilter({ filters, onFilter, onClear, isFiltered, resultCount }: CarFilterProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Price Range</p>
          <FilterPills
            options={priceOptions}
            value={filters.price}
            onChange={(v) => onFilter('price', v)}
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Car Type</p>
          <FilterPills
            options={typeOptions}
            value={filters.type as CarTypeFilter}
            onChange={(v) => onFilter('type', v)}
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Seats</p>
          <FilterPills
            options={seatOptions}
            value={filters.seats}
            onChange={(v) => onFilter('seats', v)}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <p className="text-sm text-muted">
          Showing <span className="font-semibold text-navy">{resultCount}</span> cars
        </p>
        {isFiltered && (
          <button
            onClick={onClear}
            className="text-sm font-semibold text-red hover:text-red-hover transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
