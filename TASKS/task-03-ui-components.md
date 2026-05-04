# TASK 03 — Shared UI Components
# Complete Task 01 before starting this. Task 02 can run in parallel.

## Your Mission
Build all reusable UI components that every page depends on.
Build these before any page — pages import from here.

## Components to Build

### components/ui/Button.tsx
```typescript
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  href?: string
}
```
Primary: bg-accent-blue text-white hover:bg-blue-700
Secondary: bg-bg-surface border border-border-subtle text-text-primary hover:bg-gray-50
Loading state: show spinner icon from lucide-react, disable button
If href provided: render as anchor tag styled as button

### components/ui/Card.tsx
```typescript
interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}
```
Style: bg-bg-surface border border-border-subtle rounded-lg shadow-sm
Padding sm: p-4, md: p-6 (default), lg: p-8

### components/ui/Badge.tsx
```typescript
interface BadgeProps {
  children: React.ReactNode
  variant: 'blue' | 'green' | 'red' | 'amber' | 'gray'
}
```
Blue: bg-blue-50 text-accent-blue
Green: bg-green-50 text-accent-green
Red: bg-red-50 text-accent-red
Amber: bg-amber-50 text-accent-amber
Gray: bg-gray-100 text-text-secondary
All: text-xs px-2 py-1 rounded-full font-medium

### components/ui/Input.tsx
```typescript
interface InputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email'
  disabled?: boolean
  error?: string
  label?: string
  className?: string
}
```
Style: full width, border border-border-subtle, rounded-md, px-3 py-2, text-sm
Focus: ring-2 ring-accent-blue border-transparent outline-none
Error state: border-accent-red + show error message below in text-accent-red text-xs
Label: show above input in text-sm text-text-secondary if provided

### components/ui/MetricTile.tsx
```typescript
interface MetricTileProps {
  label: string
  value: string
  trend?: {
    value: string
    direction: 'up' | 'down' | 'neutral'
    period: string
  }
  loading?: boolean
}
```
Label: text-xs text-text-secondary uppercase tracking-wide
Value: text-2xl font-mono text-text-primary font-semibold
Trend up: text-accent-green with ↑ prefix
Trend down: text-accent-red with ↓ prefix
Trend neutral: text-text-muted with — 
Loading: show skeleton pulse in place of value and trend

### components/ui/SkeletonCard.tsx
A generic skeleton loader that matches the shape of a card.
Use animate-pulse and bg-gray-200 rounded blocks.
Export both SkeletonCard (full card) and SkeletonLine (single line) components.

### components/ui/EmptyState.tsx
```typescript
interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}
```
Center aligned. Icon at top (text-text-muted, size 48).
Title: text-lg font-medium text-text-primary
Description: text-text-secondary text-sm mt-1
Action button: primary Button component, mt-4

### components/layout/Navbar.tsx
Two states: public (not logged in) and authenticated (logged in).

Public navbar shows:
- Extly logo (left) — links to /
- Search, Pricing links (center/right)
- Login button (secondary)
- Start Free button (primary, links to /login)

Authenticated navbar shows:
- Extly logo (left) — links to /dashboard
- Dashboard link
- Alert bell icon with unread count badge (red dot if > 0)
- User avatar circle showing initials
- Dropdown on avatar click: Settings, Logout

Mobile: hamburger menu icon, dropdown with all links

Props:
```typescript
interface NavbarProps {
  user?: { email: string } | null
  unreadAlertCount?: number
}
```

### components/layout/Footer.tsx
Only shown on public pages. Never in dashboard layout.

Three columns: Product, Company, Legal
Product: Search, Pricing, Dashboard
Company: About (placeholder), Contact (placeholder), Twitter
Legal: Privacy Policy (/privacy), Terms (/terms)

Bottom bar: "© 2026 Extly. Built by Sayyad." + Twitter and GitHub icon links

### components/layout/DashboardSidebar.tsx
Fixed left sidebar shown on all dashboard pages.

Links:
- Extly logo at top
- Dashboard (icon: LayoutDashboard)
- Alerts (icon: Bell) — show unread count badge
- Settings (icon: Settings)
- Divider
- Pricing (icon: Zap)
- Logout button at bottom

Active link: accent-blue background, white text
Inactive link: text-text-secondary, hover bg-gray-100

Props:
```typescript
interface DashboardSidebarProps {
  activePath: string
  unreadAlertCount: number
}
```

## Done When
- [ ] Button renders primary and secondary variants correctly
- [ ] Button shows loading spinner and disables when loading=true
- [ ] Card renders with correct border and shadow
- [ ] Badge renders all 5 color variants
- [ ] Input shows error state correctly
- [ ] MetricTile shows trend arrows in correct colors
- [ ] MetricTile shows skeleton when loading=true
- [ ] SkeletonCard and SkeletonLine exported and working
- [ ] EmptyState centers content and shows optional action button
- [ ] Navbar shows correct state for logged in vs logged out
- [ ] Navbar is mobile responsive with hamburger menu
- [ ] Footer renders three columns correctly
- [ ] DashboardSidebar highlights active link
- [ ] All components have zero TypeScript errors
- [ ] No inline styles used anywhere
- [ ] Only design token colors used (no raw Tailwind colors on UI elements)
