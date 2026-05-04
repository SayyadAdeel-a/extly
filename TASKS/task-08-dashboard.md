# TASK 08 — Dashboard Pages
# Complete Tasks 01, 03, 04, and 07 before starting this.

## Your Mission
Build the authenticated dashboard: layout with sidebar, main dashboard, alerts, and settings pages.
These pages are only accessible to logged in users. Middleware handles the redirect.

---

## Dashboard Layout — app/(dashboard)/layout.tsx

Server component. Wraps all dashboard pages.

```typescript
export default async function DashboardLayout({ children }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')
  
  // Get unread alert count
  const { count: unreadCount } = await supabase
    .from('alerts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('read', false)
  
  return (
    <div className="flex h-screen bg-bg-main">
      <DashboardSidebar 
        activePath={/* current path */} 
        unreadAlertCount={unreadCount ?? 0} 
      />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
```

---

## Dashboard Page — app/(dashboard)/dashboard/page.tsx

Server component.

### Top Section
```
"Good morning, {name} 👋" (text-2xl font-semibold)
"You're tracking {count} extensions · {alertCount} new alerts today"
(text-text-secondary)

Right side: "+ Track New Extension" primary button
```

### Quick Add Bar
```typescript
// Client component — QuickAddBar.tsx
// Input: "Paste Chrome Web Store URL to track instantly..."
// On submit: POST /api/extension/track with the URL
// Show success toast or error message
// Refresh the page after successful track
```

### Free Plan Limit Banner
Show only when user has exactly 3 tracked extensions and plan is 'free':
```
bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between:
"⚡ You've reached the free plan limit (3/3 extensions)"
"Upgrade to Pro to track up to 25 extensions"
[Upgrade to Pro →] button linking to /pricing
```

### Tracked Extensions Grid

Fetch user's tracked extensions with latest snapshot.

If loading: show 3 SkeletonCard components
If empty: EmptyState with Telescope icon, "No extensions tracked yet", "Search for an Extension →" CTA

TrackedExtensionCard (components/dashboard/TrackedExtensionCard.tsx):
```
White card with:

Top row:
- Extension icon (40px)
- Extension name (font-medium)
- Unread alert badge (red dot) if has unread alerts for this extension
- "⋮" more button (dropdown: Untrack, Edit notifications)

Stats row:
- 👥 {userCount} with trend arrow and change value (green/red)
- ⭐ {rating} with trend (green/red)

Bottom row:
- "Last change: {change type} · {relative time}" (text-sm text-text-muted)
- If no changes yet: "Monitoring since {date}" (text-sm text-text-muted)

Action buttons:
- [View Details] secondary button → /extension/{chromeId}
```

---

## Alerts Page — app/(dashboard)/alerts/page.tsx

'use client' for filter tab interaction.

### Header
```
"Alerts" (text-2xl font-semibold)
"{count} unread alerts" (text-text-secondary)
"Mark all as read" button (top right, secondary, calls PATCH /api/alerts with markAllRead: true)
```

### Filter Tabs
```
[All] [Unread] [Rating] [Version] [Milestone]
Active tab: accent-blue underline and text
Inactive: text-text-secondary
```

### Alert List

Fetch from GET /api/alerts with current filter applied.

AlertItem (components/dashboard/AlertItem.tsx):
```
White card (unread: left border-l-4 border-accent-red and bg-red-50/30):

Left: Extension icon (36px)

Center:
- Extension name (font-medium, clickable → /extension/{chromeId})
- Alert message (text-sm text-text-secondary)
- Relative timestamp (text-xs text-text-muted)

Right:
- Alert type badge (rating_change: red, version_update: blue, user_milestone: green)
- "View →" link

Click anywhere on card: mark as read (PATCH /api/alerts with alertId)
```

Empty states:
- "All caught up!" when no alerts at all
- "No unread alerts" when filtered to unread and none exist
- "No {type} alerts" when filtered by type and none exist

Pagination: "Load more" button at bottom if more than 50 alerts.

---

## Settings Page — app/(dashboard)/settings/page.tsx

Server component for data fetching, client component for form interactions.

### Section 1: Account Info Card
```
Title: "Account"

Row: "Email" | {user.email} | (cannot change)
Row: "Plan" | Free | [Upgrade to Pro →] link
Row: "Member since" | {formatDate(profile.created_at)}
```

### Section 2: Notification Preferences Card
```
Title: "Default Notifications"
Subtitle: "Applied to new extensions you start tracking"

Toggle row: "Rating changes" [toggle]
Toggle row: "New version releases" [toggle]  
Toggle row: "User count milestones" [toggle]

Save button: saves preferences to profiles table or a preferences table
Show success message on save
```

Use a Toggle component (simple checkbox styled as a toggle switch):
- On: bg-accent-blue
- Off: bg-gray-200

### Section 3: Tracked Extensions Quick View
```
Title: "Currently Tracking ({count}/3 on free plan)"

Simple list: extension name + [Untrack] button for each
[Manage in Dashboard →] link at bottom
```

### Section 4: Danger Zone Card
```
bg-white border border-accent-red/30 rounded-lg p-6

Title: "Danger Zone" (text-accent-red)

[Delete Account] secondary button with red border
On click: show confirmation modal
"Are you sure? This will permanently delete your account and all data."
[Cancel] [Yes, Delete My Account] buttons
```

Delete account logic:
```typescript
// Call Supabase admin to delete user
// Then sign out and redirect to /
```

---

## Done When
- [ ] Dashboard layout renders sidebar and main content correctly
- [ ] Dashboard layout redirects to /login if not authenticated
- [ ] Dashboard layout passes unread count to sidebar
- [ ] Dashboard page shows welcome message with user name
- [ ] Dashboard page shows correct tracking count and alert count
- [ ] QuickAddBar successfully tracks new extension by URL
- [ ] Free plan limit banner shows when at 3/3 extensions
- [ ] Tracked extensions grid shows all tracked extensions
- [ ] TrackedExtensionCard shows correct stats and trend colors
- [ ] TrackedExtensionCard shows red dot for unread alerts
- [ ] Untrack works from the card dropdown menu
- [ ] Empty state shows when no extensions tracked
- [ ] Alerts page shows filter tabs that work correctly
- [ ] AlertItem shows correct badge color per type
- [ ] Unread alert has red left border and tinted background
- [ ] Clicking alert card marks it as read
- [ ] Mark all as read button works
- [ ] Settings shows correct user email and plan
- [ ] Notification preference toggles save correctly
- [ ] Delete account confirmation modal works
- [ ] All pages mobile responsive
- [ ] No TypeScript errors
