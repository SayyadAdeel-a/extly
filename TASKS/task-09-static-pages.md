# TASK 09 — Pricing, Privacy & Terms Pages
# Complete Tasks 01 and 03 before starting this. Can run parallel to Task 08.

## Your Mission
Build three simple but important pages: pricing, privacy policy, and terms of service.
These are all server components. No data fetching needed — mostly static content.

---

## Page 1: Pricing Page — app/pricing/page.tsx

Server component.

### Header
```
Navbar (public)

Page header (text-center pt-20 pb-12):
Section label: "Pricing"
Headline (font-serif text-5xl): "Simple, transparent pricing"
Subheadline: "Start free. Upgrade when you need more."
```

### Pricing Cards
Two cards side by side on desktop, stacked on mobile:
```
grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto
```

Free Card:
```
White card, border border-border-subtle:

Badge: "Free Forever" (gray badge, top)
Price: "$0" (text-5xl font-mono font-bold text-text-primary)
"/month" (text-text-secondary)

Feature list (space-y-3 mt-6):
✓ Track up to 3 extensions
✓ 7 days of history
✓ Daily email alerts
✓ Basic metrics and charts
✗ Competitor comparison (text-text-muted with line-through)
✗ CSV export (text-text-muted with line-through)
✗ Slack alerts (text-text-muted with line-through)

[Start Free →] primary button full width mt-6 → links to /login
"No credit card required" (text-xs text-text-muted text-center mt-2)
```

Pro Card (slightly elevated, highlighted):
```
White card, border-2 border-accent-blue, shadow-md:

Badge: "Most Popular" (blue badge, top)
Price: "$14" (text-5xl font-mono font-bold text-accent-blue)
"/month" (text-text-secondary)
"or $140/year (save 2 months)" (text-xs text-text-muted)

Feature list:
✓ Track up to 25 extensions
✓ 6 months of history
✓ Daily email alerts
✓ All metrics and charts
✓ Competitor comparison (coming soon)
✓ CSV export (coming soon)
✓ Slack alerts (coming soon)

[Start Pro — Coming Soon] button full width mt-6
Button should be disabled (not yet implemented)
bg-gray-100 text-text-muted cursor-not-allowed

"7-day free trial" (text-xs text-text-muted text-center mt-2)
```

### FAQ Section
```
max-w-2xl mx-auto mt-16

Title: "Common questions"

Simple accordion or just flat Q&A list:

Q: Can I cancel anytime?
A: Yes. Cancel anytime, no questions asked. No long-term commitments.

Q: What happens when I hit the free plan limit?
A: We'll prompt you to upgrade. You won't lose any existing data or tracking.

Q: Do you offer refunds?
A: Yes, within 7 days of purchase on the Pro plan, no questions asked.

Q: What counts as one tracked extension?
A: Each unique Chrome extension you add to your dashboard counts as one.

Q: How often do you check extensions for changes?
A: Once per day at 9 AM UTC. You'll receive an email within minutes of detection.
```

### Footer
Import and render Footer component.

---

## Page 2: Privacy Policy — app/privacy/page.tsx

Server component. Simple document layout.

```
Navbar (public)

Document container (max-w-3xl mx-auto px-6 py-16):

Title: "Privacy Policy" (text-3xl font-bold)
Subtitle: "Last updated: May 2026" (text-text-secondary text-sm mt-1 mb-10)

Prose content (space-y-8, each section is an h2 + paragraphs):

1. What We Collect
- Email address (for magic link authentication and sending alerts)
- Which extensions you choose to track
- Basic usage data via Vercel Analytics (page views only, no personal tracking)

2. What We Don't Collect
- We never collect your Chrome browsing history
- We never access which extensions are installed on your browser
- We never sell your data to any third party

3. How We Use Your Data
- To send you email alerts about extensions you track
- To maintain your dashboard and tracking preferences
- To improve the product based on aggregate usage patterns

4. Data Storage
- All data is stored securely in Supabase (PostgreSQL)
- Data is encrypted at rest and in transit via HTTPS
- Servers are located in the EU region

5. Email Communications
- We only send alerts you explicitly signed up for
- Every email includes a working unsubscribe link
- We never send unsolicited marketing emails

6. Deleting Your Data
- You can delete your account anytime from the Settings page
- All your data is permanently deleted within 30 days of account deletion
- Email us at privacy@extly.com to request manual deletion

7. Contact
For privacy questions: privacy@extly.com

8. Changes to This Policy
We will notify you by email if we make material changes to this privacy policy.
```

Footer render.

---

## Page 3: Terms of Service — app/terms/page.tsx

Server component. Same document layout as privacy.

```
Navbar (public)

Document container (max-w-3xl mx-auto px-6 py-16):

Title: "Terms of Service"
Subtitle: "Last updated: May 2026"

Sections:

1. Acceptance of Terms
By using Extly, you agree to these terms. If you do not agree, do not use the service.

2. What Extly Does
Extly provides analytics and monitoring for publicly available Chrome Web Store extension data. All data displayed is publicly visible on the Chrome Web Store.

3. Free Plan
- Maximum 3 tracked extensions on the free plan
- 7 days of historical data
- We may change free plan limits with 30 days advance notice

4. Acceptable Use
You may not:
- Use Extly data for resale or redistribution without permission
- Create multiple accounts to circumvent free plan limits
- Attempt to reverse engineer or overload our scraping infrastructure
- Use the service for any unlawful purpose

5. Data Accuracy
- Extension data is fetched from Chrome Web Store daily
- We cannot guarantee 100% accuracy or uninterrupted service
- Data is provided "as is" for informational purposes only
- Do not make critical business decisions based solely on our data

6. Payments (Pro Plan)
- Billed monthly or annually via Stripe (not yet available)
- Cancel anytime; no partial refunds except within 7-day trial window
- We may change prices with 30 days advance notice

7. Termination
- We may suspend or terminate accounts that violate these terms
- You may delete your account at any time from Settings

8. Limitation of Liability
Extly is not liable for any business decisions made based on data shown in our platform.

9. Contact
For questions about these terms: hello@extly.com
```

Footer render.

---

## Done When
- [ ] Pricing page shows Free and Pro cards side by side on desktop
- [ ] Free card has correct features with checkmarks and X marks
- [ ] Pro card has blue border and "Most Popular" badge
- [ ] Pro "Start Pro" button is disabled with coming soon state
- [ ] FAQ section shows all 5 questions
- [ ] Privacy policy has all 8 sections
- [ ] Terms of service has all 9 sections
- [ ] All three pages have Navbar and Footer
- [ ] All three pages are mobile responsive
- [ ] Document pages have max-w-3xl centered layout
- [ ] No TypeScript errors
