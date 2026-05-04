# TASK 01 — Project Setup & Configuration
# Complete this task fully before moving to Task 02.

## Your Mission
Initialize the Extly project with the correct stack, configuration files, environment setup, and database schema. When this task is done the project should run locally with no errors.

## Steps to Complete

### Step 1: Create Next.js Project
```bash
npx create-next-app@latest extly --typescript --tailwind --app --no-src-dir
cd extly
```

### Step 2: Install All Dependencies
```bash
npm install @supabase/supabase-js @supabase/ssr resend recharts lucide-react cheerio
npm install -D @types/cheerio
```

### Step 3: Create .env.local
Create this file in the project root. Leave values empty — developer fills them in.
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=alerts@extly.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
CRON_SECRET=
```

### Step 4: Update tailwind.config.ts
Replace entire file with custom colors and fonts from rule file 03-design.md.

### Step 5: Update app/layout.tsx
Import Geist, Geist_Mono, and Instrument_Serif from next/font/google.
Set metadata title and description.
Apply font variables to body className.
Set body background to bg-bg-main.

### Step 6: Create vercel.json
```json
{
  "crons": [
    {
      "path": "/api/cron/check-extensions",
      "schedule": "0 9 * * *"
    }
  ]
}
```

### Step 7: Create middleware.ts
Protect these routes — redirect to /login if not authenticated:
- /dashboard
- /alerts  
- /settings

Redirect authenticated users away from /login to /dashboard.
Use exact implementation from rule file 02-stack.md.

### Step 8: Create types/index.ts
Copy all interfaces from rule file 05-coding.md exactly:
- Extension
- ExtensionSnapshot
- UserTracking
- Alert
- Profile
- ScrapedExtension
- DetectedChange

### Step 9: Create lib/supabase/client.ts and lib/supabase/server.ts
Use exact implementations from rule file 02-stack.md.

### Step 10: Create lib/utils/formatNumbers.ts
Copy exact implementation from rule file 05-coding.md.
Functions: formatUserCount, formatRating, formatDiff, formatDate, formatRelativeTime

### Step 11: Create lib/utils/detectChanges.ts
Copy exact implementation from rule file 05-coding.md.
Thresholds: rating change >= 0.1, all version changes, milestones at 1K/5K/10K/50K/100K/500K/1M

### Step 12: Create All Empty Directories
```
components/layout/
components/ui/
components/extension/
components/dashboard/
lib/email/templates/
lib/scraper/
app/(auth)/login/
app/(dashboard)/dashboard/
app/(dashboard)/alerts/
app/(dashboard)/settings/
app/search/
app/extension/[id]/
app/pricing/
app/privacy/
app/terms/
app/api/extension/fetch/
app/api/extension/search/
app/api/extension/track/
app/api/alerts/
app/api/cron/check-extensions/
app/api/auth/callback/
```

### Step 13: Add to .gitignore
```
.env.local
.env
.env.*.local
```

## Done When
- [ ] npm run dev runs with zero errors
- [ ] No TypeScript errors on any file
- [ ] All custom Tailwind colors resolve correctly
- [ ] middleware.ts redirects unauthenticated users from /dashboard to /login
- [ ] types/index.ts has all 7 interfaces
- [ ] Both Supabase clients exist and are typed correctly
- [ ] All utility functions created
- [ ] vercel.json exists with cron schedule
- [ ] All directories created and ready
