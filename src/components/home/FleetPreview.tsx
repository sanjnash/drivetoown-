import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Users, Fuel } from 'lucide-react';
import { CARS } from '@/data/cars';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Badge } from '@/components/ui/Badge';

const FEATURED_ID = 'toyota-camry-hybrid';
const PREVIEW_IDS = ['toyota-corolla', 'toyota-rav4', 'ford-mustang', 'bmw-convertible'];

export function FleetPreview() {
  const featured = CARS.find((c) => c.id === FEATURED_ID);
  const previewCars = PREVIEW_IDS.map((id) => CARS.find((c) => c.id === id)).filter(Boolean);

  return (
    <SectionWrapper background="white">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-red">Our Fleet</p>
        <h2 className="text-3xl font-bold text-navy md:text-4xl">Cars Built for Every Driver</h2>
        <p className="mt-4 text-lg text-muted">12 cars available. Rent or lease to own. All 5-star ANCAP rated.</p>
      </div>

      {/* Featured Car — large showcase */}
      {featured && (
        <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-light shadow-modal">
          <div className="grid grid-cols-1 items-center lg:grid-cols-2">
            {/* Car image */}
            <div className="relative flex items-center justify-center p-8 lg:p-12">
              <div className="absolute inset-0 bg-red/10 blur-3xl" aria-hidden="true" />
              <Image
                src={featured.imageSrc}
                alt={featured.imageAlt}
                width={600}
                height={380}
                className="relative z-10 w-full max-w-md drop-shadow-2xl lg:max-w-full"
              />
              <div className="absolute right-6 top-6">
                <Badge variant="navy" className="bg-red text-white">Most Popular</Badge>
              </div>
            </div>

            {/* Car details */}
            <div className="p-8 lg:p-12">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-white/50">Featured Car</p>
              <h3 className="mb-2 text-3xl font-extrabold text-white">{featured.name}</h3>
              <p className="mb-6 text-5xl font-extrabold text-red">
                ${featured.weeklyPrice}
                <span className="text-xl font-semibold text-white/60">/wk</span>
              </p>

              {/* Specs */}
              <div className="mb-6 flex flex-wrap gap-4 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-red" aria-hidden="true" />
                  {featured.spec.seats} seats
                </span>
                <span className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-red" aria-hidden="true" />
                  {featured.spec.fuelConsumption}
                </span>
                <span className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </span>
              </div>

              <p className="mb-8 text-base leading-relaxed text-white/70">{featured.shortDescription}</p>

              {/* Equipped */}
              <ul className="mb-8 space-y-2">
                {featured.equipped.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={`/contact?car=${featured.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-red px-8 py-4 font-semibold text-white transition-all hover:bg-red-hover"
              >
                Enquire About This Car
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid of other cars */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {previewCars.map((car) =>
          car ? (
            <Link
              key={car.id}
              href={`/contact?car=${car.id}`}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative h-36 overflow-hidden bg-slate-50">
                <Image
                  src={car.imageSrc}
                  alt={car.imageAlt}
                  fill
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-navy">{car.name}</p>
                <p className="text-lg font-extrabold text-red">
                  ${car.weeklyPrice}
                  <span className="text-xs font-semibold text-muted">/wk</span>
                </p>
              </div>
            </Link>
          ) : null
        )}
      </div>

      {/* View all */}
      <div className="mt-10 text-center">
        <Link
          href="/fleet"
          className="inline-flex items-center gap-2 rounded-full border-2 border-navy px-8 py-4 font-semibold text-navy transition-all hover:bg-navy hover:text-white"
        >
          View All {CARS.length} Cars
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
