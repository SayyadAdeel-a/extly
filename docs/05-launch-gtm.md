# Launch Checklist & Go-To-Market — Extly

## Pre-Launch Checklist

### Technical
- [ ] All 10 pages render without errors on desktop and mobile
- [ ] Magic link auth works end to end (send email → click link → land on dashboard)
- [ ] Search finds extensions by name and URL
- [ ] Tracking saves to database correctly
- [ ] First snapshot saves when extension is tracked
- [ ] Daily cron runs without errors (test manually via GET /api/cron/check-extensions)
- [ ] Alert email sends and looks correct in inbox
- [ ] Unsubscribe link in email works
- [ ] Dashboard shows tracked extensions correctly
- [ ] Alerts page shows history and mark-as-read works
- [ ] Free plan limit enforced (3 extensions max)
- [ ] All loading states work
- [ ] All empty states work
- [ ] 404 page exists
- [ ] Error boundaries exist on all pages
- [ ] Mobile layout works on 375px width
- [ ] Deployed to Vercel successfully
- [ ] Custom domain connected (if available)
- [ ] Environment variables set in Vercel
- [ ] Vercel cron job active

### Legal
- [ ] Privacy policy live at /privacy
- [ ] Terms of service live at /terms
- [ ] Unsubscribe link in all emails
- [ ] No personal data sold or shared

### SEO
- [ ] Page titles set for all pages
- [ ] Meta descriptions set for all pages
- [ ] OG image created for social sharing
- [ ] Sitemap generated
- [ ] robots.txt exists

### Analytics
- [ ] Vercel Analytics enabled (free, built in)

---

## Launch Day Plan

### T-7 days before launch
- [ ] Post on Twitter/X: "Building something for Chrome extension developers. DM me if you want early access."
- [ ] Post on r/ChromeExtensions: "Question: how do you currently track your competitor extensions?"
- [ ] Comment on 5 Indie Hackers posts to build karma

### T-3 days before launch
- [ ] Post on Twitter: "Launching in 3 days. Here's the problem I'm solving: [screenshot of ChromeStats vs Extly]"
- [ ] Post on r/SideProject: "Here's a preview of what I'm building — real time alerts for extension developers"
- [ ] DM 10 extension developers personally on Twitter with a preview

### T-1 day before launch
- [ ] Schedule Product Hunt post for 12:01 AM PST
- [ ] Prepare all social posts in advance
- [ ] Ask 20 people to be ready to upvote at launch time

### Launch Day (Product Hunt)
- [ ] Post goes live at 12:01 AM PST
- [ ] Share on Twitter immediately
- [ ] Post on r/ChromeExtensions, r/SideProject, r/indiehackers
- [ ] Comment on your own Product Hunt post with the backstory
- [ ] Reply to every single comment on Product Hunt within 1 hour
- [ ] DM everyone who upvoted to thank them personally
- [ ] Post update at 6 hours: "X upvotes so far, here's what I've learned"
- [ ] Post update at end of day: "Final results + what's next"

---

## Content for Each Platform

### Product Hunt Tagline
"Real time alerts when Chrome extensions change — ratings, versions, users"

### Product Hunt Description
```
ChromeStats updates once a month. A lot can happen in 30 days.

I built Extly because I kept missing important changes to extensions 
I was competing with or monitoring. By the time ChromeStats showed 
the data, it was old news.

Extly monitors any Chrome extension daily and emails you the moment:
→ The rating drops (or improves)
→ A new version is shipped
→ User count hits a milestone

Free forever for up to 3 extensions. No credit card needed.

Built by a solo developer in one week. Would love your feedback.
```

### Twitter/X Thread (Launch Day)
```
Tweet 1:
Just launched Extly on Product Hunt 🚀

Real time alerts for Chrome extension developers.
ChromeStats updates monthly. Extly updates daily.

[Product Hunt link]

Tweet 2:
The problem I kept hitting:

I'd check ChromeStats and see "rating: 4.2"
Then go to the actual store and see "rating: 3.8"

The data was a month old. My competitor had 
already responded to the problem. I had no idea.

Tweet 3:
So I built Extly.

Track any Chrome extension.
Get an email the moment the rating, version, 
or user count changes.

Daily monitoring. Not monthly.

Free for up to 3 extensions.

Tweet 4:
Built the entire thing in one week.

Stack: Next.js + Supabase + Vercel + Resend

$0 to run. $0 to start.

This is how you ship in 2026.

[Link to Extly]
```

### Reddit Post for r/ChromeExtensions
```
Title: "Built a free tool to get real time alerts when Chrome extensions change"

Hey r/ChromeExtensions,

I kept getting frustrated that ChromeStats only updates monthly. 
I'd find out a competitor dropped in rating or shipped a major update 
weeks after it happened.

So I built Extly — it monitors Chrome extensions daily and emails 
you when the rating, version, or user count changes.

Free to use for up to 3 extensions. No credit card.

Would love feedback from real extension developers.

[Link]
```

### Reddit Post for r/SideProject
```
Title: "Built and launched a Chrome extension analytics tool in one week — here's what I built and how"

Quick summary of what I shipped this week:

The problem: ChromeStats (the main tool for Chrome extension analytics) 
only updates its data once a month. For developers tracking competitors, 
that's useless.

The solution: Extly — daily monitoring + email alerts when anything changes.

Tech stack: Next.js 14, Supabase, Vercel, Resend. 
Total cost to run: $0.

Launched on Product Hunt today: [link]

Happy to answer any questions about the build.
```

### Indie Hackers Post (after earning posting rights)
```
Title: "How I built and launched a Chrome extension analytics tool in 7 days with $0"

[Detailed build in public post covering:]
- The problem I noticed
- Why ChromeStats isn't enough
- The tech decisions I made and why
- What I learned building it
- Launch results
- What's next
```

---

## First 30 Days Growth Plan

### Week 1: Launch
- Product Hunt launch
- Reddit posts (r/ChromeExtensions, r/SideProject, r/indiehackers)
- Twitter thread
- DM 20 extension developers personally

### Week 2: Content
- Write blog post: "How to track your Chrome extension competitors in real time"
- Post on Medium, Dev.to, Hashnode
- Create YouTube short: 60 second demo of Extly in action
- Reply to every "how do I track extensions" question on Reddit

### Week 3: SEO
- Create public extension pages for top 100 most popular extensions
- Target keywords: "[extension name] user count", "[extension name] stats"
- Each page is SEO optimized and links back to Extly

### Week 4: Outreach
- Email 50 Chrome extension developers directly
- Find them via Chrome Web Store — search popular extensions, find developer email
- Personal email, not template: "Hey, I built a tool that might help you..."
- Target: 5 paying customers by end of month

---

## Pricing Strategy

### V1 Launch: Free Only
No paid plans on launch day. 
Reason: Get users first. Understand what they value. Then charge.

### V2 (Week 3-4): Introduce Pro
Only introduce paid plans after:
- 50+ active free users
- At least 5 users who ask for more features
- Clear understanding of what Pro features they want

### Pricing when introduced:
- Free: 3 extensions, 7 days history, daily alerts
- Pro: $14/month — 25 extensions, 6 months history, Slack alerts
- Agency: $39/month — unlimited extensions, 1 year history, API

---

## Success Metrics to Track Weekly

| Metric | Week 1 Goal | Month 1 Goal |
|---|---|---|
| Registered users | 50 | 200 |
| Extensions tracked | 100 | 500 |
| Alerts sent | 10 | 100 |
| Product Hunt upvotes | 50 | — |
| Paying customers | 0 | 5 |
| MRR | $0 | $70 |

---

## Feedback Collection

After launch, ask every new user:
1. "How did you find Extly?"
2. "What would make you pay for this?"
3. "What's the #1 feature you wish it had?"

Do this manually via email for the first 50 users. 
Don't automate feedback collection until you understand the patterns.
