import { NextRequest, NextResponse } from 'next/server'
import { extractChromeId } from '@/lib/scraper/extractId'
import { getServiceSupabase } from '@/lib/supabase/service'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 })
  }

  // 1. If it looks like a Chrome ID or URL, redirect to fetch logic
  const chromeId = extractChromeId(query)
  if (chromeId) {
    const fetchUrl = new URL('/api/extension/fetch', request.url)
    fetchUrl.searchParams.set('id', chromeId)
    return NextResponse.redirect(fetchUrl)
  }

  const supabase = getServiceSupabase()

  try {
    // 2. Search existing extensions in DB
    const { data: results, error, count } = await supabase
      .from('extensions')
      .select(`
        id,
        chrome_id,
        name,
        developer,
        category,
        icon_url,
        chrome_url,
        extension_snapshots (
          user_count,
          rating,
          review_count,
          version,
          snapshot_date
        )
      `)
      .or(`name.ilike.%${query}%,developer.ilike.%${query}%`)
      .order('user_count', { foreignTable: 'extension_snapshots', ascending: false })
      .limit(20)

    if (error) throw error

    // 3. Format results to only include the latest snapshot
    const formattedResults = results?.map(ext => {
      // extension_snapshots is an array, we want the most recent one
      // Sorting in query didn't guarantee only 1 returned per extension in this join
      // so we sort and take first
      const snapshots = ext.extension_snapshots as any[]
      const latestSnapshot = snapshots?.sort((a, b) => 
        new Date(b.snapshot_date).getTime() - new Date(a.snapshot_date).getTime()
      )[0] || null

      return {
        id: ext.id,
        chromeId: ext.chrome_id,
        name: ext.name,
        developer: ext.developer,
        category: ext.category,
        iconUrl: ext.icon_url,
        chromeUrl: ext.chrome_url,
        latestSnapshot: latestSnapshot ? {
          userCount: latestSnapshot.user_count,
          rating: latestSnapshot.rating,
          reviewCount: latestSnapshot.review_count,
          version: latestSnapshot.version,
          snapshotDate: latestSnapshot.snapshot_date
        } : null
      }
    })

    return NextResponse.json({
      results: formattedResults || [],
      total: formattedResults?.length || 0
    })

  } catch (error: any) {
    console.error('API Error (search):', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
