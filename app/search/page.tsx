import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SearchInput } from '@/components/search/SearchInput'

export const metadata = {
  title: 'Search Chrome Extensions | Extly',
  description: 'Find and track any Chrome extension. Monitor ratings, user counts, and version history in real time.',
}

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-main">
      <Navbar user={null} />

      <main className="flex-1 pb-20">
        <header className="pt-20 pb-12 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
              Search Chrome Extensions
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Find any extension and track its performance in real time.<br className="hidden md:block" /> 
              Instant alerts on ratings, users, and versions.
            </p>
          </div>
        </header>

        <SearchInput />
      </main>

      <Footer />
    </div>
  )
}
