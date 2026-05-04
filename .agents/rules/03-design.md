---
trigger: model_decision
description: Full design system. Colors, fonts, component patterns with exact code. Card, button, badge, input, metric tile styles. Chart rules, spacing, responsive breakpoints, loading and empty states.
---

# RULE FILE 03 — Design System
# Every UI decision must follow these rules exactly. No creative interpretation.

## Design Philosophy

Light. Clean. Data forward. Professional but not corporate.
Inspired by Mixpanel's dashboard clarity.
Every element exists to surface data faster.
Charts and numbers are the heroes. UI is the support.

## Colors — Use Only These

Add these to tailwind.config.ts under theme.extend.colors:

```typescript
colors: {
  'bg-main': '#FAFAFA',        // Main app background
  'bg-surface': '#FFFFFF',     // Cards, panels, modals
  'border-subtle': '#E8ECF0',  // All borders
  'text-primary': '#0F1117',   // Headlines, primary text
  'text-secondary': '#6B7280', // Labels, subtext
  'text-muted': '#9CA3AF',     // Hints, timestamps
  'accent-blue': '#2563EB',    // Primary buttons, links, active states
  'accent-green': '#10B981',   // Positive changes, growth, success
  'accent-red': '#EF4444',     // Drops, alerts, errors, danger
  'accent-amber': '#F59E0B',   // Warnings, neutral changes
}
```

Never use any Tailwind color outside of this list for UI elements.
You may use Tailwind colors inside chart components only.

## Fonts — Use Only These Three

```typescript
fontFamily: {
  serif: ['Instrument Serif', 'serif'],     // Hero headlines ONLY
  sans: ['Geist', 'system-ui', 'sans-serif'], // All UI text
  mono: ['Geist Mono', 'monospace'],        // ALL numbers, versions, IDs
}
```

### When to Use Each Font

font-serif (Instrument Serif):
- Landing page hero headline only
- Section headlines on landing page only
- NEVER inside the dashboard

font-sans (Geist):
- Everything else
- Navigation, buttons, labels, body text, card titles

font-mono (Geist Mono):
- Every number that represents data (user count, rating, review count)
- Version strings (v3.2.1)
- Extension IDs
- Dates in data tables
- Chart axis labels

## Component Patterns — Copy These Exactly

### Card
```tsx
<div className="bg-bg-surface border border-border-subtle rounded-lg shadow-sm p-6">
  {children}
</div>
```

### Primary Button
```tsx
<button className="bg-accent-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
  Label
</button>
```

### Secondary Button
```tsx
<button className="bg-bg-surface border border-border-subtle text-text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
  Label
</button>
```

### Metric Tile (for stats like user count, rating)
```tsx
<div className="bg-bg-surface border border-border-subtle rounded-lg p-4">
  <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
    Total Users
  </p>
  <p className="text-2xl font-mono text-text-primary font-semibold">
    1,247,832
  </p>
  <p className="text-sm text-accent-green mt-1 flex items-center gap-1">
    ↑ 12,400 this week
  </p>
</div>
```

### Badge
```tsx
// Blue (category, info)
<span className="bg-blue-50 text-accent-blue text-xs px-2 py-1 rounded-full font-medium">
  Productivity
</span>

// Green (positive, active)
<span className="bg-green-50 text-accent-green text-xs px-2 py-1 rounded-full font-medium">
  Growing
</span>

// Red (alert, negative)
<span className="bg-red-50 text-accent-red text-xs px-2 py-1 rounded-full font-medium">
  Rating Drop
</span>

// Amber (warning, neutral)
<span className="bg-amber-50 text-accent-amber text-xs px-2 py-1 rounded-full font-medium">
  No Change
</span>
```

### Input
```tsx
<input
  className="w-full border border-border-subtle rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent bg-bg-surface"
  placeholder="Search extensions..."
/>
```

### Section Label (above headlines)
```tsx
<p className="text-xs text-accent-blue uppercase tracking-widest font-medium mb-2">
  The Problem
</p>
```

## Trend Indicators — Always Use These Colors

```
Positive change (up):   text-accent-green  with ↑ prefix
Negative change (down): text-accent-red    with ↓ prefix
No change:              text-text-muted    with — 
```

## Spacing Rules

```
Page horizontal padding:  px-6 md:px-8 lg:px-12
Section vertical gap:     py-16 md:py-24
Card padding:             p-6
Card gap in grids:        gap-4 or gap-6
```

## Responsive Breakpoints

Always build mobile first. Then add md: and lg: for larger screens.

```
Mobile first:  default (no prefix)  — single column stacked
Tablet:        md: (768px+)         — two columns where applicable
Desktop:       lg: (1024px+)        — full layout as designed
```

## Chart Rules (Recharts)

```
Line color default:    #2563EB (accent-blue)
Positive line:         #10B981 (accent-green)
Negative/alert line:   #EF4444 (accent-red)
Grid lines:            stroke="#E8ECF0" — horizontal only, no vertical
Axis text:             fontSize: 11, fill: '#9CA3AF'
Axis lines:            axisLine={false} tickLine={false}
Dots on line:          dot={false} activeDot={{ r: 4 }}
Tooltip style:         white background, border-subtle border, rounded-md
```

## Loading States — Required on Every Async Component

Every component that fetches data must have a skeleton loader.
Never show a spinner. Always show a skeleton that matches the content shape.

```tsx
// Skeleton shimmer class
<div className="animate-pulse bg-gray-200 rounded h-4 w-3/4" />
```

## Empty States — Required on Every List/Grid

Every list or grid must have a designed empty state.
Never show a blank white area.

Empty state must include:
1. An icon from Lucide React
2. A headline explaining what's empty
3. A clear CTA to fix the empty state

## Error States — Required on Every Page

Every page must handle:
- Loading state
- Error state (something went wrong + retry button)
- Empty state (no data + CTA)
- Success state (the actual content)

## Navbar Rules

Public pages (not logged in):
- Show: Logo, Search link, Pricing link, Login button, Start Free button

Authenticated pages (logged in):
- Show: Logo, Dashboard link, unread alert count badge, user avatar initials, logout

Mobile:
- Hamburger menu that collapses all links into a dropdown

## Footer Rules

Only show on public pages (landing, search, extension detail, pricing, privacy, terms).
Never show footer inside the dashboard layout.

Footer columns: Product, Company, Legal
Bottom bar: Copyright + Twitter + GitHub links
