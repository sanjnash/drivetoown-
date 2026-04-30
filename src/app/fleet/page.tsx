'use client';

import { CARS } from '@/data/cars';
import { useCarFilter } from '@/hooks/useCarFilter';
import { CarFilter } from '@/components/fleet/CarFilter';
import { FleetGrid } from '@/components/fleet/FleetGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { CTABanner } from '@/components/home/CTABanner';

export default function FleetPage() {
  const { filteredCars, filters, setFilter, clearFilters, isFiltered, resultCount } =
    useCarFilter(CARS);

  return (
    <>
      <PageHeader title="Our Fleet" subtitle="From $199/wk · All 5-star ANCAP rated · Rent or Lease to Own" />

      <div className="bg-sky section-padding">
        <div className="container-custom space-y-8">
          <CarFilter
            filters={filters as Parameters<typeof CarFilter>[0]['filters']}
            onFilter={setFilter}
            onClear={clearFilters}
            isFiltered={isFiltered}
            resultCount={resultCount}
          />
          <FleetGrid cars={filteredCars} onClearFilters={clearFilters} />
        </div>
      </div>

      <CTABanner />
    </>
  );
}
