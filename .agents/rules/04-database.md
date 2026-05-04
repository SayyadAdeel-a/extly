---
trigger: model_decision
description: Database schema, RLS rules, and exact Supabase query patterns for every operation. Never bypass RLS on client side. Service role key only in cron job. All alert_type values defined here.
---

# RULE FILE 04 — Database
# Never modify the schema. Never bypass RLS on client side. Never use raw SQL in components.

## Tables Overview

```
extensions          — Chrome extension metadata (public read)
extension_snapshots — Daily stats snapshots (public read)
user_tracking       — Which users track which extensions (private)
alerts              — Alert history per user (private)
profiles            — User profile extending auth.users (private)
```

## Complete Schema

```sql
-- Extensions (public)
extensions (
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
)

-- Daily snapshots (public)
extension_snapshots (
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
)

-- User tracking (private — RLS enforced)
user_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  extension_id UUID REFERENCES extensions(id) ON DELETE CASCADE,
  notify_rating BOOLEAN DEFAULT TRUE,
  notify_version BOOLEAN DEFAULT TRUE,
  notify_users BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, extension_id)
)

-- Alerts (private — RLS enforced)
alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  extension_id UUID REFERENCES extensions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- Profiles (private — RLS enforced)
profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  plan TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW()
)
```

## RLS Rules — Never Bypass These in Client Code

```
extensions:          Public SELECT — anyone can read
extension_snapshots: Public SELECT — anyone can read
user_tracking:       user_id = auth.uid() — users see only their own
alerts:              user_id = auth.uid() — users see only their own
profiles:            id = auth.uid() — users see only their own
```

The ONLY exception: the cron job uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS.
This is intentional and correct. Never use service role key in client components.

## Query Patterns — Use These Exact Patterns

### Get extension with latest snapshot
```typescript
const { data } = await supabase
  .from('extensions')
  .select(`
    *,
    extension_snapshots (
      user_count, rating, review_count, version, snapshot_date
    )
  `)
  .eq('chrome_id', chromeId)
  .order('snapshot_date', { 
    foreignTable: 'extension_snapshots', 
    ascending: false 
  })
  .limit(1, { foreignTable: 'extension_snapshots' })
  .single()
```

### Get snapshots for chart (last 30 days)
```typescript
const thirtyDaysAgo = new Date()
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

const { data } = await supabase
  .from('extension_snapshots')
  .select('user_count, rating, snapshot_date')
  .eq('extension_id', extensionId)
  .gte('snapshot_date', thirtyDaysAgo.toISOString().split('T')[0])
  .order('snapshot_date', { ascending: true })
```

### Get user's tracked extensions with latest snapshot
```typescript
const { data } = await supabase
  .from('user_tracking')
  .select(`
    *,
    extension:extensions (
      id, chrome_id, name, icon_url, chrome_url, developer,
      extension_snapshots (
        user_count, rating, version, snapshot_date
      )
    )
  `)
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
```

### Get user's unread alert count
```typescript
const { count } = await supabase
  .from('alerts')
  .select('*', { count: 'exact', head: true })
  .eq('user_id', userId)
  .eq('read', false)
```

### Check if user is at free plan limit
```typescript
const { count } = await supabase
  .from('user_tracking')
  .select('*', { count: 'exact', head: true })
  .eq('user_id', userId)

const isAtLimit = (count ?? 0) >= 3
```

### Save new snapshot (upsert — safe to run daily)
```typescript
await supabase
  .from('extension_snapshots')
  .upsert({
    extension_id: extensionId,
    user_count: data.userCount,
    rating: data.rating,
    review_count: data.reviewCount,
    version: data.version,
    snapshot_date: new Date().toISOString().split('T')[0]
  }, {
    onConflict: 'extension_id,snapshot_date'
  })
```

## alert_type Values — Use Only These Strings

```
'rating_change'    — Rating went up or down by 0.1 or more
'version_update'   — New version string detected
'user_milestone'   — Crossed a milestone: 1K, 5K, 10K, 50K, 100K, 500K, 1M
```

## plan Values in profiles — Use Only These Strings

```
'free'    — Default. Max 3 extensions tracked.
'pro'     — V2 feature. Not implemented in V1.
'agency'  — V2 feature. Not implemented in V1.
```
