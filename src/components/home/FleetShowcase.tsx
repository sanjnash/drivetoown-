'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CARS } from '@/data/cars';
import type { Car } from '@/types/car';
import { CarCard } from '@/components/fleet/CarCard';
import { cn } from '@/lib/utils';

type FilterKey = 'all' | 'sedan' | 'suv' | 'hybrid' | 'budget';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all',    label: 'All Cars' },
  { key: 'sedan',  label: 'Sedans' },
  { key: 'suv',    label: 'SUVs' },
  { key: 'hybrid', label: 'Hybrids 🌿' },
  { key: 'budget', label: 'Under $200' },
];

function filterCars(cars: Car[], filter: FilterKey): Car[] {
  switch (filter) {
    case 'sedan':  return cars.filter((c) => c.type === 'sedan');
    case 'suv':    return cars.filter((c) => c.type === 'suv');
    case 'hybrid': return cars.filter((c) => c.fuelType === 'hybrid' || c.fuelType === 'plugin-hybrid');
    case 'budget': return cars.filter((c) => c.weeklyPrice < 200);
    default:       return cars;
  }
}

const SORTED_CARS = [...CARS].sort((a, b) => {
  if (a.isPopular && !b.isPopular) return -1;
  if (!a.isPopular && b.isPopular) return 1;
  return a.weeklyPrice - b.weeklyPrice;
});

const HOMEPAGE_LIMIT = 6;

export function FleetShowcase() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filtered = filterCars(SORTED_CARS, activeFilter).slice(0, HOMEPAGE_LIMIT);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-red">Our Fleet</span>
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Pick your car. Start your journey.
          </h2>
          <p className="mt-3 text-base text-muted">
            Every car includes GPS, 5-star ANCAP safety, and a clear path to ownership.
            <br className="hidden md:block" />
            No credit check. No hidden fees.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                'rounded-full border-[1.5px] px-5 py-2 text-sm font-bold transition-all duration-200',
                activeFilter === f.key
                  ? 'border-navy bg-navy text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-navy hover:text-navy'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Car grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-muted">
            No cars match this filter.{' '}
            <button onClick={() => setActiveFilter('all')} className="font-bold text-navy underline">
              View all cars
            </button>
          </p>
        )}

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 rounded-full border-2 border-navy px-8 py-3.5 text-sm font-bold text-navy transition-all hover:bg-navy hover:text-white"
          >
            View All {CARS.length} Cars
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
