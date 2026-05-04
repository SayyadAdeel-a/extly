# TASK 02 — Chrome Web Store Scraper
# Complete Task 01 before starting this. Complete this before Task 03.

## Your Mission
Build the scraper that fetches Chrome extension data from the Chrome Web Store.
This is the data engine of the entire product. It must be reliable and handle failures gracefully.

## Files to Create

### lib/scraper/extractId.ts
Extracts the chrome extension ID from any input format.

```typescript
export function extractChromeId(input: string): string | null {
  const trimmed = input.trim()

  // Direct 32-char lowercase ID
  if (/^[a-z]{32}$/.test(trimmed)) return trimmed

  // New Chrome Web Store URL format
  // https://chromewebstore.google.com/detail/name/cfhdojbkjhnklbpkdaibdccddilifddb
  const newUrlMatch = trimmed.match(
    /chromewebstore\.google\.com\/detail\/[^/]*\/([a-z]{32})/i
  )
  if (newUrlMatch) return newUrlMatch[1]

  // Old Chrome Web Store URL format
  // https://chrome.google.com/webstore/detail/name/cfhdojbkjhnklbpkdaibdccddilifddb
  const oldUrlMatch = trimmed.match(
    /chrome\.google\.com\/webstore\/detail\/[^/]*\/([a-z]{32})/i
  )
  if (oldUrlMatch) return oldUrlMatch[1]

  return null
}

export function isValidChromeId(id: string): boolean {
  return /^[a-z]{32}$/.test(id)
}
```

### lib/scraper/parseExtension.ts
Parses raw HTML from Chrome Web Store page into structured data.

```typescript
import * as cheerio from 'cheerio'
import type { ScrapedExtension } from '@/types'

export function parseExtensionHTML(html: string, chromeId: string): ScrapedExtension {
  const $ = cheerio.load(html)

  // Name from page title
  const rawTitle = $('title').text()
  const name = rawTitle
    .replace(/\s*[-–]\s*Chrome Web Store\s*$/i, '')
    .replace(/\s*[-–]\s*Chrome\s*$/i, '')
    .trim() || 'Unknown Extension'

  // User count — find text matching "X,XXX users" pattern
  let userCount: number | null = null
  $('*').each((_, el) => {
    const text = $(el).children().length === 0 ? $(el).text() : ''
    const match = text.match(/^([\d,]+)\s+users?$/i)
    if (match && !userCount) {
      userCount = parseInt(match[1].replace(/,/g, ''))
    }
  })

  // Rating — find "X.X out of 5" pattern
  let rating: number | null = null
  const ratingMatch = html.match(/(\d\.\d)\s*out\s*of\s*5/i)
  if (ratingMatch) rating = parseFloat(ratingMatch[1])

  // Review count — find "X,XXX ratings" pattern
  let reviewCount: number | null = null
  const reviewMatch = html.match(/([\d,]+)\s+ratings?/i)
  if (reviewMatch) reviewCount = parseInt(reviewMatch[1].replace(/,/g, ''))

  // Version — look for version number near "Version" label
  let version: string | null = null
  const versionMatch = html.match(/Version[\s\S]{0,50}?([\d]+\.[\d]+\.[\d]+(?:\.[\d]+)?)/i)
  if (versionMatch) version = versionMatch[1].trim()

  // Icon URL — Google CDN image URLs
  let iconUrl: string | null = null
  const iconMatch = html.match(/https:\/\/lh3\.googleusercontent\.com\/[A-Za-z0-9\-_=]+/i)
  if (iconMatch) iconUrl = iconMatch[0]

  // Developer name
  let developer: string | null = null
  const developerMatch = html.match(/offered\s+by\s+([^\n<"]+)/i)
  if (developerMatch) developer = developerMatch[1].trim()

  return {
    chromeId,
    name,
    userCount,
    rating,
    reviewCount,
    version,
    iconUrl,
    developer,
    chromeUrl: `https://chromewebstore.google.com/detail/${chromeId}`,
    fetchedAt: new Date().toISOString(),
  }
}
```

### lib/scraper/fetchExtension.ts
Main scraper function. Fetches from Chrome Web Store with proper headers.

```typescript
import type { ScrapedExtension } from '@/types'
import { parseExtensionHTML } from './parseExtension'

export async function fetchExtensionFromStore(chromeId: string): Promise<ScrapedExtension> {
  const url = `https://chromewebstore.google.com/detail/${chromeId}`

  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
    },
    next: { revalidate: 0 },
  })

  if (response.status === 404) {
    throw new Error(`Extension not found: ${chromeId}`)
  }

  if (!response.ok) {
    throw new Error(
      `Chrome Web Store returned ${response.status} for extension ${chromeId}`
    )
  }

  const html = await response.text()

  if (html.includes('No results found') || html.includes('404')) {
    throw new Error(`Extension not found: ${chromeId}`)
  }

  return parseExtensionHTML(html, chromeId)
}

// Delay helper for rate limiting between requests
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
```

## Done When
- [ ] extractChromeId correctly handles 32-char IDs
- [ ] extractChromeId correctly handles new Chrome Web Store URLs
- [ ] extractChromeId correctly handles old chrome.google.com URLs
- [ ] extractChromeId returns null for invalid input
- [ ] fetchExtensionFromStore returns ScrapedExtension type
- [ ] fetchExtensionFromStore throws clear error on 404
- [ ] fetchExtensionFromStore throws clear error on other failures
- [ ] parseExtensionHTML extracts name without "Chrome Web Store" suffix
- [ ] All functions are fully typed with no TypeScript errors
- [ ] delay function exported for use in cron job
