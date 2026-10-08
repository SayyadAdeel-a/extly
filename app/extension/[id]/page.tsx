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
    const userString = data.userCount ? `${data.userCount.toLocaleString()} active users` : 'live user analytics'
    const ratingString = data.rating ? `${data.rating.toFixed(1)}★ rating` : ''
    const statsSnippet = [userString, ratingString].filter(Boolean).join(', ')

    return {
      title: `${data.name} — Real-Time Stats & Analytics`,
      description: `Free real-time analytics for ${data.name} (${statsSnippet}). Monitor user growth, rating changes, and version updates with zero signup.`,
      alternates: {
        canonical: `/extension/${chromeId}`,
      },
      openGraph: {
        title: `${data.name} Chrome Extension Stats & Growth Analytics`,
        description: `Analyze ${data.name}: ${statsSnippet}. Real-time statistics, rating breakdown, and version updates on Extly.`,
        url: `/extension/${chromeId}`,
        images: data.iconUrl ? [{ url: data.iconUrl, alt: `${data.name} icon` }] : undefined,
      },
      twitter: {
        card: 'summary',
        title: `${data.name} Stats & Analytics | Extly`,
        description: `Track real-time users, ratings, and updates for ${data.name} on Extly.`,
      },
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

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://extly.dev'

  // JSON-LD Structured Data: SoftwareApplication & BreadcrumbList
  const jsonLdSoftware = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: extension.name,
    description: extension.description || `Real-time analytics and statistics for ${extension.name} on Chrome Web Store.`,
    operatingSystem: 'Google Chrome',
    applicationCategory: 'BrowserExtension',
    image: extension.icon_url,
    softwareVersion: extension.version,
    author: extension.developer ? {
      '@type': 'Organization',
      name: extension.developer,
    } : undefined,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: extension.rating ? {
      '@type': 'AggregateRating',
      ratingValue: extension.rating,
      reviewCount: extension.review_count || 1,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
  }

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Search Extensions',
        item: `${siteUrl}/search`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: extension.name,
        item: `${siteUrl}/extension/${chromeId}`,
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-main">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

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
