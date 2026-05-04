# System Architecture — Extly

## Overview
Extly is a modern web application built for speed and data accuracy. It follows a serverless architecture primarily hosted on Vercel.

## Tech Stack
- **Frontend:** Next.js 14+ (App Router), Tailwind CSS.
- **Backend:** Next.js Server Actions & API Routes.
- **Database:** Supabase (PostgreSQL).
- **Authentication:** Supabase Auth (Magic Link / Passwordless).
- **Scraper:** Custom Node.js logic using `fetch` + `cheerio`.
- **Proxy Layer:** (V1) Direct from Vercel; (V2/Mitigation) Cloudflare Workers proxy layer.
- **Scheduling:** Vercel Cron Jobs.
- **Email:** Resend.

## Core Workflows

### 1. Extension Discovery & Search
1. User searches via `/search`.
2. App queries `extensions` table.
3. If not found, App triggers a "lazy fetch" to scrape the Chrome Web Store in real-time and save it.
4. Results displayed with current store data.

### 2. Tracking & Alerting (The "Heart")
1. User clicks "Track".
2. Record added to `user_tracking`.
3. Daily at 9:00 AM UTC, Vercel Cron triggers `/api/cron/check-extensions`.
4. The script fetches all active extensions, compares them against the last `extension_snapshots`.
5. If a delta is detected (Version change, Rating drop > 0.1, etc.):
    - A record is written to `alerts`.
    - An email is triggered via `Resend`.
6. A new `extension_snapshots` record is saved.

### 3. Data Visualization
1. Extension detail page fetches `extension_snapshots` for the last 30/90 days.
2. Data is transformed into a format suitable for `Recharts`.
3. CSR (Client Side Rendering) handles the interactive chart elements.

## Scalability & Risk Mitigation
- **Scraping Limits:** V1 uses direct Vercel IPs. As volume scales (>100 extensions), monitor for 403/429 errors.
- **Proxy Strategy:** Use Cloudflare Workers as a free proxy layer if Vercel IPs get flagged. 
- **Database Performance:** Proper indexing on `chrome_id` and `snapshot_date`.
- **Auth Strategy:** Magic Link simplifies onboarding and eliminates password management risks.









































