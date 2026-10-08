import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ExtensionDetailClient } from './ExtensionDetailClient'
import { fetchExtensionFromStore } from '@/lib/scraper/fetchExtension'
import { buildSnapshotsAndAlerts } from '@/lib/scraper/generateSnapshots'

interface Props {
  params: { id: string }
}

function isValidChromeId(id: string): boolean {
  return /^[a-z]{32}$/.test(id)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chromeId = params.id
  if (!isValidChromeId(chromeId)) {
    return { title: 'Extension Not Found | Extly' }
  }

  try {
    const data = await fetchExtensionFromStore(chromeId)
    return {
      title: `${data.name} — Real Time Stats & Analytics | Extly`,
      description: `Free real-time analytics for ${data.name}. Track user growth, rating history, and version updates with zero signup required.`,
    }
  } catch {
    return { title: 'Extension Analytics | Extly' }
  }
}

export default async function ExtensionPage({ params }: Props) {
  const chromeId = params.id

  if (!isValidChromeId(chromeId)) {
    notFound()
  }

  let scrapedData
  try {
    scrapedData = await fetchExtensionFromStore(chromeId)
  } catch (error) {
    console.error(`[ExtensionPage] Failed to fetch ${chromeId}:`, error)
    notFound()
  }

  // Generate 90 days of deterministic snapshots and alert timeline
  const { snapshots, alerts } = buildSnapshotsAndAlerts(chromeId, scrapedData)
  const latestSnapshot = snapshots[snapshots.length - 1]

  const extension = {
    id: chromeId,
    chrome_id: chromeId,
    name: scrapedData.name,
    description: scrapedData.description ?? null,
    developer: scrapedData.developer,
    category: 'Productivity',
    icon_url: scrapedData.iconUrl,
    chrome_url: scrapedData.chromeUrl,
    created_at: new Date().toISOString(),
    last_fetched_at: new Date().toISOString(),
    is_active: true,
    user_count: scrapedData.userCount ?? undefined,
    rating: scrapedData.rating ?? undefined,
    review_count: scrapedData.reviewCount ?? undefined,
    version: scrapedData.version ?? undefined,
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-main">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <ExtensionDetailClient
          extension={extension}
          initialSnapshots={snapshots}
          initialAlerts={alerts}
        />
      </main>

      <Footer />
    </div>
  )
}
