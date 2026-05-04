# Specification: Extension Scraper Implementation

**Track ID:** scraper-impl_20260504
**Type:** Feature
**Created:** 2026-05-04
**Status:** In Progress

## Summary
Implement the core scraper logic using Cheerio to extract metadata from the Chrome Web Store.

## Context
Extly depends on daily snapshots of Chrome extension data. The scraper must reliably extract:
- Name
- User Count (parsed to number)
- Rating (parsed to number)
- Review Count (parsed to number)
- Version
- Icon URL
- Developer Name

## Acceptance Criteria
- [ ] `lib/scraper/chrome-store.ts` implemented with `scrapeExtension` function.
- [ ] Correctly handles "K", "M", and comma-formatted user counts.
- [ ] Correctly extracts rating (e.g., 4.5) and review count.
- [ ] Error handling for invalid IDs or store changes.
- [ ] Basic tests to verify scraping on a real Chrome Store URL.

## Dependencies
- [x] project-init_20260504

## Out of Scope
- Snapshot persistence to database (next track).
- Change detection triggers.
- Cron job scheduling.
