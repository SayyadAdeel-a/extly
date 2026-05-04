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
