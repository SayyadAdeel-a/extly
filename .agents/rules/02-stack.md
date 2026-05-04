---
trigger: model_decision
description: Complete tech stack decisions. Next.js 14, Supabase, Tailwind, Resend, Recharts. File structure, install commands, Supabase client code, Vercel cron config. Never change these.
---

# RULE FILE 02 — Tech Stack
# These decisions are final. Never suggest alternatives. Never swap libraries.

## The Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 14+ with App Router |
| Language | TypeScript | Strict mode always |
| Styling | Tailwind CSS | Only — no CSS modules, no styled-components |
| Database | Supabase | PostgreSQL via Supabase client |
| Auth | Supabase Auth | Magic link / passwordless only |
| Email | Resend | For all transactional emails |
| Charts | Recharts | For all data visualization |
| Icons | Lucide React | For all icons |
| HTML Parsing | Cheerio | For scraping Chrome Web Store |
| Hosting | Vercel | With cron jobs enabled |
| Scheduling | Vercel Cron Jobs | Daily at 9 AM UTC |

## Install Command

```bash
npx create-next-app@latest extly --typescript --tailwind --app --no-src-dir
cd extly
npm install @supabase/supabase-js @supabase/ssr resend recharts lucide-react cheerio
npm install -D @types/cheerio
```

## File Structure — Never Deviate From This

```
app/
  layout.tsx
  page.tsx
  (auth)/
    login/page.tsx
  (dashboard)/
    layout.tsx
    dashboard/page.tsx
    alerts/page.tsx
    settings/page.tsx
  search/page.tsx
  extension/[id]/page.tsx
  pricing/page.tsx
  privacy/page.tsx
  terms/page.tsx
  api/
    extension/
      fetch/route.ts
      search/route.ts
      track/route.ts
    alerts/route.ts
    cron/
      check-extensions/route.ts
    auth/
      callback/route.ts

components/
  layout/
    Navbar.tsx
    Footer.tsx
    DashboardSidebar.tsx
  ui/
    Button.tsx
    Card.tsx
    Badge.tsx
    Input.tsx
    MetricTile.tsx
    SkeletonCard.tsx
    EmptyState.tsx
  extension/
    ExtensionCard.tsx
    MetricsRow.tsx
    UserGrowthChart.tsx
    RatingChart.tsx
    VersionTable.tsx
    ChangeLog.tsx
    TrackCTABanner.tsx
  dashboard/
    TrackedExtensionCard.tsx
    AlertItem.tsx

lib/
  supabase/
    client.ts
    server.ts
  scraper/
    fetchExtension.ts
    parseExtension.ts
    extractId.ts
  email/
    sendAlert.ts
    templates/alertEmail.ts
  utils/
    detectChanges.ts
    formatNumbers.ts

types/
  index.ts

vercel.json
middleware.ts
```

## Environment Variables

Always read from environment. Never hardcode values.

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
NEXT_PUBLIC_APP_URL
CRON_SECRET
```

## Supabase Client — Always Use These Exact Implementations

### Browser client (lib/supabase/client.ts)
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Server client (lib/supabase/server.ts)
```typescript
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

## Rendering Strategy

- Default to Server Components
- Only add 'use client' when you absolutely need:
  - useState or useEffect
  - Browser APIs
  - Event listeners
  - Recharts (must be client side)
- Never make a component client side just because it's easier

## Vercel Cron Config

```json
{
  "crons": [
    {
      "path": "/api/cron/check-extensions",
      "schedule": "0 9 * * *"
    }
  ]
}
```
