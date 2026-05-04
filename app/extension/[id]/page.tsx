import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ExtensionDetailClient } from './ExtensionDetailClient'

interface Props {
  params: { id: string }
}

function isValidChromeId(id: string): boolean {
  return /^[a-z]{32}$/.test(id)
}

async function getExtensionData(chromeId: string) {
  // We call the API directly or use the service logic
  // For a server component in Next.js, calling the local API via fetch can be tricky with URLs.
  // Better to use the database/service logic directly if possible, or use the absolute URL.
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const response = await fetch(`${appUrl}/api/extension/fetch?id=${chromeId}`, {
    cache: 'no-store'
  })
  
  if (!response.ok) return null
  return response.json()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getExtensionData(params.id)
  
  if (!data) return { title: 'Extension Not Found | Extly' }
  
  return {
    title: `${data.name} Stats & Analytics | Extly`,
    description: `Real time stats for ${data.name}. Track users, ratings, and version history. Updated daily.`
  }
}

export default async function ExtensionPage({ params }: Props) {
  const chromeId = params.id
  
  if (!isValidChromeId(chromeId)) {
    notFound()
  }

  const extensionData = await getExtensionData(chromeId)
  if (!extensionData?.data) {
    notFound()
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let isTracking = false
  if (user) {
    const { data: trackData } = await supabase
      .from('user_tracking')
      .select('id')
      .eq('user_id', user.id)
      .eq('extension_id', extensionData.data.id)
      .single()
    
    isTracking = !!trackData
  }

  // Fetch 90 days of snapshots for charts
  const { data: snapshots } = await supabase
    .from('extension_snapshots')
    .select('*')
    .eq('extension_id', extensionData.data.id)
    .order('snapshot_date', { ascending: false })
    .limit(90)

  // Fetch all alerts for this extension
  const { data: alerts } = await supabase
    .from('alerts')
    .select('*')
    .eq('extension_id', extensionData.data.id)
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col min-h-screen bg-bg-main">
      <Navbar user={user ? { email: user.email! } : null} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <ExtensionDetailClient 
          extension={extensionData.data} 
          initialSnapshots={snapshots || []} 
          initialAlerts={alerts || []}
          initialIsTracking={isTracking}
          isLoggedIn={!!user}
        />
      </main>

      <Footer />
    </div>
  )
}
