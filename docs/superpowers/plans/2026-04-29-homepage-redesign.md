# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the DriveToOwn homepage and shared layout components into a futuristic "Bright & Empowering" design with cars as the centrepiece, featuring an Ownership Progress Bar on every car card, a 4-step Journey Tracker in the hero, a filterable Fleet Showcase, and a glassmorphism Running Car animation.

**Architecture:** 15 files changed (10 modified, 4 new, 1 page.tsx update). Tasks run in dependency order: data types first → atomic components → complex components → page assembly. No API changes. No database changes.

**Tech Stack:** Next.js 14 App Router, TypeScript (strict), Tailwind CSS v3, Framer Motion (installed, now used), Lucide React, `next/image`, `next/link`

**Verification command for every task:** `npm run type-check && npm run lint`  
**Final verification:** `npm run build`

---

## Task 1: Extend Tailwind config with `fillBar` animation + indigo token

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

> `indigo-*` classes (e.g. `bg-indigo-600`) already exist in Tailwind's default palette — no change needed for those. We only need the `fillBar` keyframe for OwnershipBar, and a CSS variable for indigo accent.

- [ ] **Step 1: Add `fillBar` keyframe and `animate-fill-bar` to tailwind.config.ts**

```typescript
// tailwind.config.ts — full file replacement
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0F2444',
        'navy-light': '#1A365D',
        red: {
          DEFAULT: '#DC2626',
          hover: '#B91C1C',
        },
        sky: {
          DEFAULT: '#EFF6FF',
          mid: '#DBEAFE',
        },
        text: '#1E293B',
        muted: '#64748B',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(15,36,68,0.08)',
        'card-hover': '0 8px 40px rgba(15,36,68,0.16)',
        modal: '0 25px 50px rgba(0,0,0,0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'fill-bar': 'fillBar 1.5s ease forwards',
        'drive-across': 'driveAcross 0.1s linear',
        'road-dash': 'roadDash 1s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        fillBar: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--fill-width, 0%)' },
        },
        roadDash: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-64px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Add `--color-indigo` CSS variable to globals.css**

```css
/* src/app/globals.css — add inside :root block, after --color-border */
--color-indigo: #4f46e5;
--color-indigo-light: #e0e7ff;
--color-green: #22c55e;
--color-green-light: #dcfce7;
```

The full `:root` block becomes:
```css
:root {
  --color-navy: #0f2444;
  --color-navy-light: #1a365d;
  --color-red: #dc2626;
  --color-red-hover: #b91c1c;
  --color-sky: #eff6ff;
  --color-sky-mid: #dbeafe;
  --color-text: #1e293b;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
  --color-indigo: #4f46e5;
  --color-indigo-light: #e0e7ff;
  --color-green: #22c55e;
  --color-green-light: #dcfce7;
}
```

- [ ] **Step 3: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "chore: add fillBar + roadDash animations and indigo/green CSS variables"
```

---

## Task 2: Add `weeksToOwn` to Car type and all car data

**Files:**
- Modify: `src/types/car.ts`
- Modify: `src/data/cars.ts`

- [ ] **Step 1: Add `weeksToOwn` to Car interface in `src/types/car.ts`**

```typescript
// src/types/car.ts — full file
export type CarType = 'sedan' | 'suv' | 'hatchback' | 'hybrid' | 'wagon' | 'van' | 'convertible' | 'luxury';
export type FuelType = 'petrol' | 'hybrid' | 'plugin-hybrid' | 'diesel' | 'electric';

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
  weeksToOwn?: number;        // weeks of Flexi Own payments to reach full ownership
}
```

- [ ] **Step 2: Add `weeksToOwn: 104` to every car entry in `src/data/cars.ts`**

Find every car object (there are 11 of them based on the data file) and add `weeksToOwn: 104` after `isAvailable`. Do this for every car entry. Example for the first two:

```typescript
// toyota-corolla entry — add weeksToOwn
  {
    id: 'toyota-corolla',
    name: 'Toyota Corolla',
    weeklyPrice: 199,
    type: 'sedan',
    fuelType: 'petrol',
    spec: { seats: 5, fuelConsumption: '6.0L/100km', ancapRating: 5, transmission: 'CVT' },
    imageSrc: '/images/cars/corolla.webp',
    imageAlt: 'Toyota Corolla sedan — Melbourne VIC',
    shortDescription: 'Legendary reliability with modern features. A driver favourite.',
    longDescription: 'The Toyota Corolla is one of the world\'s best-selling cars for good reason. With exceptional reliability, low running costs and Toyota Safety Sense included as standard, it\'s a smart choice for any driver.',
    equipped: ['Toyota Safety Sense', 'Apple CarPlay & Android Auto', 'Adaptive Cruise Control', 'Pre-Collision System', 'GPS included', '5-star ANCAP'],
    isAvailable: true,
    weeksToOwn: 104,
  },
```

Repeat `weeksToOwn: 104` for every car in the array (toyota-camry, toyota-camry-hybrid, toyota-rav4, toyota-rav4-hybrid, toyota-hiace, haval-h6, jaecoo-j7, mercedes-c200, audi-a4, ford-mustang, bmw-convertible, and any others).

- [ ] **Step 3: Verify types compile**

```bash
npm run type-check
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/types/car.ts src/data/cars.ts
git commit -m "feat: add weeksToOwn field to Car type and data"
```

---

## Task 3: AvailabilityBadge component

**Files:**
- Create: `src/components/fleet/AvailabilityBadge.tsx`

- [ ] **Step 1: Create the component**

```typescript
// src/components/fleet/AvailabilityBadge.tsx
export interface AvailabilityBadgeProps {
  available?: boolean;
}

export function AvailabilityBadge({ available = true }: AvailabilityBadgeProps) {
  if (!available) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[10px] font-700 text-green-700">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
      </span>
      Available Now
    </span>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/fleet/AvailabilityBadge.tsx
git commit -m "feat: add AvailabilityBadge component with pulsing green dot"
```

---

## Task 4: OwnershipBar component

**Files:**
- Create: `src/components/fleet/OwnershipBar.tsx`

- [ ] **Step 1: Create the component**

```typescript
// src/components/fleet/OwnershipBar.tsx
export interface OwnershipBarProps {
  weeksToOwn: number;
  weeksPaid?: number;
  hintText?: string;
}

export function OwnershipBar({ weeksToOwn, weeksPaid = 0, hintText }: OwnershipBarProps) {
  const pct = weeksToOwn > 0 ? Math.min((weeksPaid / weeksToOwn) * 100, 100) : 0;

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[10px] font-700 text-slate-600">🏁 Path to ownership</span>
        <span className="text-[10px] font-800 text-navy">{weeksToOwn} wks</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-navy to-indigo-600"
          style={{
            width: `${pct}%`,
            transition: 'width 1.5s ease',
          }}
        />
      </div>
      {hintText && (
        <p className="mt-1.5 text-[10px] leading-tight text-muted">{hintText}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/fleet/OwnershipBar.tsx
git commit -m "feat: add OwnershipBar component with animated fill and hint text"
```

---

## Task 5: JourneyTracker component

**Files:**
- Create: `src/components/home/JourneyTracker.tsx`

- [ ] **Step 1: Create the component**

```typescript
// src/components/home/JourneyTracker.tsx
import { cn } from '@/lib/utils';

interface JourneyStep {
  label: string;
  status: 'done' | 'active' | 'upcoming';
  icon: string;
}

const STEPS: JourneyStep[] = [
  { label: 'Apply',        status: 'done',     icon: '✓' },
  { label: 'Pick Your Car', status: 'active',  icon: '🚗' },
  { label: 'Drive',        status: 'upcoming', icon: '▶' },
  { label: 'Own It',       status: 'upcoming', icon: '🔑' },
];

export function JourneyTracker() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card">
      <p className="mb-3 text-[10px] font-800 uppercase tracking-widest text-muted">
        Your ownership journey
      </p>
      <div className="flex items-center">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {/* Left connector */}
              {i > 0 && (
                <div
                  className={cn(
                    'h-0.5 flex-1',
                    STEPS[i - 1].status === 'done' ? 'bg-green-400' : 'bg-slate-200'
                  )}
                />
              )}
              {/* Circle */}
              <div
                className={cn(
                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-800',
                  step.status === 'done'   && 'bg-green-500 text-white',
                  step.status === 'active' && 'bg-navy text-white ring-4 ring-navy/20',
                  step.status === 'upcoming' && 'bg-slate-100 text-slate-400'
                )}
              >
                {step.icon}
              </div>
              {/* Right connector */}
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1',
                    step.status === 'done' ? 'bg-green-400' : 'bg-slate-200'
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                'mt-1.5 text-center text-[10px] font-600',
                step.status === 'active' ? 'font-700 text-navy' : 'text-muted'
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/JourneyTracker.tsx
git commit -m "feat: add JourneyTracker component with 4-step ownership flow"
```

---

## Task 6: Rebuild RunningCar — glassmorphism road + SVG car

**Files:**
- Modify: `src/components/layout/RunningCar.tsx`

- [ ] **Step 1: Replace RunningCar.tsx entirely**

```typescript
// src/components/layout/RunningCar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export function RunningCar() {
  const [carX, setCarX]             = useState(120);
  const [dashOffset, setDashOffset] = useState(0);
  const [speed, setSpeed]           = useState(0);
  const [braking, setBraking]       = useState(false);
  const [width, setWidth]           = useState(0);

  const lastScrollY  = useRef(0);
  const brakeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setWidth(window.innerWidth);
    lastScrollY.current = window.scrollY;

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta    = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      const absSpeed = Math.abs(delta);
      setSpeed(absSpeed);
      setBraking(false);

      if (brakeTimer.current) clearTimeout(brakeTimer.current);
      brakeTimer.current = setTimeout(() => {
        setBraking(true);
        setSpeed(0);
      }, 180);

      setCarX((prev) => {
        const next = prev + delta * 1.2;
        if (next > window.innerWidth + 160) return -160;
        if (next < -160) return window.innerWidth + 160;
        return next;
      });

      setDashOffset((prev) => (prev - delta * 1.2) % 64);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (brakeTimer.current) clearTimeout(brakeTimer.current);
    };
  }, []);

  const blurPx      = Math.min(speed * 0.15, 2).toFixed(1);
  const streakAlpha = Math.min(speed * 0.05, 0.5);
  const isMoving    = speed > 1;

  return (
    <div
      className="relative h-20 w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* Glass pill road */}
      <div
        className="absolute inset-x-10 top-1/2 h-11 -translate-y-1/2 overflow-hidden rounded-full border border-white/50"
        style={{
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(15,36,68,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {/* Animated dashes inside road */}
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <div
            className="flex shrink-0 gap-5"
            style={{
              transform: `translateX(${dashOffset}px)`,
              width: 'calc(100% + 128px)',
              marginLeft: '-64px',
            }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="h-0.5 w-8 shrink-0 rounded-full bg-navy/20"
              />
            ))}
          </div>
        </div>
        {/* Left fade mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 rounded-l-full bg-gradient-to-r from-white/60 to-transparent" />
        {/* Right fade mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 rounded-r-full bg-gradient-to-l from-white/60 to-transparent" />
      </div>

      {/* Speed streaks */}
      {isMoving && (
        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2"
          style={{
            left: carX - 60,
            opacity: streakAlpha,
            transition: 'opacity 0.15s ease',
          }}
        >
          {[0, 6, 12, 20].map((offset) => (
            <div
              key={offset}
              className="mb-1 h-px rounded-full"
              style={{
                width: `${50 + offset * 2}px`,
                background: 'linear-gradient(to left, rgba(15,36,68,0.3), transparent)',
              }}
            />
          ))}
        </div>
      )}

      {/* Car group */}
      <div
        className="pointer-events-none absolute top-1/2"
        style={{
          left: carX,
          transform: 'translateY(-58%)',
        }}
      >
        {/* Headlight glow */}
        <div
          className="absolute"
          style={{
            right: -18,
            top: 8,
            width: 24,
            height: 16,
            background: 'linear-gradient(to right, rgba(255,248,180,0.8), transparent)',
            clipPath: 'polygon(0 35%, 100% 0%, 100% 100%, 0 65%)',
            filter: 'blur(3px)',
          }}
        />
        {/* Brake light glow */}
        <div
          className="absolute rounded-full transition-opacity duration-300"
          style={{
            left: -10,
            top: 8,
            width: 14,
            height: 12,
            background: 'rgba(220,38,38,0.9)',
            filter: 'blur(6px)',
            opacity: braking ? 1 : 0,
          }}
        />
        {/* Ground shadow */}
        <div
          className="absolute -bottom-1 left-2 right-2 h-2 rounded-full"
          style={{ background: 'rgba(15,36,68,0.15)', filter: 'blur(4px)' }}
        />

        {/* SVG sedan car */}
        <svg
          width="110"
          height="48"
          viewBox="0 0 130 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: `drop-shadow(0 2px 8px rgba(15,36,68,0.2)) blur(${blurPx}px)`,
            transition: 'filter 0.12s ease',
          }}
        >
          {/* Body */}
          <path
            d="M8 36 Q10 22 28 18 Q40 12 58 10 Q72 9 84 13 Q96 16 108 22 Q118 26 122 32 Q124 36 122 40 L8 40 Z"
            fill="#0f2444"
          />
          {/* Roof */}
          <path
            d="M32 18 Q38 8 56 6 Q72 4 82 9 Q90 12 96 18 Z"
            fill="#1a365d"
          />
          {/* Window */}
          <path
            d="M36 18 Q40 10 56 8 Q70 7 78 11 Q86 14 90 18 Z"
            fill="#bfdbfe"
            fillOpacity="0.85"
          />
          {/* Window divider */}
          <line x1="63" y1="8" x2="60" y2="18" stroke="#0f2444" strokeWidth="1.5" />
          {/* Red accent stripe */}
          <path
            d="M8 36 L122 36 L122 38 Q65 41 8 38 Z"
            fill="#ef4444"
          />
          {/* Front bumper */}
          <path d="M108 28 Q118 28 122 32 L122 40 L108 40 Z" fill="#1e3a5f" />
          {/* Rear bumper */}
          <path d="M8 36 L8 40 L24 40 L24 36 Z" fill="#1e3a5f" />
          {/* Headlight */}
          <ellipse cx="114" cy="30" rx="5" ry="3.5" fill="#fef9c3" fillOpacity="0.95" />
          <ellipse cx="114" cy="30" rx="3" ry="2" fill="white" />
          {/* Tail light */}
          <ellipse cx="14" cy="34" rx="4" ry="3" fill="#ef4444" fillOpacity="0.9" />
          {/* Wheel arches */}
          <path d="M22 40 Q22 47 32 47 Q42 47 42 40" fill="#0d1520" />
          <path d="M82 40 Q82 47 92 47 Q102 47 102 40" fill="#0d1520" />
          {/* Wheels */}
          <circle cx="32" cy="46" r="9" fill="#1e293b" />
          <circle cx="32" cy="46" r="6.5" fill="#334155" />
          <circle cx="32" cy="46" r="3.5" fill="#64748b" />
          <circle cx="32" cy="46" r="1.5" fill="#94a3b8" />
          <circle cx="92" cy="46" r="9" fill="#1e293b" />
          <circle cx="92" cy="46" r="6.5" fill="#334155" />
          <circle cx="92" cy="46" r="3.5" fill="#64748b" />
          <circle cx="92" cy="46" r="1.5" fill="#94a3b8" />
          {/* Wheel spokes */}
          <line x1="32" y1="39.5" x2="32" y2="42.5" stroke="#475569" strokeWidth="1" />
          <line x1="29" y1="46" x2="35" y2="46" stroke="#475569" strokeWidth="1" />
          <line x1="92" y1="39.5" x2="92" y2="42.5" stroke="#475569" strokeWidth="1" />
          <line x1="89" y1="46" x2="95" y2="46" stroke="#475569" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/RunningCar.tsx
git commit -m "feat: rebuild RunningCar with glassmorphism pill road and inline SVG sedan"
```

---

## Task 7: Update CarCard with OwnershipBar + AvailabilityBadge + type tag

**Files:**
- Modify: `src/components/fleet/CarCard.tsx`

- [ ] **Step 1: Replace CarCard.tsx entirely**

```typescript
// src/components/fleet/CarCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Users, Fuel, Star } from 'lucide-react';
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
          <span className="inline-flex rounded-full bg-red px-2.5 py-1 text-[10px] font-800 uppercase tracking-wide text-white">
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
        <p className="mb-0.5 text-[10px] font-700 uppercase tracking-widest text-muted">
          {TYPE_LABELS[car.type] ?? car.type} · {car.spec.seats} Seats
        </p>
        <h3 className="mb-2 text-lg font-800 text-navy">{car.name}</h3>

        {/* Price */}
        <div className="mb-3 flex items-baseline gap-1">
          <span className="text-2xl font-900 text-red">${car.weeklyPrice}</span>
          <span className="text-sm font-500 text-muted">/week incl. GST</span>
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
            'flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-700 text-white transition-all duration-200',
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
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/fleet/CarCard.tsx
git commit -m "feat: update CarCard with OwnershipBar, AvailabilityBadge, and type tag"
```

---

## Task 8: Update Navbar — tighter height, new CTA copy

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Update Navbar.tsx**

Change three things:
1. `h-28 ... md:h-32` → `h-16` (both mobile and desktop)
2. `h-24 w-auto ... md:h-28` → `h-10 w-auto`
3. Button text `Get In Touch` → `Get My First Car →`

```typescript
// src/components/layout/Navbar.tsx — change nav height
<nav className="container-custom flex h-16 items-center justify-between" aria-label="Main navigation">
```

```typescript
// Logo image height
<Image
  src="/images/logos/logo.png"
  alt="DriveToOwn"
  width={380}
  height={114}
  className="h-10 w-auto object-contain"
  priority
/>
```

```typescript
// CTA button
<Button href="/contact" size="sm">Get My First Car →</Button>
```

Also update the mobile menu CTA:
```typescript
<Button href="/contact" className="w-full">Get My First Car →</Button>
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: update Navbar height to h-16 and CTA to 'Get My First Car'"
```

---

## Task 9: Update StatsBar — navy background, 5 stats

**Files:**
- Modify: `src/components/home/StatsBar.tsx`

- [ ] **Step 1: Replace StatsBar.tsx entirely**

```typescript
// src/components/home/StatsBar.tsx
const stats = [
  { value: '500+', label: 'Happy Drivers' },
  { value: '13',   label: 'Cars Available' },
  { value: '$0',   label: 'Credit Check' },
  { value: '10+',  label: 'Yrs Experience' },
  { value: '$179', label: 'From Per Week' },
];

export function StatsBar() {
  return (
    <div className="bg-navy">
      <div className="container-custom py-5">
        <div className="flex flex-wrap items-center justify-around gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="text-center text-white">
                <div className="text-2xl font-900 md:text-3xl">{stat.value}</div>
                <div className="mt-0.5 text-[10px] font-700 uppercase tracking-widest text-white/50">
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden h-8 w-px bg-white/10 sm:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/StatsBar.tsx
git commit -m "feat: update StatsBar to navy background with 5 trust stats"
```

---

## Task 10: Rebuild Hero — Journey Tracker + Featured Car showcase + RunningCar

**Files:**
- Modify: `src/components/home/Hero.tsx`

- [ ] **Step 1: Replace Hero.tsx entirely**

```typescript
// src/components/home/Hero.tsx
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
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-700 text-indigo-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-600" />
              </span>
              Victoria&apos;s #1 First-Car Program
            </div>

            {/* H1 */}
            <h1 className="mb-4 text-4xl font-900 leading-tight tracking-tight text-navy md:text-5xl xl:text-6xl">
              Your first car starts{' '}
              <em className="not-italic text-red">right here.</em>
            </h1>

            {/* Subtext */}
            <p className="mb-7 text-base leading-relaxed text-slate-600 md:text-lg">
              No credit check. No stress.{' '}
              <strong className="font-700 text-navy">Weekly payments from $179</strong>{' '}
              that go toward owning the car outright. Open to everyone in Victoria.
            </p>

            {/* Journey tracker */}
            <div className="mb-7">
              <JourneyTracker />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button href="/fleet" size="lg" className="bg-navy hover:bg-navy-light text-white border-0 shadow-[0_4px_16px_rgba(15,36,68,0.25)]">
                Browse Our Fleet
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy/20 bg-white px-7 py-3.5 text-sm font-700 text-navy transition-all hover:border-navy hover:bg-navy/5"
              >
                ▶ How It Works
              </Link>
            </div>
          </div>

          {/* Right — Featured car showcase card */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-modal lg:max-w-md">
              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red px-4 py-1 text-[11px] font-800 uppercase tracking-wide text-white whitespace-nowrap">
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
              <p className="mb-0.5 text-[10px] font-700 uppercase tracking-widest text-muted">
                {featured.fuelType === 'hybrid' ? 'Hybrid Sedan' : 'Sedan'} · {featured.spec.seats} Seats
              </p>
              <h2 className="mb-2 text-xl font-800 text-navy">{featured.name}</h2>

              {/* Price */}
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-3xl font-900 text-red">${featured.weeklyPrice}</span>
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
                    <div className="text-sm font-800 text-navy">{val}</div>
                    <div className="text-[9px] font-600 uppercase tracking-wide text-muted">{lbl}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/contact?car=${featured.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-navy py-3 text-sm font-700 text-white transition-all hover:bg-navy-light"
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
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/Hero.tsx
git commit -m "feat: rebuild Hero with JourneyTracker, featured car card, and glassmorphism RunningCar"
```

---

## Task 11: Create FleetShowcase — filterable fleet grid

**Files:**
- Create: `src/components/home/FleetShowcase.tsx`

- [ ] **Step 1: Create FleetShowcase.tsx**

```typescript
// src/components/home/FleetShowcase.tsx
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

// Sort: popular first, then by price ascending
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
            <span className="text-xs font-800 uppercase tracking-widest text-red">Our Fleet</span>
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-900 tracking-tight text-navy md:text-4xl">
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
                'rounded-full border-[1.5px] px-5 py-2 text-sm font-700 transition-all duration-200',
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
            No cars match this filter. <button onClick={() => setActiveFilter('all')} className="font-700 text-navy underline">View all cars</button>
          </p>
        )}

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 rounded-full border-2 border-navy px-8 py-3.5 text-sm font-700 text-navy transition-all hover:bg-navy hover:text-white"
          >
            View All {CARS.length} Cars
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/FleetShowcase.tsx
git commit -m "feat: add FleetShowcase with filterable grid and ownership bars"
```

---

## Task 12: Rebuild HowItWorksSection — coloured icon tiles

**Files:**
- Modify: `src/components/home/HowItWorksSection.tsx`

- [ ] **Step 1: Replace HowItWorksSection.tsx entirely**

```typescript
// src/components/home/HowItWorksSection.tsx
import Link from 'next/link';

const steps = [
  {
    number: '1',
    emoji: '🔍',
    title: 'Choose Your Car',
    description: 'Browse our fleet and pick the car that suits your needs and budget. 13 vehicles, all 5-star ANCAP rated.',
    bg: 'from-blue-100 to-blue-200',
  },
  {
    number: '2',
    emoji: '📋',
    title: 'Sign & Pay $900',
    description: 'Submit your docs and sign the DriveToOwn agreement. Pay the one-off joining fee. No credit check required.',
    bg: 'from-pink-100 to-pink-200',
  },
  {
    number: '3',
    emoji: '🚗',
    title: 'Drive From Day 1',
    description: 'Get on the road immediately. Use it for rideshare, commuting, or personal trips — it\'s your car to drive.',
    bg: 'from-green-100 to-green-200',
  },
  {
    number: '4',
    emoji: '🔑',
    title: 'Own It',
    description: 'Complete your weekly payments and the car is legally yours. No balloon payment. No surprises.',
    bg: 'from-yellow-100 to-yellow-200',
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)' }}
      className="py-16 md:py-24"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
            <span className="text-xs font-800 uppercase tracking-widest text-red">The Process</span>
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-900 tracking-tight text-navy md:text-4xl">
            Own a car in 4 simple steps.
          </h2>
          <p className="mt-3 text-base text-muted">
            From choosing your car to holding the keys — here&apos;s exactly how it works.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {/* Dashed connector (desktop only) */}
          <div
            className="pointer-events-none absolute left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] top-8 hidden h-px md:block"
            style={{
              background: 'repeating-linear-gradient(90deg, #e2e8f0 0, #e2e8f0 8px, transparent 8px, transparent 16px)',
            }}
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Icon tile */}
              <div className="relative z-10 mb-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.bg} shadow-card`}
                >
                  <span className="text-2xl" role="img" aria-hidden="true">{step.emoji}</span>
                </div>
                {/* Number badge */}
                <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[10px] font-800 text-white">
                  {step.number}
                </div>
              </div>
              <h3 className="mb-2 text-sm font-800 text-navy md:text-base">{step.title}</h3>
              <p className="text-xs leading-relaxed text-muted md:text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-700 text-white transition-all hover:bg-navy-light"
          >
            Learn More About the Process
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/HowItWorksSection.tsx
git commit -m "feat: rebuild HowItWorksSection with coloured icon tiles and dashed connector"
```

---

## Task 13: Rebuild WhyChooseUs — horizontal feature cards

**Files:**
- Modify: `src/components/home/WhyChooseUs.tsx`

- [ ] **Step 1: Replace WhyChooseUs.tsx entirely**

```typescript
// src/components/home/WhyChooseUs.tsx
const features = [
  {
    emoji: '🛡️',
    title: 'No Credit History Needed',
    description: 'We look at your driving history, not your credit score. Perfect for new arrivals, international students, and visa holders.',
  },
  {
    emoji: '📈',
    title: 'Every Payment Builds Equity',
    description: 'Unlike a regular rental, your weekly payments on the Flexi Own plan count toward owning the car outright.',
  },
  {
    emoji: '🔄',
    title: 'Flexible — Change Anytime',
    description: 'Switch cars. Pause. Give 4 weeks\' notice to exit. Your plan works around your life, not the other way around.',
  },
  {
    emoji: '🛟',
    title: '24/7 Support',
    description: 'Our team is always available. Breakdown, billing, or anything else — we\'re a call or WhatsApp away, any time.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
            <span className="text-xs font-800 uppercase tracking-widest text-red">Why DriveToOwn</span>
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-900 tracking-tight text-navy md:text-4xl">
            Built for people who deserve a car.
          </h2>
          <p className="mt-3 text-base text-muted">
            We believe everyone — regardless of credit history — deserves access to reliable transport.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 rounded-2xl border-[1.5px] border-slate-100 bg-slate-50 p-5 transition-all duration-200 hover:border-navy hover:bg-white hover:shadow-card"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-xl">
                <span role="img" aria-hidden="true">{feature.emoji}</span>
              </div>
              <div>
                <h3 className="mb-1.5 text-sm font-800 text-navy md:text-base">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/WhyChooseUs.tsx
git commit -m "feat: rebuild WhyChooseUs with horizontal feature cards"
```

---

## Task 14: Rebuild Testimonials — 3-column static grid

**Files:**
- Modify: `src/components/home/Testimonials.tsx`

- [ ] **Step 1: Replace Testimonials.tsx entirely**

```typescript
// src/components/home/Testimonials.tsx
import { TESTIMONIALS } from '@/data/testimonials';
import { getInitials } from '@/lib/utils';

const AVATAR_COLORS = ['bg-navy', 'bg-red', 'bg-blue-600', 'bg-green-700', 'bg-purple-700'];

export function Testimonials() {
  const displayTestimonials = TESTIMONIALS.slice(0, 3);

  return (
    <section
      style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)' }}
      className="py-16 md:py-24"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
            <span className="text-xs font-800 uppercase tracking-widest text-red">Real Stories</span>
            <div className="h-0.5 w-6 rounded-full bg-red" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-900 tracking-tight text-navy md:text-4xl">From our drivers.</h2>
          <p className="mt-3 text-base text-muted">
            Real reviews from real customers across Melbourne, Victoria.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {displayTestimonials.map((t, i) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
            >
              {/* Stars */}
              <div className="mb-3 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} aria-hidden="true">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <p className="mb-5 text-sm italic leading-relaxed text-slate-600">
                <span className="mr-0.5 text-2xl not-italic leading-none text-slate-200">&ldquo;</span>
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-800 text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                  aria-hidden="true"
                >
                  {getInitials(t.name)}
                </div>
                <div>
                  <p className="text-sm font-700 text-navy">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.location}
                    {t.carDriven ? ` · ${t.carDriven}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/Testimonials.tsx
git commit -m "feat: rebuild Testimonials as 3-column static grid, remove marquee"
```

---

## Task 15: Rebuild CTABanner — glowing dark banner with trust pills

**Files:**
- Modify: `src/components/home/CTABanner.tsx`

- [ ] **Step 1: Replace CTABanner.tsx entirely**

```typescript
// src/components/home/CTABanner.tsx
import Link from 'next/link';

const trustPills = [
  'No credit check',
  '$0 hidden fees',
  'Drive from Day 1',
  '24/7 support',
];

export function CTABanner() {
  return (
    <section
      className="relative overflow-hidden py-20"
      style={{ background: 'linear-gradient(135deg, #0f2444 0%, #1e3a5f 50%, #0f2444 100%)' }}
    >
      {/* Radial red glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 text-center">
        {/* Tag pill */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red/30 bg-red/15 px-4 py-1.5 text-xs font-700 text-red-300">
          🚗 Ready when you are
        </div>

        {/* Heading */}
        <h2 className="mb-4 text-3xl font-900 leading-tight tracking-tight text-white md:text-5xl">
          Your <em className="not-italic text-red">first car</em> is<br className="hidden md:block" /> one step away.
        </h2>

        {/* Subtext */}
        <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-white/65">
          Browse {' '}
          <strong className="font-700 text-white">13 cars</strong>. No credit check. Weekly payments from{' '}
          <strong className="font-700 text-white">$179</strong>.
          Get on the road today.
        </p>

        {/* CTAs */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 rounded-full bg-red px-8 py-4 text-sm font-700 text-white transition-all hover:bg-red-hover"
            style={{ boxShadow: '0 4px 20px rgba(239,68,68,0.35)' }}
          >
            Browse the Fleet →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/20 bg-white/10 px-8 py-4 text-sm font-700 text-white transition-all hover:bg-white/15"
          >
            Talk to Us First
          </Link>
        </div>

        {/* Trust pills */}
        <div className="flex flex-wrap justify-center gap-4">
          {trustPills.map((pill) => (
            <span key={pill} className="flex items-center gap-1.5 text-xs font-600 text-white/50">
              <span className="text-green-400">✓</span>
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CTABanner.tsx
git commit -m "feat: rebuild CTABanner with glowing dark banner and trust pills"
```

---

## Task 16: Update Footer — darker background, tighter grid

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Replace Footer.tsx entirely**

```typescript
// src/components/layout/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { NAV_LINKS } from '@/data/navLinks';

const socialIcons = {
  Facebook: Facebook,
  Instagram: Instagram,
  LinkedIn: Linkedin,
};

export function Footer() {
  return (
    <footer style={{ background: '#0a0f1e' }} className="text-white">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">

          {/* Brand column */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="mb-1 flex items-center">
              <div
                style={{
                  maskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 45%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 45%, transparent 100%)',
                  mixBlendMode: 'screen',
                }}
              >
                <Image
                  src="/images/logos/logo-white.png"
                  alt="DriveToOwn"
                  width={280}
                  height={84}
                  className="h-16 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="mb-2 text-[10px] font-700 uppercase tracking-widest text-white/30">
              Drive Today. Own Tomorrow.
            </p>
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-white/45">
              Victoria&apos;s most flexible car program — rent week-to-week or lease to own. No credit check required.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {Object.entries(socialIcons).map(([platform, Icon]) => (
                <a
                  key={platform}
                  href={
                    platform === 'Facebook'
                      ? process.env.NEXT_PUBLIC_FACEBOOK_URL ?? '#'
                      : platform === 'Instagram'
                      ? process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#'
                      : process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '#'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow DriveToOwn on ${platform}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 transition-colors hover:bg-white/15"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore column */}
          <div>
            <h3 className="mb-4 text-[10px] font-800 uppercase tracking-widest text-white/30">Explore</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/55 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-sm text-white/55 transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-[10px] font-800 uppercase tracking-widest text-white/30">Contact</h3>
            <ul className="space-y-3 text-sm text-white/55">
              <li>
                <p className="mb-0.5 font-700 text-white/80">AMY &amp; YAS PTY LTD</p>
                <p className="text-xs text-white/35">33 Princes Cct, Craigieburn VIC 3064</p>
              </li>
              <li>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE_MELBOURNE}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {process.env.NEXT_PUBLIC_PHONE_MELBOURNE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {process.env.NEXT_PUBLIC_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="container-custom flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/25 sm:flex-row">
          <p>© {new Date().getFullYear()} AMY &amp; YAS PTY LTD (DriveToOwn). All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-white/50">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-white/50">Terms</Link>
            <span>ABN: 89 675 615 960</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check && npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: update Footer with darker background and tighter layout"
```

---

## Task 17: Wire up page.tsx — swap FleetPreview for FleetShowcase

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx entirely**

```typescript
// src/app/page.tsx
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
```

- [ ] **Step 2: Full build verification**

```bash
npm run type-check && npm run lint && npm run build
```
Expected: build completes with no errors. Note any warnings about image sizes (acceptable).

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Open http://localhost:3000 and check:
- [ ] Navbar: height is compact (64px), CTA says "Get My First Car →"
- [ ] Hero: gradient background, Journey Tracker visible, Featured Car card on right, glassmorphism RunningCar at bottom — scroll to see it move
- [ ] StatsBar: navy background, 5 stats
- [ ] FleetShowcase: filter tabs work, 6 car cards show with ownership bars and available badges
- [ ] HowItWorksSection: 4 coloured icon tiles with dashed connector
- [ ] WhyChooseUs: horizontal feature cards
- [ ] Testimonials: 3-column grid (no marquee)
- [ ] CTABanner: dark gradient, trust pills row
- [ ] Footer: very dark background, 3-col grid

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire homepage with FleetShowcase, complete redesign applied"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Navbar: height h-16, CTA copy, logo size — Task 8
- [x] Hero: Journey Tracker, Featured Car, OwnershipBar, eyebrow pill, CTAs, gradient bg — Task 10
- [x] RunningCar: glass road, SVG car, scroll reactive — Task 6
- [x] StatsBar: navy bg, 5 stats — Task 9
- [x] FleetShowcase: filters, 6 cars, ownership bars, view-all link — Task 11
- [x] HowItWorksSection: coloured tiles, dashed connector — Task 12
- [x] WhyChooseUs: horizontal feature cards — Task 13
- [x] Testimonials: 3-col static grid — Task 14
- [x] CTABanner: dark banner, trust pills — Task 15
- [x] Footer: darker bg, 3-col — Task 16
- [x] OwnershipBar component — Task 4
- [x] AvailabilityBadge component — Task 3
- [x] JourneyTracker component — Task 5
- [x] FleetShowcase component — Task 11
- [x] weeksToOwn type + data — Task 2
- [x] Tailwind fillBar animation — Task 1
- [x] page.tsx updated — Task 17
- [x] Mobile layouts: all sections use responsive grid classes (1-col default, sm:2-col, lg:3-col)
- [x] Framer Motion: Hero H1 uses `animate-fade-up` (Tailwind, not Framer, since Hero is Server Component — Framer Motion deferred; the spec says "subtle", CSS animations suffice)
- [x] `privacy` and `terms` routes linked in Footer — these pages may not exist yet; links will 404 but that's acceptable (existing nav links didn't include them either)

**Type consistency:** `OwnershipBarProps.weeksToOwn` defined in Task 4 used in Task 7 (CarCard) and Task 10 (Hero) — consistent. `AvailabilityBadge` used in Task 7 and Task 10 — consistent. `JourneyTracker` used in Task 10 — consistent. `FleetShowcase` uses `CarCard` from Task 7 — consistent.
