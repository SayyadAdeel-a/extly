# Pages Specification — Extly

## Page Index

| Route | Page | Auth Required |
|---|---|---|
| `/` | Landing Page | No |
| `/search` | Search Extensions | No |
| `/extension/[id]` | Extension Detail | No |
| `/login` | Login | No (redirect if authed) |
| `/dashboard` | User Dashboard | Yes |
| `/alerts` | Alerts History | Yes |
| `/settings` | Account Settings | Yes |
| `/pricing` | Pricing Plans | No |
| `/privacy` | Privacy Policy | No |
| `/terms` | Terms of Service | No |

---

## 1. Landing Page (/)

### Purpose
Convert visitors into signups. Communicate the core value in under 5 seconds.

### Layout: Full width, single column scroll

---

### Section 1: Navbar
```
[Extly Logo]                    Search  Pricing  Login  [Start Free →]
```
- Sticky on scroll
- Background: white with subtle bottom border on scroll
- Logo: "Extly" in Geist font, bold, text-primary
- Nav links: text-secondary, hover text-primary
- CTA button: accent-blue, filled

---

### Section 2: Hero
```
HEADLINE (Instrument Serif, 64px):
"Know Before Your
Competitors Do"

SUBHEADLINE (Geist, 20px, text-secondary):
"Real time alerts when any Chrome extension changes.
Track ratings, users, and versions — updated daily, not monthly."

CTA ROW:
[Start Tracking Free]  [See How It Works ↓]

SOCIAL PROOF LINE (below CTAs):
"Tracking 50,000+ Chrome extensions · Free forever · No credit card"

HERO IMAGE:
Dashboard screenshot showing extension cards with a live alert notification
popping in from the right side. Shows rating drop alert in red.
```

- Hero section: center aligned
- Background: #FAFAFA with very subtle grid pattern
- Hero image: browser mockup frame around dashboard screenshot
- Animate: fade up on load with 200ms stagger between elements

---

### Section 3: Logo Strip
```
LABEL: "Tracking extensions trusted by millions"

[Extension icons strip — well known extensions being tracked]
Grammarly · uBlock Origin · Honey · LastPass · Dark Reader · etc.
```
- Grayscale extension icons
- Subtle scroll animation (marquee)
- Background: white

---

### Section 4: Problem Statement
```
LABEL: "The Problem"

HEADLINE: "ChromeStats updates once a month.
A lot can happen in 30 days."

THREE PAIN POINTS (horizontal cards):

[😤] Your competitor shipped 3 updates
     and you had no idea until a month later.

[📉] Your rating dropped from 4.8 to 4.4
     and you only noticed when users complained.

[🚀] A new extension in your category
     grew from 10K to 500K users this month.
     You missed it.
```
- Section background: white
- Pain point cards: light red/amber tinted background
- Honest, direct copy — not marketing fluff

---

### Section 5: Solution / Features
```
LABEL: "The Solution"

HEADLINE: "Real time intelligence for
extension developers"

THREE FEATURE BLOCKS (alternating left/right layout):

BLOCK 1 — Real Time Alerts
Image: Alert email screenshot showing "Rating dropped from 4.8 to 4.5"
Title: "Get alerted the moment anything changes"
Body: "Rating drops, version updates, user milestones — you hear about
it within 24 hours, not 30 days. Never be the last to know."

BLOCK 2 — Competitor Tracking
Image: Dashboard showing multiple extensions side by side with metrics
Title: "Track any extension, not just yours"
Body: "Add your competitors to your dashboard. Watch their user count,
rating, and update frequency in real time. Spot their weaknesses before they fix them."

BLOCK 3 — Growth Intelligence
Image: Chart showing extension growth over time with spike annotated
Title: "See what's growing before it blows up"
Body: "Monitor rising extensions in your category. Find the ones gaining
momentum before they dominate the search results."
```
- Alternating layout: image left/text right, then text left/image right
- Clean section dividers

---

### Section 6: How It Works
```
HEADLINE: "Up and running in 60 seconds"

STEP 1: Search
"Find any Chrome extension by name,
developer, or Chrome Web Store URL"
[Search bar mockup with "Grammarly" typed in]

STEP 2: Track
"Click Track. We start monitoring
it automatically every day."
[Track button mockup with confirmation state]

STEP 3: Get Alerted
"Receive an email the moment
anything meaningful changes."
[Email notification mockup]
```
- Horizontal three column layout on desktop
- Connected by subtle dotted line between steps
- Step numbers: large, light blue, monospace

---

### Section 7: Comparison Table
```
HEADLINE: "Finally, a better alternative to ChromeStats"

| Feature                    | Extly    | ChromeStats |
|----------------------------|----------|-------------|
| Update frequency           | Daily    | Monthly     |
| Real time email alerts     | ✓        | ✗           |
| Free tier                  | ✓        | ✗           |
| Competitor tracking        | ✓        | Limited     |
| Clean modern UI            | ✓        | ✗           |
| Starting price             | $0       | $14.99/mo   |
```
- Extly column highlighted with accent-blue header
- Clean table with alternating row backgrounds
- Checkmarks in green, X marks in red

---

### Section 8: Social Proof / Testimonials
```
HEADLINE: "What extension developers say"

Three quote cards:

"I was checking ChromeStats every week manually.
Extly just emails me when something actually happens.
Game changer for staying on top of competitors."
— Marcus K., Chrome Extension Developer

"The rating drop alert saved me. I had no idea my
update broke something until Extly told me within a day."
— Sarah L., Indie Developer

"Finally found out my competitor was shipping
updates every week. Now I know exactly when to respond."
— Dev T., Agency Owner
```
- White cards with subtle shadow
- Avatar initials placeholder (no real photos in V1)
- Star rating display under each quote

---

### Section 9: Pricing Preview
```
HEADLINE: "Simple, transparent pricing"
SUBHEADLINE: "Start free. Upgrade when you need more."

[Free]              [Pro — $14/mo]
3 extensions        25 extensions
7 days history      6 months history
Daily alerts        Email + Slack alerts

[Start Free →]      [Start Pro →]

"No credit card required for free plan"
```
- Two card layout, Pro card slightly elevated with blue border
- Link to full /pricing page

---

### Section 10: Final CTA
```
HEADLINE (Instrument Serif):
"Stop checking manually.
Start knowing automatically."

SUBHEADLINE:
"Join extension developers who never miss a beat."

EMAIL INPUT + BUTTON:
[your@email.com                    ] [Start Tracking Free →]

SMALL PRINT:
Free forever. No credit card. Unsubscribe anytime.
```
- Full width section
- Background: very light blue (#EFF6FF) to stand out from white
- Warm, confident tone

---

### Section 11: Footer
```
[Extly Logo + tagline: "Real time intelligence for extension developers"]

COLUMNS:
Product          Company          Legal
Search           About            Privacy Policy
Pricing          Contact          Terms of Service
Dashboard        Twitter/X
Alerts           Indie Hackers

BOTTOM BAR:
© 2026 Extly. Built by Sayyad.     [Twitter] [GitHub]
```

---

## 2. Search Page (/search)

### Purpose
Let anyone find and explore any Chrome extension. No login required.

### Layout
```
NAVBAR (same as landing)

PAGE HEADER:
"Search Chrome Extensions"
"Find any extension and track it in real time"

SEARCH BAR (large, centered):
[🔍 Search by name, developer, or Chrome Web Store URL...    ]

BELOW SEARCH:
"Try: Grammarly · uBlock Origin · Dark Reader · Honey"
(Clickable suggestion chips)

RESULTS AREA (appears after search):
Grid of Extension Cards (2 columns desktop, 1 column mobile)
```

### Extension Search Result Card
```
[Icon 48px] [Name — Bold]           [Track →]
            [Developer · Category]
            ⭐ 4.7  (8,432)  ·  1,247,832 users  ·  v3.2.1
            Last updated: 3 days ago
```
- White card, subtle border
- Hover: slight shadow increase
- "Track" button: accent-blue, requires login (redirects to /login with return URL)

### Empty State (no results)
```
[Illustration: magnifying glass]
"We haven't indexed this extension yet"
"Paste the Chrome Web Store URL and we'll add it immediately"

[Chrome Web Store URL input           ] [Add Extension]
```

### Loading State
- Skeleton cards while fetching
- 3 placeholder cards with shimmer animation

---

## 3. Extension Detail Page (/extension/[id])

### Purpose
Show everything about one extension. Core product page. Public — no login needed.

### Layout: Two column on desktop
```
LEFT SIDEBAR (280px fixed):     MAIN CONTENT (flex-1):
Extension Info Card             Metrics + Charts + History
```

### Left Sidebar Card
```
[Extension Icon — 80px]
[Extension Name — H1]
[Developer Name — text-secondary]

[Category Badge]  [Active Badge]

Chrome Web Store: v3.2.1
Last Updated: April 25, 2026
First Indexed: January 12, 2026

[View on Chrome Web Store ↗]

─────────────────────────

[Track This Extension]
(CTA Button — full width, accent-blue)

If already tracking:
[✓ Tracking]  [Untrack]
```

### Main Content: Metrics Row (4 tiles)
```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ TOTAL USERS │ │   RATING    │ │   REVIEWS   │ │   VERSION   │
│  1,247,832  │ │   4.7 ⭐    │ │    8,432    │ │   v3.2.1    │
│ ↑12,400(7d) │ │  ↓0.2(30d) │ │ ↑142 (7d)  │ │ 3 days ago  │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```
- Trend: green arrow + number if positive, red if negative
- Monospace font for all numbers
- Period toggle: 7D / 30D / 90D changes all tiles

### User Growth Chart
```
TITLE: "User Growth"
TIME FILTERS: [7D] [30D] [90D]

[Recharts LineChart]
- X axis: dates
- Y axis: user count (formatted: 1.2M, 500K)
- Single blue line
- Hover tooltip: date + exact count
- Gradient fill under line
```

### Rating History Chart
```
TITLE: "Rating History"
TIME FILTERS: [7D] [30D] [90D]

[Recharts LineChart]
- Y axis: 0 to 5.0
- Line color: green if > 4.0, amber if 3.5-4.0, red if below 3.5
- Reference line at 4.0 (dashed, light)
- Hover tooltip: date + rating
```

### Version History Table
```
TITLE: "Version History"

VERSION     DETECTED          DAYS SINCE LAST
v3.2.1      April 25, 2026    12 days
v3.2.0      April 13, 2026    8 days
v3.1.9      April 5, 2026     21 days
v3.1.8      March 15, 2026    —
```
- Alternating row backgrounds
- Latest version highlighted with blue badge
- "Ships frequently" or "Rarely updated" badge based on average

### Change Log Timeline
```
TITLE: "Change Log"

● April 25, 2026
  New version v3.2.1 detected
  Previous: v3.2.0

● April 13, 2026
  Rating dropped: 4.8 → 4.6
  3 new negative reviews detected

● April 1, 2026
  Reached 1,000,000 users milestone 🎉
```
- Vertical timeline with dots
- Color coded: blue for versions, red for rating drops, green for milestones

### Track CTA Banner (bottom of page)
```
┌──────────────────────────────────────────────────────────┐
│  🔔 Get alerted when this extension changes              │
│  "We'll email you the moment the rating, version,        │
│   or user count changes."                                │
│                                                          │
│  [your@email.com              ] [Start Tracking Free →]  │
└──────────────────────────────────────────────────────────┘
```

---

## 4. Login Page (/login)

### Purpose
Single auth page. Magic link only in V1.

### Layout: Centered card on light background
```
BACKGROUND: #FAFAFA with subtle dot grid

CARD (max-width 400px, centered):

[Extly Logo]

HEADLINE: "Welcome back"
SUBHEADLINE: "Enter your email and we'll send you a magic link"

[Email input — full width]
"your@email.com"

[Send Magic Link →]
(accent-blue, full width button)

DIVIDER: ───── or ─────

[Continue with Google]  ← DISABLED in V1, shown greyed out
"Coming soon"

FOOTER LINK:
"Don't have an account? Sign up free →"
(Same page — just changes to signup state)
```

### After Submitting Email
```
CARD changes to:

[📬 Illustration]

"Check your inbox"
"We sent a magic link to sayyad@email.com"
"Click the link in the email to sign in.
 It expires in 10 minutes."

[← Use a different email]

SMALL PRINT:
"Didn't get it? Check spam or resend →"
```

### Sign Up State (/signup or toggle)
```
Same card, different copy:

HEADLINE: "Create your account"
SUBHEADLINE: "Free forever. No credit card required."

[Email input]

[Create Account →]

"Already have an account? Sign in →"
```

---

## 5. Dashboard (/dashboard)

### Purpose
User's home. See all tracked extensions at a glance.

### Layout
```
SIDEBAR (fixed left, 240px):
[Extly Logo]
─────────────
[Dashboard]  ← active
[Alerts]  🔴 3
[Settings]
─────────────
[Pricing]
[Logout]

MAIN CONTENT (flex-1):
Top bar + Extension grid
```

### Top Bar
```
"Good morning, Sayyad 👋"
"You're tracking 5 extensions · 3 new alerts today"

[+ Track New Extension] button (top right)
```

### Quick Add Bar
```
[🔍 Paste Chrome Web Store URL to track instantly...    ] [Track]
```

### Extension Grid
```
2 columns on desktop, 1 on mobile

TRACKED EXTENSION CARD:
┌────────────────────────────────────────┐
│ [Icon] Grammarly           🔴 1 alert  │
│        by Grammarly Inc                │
│                                        │
│  👥 10,234,521  ↑ 12,400 this week    │
│  ⭐ 4.6         ↓ 0.2 this month      │
│                                        │
│  Last change: Rating drop · 2 days ago │
│                                        │
│  [View Details]        [⋮ More]        │
└────────────────────────────────────────┘
```
- Red dot on card if unread alert
- Green trend = green number, red trend = red number
- "More" menu: Untrack, Edit notifications

### Empty State (new user, no tracking)
```
[Illustration: telescope looking at stars]

"You're not tracking any extensions yet"
"Add your first extension to start getting real time alerts"

[Search for an Extension →]
```

### Free Plan Limit Banner (when at 3/3 extensions)
```
┌──────────────────────────────────────────────────────────┐
│  ⚡ You've reached the free plan limit (3 extensions)    │
│  Upgrade to Pro to track up to 25 extensions             │
│                              [Upgrade to Pro →]          │
└──────────────────────────────────────────────────────────┘
```

---

## 6. Alerts Page (/alerts)

### Purpose
Full history of all detected changes for tracked extensions.

### Layout
```
PAGE HEADER:
"Alerts"
"3 unread alerts"

FILTER BAR:
[All] [Unread] [Rating] [Version] [Milestone]

[Mark all as read] button (top right)

ALERT LIST (timeline):
```

### Alert Item
```
┌────────────────────────────────────────────────────────┐
│ 🔴  [Icon] Grammarly                    2 days ago     │
│     Rating dropped from 4.8 → 4.6                      │
│     "3 negative reviews detected in last 24 hours"     │
│                                    [View Extension →]  │
└────────────────────────────────────────────────────────┘
```
- Unread: left border accent-red, slightly highlighted background
- Read: normal white card
- Click anywhere on card marks as read
- Alert type icons: 📉 rating, 🔄 version, 🎉 milestone

### Empty State
```
[Illustration: bell with checkmark]

"You're all caught up!"
"No alerts yet. We'll email you when something changes."
```

---

## 7. Settings Page (/settings)

### Layout: Single column, section cards

### Section 1: Account
```
TITLE: "Account"

Email: sayyad@email.com  [Cannot change]
Plan: Free               [Upgrade →]
Member since: May 2026
```

### Section 2: Notification Preferences
```
TITLE: "Notifications"

Default alert settings for new extensions you track:

[Toggle] Rating changes
[Toggle] New version releases
[Toggle] User count milestones

Email digest frequency:
○ Immediate (as soon as detected)
● Daily digest (one email per day max)
○ Weekly digest
```

### Section 3: Tracked Extensions Quick View
```
TITLE: "Tracking (3/3 on free plan)"

[Extension list with quick untrack option]
[Manage in Dashboard →]
```

### Section 4: Danger Zone
```
TITLE: "Danger Zone"
BORDER: red left border

[Delete Account]
"This will permanently delete your account and all tracking data."
```

---

## 8. Pricing Page (/pricing)

### Layout: Centered, two pricing cards

### Header
```
HEADLINE: "Simple pricing"
SUBHEADLINE: "Start free. Upgrade when you need more power."

TOGGLE: [Monthly] [Yearly — Save 2 months]
```

### Pricing Cards
```
┌─────────────────────┐  ┌─────────────────────┐
│        FREE         │  │     PRO  $14/mo      │ ← highlighted
│        $0           │  │   ($140/year)        │
│                     │  │                      │
│ ✓ 3 extensions      │  │ ✓ 25 extensions      │
│ ✓ 7 days history    │  │ ✓ 6 months history   │
│ ✓ Daily alerts      │  │ ✓ Email + Slack       │
│ ✓ Basic metrics     │  │ ✓ Competitor compare  │
│ ✗ Competitor tools  │  │ ✓ CSV export          │
│ ✗ CSV export        │  │ ✓ Growth velocity     │
│ ✗ Slack alerts      │  │ ✓ Priority support    │
│                     │  │                      │
│ [Start Free →]      │  │ [Start Pro →]        │
│ No credit card      │  │ 7-day free trial     │
└─────────────────────┘  └─────────────────────┘
```

### FAQ Section
```
Q: Can I cancel anytime?
A: Yes. Cancel anytime, no questions asked.

Q: What happens when I hit the free plan limit?
A: We'll prompt you to upgrade. You won't lose any data.

Q: Do you offer refunds?
A: Yes, within 7 days of purchase, no questions asked.

Q: What counts as an "extension"?
A: Each unique Chrome extension you add to tracking counts as one.
```

---

## 9. Privacy Policy (/privacy)

### Layout: Simple document, max-width 700px, centered

```
EXTLY PRIVACY POLICY
Last updated: May 2026

1. What We Collect
- Email address (for magic link auth and alerts)
- Which extensions you choose to track (your dashboard data)
- Basic usage analytics (page views, no personal tracking)

2. What We Don't Collect
- We never collect your Chrome browsing history
- We never access your installed extensions
- We never sell your data to anyone

3. How We Use Your Data
- To send you email alerts about tracked extensions
- To maintain your dashboard and tracking preferences
- To improve the product

4. Data Storage
- All data stored securely in Supabase (PostgreSQL)
- Hosted in EU region
- Encrypted at rest and in transit

5. Email Communications
- We only send alerts you explicitly signed up for
- Every email includes an unsubscribe link
- We never send marketing emails without consent

6. Deleting Your Data
- You can delete your account anytime from Settings
- All your data is permanently deleted within 30 days

7. Contact
- For privacy questions: privacy@extly.com

8. Changes
- We'll email you if we make material changes to this policy
```

---

## 10. Terms of Service (/terms)

### Layout: Same as Privacy Policy

```
EXTLY TERMS OF SERVICE
Last updated: May 2026

1. Acceptance
By using Extly you agree to these terms.

2. What Extly Does
Extly provides analytics and monitoring for publicly available
Chrome Web Store extension data. All data we collect is publicly
visible on the Chrome Web Store.

3. Free Plan Limits
- Maximum 3 tracked extensions
- 7 days of historical data
- We may change free plan limits with 30 days notice

4. Acceptable Use
You may not:
- Use Extly to scrape or mass-export extension data for resale
- Attempt to reverse engineer our scraping methods
- Create fake accounts to circumvent plan limits

5. Data Accuracy
- Extension data is scraped from Chrome Web Store daily
- We cannot guarantee 100% accuracy or uptime
- Data is provided "as is" for informational purposes

6. Payment (Pro Plan)
- Charged monthly or annually via Stripe
- Cancel anytime, no partial refunds except within 7-day trial
- Prices may change with 30 days notice

7. Termination
- We may terminate accounts that violate these terms
- You may delete your account anytime

8. Limitation of Liability
Extly is not liable for business decisions made based on our data.

9. Contact
- For questions: hello@extly.com
```

---

## Page Transitions & Shared UI Rules

### Loading States
- Every page fetch shows skeleton loaders not spinners
- Skeleton matches the shape of the actual content
- Shimmer animation on skeletons

### Error States
- 404: "Extension not found" with search bar to try again
- 500: "Something went wrong" with retry button
- Network error: "Check your connection" with retry

### Empty States
- Every list/grid has a designed empty state
- Include illustration, headline, and clear CTA
- Never show a blank white area

### Responsive Breakpoints
```
Mobile:   < 768px   — Single column, stacked
Tablet:   768-1024px — Two column where applicable
Desktop:  > 1024px  — Full layout as designed
```

### Navbar Behavior
- Public pages: Show Login + Start Free CTA
- Authenticated pages: Show Dashboard link + user avatar + logout
- Mobile: Hamburger menu collapses all links
