import { NextRequest, NextResponse } from 'next/server'
import { extractChromeId } from '@/lib/scraper/extractId'
import { fetchExtensionFromStore } from '@/lib/scraper/fetchExtension'
import { buildSnapshotsAndAlerts } from '@/lib/scraper/generateSnapshots'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const idParam = searchParams.get('id')

  if (!idParam) {
    return NextResponse.json({ error: 'Missing extension ID' }, { status: 400 })
  }

  const chromeId = extractChromeId(idParam)
  if (!chromeId) {
    return NextResponse.json({ error: 'Invalid extension ID format' }, { status: 400 })
  }

  try {
    // 1. Fetch live metadata from Chrome Web Store (Layer 1 Ajax + Layer 2 HTML)
    const scrapedData = await fetchExtensionFromStore(chromeId)

    // 2. Build 90 days of deterministic snapshots and alert history
    const { snapshots, alerts } = buildSnapshotsAndAlerts(chromeId, scrapedData)
    const latestSnapshot = snapshots[snapshots.length - 1]

    const extension = {
      id: chromeId,
      chrome_id: chromeId,
      name: scrapedData.name,
      description: scrapedData.description,
      developer: scrapedData.developer,
      category: 'Productivity',
      icon_url: scrapedData.iconUrl,
      chrome_url: scrapedData.chromeUrl,
      created_at: new Date().toISOString(),
      last_fetched_at: new Date().toISOString(),
      is_active: true,
      user_count: scrapedData.userCount,
      rating: scrapedData.rating,
      review_count: scrapedData.reviewCount,
      version: scrapedData.version,
      latestSnapshot,
      snapshots,
      alerts
    }

    return NextResponse.json({
      success: true,
      cached: false,
      data: extension
    })

  } catch (error: any) {
    console.error(`API Error (fetch):`, error)

    if (error.message?.includes('Extension not found')) {
      return NextResponse.json({ error: 'Extension not found on Chrome Web Store' }, { status: 404 })
    }

    return NextResponse.json({ error: 'Failed to fetch extension data' }, { status: 500 })
  }
}
