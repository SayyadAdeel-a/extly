import * as cheerio from 'cheerio'
import type { SupabaseClient } from '@supabase/supabase-js'

interface HistoricalSnapshot {
  date: string        // YYYY-MM-DD
  userCount: number | null
  rating: number | null
  version: string | null
}

export async function backfillExtensionHistory(
  chromeId: string,
  extensionId: string,
  supabase: SupabaseClient
): Promise<number> {
  // Returns number of snapshots inserted

  try {
    const snapshots = await fetchHistoricalData(chromeId)
    if (!snapshots.length) return 0

    // Insert all historical snapshots
    // Use upsert to avoid duplicates if some snapshots already exist
    const rows = snapshots.map(s => ({
      extension_id: extensionId,
      user_count: s.userCount,
      rating: s.rating,
      review_count: null, // ChromeStats usually doesn't show history for review count in this table
      version: s.version,
      snapshot_date: s.date,
    }))

    const { error } = await supabase
      .from('extension_snapshots')
      .upsert(rows, { onConflict: 'extension_id,snapshot_date' })

    if (error) {
      console.error('[backfill] Supabase insert error:', error)
      return 0
    }

    console.log(`[backfill] Inserted ${rows.length} historical snapshots for ${chromeId}`)
    return rows.length

  } catch (error) {
    // Backfill failing should never crash the main track flow
    console.error(`[backfill] Failed for ${chromeId}:`, error)
    return 0
  }
}

async function fetchHistoricalData(chromeId: string): Promise<HistoricalSnapshot[]> {
  const url = `https://chrome-stats.com/d/${chromeId}`

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  })

  if (!response.ok) {
    throw new Error(`ChromeStats returned ${response.status}`)
  }

  const html = await response.text()
  return parseHistoricalData(html)
}

function parseHistoricalData(html: string): HistoricalSnapshot[] {
  const $ = cheerio.load(html)
  const snapshots: HistoricalSnapshot[] = []

  // ChromeStats shows history in a data table
  // Look for rows containing dates and user counts

  // Method 1: Find table with historical data
  $('table').each((_, table) => {
    const headers = $(table).find('th').map((_, th) => $(th).text().toLowerCase().trim()).get()
    
    // Check if this looks like a history table
    const hasDate = headers.some(h => h.includes('date') || h.includes('time'))
    const hasUsers = headers.some(h => h.includes('user') || h.includes('install'))
    
    if (hasDate || hasUsers) {
      $(table).find('tr').each((i, row) => {
        if (i === 0) return // skip header row
        
        const cells = $(row).find('td').map((_, td) => $(td).text().trim()).get()
        if (cells.length < 2) return

        const snapshot = parseTableRow(cells, headers)
        if (snapshot) snapshots.push(snapshot)
      })
    }
  })

  // Method 2: Look for JSON data embedded in script tags
  if (snapshots.length === 0) {
    $('script').each((_, script) => {
      const content = $(script).html() || ''
      
      // Look for chart data arrays with dates and numbers
      const chartDataMatch = content.match(/labels\s*:\s*\[([\s\S]*?)\][\s\S]*?data\s*:\s*\[([\s\S]*?)\]/i)
      if (chartDataMatch) {
        const labels = chartDataMatch[1].match(/"([^"]+)"/g)?.map(l => l.replace(/"/g, '')) || []
        const values = chartDataMatch[2].match(/[\d.]+/g)?.map(Number) || []
        
        labels.forEach((label, i) => {
          const date = parseDate(label)
          if (date && values[i] !== undefined) {
            snapshots.push({
              date,
              userCount: values[i] > 100 ? Math.round(values[i]) : null,
              rating: values[i] <= 5 ? values[i] : null,
              version: null,
            })
          }
        })
      }
    })
  }

  // Deduplicate by date and sort ascending
  const deduped = new Map<string, HistoricalSnapshot>()
  for (const snapshot of snapshots) {
    if (!deduped.has(snapshot.date)) {
      deduped.set(snapshot.date, snapshot)
    }
  }

  return Array.from(deduped.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-90) // Keep last 90 days maximum
}

function parseTableRow(cells: string[], headers: string[]): HistoricalSnapshot | null {
  let date: string | null = null
  let userCount: number | null = null
  let rating: number | null = null
  let version: string | null = null

  cells.forEach((cell, i) => {
    const header = headers[i] || ''
    
    if (header.includes('date') || header.includes('time') || isDateString(cell)) {
      const pDate = parseDate(cell)
      if (pDate) date = pDate
    } else if (header.includes('user') || header.includes('install')) {
      userCount = parseNumber(cell)
    } else if (header.includes('rating') || header.includes('star')) {
      const num = parseFloat(cell)
      if (num > 0 && num <= 5) rating = num
    } else if (header.includes('version') || /^\d+\.\d+/.test(cell)) {
      version = cell
    }
  })

  if (!date) return null
  return { date, userCount, rating, version }
}

function parseDate(str: string): string | null {
  // Handle formats: "2024-01-15", "Jan 15, 2024", "15/01/2024", "2024/01/15"
  const cleaned = str.trim()
  
  // Already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) return cleaned
  
  // Try parsing as date
  const date = new Date(cleaned)
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0]
  }
  
  return null
}

function isDateString(str: string): boolean {
  return parseDate(str) !== null
}

function parseNumber(str: string): number | null {
  const cleaned = str.replace(/[^0-9]/g, '')
  return cleaned ? parseInt(cleaned) : null
}
