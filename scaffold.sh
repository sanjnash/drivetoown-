#!/usr/bin/env bash
# ============================================================
# DriveToOwn — Project Scaffold Script
# Run this AFTER: npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
# Usage: bash scaffold.sh
# ============================================================

set -e

echo ""
echo "🚗  DriveToOwn — Creating project folder structure..."
echo ""

# ─────────────────────────────────────────────
# PUBLIC ASSETS
# ─────────────────────────────────────────────
mkdir -p public/images/cars
mkdir -p public/images/hero
mkdir -p public/images/team
mkdir -p public/images/logos

# Placeholder for car images (replace with real WebP photos)
for car in camry camry-hybrid corolla corolla-hybrid kia-cerato i30 honda-civic prius prius-v outlander honda-city rav4 rav4-hybrid; do
  touch "public/images/cars/${car}.webp"
done

touch public/images/hero/hero-car.webp
touch public/images/logos/logo.svg
touch public/images/logos/logo-white.svg
touch public/images/logos/logo-icon.svg
touch public/og-image.jpg

echo "  ✓ public/ structure created"

# ─────────────────────────────────────────────
# APP ROUTER PAGES
# ─────────────────────────────────────────────
mkdir -p src/app/fleet
mkdir -p src/app/how-it-works
mkdir -p src/app/faq
mkdir -p src/app/about
mkdir -p src/app/contact
mkdir -p src/app/quote
mkdir -p src/app/blog/'[slug]'
mkdir -p src/app/portal/contract
mkdir -p src/app/portal/payments
mkdir -p src/app/portal/support
mkdir -p src/app/admin/fleet
mkdir -p src/app/admin/leads
mkdir -p src/app/admin/contracts
mkdir -p src/app/api/contact
mkdir -p src/app/api/quote
mkdir -p src/app/api/leads
mkdir -p src/app/api/revalidate
mkdir -p src/app/login
mkdir -p src/app/reset-password
mkdir -p src/app/update-password

# Page files
touch src/app/fleet/page.tsx
touch src/app/how-it-works/page.tsx
touch src/app/faq/page.tsx
touch src/app/about/page.tsx
touch src/app/contact/page.tsx
touch src/app/quote/page.tsx
touch src/app/blog/page.tsx
touch src/app/blog/layout.tsx
touch src/app/blog/'[slug]'/page.tsx
touch src/app/portal/layout.tsx
touch src/app/portal/page.tsx
touch src/app/portal/contract/page.tsx
touch src/app/portal/payments/page.tsx
touch src/app/portal/support/page.tsx
touch src/app/admin/layout.tsx
touch src/app/admin/page.tsx
touch src/app/admin/fleet/page.tsx
touch src/app/admin/leads/page.tsx
touch src/app/admin/contracts/page.tsx
touch src/app/api/contact/route.ts
touch src/app/api/quote/route.ts
touch src/app/api/leads/route.ts
touch src/app/api/revalidate/route.ts
touch src/app/not-found.tsx
touch src/app/error.tsx
touch src/app/loading.tsx
touch src/app/sitemap.ts
touch src/app/robots.ts
touch src/app/login/page.tsx
touch src/app/reset-password/page.tsx
touch src/app/update-password/page.tsx

echo "  ✓ src/app/ pages created"

# ─────────────────────────────────────────────
# COMPONENTS
# ─────────────────────────────────────────────
mkdir -p src/components/layout
mkdir -p src/components/home
mkdir -p src/components/fleet
mkdir -p src/components/contact
mkdir -p src/components/quote
mkdir -p src/components/blog
mkdir -p src/components/portal
mkdir -p src/components/admin
mkdir -p src/components/ui

# Layout
touch src/components/layout/Navbar.tsx
touch src/components/layout/Footer.tsx
touch src/components/layout/WhatsAppButton.tsx

# Home sections
touch src/components/home/Hero.tsx
touch src/components/home/WhyChooseUs.tsx
touch src/components/home/FleetPreview.tsx
touch src/components/home/HowItWorksSection.tsx
touch src/components/home/Testimonials.tsx
touch src/components/home/StatsBar.tsx
touch src/components/home/CTABanner.tsx

# Fleet
touch src/components/fleet/CarCard.tsx
touch src/components/fleet/FleetGrid.tsx
touch src/components/fleet/CarFilter.tsx
touch src/components/fleet/CarModal.tsx

# Contact
touch src/components/contact/ContactForm.tsx
touch src/components/contact/MapEmbed.tsx

# Quote (Stage 2)
touch src/components/quote/QuoteCalculator.tsx
touch src/components/quote/PlanSelector.tsx
touch src/components/quote/QuoteSummary.tsx

# Blog (Stage 2)
touch src/components/blog/BlogCard.tsx
touch src/components/blog/BlogGrid.tsx
touch src/components/blog/BlogHeader.tsx
touch src/components/blog/TableOfContents.tsx

# Portal (Stage 3)
touch src/components/portal/PortalSidebar.tsx
touch src/components/portal/ContractStatus.tsx
touch src/components/portal/PaymentHistory.tsx
touch src/components/portal/SupportTicket.tsx

# Admin (Stage 3)
touch src/components/admin/AdminSidebar.tsx
touch src/components/admin/LeadsTable.tsx
touch src/components/admin/FleetManager.tsx

# UI primitives
touch src/components/ui/Button.tsx
touch src/components/ui/Badge.tsx
touch src/components/ui/Card.tsx
touch src/components/ui/Accordion.tsx
touch src/components/ui/Modal.tsx
touch src/components/ui/Skeleton.tsx
touch src/components/ui/Input.tsx
touch src/components/ui/Select.tsx
touch src/components/ui/Textarea.tsx
touch src/components/ui/PageHeader.tsx
touch src/components/ui/SectionWrapper.tsx

echo "  ✓ src/components/ structure created"

# ─────────────────────────────────────────────
# DATA FILES
# ─────────────────────────────────────────────
mkdir -p src/data

cat > src/data/cars.ts << 'EOF'
import type { Car } from '@/types/car';

export const CARS: Car[] = [
  // TODO: Populate with all 13 cars from CLAUDE.md Section 1
  // Example entry:
  // {
  //   id: 'toyota-camry',
  //   name: 'Toyota Camry',
  //   weeklyPrice: 239,
  //   type: 'sedan',
  //   fuelType: 'petrol',
  //   spec: { seats: 5, fuelConsumption: '6.8L/100km', ancapRating: 5 },
  //   imageSrc: '/images/cars/camry.webp',
  //   imageAlt: 'Toyota Camry silver sedan — ideal for rideshare in Perth and Melbourne',
  //   shortDescription: 'Efficient, stylish and reliable. The most popular rideshare sedan.',
  //   longDescription: 'The Toyota Camry delivers excellent fuel economy, a comfortable ride and ample boot space...',
  //   equipped: ['10-way powered driver seat', 'Apple CarPlay & Android Auto', 'Lane Departure Alert', 'GPS included'],
  //   isPopular: false,
  //   isAvailable: true,
  // },
];
EOF

cat > src/data/faqs.ts << 'EOF'
import type { FAQ } from '@/types/faq';

export const FAQS: FAQ[] = [
  // TODO: Populate from CLAUDE.md business rules — Section 1
  // Example:
  // {
  //   id: 'minimum-age',
  //   question: 'What is the minimum age to apply?',
  //   answer: 'You must be at least 21 years old to join the DriveToOwn program.',
  //   category: 'general',
  // },
];
EOF

cat > src/data/testimonials.ts << 'EOF'
import type { Testimonial } from '@/types/testimonial';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Faizen',
    location: 'Perth, WA',
    rating: 5,
    text: 'A total life saver! If you\'re a student like me or someone who doesn\'t own a vehicle, I\'d definitely recommend DriveToOwn. Much safer and cheaper than other options.',
    carDriven: 'Toyota Corolla',
    date: 'November 2024',
  },
  {
    id: '2',
    name: 'Mandy K.',
    location: 'Melbourne, VIC',
    rating: 5,
    text: 'Great service, 100% recommend. The staff are good people and better than the average car providers. Big thumbs up.',
    carDriven: 'Toyota Camry Hybrid',
    date: 'January 2025',
  },
  {
    id: '3',
    name: 'Rocky P.',
    location: 'Perth, WA',
    rating: 5,
    text: 'Best service I ever had. I would most definitely recommend this way of getting on the road to everyone who is doing ridesharing.',
    carDriven: 'Kia Cerato',
    date: 'March 2025',
  },
  {
    id: '4',
    name: 'S. Sharma',
    location: 'Melbourne, VIC',
    rating: 5,
    text: 'Very friendly and professional staff. Will definitely recommend to everyone.',
    carDriven: 'Toyota RAV4',
    date: 'February 2025',
  },
  {
    id: '5',
    name: 'Akshay R.',
    location: 'Perth, WA',
    rating: 5,
    text: 'I have been renting from here for over a year. I would not consider going anywhere else. The service is excellent, staff always very helpful. When friends ask me about car rental I always advise them to come here.',
    carDriven: 'Toyota Camry Hybrid',
    date: 'April 2025',
  },
];
EOF

cat > src/data/plans.ts << 'EOF'
import type { Plan } from '@/types/plan';

export const PLANS: Plan[] = [
  {
    id: 'flexi',
    name: 'Flexi',
    tagline: 'Get on the road fast, no long commitment.',
    weeklyPriceFrom: 179,
    joiningFee: 275,
    kmAllowance: 1000,
    excessKmRate: 10, // 10 cents per km
    minimumWeeks: 26,
    noticePeriodWeeks: 4,
    features: [
      'No credit history required',
      '1,000 km/week included',
      '5-star ANCAP rated cars',
      'GPS included',
      'Rideshare approved',
      'Switch cars by arrangement',
      '26-week minimum subscription',
    ],
    isRecommended: false,
  },
  {
    id: 'flexi-own',
    name: 'Flexi Own',
    tagline: 'Pay weekly and own your car at the end.',
    weeklyPriceFrom: 239,
    joiningFee: 900,
    kmAllowance: 2000,
    excessKmRate: 10,
    minimumWeeks: 208, // 4 years
    noticePeriodWeeks: 4,
    features: [
      'Own the car at end of contract',
      '2,000 km/week included',
      'No credit history required',
      '5-star ANCAP rated cars',
      'GPS included',
      'Rideshare approved',
      'Drive faster to ownership with extra km',
    ],
    isRecommended: true,
  },
];
EOF

cat > src/data/navLinks.ts << 'EOF'
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About Us', href: '/about' },
] as const;
EOF

cat > src/data/socialLinks.ts << 'EOF'
export const SOCIAL_LINKS = [
  {
    platform: 'Facebook',
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? '#',
    ariaLabel: 'Follow DriveToOwn on Facebook',
  },
  {
    platform: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#',
    ariaLabel: 'Follow DriveToOwn on Instagram',
  },
  {
    platform: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '#',
    ariaLabel: 'Connect with DriveToOwn on LinkedIn',
  },
] as const;
EOF

echo "  ✓ src/data/ files created"

# ─────────────────────────────────────────────
# TYPES
# ─────────────────────────────────────────────
mkdir -p src/types

cat > src/types/car.ts << 'EOF'
export type CarType = 'sedan' | 'suv' | 'hatchback' | 'hybrid' | 'wagon';
export type FuelType = 'petrol' | 'hybrid' | 'electric';

export interface CarSpec {
  seats: number;
  fuelConsumption: string;
  ancapRating: number;
  mileagePerLitre?: string;
  transmission?: string;
}

export interface Car {
  id: string;
  name: string;
  weeklyPrice: number;
  type: CarType;
  fuelType: FuelType;
  spec: CarSpec;
  imageSrc: string;
  imageAlt: string;
  shortDescription: string;
  longDescription: string;
  equipped: string[];
  isPopular?: boolean;
  isAvailable?: boolean;
}
EOF

cat > src/types/plan.ts << 'EOF'
export type PlanType = 'flexi' | 'flexi-own';

export interface Plan {
  id: PlanType;
  name: string;
  tagline: string;
  weeklyPriceFrom: number;
  joiningFee: number;
  kmAllowance: number;
  excessKmRate: number;
  minimumWeeks: number;
  noticePeriodWeeks: number;
  features: string[];
  isRecommended?: boolean;
}
EOF

cat > src/types/faq.ts << 'EOF'
export type FAQCategory = 'general' | 'car' | 'fees';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}
EOF

cat > src/types/testimonial.ts << 'EOF'
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatarSrc?: string;
  date?: string;
  carDriven?: string;
}
EOF

cat > src/types/blog.ts << 'EOF'
// Stage 2 — populated by Contentlayer
export type BlogCategory = 'rideshare' | 'car-tips' | 'finance' | 'news';

export interface BlogPost {
  slug: string;
  url: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  readTime: number;
  author: string;
  image?: string;
  featured?: boolean;
  body: {
    raw: string;
    code: string;
  };
}
EOF

cat > src/types/database.ts << 'EOF'
// Stage 2+ — regenerate with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          city: string | null;
          car_interest: string | null;
          message: string | null;
          status: 'new' | 'contacted' | 'converted' | 'rejected';
          source: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['leads']['Insert']>;
      };
    };
  };
}
EOF

echo "  ✓ src/types/ created"

# ─────────────────────────────────────────────
# LIB / UTILITIES
# ─────────────────────────────────────────────
mkdir -p src/lib/supabase
mkdir -p src/lib/validations

cat > src/lib/utils.ts << 'EOF'
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format number as Australian dollar weekly price */
export function formatWeeklyPrice(amount: number): string {
  return `$${amount}/wk`;
}

/** Format number as currency */
export function formatCurrency(amountInCents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
  }).format(amountInCents / 100);
}

/** Format date string to readable Australian format */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Get initials from a full name (for avatar fallback) */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** Calculate ownership date from contract start + weeks */
export function calculateOwnershipDate(contractWeeks: number): string {
  const date = new Date();
  date.setDate(date.getDate() + contractWeeks * 7);
  return date.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
}
EOF

cat > src/lib/resend.ts << 'EOF'
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn('[resend] RESEND_API_KEY is not set — emails will not be sent');
}

export const resend = new Resend(process.env.RESEND_API_KEY);
EOF

cat > src/lib/supabase/client.ts << 'EOF'
// Browser Supabase client — use in Client Components
// Stage 2+: Install @supabase/ssr first
// import { createBrowserClient } from '@supabase/ssr';
// import type { Database } from '@/types/database';

// export function createClient() {
//   return createBrowserClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );
// }

// STAGE 1 PLACEHOLDER — uncomment above when Supabase is configured
export const supabaseClient = null;
EOF

cat > src/lib/supabase/server.ts << 'EOF'
// Server Supabase client — use in Server Components and API routes
// Stage 2+: Install @supabase/ssr first
// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';
// import type { Database } from '@/types/database';

// export function createClient() {
//   const cookieStore = cookies();
//   return createServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     { cookies: { getAll() { return cookieStore.getAll() } } }
//   );
// }

// STAGE 1 PLACEHOLDER — uncomment above when Supabase is configured
export const supabaseServer = null;
EOF

cat > src/lib/validations/contact.ts << 'EOF'
import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(
      /^(\+614|04)\d{8}$/,
      'Please enter a valid Australian mobile number (e.g. 0412 345 678)'
    ),
  city: z.enum(['Perth', 'Melbourne'], {
    errorMap: () => ({ message: 'Please select Perth or Melbourne' }),
  }),
  carInterest: z.string().min(1, 'Please select a car or choose "Not sure yet"'),
  message: z
    .string()
    .min(10, 'Please enter at least 10 characters')
    .max(1000, 'Message must be under 1000 characters'),
  honeypot: z.string().max(0).optional(), // Spam trap — must be empty
});

export type ContactFormData = z.infer<typeof contactSchema>;
EOF

cat > src/lib/validations/quote.ts << 'EOF'
import { z } from 'zod';

export const quoteSchema = z.object({
  carId: z.string().min(1, 'Please select a car'),
  planType: z.enum(['flexi', 'flexi-own']),
  contractYears: z.number().int().min(1).max(4),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
EOF

cat > src/lib/metadata.ts << 'EOF'
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'DriveToOwn';

export function buildMetadata({
  title,
  description,
  path = '/',
  image = '/og-image.jpg',
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'website',
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}
EOF

echo "  ✓ src/lib/ created"

# ─────────────────────────────────────────────
# HOOKS
# ─────────────────────────────────────────────
mkdir -p src/hooks

cat > src/hooks/useCarFilter.ts << 'EOF'
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
EOF

cat > src/hooks/useScrollAnimation.ts << 'EOF'
'use client';
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
EOF

cat > src/hooks/useMediaQuery.ts << 'EOF'
'use client';
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Convenience hooks
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
EOF

cat > src/hooks/useQuoteCalc.ts << 'EOF'
'use client';
import { useState, useMemo } from 'react';
import type { Car } from '@/types/car';
import type { PlanType } from '@/types/plan';
import { calculateOwnershipDate } from '@/lib/utils';

export function useQuoteCalc() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [plan, setPlan] = useState<PlanType>('flexi');
  const [contractYears, setContractYears] = useState<1 | 2 | 3 | 4>(2);

  const quote = useMemo(() => {
    if (!selectedCar) return null;

    // BUSINESS RULE: Flexi Own adds ~10% to weekly price to cover ownership component
    const weeklyPayment =
      plan === 'flexi-own'
        ? Math.round(selectedCar.weeklyPrice * 1.1)
        : selectedCar.weeklyPrice;

    const joiningFee = plan === 'flexi-own' ? 900 : 275;
    const totalWeeks = contractYears * 52;
    const totalWeeklyPayments = weeklyPayment * totalWeeks;
    const totalCost = totalWeeklyPayments + joiningFee;
    const ownershipDate = plan === 'flexi-own' ? calculateOwnershipDate(totalWeeks) : null;

    return {
      weeklyPayment,
      joiningFee,
      totalWeeks,
      totalWeeklyPayments,
      totalCost,
      ownershipDate,
      contractYears,
    };
  }, [selectedCar, plan, contractYears]);

  return {
    selectedCar,
    setSelectedCar,
    plan,
    setPlan,
    contractYears,
    setContractYears,
    quote,
  };
}
EOF

echo "  ✓ src/hooks/ created"

# ─────────────────────────────────────────────
# BLOG CONTENT (Stage 2 Stubs)
# ─────────────────────────────────────────────
mkdir -p content/posts

cat > content/posts/how-to-become-uber-driver-australia.mdx << 'EOF'
---
title: "How to Become an Uber Driver in Australia (2025 Complete Guide)"
description: "Step-by-step guide to becoming an approved Uber driver in Perth and Melbourne. Includes vehicle requirements, documents needed, and how rent-to-own cars make it easier."
date: 2025-06-01
category: rideshare
readTime: 7
author: DriveToOwn Team
featured: true
---

# How to Become an Uber Driver in Australia

<!-- TODO: Write full article content (600+ words) -->
<!-- Cover: eligibility, documents, vehicle requirements, background check, Uber app setup, how DriveToOwn helps -->
EOF

cat > content/posts/international-student-car-guide-australia.mdx << 'EOF'
---
title: "International Student Car Guide: Get a Car in Australia Without Credit History"
description: "No Australian credit history? No problem. This guide explains how international students can legally get a car and start earning with rideshare services."
date: 2025-06-15
category: finance
readTime: 6
author: DriveToOwn Team
---

# International Student Car Guide

<!-- TODO: Write full article content (600+ words) -->
<!-- Cover: visa requirements, no credit check options, rent-to-own vs traditional rental, required documents -->
EOF

cat > content/posts/rent-to-own-vs-car-loan-australia.mdx << 'EOF'
---
title: "Rent-to-Own vs Car Loan in Australia: Which Is Better for Rideshare Drivers?"
description: "We compare rent-to-own car programs vs traditional car loans for Uber and DiDi drivers in Australia. Real numbers, honest comparison."
date: 2025-07-01
category: finance
readTime: 8
author: DriveToOwn Team
---

# Rent-to-Own vs Car Loan

<!-- TODO: Write full article content (600+ words) -->
<!-- Cover: cost comparison table, credit requirements, flexibility, risk, who each is best for -->
EOF

cat > content/posts/how-much-can-you-earn-uber-eats-australia.mdx << 'EOF'
---
title: "How Much Can You Earn Driving for Uber Eats in Perth and Melbourne? (2025)"
description: "Realistic earnings data for Uber Eats drivers in Perth and Melbourne. We break down hourly rates, peak times, and how to maximise your income."
date: 2025-07-15
category: rideshare
readTime: 5
author: DriveToOwn Team
---

# Uber Eats Earnings in Australia

<!-- TODO: Write full article content (600+ words) -->
<!-- Cover: average hourly rates, peak hours, tips to earn more, cost of car, net profit calculation -->
EOF

cat > content/posts/top-5-fuel-efficient-cars-rideshare-australia.mdx << 'EOF'
---
title: "Top 5 Most Fuel-Efficient Cars for Rideshare in Australia (2025)"
description: "Fuel costs eat into rideshare profits. We rank the most fuel-efficient cars in our fleet to help you keep more of your earnings."
date: 2025-08-01
category: car-tips
readTime: 6
author: DriveToOwn Team
---

# Top 5 Fuel-Efficient Rideshare Cars

<!-- TODO: Write full article content (600+ words) -->
<!-- Cover: Toyota Corolla Hybrid, Camry Hybrid, Prius, Corolla, Kia Cerato — with L/100km and cost savings -->
EOF

echo "  ✓ content/posts/ stubs created"

# ─────────────────────────────────────────────
# CONFIG FILES
# ─────────────────────────────────────────────
cat > .env.example << 'EOF'
# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=DriveToOwn

# Business Contact
NEXT_PUBLIC_PHONE_PERTH=+61450555557
NEXT_PUBLIC_PHONE_MELBOURNE=+61455445285
NEXT_PUBLIC_EMAIL=hello@drivetoown.com.au
NEXT_PUBLIC_ADDRESS_PERTH=2/73-75 Poole St, Welshpool WA 6106
NEXT_PUBLIC_WHATSAPP_NUMBER=61450555557

# Social Media
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yourpage
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourhandle
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/yourcompany

# Email (Resend) — Stage 1
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@drivetoown.com.au
RESEND_TO_EMAIL=enquiries@drivetoown.com.au

# Supabase — Stage 2+
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyxxxxxxxxxxxx

# Google Maps — Stage 1
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaxxxxxxxxxxxx

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Stripe — Stage 3
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
EOF

cat > .prettierrc << 'EOF'
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
EOF

cat > .eslintrc.json << 'EOF'
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "error",
    "prefer-const": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
EOF

cat > .vscode/extensions.json << 'EOF'
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "streetsidesoftware.code-spell-checker",
    "christian-kohler.path-intellisense",
    "formulahendry.auto-rename-tag",
    "antfu.iconify"
  ]
}
EOF

echo "  ✓ Config files created"

# ─────────────────────────────────────────────
# MIDDLEWARE STUB
# ─────────────────────────────────────────────
cat > src/middleware.ts << 'EOF'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Stage 1: No auth required — middleware is a passthrough
// Stage 3: Replace with Supabase session check for /portal and /admin routes

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // TODO Stage 3: Protect /portal and /admin routes
  // const session = await getSession(request); // Supabase SSR
  // if (pathname.startsWith('/portal') && !session) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  // if (pathname.startsWith('/admin') && session?.user?.role !== 'admin') {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|icons).*)',
  ],
};
EOF

echo "  ✓ Middleware stub created"

# ─────────────────────────────────────────────
# README
# ─────────────────────────────────────────────
cat > README.md << 'EOF'
# DriveToOwn — Rent-to-Own Car Platform

Australia's most flexible rent-to-own car service for rideshare drivers and new arrivals.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your real values

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Documentation

See **CLAUDE.md** for the complete development guide, prompts, data models, and deployment instructions.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS**
- **Framer Motion**
- **Resend** (email)
- **Supabase** (Stage 2+ database & auth)
- **Vercel** (hosting)

## Build Stages

| Stage | Description | Status |
|-------|-------------|--------|
| 1 | Marketing site (6 pages) | 🔧 In Progress |
| 2 | Quote calculator + Blog | ⏳ Planned |
| 3 | Driver portal + Admin | ⏳ Planned |

## License

Private — All rights reserved.
EOF

echo ""
echo "══════════════════════════════════════════"
echo "  ✅  DriveToOwn scaffold complete!"
echo "══════════════════════════════════════════"
echo ""
echo "  Next steps:"
echo "  1. Run: npm install"
echo "  2. Run: cp .env.example .env.local"
echo "  3. Edit .env.local with your real values"
echo "  4. Run: npm run dev"
echo "  5. Open CLAUDE.md in Claude Code and"
echo "     start with PROMPT 1.1"
echo ""
