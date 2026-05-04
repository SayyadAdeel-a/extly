# TASK 04 — API Routes
# Complete Tasks 01 and 02 before starting this.

## Your Mission
Build all four API routes. These are the backend of Extly.
Every page depends on these routes working correctly.

## Routes to Build

---

### app/api/extension/fetch/route.ts
GET /api/extension/fetch?id={chromeId}

Purpose: Fetch live data for a single extension. Public — no auth required.

Logic:
1. Get `id` from query params
2. Extract chrome ID using extractChromeId() — handles both raw IDs and full URLs
3. Validate: if not valid chrome ID format, return 400
4. Check extensions table for existing record with this chrome_id
5. If found AND last_fetched_at is less than 1 hour ago: return cached data with latest snapshot
6. If not found OR stale: call fetchExtensionFromStore(chromeId)
7. Upsert extension record in extensions table
8. Insert new snapshot in extension_snapshots table for today
9. Return scraped data

Error handling:
- Invalid ID → 400 { error: 'Invalid extension ID' }
- Extension not found on Chrome Web Store → 404 { error: 'Extension not found' }
- Scraping failed → 500 { error: 'Failed to fetch extension data' }

Use SUPABASE_SERVICE_ROLE_KEY for database writes (not anon key).

---

### app/api/extension/search/route.ts
GET /api/extension/search?q={query}

Purpose: Search extensions by name. Public — no auth required.

Logic:
1. Get `q` from query params
2. If q is less than 2 characters: return 400
3. Check if q looks like a Chrome Web Store URL or extension ID
   - If yes: call the fetch route logic directly instead of searching
4. Query extensions table: name ILIKE '%{q}%' OR developer ILIKE '%{q}%'
5. For each result, join with most recent extension_snapshots record
6. Return up to 20 results ordered by user_count DESC

Response shape:
```typescript
{
  results: Array<{
    id: string
    chromeId: string
    name: string
    developer: string | null
    category: string | null
    iconUrl: string | null
    chromeUrl: string
    latestSnapshot: {
      userCount: number | null
      rating: number | null
      reviewCount: number | null
      version: string | null
      snapshotDate: string
    } | null
  }>
  total: number
}
```

---

### app/api/extension/track/route.ts
POST /api/extension/track

Purpose: Add or remove extension from user tracking. Auth required.

Request body:
```typescript
// To track:
{ chromeId: string, action: 'track' }

// To untrack:
{ extensionId: string, action: 'untrack' }
```

Logic for action='track':
1. Verify user session — return 401 if not authenticated
2. Validate chromeId format — return 400 if invalid
3. Count user's current tracking: SELECT count FROM user_tracking WHERE user_id = userId
4. If count >= 3 AND user plan is 'free': return 403 { error: 'Free plan limit reached' }
5. Check if extension exists in extensions table
6. If not: call fetchExtensionFromStore, save to extensions table, save first snapshot
7. Check if already tracking: if yes return 409 { error: 'Already tracking' }
8. Insert into user_tracking table
9. Return 200 { success: true, action: 'tracked', extensionId: uuid }

Logic for action='untrack':
1. Verify user session — return 401 if not authenticated
2. Validate extensionId (UUID format)
3. Delete from user_tracking WHERE user_id = userId AND extension_id = extensionId
4. Return 200 { success: true, action: 'untracked' }

---

### app/api/alerts/route.ts
GET and PATCH on same route.

GET /api/alerts — Get user's alert history. Auth required.

Query params:
- limit (default 50, max 100)
- offset (default 0)
- type ('rating_change' | 'version_update' | 'user_milestone' | 'all')
- unread ('true' | 'false' | undefined)

Logic:
1. Verify auth — 401 if not authenticated
2. Build query on alerts table filtered by user_id
3. If type not 'all': add WHERE alert_type = type
4. If unread='true': add WHERE read = false
5. Join with extensions table for extension name and icon
6. Order by created_at DESC
7. Apply limit and offset
8. Also fetch total unread count separately
9. Return alerts array + total + unreadCount

PATCH /api/alerts — Mark alerts as read. Auth required.

Request body:
```typescript
{ alertIds: string[] }
// OR
{ markAllRead: true }
```

Logic:
1. Verify auth — 401 if not authenticated
2. If markAllRead: UPDATE alerts SET read=true WHERE user_id = userId
3. If alertIds: UPDATE alerts SET read=true WHERE id IN (alertIds) AND user_id = userId
4. Return { success: true, updated: count }

---

### app/api/auth/callback/route.ts
GET /api/auth/callback

Purpose: Handle magic link redirect after user clicks email link.

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
```

## Done When
- [ ] GET /api/extension/fetch returns extension data for valid chrome ID
- [ ] GET /api/extension/fetch returns extension data for full Chrome Web Store URL
- [ ] GET /api/extension/fetch returns 400 for invalid ID
- [ ] GET /api/extension/fetch returns 404 for non-existent extension
- [ ] GET /api/extension/fetch uses cached data if fetched within 1 hour
- [ ] GET /api/extension/search returns results for name query
- [ ] GET /api/extension/search handles URL input by fetching directly
- [ ] POST /api/extension/track adds tracking record for authenticated user
- [ ] POST /api/extension/track returns 401 for unauthenticated request
- [ ] POST /api/extension/track returns 403 when free user has 3 extensions
- [ ] POST /api/extension/track returns 409 if already tracking
- [ ] POST /api/extension/track with untrack removes record correctly
- [ ] GET /api/alerts returns user's alerts with extension data joined
- [ ] GET /api/alerts filters by type and unread correctly
- [ ] PATCH /api/alerts marks specific alerts as read
- [ ] PATCH /api/alerts marks all alerts as read when markAllRead=true
- [ ] GET /api/auth/callback redirects to /dashboard on success
- [ ] GET /api/auth/callback redirects to /login?error=auth_failed on failure
- [ ] All routes return correct HTTP status codes
- [ ] All routes have try/catch with console.error logging
