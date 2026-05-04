---
trigger: model_decision
description: Hard security rules. Which env vars are public vs secret, cron auth check, RLS policies, input validation, email rate limits, scraping ethics. Never violate these for any reason.
---

# RULE FILE 06 — Security
# These are hard rules. Never violate them. No exceptions for any reason.

## Authentication Rules

- Auth method: Magic link (passwordless email) only
- No Google OAuth in V1
- No username/password in V1
- Sessions managed by Supabase JWT — never manage sessions manually
- Magic links expire after 10 minutes — this is Supabase default, do not change it
- Always use createClient() from lib/supabase/server.ts in server components
- Always use createClient() from lib/supabase/client.ts in client components
- Never mix server and browser clients

## API Key Rules

NEVER put these in client components or expose to browser:
- SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY
- CRON_SECRET

These are SAFE to use in browser (they are public):
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_APP_URL

Service role key is ONLY used in:
- /api/cron/check-extensions route
- Any server-side batch operations

## Cron Job Security

The cron endpoint MUST verify the Bearer token before doing anything:

```typescript
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ... rest of cron logic
}
```

Never skip this check. Never weaken it.

## RLS (Row Level Security) Rules

RLS is enabled on:
- user_tracking
- alerts
- profiles

This means even if an attacker gets the anon key, they cannot read other users' data.

Never write code that:
- Disables RLS on any table
- Uses service role key in client components
- Queries user_tracking or alerts without user context on client side

## Input Validation Rules

Every API route that accepts input MUST validate it before using it.

Validate these specifically:
- Chrome extension IDs: must match /^[a-z]{32}$/ pattern
- Email addresses: basic format check
- alert type values: must be one of the three allowed strings
- Pagination params: must be positive integers within reasonable limits

```typescript
// Chrome ID validation
function isValidChromeId(id: string): boolean {
  return /^[a-z]{32}$/.test(id)
}

// Usage in API route
const chromeId = searchParams.get('id')
if (!chromeId || !isValidChromeId(chromeId)) {
  return NextResponse.json({ error: 'Invalid extension ID' }, { status: 400 })
}
```

## Environment Variables Rules

Never commit .env.local to git.
.env.local must be in .gitignore.
Never hardcode any secret, API key, or URL in source code.

## Email Security Rules

Every alert email MUST include:
- A working unsubscribe link
- Clear sender identification (From: Extly alerts@extly.com)
- No tracking pixels in V1

Rate limit emails per user:
- Maximum 1 alert email per extension per day
- If multiple changes detected in same day, combine into one email
- Never send more than 10 emails per user per day across all extensions

## Data Exposure Rules

These are safe to expose publicly (no auth required):
- Extension name, description, developer, category, icon, chrome_url
- Extension snapshots (user_count, rating, review_count, version, snapshot_date)

These are NEVER exposed without auth:
- User email addresses
- Which extensions a user is tracking
- User alert history
- User profile data

## Scraping Ethics Rules

- Add 500ms delay between each extension fetch in the cron job
- Never make more than 100 scraping requests per hour
- Use realistic User-Agent headers
- Do not scrape data that requires login on Chrome Web Store
- Only scrape publicly visible extension pages

## .gitignore — These Must Always Be Ignored

```
.env.local
.env
.env.*.local
node_modules/
.next/
```
