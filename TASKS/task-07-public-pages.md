# TASK 07 — Auth + Search + Extension Detail Pages
# Complete Tasks 01, 03, and 04 before starting this.

## Your Mission
Build three public-facing pages: login, search, and extension detail.
These are the core discovery and conversion pages.

---

## Page 1: Login Page — app/(auth)/login/page.tsx

'use client' — needs useState for form handling.

### Two states: default and submitted

Default state:
```
Centered card (max-w-md mx-auto mt-20):

Extly logo at top (text-xl font-bold text-text-primary)

Headline: "Welcome back"
Subheadline: "Enter your email and we'll send you a magic link to sign in."

Email input (full width)
"Send Magic Link →" primary button (full width)

Divider with "or" text

Greyed out "Continue with Google" button with "(Coming soon)" text
bg-gray-100 text-text-muted cursor-not-allowed

Footer text:
"Free forever. No credit card required."
```

Submitted state (after email sent):
```
Same card, content changes to:

📬 icon (large, text-accent-blue)
"Check your inbox"
"We sent a magic link to {email}"
"Click the link in your email to sign in. It expires in 10 minutes."

"← Use a different email" link that resets to default state
"Didn't receive it? Check your spam folder."
```

Logic:
```typescript
async function handleSubmit(email: string) {
  const supabase = createClient() // browser client
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/api/auth/callback`
    }
  })
  if (!error) setSubmitted(true)
  else setError('Failed to send magic link. Please try again.')
}
```

Also create app/api/auth/callback/route.ts if not already done in Task 04.

---

## Page 2: Search Page — app/search/page.tsx

Server component with client search input component.

Create a SearchInput client component that:
- Has debounced search (300ms delay)
- Calls GET /api/extension/search?q={query} on change
- Shows results below

Page layout:
```
Navbar (public)

Page header (text-center, pt-16 pb-8):
Headline (font-serif, text-4xl): "Search Chrome Extensions"
Subheadline (text-text-secondary): "Find any extension and track it in real time"

Search bar (max-w-2xl mx-auto):
Large input with search icon inside left side
Placeholder: "Search by name, developer, or paste Chrome Web Store URL..."

Suggestion chips below search bar:
"Try: " followed by clickable chips → Grammarly, uBlock Origin, Dark Reader, Honey
Clicking a chip fills the search input and triggers search

Results area (mt-8):
Grid: grid-cols-1 md:grid-cols-2 gap-4
Shows ExtensionCard components
```

ExtensionCard component (components/extension/ExtensionCard.tsx):
```
White card with:
- Extension icon (48px, rounded-lg) on left
- Name (font-medium text-text-primary) 
- Developer name (text-sm text-text-secondary)
- Stats row: ⭐ rating · user count · version · last updated
- "Track →" button (right side, requires auth — redirect to /login if not logged in)
- "View Details →" link to /extension/[chromeId]
```

Loading state: Show 4 SkeletonCard components while fetching
Empty state: Show EmptyState with Search icon, "No extensions found", suggest pasting URL
No query state: Show suggestion text "Search for any Chrome extension above"

---

## Page 3: Extension Detail Page — app/extension/[id]/page.tsx

Server component. Fetches data server-side for SEO.
The [id] param is the chrome extension ID (32 char string).

### Layout: Two column on desktop, single column mobile
```
lg:grid lg:grid-cols-[280px_1fr] lg:gap-8
```

### Left Sidebar Card (components/extension/ExtensionHeader.tsx)
```
Extension icon (80px, rounded-xl, shadow-sm)
Extension name (text-2xl font-bold text-text-primary)
Developer name (text-text-secondary)

Category badge (blue)
"Active" badge (green) if updated in last 30 days

Separator

"Version:" value (font-mono text-sm)
"Last Updated:" value (text-sm text-text-secondary)
"First Indexed:" value (text-sm text-text-secondary)

"View on Chrome Web Store ↗" link (text-accent-blue text-sm)

Separator

Track button:
- If not tracking: Primary button "Track This Extension" full width
- If tracking: Green outlined button "✓ Tracking" + secondary "Untrack" button
- Clicking track: if not logged in, redirect to /login with return URL
```

### Main Content

Metrics Row (components/extension/MetricsRow.tsx):
Four MetricTile components side by side (grid grid-cols-2 md:grid-cols-4 gap-4):
1. Total Users — value + weekly change trend
2. Rating — value + 30-day trend  
3. Total Reviews — value + weekly change
4. Version — current version + "X days ago"

Time period toggle (7D / 30D / 90D) above metrics row:
Changing period updates all tiles and charts simultaneously.

User Growth Chart (components/extension/UserGrowthChart.tsx):
'use client' — Recharts must be client side
Recharts LineChart with data from extension_snapshots
Follow exact chart rules from rule file 03-design.md

Rating History Chart (components/extension/RatingChart.tsx):
'use client' — Recharts must be client side
Line color changes based on rating:
- >= 4.0: accent-green
- 3.5 to 3.9: accent-amber
- < 3.5: accent-red
Reference line at 4.0 (dashed, text-text-muted)

Version History Table (components/extension/VersionTable.tsx):
Table with columns: Version | Detected | Days Since Last
Latest version row: highlighted with blue-50 background
Show "Ships frequently" badge if average is less than 14 days between versions

Change Log Timeline (components/extension/ChangeLog.tsx):
Vertical timeline of all alerts/changes ever detected for this extension.
Each item: colored dot + date + description
rating_change: red dot
version_update: blue dot
user_milestone: green dot

Track CTA Banner (components/extension/TrackCTABanner.tsx):
Full width banner at bottom of page:
"🔔 Get alerted when this extension changes"
Email input + "Start Tracking Free →" button
If user is already logged in: show "Add to Dashboard →" button instead

### Data Fetching in Server Component
```typescript
export default async function ExtensionPage({ params }: { params: { id: string } }) {
  const chromeId = params.id
  
  // Validate chrome ID format
  if (!isValidChromeId(chromeId)) notFound()
  
  // Fetch or create extension data
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/extension/fetch?id=${chromeId}`)
  if (!response.ok) notFound()
  
  const extensionData = await response.json()
  
  // Fetch 90 days of snapshots for charts
  // Fetch version history
  // Fetch change log
  
  return <ExtensionDetailLayout ... />
}
```

Generate metadata dynamically for SEO:
```typescript
export async function generateMetadata({ params }) {
  return {
    title: `${extensionName} Stats & Analytics | Extly`,
    description: `Real time stats for ${extensionName}. Track users, ratings, and version history.`
  }
}
```

## Done When
- [ ] Login page shows email input and sends magic link via Supabase
- [ ] Login page switches to "check inbox" state after submit
- [ ] Login page shows error if email send fails
- [ ] "Use different email" resets form correctly
- [ ] Google OAuth button is greyed out and not clickable
- [ ] Search page shows large centered search input
- [ ] Search suggestion chips fill input and trigger search
- [ ] Search results show ExtensionCard with correct data
- [ ] Search shows skeleton cards while loading
- [ ] Search shows empty state when no results
- [ ] Extension detail page loads with valid chrome ID
- [ ] Extension detail page shows 404 for invalid ID
- [ ] All four metric tiles render with correct values
- [ ] UserGrowthChart renders Recharts line chart
- [ ] RatingChart changes color based on rating value
- [ ] VersionTable shows version history in descending order
- [ ] ChangeLog shows timeline with color coded dots
- [ ] TrackCTABanner shows email input for unauthenticated users
- [ ] Page generates correct SEO metadata
- [ ] Both pages are mobile responsive
- [ ] No TypeScript errors on any file
