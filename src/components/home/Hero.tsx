import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CARS } from '@/data/cars';
import { Button } from '@/components/ui/Button';
import { JourneyTracker } from '@/components/home/JourneyTracker';
import { OwnershipBar } from '@/components/fleet/OwnershipBar';
import { AvailabilityBadge } from '@/components/fleet/AvailabilityBadge';
import { RunningCar } from '@/components/layout/RunningCar';

const FEATURED_ID = 'toyota-camry-hybrid';

export function Hero() {
  const featured = CARS.find((c) => c.id === FEATURED_ID) ?? CARS[0];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 50%, #dbeafe 100%)' }}
    >
      {/* Decorative blurs */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-60 w-60 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 py-14 lg:py-20">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">

          {/* Left — text + journey tracker + CTAs */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-bold text-indigo-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-600" />
              </span>
              Victoria&apos;s #1 First-Car Program
            </div>

            {/* H1 */}
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-navy md:text-5xl xl:text-6xl">
              Your first car starts{' '}
              <em className="not-italic text-red">right here.</em>
            </h1>

            {/* Subtext */}
            <p className="mb-7 text-base leading-relaxed text-slate-600 md:text-lg">
              No credit check. No stress.{' '}
              <strong className="font-bold text-navy">Weekly payments from $179</strong>{' '}
              that go toward owning the car outright. Open to everyone in Victoria.
            </p>

            {/* Journey tracker */}
            <div className="mb-7">
              <JourneyTracker />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button href="/fleet" size="lg" className="border-0 bg-navy text-white shadow-[0_4px_16px_rgba(15,36,68,0.25)] hover:bg-navy-light">
                Browse Our Fleet
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy/20 bg-white px-7 py-3.5 text-sm font-bold text-navy transition-all hover:border-navy hover:bg-navy/5"
              >
                ▶ How It Works
              </Link>
            </div>
          </div>

          {/* Right — Featured car showcase card */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-modal lg:max-w-md">
              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-red px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                ⭐ Most Popular This Week
              </div>

              {/* Available */}
              <div className="mb-3">
                <AvailabilityBadge available={featured.isAvailable} />
              </div>

              {/* Car image */}
              <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-gradient-to-br from-sky to-sky-mid">
                <Image
                  src={featured.imageSrc}
                  alt={featured.imageAlt}
                  fill
                  className="object-contain p-3"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Name + type */}
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted">
                {featured.fuelType === 'hybrid' ? 'Hybrid Sedan' : 'Sedan'} · {featured.spec.seats} Seats
              </p>
              <h2 className="mb-2 text-xl font-bold text-navy">{featured.name}</h2>

              {/* Price */}
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-red">${featured.weeklyPrice}</span>
                <span className="text-sm text-muted">/week incl. GST</span>
              </div>

              {/* Ownership bar */}
              {featured.weeksToOwn && (
                <div className="mb-4">
                  <OwnershipBar
                    weeksToOwn={featured.weeksToOwn}
                    weeksPaid={0}
                    hintText="Weekly payments go toward full ownership"
                  />
                </div>
              )}

              {/* Specs row */}
              <div className="mb-5 grid grid-cols-3 gap-2">
                {[
                  { val: featured.spec.fuelConsumption, lbl: 'per 100km' },
                  { val: `${featured.spec.ancapRating}★`, lbl: 'ANCAP' },
                  { val: '$0', lbl: 'Credit chk' },
                ].map(({ val, lbl }) => (
                  <div key={lbl} className="rounded-lg bg-slate-50 px-2 py-2 text-center">
                    <div className="text-sm font-bold text-navy">{val}</div>
                    <div className="text-[9px] font-semibold uppercase tracking-wide text-muted">{lbl}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/contact?car=${featured.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-navy py-3 text-sm font-bold text-white transition-all hover:bg-navy-light"
              >
                Book This Car →
              </Link>

              {/* Static dot pagination */}
              <div className="mt-4 flex justify-center gap-1.5" aria-hidden="true">
                <div className="h-1.5 w-4 rounded-full bg-navy" />
                <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RunningCar — glass road animation at bottom of hero */}
      <RunningCar />
    </section>
  );
}
