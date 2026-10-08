import React from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  Sparkles, 
  Clock, 
  Search, 
  BarChart3, 
  Bookmark, 
  Zap, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DirectAnalyzeHero } from '@/components/home/DirectAnalyzeHero'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Extly — 100% Free Chrome Extension Analytics & Intelligence',
  description: 'Analyze any Chrome extension in real time. Track users, ratings, and version history. 100% free, unlimited, no signup required.',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-main text-text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-28 overflow-hidden">
        {/* Subtle dot background */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-xs font-semibold text-accent-blue mb-6">
            <Sparkles size={14} />
            <span>100% Free Forever • Unlimited Searches • No Account Required</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.1] mb-6 text-text-primary">
            Instant Chrome Extension<br />Analytics & Intelligence
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Paste any Chrome Web Store link or search by keyword. Immediately unlock real-time active users, rating changes, and 90-day growth trends.
          </p>

          {/* Direct Input Action Box */}
          <DirectAnalyzeHero />
        </div>
      </section>

      {/* Live Features Grid */}
      <section className="py-16 bg-white border-y border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Everything You Need To Understand Any Extension
            </h2>
            <p className="text-text-secondary">
              Zero paywalls. No credit cards. No monthly delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-accent-blue flex items-center justify-center font-bold">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold">Real-Time On-Demand Scrapes</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Directories refresh on slow monthly cycles. Extly extracts live data on-demand the moment you search.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-green-50 text-accent-green flex items-center justify-center font-bold">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold">90-Day Growth Curves</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Visualize install velocity and review trends across clean, interactive Recharts curves with zero setup.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-accent-amber flex items-center justify-center font-bold">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold">Instant Changelogs & Bookmarks</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Track version updates and milestones. Pin extensions to your browser list to revisit anytime with 1 click.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 3-Step Walkthrough Section (Replaces Hardcoded Extensions) */}
      <section className="py-20 bg-bg-main">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-text-secondary mb-12 max-w-xl mx-auto">
            Zero friction, zero database, and 100% free for developers and researchers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-accent-blue bg-blue-50 px-2.5 py-1 rounded-md mb-4 inline-block">
                  Step 01
                </span>
                <h3 className="text-lg font-bold text-text-primary mb-2">Paste or Search</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Enter any Chrome Web Store link, 32-character extension ID, or keyword in the search bar.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-subtle text-xs text-text-muted flex items-center gap-1.5">
                <Search size={14} className="text-accent-blue" />
                <span>Instant input detection</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-accent-green bg-green-50 px-2.5 py-1 rounded-md mb-4 inline-block">
                  Step 02
                </span>
                <h3 className="text-lg font-bold text-text-primary mb-2">Live Scrape & Parse</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Extly queries Google Chrome Web Store on-demand, extracting active user counts, ratings, and version history.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-subtle text-xs text-text-muted flex items-center gap-1.5">
                <BarChart3 size={14} className="text-accent-green" />
                <span>Multi-layer resilient parser</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md mb-4 inline-block">
                  Step 03
                </span>
                <h3 className="text-lg font-bold text-text-primary mb-2">Analyze & Bookmark</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Explore interactive charts and save your favorite extensions locally in your browser with zero login.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-subtle text-xs text-text-muted flex items-center gap-1.5">
                <Bookmark size={14} className="text-amber-500" />
                <span>Saved locally in browser</span>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Button size="lg" href="/search" className="px-8 h-12">
              Start Searching Extensions <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
