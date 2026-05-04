---
trigger: model_decision
description: Extly project overview. What we're building, who it's for, what's in V1, what is NOT being built, and the one pipeline that must work perfectly above everything else.
---

# RULE FILE 01 — Project Overview
# Read this before every single task. No exceptions.

## What Extly Is

Extly is a real time intelligence platform for Chrome extension developers.

It monitors Chrome extensions daily and sends email alerts when:
- The rating drops or improves by 0.1 or more
- A new version is released
- User count hits a milestone (1K, 5K, 10K, 50K, 100K, 500K, 1M)

**Core value proposition:** ChromeStats updates monthly. Extly updates daily.

## Who Uses It

Western developers and indie hackers who build or compete with Chrome extensions.
They pay in dollars. They already use SaaS tools. They understand the value immediately.

## What We Are Building in V1

Ten pages. No more. No less.

1. Landing page (/)
2. Search page (/search)
3. Extension detail page (/extension/[id])
4. Login page (/login) — magic link only
5. Dashboard (/dashboard) — protected
6. Alerts (/alerts) — protected
7. Settings (/settings) — protected
8. Pricing (/pricing)
9. Privacy policy (/privacy)
10. Terms of service (/terms)

## What We Are NOT Building in V1

Do not build any of these. Do not suggest them. Do not add them.

- Google OAuth (not yet verified by Google)
- Slack notifications
- Competitor comparison feature
- Category leaderboards
- CSV export
- API access for users
- Browser extension
- Mobile app
- Payment processing (Stripe)
- Any paid plan enforcement beyond the 3 extension free limit

## Free Plan Limit

Free users can track a maximum of 3 extensions.
This is enforced in the /api/extension/track route.
No payment system exists in V1. Just the hard limit.

## The One Thing That Must Work Perfectly

The scraper → snapshot → change detection → email alert pipeline.
This is the entire product. Everything else is just UI around this.
If this breaks, the product is dead. Prioritize it above everything.
