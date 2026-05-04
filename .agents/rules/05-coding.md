---
trigger: model_decision
description: TypeScript rules, all core types, API route pattern, number formatting, change detection logic, component state handling, import order. Read this before writing any function or component.
---

# RULE FILE 05 — Coding Standards
# Follow these patterns on every file you write. No exceptions.

## TypeScript Rules

- Strict mode always — tsconfig has "strict": true
- No `any` type anywhere except email template params
- All function parameters must be typed
- All return types must be explicit on API routes
- Use interfaces not type aliases for object shapes
- All types live in types/index.ts

## Core Types — Always Import From Here

```typescript
// types/index.ts — these are the only types used across the app

export interface Extension {
  id: string
  chrome_id: string
  name: string
  description: string | null
  developer: string | null
  category: string | null
  icon_url: string | null
  chrome_url: string
  created_at: string
  last_fetched_at: string | null
  is_active: boolean
}

export interface ExtensionSnapshot {
  id: string
  extension_id: string
  user_count: number | null
  rating: number | null
  review_count: number | null
  version: string | null
  last_updated_date: string | null
  snapshot_date: string
  created_at: string
}

export interface UserTracking {
  id: string
  user_id: string
  extension_id: string
  notify_rating: boolean
  notify_version: boolean
  notify_users: boolean
  created_at: string
}

export interface Alert {
  id: string
  extension_id: string
  user_id: string
  alert_type: 'rating_change' | 'version_update' | 'user_milestone'
  old_value: string | null
  new_value: string | null
  message: string
  read: boolean
  created_at: string
  extension?: Extension
}

export interface Profile {
  id: string
  email: string | null
  name: string | null
  plan: 'free' | 'pro' | 'agency'
  created_at: string
}

export interface ScrapedExtension {
  chromeId: string
  name: string
  userCount: number | null
  rating: number | null
  reviewCount: number | null
  version: string | null
  iconUrl: string | null
  developer: string | null
  chromeUrl: string
  fetchedAt: string
}

export interface DetectedChange {
  type: 'rating_change' | 'version_update' | 'user_milestone'
  oldValue: string
  newValue: string
  message: string
  severity: 'info' | 'warning' | 'critical'
}
```

## API Route Pattern — Always Use This Structure

```typescript
// Every API route follows this exact pattern
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    // 1. Auth check if required
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // 2. Input validation
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
    }

    // 3. Business logic

    // 4. Return response
    return NextResponse.json({ data: result })

  } catch (error) {
    console.error('[API route name]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## Number Formatting — Always Use These Functions

```typescript
// lib/utils/formatNumbers.ts

export function formatUserCount(count: number | null): string {
  if (!count) return '—'
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toLocaleString()
}

export function formatRating(rating: number | null): string {
  if (!rating) return '—'
  return rating.toFixed(1)
}

export function formatDiff(current: number, previous: number): string {
  const diff = current - previous
  const sign = diff > 0 ? '+' : ''
  return `${sign}${formatUserCount(Math.abs(diff))}`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}
```

## Change Detection — Always Use This Logic

```typescript
// lib/utils/detectChanges.ts

export function detectChanges(
  previous: ExtensionSnapshot,
  current: ExtensionSnapshot
): DetectedChange[] {
  const changes: DetectedChange[] = []

  // Rating change (0.1 threshold)
  if (previous.rating && current.rating) {
    const diff = current.rating - previous.rating
    if (Math.abs(diff) >= 0.1) {
      changes.push({
        type: 'rating_change',
        oldValue: previous.rating.toString(),
        newValue: current.rating.toString(),
        message: diff > 0
          ? `Rating improved from ${previous.rating} to ${current.rating}`
          : `Rating dropped from ${previous.rating} to ${current.rating}`,
        severity: diff < -0.2 ? 'critical' : diff < 0 ? 'warning' : 'info'
      })
    }
  }

  // Version change
  if (previous.version && current.version && previous.version !== current.version) {
    changes.push({
      type: 'version_update',
      oldValue: previous.version,
      newValue: current.version,
      message: `New version released: ${previous.version} → ${current.version}`,
      severity: 'info'
    })
  }

  // User milestones
  const milestones = [1000, 5000, 10000, 50000, 100000, 500000, 1000000]
  if (previous.user_count && current.user_count) {
    for (const milestone of milestones) {
      if (previous.user_count < milestone && current.user_count >= milestone) {
        changes.push({
          type: 'user_milestone',
          oldValue: previous.user_count.toString(),
          newValue: current.user_count.toString(),
          message: `Reached ${milestone.toLocaleString()} users`,
          severity: 'info'
        })
      }
    }
  }

  return changes
}
```

## Component Rules

### Always handle all states
Every component that fetches data MUST handle:
```typescript
if (loading) return <SkeletonCard />
if (error) return <ErrorState message={error} onRetry={retry} />
if (!data || data.length === 0) return <EmptyState ... />
return <ActualContent />
```

### Props must be typed
```typescript
// Always type your props explicitly
interface ExtensionCardProps {
  extension: Extension
  snapshot: ExtensionSnapshot | null
  isTracking: boolean
  onTrack: () => void
}

export function ExtensionCard({ extension, snapshot, isTracking, onTrack }: ExtensionCardProps) {
```

### No inline styles
Never use the style prop except inside email templates.
Always use Tailwind classes.

### No hardcoded colors
Never use hex colors or rgb() in JSX.
Always use the Tailwind custom color classes defined in 03-design.md.

## Scraper Rules

- Always set User-Agent header that mimics a real Chrome browser
- Always add 500ms delay between consecutive scrape requests
- Always handle fetch failures gracefully with try/catch
- Never expose scraping logic to client components — server only
- Cache fetched data for 1 hour before re-fetching

## Auth Pattern in Server Components

```typescript
// How to get the current user in a server component
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')
  
  // rest of component
}
```

## Middleware — This Is the Source of Truth for Route Protection

```typescript
// middleware.ts — protect these routes
const protectedRoutes = ['/dashboard', '/alerts', '/settings']
const authRoutes = ['/login']

// If not logged in and trying to access protected route → redirect to /login
// If logged in and trying to access /login → redirect to /dashboard
```

## Console Logging

- Use console.error() for actual errors
- Use console.log() only during development, remove before commit
- Every API route must log errors: console.error('[route-name]:', error)

## Import Order — Always Follow This Order

```typescript
// 1. React/Next imports
import { useState } from 'react'
import { NextRequest, NextResponse } from 'next/server'

// 2. Third party
import { createClient } from '@supabase/supabase-js'

// 3. Internal lib
import { createClient } from '@/lib/supabase/server'
import { formatUserCount } from '@/lib/utils/formatNumbers'

// 4. Components
import { Button } from '@/components/ui/Button'
import { MetricTile } from '@/components/ui/MetricTile'

// 5. Types
import type { Extension, Alert } from '@/types'
```
