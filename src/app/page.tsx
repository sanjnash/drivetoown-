import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { StatsBar } from '@/components/home/StatsBar';
import { FleetShowcase } from '@/components/home/FleetShowcase';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Drive Today, Own Tomorrow — Car Rental & Lease to Own in Melbourne',
  description:
    'Rent or lease to own a car in Melbourne, Victoria. No credit check. Weekly payments from $179. Open to everyone. AMY & YAS PTY LTD.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FleetShowcase />
      <HowItWorksSection />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />

      {/* JSON-LD: LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AutoDealer',
            name: 'DriveToOwn',
            description: 'Rent or lease to own a car in Melbourne, Victoria. No credit check required.',
            url: process.env.NEXT_PUBLIC_SITE_URL,
            telephone: process.env.NEXT_PUBLIC_PHONE_MELBOURNE,
            email: process.env.NEXT_PUBLIC_EMAIL,
            legalName: 'AMY & YAS PTY LTD',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '33 Princes Cct',
              addressLocality: 'Craigieburn',
              addressRegion: 'VIC',
              postalCode: '3064',
              addressCountry: 'AU',
            },
            areaServed: ['Melbourne VIC'],
            priceRange: '$179-$449/wk',
          }),
        }}
      />
    </>
  );
}
