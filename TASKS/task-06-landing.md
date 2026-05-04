# TASK 06 — Landing Page (/)
# Complete Tasks 01 and 03 before starting this.

## Your Mission
Build the public landing page. This is what converts visitors into signups.
It must communicate the value in under 5 seconds and look significantly better than ChromeStats.

## File to Create
app/page.tsx — Server component. No 'use client' needed.

## Page Sections — Build All of Them in This Order

---

### Section 1: Navbar
Import and render Navbar component with user=null (public page).

---

### Section 2: Hero
Center aligned. Full width. Background: bg-bg-main with subtle dot grid pattern.

```
Eyebrow text (text-xs uppercase tracking-widest text-accent-blue):
"Real Time Extension Intelligence"

Headline (font-serif, text-5xl md:text-6xl lg:text-7xl, text-text-primary):
"Know Before Your
Competitors Do"

Subheadline (text-lg md:text-xl text-text-secondary, max-w-2xl mx-auto):
"Real time alerts when any Chrome extension changes.
Track ratings, users, and versions — updated daily, not monthly."

CTA row (flex gap-4 justify-center mt-8):
- Primary button: "Start Tracking Free" → links to /login
- Secondary button: "See How It Works" → smooth scroll to how-it-works section

Social proof line (text-sm text-text-muted mt-6):
"Free forever · No credit card · Tracking 50,000+ extensions"

Hero image (mt-12):
A browser mockup frame showing the Extly dashboard with a red alert notification.
Use a div styled to look like a browser window with the dashboard UI inside.
Show metric tiles, a chart line, and a red alert badge in the corner.
Make this look realistic and polished.
```

---

### Section 3: Problem Statement
```
Section label: "The Problem"
Headline (font-serif, text-4xl): "ChromeStats updates once a month. A lot can happen in 30 days."

Three pain point cards (grid grid-cols-1 md:grid-cols-3 gap-6):

Card 1 — bg-red-50 border border-red-100:
Icon: AlertTriangle (lucide, text-accent-red)
Title: "Competitor updates you missed"
Body: "Your competitor shipped 3 updates while you were checking last month's data."

Card 2 — bg-red-50 border border-red-100:
Icon: TrendingDown (lucide, text-accent-red)
Title: "Rating dropped silently"
Body: "Your rating went from 4.8 to 4.4. You only found out when users started complaining."

Card 3 — bg-amber-50 border border-amber-100:
Icon: Zap (lucide, text-accent-amber)
Title: "Growth you didn't spot"
Body: "A new extension in your category went from 10K to 500K users this month. You missed it."
```

---

### Section 4: Features (alternating layout)
```
Section label: "The Solution"
Headline (font-serif, text-4xl): "Real time intelligence for extension developers"

Feature Block 1 (image left, text right on desktop):
Title: "Get alerted the moment anything changes"
Body: "Rating drops, version updates, user milestones — you hear about it within 24 hours, not 30 days. Never be the last to know again."
Image: Mockup of an alert email notification

Feature Block 2 (text left, image right on desktop):
Title: "Track any extension, not just yours"
Body: "Add your competitors to your dashboard. Watch their user count, rating, and update frequency. Spot their weaknesses before they fix them."
Image: Mockup of dashboard showing multiple tracked extensions

Feature Block 3 (image left, text right on desktop):
Title: "Spot what's growing before it explodes"
Body: "Monitor rising extensions in your category. Find the ones gaining momentum before they dominate your space."
Image: Mockup of a growth chart with upward trend
```

---

### Section 5: How It Works
```
id="how-it-works" on this section for smooth scroll from hero CTA

Headline: "Up and running in 60 seconds"

Three steps (grid grid-cols-1 md:grid-cols-3):

Step 1:
Number: "01" (font-mono text-4xl text-accent-blue opacity-30)
Title: "Search any extension"
Body: "Find any Chrome extension by name, developer, or paste the Chrome Web Store URL."

Step 2:
Number: "02"
Title: "Click Track"
Body: "We start monitoring it automatically every day. No setup. No configuration."

Step 3:
Number: "03"
Title: "Get alerted instantly"
Body: "Receive an email the moment the rating, version, or user count changes."
```

---

### Section 6: Comparison Table
```
Headline: "Finally, a better alternative to ChromeStats"

Table (clean, alternating row backgrounds):
| Feature                  | Extly     | ChromeStats |
|--------------------------|-----------|-------------|
| Update frequency         | Daily     | Monthly     |
| Real time email alerts   | ✓         | ✗           |
| Free to start            | ✓         | ✗           |
| Competitor tracking      | ✓         | Limited     |
| Modern UI                | ✓         | ✗           |
| Starting price           | $0/month  | $14.99/mo   |

Extly column header: bg-accent-blue text-white
Checkmarks: text-accent-green font-bold
X marks: text-accent-red
```

---

### Section 7: Final CTA
```
Background: bg-blue-50 border-y border-blue-100

Headline (font-serif, text-4xl, text-center):
"Stop checking manually.
Start knowing automatically."

Subheadline: "Join developers who never miss a beat."

Email capture form (client component — make a small EmailCaptureForm component):
- Email input + "Start Tracking Free →" button side by side
- On submit: redirect to /login with email pre-filled in query param
- Or simply: link to /login

Small print: "Free forever. No credit card. Unsubscribe anytime."
```

---

### Section 8: Footer
Import and render Footer component.

## Design Rules for This Page
- font-serif only on section headlines and hero headline
- All other text: font-sans
- Data/numbers in mockups: font-mono
- Generous whitespace between sections: py-20 md:py-28
- Section labels always: text-xs uppercase tracking-widest text-accent-blue mb-3
- Never use purple. Never use gradients on text.
- Background alternates: #FAFAFA sections and #FFFFFF sections

## Done When
- [ ] Page renders with no errors
- [ ] All 8 sections visible and correctly styled
- [ ] Hero headline uses Instrument Serif font
- [ ] "See How It Works" button scrolls to how-it-works section
- [ ] "Start Tracking Free" button links to /login
- [ ] Three pain point cards use correct background colors
- [ ] Comparison table has accent-blue Extly header
- [ ] Alternating feature blocks work on desktop (not on mobile)
- [ ] Page is responsive on 375px mobile width
- [ ] No TypeScript errors
- [ ] Navbar and Footer render correctly
