import React, { Suspense } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SearchInput } from '@/components/search/SearchInput'
import { POPULAR_EXTENSIONS } from '@/lib/constants/popularExtensions'

export const metadata = {
  title: 'Search Chrome Extensions — Real-Time Directory & Stats',
  description: 'Search and analyze any Chrome extension in real time. Track users, ratings, and version history with zero signup. 100% free.',
  alternates: {
    canonical: '/search',
  },
}

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-main">
      <Navbar />

      <main className="flex-1 pb-20">
        <header className="pt-20 pb-12 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-accent-blue rounded-full text-xs font-semibold mb-4">
              <Sparkles size={14} />
              <span>Free Live Chrome Web Store Intelligence</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight mb-6">
              Search Chrome Extensions
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Find any extension or paste a Chrome Web Store link directly.<br className="hidden md:block" /> 
              Instant real-time analytics with zero signup.
            </p>
          </div>
        </header>

        <Suspense fallback={
          <div className="max-w-2xl mx-auto text-center py-12 text-text-muted">
            Loading search...
          </div>
        }>
          <SearchInput />
        </Suspense>

        {/* Crawlable Popular Extensions Hub */}
        <section className="max-w-5xl mx-auto px-4 mt-20 pt-16 border-t border-border-subtle">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={18} className="text-accent-blue" />
                <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                  Popular &amp; Trending Extensions
                </h2>
              </div>
              <p className="text-sm text-text-secondary">
                Explore real-time intelligence for top-ranked Chrome extensions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_EXTENSIONS.map((ext) => (
              <Link
                key={ext.id}
                href={`/extension/${ext.id}`}
                className="group p-5 bg-white rounded-xl border border-border-subtle hover:border-accent-blue/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-accent-blue bg-blue-50 px-2 py-0.5 rounded-full">
                      {ext.category}
                    </span>
                    <span className="text-xs text-text-muted group-hover:text-accent-blue flex items-center transition-colors">
                      View Stats <ArrowRight size={13} className="ml-1" />
                    </span>
                  </div>
                  <h3 className="font-bold text-text-primary group-hover:text-accent-blue transition-colors text-base mb-1">
                    {ext.name}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {ext.highlight}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
