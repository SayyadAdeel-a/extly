# Extly — Master Build Prompt for Cursor

## Instructions for AI Agent
Read this entire document before writing a single line of code. Every decision has been made. Your job is to implement exactly what is described. Do not add features. Do not change the stack. Do not simplify pages. Build exactly what is specified.

---

## Project Overview

You are building **Extly** — a real time intelligence platform for Chrome extension developers. It monitors Chrome extensions and sends email alerts when ratings drop, new versions ship, or user milestones are hit.

**The core value:** ChromeStats updates monthly. Extly alerts you daily.

---

## Tech Stack — Do Not Change

```
Framework:      Next.js 14 with App Router
Language:       TypeScript (strict mode)
Styling:        Tailwind CSS only (no CSS modules, no styled-components)
Database:       Supabase (PostgreSQL)
Auth:           Supabase Magic Link (passwordless email)
Email:          Resend
Charts:         Recharts
Icons:          Lucide React
Hosting:        Vercel
```

---

## Step 1: Project Setup

```bash
npx create-next-app@latest extly --typescript --tailwind --app --no-src-dir
cd extly
npm install @supabase/supabase-js @supabase/ssr resend recharts lucide-react
npm install cheerio
npm install -D @types/cheerio
```

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=alerts@extly.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
CRON_SECRET=your_random_secret_here
```

---

## Step 2: Tailwind Configuration

Replace `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-main': '#FAFAFA',
        'bg-surface': '#FFFFFF',
        'border-subtle': '#E8ECF0',
        'text-primary': '#0F1117',
        'text-secondary': '#6B7280',
        'accent-blue': '#2563EB',
        'accent-green': '#10B981',
        'accent-red': '#EF4444',
        'accent-amber': '#F59E0B',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'serif'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

Add fonts to `app/layout.tsx`:
```typescript
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google'
```

---

## Step 3: Database Setup

Run this SQL in Supabase SQL editor exactly as written:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE extensions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chrome_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  developer TEXT,
  category TEXT,
  icon_url TEXT,
  chrome_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_fetched_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE extension_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  extension_id UUID REFERENCES extensions(id) ON DELETE CASCADE,
  user_count BIGINT,
  rating DECIMAL(3,2),
  review_count INTEGER,
  version TEXT,
  last_updated_date TEXT,
  snapshot_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(extension_id, snapshot_date)
);

CREATE TABLE user_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  extension_id UUID REFERENCES extensions(id) ON DELETE CASCADE,
  notify_rating BOOLEAN DEFAULT TRUE,
  notify_version BOOLEAN DEFAULT TRUE,
  notify_users BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, extension_id)
);

CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  extension_id UUID REFERENCES extensions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  plan TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_snapshots_extension_date ON extension_snapshots(extension_id, snapshot_date DESC);
CREATE INDEX idx_tracking_user ON user_tracking(user_id);
CREATE INDEX idx_alerts_user ON alerts(user_id, created_at DESC);
CREATE INDEX idx_extensions_chrome_id ON extensions(chrome_id);

ALTER TABLE user_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own tracking" ON user_tracking FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users view own alerts" ON alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own alerts" ON alerts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users manage own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Extensions are public" ON extensions FOR SELECT USING (true);
CREATE POLICY "Snapshots are public" ON extension_snapshots FOR SELECT USING (true);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email) VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
```

---

## Step 4: File Structure to Create

Create ALL of these files in this exact structure:

```
app/
  layout.tsx                          ← Root layout with fonts and metadata
  page.tsx                            ← Landing page
  (auth)/
    login/page.tsx                    ← Magic link login/signup
  (dashboard)/
    layout.tsx                        ← Dashboard layout with sidebar
    dashboard/page.tsx                ← User's tracked extensions
    alerts/page.tsx                   ← Alert history
    settings/page.tsx                 ← Account settings
  search/page.tsx                     ← Public extension search
  extension/[id]/page.tsx             ← Extension detail page
  pricing/page.tsx                    ← Pricing plans
  privacy/page.tsx                    ← Privacy policy
  terms/page.tsx                      ← Terms of service
  api/
    extension/
      fetch/route.ts                  ← Fetch single extension data
      search/route.ts                 ← Search extensions
      track/route.ts                  ← Add/remove tracking
    alerts/
      route.ts                        ← Get/update alerts
    cron/
      check-extensions/route.ts       ← Daily monitoring job
    auth/
      callback/route.ts               ← Magic link callback handler

components/
  layout/
    Navbar.tsx                        ← Top navigation
    Footer.tsx                        ← Footer
    DashboardSidebar.tsx              ← Dashboard sidebar
  ui/
    Button.tsx                        ← Reusable button
    Card.tsx                          ← Reusable card
    Badge.tsx                         ← Status badges
    Input.tsx                         ← Form input
    MetricTile.tsx                    ← Stat display tile
    SkeletonCard.tsx                  ← Loading skeleton
    EmptyState.tsx                    ← Empty state component
  extension/
    ExtensionCard.tsx                 ← Search result card
    MetricsRow.tsx                    ← 4 metric tiles row
    UserGrowthChart.tsx               ← Recharts line chart
    RatingChart.tsx                   ← Rating history chart
    VersionTable.tsx                  ← Version history table
    ChangeLog.tsx                     ← Change timeline
    TrackCTABanner.tsx                ← Bottom CTA banner
  dashboard/
    TrackedExtensionCard.tsx          ← Dashboard extension card
    AlertItem.tsx                     ← Single alert row

lib/
  supabase/
    client.ts                         ← Browser client
    server.ts                         ← Server client
  scraper/
    fetchExtension.ts                 ← Fetch extension from Chrome Web Store
    parseExtension.ts                 ← Parse HTML to data
    extractId.ts                      ← Extract chrome ID from URL
  email/
    sendAlert.ts                      ← Send alert email via Resend
    templates/
      alertEmail.tsx                  ← Email HTML template
  utils/
    detectChanges.ts                  ← Compare snapshots for changes
    formatNumbers.ts                  ← Format 1247832 → "1.2M"

types/
  index.ts                            ← All TypeScript interfaces

vercel.json                           ← Cron job configuration
middleware.ts                         ← Auth middleware for protected routes
```

---

## Step 5: Key Implementation Details

### Supabase Clients

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
```

### Auth Middleware

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protect dashboard routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (!user && request.nextUrl.pathname.startsWith('/alerts')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (!user && request.nextUrl.pathname.startsWith('/settings')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect logged in users away from login page
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/cron).*)'],
}
```

### Number Formatter

```typescript
// lib/utils/formatNumbers.ts
export function formatUserCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toLocaleString()
}

export function formatDiff(current: number, previous: number): string {
  const diff = current - previous
  const sign = diff > 0 ? '+' : ''
  return `${sign}${formatUserCount(Math.abs(diff))}`
}
```

### Vercel Cron Config

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/check-extensions",
      "schedule": "0 9 * * *"
    }
  ]
}
```

---

## Step 6: Design Rules — Enforce These Everywhere

### Typography
```
All headings on marketing pages: font-serif (Instrument Serif)
All UI text, labels, body: font-sans (Geist)
All numbers, versions, IDs: font-mono (Geist Mono)
```

### Spacing
```
Page padding: px-6 md:px-8 lg:px-12
Section gap: space-y-16 or space-y-24
Card padding: p-6
```

### Cards — Use This Exact Style
```tsx
<div className="bg-white border border-border-subtle rounded-lg shadow-sm p-6">
```

### Buttons — Two Variants Only
```tsx
// Primary
<button className="bg-accent-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">

// Secondary
<button className="bg-white border border-border-subtle text-text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
```

### Metric Tiles
```tsx
<div className="bg-white border border-border-subtle rounded-lg p-4">
  <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">Total Users</p>
  <p className="text-2xl font-mono text-text-primary">1,247,832</p>
  <p className="text-sm text-accent-green mt-1">↑ 12,400 this week</p>
</div>
```

### Trend Colors
```
Positive change: text-accent-green
Negative change: text-accent-red
Neutral/info: text-accent-amber
```

---

## Step 7: Page by Page Build Order

Build in this exact order. Complete each before starting the next.

### Order:
1. Root layout + fonts + metadata
2. Supabase clients + middleware
3. Scraper (fetchExtension + parseExtension)
4. API routes (fetch, search, track, alerts)
5. Cron job (check-extensions)
6. Email (sendAlert + template)
7. Shared UI components (Button, Card, Badge, Input, MetricTile)
8. Navbar + Footer
9. Landing page (/)
10. Search page (/search)
11. Extension detail page (/extension/[id])
12. Login page (/login + magic link callback)
13. Dashboard layout + sidebar
14. Dashboard page (/dashboard)
15. Alerts page (/alerts)
16. Settings page (/settings)
17. Pricing page (/pricing)
18. Privacy + Terms pages
19. Loading skeletons + empty states for all pages
20. Error boundaries for all pages

---

## Step 8: Scraper Implementation

```typescript
// lib/scraper/fetchExtension.ts
export async function fetchExtensionFromStore(chromeId: string) {
  const url = `https://chromewebstore.google.com/detail/${chromeId}`
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
    },
  })

  if (!response.ok) {
    throw new Error(`Chrome Web Store returned ${response.status} for ${chromeId}`)
  }

  const html = await response.text()
  return parseExtensionHTML(html, chromeId)
}
```

```typescript
// lib/scraper/parseExtension.ts
import * as cheerio from 'cheerio'

export function parseExtensionHTML(html: string, chromeId: string) {
  const $ = cheerio.load(html)
  
  // User count
  const userText = $('*').filter((_, el) => {
    return $(el).text().match(/[\d,]+ users?/i) !== null
  }).first().text()
  const userMatch = userText.match(/([\d,]+)\s+users?/i)
  const userCount = userMatch ? parseInt(userMatch[1].replace(/,/g, '')) : null

  // Rating
  const ratingMatch = html.match(/(\d\.\d)\s*out of 5/i)
  const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null

  // Review count
  const reviewMatch = html.match(/([\d,]+)\s+ratings?/i)
  const reviewCount = reviewMatch ? parseInt(reviewMatch[1].replace(/,/g, '')) : null

  // Name from title
  const title = $('title').text()
  const name = title.replace(/\s*-\s*Chrome Web Store\s*$/i, '').trim()

  // Version
  const versionMatch = html.match(/Version[^>]*>\s*([\d.]+)/i)
  const version = versionMatch ? versionMatch[1].trim() : null

  // Icon - look for Google CDN image
  const iconMatch = html.match(/https:\/\/lh3\.googleusercontent\.com\/[A-Za-z0-9\-_]+/i)
  const iconUrl = iconMatch ? iconMatch[0] : null

  // Developer
  const developerMatch = html.match(/by\s+([^<\n]+)/i)
  const developer = developerMatch ? developerMatch[1].trim() : null

  return {
    chromeId,
    name: name || 'Unknown Extension',
    userCount,
    rating,
    reviewCount,
    version,
    iconUrl,
    developer,
    chromeUrl: `https://chromewebstore.google.com/detail/${chromeId}`,
    fetchedAt: new Date().toISOString(),
  }
}
```

```typescript
// lib/scraper/extractId.ts
export function extractChromeId(input: string): string | null {
  const trimmed = input.trim()
  
  // Direct 32-char ID
  if (/^[a-z]{32}$/.test(trimmed)) return trimmed
  
  // Chrome Web Store URL
  const urlMatch = trimmed.match(/chromewebstore\.google\.com\/detail\/[^/]+\/([a-z]{32})/i)
  if (urlMatch) return urlMatch[1]
  
  // Old format URL
  const oldMatch = trimmed.match(/chrome\.google\.com\/webstore\/detail\/[^/]+\/([a-z]{32})/i)
  if (oldMatch) return oldMatch[1]

  return null
}
```

---

## Step 9: Email Template

```typescript
// lib/email/templates/alertEmail.tsx
export function AlertEmailHTML({
  extensionName,
  message,
  alertType,
  extensionUrl,
  unsubscribeUrl,
}: {
  extensionName: string
  message: string
  alertType: string
  extensionUrl: string
  unsubscribeUrl: string
}) {
  const icon = alertType === 'rating_change' ? '📉' 
    : alertType === 'version_update' ? '🔄' 
    : '🎉'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: system-ui, sans-serif; background: #FAFAFA; margin: 0; padding: 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 8px; border: 1px solid #E8ECF0; overflow: hidden;">
    
    <div style="background: #2563EB; padding: 20px 24px;">
      <p style="color: white; font-size: 18px; font-weight: 700; margin: 0;">Extly</p>
      <p style="color: #BFDBFE; font-size: 13px; margin: 4px 0 0;">Extension Intelligence</p>
    </div>

    <div style="padding: 24px;">
      <p style="font-size: 28px; margin: 0 0 8px;">${icon}</p>
      <h1 style="font-size: 20px; color: #0F1117; margin: 0 0 8px;">${extensionName} changed</h1>
      <p style="font-size: 16px; color: #6B7280; margin: 0 0 24px;">${message}</p>
      
      <a href="${extensionUrl}" style="display: inline-block; background: #2563EB; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 500;">
        View Extension Details →
      </a>
    </div>

    <div style="padding: 16px 24px; border-top: 1px solid #E8ECF0; background: #FAFAFA;">
      <p style="font-size: 12px; color: #9CA3AF; margin: 0;">
        You're receiving this because you're tracking this extension on Extly.
        <a href="${unsubscribeUrl}" style="color: #6B7280;">Unsubscribe</a>
      </p>
    </div>

  </div>
</body>
</html>
  `
}
```

---

## Step 10: Charts Implementation

```tsx
// components/extension/UserGrowthChart.tsx
'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Props {
  data: { date: string; users: number }[]
}

export function UserGrowthChart({ data }: Props) {
  return (
    <div className="bg-white border border-border-subtle rounded-lg p-6">
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-4">
        User Growth
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF0" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v >= 1000 ? `${(v/1000).toFixed(0)}K` : v}
          />
          <Tooltip 
            contentStyle={{ 
              border: '1px solid #E8ECF0', 
              borderRadius: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke="#2563EB" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#2563EB' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

---

## Critical Rules for AI Agent

1. **Never use inline styles** except in email templates
2. **Never use any color not in the design tokens** — only use the custom colors defined in tailwind.config.ts
3. **Always use TypeScript** — no `any` types except where absolutely necessary
4. **Always handle loading, error, and empty states** — every async component needs all three
5. **Always use Server Components by default** — only add 'use client' when you need interactivity
6. **Never skip the skeleton loaders** — every page that fetches data needs one
7. **Scraper runs server-side only** — never expose scraping logic to the browser
8. **Service role key only in API routes and cron** — never in client components
9. **All forms use controlled inputs** — no uncontrolled form elements
10. **Mobile first** — build mobile layout first, add desktop with md: and lg: prefixes

---

## Done When

The build is complete when:
- [ ] All 10 pages render without errors
- [ ] Magic link auth works end to end
- [ ] Searching an extension by URL fetches real data
- [ ] Tracking an extension saves to database
- [ ] Cron endpoint runs without errors (test manually)
- [ ] Alert email sends correctly via Resend
- [ ] Dashboard shows tracked extensions
- [ ] Alerts page shows alert history
- [ ] All pages have working loading and empty states
- [ ] Deployed to Vercel successfully
