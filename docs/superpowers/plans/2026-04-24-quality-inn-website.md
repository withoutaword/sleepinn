# Quality Inn Sandusky Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, high-conversion hotel website for Quality Inn Sandusky that drives phone calls for 15% direct booking discount and redirects to Booking.com.

**Architecture:** Next.js 14+ App Router with static export. Single `page.tsx` composes isolated section components. Tailwind CSS v4 for styling, Lucide React for icons. No backend, no auth, no CMS.

**Tech Stack:** Next.js 14+, Tailwind CSS v4, Lucide React, Inter font (Google Fonts), Vercel static export

---

## File Structure

```
src/
  app/
    layout.tsx              # Root layout: Inter font, metadata, JSON-LD
    page.tsx                # Main page composing all sections
    globals.css             # Tailwind imports
  components/
    sections/
      Header.tsx            # Sticky nav with mobile hamburger
      Hero.tsx              # Full-width hero with search bar
      Amenities.tsx         # 6-item icon grid
      Rooms.tsx             # Room type cards
      CedarPointGuide.tsx   # SEO content section
      Reviews.tsx           # Testimonial cards
      Location.tsx          # Map embed + directions
      Footer.tsx            # Dark footer with CTAs
    ui/
      Button.tsx            # Reusable button (solid/outline variants)
      SectionHeading.tsx    # Consistent section title
      MobileBottomBar.tsx   # Sticky phone CTA for mobile
  lib/
    constants.ts            # Phone number, Booking URL, address, distances
```

---

## Task 1: Project Setup

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/lib/constants.ts`

- [ ] **Step 1: Initialize Next.js project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

- [ ] **Step 2: Install Lucide React**

```bash
npm install lucide-react
```

- [ ] **Step 3: Create constants file**

Create `src/lib/constants.ts`:

```typescript
export const HOTEL_NAME = "Quality Inn Sandusky";
export const PHONE_NUMBER = "+14195040035";
export const PHONE_DISPLAY = "(419) 555-1234";
export const BOOKING_URL = "https://www.booking.com/hotel/us/quality-inn-sandusky.html";
export const ADDRESS = {
  street: "Milan Road",
  city: "Sandusky",
  state: "OH",
  zip: "44870",
  full: "Milan Road, Sandusky, OH 44870",
};
export const DISTANCES = {
  cedarPoint: { label: "Cedar Point", time: "10 min", miles: "5 miles" },
  kalahari: { label: "Kalahari", time: "15 min" },
  lakeErie: { label: "Lake Erie Shores", time: "5 min" },
};
export const NAV_LINKS = [
  { label: "Rooms", href: "#rooms" },
  { label: "Cedar Point Guide", href: "#cedar-point-guide" },
  { label: "Amenities", href: "#amenities" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
];
```

- [ ] **Step 4: Update globals.css for Tailwind v4**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";
```

- [ ] **Step 5: Configure static export**

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
```

- [ ] **Step 6: Set up root layout with Inter font and metadata**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quality Inn Sandusky | Hotels Near Cedar Point | Milan Road",
  description:
    "Book your Cedar Point vacation at Quality Inn Sandusky on Milan Road. 10 minutes from the park, free breakfast, outdoor pool. Call to save 15%!",
  openGraph: {
    title: "Quality Inn Sandusky | Hotels Near Cedar Point",
    description:
      "10 minutes from Cedar Point. Free breakfast, outdoor pool. Call to save 15%!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Create placeholder page.tsx**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Quality Inn Sandusky</h1>
    </main>
  );
}
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Dev server starts on localhost:3000, page renders "Quality Inn Sandusky".

- [ ] **Step 9: Commit**

```bash
git init && git add -A && git commit -m "feat: initialize Next.js project with Tailwind, Lucide, and constants"
```

---

## Task 2: UI Primitives — Button and SectionHeading

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionHeading.tsx`

- [ ] **Step 1: Create Button component**

Create `src/components/ui/Button.tsx`:

```tsx
import { type ComponentProps, type ReactNode } from "react";

type ButtonVariant = "solid" | "outline";
type ButtonColor = "orange" | "sky";

interface ButtonProps extends ComponentProps<"a"> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  icon?: ReactNode;
  children: ReactNode;
}

const styles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    orange:
      "bg-orange-500 hover:bg-orange-600 text-white",
    sky: "bg-sky-500 hover:bg-sky-600 text-white",
  },
  outline: {
    orange:
      "border-2 border-orange-500 text-orange-500 hover:bg-orange-50",
    sky: "border-2 border-sky-500 text-sky-500 hover:bg-sky-50",
  },
};

export default function Button({
  variant = "solid",
  color = "orange",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold text-sm transition-colors min-h-[44px] cursor-pointer ${styles[variant][color]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </a>
  );
}
```

- [ ] **Step 2: Create SectionHeading component**

Create `src/components/ui/SectionHeading.tsx`:

```tsx
interface SectionHeadingProps {
  children: React.ReactNode;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
      {children}
    </h2>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Button and SectionHeading UI components"
```

---

## Task 3: Sticky Header with Mobile Hamburger

**Files:**
- Create: `src/components/sections/Header.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Header component**

Create `src/components/sections/Header.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { NAV_LINKS, PHONE_NUMBER, PHONE_DISPLAY, BOOKING_URL } from "@/lib/constants";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <div className="w-8 h-8 bg-sky-500 rounded-md" />
          Quality Inn
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="outline" color="sky" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book on Booking
          </Button>
          <Button variant="solid" color="orange" href={`tel:${PHONE_NUMBER}`} icon={<Phone className="w-4 h-4" />}>
            Call to Save 15%
          </Button>
        </div>

        <button
          className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 flex flex-col items-center pt-8 gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-slate-700 hover:text-sky-500"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4 w-full px-8">
            <Button variant="outline" color="sky" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book on Booking
            </Button>
            <Button variant="solid" color="orange" href={`tel:${PHONE_NUMBER}`} icon={<Phone className="w-4 h-4" />}>
              Call to Save 15%
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Add Header to page.tsx**

Replace `src/app/page.tsx`:

```tsx
import Header from "@/components/sections/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <h1>Quality Inn Sandusky</h1>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: Sticky header renders with nav links, CTAs on desktop. Hamburger on mobile viewport.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add sticky header with mobile hamburger navigation"
```

---

## Task 4: Hero Section with Search Bar

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/sections/Hero.tsx`:

```tsx
"use client";

import { Search } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

export default function Hero() {
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const checkin = (form.elements.namedItem("checkin") as HTMLInputElement).value;
    const checkout = (form.elements.namedItem("checkout") as HTMLInputElement).value;
    const url = `${BOOKING_URL}?checkin=${checkin}&checkout=${checkout}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-slate-800">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          Only 10 Minutes from Cedar Point!
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Your Perfect Basecamp for Cedar Point Adventures
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-8">
          Free hot breakfast · Outdoor pool · Family-friendly rooms
        </p>

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-xl p-4 shadow-lg flex flex-col md:flex-row items-stretch md:items-center gap-3"
        >
          <div className="flex-1">
            <label htmlFor="checkin" className="block text-xs font-medium text-slate-500 mb-1 text-left">
              Check-in
            </label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 min-h-[44px]"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="checkout" className="block text-xs font-medium text-slate-500 mb-1 text-left">
              Check-out
            </label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 min-h-[44px]"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="guests" className="block text-xs font-medium text-slate-500 mb-1 text-left">
              Guests
            </label>
            <select
              id="guests"
              name="guests"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 min-h-[44px]"
            >
              <option>2 Adults</option>
              <option>1 Adult</option>
              <option>3 Adults</option>
              <option>4 Adults</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-6 py-2.5 min-h-[44px] flex items-center justify-center gap-2 transition-colors mt-auto"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to page.tsx**

Update `src/app/page.tsx`:

```tsx
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: Hero with dark overlay, orange badge, headline, subtitle, search bar with date inputs and guests selector. Search redirects to Booking.com with date params.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add hero section with Booking.com search bar"
```

---

## Task 5: Amenities Grid Section

**Files:**
- Create: `src/components/sections/Amenities.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Amenities component**

Create `src/components/sections/Amenities.tsx`:

```tsx
import { UtensilsCrossed, Waves, Wifi, Car, PawPrint, Dumbbell } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const amenities = [
  {
    icon: UtensilsCrossed,
    title: "Free Hot Breakfast",
    description: "Start every morning with a complimentary hot breakfast buffet for the whole family.",
  },
  {
    icon: Waves,
    title: "Outdoor Pool",
    description: "Cool off after a day at Cedar Point in our seasonal outdoor pool.",
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description: "Stay connected with complimentary high-speed wireless internet throughout the hotel.",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Generous free parking for cars, trucks, and SUVs right at the hotel.",
  },
  {
    icon: PawPrint,
    title: "Pet Friendly",
    description: "Your furry family members are welcome. Pet-friendly rooms available on request.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "Keep up your routine with our on-site fitness center, open 24 hours.",
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-20 bg-amber-50">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>Everything You Need for a Great Stay</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm">
              <item.icon className="w-10 h-10 text-sky-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Amenities to page.tsx**

Update `src/app/page.tsx` to import and render `<Amenities />` after `<Hero />`.

- [ ] **Step 3: Verify in browser**

Expected: 3x2 grid on desktop, 2x3 on tablet, 1-col on mobile. Each card has icon, title, description.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add amenities grid section"
```

---

## Task 6: Rooms Showcase Section

**Files:**
- Create: `src/components/sections/Rooms.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Rooms component**

Create `src/components/sections/Rooms.tsx`:

```tsx
import { Users, Maximize, Coffee, Tv } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/constants";

const rooms = [
  {
    name: "Standard King",
    description: "A cozy room with a king-size bed, perfect for couples or solo travelers.",
    features: [
      { icon: Users, label: "Sleeps 2" },
      { icon: Maximize, label: "300 sq ft" },
      { icon: Coffee, label: "Coffee maker" },
      { icon: Tv, label: "Flat-screen TV" },
    ],
  },
  {
    name: "Double Queen (Family)",
    description: "Spacious room with two queen beds — ideal for families visiting Cedar Point.",
    features: [
      { icon: Users, label: "Sleeps 4" },
      { icon: Maximize, label: "350 sq ft" },
      { icon: Coffee, label: "Coffee maker" },
      { icon: Tv, label: "Flat-screen TV" },
    ],
  },
  {
    name: "King Suite",
    description: "Our most spacious option with a separate living area for extra comfort.",
    features: [
      { icon: Users, label: "Sleeps 3" },
      { icon: Maximize, label: "450 sq ft" },
      { icon: Coffee, label: "Mini fridge" },
      { icon: Tv, label: "Flat-screen TV" },
    ],
  },
];

export default function Rooms() {
  return (
    <section id="rooms" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>Comfortable Rooms for the Whole Family</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.name} className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="h-48 bg-slate-200" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{room.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{room.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {room.features.map((feat) => (
                    <div key={feat.label} className="flex items-center gap-2 text-sm text-slate-600">
                      <feat.icon className="w-4 h-4 text-sky-500" />
                      {feat.label}
                    </div>
                  ))}
                </div>
                <Button variant="outline" color="sky" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="w-full">
                  View on Booking
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Rooms to page.tsx**

Update `src/app/page.tsx` to import and render `<Rooms />` after `<Amenities />`.

- [ ] **Step 3: Verify in browser**

Expected: 3 room cards in a row on desktop, stacked on mobile. Each card has placeholder image, name, description, feature icons, and "View on Booking" button.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add rooms showcase section"
```

---

## Task 7: Cedar Point Guide Section

**Files:**
- Create: `src/components/sections/CedarPointGuide.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create CedarPointGuide component**

Create `src/components/sections/CedarPointGuide.tsx`:

```tsx
import { MapPin, Clock, Utensils, Ruler, Sun, Ticket } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const tips = [
  {
    icon: MapPin,
    title: "Just 10 Minutes Away",
    description:
      "Quality Inn Sandusky is only 5 miles from Cedar Point's main entrance via US-250. Quick drive, no highway tolls.",
  },
  {
    icon: Clock,
    title: "Best Times to Visit",
    description:
      "Weekdays in June and late August see shorter lines. Arrive at park opening for the shortest waits on top rides.",
  },
  {
    icon: Ruler,
    title: "Height Requirements",
    description:
      "Many rides require 48\" minimum. Check Cedar Point's website for ride-by-ride requirements before your trip.",
  },
  {
    icon: Sun,
    title: "What to Bring",
    description:
      "Sunscreen, comfortable shoes, a refillable water bottle, and a change of clothes for water rides.",
  },
  {
    icon: Utensils,
    title: "Nearby Dining",
    description:
      "Milan Road is lined with family restaurants — Olive Garden, Red Lobster, Applebee's, and local favorites all within 5 minutes.",
  },
  {
    icon: Ticket,
    title: "Nearby Attractions",
    description:
      "Kalahari Indoor Waterpark (15 min), Lake Erie shores (5 min), Put-in-Bay ferry (20 min).",
  },
];

export default function CedarPointGuide() {
  return (
    <section id="cedar-point-guide" className="py-20 bg-sky-50">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>Your Cedar Point Survival Guide</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip) => (
            <article key={tip.title} className="bg-white rounded-xl p-6 shadow-sm">
              <tip.icon className="w-10 h-10 text-sky-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{tip.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{tip.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add CedarPointGuide to page.tsx**

Update `src/app/page.tsx` to import and render `<CedarPointGuide />` after `<Rooms />`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Cedar Point guide SEO content section"
```

---

## Task 8: Reviews / Testimonials Section

**Files:**
- Create: `src/components/sections/Reviews.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Reviews component**

Create `src/components/sections/Reviews.tsx`:

```tsx
import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reviews = [
  {
    quote: "Perfect location for our Cedar Point trip! The kids loved the pool, and the free breakfast saved us so much money. Will definitely be back!",
    name: "Sarah M.",
    date: "July 2025",
  },
  {
    quote: "Clean rooms, friendly staff, and you can't beat the price for how close it is to Cedar Point. The 15% phone discount was a great deal.",
    name: "James R.",
    date: "August 2025",
  },
  {
    quote: "We stayed here for three nights and had a wonderful experience. Breakfast was hot and fresh every morning. Great value for families!",
    name: "Linda K.",
    date: "June 2025",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>What Our Guests Say</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="bg-slate-50 rounded-xl p-6">
              <Stars />
              <blockquote className="text-slate-700 text-sm leading-relaxed mb-4">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <div className="text-sm">
                <span className="font-semibold text-slate-900">{review.name}</span>
                <span className="text-slate-400 ml-2">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Reviews to page.tsx**

Update `src/app/page.tsx` to import and render `<Reviews />` after `<CedarPointGuide />`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add reviews/testimonials section"
```

---

## Task 9: Location / Map Section

**Files:**
- Create: `src/components/sections/Location.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Location component**

Create `src/components/sections/Location.tsx`:

```tsx
import { MapPin, Navigation, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { ADDRESS, DISTANCES } from "@/lib/constants";

const distanceItems = [
  { ...DISTANCES.cedarPoint, icon: Navigation },
  { ...DISTANCES.kalahari, icon: Navigation },
  { ...DISTANCES.lakeErie, icon: Navigation },
];

export default function Location() {
  return (
    <section id="location" className="py-20 bg-amber-50">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>Find Us on Milan Road</SectionHeading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl overflow-hidden shadow-sm min-h-[400px]">
            <iframe
              title="Quality Inn Sandusky location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d-82.68!3d41.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDI1JzEyLjAiTiA4MsKwNDAnNDguMCJX!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 text-lg">Our Address</h3>
                <p className="text-slate-500">{ADDRESS.full}</p>
              </div>
            </div>

            <h3 className="font-semibold text-slate-900 text-lg mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-500" />
              Key Distances
            </h3>
            <div className="space-y-3">
              {distanceItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <item.icon className="w-5 h-5 text-sky-500" />
                  <span className="font-medium text-slate-900">{item.label}</span>
                  <span className="text-slate-500 ml-auto">{item.time}{item.miles ? ` (${item.miles})` : ""}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Location to page.tsx**

Update `src/app/page.tsx` to import and render `<Location />` after `<Reviews />`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add location section with map embed"
```

---

## Task 10: Footer

**Files:**
- Create: `src/components/sections/Footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Footer component**

Create `src/components/sections/Footer.tsx`:

```tsx
import { Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  HOTEL_NAME,
  PHONE_NUMBER,
  PHONE_DISPLAY,
  BOOKING_URL,
  ADDRESS,
  NAV_LINKS,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-slate-400 text-sm mb-2">{ADDRESS.full}</p>
            <p className="text-slate-400 text-sm mb-2">
              <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white transition-colors">
                {PHONE_DISPLAY}
              </a>
            </p>
            <p className="text-slate-400 text-sm">
              <a href="mailto:OH463@stayatchoice.com" className="hover:text-white transition-colors">
                OH463@stayatchoice.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-400 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Book Your Stay</h3>
            <div className="flex flex-col gap-3">
              <Button
                variant="solid"
                color="orange"
                href={`tel:${PHONE_NUMBER}`}
                icon={<Phone className="w-4 h-4" />}
              >
                Call to Save 15%
              </Button>
              <Button
                variant="outline"
                color="sky"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book on Booking
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} {HOTEL_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer to page.tsx**

Update `src/app/page.tsx` to import and render `<Footer />` after `</main>` closing tag.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add footer with contact info and CTAs"
```

---

## Task 11: Mobile Bottom CTA Bar

**Files:**
- Create: `src/components/ui/MobileBottomBar.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create MobileBottomBar component**

Create `src/components/ui/MobileBottomBar.tsx`:

```tsx
import { Phone } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/constants";

export default function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-orange-500 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="flex items-center justify-center gap-2 py-4 text-white font-semibold text-lg min-h-[56px]"
      >
        <Phone className="w-5 h-5" />
        Call to Save 15%
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Add MobileBottomBar to page.tsx and add bottom padding**

Add `<MobileBottomBar />` at the end of the page (after Footer). Add `pb-16 lg:pb-0` to the `<body>` or a wrapper to prevent content from being hidden behind the bar on mobile.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add sticky mobile bottom CTA bar"
```

---

## Task 12: SEO — JSON-LD Structured Data

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add JSON-LD Hotel schema to layout**

Add a `<script type="application/ld+json">` tag in the `<head>` via layout.tsx:

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Quality Inn Sandusky",
  description:
    "Hotel near Cedar Point on Milan Road. Free breakfast, outdoor pool, pet friendly.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Milan Road",
    addressLocality: "Sandusky",
    addressRegion: "OH",
    postalCode: "44870",
    addressCountry: "US",
  },
  telephone: "+14195040035",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free Breakfast", value: true },
    { "@type": "LocationFeatureSpecification", name: "Outdoor Pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Pet Friendly", value: true },
    { "@type": "LocationFeatureSpecification", name: "Fitness Center", value: true },
  ],
  starRating: { "@type": "Rating", ratingValue: "2" },
};
```

Add inside `<body>` at the top:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: add JSON-LD Hotel structured data for SEO"
```

---

## Task 13: Final page.tsx Assembly and Responsive Polish

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Verify complete page.tsx**

Final `src/app/page.tsx` should be:

```tsx
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Amenities from "@/components/sections/Amenities";
import Rooms from "@/components/sections/Rooms";
import CedarPointGuide from "@/components/sections/CedarPointGuide";
import Reviews from "@/components/sections/Reviews";
import Location from "@/components/sections/Location";
import Footer from "@/components/sections/Footer";
import MobileBottomBar from "@/components/ui/MobileBottomBar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16 pb-16 lg:pb-0">
        <Hero />
        <Amenities />
        <Rooms />
        <CedarPointGuide />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  );
}
```

- [ ] **Step 2: Run full build and verify static export**

```bash
npm run build
```

Expected: Build succeeds, `out/` directory is created with static HTML files.

- [ ] **Step 3: Test with a local static server**

```bash
npx serve out
```

Expected: Full page renders correctly at localhost:3000. All sections visible, smooth scroll works, CTAs link correctly.

- [ ] **Step 4: Final commit**

```bash
git add -A && git commit -m "feat: assemble complete page with all sections and responsive layout"
```
