import type { Car } from '@/types/car';
import { CarCard } from './CarCard';
import { Button } from '@/components/ui/Button';
import { CarCardSkeleton } from '@/components/ui/Skeleton';

export interface FleetGridProps {
  cars: Car[];
  loading?: boolean;
  onClearFilters?: () => void;
}

export function FleetGrid({ cars, loading, onClearFilters }: FleetGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-20 text-center">
        <p className="mb-2 text-xl font-semibold text-navy">No cars match your filters</p>
        <p className="mb-6 text-muted">Try adjusting your filters or clear them to see all cars.</p>
        {onClearFilters && (
          <Button variant="secondary" onClick={onClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
