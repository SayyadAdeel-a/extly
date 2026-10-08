import React from 'react'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SavedExtensionsList } from '@/components/saved/SavedExtensionsList'

export const metadata: Metadata = {
  title: 'My Saved Extensions | Extly',
  description: 'Your pinned Chrome extensions. Monitor ratings, user growth, and version history in real-time.',
}

export default function SavedPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-main">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            Saved Extensions
          </h1>
          <p className="text-text-secondary mt-1 text-sm">
            Stored directly in your browser. No account or login required.
          </p>
        </div>

        <SavedExtensionsList />
      </main>

      <Footer />
    </div>
  )
}
