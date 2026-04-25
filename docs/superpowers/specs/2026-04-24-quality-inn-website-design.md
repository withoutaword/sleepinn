# Quality Inn Sandusky — Hotel Website Design Spec

## Overview

Single-page, high-conversion hotel website for Quality Inn Sandusky (Milan Road). Primary audience: families visiting Cedar Point in summer. Primary conversion goal: drive phone calls for a 15% direct booking discount. Secondary conversion: redirect to Booking.com.

## Tech Stack

- **Framework:** Next.js 14+ (App Router, static export)
- **Styling:** Tailwind CSS v4 (utility-first)
- **Icons:** Lucide React
- **Font:** Inter (Google Fonts)
- **Deployment:** Vercel (static export via `output: 'export'`)
- **Structure:** Single `page.tsx` with isolated section components in `src/components/sections/`

## Color Palette — "Ocean Breeze"

| Role | Color | Tailwind Class |
|------|-------|---------------|
| Primary | Sky 500 `#0EA5E9` | `sky-500` |
| Primary Dark | Sky 600 `#0284C7` | `sky-600` |
| Accent / CTA | Orange 500 `#F97316` | `orange-500` |
| Accent Dark | Orange 600 `#EA580C` | `orange-600` |
| Warm Background | Amber 50 `#FFFBEB` | `amber-50` |
| White | `#FFFFFF` | `white` |
| Text Dark | Slate 900 `#0F172A` | `slate-900` |
| Text Muted | Slate 500 `#64748B` | `slate-500` |

## Page Sections (top to bottom)

### 1. Sticky Header — Balanced Bar

- Fixed to top on scroll, white background with subtle shadow
- **Left:** Logo placeholder (square icon + "Quality Inn" text)
- **Center:** Nav links — Rooms, Cedar Point Guide, Amenities, Reviews, Location (smooth-scroll anchors to page sections)
- **Right:** Two CTA buttons side by side:
  - "Book on Booking" — outline style, sky-500 border and text
  - "Call to Save 15%" — solid orange-500 background, white text, phone icon (Lucide `Phone`)
- **Mobile:** Hamburger menu (Lucide `Menu`/`X` toggle), full-screen overlay nav. Both CTAs visible below nav links.

### 2. Hero — Full-Width Photo with Overlay

- Full-viewport-width section with a placeholder background image (hotel exterior or Cedar Point area, Unsplash)
- Dark gradient overlay for text readability
- **Content (centered):**
  - Orange pill badge: "Only 10 Minutes from Cedar Point!"
  - H1: "Your Perfect Basecamp for Cedar Point Adventures"
  - Subheadline: "Free hot breakfast · Outdoor pool · Family-friendly rooms"
  - Search bar (white card, rounded, inline on desktop, stacked on mobile):
    - Check-in date field
    - Check-out date field
    - Guests selector (default: "2 Adults")
    - Orange "Search" button
  - Search bar submission redirects to Booking.com URL with date parameters: `https://www.booking.com/hotel/us/quality-inn-sandusky.html?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD`
- Uses native HTML date inputs (no external date picker library)

### 3. Amenities Grid

- Light background (white or amber-50)
- Section heading: "Everything You Need for a Great Stay"
- 6-item grid (3x2 on desktop, 2x3 on tablet, 1-col on mobile)
- Each item: Lucide icon + title + short description
- Amenities: Free Hot Breakfast, Outdoor Pool, Free Wi-Fi, Free Parking, Pet Friendly, Fitness Center

### 4. Rooms Showcase

- White background
- Section heading: "Comfortable Rooms for the Whole Family"
- 2-3 room cards in a row (stacked on mobile)
- Each card: placeholder photo, room name, short description, key features (icons), "View on Booking" link/button
- Room types: Standard King, Double Queen (Family), King Suite

### 5. Cedar Point Guide

- Light blue-tinted background (sky-50 or similar)
- Section heading: "Your Cedar Point Survival Guide"
- SEO-rich content section with:
  - Distance/driving info (10 min, 5 miles)
  - Tips for families (best times to visit, what to bring, height requirements)
  - Nearby dining/attractions
- Content displayed as info cards (icon + title + description per card)
- This section targets "hotels near Cedar Point" search queries

### 6. Reviews / Testimonials

- White background
- Section heading: "What Our Guests Say"
- 3 testimonial cards in a row (stacked on mobile)
- Each card: star rating (5 stars using Lucide `Star`), quote text, guest name, date
- Placeholder review content (to be replaced with real reviews)

### 7. Location / Map

- Light background
- Section heading: "Find Us on Milan Road"
- Split layout: Google Maps iframe embed on one side, address + directions text on the other
- Address: Milan Road, Sandusky, OH (exact address to be confirmed by owner before launch)
- Key distances: Cedar Point (10 min), Kalahari (15 min), Lake Erie shores (5 min)

### 8. Footer

- Dark background (slate-900)
- Three columns:
  - **Contact:** Address, phone number, email
  - **Quick Links:** Rooms, Cedar Point Guide, Amenities, Reviews, Location
  - **Book Your Stay:** "Call to Save 15%" button + "Book on Booking" button (repeated CTAs)
- Bottom bar: copyright, "Quality Inn Sandusky" branding

## Mobile-Specific Behavior

- **Sticky bottom CTA bar:** Floating bar at the bottom of the screen on mobile with the phone CTA ("Call to Save 15%"). Always visible. Tapping initiates a `tel:` link.
- **Hamburger nav:** Full-screen overlay with nav links and both CTA buttons
- **Search bar:** Fields stack vertically on mobile
- **All card grids:** Single column on mobile
- **Touch targets:** Minimum 44px height for all interactive elements

## SEO Strategy

- Semantic HTML throughout (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`)
- H1 only in hero, H2 for each section heading, H3 for sub-items
- `<title>`: "Quality Inn Sandusky | Hotels Near Cedar Point | Milan Road"
- Meta description: "Book your Cedar Point vacation at Quality Inn Sandusky on Milan Road. 10 minutes from the park, free breakfast, outdoor pool. Call to save 15%!"
- Open Graph tags for social sharing
- Structured data (JSON-LD): `Hotel` schema with address, rating, amenities
- Alt text on all images

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout, Inter font, metadata
    page.tsx            # Main page composing all sections
    globals.css         # Tailwind imports, custom properties
  components/
    sections/
      Header.tsx        # Sticky nav with mobile hamburger
      Hero.tsx          # Full-width photo hero with search bar
      Amenities.tsx     # Icon grid
      Rooms.tsx         # Room cards
      CedarPointGuide.tsx  # SEO content section
      Reviews.tsx       # Testimonial cards
      Location.tsx      # Map + directions
      Footer.tsx        # Footer with CTAs
    ui/
      Button.tsx        # Reusable button (solid/outline variants)
      SectionHeading.tsx # Consistent section title component
      MobileBottomBar.tsx # Sticky phone CTA for mobile
  lib/
    constants.ts        # Phone number, Booking URL, address, etc.
```

## Implementation Phases

- **Phase 1:** Project setup (Next.js, Tailwind, Lucide) + Header + Hero
- **Phase 2:** Amenities + Rooms sections
- **Phase 3:** Cedar Point Guide + Reviews sections
- **Phase 4:** Location/Map + Footer + Mobile bottom bar
- **Phase 5:** SEO metadata, structured data, responsive polish

## Out of Scope

- No backend / API routes
- No authentication or user accounts
- No real booking engine — all bookings go to Booking.com
- No dark mode
- No internationalization
- No analytics (can be added later via Vercel Analytics or Google Analytics)
- No CMS — content is hardcoded (can be extracted to a CMS later)
