# Tech Stack — Extly

## Core Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (Strict) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Magic Link) |
| Email | Resend |
| Charts | Recharts |
| Icons | Lucide React |
| HTML Parsing | Cheerio |
| Hosting | Vercel |

## Infrastructure
- **Scheduling:** Vercel Cron Jobs (0 9 * * *)
- **Email:** Transactional emails via Resend

## Key Dependencies
- `@supabase/supabase-js`
- `@supabase/ssr`
- `resend`
- `recharts`
- `lucide-react`
- `cheerio`

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NEXT_PUBLIC_APP_URL`
- `CRON_SECRET`
