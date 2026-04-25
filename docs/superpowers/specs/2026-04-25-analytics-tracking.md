# Analytics Tracking Design Spec

## Overview

Add visitor tracking and booking button click tracking to the Sleep Inn Sandusky website, with a password-protected `/stats` dashboard page. Uses Vercel Postgres for persistent storage.

## Tech Additions

- **Database:** Vercel Postgres (`@vercel/postgres`)
- **Auth:** Simple password check via `STATS_PASSWORD` env var

## Architecture Changes

- Remove `output: 'export'` from `next.config.ts` (API routes require server runtime)
- Deployment remains on Vercel but now uses SSR instead of static export

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  ip VARCHAR(45) NOT NULL,
  path VARCHAR(255) NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS button_clicks (
  id SERIAL PRIMARY KEY,
  button_type VARCHAR(50) NOT NULL,
  ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Routes

### POST /api/track

Called automatically on every page load via a client-side tracking component.

- Request body: `{ path: string }`
- Server extracts IP from `x-forwarded-for` header (Vercel provides this)
- Server extracts user-agent from request headers
- Inserts row into `page_views`
- Returns `{ ok: true }`

### POST /api/track-click

Called when user clicks any booking/phone CTA button.

- Request body: `{ buttonType: "booking" | "phone" }`
- Server extracts IP from `x-forwarded-for`
- Inserts row into `button_clicks`
- Returns `{ ok: true }`

### GET /api/stats

Returns aggregated statistics. Protected by `STATS_PASSWORD` via query param or Authorization header.

- Query: `?password=xxx`
- Returns JSON with:
  - `totalViews`: total page view count
  - `uniqueVisitors`: count of distinct IPs
  - `totalBookingClicks`: count of booking button clicks
  - `totalPhoneClicks`: count of phone button clicks
  - `dailyViews`: array of `{ date, count }` for last 30 days
  - `dailyClicks`: array of `{ date, booking, phone }` for last 30 days
  - `recentVisitors`: last 50 page views with IP, path, user-agent, timestamp

## New Files

```
src/
  app/
    api/
      track/route.ts           # Page view tracking endpoint
      track-click/route.ts     # Button click tracking endpoint
      stats/route.ts           # Statistics data endpoint
    stats/
      page.tsx                 # Statistics dashboard (client component)
  components/
    ui/
      PageTracker.tsx          # Client component that fires page view on mount
      TrackingButton.tsx       # Wrapper around Button that tracks clicks
  lib/
    db.ts                      # Database initialization and query helpers
```

## PageTracker Component

Client component added to `layout.tsx`. On mount, sends `POST /api/track` with current path. Uses `usePathname()` from `next/navigation`. Fires once per page load via `useEffect`.

## TrackingButton Component

Wraps existing `Button` component. On click, fires `POST /api/track-click` with `buttonType` before following the link. Uses `navigator.sendBeacon` for reliable tracking even when navigating away.

## Stats Dashboard (`/stats`)

Password-protected page. User enters password in a form, which is stored in session state. Dashboard shows:

- Total visitors / unique IPs / booking clicks / phone clicks (4 stat cards at top)
- Daily views chart (simple bar chart using CSS, no chart library)
- Daily clicks breakdown
- Recent visitors table (IP, path, user-agent, time)

## Environment Variables

- `POSTGRES_URL` — Vercel Postgres connection string (auto-set by Vercel when you create a Postgres database)
- `STATS_PASSWORD` — Password to access the stats page

## Database Initialization

The `db.ts` module runs `CREATE TABLE IF NOT EXISTS` on first query to auto-create tables. No separate migration step needed.
