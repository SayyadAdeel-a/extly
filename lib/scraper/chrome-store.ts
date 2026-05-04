import * as cheerio from 'cheerio'
import type { ScrapedExtension } from '@/types'

export async function scrapeExtension(chromeId: string): Promise<ScrapedExtension | null> {
  const url = `https://chromewebstore.google.com/detail/${chromeId}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 0 } // Disable caching for the scraper
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`Failed to fetch extension: ${response.statusText}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // 1. Try to find JSON-LD for structured data
    let jsonLd: any = null
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const content = $(el).text()
        const parsed = JSON.parse(content)
        if (parsed['@type'] === 'SoftwareApplication' || parsed['@type'] === 'ItemPage') {
          jsonLd = parsed
        }
      } catch (e) {
        // Ignore parsing errors
      }
    })

    // 2. Extract Basic Info
    const name = $('meta[property="og:title"]').attr('content')?.split(' - ')[0] || 
                 jsonLd?.name || 
                 $('h1').text().trim()

    const iconUrl = $('meta[property="og:image"]').attr('content') || 
                    jsonLd?.image || 
                    null

    // 3. Extract User Count (usually in a div containing "users")
    let userCount: number | null = null
    const userText = $('div:contains("users")').last().text() || ''
    const userMatch = userText.match(/([\d,]+)\+?\s*users/)
    if (userMatch) {
      userCount = parseInt(userMatch[1].replace(/,/g, ''), 10)
    }

    // 4. Extract Rating & Reviews
    let rating: number | null = null
    let reviewCount: number | null = null

    if (jsonLd?.aggregateRating) {
      rating = parseFloat(jsonLd.aggregateRating.ratingValue)
      reviewCount = parseInt(jsonLd.aggregateRating.reviewCount, 10)
    } else {
      // Fallback to selectors found by browser agent
      const ratingText = $('span.VfPpkd-vQESL').first().text()
      if (ratingText) rating = parseFloat(ratingText)

      const reviewText = $('a.awpk2 p').text() || ''
      const reviewMatch = reviewText.match(/([\d,.]+)([KkMm])?\s*ratings/)
      if (reviewMatch) {
        let val = parseFloat(reviewMatch[1].replace(/,/g, ''))
        const suffix = reviewMatch[2]?.toLowerCase()
        if (suffix === 'k') val *= 1000
        if (suffix === 'm') val *= 1000000
        reviewCount = Math.round(val)
      }
    }

    // 5. Extract Version & Developer
    let version: number | string | null = jsonLd?.softwareVersion || null
    let developer: string | null = jsonLd?.author?.name || jsonLd?.publisher?.name || null

    if (!version) {
      const versionContainer = $('div:contains("Version")').filter((_, el) => $(el).text().trim() === 'Version').next()
      version = versionContainer.text().trim() || null
    }

    if (!developer) {
      const devContainer = $('div:contains("Offered by")').filter((_, el) => $(el).text().trim() === 'Offered by').next()
      developer = devContainer.text().trim() || null
    }

    return {
      chromeId,
      name: name || 'Unknown',
      userCount,
      rating,
      reviewCount,
      version: version ? version.toString() : null,
      iconUrl,
      developer,
      chromeUrl: url,
      fetchedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error(`Scraper error for ${chromeId}:`, error)
    throw error
  }
}
