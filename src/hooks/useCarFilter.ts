'use client';
import { useState, useMemo } from 'react';
import type { Car, CarType } from '@/types/car';

type PriceRange = 'all' | 'under-200' | '200-250' | '250-300' | 'over-300';
type SeatFilter = 'all' | '5' | '7';

interface FilterState {
  price: PriceRange;
  type: CarType | 'all';
  seats: SeatFilter;
}

export function useCarFilter(cars: Car[]) {
  const [filters, setFilters] = useState<FilterState>({
    price: 'all',
    type: 'all',
    seats: 'all',
  });

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Price filter
      if (filters.price !== 'all') {
        const p = car.weeklyPrice;
        if (filters.price === 'under-200' && p >= 200) return false;
        if (filters.price === '200-250' && (p < 200 || p > 250)) return false;
        if (filters.price === '250-300' && (p < 250 || p > 300)) return false;
        if (filters.price === 'over-300' && p <= 300) return false;
      }
      // Type filter
      if (filters.type !== 'all' && car.type !== filters.type) return false;
      // Seats filter
      if (filters.seats !== 'all' && car.spec.seats !== Number(filters.seats)) return false;
      return true;
    });
  }, [cars, filters]);

  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ price: 'all', type: 'all', seats: 'all' });
  };

  const isFiltered = filters.price !== 'all' || filters.type !== 'all' || filters.seats !== 'all';

  return { filteredCars, filters, setFilter, clearFilters, isFiltered, resultCount: filteredCars.length };
}
