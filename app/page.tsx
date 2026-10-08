import React from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  ExternalLink,
  Zap,
  ArrowRight
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DirectAnalyzeHero } from '@/components/home/DirectAnalyzeHero'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata = {
  title: 'Extly — 100% Free Chrome Extension Analytics & Intelligence',
  description: 'Analyze any Chrome extension in real time. Track users, ratings, and version history. 100% free, unlimited, no signup required.',
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
            Paste any Chrome Web Store link. Immediately unlock real-time user counts, rating changes, and 90-day growth trends.
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
              <h3 className="text-xl font-bold">Real-Time Daily Scrapes</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                ChromeStats and other directories refresh on a slow monthly cycle. Extly extracts live data on-demand the moment you request it.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-green-50 text-accent-green flex items-center justify-center font-bold">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold">90-Day Growth Curves</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Visualize install velocity and review trends across clean, interactive Recharts curves without having to configure dashboards.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-accent-amber flex items-center justify-center font-bold">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold">Instant Changelogs</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Track version updates and historical milestones. Pin extensions to your browser list to revisit anytime with a single click.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Direct Extension Showcase */}
      <section className="py-20 bg-bg-main">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Try It Now On A Top Extension
          </h2>
          <p className="text-text-secondary mb-10 max-w-xl mx-auto">
            Click below to explore full analytics for some of the world's most popular extensions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
            {[
              { name: 'uBlock Origin', users: '40,000,000+', rating: '4.8 ★', id: 'cjpalhdlnbpafiamejdnhcphjbkeiagm', dev: 'Raymond Hill' },
              { name: 'Grammarly', users: '45,000,000+', rating: '4.5 ★', id: 'kbfnbcaeplbcioakkpcpgfkobkghlhen', dev: 'Grammarly Inc.' },
              { name: 'Dark Reader', users: '6,000,000+', rating: '4.7 ★', id: 'eimadpbcbfnmbkopoojfekhnkhdbieeh', dev: 'Alexander Shutau' },
              { name: 'React DevTools', users: '4,000,000+', rating: '4.2 ★', id: 'fmkadmapgofadopljbjfkapdkoienihi', dev: 'Meta' },
              { name: 'Loom Recorder', users: '8,000,000+', rating: '4.7 ★', id: 'liecbddmkiiihnedobmlmillhodjkdmb', dev: 'Loom' },
              { name: 'Bitwarden', users: '5,000,000+', rating: '4.8 ★', id: 'nngceckbapebfimnlniiiahkandclblb', dev: 'Bitwarden Inc.' },
            ].map((item) => (
              <Link 
                key={item.id} 
                href={`/extension/${item.id}`}
                className="bg-white border border-border-subtle rounded-xl p-5 hover:border-accent-blue hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-text-primary group-hover:text-accent-blue transition-colors">{item.name}</h3>
                    <Badge variant="blue">{item.rating}</Badge>
                  </div>
                  <p className="text-xs text-text-muted mb-4">by {item.dev}</p>
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-text-secondary border-t border-border-subtle pt-3">
                  <span>{item.users} users</span>
                  <span className="text-accent-blue font-sans font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    View <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
