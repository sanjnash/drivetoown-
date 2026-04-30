import type { Metadata } from 'next';
import { Heart, Users, Lightbulb, Award } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'About Us | AMY & YAS PTY LTD | DriveToOwn',
  description:
    'DriveToOwn by AMY & YAS PTY LTD — helping Victorians rent or lease to own a car for over 10 years. No credit check. Craigieburn, Melbourne VIC.',
};

const values = [
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We are transparent about every cost, term, and condition. No hidden fees, no surprises.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Every decision we make starts with what is best for our drivers and their families.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously improve our fleet, processes, and technology to serve you better.',
  },
  {
    icon: Award,
    title: 'Professionalism',
    description: 'From the first enquiry to the day you take ownership — we maintain the highest standards.',
  },
];

const locations = [
  {
    city: 'Melbourne, VIC',
    address: '33 Princes Cct, Craigieburn VIC 3064',
    phone: process.env.NEXT_PUBLIC_PHONE_MELBOURNE ?? '+61 455 445 285',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" subtitle="AMY & YAS PTY LTD — Helping Victorians drive and own for over 10 years" />

      {/* Mission */}
      <SectionWrapper background="navy">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xl font-semibold leading-relaxed text-white/90 md:text-2xl">
            &ldquo;To make getting a car simple and accessible for every Victorian — whether you want to rent or build toward full ownership.&rdquo;
          </p>
        </div>
      </SectionWrapper>

      {/* Story */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-navy md:text-4xl">Our Story</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            <p>
              Rent Plus Own has been in business for over 10 years. We started with a simple belief: that everyone deserves the chance to get behind the wheel — regardless of their credit history, visa status, or background.
            </p>
            <p>
              We offer two straightforward options: a flexible weekly rental (Flexi), or a lease-to-own plan (Flexi Own) where your weekly payments go toward owning the car outright. No credit check, no hidden requirements.
            </p>
            <p>
              Today, we operate in Melbourne, Victoria with a fleet of over a dozen 5-star ANCAP rated vehicles — and we&apos;re proud to have helped hundreds of customers get on the road.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper background="sky">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-navy">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
          {values.map((value) => (
            <Card key={value.title} hover className="p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy">
                <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-navy">{value.title}</h3>
              <p className="leading-relaxed text-muted">{value.description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Locations */}
      <SectionWrapper background="white">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-navy">Our Location</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-1 max-w-md mx-auto">
          {locations.map((loc) => (
            <Card key={loc.city} className="p-8">
              <h3 className="mb-3 text-xl font-bold text-navy">{loc.city}</h3>
              <p className="mb-1 text-muted">{loc.address}</p>
              <a href={`tel:${loc.phone}`} className="font-semibold text-navy hover:text-red transition-colors">
                {loc.phone}
              </a>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <CTABanner />
    </>
  );
}
