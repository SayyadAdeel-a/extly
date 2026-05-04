# Implementation Plan: Extension Scraper Implementation

**Track ID:** scraper-impl_20260504
**Spec:** [spec.md](./spec.md)
**Created:** 2026-05-04
**Status:** [ ] Not Started

## Overview
Build the scraper using `cheerio` and `fetch`. Focus on robust parsing of the Chrome Web Store HTML.

## Phase 1: Scraper Core Logic
Implement the main scraping function.

### Tasks
- [ ] Task 1.1: Create `lib/scraper/chrome-store.ts`.
- [ ] Task 1.2: Implement HTML fetching with appropriate headers to avoid blocking.
- [ ] Task 1.3: Map Cheerio selectors to extract extension details.
- [ ] Task 1.4: Implement number parsing helpers (converting "10K" to 10000).

### Verification
- [ ] Manual test script in `scratch/test-scraper.ts` returns expected JSON.

## Phase 2: Error Handling & Resilience
Ensure the scraper handles failures gracefully.

### Tasks
- [ ] Task 2.1: Add try/catch blocks with descriptive error messages.
- [ ] Task 2.2: Handle 404s (extension removed) and 429s (rate limited).
- [ ] Task 2.3: Validate output against `ScrapedExtension` type.

### Verification
- [ ] Scraper handles invalid IDs without crashing.

## Phase 3: Testing & Validation
Verify logic with real data.

### Tasks
- [ ] Task 3.1: Create a scratch script to scrape 3 popular extensions (e.g., uBlock, Grammarly, Loom).
- [ ] Task 3.2: Verify data accuracy against the live web store.

### Verification
- [ ] All 3 extensions scraped successfully with accurate metrics.
