import { NextResponse } from 'next/server'
import { scrapeExtension } from '@/lib/scraper/chrome-store'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || 'cjpalhdlnbpafiamejdnhcphjbkeiagm' // uBlock Origin

  try {
    const data = await scrapeExtension(id)
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
