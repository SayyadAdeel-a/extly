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
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
  Terminal
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DirectAnalyzeHero } from '@/components/home/DirectAnalyzeHero'
import { Button } from '@/components/ui/Button'
import { POPULAR_EXTENSIONS } from '@/lib/constants/popularExtensions'

export const metadata = {
  title: 'Extly — 100% Free Chrome Extension Analytics & Intelligence',
  description: 'Analyze any Chrome extension in real time. Track users, ratings, and version history. 100% free, unlimited, no signup required.',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  const quickTestExtensions = POPULAR_EXTENSIONS.slice(0, 5)

  return (
    <div className="flex flex-col min-h-screen bg-bg-main text-text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        {/* Subtle dot background */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-xs font-semibold text-accent-blue mb-6">
            <Sparkles size={13} />
            <span>100% Free Forever • Zero Sign-Up • Open Source MIT</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] mb-6 text-text-primary">
            Instant Chrome Extension<br />Analytics &amp; Intelligence
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Search any extension or paste a store link. Instantly inspect live installs, ratings, and 90-day growth trajectories.
          </p>

          {/* Direct Input Action Box */}
          <DirectAnalyzeHero />

          {/* Quick Launch Clickable Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-text-muted mr-1">Try live:</span>
            {quickTestExtensions.map((ext) => (
              <Link
                key={ext.id}
                href={`/extension/${ext.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-blue-50/70 border border-border-subtle hover:border-accent-blue/40 rounded-full text-xs font-medium text-text-secondary hover:text-accent-blue transition-all shadow-sm"
              >
                <span>{ext.name}</span>
                <ArrowRight size={11} className="opacity-60" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Architecture (Diverse layout, no repetitive 3-card dump) */}
      <section className="py-20 bg-white border-y border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-3">
              Engineered for Deep Extension Intelligence
            </h2>
            <p className="text-text-secondary text-base leading-relaxed">
              Real-time on-demand scraping replaces stale monthly directories. No accounts, no database, and no limits.
            </p>
          </div>

          {/* Bento Grid Layout (7/5 + 5/7 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Tile 1: Real-Time Parser Visual (cols 7) */}
            <div className="md:col-span-7 bg-bg-surface rounded-2xl border border-border-subtle p-7 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-50 text-accent-blue rounded-md text-xs font-mono font-medium mb-4">
                  <Terminal size={14} />
                  <span>On-Demand Live Parser</span>
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                  Live Scraped on Search
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Unlike traditional directories that refresh once a month, Extly queries the Chrome Web Store in real time, guaranteeing exact active install figures and version numbers.
                </p>
              </div>

              {/* Code/Terminal Telemetry Simulation */}
              <div className="bg-gray-950 text-gray-200 rounded-xl p-4 font-mono text-xs space-y-2 border border-gray-800">
                <div className="flex items-center justify-between text-gray-500 pb-2 border-b border-gray-800 text-[11px]">
                  <span>HTTP GET /detail/extension-id</span>
                  <span className="text-accent-green font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                    200 OK • 142ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">active_users</span>
                  <span className="text-emerald-400 font-bold">10,000,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">star_rating</span>
                  <span className="text-amber-400 font-bold">4.82 / 5.0 (24,190 reviews)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">manifest_version</span>
                  <span className="text-blue-400 font-bold">v3 (MV3 Compliant)</span>
                </div>
              </div>
            </div>

            {/* Tile 2: 90-Day Trajectory Curves (cols 5) */}
            <div className="md:col-span-5 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 rounded-2xl border border-blue-100 p-7 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-green-50 text-accent-green rounded-md text-xs font-mono font-medium mb-4">
                  <TrendingUp size={14} />
                  <span>Growth Velocity</span>
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                  90-Day Trend Curves
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Interactive Recharts curves reveal whether an extension is accelerating or losing active installs.
                </p>
              </div>

              {/* Mini Curve Visual */}
              <div className="mt-6 pt-6 border-t border-blue-100/60 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-text-primary font-mono">+14.2%</div>
                  <div className="text-xs text-text-muted">Estimated 90-day velocity</div>
                </div>
                <div className="h-10 w-24 flex items-end gap-1.5">
                  <div className="w-3 bg-blue-200 rounded-t h-4" />
                  <div className="w-3 bg-blue-300 rounded-t h-6" />
                  <div className="w-3 bg-blue-400 rounded-t h-7" />
                  <div className="w-3 bg-blue-500 rounded-t h-9" />
                  <div className="w-3 bg-accent-blue rounded-t h-10" />
                </div>
              </div>
            </div>

            {/* Tile 3: Client-Side Privacy (cols 5) */}
            <div className="md:col-span-5 bg-bg-surface rounded-2xl border border-border-subtle p-7 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 text-accent-amber rounded-md text-xs font-mono font-medium mb-4">
                  <ShieldCheck size={14} />
                  <span>Zero-Database Architecture</span>
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                  Pure Client-Side Privacy
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Pinned extensions are stored strictly in your browser via HTML5 localStorage. Zero trackers, zero cookies, zero user database.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle flex items-center gap-2 text-xs text-text-muted">
                <CheckCircle2 size={15} className="text-accent-green" />
                <span>Auditable open-source MIT codebase</span>
              </div>
            </div>

            {/* Tile 4: Version Changelog & Radar (cols 7) */}
            <div className="md:col-span-7 bg-bg-surface rounded-2xl border border-border-subtle p-7 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-purple-50 text-purple-600 rounded-md text-xs font-mono font-medium mb-4">
                  <Activity size={14} />
                  <span>Release Milestones</span>
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                  Changelog &amp; Alert Timeline
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Track developer releases, permission adjustments, and rating spikes chronologically without refreshing store pages.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-border-subtle flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-accent-green" />
                  <div>
                    <div className="font-semibold text-text-primary">New Version Deployed</div>
                    <div className="text-[11px] text-text-muted">Release notes &amp; version hash</div>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-border-subtle flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-accent-blue" />
                  <div>
                    <div className="font-semibold text-text-primary">Review Sentiment Shift</div>
                    <div className="text-[11px] text-text-muted">5-star rating distribution delta</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Streamlined Workflow (Horizontal, non-repetitive) */}
      <section className="py-20 bg-bg-main">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-primary mb-3">
              Three Steps to Full Visibility
            </h2>
            <p className="text-text-secondary text-base">
              No account creation, no API keys, and no monthly credit card charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6 bg-white rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono text-accent-blue bg-blue-50 px-2.5 py-1 rounded-md mb-4 inline-block">
                  01
                </span>
                <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                  Paste or Search
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Enter any Chrome Web Store link, 32-character extension ID, or keyword in the search bar.
                </p>
              </div>
            </div>

            <div className="relative p-6 bg-white rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono text-accent-green bg-green-50 px-2.5 py-1 rounded-md mb-4 inline-block">
                  02
                </span>
                <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                  Live Parse &amp; Model
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Extly queries Google Chrome Web Store on-demand, computing growth models and review ratios.
                </p>
              </div>
            </div>

            <div className="relative p-6 bg-white rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md mb-4 inline-block">
                  03
                </span>
                <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                  Bookmark &amp; Track
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Explore interactive charts and save extensions locally to revisit anytime with zero login.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Button size="lg" href="/search" className="px-8 h-12 shadow-sm font-semibold">
              Explore Chrome Extensions Directory <ArrowRight size={17} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
