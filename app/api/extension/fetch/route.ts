import { NextRequest, NextResponse } from 'next/server'
import { extractChromeId } from '@/lib/scraper/extractId'
import { fetchExtensionFromStore } from '@/lib/scraper/fetchExtension'
import { getServiceSupabase } from '@/lib/supabase/service'

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

  const supabase = getServiceSupabase()

  try {
    // 1. Check if we have a fresh record (last 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    
    const { data: existing, error: fetchError } = await supabase
      .from('extensions')
      .select('*, extension_snapshots(*)')
      .eq('chrome_id', chromeId)
      .gt('last_fetched_at', oneHourAgo)
      .order('snapshot_date', { foreignTable: 'extension_snapshots', ascending: false })
      .limit(1, { foreignTable: 'extension_snapshots' })
      .single()

    // IF we have existing data AND it's "complete enough" (has a name and some stats)
    // AND today's snapshot isn't all nulls (which happened with the old scraper)
    if (existing && !fetchError) {
      const latestSnap = existing.extension_snapshots?.[0]
      const isComplete = existing.name && latestSnap && (latestSnap.user_count !== null || latestSnap.rating !== null)
      
      if (isComplete) {
        return NextResponse.json({ 
          success: true, 
          cached: true,
          data: {
            ...existing,
            user_count: latestSnap.user_count,
            rating: latestSnap.rating,
            review_count: latestSnap.review_count,
            version: latestSnap.version,
            latestSnapshot: latestSnap
          } 
        })
      }
      // If not complete, we fall through to fetch live data again
      console.log(`[api/extension/fetch] Cached data incomplete for ${chromeId}, refetching...`)
    }

    // 2. Not found or stale — fetch live
    const scrapedData = await fetchExtensionFromStore(chromeId)

    // 3. Upsert extension record
    const { data: extension, error: upsertError } = await supabase
      .from('extensions')
      .upsert({
        chrome_id: chromeId,
        name: scrapedData.name,
        developer: scrapedData.developer,
        icon_url: scrapedData.iconUrl,
        chrome_url: scrapedData.chromeUrl,
        last_fetched_at: new Date().toISOString(),
        is_active: true
      }, { onConflict: 'chrome_id' })
      .select()
      .single()

    if (upsertError || !extension) {
      throw new Error(`Failed to upsert extension: ${upsertError?.message}`)
    }

    // 4. Create today's snapshot
    const today = new Date().toISOString().split('T')[0]
    const { error: snapshotError } = await supabase
      .from('extension_snapshots')
      .upsert({
        extension_id: extension.id,
        user_count: scrapedData.userCount,
        rating: scrapedData.rating,
        review_count: scrapedData.reviewCount,
        version: scrapedData.version,
        snapshot_date: today
      }, { onConflict: 'extension_id,snapshot_date' })

    if (snapshotError) {
      console.error('Failed to create snapshot:', snapshotError)
      // We don't throw here to still return the live data
    }

    return NextResponse.json({ 
      success: true, 
      cached: false,
      data: {
        ...extension,
        user_count: scrapedData.userCount,
        rating: scrapedData.rating,
        review_count: scrapedData.reviewCount,
        version: scrapedData.version,
        latestSnapshot: {
          user_count: scrapedData.userCount,
          rating: scrapedData.rating,
          review_count: scrapedData.reviewCount,
          version: scrapedData.version,
          snapshot_date: today
        }
      } 
    })

  } catch (error: any) {
    console.error(`API Error (fetch):`, error)
    
    if (error.message?.includes('Extension not found')) {
      return NextResponse.json({ error: 'Extension not found on Chrome Web Store' }, { status: 404 })
    }
    
    return NextResponse.json({ error: 'Failed to fetch extension data' }, { status: 500 })
  }
}
