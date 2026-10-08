import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import { extractChromeId } from '@/lib/scraper/extractId'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 })
  }

  // 1. If it's a direct Chrome ID or URL, match immediately
  const directChromeId = extractChromeId(query)
  if (directChromeId) {
    return NextResponse.json({
      success: true,
      data: { chrome_id: directChromeId }
    })
  }

  // 2. Perform live, dynamic search on the Chrome Web Store
  try {
    const searchUrl = `https://chromewebstore.google.com/search/${encodeURIComponent(query)}?hl=en&gl=US`
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`Chrome Web Store search returned ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const items: Array<{
      id: string
      chromeId: string
      name: string
      iconUrl: string | null
      rating: number | null
      developer: string
      chromeUrl: string
      userCount?: number | null
    }> = []
    const seen = new Set<string>()

    $('a[href*="/detail/"]').each((_, aEl) => {
      const href = $(aEl).attr('href') || ''
      const match = href.match(/\/detail\/(?:[^\/]+\/)?([a-z]{32})/i)
      if (!match) return

      const id = match[1].toLowerCase()
      if (seen.has(id)) return
      seen.add(id)

      const card = $(aEl).closest('section, article, div[jscontroller], div').filter((_, el) => {
        return $(el).find('img').length > 0 && $(el).text().length > 10
      }).first()

      const parent = card.length ? card : $(aEl).parent()

      // Extract title
      let name = parent.find('h2, [role="heading"], h3, .header, .title').first().text().trim()
      if (!name) {
        const slugMatch = href.match(/\/detail\/([^\/]+)\/[a-z]{32}/i)
        if (slugMatch) {
          name = decodeURIComponent(slugMatch[1]).replace(/-/g, ' ')
        } else {
          name = parent.find('div, span').first().text().trim().slice(0, 50)
        }
      }

      // Extract icon
      const iconUrl = parent.find('img').attr('src') || null

      // Extract rating
      let rating: number | null = null
      const ratingMatch = parent.text().match(/([\d.]+)\s*out of 5/i) || parent.text().match(/([\d.]+)\s*★/)
      if (ratingMatch) {
        rating = parseFloat(ratingMatch[1])
      }

      // Extract developer
      let developer = 'Chrome Web Store'
      const devMatch = parent.text().match(/(?:by|offered by)\s*([^·|\n]+)/i)
      if (devMatch) {
        developer = devMatch[1].trim()
      }

      items.push({
        id,
        chromeId: id,
        name: name || 'Chrome Extension',
        iconUrl,
        rating,
        developer,
        chromeUrl: `https://chromewebstore.google.com/detail/${id}`,
      })
    })

    return NextResponse.json({
      results: items,
      total: items.length
    })

  } catch (error: any) {
    console.error('[search] Live search error:', error)
    return NextResponse.json({ error: 'Search failed', results: [], total: 0 }, { status: 500 })
  }
}
