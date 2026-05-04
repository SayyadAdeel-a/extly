# API Routes Specification — Extly

## All API Endpoints

---

### GET /api/extension/fetch?id={chromeId}

Fetches live data for a single extension from Chrome Web Store.

**Auth:** Not required (public)

**Query params:**
- `id` — Chrome extension ID (32 char string) OR full Chrome Web Store URL

**Success response (200):**
```json
{
  "chromeId": "cfhdojbkjhnklbpkdaibdccddilifddb",
  "name": "Grammarly",
  "userCount": 10234521,
  "rating": 4.7,
  "reviewCount": 85432,
  "version": "14.1133.0",
  "iconUrl": "https://lh3.googleusercontent.com/...",
  "developer": "Grammarly",
  "chromeUrl": "https://chromewebstore.google.com/detail/cfhdojbkjhnklbpkdaibdccddilifddb",
  "fetchedAt": "2026-05-03T09:00:00Z"
}
```

**Error responses:**
```json
{ "error": "Invalid extension ID" }           // 400
{ "error": "Extension not found" }            // 404
{ "error": "Failed to fetch extension" }      // 500
```

**Logic:**
1. Extract chrome ID from input using `extractChromeId()`
2. Validate ID format
3. Check if extension exists in `extensions` table
4. If exists and fetched < 1 hour ago: return cached data
5. If not: scrape Chrome Web Store, save to `extensions` table, save snapshot
6. Return data

---

### GET /api/extension/search?q={query}

Search extensions by name. Queries our database first then Chrome Web Store.

**Auth:** Not required (public)

**Query params:**
- `q` — Search query string (min 2 chars)

**Success response (200):**
```json
{
  "results": [
    {
      "id": "uuid",
      "chromeId": "cfhdojbkjhnklbpkdaibdccddilifddb",
      "name": "Grammarly",
      "developer": "Grammarly",
      "category": "Writing",
      "iconUrl": "https://...",
      "latestSnapshot": {
        "userCount": 10234521,
        "rating": 4.7,
        "version": "14.1133.0",
        "snapshotDate": "2026-05-03"
      }
    }
  ],
  "total": 1
}
```

**Logic:**
1. Query `extensions` table with ILIKE search on name
2. Join with latest `extension_snapshots` for each result
3. Return up to 20 results

---

### POST /api/extension/track

Add or remove an extension from user's tracking list.

**Auth:** Required (magic link session)

**Request body:**
```json
{
  "chromeId": "cfhdojbkjhnklbpkdaibdccddilifddb",
  "action": "track"
}
```
or
```json
{
  "extensionId": "uuid",
  "action": "untrack"
}
```

**Success response (200):**
```json
{ "success": true, "action": "tracked", "extensionId": "uuid" }
```

**Error responses:**
```json
{ "error": "Not authenticated" }              // 401
{ "error": "Free plan limit reached (3/3)" }  // 403
{ "error": "Extension not found" }            // 404
{ "error": "Already tracking this extension" }// 409
```

**Logic for track:**
1. Verify user session
2. Check user's current tracking count — if free plan and >= 3, return 403
3. Fetch/create extension in database
4. Insert `user_tracking` record
5. Fetch and save first snapshot immediately
6. Return success

**Logic for untrack:**
1. Verify user session
2. Delete `user_tracking` record where user_id and extension_id match
3. Return success

---

### GET /api/alerts

Get alert history for authenticated user.

**Auth:** Required

**Query params:**
- `limit` — Number of alerts (default: 50, max: 100)
- `offset` — Pagination offset (default: 0)
- `type` — Filter by type: `rating_change` | `version_update` | `user_milestone` | `all`
- `unread` — Filter unread only: `true` | `false`

**Success response (200):**
```json
{
  "alerts": [
    {
      "id": "uuid",
      "alertType": "rating_change",
      "oldValue": "4.8",
      "newValue": "4.6",
      "message": "Rating dropped from 4.8 to 4.6",
      "read": false,
      "createdAt": "2026-05-03T09:00:00Z",
      "extension": {
        "id": "uuid",
        "name": "Grammarly",
        "iconUrl": "https://..."
      }
    }
  ],
  "total": 12,
  "unreadCount": 3
}
```

---

### PATCH /api/alerts

Mark alerts as read.

**Auth:** Required

**Request body:**
```json
{ "alertIds": ["uuid1", "uuid2"] }
```
or
```json
{ "markAllRead": true }
```

**Success response (200):**
```json
{ "success": true, "updated": 3 }
```

---

### GET /api/cron/check-extensions

Daily cron job. Checks all tracked extensions for changes.

**Auth:** Bearer token (CRON_SECRET)

**Headers required:**
```
Authorization: Bearer {CRON_SECRET}
```

**Success response (200):**
```json
{
  "success": true,
  "extensionsChecked": 47,
  "changesDetected": 3,
  "alertsSent": 8,
  "errors": []
}
```

**Logic (detailed):**
1. Verify Bearer token matches CRON_SECRET
2. Query all extensions with at least one user tracking them
3. For each extension:
   a. Fetch fresh data from Chrome Web Store
   b. Wait 500ms (rate limiting)
   c. Get yesterday's snapshot from database
   d. Save today's snapshot (upsert)
   e. Update extension `last_fetched_at`
   f. If yesterday's snapshot exists, run `detectChanges()`
   g. For each change detected:
      - For each user tracking this extension:
        - Check if user has that alert type enabled
        - Insert alert record
        - Send email via Resend
4. Return summary stats

---

### GET /api/auth/callback

Handles magic link redirect after user clicks email link.

**Auth:** Not required (this IS the auth)

**Query params (set by Supabase):**
- `code` — Auth code from magic link

**Logic:**
1. Exchange code for session using Supabase
2. Redirect to `/dashboard` on success
3. Redirect to `/login?error=auth_failed` on failure

```typescript
// app/api/auth/callback/route.ts
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
