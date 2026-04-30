import Image from 'next/image';
import Link from 'next/link';
import { Fuel, Star } from 'lucide-react';
import type { Car } from '@/types/car';
import { OwnershipBar } from '@/components/fleet/OwnershipBar';
import { AvailabilityBadge } from '@/components/fleet/AvailabilityBadge';
import { cn } from '@/lib/utils';

export interface CarCardProps {
  car: Car;
}

const TYPE_LABELS: Record<string, string> = {
  sedan:      'Sedan',
  suv:        'SUV',
  hatchback:  'Hatchback',
  hybrid:     'Hybrid Sedan',
  wagon:      'Wagon',
  van:        'Van',
  convertible: 'Convertible',
  luxury:     'Luxury Sedan',
};

export function CarCard({ car }: CarCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border-[1.5px] border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-navy hover:shadow-card-hover">
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        <AvailabilityBadge available={car.isAvailable} />
        {car.isPopular && (
          <span className="inline-flex rounded-full bg-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Most Popular
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-sky to-sky-mid">
        <Image
          src={car.imageSrc}
          alt={car.imageAlt}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Name + type */}
        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted">
          {TYPE_LABELS[car.type] ?? car.type} · {car.spec.seats} Seats
        </p>
        <h3 className="mb-2 text-lg font-bold text-navy">{car.name}</h3>

        {/* Price */}
        <div className="mb-3 flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-red">${car.weeklyPrice}</span>
          <span className="text-sm font-medium text-muted">/week incl. GST</span>
        </div>

        {/* Specs row */}
        <div className="mb-3 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" aria-hidden="true" />
            {car.spec.fuelConsumption}
          </span>
          <span className="flex items-center gap-0.5" aria-label="5-star ANCAP safety rating">
            {Array.from({ length: car.spec.ancapRating }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            ))}
          </span>
        </div>

        {/* Ownership bar */}
        {car.weeksToOwn && (
          <div className="mb-4">
            <OwnershipBar
              weeksToOwn={car.weeksToOwn}
              weeksPaid={0}
              hintText={car.shortDescription}
            />
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/contact?car=${car.id}`}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white transition-all duration-200',
            car.isPopular
              ? 'bg-gradient-to-r from-red to-red-hover hover:opacity-90'
              : 'bg-navy hover:bg-navy-light'
          )}
        >
          Book This Car →
        </Link>
      </div>
    </article>
  );
}
