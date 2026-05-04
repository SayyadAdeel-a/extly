# TASK 05 — Email System & Cron Job
# Complete Tasks 01, 02, and 04 before starting this.

## Your Mission
Build the email alert system and the daily cron job that is the core value of Extly.
This is the pipeline: scrape → detect change → save alert → send email.

## Files to Build

### lib/email/templates/alertEmail.ts
HTML email template function. Returns a complete HTML string.

The email must include:
- Extly branding header (blue #2563EB background)
- Extension name and change message clearly shown
- Alert type icon: 📉 for rating_change, 🔄 for version_update, 🎉 for user_milestone
- "View Extension Details →" button linking to the extension page on Extly
- Footer with unsubscribe link
- Clean, simple design that renders well in Gmail and Outlook
- No external CSS files — all styles must be inline

```typescript
export function alertEmailHTML({
  extensionName,
  message,
  alertType,
  extensionUrl,
  unsubscribeUrl,
}: {
  extensionName: string
  message: string
  alertType: 'rating_change' | 'version_update' | 'user_milestone'
  extensionUrl: string
  unsubscribeUrl: string
}): string {
  // Return complete HTML email string
}
```

### lib/email/sendAlert.ts
Sends alert email via Resend API.

```typescript
import { Resend } from 'resend'
import { alertEmailHTML } from './templates/alertEmail'
import type { DetectedChange } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAlertEmail({
  toEmail,
  extensionName,
  extensionId,
  change,
}: {
  toEmail: string
  extensionName: string
  extensionId: string
  change: DetectedChange
}): Promise<void> {
  const extensionUrl = `${process.env.NEXT_PUBLIC_APP_URL}/extension/${extensionId}`
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/settings`

  const subject = change.type === 'rating_change'
    ? `${extensionName} rating changed`
    : change.type === 'version_update'
    ? `${extensionName} shipped a new version`
    : `${extensionName} hit a user milestone`

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: toEmail,
    subject,
    html: alertEmailHTML({
      extensionName,
      message: change.message,
      alertType: change.type,
      extensionUrl,
      unsubscribeUrl,
    }),
  })
}
```

### app/api/cron/check-extensions/route.ts
The daily monitoring job. Runs at 9 AM UTC via Vercel Cron.

CRITICAL: This is the most important file in the project. Get it right.

Complete logic:
```
1. Verify Authorization header matches CRON_SECRET — return 401 if not
2. Use SUPABASE_SERVICE_ROLE_KEY (bypasses RLS — required for batch operations)
3. Get today's date string: new Date().toISOString().split('T')[0]
4. Get yesterday's date string
5. Query all extensions that have at least one user tracking them:
   SELECT extensions.* FROM extensions
   INNER JOIN user_tracking ON extensions.id = user_tracking.extension_id
   GROUP BY extensions.id
6. For each extension:
   a. Fetch fresh data: fetchExtensionFromStore(extension.chrome_id)
   b. Save today's snapshot (upsert — safe if already exists)
   c. Update extension last_fetched_at
   d. Get yesterday's snapshot from extension_snapshots
   e. If yesterday's snapshot exists:
      - Run detectChanges(yesterdaySnapshot, todayData)
      - For each change detected:
        * Get all users tracking this extension
        * For each user:
          - Get their email from auth.users
          - Check their notification preferences (notify_rating, notify_version, notify_users)
          - Skip if they have that alert type disabled
          - Insert alert record into alerts table
          - Send email via sendAlertEmail()
          - Increment alertsSent counter
   f. Wait 500ms before next extension (rate limiting)
   g. Catch any error per extension — log it, continue to next extension
7. Return summary: { success: true, extensionsChecked, changesDetected, alertsSent, errors[] }
```

Email rate limit: Maximum 1 email per user per extension per day.
Before sending, check: does an alert already exist for this user + extension + today?
If yes: skip sending email (still save the alert record).

Use service role Supabase client:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

## Done When
- [ ] alertEmailHTML returns valid HTML with all required sections
- [ ] Email shows correct icon for each alert type
- [ ] Email has working extensionUrl button
- [ ] Email has unsubscribe link in footer
- [ ] sendAlertEmail sends via Resend without errors
- [ ] Cron route returns 401 if Authorization header missing or wrong
- [ ] Cron route uses service role key not anon key
- [ ] Cron route fetches only extensions with active trackers
- [ ] Cron route saves snapshot for every extension checked
- [ ] Cron route detects rating changes of 0.1 or more
- [ ] Cron route detects version changes
- [ ] Cron route detects user milestones
- [ ] Cron route inserts alert records for each affected user
- [ ] Cron route sends email to each affected user
- [ ] Cron route respects user notification preferences
- [ ] Cron route skips duplicate emails (max 1 per user per extension per day)
- [ ] Cron route waits 500ms between extension fetches
- [ ] Cron route continues if one extension fails (does not crash entire job)
- [ ] Cron route logs errors per extension to console.error
- [ ] Cron route returns accurate summary counts
