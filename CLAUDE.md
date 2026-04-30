# CLAUDE.md — Rent-to-Own Car Platform
## Master Development Documentation for Claude Code

> **Project codename:** DriveToOwn
> **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase · Resend
> **Target market:** Australia (Perth & Melbourne)
> **Purpose:** Rent-to-own car service for rideshare drivers, international students, and visa holders
> **Always read this file before making any changes.**

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Environment Variables](#4-environment-variables)
5. [Data Models & TypeScript Types](#5-data-models--typescript-types)
6. [Build Status](#6-build-status)
7. [Component Library Rules](#7-component-library-rules)
8. [Design System](#8-design-system)
9. [API Routes Reference](#9-api-routes-reference)
10. [Database Schema](#10-database-schema-supabase)
11. [Coding Standards](#11-coding-standards)
12. [Git Workflow](#12-git-workflow)
13. [Deployment](#13-deployment)
14. [Common Commands](#14-common-commands)

---

## 1. PROJECT OVERVIEW

### What This Is
A production-grade website for an Australian rent-to-own car business targeting:
- Rideshare drivers (Uber, DiDi, Ola)
- International students on visas
- People with no credit history who cannot get traditional car finance

### Core Value Proposition
> "Drive today. Own tomorrow." — Weekly payments go toward full car ownership. No credit check. Rideshare-approved fleet.

### Business Rules (Never Get These Wrong)
- Weekly payments charged every **Wednesday night** for the following Mon–Sun
- Minimum subscription: **26 weeks** with 4 weeks' notice to exit
- Joining fee: **$900 excl. GST** (non-refundable; must be paid again if contract broken)
- Weekly km allowance: **1,000 km/week** on Flexi; **2,000 km/week** on Flexi Own
- Late payment fee: **$40**
- Dishonoured direct debit fee: **$40**
- Operating states: **WA (Perth)** and **VIC (Melbourne)** only
- All prices shown **include GST** on public pages
- GPS included in every car
- All cars are **5-star ANCAP rated**

### Fleet & Pricing (Source of Truth — Use These Numbers Everywhere)
| Car | Weekly Price | Seats | Fuel |
|-----|-------------|-------|------|
| Kia Cerato | $179/wk | 5 | 5.5L/100km |
| Toyota Corolla | $199/wk | 5 | 6.0L/100km |
| Honda City | $189/wk | 5 | 6.3L/100km |
| Corolla Hybrid | $219/wk | 5 | 3.6L/100km |
| Hyundai i30 | $229/wk | 5 | 6.8L/100km |
| Toyota RAV4 | $229/wk | 5 | 6.0L/100km |
| Toyota Camry | $239/wk | 5 | 6.8L/100km |
| Toyota Prius | $239/wk | 5 | 3.4L/100km |
| Mitsubishi Outlander | $239/wk | 7 | 7.7L/100km |
| Toyota Camry Hybrid | $259/wk | 5 | 4.2L/100km |
| Toyota Prius V | $269/wk | 7 | 4.4L/100km |
| Honda Civic | $319/wk | 5 | 6.3L/100km |
| Toyota RAV4 Hybrid | $359/wk | 5 | 4.7L/100km |

---

## 2. TECH STACK

```
Frontend:    Next.js 14 (App Router)   — SEO, RSC, server actions
Language:    TypeScript (strict mode)
Styling:     Tailwind CSS v3
Animation:   Framer Motion
Forms:       React Hook Form + Zod
Email:       Resend + React Email
CMS (Blog):  Contentlayer + MDX        — Stage 2
Database:    Supabase (PostgreSQL)     — Stage 2+
Auth:        Supabase Auth             — Stage 3
Payments:    Stripe                   — Stage 3
Hosting:     Vercel
Analytics:   Vercel Analytics
Icons:       Lucide React
SEO:         Next.js Metadata API
```

---

## 3. FOLDER STRUCTURE

```
drivetoown/
├── public/images/
│   ├── cars/          ← WebP car photos (camry.webp, corolla.webp, etc.)
│   ├── hero/          ← hero-car.webp
│   └── logos/         ← logo.svg, logo-white.svg, logo-icon.svg
│
└── src/
    ├── app/
    │   ├── layout.tsx / page.tsx / globals.css
    │   ├── fleet/            ← /fleet
    │   ├── how-it-works/     ← /how-it-works
    │   ├── faq/              ← /faq
    │   ├── about/            ← /about
    │   ├── contact/          ← /contact
    │   ├── quote/            ← /quote (Stage 2)
    │   ├── blog/[slug]/      ← /blog (Stage 2)
    │   ├── portal/           ← /portal/* (Stage 3, auth required)
    │   ├── admin/            ← /admin/* (Stage 3, admin role)
    │   └── api/
    │       ├── contact/route.ts
    │       ├── quote/route.ts
    │       ├── leads/route.ts
    │       └── revalidate/route.ts
    │
    ├── components/
    │   ├── layout/    ← Navbar.tsx, Footer.tsx, WhatsAppButton.tsx
    │   ├── home/      ← Hero, StatsBar, WhyChooseUs, FleetPreview, HowItWorksSection, Testimonials, CTABanner
    │   ├── fleet/     ← CarCard, FleetGrid, CarFilter, CarModal
    │   ├── contact/   ← ContactForm, MapEmbed
    │   ├── quote/     ← QuoteCalculator, PlanSelector, QuoteSummary (Stage 2)
    │   ├── blog/      ← BlogCard, BlogGrid, BlogHeader, TableOfContents (Stage 2)
    │   ├── portal/    ← PortalSidebar, ContractStatus, PaymentHistory, SupportTicket (Stage 3)
    │   └── ui/        ← Button, Badge, Card, Accordion, Modal, Skeleton, Input, Select, Textarea, PageHeader, SectionWrapper
    │
    ├── data/          ← cars.ts, faqs.ts, testimonials.ts, plans.ts, navLinks.ts, socialLinks.ts
    ├── lib/           ← utils.ts, resend.ts, supabase/client.ts, supabase/server.ts, validations/, metadata.ts
    ├── hooks/         ← useScrollAnimation.ts, useCarFilter.ts, useQuoteCalc.ts, useMediaQuery.ts
    └── types/         ← car.ts, plan.ts, faq.ts, testimonial.ts, blog.ts, database.ts
```

---

## 4. ENVIRONMENT VARIABLES

```bash
# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="DriveToOwn"

# Business Contact
NEXT_PUBLIC_PHONE_PERTH=+61450555557
NEXT_PUBLIC_PHONE_MELBOURNE=+61455445285
NEXT_PUBLIC_EMAIL=hello@drivetoown.com.au
NEXT_PUBLIC_ADDRESS_PERTH="2/73-75 Poole St, Welshpool WA 6106"
NEXT_PUBLIC_WHATSAPP_NUMBER=61450555557

# Social Media
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yourpage
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourhandle
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/yourcompany

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@drivetoown.com.au
RESEND_TO_EMAIL=enquiries@drivetoown.com.au

# Supabase — Stage 2+
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyxxxxxxxxxxxx

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaxxxxxxxxxxxx

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Stripe — Stage 3
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
```

### Rules
- `NEXT_PUBLIC_*` is exposed to the browser — NEVER put secrets here
- Never hardcode phone numbers, emails, or URLs in components — always use `process.env.NEXT_PUBLIC_*`
- After adding a new env var, update `.env.example` with a placeholder

---

## 5. DATA MODELS & TYPESCRIPT TYPES

### src/types/car.ts
```typescript
export type CarType = 'sedan' | 'suv' | 'hatchback' | 'hybrid' | 'wagon';
export type FuelType = 'petrol' | 'hybrid' | 'electric';

export interface CarSpec {
  seats: number;
  fuelConsumption: string;   // e.g. "6.8L/100km"
  ancapRating: number;       // always 5
  mileagePerLitre?: string;
  transmission?: string;
}

export interface Car {
  id: string;                // slug e.g. "toyota-camry"
  name: string;
  weeklyPrice: number;       // e.g. 239
  type: CarType;
  fuelType: FuelType;
  spec: CarSpec;
  imageSrc: string;          // e.g. "/images/cars/camry.webp"
  imageAlt: string;
  shortDescription: string;
  longDescription: string;
  equipped: string[];
  isPopular?: boolean;
  isAvailable?: boolean;     // default true; Stage 3: from DB
}
```

### src/types/plan.ts
```typescript
export type PlanType = 'flexi' | 'flexi-own';

export interface Plan {
  id: PlanType;
  name: string;
  tagline: string;
  weeklyPriceFrom: number;
  joiningFee: number;
  kmAllowance: number;
  excessKmRate: number;      // cost per extra km in cents
  minimumWeeks: number;
  noticePeriodWeeks: number;
  features: string[];
  isRecommended?: boolean;
}
```

### src/types/faq.ts
```typescript
export type FAQCategory = 'general' | 'car' | 'fees';

export interface FAQ {
  id: string;
  question: string;
  answer: string;            // can contain markdown for links
  category: FAQCategory;
}
```

### src/types/testimonial.ts
```typescript
export interface Testimonial {
  id: string;
  name: string;
  location: string;          // e.g. "Perth, WA"
  rating: number;            // 1-5
  text: string;
  avatarSrc?: string;
  date?: string;
  carDriven?: string;
}
```

---

## 6. BUILD STATUS

| Stage | Scope | Status |
|-------|-------|--------|
| Stage 1 | Marketing site (Home, Fleet, How It Works, FAQ, About, Contact + SEO) | In progress |
| Stage 2 | Quote calculator + MDX blog | Not started |
| Stage 3 | Driver portal + Admin panel + Stripe payments | Not started |

**Stage 2 scope:** Interactive quote calculator at `/quote` (car selector → plan toggle → contract length slider → live cost breakdown). MDX blog via Contentlayer with 5 seed posts.

**Stage 3 scope:** Supabase Auth, middleware protecting `/portal/*` and `/admin/*`, driver dashboard (contract progress, payments, support tickets), admin panel (leads, fleet availability, contracts).

---

## 7. COMPONENT LIBRARY RULES

These rules apply to every component. Do not deviate.

```
GENERAL:
- TypeScript with explicit prop interfaces; export interface alongside component
- Default export for component, named export for interface
- 'use client' ONLY when component needs browser APIs or React hooks
- Server Components by default
- Never use React.FC<Props> — use function ComponentName(props: Props)
- No hardcoded strings in JSX — use props or data files

STYLING:
- All styles via Tailwind — no inline styles, no CSS modules
- Use cn() for conditional classes
- Never use arbitrary Tailwind color values — use design token names
- Always mobile-first (sm: md: lg: xl: prefixes)
- Tailwind transitions for simple animations; Framer Motion for complex

ACCESSIBILITY:
- All images need descriptive alt text — never alt=""
- Icon-only buttons need aria-label
- Forms need proper label associations (htmlFor + id)
- Focus styles must be visible
- Never convey meaning with color alone

IMAGES:
- Always next/image — never <img>
- Always provide width/height OR fill with positioned parent
- sizes="(max-width: 768px) 100vw, 50vw"
- Add priority only to above-the-fold images

LINKS:
- Internal: next/link — never <a> for internal navigation
- External: <a target="_blank" rel="noopener noreferrer">
- Never href="#"
```

---

## 8. DESIGN SYSTEM

### Colors (use token names, not hex)
```
navy       → #0F2444  (primary background, CTAs)
navy-light → #1A365D  (hover states, footer)
red        → #DC2626  (accent, CTAs, prices, active states)
red-hover  → #B91C1C
sky        → #EFF6FF  (light section backgrounds)
sky-mid    → #DBEAFE  (card hover backgrounds)
text       → #1E293B  (body text)
muted      → #64748B  (secondary text)
border     → #E2E8F0
success    → #16A34A
warning    → #D97706
error      → #DC2626
```

### Typography
```
Display:    text-5xl md:text-7xl font-extrabold tracking-tight
H1:         text-4xl md:text-5xl font-bold
H2:         text-3xl md:text-4xl font-bold
H3:         text-2xl font-semibold
H4:         text-xl font-semibold
Body Large: text-lg text-muted leading-relaxed
Body:       text-base text-text leading-relaxed
Small:      text-sm text-muted
Caption:    text-xs text-muted uppercase tracking-wider
```

### Spacing & Shadows
```
Section padding:    py-16 md:py-24  /  px-4 sm:px-6 lg:px-8
Card padding:       p-6
Grid gap:           gap-6 md:gap-8
Max width:          max-w-7xl  (narrow content: max-w-3xl)

shadow-card:        0 4px 24px rgba(15,36,68,0.08)
shadow-card-hover:  0 8px 40px rgba(15,36,68,0.16)
shadow-modal:       0 25px 50px rgba(0,0,0,0.25)
```

---

## 9. API ROUTES REFERENCE

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/contact | None | Submit contact enquiry |
| POST | /api/quote | None | Calculate quote |
| POST | /api/leads | Service Role | Save lead to Supabase |
| POST | /api/revalidate | Secret token | ISR revalidation webhook |
| GET | /api/health | None | Health check |

```typescript
// /api/contact response shape
{ success: true, message: "Your enquiry has been submitted." }
{ success: false, error: "VALIDATION_ERROR" | "RATE_LIMITED" | "SERVER_ERROR" }
```

---

## 10. DATABASE SCHEMA (SUPABASE)

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT CHECK (city IN ('Perth', 'Melbourne')),
  car_interest TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','converted','rejected')),
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE drivers (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  license_number TEXT,
  role TEXT DEFAULT 'driver' CHECK (role IN ('driver','admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cars (
  id TEXT PRIMARY KEY,               -- slug e.g. 'toyota-camry'
  name TEXT NOT NULL,
  weekly_price INTEGER NOT NULL,     -- in cents e.g. 23900
  type TEXT,
  fuel_type TEXT,
  seats INTEGER,
  status TEXT DEFAULT 'available' CHECK (status IN ('available','rented','maintenance')),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contracts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES drivers(id),
  car_id TEXT REFERENCES cars(id),
  plan_type TEXT CHECK (plan_type IN ('flexi','flexi-own')),
  start_date DATE NOT NULL,
  end_date DATE,
  weekly_price INTEGER,              -- in cents at time of signing
  joining_fee INTEGER,               -- in cents
  status TEXT DEFAULT 'active' CHECK (status IN ('active','completed','terminated')),
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_id UUID REFERENCES contracts(id),
  amount INTEGER NOT NULL,           -- in cents
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','failed','refunded')),
  stripe_payment_id TEXT,
  charged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES drivers(id),
  contract_id UUID REFERENCES contracts(id),
  category TEXT CHECK (category IN ('breakdown','billing','car','other')),
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open','in-progress','resolved','closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "drivers_own_data" ON drivers FOR ALL USING (auth.uid() = id);
CREATE POLICY "drivers_own_contracts" ON contracts FOR SELECT USING (auth.uid() = driver_id);
CREATE POLICY "drivers_own_payments" ON payments FOR SELECT
  USING (contract_id IN (SELECT id FROM contracts WHERE driver_id = auth.uid()));
CREATE POLICY "drivers_own_tickets" ON support_tickets FOR ALL USING (auth.uid() = driver_id);
CREATE POLICY "admin_all_leads" ON leads FOR ALL
  USING (EXISTS (SELECT 1 FROM drivers WHERE id = auth.uid() AND role = 'admin'));
```

---

## 11. CODING STANDARDS

### File Naming
```
Components:  PascalCase  → CarCard.tsx
Pages:       lowercase   → page.tsx, layout.tsx
Hooks:       camelCase   → useCarFilter.ts
Data/Types:  camelCase   → cars.ts, car.ts
API routes:  lowercase   → route.ts
```

### Import Order
```typescript
// 1. React / Next.js
// 2. Third-party (framer-motion, lucide-react)
// 3. Internal types
// 4. Internal data
// 5. Internal lib/hooks
// 6. Internal components
```

### Error Handling & Comments
```typescript
// API routes: always return typed responses; never expose stack traces
// Always: console.error('[api/contact]', error) server-side
// Validate all inputs with Zod before processing
// Use comments to explain WHY, not WHAT
// Mark business logic: // BUSINESS RULE: Late payment fee is $40
```

---

## 12. GIT WORKFLOW

```
main       → production (Vercel auto-deploys)
develop    → staging
feature/*  → new features → merge into develop
fix/*      → bug fixes
```

Commit format (Conventional Commits): `feat:` `fix:` `chore:` `docs:` `style:` `refactor:` `test:`

Before every commit:
```bash
npm run lint && npm run type-check && npm run build
```

---

## 13. DEPLOYMENT

```bash
git push origin main    # Vercel auto-deploys

# After each deploy, verify:
# 1. All pages load
# 2. Contact form sends email
# 3. Mobile nav works
# 4. Lighthouse 90+ on all metrics
# 5. sitemap.xml accessible
```

---

## 14. COMMON COMMANDS

```bash
npm run dev          # Start dev server http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npm run lint:fix     # Auto-fix ESLint
npm run type-check   # TypeScript check (no emit)
npm run format       # Prettier

# Stage 2
npm run contentlayer  # Generate content types

# Stage 2+ (Supabase)
npx supabase db diff
npx supabase db push

# Sitemap
npm run postbuild     # Generates sitemap via next-sitemap
```

---

*Last updated: April 2026 — Update this document whenever business rules or project structure change.*
