# DriveToOwn — Homepage Redesign Design Spec
**Date:** 2026-04-29  
**Status:** Approved by user  
**Scope:** Full homepage + shared layout components (Navbar, Footer, CarCard, StatsBar)  
**Style:** Bright & Empowering (Style B) — light, airy, navy/red, futuristic, user-friendly  
**Layout:** Journey Hero + Prominent Fleet Section (Layout B)

---

## 1. Design Direction

### Core Brief
> "Futuristic, innovative, unique, user-friendly. Communicates: we help you get your first car. Cars are the MVP — the main product to market."

### Visual Identity (preserved, enhanced)
- **Primary:** `#0f2444` navy, `#ef4444` red
- **Accent:** `#4f46e5` indigo (new — used for eyebrows, journey tracker, filter active states)
- **Success:** `#22c55e` green (ownership progress, available badges)
- **Background:** `#f8faff` / `#eff6ff` / `#e0e7ff` gradient washes — replaces flat white sections
- **Typography:** No change to font family — weight and sizing hierarchy upgraded throughout

### Two Standout Innovations
1. **Ownership Progress Bar** on every car card — each card shows "104 weeks to own" with a fill bar, turning a rental product into an ownership journey. Directly addresses the "first car" messaging.
2. **Journey Tracker in the Hero** — a 4-step tracker (Apply → Pick Your Car → Drive → Own It) embedded in the hero section. Visitors immediately see where they are in the journey, making the product feel guided and achievable.

---

## 2. Architecture — What Changes

### Components to rebuild (replace existing files)
| File | Change |
|------|--------|
| `src/components/layout/Navbar.tsx` | New CTA copy ("Get My First Car →"), tighter height (64px), indigo active underline |
| `src/components/layout/Footer.tsx` | Darker bg (`#0a0f1e`), tighter 3-col grid, tagline prominent |
| `src/components/home/Hero.tsx` | Full rebuild — Journey Tracker + Featured Car showcase card |
| `src/components/home/StatsBar.tsx` | Dark navy bg, 5 stats (add "From $179/wk"), no icons needed |
| `src/components/home/WhyChooseUs.tsx` | Horizontal feature cards (icon block + text), replace 2×2 grid |
| `src/components/home/HowItWorksSection.tsx` | Coloured icon tiles (4 bg variants), dashed connector line |
| `src/components/home/Testimonials.tsx` | Replace infinite scroll with 3-column static grid |
| `src/components/home/CTABanner.tsx` | Glowing dark banner with trust pills row |
| `src/components/fleet/CarCard.tsx` | Add ownership progress bar + availability badge + type tag |

### New components to create
| File | Purpose |
|------|---------|
| `src/components/home/FleetShowcase.tsx` | Replaces `FleetPreview` — filterable fleet grid on homepage with filter tabs |
| `src/components/home/JourneyTracker.tsx` | Reusable 4-step ownership journey tracker (used in Hero, potentially How It Works) |
| `src/components/fleet/OwnershipBar.tsx` | Reusable ownership progress bar (used in CarCard and Hero featured card) |
| `src/components/fleet/AvailabilityBadge.tsx` | Green pulsing dot + "Available Now" badge |

### Homepage page.tsx — section order
```
Navbar
Hero                    ← Journey Tracker + Featured Car Card
StatsBar                ← dark navy
FleetShowcase           ← NEW — replaces FleetPreview, filterable grid
HowItWorksSection       ← rebuilt
WhyChooseUs             ← rebuilt
Testimonials            ← rebuilt
CTABanner               ← rebuilt
Footer
WhatsAppButton          ← unchanged
```

---

## 3. Section-by-Section Spec

### 3.1 Navbar
- Height: `h-16` (64px) — reduced from current `h-28/h-32`
- Logo: keep existing, reduce to `h-10`
- CTA button copy: **"Get My First Car →"** (was "Get In Touch")
- Active link: `text-red` + `after:bg-red` underline (consistent with brand — was indigo in mockup, corrected)
- Scroll behaviour: unchanged (white/shadow on scroll)

### 3.2 Hero
**Layout:** 2-column grid — left: text + Journey Tracker + CTAs; right: Featured Car showcase card

**Left column:**
- Eyebrow pill: pulsing indigo dot + "Victoria's #1 First-Car Program"
- H1: "Your first car starts **right here.**" — "right here" in `text-red`
- Subtext: "No credit check. No stress. **Weekly payments from $179** that go toward owning the car outright."
- **Journey Tracker** (`JourneyTracker` component) — white card, 4 steps: Apply (✓ done/green), Pick Your Car (active/navy), Drive (upcoming/grey), Own It (🔑 upcoming/grey). Connectors: green between done steps, grey for upcoming.
- CTAs: "Browse Our Fleet →" (navy pill, shadow) + "▶ How It Works" (ghost, white bg)

**Right column — Featured Car Card:**
- "⭐ Most Popular This Week" red badge pinned above card
- Pulsing green "Available Now" indicator
- Car emoji placeholder (replaced by `next/image` in implementation)
- Car name, type tag, price (`$259/wk incl. GST`)
- **OwnershipBar** — "🏁 Ownership Progress" with animated fill bar + "34 of 104 weeks paid — you're building equity"
- 3-spec row: fuel consumption, ANCAP rating, credit check cost
- "Book This Car →" navy CTA
- Dot pagination (4 dots) — **v1: static visual only, no carousel behaviour** (cycling is out of scope)

**Background:** `linear-gradient(135deg, #eff6ff, #e0e7ff, #dbeafe)` with two decorative radial blurs (indigo top-right, red bottom-left)

### 3.3 Trust/Stats Bar
- Background: `bg-[#0f2444]` (navy, not red)
- 5 stats: `500+ Happy Drivers` · `13 Cars Available` · `$0 Credit Check` · `10+ Yrs Experience` · `$179 From Per Week`
- Dividers: `bg-white/10` 1px vertical lines
- No icons — numbers carry the weight

### 3.4 Fleet Showcase (new section, replaces FleetPreview)
**This is the primary product section — treat it as the centrepiece.**

- Section eyebrow: "Our Fleet" with red lines either side
- H2: "Pick your car. Start your journey."
- Subtext: "Every car includes GPS, 5-star ANCAP safety, and a clear path to ownership."

**Filter tabs** (client component, `useState`):
- All Cars · Sedans · SUVs · Hybrids 🌿 · Under $200
- Active tab: `bg-navy text-white` rounded pill; inactive: white with navy border on hover
- Filter logic: maps `car.type` and `car.weeklyPrice < 200` — no API call needed

**Car Grid:** `grid-template-columns: repeat(3, 1fr)` with `gap-5`
- On tablet: 2 columns. On mobile: 1 column.

**Updated CarCard** (each card gets):
1. `badge-popular` (red, for `car.isPopular`) + `AvailabilityBadge` (pulsing green dot, top-left)
2. Car image — `object-contain` on gradient bg (preserve existing)
3. Car name (bold, navy) + type tag (uppercase muted)
4. Price row — large red price, muted "/week incl. GST"
5. Specs row — fuel consumption + ANCAP
6. **OwnershipBar** — grey bg track, indigo-to-navy gradient fill, label shows weeks to own, hint text per car
7. CTA: "Book This Car →" — navy for standard, `bg-gradient-to-r from-red-500 to-red-600` for `isPopular`

**Homepage shows 6 cars** (first 6 from `cars.ts` sorted by `isPopular` first). "View All 13 Cars →" link below grid.

### 3.5 How It Works
- Background: `linear-gradient(135deg, #f8faff, #f0f4ff)`
- 4-step horizontal grid (unchanged structure)
- Icon tiles: 64px rounded-2xl, each with a distinct pastel bg:
  - Step 1 (Search): `from-blue-100 to-blue-200` 🔍
  - Step 2 (Docs): `from-pink-100 to-pink-200` 📋
  - Step 3 (Drive): `from-green-100 to-green-200` 🚗
  - Step 4 (Own): `from-yellow-100 to-yellow-200` 🔑
- Step number: navy circle badge top-right of icon tile
- Connector: dashed line `repeating-linear-gradient` — softer than solid
- Box shadow on icon tiles: `shadow-card`

### 3.6 Why Choose Us
- Background: `bg-white`
- 2×2 grid of horizontal feature cards (replace current vertical icon cards)
- Each card: `flex gap-4` — left: 44px navy rounded-xl icon; right: title + description
- Hover: `border-navy bg-white shadow-card` (was just shadow)
- Copy unchanged from current `features` array

### 3.7 Testimonials
- Background: `linear-gradient(135deg, #f8faff, #f0f4ff)`
- Replace infinite-scroll marquee with **3-column static grid**
- Each card: white bg, `shadow-card`, `border border-slate-100`
- Stars: emoji ⭐ row (replaces Lucide Star)
- Quote: italic, `text-slate-600`, opening `"` in large light grey
- Author: coloured avatar circle (initials) + name + "Location · Car Driven"
- Show 3 testimonials on homepage (top 3 from data)

### 3.8 CTA Banner
- Background: `linear-gradient(135deg, #0f2444, #1e3a5f)` with radial red glow behind heading
- Tag pill: `bg-red/15 border-red/30 text-red-300` — "🚗 Ready when you are"
- H2: "Your **first car** is one step away." — "first car" in `text-red`
- Subtext: "Browse 13 cars. No credit check. Weekly payments from $179."
- Primary CTA: red button with `shadow-[0_4px_20px_rgba(239,68,68,.35)]`
- Secondary CTA: ghost white border
- Trust pills row: ✓ No credit check · ✓ $0 hidden fees · ✓ Drive from Day 1 · ✓ 24/7 support

### 3.9 Footer
- Background: `#0a0f1e` (darker than current navy)
- 3-column grid: Brand (1.5fr) · Explore (1fr) · Contact (1fr)
- Brand column: logo → tagline → description → social icons (rounded-lg, not rounded-full)
- Bottom bar: copyright left · "Privacy · Terms" right
- No change to link structure

---

## 4. OwnershipBar Component

```typescript
// src/components/fleet/OwnershipBar.tsx
export interface OwnershipBarProps {
  weeksToOwn: number;       // e.g. 104
  weeksPaid?: number;       // optional — for portal/logged-in state; 0 on public pages
  hintText?: string;        // optional custom hint below bar
}
```

- Bar fill: `width: (weeksPaid / weeksToOwn) * 100)%` — defaults to 0% on public pages (animates in via CSS)
- Fill gradient: `from-[#0f2444] to-[#4f46e5]`
- Label: "🏁 Path to ownership" left · "{weeksToOwn} wks" right
- Hint text below bar: muted, 9–10px
- On public CarCard: `weeksPaid = 0`, hint = car's short description benefit line

**Data requirement:** The `Car` type in `src/types/car.ts` does not currently have a `weeksToOwn` field. This must be added:
```typescript
// Add to Car interface in src/types/car.ts
weeksToOwn?: number;   // e.g. 104 — weeks of Flexi Own payments to reach ownership
```
And each car entry in `src/data/cars.ts` must have this value set (all are 104 weeks based on standard Flexi Own contract length). The implementation plan must include this data migration step first.

---

## 5. JourneyTracker Component

```typescript
// src/components/home/JourneyTracker.tsx
export interface JourneyStep {
  label: string;
  status: 'done' | 'active' | 'upcoming';
  icon?: string;            // emoji or step number
}
```

- Default steps defined in component (not props-driven on homepage)
- White card wrapper with `shadow-card rounded-2xl p-4`
- Circle states: done = green bg ✓; active = navy bg with ring; upcoming = slate-100 bg
- Connector states: done = `bg-green-400`; upcoming = `bg-slate-200`
- Responsive: collapses to 2×2 on mobile

---

## 6. Animation Strategy (Framer Motion — currently unused)

Framer Motion is already installed. These are the only animations to add — keep it subtle:

| Element | Animation |
|---------|-----------|
| Hero H1 | `fadeInUp` on mount, 0.4s |
| Journey Tracker | `fadeIn` stagger on step circles, 0.1s each |
| Car cards | `fadeInUp` stagger on scroll enter, 0.08s each |
| Ownership bar fill | CSS `animation: fillBar 1.5s ease forwards` (no Framer needed) |
| Stats bar numbers | CSS counter animation via `@keyframes` |
| Pulsing dots (available, eyebrow) | CSS `@keyframes pulse` |

No parallax. No scroll-jacking. Keep it fast and accessible.

---

## 7. Mobile Behaviour

| Section | Mobile layout |
|---------|--------------|
| Navbar | Hamburger (unchanged logic) |
| Hero | Stack vertically — text first, Featured Car card second |
| Fleet Showcase | Filter tabs wrap; 1-col grid |
| How It Works | 2×2 grid (not 1×4) |
| Why Choose Us | 1-col stack |
| Testimonials | 1-col stack, show 2 cards |
| CTA Banner | Stack buttons vertically |

---

## 8. What Does NOT Change

- All business rules (prices, fees, km limits) — see CLAUDE.md
- TypeScript types in `src/types/`
- Data files in `src/data/` — `cars.ts`, `testimonials.ts`, etc.
- API routes
- `/fleet`, `/how-it-works`, `/contact`, `/faq`, `/about` page content
- Auth, portal, admin sections
- Accessibility rules (alt text, aria-labels, focus styles)
- SEO metadata

---

## 10. RunningCar Animation — Redesigned (Glassmorphism Floating Road)

**Decision:** Rebuild `RunningCar.tsx` using Style B — a frosted-glass pill road that floats inside the Hero section, between the hero text/card and the StatsBar. The car is a pure SVG sedan (no image dependency). Scroll-reactive behaviour is preserved.

### Placement
- **Position:** Inside the Hero section as the bottom strip — `position: relative`, not fixed to viewport
- Renders between the hero grid and the section end, above the navy StatsBar
- Full width, `height: 80px`

### Visual Design
```
┌────────────────────────────────────────────────────────────────────┐
│  Hero gradient background (#eff6ff → #dbeafe)                      │
│                                                                     │
│  ┌────────── frosted glass pill road (left: 40px, right: 40px) ──┐ │
│  │  - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   │ │
│  └───────────────────────────────────────────────────────────────┘ │
│           🚗 SVG car drives along the glass road                   │
└────────────────────────────────────────────────────────────────────┘
```

**Glass road pill:**
- `background: rgba(255,255,255,0.25)` + `backdrop-filter: blur(12px)`
- `border: 1px solid rgba(255,255,255,0.5)`
- `border-radius: 100px` (full pill shape)
- `box-shadow: 0 4px 20px rgba(15,36,68,0.1), inset 0 1px 0 rgba(255,255,255,0.6)`
- Inner dashes: `rgba(15,36,68,0.2)`, 30px wide, animated left with CSS
- Left/right fade masks: `rgba(255,255,255,0.6)` gradient overlays

**SVG Car (replaces image entirely):**
- Navy sedan silhouette (`#0f2444` body, `#1a365d` roof)
- Blue-tinted window (`#bfdbfe`, 80% opacity)
- Red accent stripe along bottom (`#ef4444`)
- Proper wheel circles with hub detail (dark navy/slate tones)
- Width: `110px`, Height: `48px`
- No external image needed — fully self-contained

**Scroll behaviour (preserved from original):**
- Car moves in scroll direction (`delta * 1.2` multiplier)
- Wraps screen edges (off right → reappears from left, and vice versa)
- Motion blur: `filter: blur(${blurPx}px)` on SVG, capped at 2px
- Speed streaks: white gradient lines behind car, opacity tied to `speed`
- Headlight glow: yellow cone `clip-path: polygon(...)` ahead of car
- Brake light glow: red blur behind car, fades in 180ms after scroll stops
- Ground shadow: blurred ellipse below car
- Road dashes: animate opposite to scroll direction

**Accessibility:** `aria-hidden="true"` on entire component — decorative only.

**Tailwind note:** `backdrop-filter` utilities are in Tailwind v3 (`backdrop-blur-md`). No extra config needed.

---

## 9. File Change Summary

**Modified (10):**
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/RunningCar.tsx` ← rebuilt (glass road + SVG car)
- `src/components/home/Hero.tsx`
- `src/components/home/StatsBar.tsx`
- `src/components/home/WhyChooseUs.tsx`
- `src/components/home/HowItWorksSection.tsx`
- `src/components/home/Testimonials.tsx`
- `src/components/home/CTABanner.tsx`
- `src/components/fleet/CarCard.tsx`

**Created (4):**
- `src/components/home/FleetShowcase.tsx`
- `src/components/home/JourneyTracker.tsx`
- `src/components/fleet/OwnershipBar.tsx`
- `src/components/fleet/AvailabilityBadge.tsx`

**Modified (1):**
- `src/app/page.tsx` — swap `FleetPreview` for `FleetShowcase`

**Total: 15 files**
