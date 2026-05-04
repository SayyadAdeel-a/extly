import type { ScrapedExtension } from '@/types'
import * as cheerio from 'cheerio'


/**
 * Layer 1: Google's Internal Ajax API (Most Reliable)
 * This is what the store frontend calls internally.
 */
async function fetchFromAjaxAPI(chromeId: string) {
  const url = `https://chromewebstore.google.com/ajax/detail?hl=en&id=${chromeId}&pv=20210820`
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://chrome.google.com/webstore/',
      'X-Same-Domain': '1',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    next: { revalidate: 3600 }
  })

  if (!response.ok) {
    throw new Error(`Ajax API returned ${response.status}`)
  }
  
  const text = await response.text()
  
  // Response starts with )]}' for security — strip it
  const cleanText = text.replace(/^\)\]\}'\n/, '')
  const json = JSON.parse(cleanText)
  
  // Try to find the data array
  const data = json?.[0]?.[1]?.[0]
  
  if (!data) {
    throw new Error('Unexpected Ajax API response structure')
  }

  return {
    name: data[1] || null,
    description: data[6] || null,
    userCount: parseUserCount(data[22]) || null,
    rating: data[12] ? parseFloat(data[12]) : null,
    // Try provided indices for reviewCount: data[12], data[22]?.[0], data[22]?.[1], data[22]?.[2]
    reviewCount: typeof data[22]?.[2] === 'number' ? data[22][2] : (data[22]?.[0] || data[22]?.[1] || (typeof data[12] === 'number' ? data[12] : null)),
    version: data[6]?.[89]?.[1] || null,
    // Try provided indices for developer: data[9], data[9]?.[0], data[2], data[57]
    developer: data[9]?.[0] || data[9] || data[2] || data[57] || null,
    iconUrl: data[25]?.[0]?.[3]?.[0] || null,
  }
}

function parseUserCount(ratingData: any): number | null {
  if (!ratingData?.[1]) return null
  // Handles strings like "10,000,000+ users"
  const str = String(ratingData[1]).replace(/[^0-9]/g, '')
  return str ? parseInt(str) : null
}

/**
 * Layer 2: Extract from JSON-LD and Script Tags
 */
async function fetchFromHTMLJSON(chromeId: string) {
  const urls = [
    `https://chromewebstore.google.com/detail/extly/${chromeId}?hl=en&gl=US`,
    `https://chromewebstore.google.com/detail/${chromeId}?hl=en&gl=US`,
  ]

  let html = ''
  
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Upgrade-Insecure-Requests': '1',
        },
        redirect: 'follow',
        next: { revalidate: 3600 }
      })
      
      if (response.ok) {
        html = await response.text()
        if (html.toLowerCase().includes(chromeId.toLowerCase()) || html.includes('og:title')) {
          break
        }
      }
    } catch (e) {
      continue
    }
  }

  if (!html) throw new Error('All HTML fetch attempts failed')

  const $ = cheerio.load(html)

  // 1. Extract from JSON-LD
  const jsonLdScript = $('script[type="application/ld+json"]').html()
  if (jsonLdScript) {
    try {
      const jsonLd = JSON.parse(jsonLdScript)
      if (jsonLd.name) {
        return {
          name: jsonLd.name,
          description: jsonLd.description || null,
          userCount: null,
          rating: jsonLd.aggregateRating?.ratingValue ? parseFloat(jsonLd.aggregateRating.ratingValue) : null,
          reviewCount: jsonLd.aggregateRating?.reviewCount ? parseInt(jsonLd.aggregateRating.reviewCount) : null,
          version: null,
          developer: jsonLd.author?.name || null,
          iconUrl: jsonLd.image || null,
        }
      }
    } catch (e) {}
  }

  // 2. Extract from Meta tags
  const ogTitle = $('meta[property="og:title"]').attr('content')
  const ogDesc = $('meta[property="og:description"]').attr('content')
  const ogImage = $('meta[property="og:image"]').attr('content')

  // 3. Extract from visible text using Cheerio selectors
  let userCount: number | null = null
  let rating: number | null = null
  let version: string | null = null
  let developer: string | null = null
  let reviewCount: number | null = null

  // Find user count (e.g. "42,000,000 users")
  const userText = $('body').text().match(/([\d,.]+(?:\+)?)\s*users/i)
  if (userText) {
    userCount = parseInt(userText[1].replace(/[^0-9]/g, ''))
  }

  // Find rating (e.g. "4.5 out of 5")
  const ratingText = $('body').text().match(/([\d.]+)\s*out of 5/i)
  if (ratingText) {
    rating = parseFloat(ratingText[1])
  }

  // Find version
  const versionText = $('body').text().match(/Version\s*([\d.]+)/i)
  if (versionText) {
    version = versionText[1]
  }

  const devText = $('body').text().match(/Offered by:\s*([^<|\n]+)/i)
  if (devText) {
    developer = devText[1].trim()
  }
  if (!developer) {
    // Try common classes or links in the new store
    developer = $('a[href*="webstore/dev"]').first().text().trim() || 
                $('a.cJI8ee').text().trim() || 
                $('.VfPpkd-vQESLd').first().text().trim() || 
                null
  }

  // Find reviews count
  const reviewsText = $('body').text().match(/([\d,.]+(?:\+)?)\s*ratings/i) || 
                      $('body').text().match(/([\d,.]+(?:\+)?)\s*reviews/i) ||
                      $('body').text().match(/([\d,.]+(?:\+)?)\s*votes/i)
  
  if (reviewsText) {
    reviewCount = parseInt(reviewsText[1].replace(/[^0-9]/g, ''))
  }
  if (!reviewCount) {
    // Try common classes/patterns
    const selectorText = $('.awpk2').text() || $('.rating-count').text()
    const match = selectorText.match(/([\d,.]+)/)
    if (match) {
      reviewCount = parseInt(match[1].replace(/[^0-9]/g, ''))
    }
  }

  return {
    name: ogTitle?.replace(' - Chrome Web Store', '').trim() || 'Unknown Extension',
    description: ogDesc || null,
    userCount,
    rating,
    reviewCount,
    version,
    developer,
    iconUrl: ogImage || null,
  }
}

/**
 * Main Fetch Function — Uses Layered Approach
 */
export async function fetchExtensionFromStore(chromeId: string): Promise<ScrapedExtension> {
  const errors: string[] = []

  // Layer 1: Ajax API
  try {
    const data = await fetchFromAjaxAPI(chromeId)
    if (data.name && data.name !== 'Unknown') {
      return {
        chromeId,
        ...data,
        chromeUrl: `https://chromewebstore.google.com/detail/${chromeId}`,
        fetchedAt: new Date().toISOString(),
      }
    }
  } catch (e) {
    errors.push(`Ajax API failed: ${e}`)
  }

  // Layer 2: HTML JSON extraction
  try {
    const data = await fetchFromHTMLJSON(chromeId)
    if (data.name && data.name !== 'Unknown') {
      return {
        chromeId,
        ...data,
        chromeUrl: `https://chromewebstore.google.com/detail/${chromeId}`,
        fetchedAt: new Date().toISOString(),
      }
    }
  } catch (e) {
    errors.push(`HTML JSON failed: ${e}`)
  }

  console.error(`[fetchExtension] All methods failed for ${chromeId}:`, errors)
  throw new Error(`Extension not found or blocked: ${chromeId}`)
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
