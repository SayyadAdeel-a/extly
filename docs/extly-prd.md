# Extly — Product Requirements Document
### Chrome Extension Intelligence Platform
**Version:** 1.0  
**Author:** Sayyad  
**Stack:** Next.js · Supabase · Tailwind CSS · Vercel · Resend  
**Budget:** $0  
**Target:** Chrome extension developers, indie hackers, agencies  

---

## The One Line Vision

ChromeStats tells you what happened last month. Extly tells you what's happening right now — and what to do about it.

---

## The Problem

Chrome extension developers are flying blind.

- They don't know when a competitor pushes an update
- They don't know why their rating dropped overnight
- They don't know which extensions in their category are growing fast
- They find out about changes days or weeks late via ChromeStats

There is no real time early warning system for extension developers. Extly is that system.

---

## Target Users

**Primary:** Indie developers who make money from Chrome extensions ($500–$10K/month revenue from their extension). They care deeply about competitors and need to react fast.

**Secondary:** Agencies and developers who build extensions for clients. They track multiple extensions and need a dashboard to manage them all.

**Early adopters:** Extension developers active on Indie Hackers, Twitter, Reddit who are already frustrated with ChromeStats being slow and outdated.

---

## Design System

### Philosophy
Clean. Data forward. Light. Professional but not corporate. Every element exists to surface data faster. Inspired by Mixpanel's clarity and the natural freshness from the Xelofia reference.

### Colors
```
Background:     #FAFAFA  (off-white, not harsh pure white)
Surface:        #FFFFFF  (cards, panels)
Border:         #E8ECF0  (subtle separations)
Text Primary:   #0F1117  (near black)
Text Secondary: #6B7280  (grey)
Text Muted:     #9CA3AF  (hints, labels)

Accent Blue:    #2563EB  (primary actions, links, highlights)
Accent Green:   #10B981  (positive changes, growth)
Accent Red:     #EF4444  (drops, alerts, negative)
Accent Amber:   #F59E0B  (warnings, neutral changes)

Chart Colors:   #2563EB, #10B981, #8B5CF6, #F59E0B, #EF4444
```

### Typography
```
Display Font:   'Instrument Serif' — for hero headings only
Body Font:      'Geist' — clean, modern, made for dashboards
Mono Font:      'Geist Mono' — for numbers, version strings, IDs
```

### Spacing System
```
Base unit: 4px
xs: 4px  |  sm: 8px  |  md: 16px  |  lg: 24px  |  xl: 32px  |  2xl: 48px  |  3xl: 64px
```

### Component Patterns
- Cards: white background, 1px border #E8ECF0, 8px border radius, subtle shadow
- Metric tiles: large monospace number, small label below, colored trend indicator
- Charts: Recharts library, clean gridlines, no excessive decoration
- Badges: pill shaped, color coded by type
- Alerts: left border accent color, icon, message, timestamp

---

## Information Architecture

```
extly.com/
├── / (Landing Page)
├── /search (Search extensions)
├── /extension/[id] (Extension detail page)
├── /dashboard (User dashboard — tracked extensions)
├── /alerts (Alert history)
├── /settings (Account + notification preferences)
└── /pricing (Plans)
```

---

## V1 — Launch MVP (Week 1–2)

**Goal:** Get people using it. Prove the core value. Zero paid features.

### Pages in V1

---

### 1. Landing Page (/)

**Purpose:** Convert visitors to signups. Communicate value in under 5 seconds.

**Sections:**

**Hero**
- Headline: "Know Before Your Competitors Do"
- Subheadline: "Real time alerts when any Chrome extension changes. Track ratings, users, versions, and growth — updated daily not monthly."
- Two CTAs: "Start Tracking Free" (primary) and "See a Demo" (secondary)
- Hero image: screenshot of the dashboard showing live extension data with a change alert notification

**Social proof bar**
- "Tracking 50,000+ Chrome extensions" (starts at 0, grows as we index)
- Logo strip of well known extensions being tracked

**Feature highlights (3 cards)**
1. Real Time Alerts — "Get notified the moment a competitor ships an update or drops in rating"
2. Growth Intelligence — "Spot which extensions are growing fast in your category before everyone else"
3. Competitor Tracking — "Track any extension side by side with yours. See exactly where you stand"

**How it works (3 steps)**
1. Search any Chrome extension by name or URL
2. Click Track — we monitor it daily automatically
3. Get email alerts the moment anything changes

**Comparison table**
| Feature | Extly | ChromeStats |
|---|---|---|
| Update frequency | Daily | Monthly |
| Real time alerts | ✓ | ✗ |
| Competitor comparison | ✓ | Limited |
| Price | Free | $14.99/mo |

**CTA section**
- "Start tracking your first extension in 30 seconds"
- Email signup input + button

**Footer**
- Logo, tagline, links to pages, copyright

---

### 2. Search Page (/search)

**Purpose:** Let anyone search any extension without signing up. Hook them with data.

**Layout:**
- Large search bar centered at top
- Placeholder: "Search by extension name, ID, or Chrome Web Store URL..."
- Results appear below as cards

**Search result cards show:**
- Extension icon
- Name and short description
- User count with trend arrow (↑ ↓)
- Rating with star display
- Version and last updated date
- Category badge
- "Track This" button (requires signup)
- "View Details" button (free)

**No results state:**
- "We haven't indexed this one yet. Paste the Chrome Web Store URL and we'll add it."
- Input field to submit URL

---

### 3. Extension Detail Page (/extension/[id])

**Purpose:** Show everything we know about one extension. This is the core product page.

**Layout: Two column**
Left sidebar (30%): Extension info card
Main content (70%): Data and charts

**Left sidebar card:**
- Extension icon (large)
- Name (heading)
- Developer name
- Category badge
- Version badge
- Last updated
- Chrome Web Store link
- "Track This Extension" CTA button

**Main content sections:**

**Metrics row (4 tiles)**
```
[ Total Users ]  [ Rating ]  [ Total Reviews ]  [ Version ]
  1,247,832        4.7⭐        8,432             v3.2.1
  ↑ 12,400 (7d)   ↓ 0.2 (30d)  ↑ 142 (7d)       Updated 3d ago
```

**User growth chart**
- Line chart showing user count over time
- Time filters: 7D / 30D / 90D
- Clean Recharts line chart, blue accent color
- Tooltip on hover showing exact count and date

**Rating history chart**
- Line chart showing rating over time
- Green when above 4.0, amber when 3.5–4.0, red below 3.5

**Version history table**
- List of all versions we've recorded
- Version number | Date detected | Days since previous
- Helps developers see how often competitors ship

**Recent reviews section**
- Last 5 reviews pulled from store
- Star rating, review text, date
- Filter by positive/negative

**Change log section**
- Timeline of every change we've detected
- "Rating changed from 4.8 to 4.6 — April 28, 2026"
- "New version 3.2.1 detected — April 25, 2026"
- "User count crossed 1M — April 20, 2026"

**Track this extension CTA**
- Banner at bottom: "Get alerted the moment anything changes on this extension"
- Email input + "Start Tracking" button

---

### 4. Authentication

**Simple email + password signup**
- Supabase Auth handles everything
- No social login needed in V1
- Email verification required

---

### 5. User Dashboard (/dashboard) — Requires signup

**Purpose:** User's home base. See all tracked extensions at a glance.

**Layout:**
- Top: Welcome bar with user name and quick stats
- "You're tracking X extensions. Y alerts in the last 7 days."
- Main: Grid of tracked extension cards

**Tracked extension card:**
- Extension icon and name
- Key metric: users (with weekly change)
- Key metric: rating (with change)
- Last change detected (timestamp)
- Red dot indicator if unread alert exists
- "View Details" and "Untrack" actions

**Empty state (new user):**
- Illustration
- "You're not tracking any extensions yet"
- "Search for any extension to get started"
- CTA button to search

**Quick add bar at top:**
- Input: "Paste Chrome Web Store URL to track instantly"

---

### 6. Alerts Page (/alerts) — Requires signup

**Purpose:** Full history of all alerts for tracked extensions.

**Layout:**
- Filter bar: All / Rating Changes / New Versions / User Milestones / Unread
- Timeline list of alerts

**Alert item:**
- Extension icon
- Extension name (clickable)
- Alert type badge (Version / Rating / Milestone)
- Description: "Rating dropped from 4.8 to 4.5"
- Timestamp
- Unread indicator dot

---

## V1 Technical Implementation

### Data Collection

**How we get extension data:**
```javascript
// Next.js API route — /api/fetch-extension
async function fetchExtensionData(extensionId) {
  const url = `https://chromewebstore.google.com/detail/${extensionId}`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  })
  const html = await res.text()
  return parseExtensionHTML(html)
}
```

**Data we extract:**
- Extension name
- Description
- User count (formatted number)
- Rating (decimal)
- Review count
- Version string
- Last updated date
- Developer name
- Category
- Extension icon URL

### Database Schema (Supabase)

```sql
-- Extensions we're tracking
extensions (
  id uuid primary key,
  chrome_id text unique,        -- Chrome Web Store ID
  name text,
  description text,
  developer text,
  category text,
  icon_url text,
  chrome_url text,
  created_at timestamp,
  last_fetched_at timestamp
)

-- Daily snapshots of each extension
extension_snapshots (
  id uuid primary key,
  extension_id uuid references extensions,
  user_count bigint,
  rating decimal,
  review_count integer,
  version text,
  last_updated_date text,
  snapshot_date date,
  created_at timestamp
)

-- Users tracking extensions
user_tracking (
  id uuid primary key,
  user_id uuid references auth.users,
  extension_id uuid references extensions,
  created_at timestamp,
  notify_rating boolean default true,
  notify_version boolean default true,
  notify_users boolean default true
)

-- Alert history
alerts (
  id uuid primary key,
  extension_id uuid references extensions,
  user_id uuid references auth.users,
  alert_type text,              -- 'rating_change' | 'version_update' | 'user_milestone'
  old_value text,
  new_value text,
  message text,
  read boolean default false,
  created_at timestamp
)
```

### Monitoring System (Vercel Cron)

```javascript
// vercel.json
{
  "crons": [{
    "path": "/api/cron/check-extensions",
    "schedule": "0 9 * * *"  // Runs every day at 9am UTC
  }]
}

// /api/cron/check-extensions
// 1. Get all extensions being tracked by at least 1 user
// 2. Fetch fresh data for each one
// 3. Compare with yesterday's snapshot
// 4. If anything changed — create alert + send email
// 5. Save new snapshot
```

### Email Alerts (Resend)

**Trigger:** Daily cron detects a change

**Email template:**
```
Subject: ⚠️ [Extension Name] dropped from 4.8 to 4.5 rating

Hey [Name],

One of your tracked extensions just changed.

Extension: [Name]
Change: Rating dropped from 4.8 → 4.5
Detected: Today at 9:00 AM UTC

[View Full Details →]

You're receiving this because you're tracking this extension on Extly.
[Manage alerts] [Unsubscribe]
```

---

## V2 — Growth Phase (Week 3–6)

**Goal:** Add paid features. Convert free users to paying customers.

### New Features in V2

**1. Competitor Comparison Tool**
- Side by side comparison of 2–5 extensions
- All metrics shown in parallel columns
- Growth rate comparison chart
- "Who's winning" summary

**2. Category Leaderboard**
- Pick any category (e.g. "Productivity")
- See top 50 extensions ranked by users
- Filter by growth rate this week/month
- Spot rising extensions before they blow up

**3. Growth Velocity Score**
- Our proprietary score for each extension
- Combines: user growth rate, rating trend, update frequency
- Shown as a number 1–100
- High velocity = extension on the rise

**4. Historical Data (6 months)**
- Free users get 7 days of history
- Paid users get 6 months
- Full trend charts with longer time ranges

**5. Slack Integration**
- Connect Slack workspace
- Get alerts in a Slack channel instead of (or as well as) email
- Great for agencies tracking multiple extensions

**6. CSV Export**
- Export any extension's historical data to CSV
- Useful for reporting and deeper analysis

### Pricing (Introduced in V2)

**Free Plan**
- Track up to 3 extensions
- 7 days history
- Daily email alerts
- Basic metrics only

**Pro Plan — $14/month**
- Track up to 25 extensions
- 6 months history
- Email + Slack alerts
- Competitor comparison
- Category leaderboards
- CSV export
- Growth velocity scores

**Agency Plan — $39/month**
- Track unlimited extensions
- 1 year history
- All Pro features
- Priority support
- API access (basic)

---

## V3 — Moat Phase (Week 7–12)

**Goal:** Build features that make switching away from Extly painful.

### New Features in V3

**1. AI Change Summary**
- When a rating drops, AI reads the new negative reviews and summarizes why
- "3 users complained about the update breaking their workflow"
- Powered by Claude API — free tier enough for summaries

**2. Extension Discovery Feed**
- Daily feed of fastest growing extensions across all categories
- "Today's rising extensions" — curated list
- Filter by category, growth rate, user count
- Developers use this for market research and opportunity spotting

**3. Public Extension Profiles**
- Every extension gets a public Extly page
- SEO optimized — "Grammarly Chrome Extension Stats" searches land on Extly
- This drives organic traffic from developers searching for extension data
- Each page shows live stats, charts, version history

**4. API Access**
- Simple REST API for Agency plan users
- GET /api/v1/extension/{id} returns full current data
- Webhook support — POST to your URL when changes detected
- Developers build their own tools on top of Extly

**5. Weekly Digest Email**
- Sunday morning summary email for all tracked extensions
- "Here's what happened this week in your extension portfolio"
- Charts, highlights, alerts summary

**6. Browser Extension**
- Chrome extension that overlays Extly data on Chrome Web Store pages
- See user count, rating trend, growth velocity right on the store page
- One click to track from the store
- This is the viral distribution mechanism — every extension developer who installs it sees Extly branding everywhere

---

## Launch Strategy

### Week 1–2: Build V1 in silence
Build the core product. Get it working.

### Week 3: Soft launch
- Post on r/ChromeExtensions: "I built a free real time tracker for Chrome extensions — here's why ChromeStats wasn't enough for me"
- Post on r/SideProject: Show the dashboard screenshot
- Tweet/X: Short demo video of the alert system working
- Indie Hackers: Comment genuinely on relevant posts, start building karma

### Week 4: Product Hunt launch
- Launch on Product Hunt with a demo GIF
- Tagline: "Real time alerts for Chrome extension developers"
- Hunter: Find someone with 500+ followers to post it
- First 2 hours matter most — have 20 people ready to upvote

### Week 5+: Content and SEO
- Write blog posts targeting "chrome extension stats" searches
- Every popular extension gets a public Extly page — organic SEO
- These pages rank for "[extension name] user count" searches

---

## Success Metrics

### V1 Success (End of Week 2)
- 100 extensions indexed
- 50 registered users
- 200 extension detail page views
- At least 5 users tracking extensions

### V2 Success (End of Week 6)
- 500 registered users
- 50 paying customers at $14/month = $700 MRR
- 1000+ extensions indexed
- 20+ alerts sent successfully

### V3 Success (End of Week 12)
- 2000 registered users
- 150 paying customers
- $2,500 MRR
- Browser extension published with 200+ installs
- Ranking on Google for "chrome extension stats" keywords

---

## Competitive Advantage

**vs ChromeStats:**
- Real time vs monthly updates
- Alerts vs passive checking
- Free tier vs $14.99 minimum
- Better UI vs 2020-era dashboard
- Growing data from day one vs needing historical data

**Our moat over time:**
- Historical data accumulates daily — impossible to catch up once we have 6 months
- Public extension pages drive SEO traffic
- Browser extension creates viral distribution loop
- Community of extension developers becomes self reinforcing

---

## What We Are NOT Building

To stay focused and ship fast:

- No user testing or feedback collection tools
- No A/B testing features
- No revenue tracking for extensions
- No social features or community
- No mobile app
- No Firefox or Edge tracking in V1 (Chrome only)
- No real time second-by-second monitoring (daily is enough)

---

## Open Questions to Resolve After V1

1. Will developers pay $14/month for this? (validate with 10 conversations before building paid features)
2. Is daily monitoring frequent enough or do users want hourly?
3. Which alert type (rating / version / users) do people care about most?
4. Is the browser extension the right viral loop or is there something better?

---

*This document is a living PRD. Update after every user conversation.*
