# TASK 10 — Final Polish, Testing & Deployment
# Complete ALL previous tasks before starting this.

## Your Mission
Final quality pass across the entire application.
Fix anything broken. Add missing states. Deploy to Vercel.
This task is done when the app is live and fully working.

---

## Step 1: Full TypeScript Check
Run this and fix every error:
```bash
npx tsc --noEmit
```
Zero TypeScript errors required before moving forward.

---

## Step 2: Check Every Page for Missing States

Visit each page and verify all three states exist:

### Landing page (/)
- [ ] Loads correctly with no console errors
- [ ] All fonts render (Instrument Serif on headlines, Geist elsewhere)
- [ ] Mobile layout works at 375px width

### Search page (/search)
- [ ] Empty state shows before searching
- [ ] Loading skeleton shows while fetching
- [ ] Results render with correct data
- [ ] No results state shows when nothing found
- [ ] Suggestion chips work

### Extension detail (/extension/[validId])
- [ ] Loads with real Chrome extension data
- [ ] All 4 metric tiles show values
- [ ] Both charts render (may show limited data at first)
- [ ] Version table renders
- [ ] Change log shows (may be empty at first)
- [ ] Track button works for logged in users
- [ ] Track button redirects to login for logged out users

### Extension detail (/extension/invalidid)
- [ ] Shows 404 not found page

### Login (/login)
- [ ] Email input works
- [ ] Submit sends magic link
- [ ] Shows "check inbox" state after submit
- [ ] "Use different email" resets form

### Dashboard (/dashboard) — must be logged in
- [ ] Shows tracked extensions
- [ ] Empty state shows when nothing tracked
- [ ] Quick add bar tracks new extension
- [ ] Free limit banner shows at 3 extensions

### Alerts (/alerts) — must be logged in
- [ ] Shows alert history
- [ ] Filter tabs change results
- [ ] Mark as read works on single alert
- [ ] Mark all as read works
- [ ] Empty state shows when no alerts

### Settings (/settings) — must be logged in
- [ ] Shows correct user email
- [ ] Notification toggles save correctly

### Pricing (/pricing)
- [ ] Both cards render correctly
- [ ] Pro button is disabled

### Privacy (/privacy) and Terms (/terms)
- [ ] All sections render correctly

---

## Step 3: Fix Common Issues

### Hydration errors
If you see hydration errors, the component is using browser APIs in server component.
Fix: Add 'use client' or move the logic to useEffect.

### Supabase auth not persisting
Make sure middleware.ts is correctly updating cookies on every request.
Check that both createClient implementations match rule file 02-stack.md exactly.

### Charts not rendering
Recharts components must have 'use client' at the top.
Wrap in a div with explicit height: className="h-48" or similar.
ResponsiveContainer needs a parent with defined height.

### Fonts not loading
Check that Instrument_Serif is imported with weight: '400' in layout.tsx.
Verify CSS variables are being applied: --font-instrument-serif etc.

---

## Step 4: Test the Core Pipeline

This is the most critical test. Do it manually:

1. Register a new account via magic link
2. Search for "Grammarly"
3. Click Track on Grammarly
4. Go to Dashboard — verify Grammarly appears
5. Go to Alerts — verify it's empty (no changes yet)
6. Manually trigger the cron job:
```bash
curl -H "Authorization: Bearer {your_CRON_SECRET}" \
  http://localhost:3000/api/cron/check-extensions
```
7. Check response shows extensionsChecked: 1
8. Check extension_snapshots table in Supabase — new record should exist

---

## Step 5: Add Missing Error Pages

### app/not-found.tsx
```typescript
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-mono font-bold text-border-subtle">404</p>
        <h1 className="text-2xl font-semibold text-text-primary mt-4">Page not found</h1>
        <p className="text-text-secondary mt-2">The page you're looking for doesn't exist.</p>
        <Link href="/" className="mt-6 inline-block bg-accent-blue text-white px-4 py-2 rounded-md text-sm font-medium">
          Go Home
        </Link>
      </div>
    </div>
  )
}
```

### app/error.tsx
```typescript
'use client'

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl font-mono font-bold text-accent-red">Error</p>
        <h1 className="text-2xl font-semibold text-text-primary mt-4">Something went wrong</h1>
        <p className="text-text-secondary mt-2">An unexpected error occurred.</p>
        <button onClick={reset} className="mt-6 bg-accent-blue text-white px-4 py-2 rounded-md text-sm font-medium">
          Try Again
        </button>
      </div>
    </div>
  )
}
```

---

## Step 6: SEO and Metadata

Add metadata to these pages if not already done:

app/page.tsx:
```typescript
export const metadata = {
  title: 'Extly — Real Time Chrome Extension Intelligence',
  description: 'Get alerted the moment Chrome extensions change. Track ratings, versions, and user counts daily — not monthly like ChromeStats.',
}
```

app/search/page.tsx:
```typescript
export const metadata = {
  title: 'Search Chrome Extensions | Extly',
  description: 'Find and track any Chrome extension. Monitor ratings, user counts, and version history in real time.',
}
```

app/pricing/page.tsx:
```typescript
export const metadata = {
  title: 'Pricing | Extly',
  description: 'Start tracking Chrome extensions for free. Upgrade to Pro for more extensions and longer history.',
}
```

---

## Step 7: Deploy to Vercel

```bash
# Push to GitHub first
git add .
git commit -m "Initial Extly build"
git push origin main
```

Then in Vercel dashboard:
1. Import GitHub repository
2. Add ALL environment variables from .env.local
3. Deploy

After deployment:
- [ ] Visit production URL — app loads correctly
- [ ] Magic link email arrives with correct redirect URL (production URL not localhost)
- [ ] NEXT_PUBLIC_APP_URL is set to production URL in Vercel env vars
- [ ] Cron job shows as active in Vercel dashboard

---

## Step 8: Configure Supabase for Production

In Supabase dashboard:
1. Authentication → URL Configuration
2. Set Site URL to your Vercel production URL
3. Add Vercel URL to Redirect URLs: https://your-app.vercel.app/api/auth/callback

---

## Final Checklist — App is Done When

### Core functionality
- [ ] Magic link auth works in production
- [ ] Searching an extension fetches real data
- [ ] Tracking an extension saves to Supabase
- [ ] Dashboard shows tracked extensions
- [ ] Alerts page shows change history
- [ ] Cron job endpoint is active (check Vercel Cron tab)

### All 10 pages working
- [ ] / (landing)
- [ ] /search
- [ ] /extension/[id]
- [ ] /login
- [ ] /dashboard
- [ ] /alerts
- [ ] /settings
- [ ] /pricing
- [ ] /privacy
- [ ] /terms

### Quality
- [ ] Zero TypeScript errors
- [ ] Zero console errors in browser
- [ ] All pages mobile responsive
- [ ] All loading states working
- [ ] All empty states working
- [ ] 404 page working
- [ ] Error boundary working
- [ ] No broken links

### Deployed
- [ ] Live on Vercel production URL
- [ ] All env vars set in Vercel
- [ ] Supabase redirect URL configured
- [ ] Cron job active in Vercel dashboard

## You're Done. Ship it.
Post on Twitter. Post on Reddit. Post on Indie Hackers.
The product is live. Now get users.
