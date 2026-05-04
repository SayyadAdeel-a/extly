# Security Design — Extly

## 1. Authentication
- **Provider:** Supabase Auth.
- **Methods:** Magic Link (Passwordless Email OTP).
- **Session Management:** JWT handled by Supabase client.
- **Security:** Links expire after a short duration; provides a high barrier against brute-force while maintaining high UX.

## 2. Authorization (RLS)
- **Principle of Least Privilege:** Users can only see their own `user_tracking` and `alerts` records.
- **Public Data:** Extension metadata and snapshots are publicly readable to allow SEO pages and search visibility.
- **Service Role:** The Vercel Cron will use the `service_role` key to bypass RLS for scraping and batch alert creation.

## 3. Data Protection
- **Encryption at Rest:** Handled by Supabase/PostgreSQL.
- **Encryption in Transit:** Mandatory HTTPS for all API calls and frontend traffic.
- **Environment Variables:** All secrets (Supabase keys, Resend API key, Scraper keys) stored in Vercel/Local `.env` files and NEVER committed to Git.

## 4. API & Scraper Security
- **Rate Limiting:** Vercel middleware to prevent abuse on `/api/search` and `/api/fetch`.
- **Scraper Identity:** Use rotating User-Agents and appropriate headers to avoid being blocked by Chrome Web Store.
- **Input Validation:** Zod schema validation for all API request bodies.

## 5. Notification Security
- **Unsubscribe:** All Resend emails must include a valid unsubscribe link.
- **Rate Limit Alerts:** Max 1 email per user per day (digest mode) if many extensions update, to prevent spam.