# Specification: Project Initialization & Foundation

**Track ID:** project-init_20260504
**Type:** Chore
**Created:** 2026-05-04
**Status:** In Progress

## Summary
Initialize the Extly Next.js project with the required stack, dependencies, and foundational directory structure.

## Context
Extly is a real-time intelligence platform for Chrome extension developers. This track sets the baseline for the entire application.

## Acceptance Criteria
- [ ] Next.js 14+ app initialized in the root directory.
- [ ] Core dependencies installed (`@supabase/supabase-js`, `resend`, `recharts`, `lucide-react`, `cheerio`).
- [ ] Directory structure follows Rule 02 exactly.
- [ ] Tailwind CSS configured with the custom design system (Rule 03).
- [ ] Supabase browser and server clients implemented.
- [ ] Foundational types defined in `types/index.ts`.

## Dependencies
- None (First Track)

## Out of Scope
- Implementation of core features (Search, Scraper, etc.)
- Deployment to Vercel
- Supabase database schema creation (local setup only)
