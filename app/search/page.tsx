import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SearchInput } from '@/components/search/SearchInput'

export const metadata = {
  title: 'Search Chrome Extensions | Extly',
  description: 'Find and analyze any Chrome extension in real time. Monitor ratings, user counts, and version history. 100% free.',
}

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-main">
      <Navbar />

      <main className="flex-1 pb-20">
        <header className="pt-20 pb-12 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
              Search Chrome Extensions
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Find any extension or paste a Chrome Web Store link directly.<br className="hidden md:block" /> 
              Instant real-time analytics with zero signup.
            </p>
          </div>
        </header>

        <SearchInput />
      </main>

      <Footer />
    </div>
  )
}
