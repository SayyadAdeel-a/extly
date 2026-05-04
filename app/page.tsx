import Link from 'next/link'
import { 
  AlertTriangle, 
  TrendingDown, 
  Zap, 
  Check, 
  X, 
  ChevronRight, 
  Bell, 
  ArrowRight,
  TrendingUp,
  Mail,
  Search as SearchIcon
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmailCaptureForm } from '@/components/marketing/EmailCaptureForm'

export const metadata = {
  title: 'Extly — Real Time Chrome Extension Intelligence',
  description: 'Get alerted the moment Chrome extensions change. Track ratings, versions, and user counts daily — not monthly like ChromeStats.',
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-main text-text-primary">
      {/* Section 1: Navbar */}
      <Navbar user={null} />

      {/* Section 2: Hero */}
      <header className="relative py-20 md:py-32 overflow-hidden">
        {/* Subtle Dot Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-xs uppercase tracking-widest text-accent-blue font-bold mb-4">
            Real Time Extension Intelligence
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Know Before Your<br />Competitors Do
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Real time alerts when any Chrome extension changes.<br className="hidden md:block" />
            Track ratings, users, and versions — updated daily, not monthly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" href="/login">Start Tracking Free</Button>
            <Button variant="secondary" size="lg" href="#how-it-works">See How It Works</Button>
          </div>
          
          <p className="text-sm text-text-muted mt-8 flex items-center justify-center gap-4">
            <span>Free forever</span>
            <span className="w-1 h-1 bg-text-muted rounded-full" />
            <span>No credit card</span>
            <span className="w-1 h-1 bg-text-muted rounded-full" />
            <span>Tracking 50,000+ extensions</span>
          </p>

          {/* Browser Mockup */}
          <div className="mt-16 md:mt-24 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-border-subtle shadow-2xl overflow-hidden text-left">
              {/* Browser Header */}
              <div className="bg-gray-50 border-b border-border-subtle px-4 py-3 flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 max-w-md bg-white border border-border-subtle rounded px-3 py-1 text-xs text-text-muted flex items-center gap-2">
                  <span className="opacity-50">extly.com/dashboard</span>
                </div>
              </div>
              
              {/* Dashboard Content Mockup */}
              <div className="p-6 md:p-10 relative">
                {/* Red Alert Notification Overlay */}
                <div className="absolute top-8 right-8 z-20 animate-bounce">
                  <div className="bg-accent-red text-white p-4 rounded-lg shadow-xl flex items-center gap-3 border border-red-600">
                    <div className="bg-white/20 p-2 rounded-md">
                      <Bell size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-90">Alert Detected</p>
                      <p className="text-sm font-semibold">uBlock Origin version updated</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold">Dashboard</h3>
                  <Badge variant="blue">Updated 2m ago</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="p-6 border border-border-subtle rounded-xl bg-bg-surface">
                    <p className="text-sm text-text-secondary font-medium mb-1">Users</p>
                    <p className="text-3xl font-mono font-bold">12,402,192</p>
                    <div className="flex items-center gap-1 text-accent-green text-sm mt-2 font-medium">
                      <TrendingUp size={14} /> +4,201 today
                    </div>
                  </div>
                  <div className="p-6 border border-border-subtle rounded-xl bg-bg-surface">
                    <p className="text-sm text-text-secondary font-medium mb-1">Rating</p>
                    <p className="text-3xl font-mono font-bold text-accent-amber">4.82</p>
                    <div className="flex items-center gap-1 text-accent-red text-sm mt-2 font-medium">
                      <TrendingDown size={14} /> -0.01 today
                    </div>
                  </div>
                  <div className="p-6 border border-border-subtle rounded-xl bg-bg-surface">
                    <p className="text-sm text-text-secondary font-medium mb-1">Version</p>
                    <p className="text-3xl font-mono font-bold">1.54.0</p>
                    <div className="flex items-center gap-1 text-accent-blue text-sm mt-2 font-medium">
                      <Bell size={14} /> Updated today
                    </div>
                  </div>
                </div>

                <div className="h-48 w-full bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-text-muted">
                    <TrendingUp size={32} strokeWidth={1} />
                    <p className="text-sm">Historical growth chart visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Section 3: Problem Statement */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest text-accent-blue font-bold mb-3">The Problem</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-16">ChromeStats updates once a month.<br />A lot can happen in 30 days.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-8 rounded-2xl bg-red-50 border border-red-100 flex flex-col gap-4">
              <AlertTriangle className="text-accent-red" size={32} />
              <h3 className="text-xl font-bold text-text-primary">Competitor updates you missed</h3>
              <p className="text-text-secondary leading-relaxed">
                Your competitor shipped 3 updates while you were checking last month's data. You're flying blind.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-red-50 border border-red-100 flex flex-col gap-4">
              <TrendingDown className="text-accent-red" size={32} />
              <h3 className="text-xl font-bold text-text-primary">Rating dropped silently</h3>
              <p className="text-text-secondary leading-relaxed">
                Your rating went from 4.8 to 4.4. You only found out when users started complaining in the reviews.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col gap-4">
              <Zap className="text-accent-amber" size={32} />
              <h3 className="text-xl font-bold text-text-primary">Growth you didn't spot</h3>
              <p className="text-text-secondary leading-relaxed">
                A new extension in your category went from 10K to 500K users this month. You missed the explosion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Features */}
      <section className="py-24 bg-bg-main overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-widest text-accent-blue font-bold mb-3">The Solution</p>
            <h2 className="font-serif text-4xl md:text-5xl">Real time intelligence for developers</h2>
          </div>

          <div className="flex flex-col gap-32">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
              <div className="flex-1 order-2 md:order-1">
                <div className="max-w-md bg-white border border-border-subtle rounded-xl shadow-lg p-6 rotate-2 transform hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-4 border-b border-border-subtle pb-4">
                    <div className="bg-accent-blue/10 p-2 rounded-lg">
                      <Mail className="text-accent-blue" size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-text-muted">From: Extly Alerts</p>
                      <p className="text-sm font-bold">New Version Detected</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-gray-100 rounded" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-5/6 bg-gray-100 rounded" />
                    <div className="pt-4">
                      <div className="h-10 w-full bg-accent-blue rounded-lg opacity-20" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-6">Get alerted the moment anything changes</h3>
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  Rating drops, version updates, user milestones — you hear about it within 24 hours, not 30 days. Never be the last to know again.
                </p>
                <div className="flex flex-col gap-3">
                  {['Daily metric snapshots', 'Custom alert thresholds', 'Instant email notifications'].map(f => (
                    <div key={f} className="flex items-center gap-3 font-medium">
                      <div className="bg-accent-green/10 p-1 rounded-full"><Check size={16} className="text-accent-green" /></div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-6">Track any extension, not just yours</h3>
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  Add your competitors to your dashboard. Watch their user count, rating, and update frequency. Spot their weaknesses before they fix them.
                </p>
                <div className="flex flex-col gap-3">
                  {['Unlimited competitors', 'Category benchmarking', 'Historical trend lines'].map(f => (
                    <div key={f} className="flex items-center gap-3 font-medium">
                      <div className="bg-accent-green/10 p-1 rounded-full"><Check size={16} className="text-accent-green" /></div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="bg-white border border-border-subtle rounded-xl shadow-xl p-4 -rotate-3 hover:rotate-0 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <SearchIcon className="text-text-muted" size={18} />
                    <div className="h-6 w-48 bg-gray-100 rounded-full" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between p-3 border border-border-subtle rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded" />
                          <div className="h-3 w-24 bg-gray-100 rounded" />
                        </div>
                        <div className="h-6 w-16 bg-blue-50 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
              <div className="flex-1 order-2 md:order-1 relative">
                <div className="h-64 w-full bg-white border border-border-subtle rounded-2xl shadow-xl p-8 flex items-end gap-2">
                   {[30, 45, 40, 60, 75, 90, 100].map((h, i) => (
                     <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-accent-blue/10 rounded-t-lg relative group">
                        <div className="absolute inset-x-0 bottom-0 bg-accent-blue rounded-t-lg transition-all duration-700" style={{ height: i === 6 ? '100%' : '20%' }} />
                     </div>
                   ))}
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-6">Spot what's growing before it explodes</h3>
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  Monitor rising extensions in your category. Find the ones gaining momentum before they dominate your space.
                </p>
                <div className="flex flex-col gap-3">
                  {['Growth rate calculation', 'Viral trend detection', 'Category leaderboard'].map(f => (
                    <div key={f} className="flex items-center gap-3 font-medium">
                      <div className="bg-accent-green/10 p-1 rounded-full"><Check size={16} className="text-accent-green" /></div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section id="how-it-works" className="py-24 bg-white border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl">Up and running in 60 seconds</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* Step 1 */}
            <div className="relative flex flex-col gap-6">
              <div className="font-mono text-7xl text-accent-blue opacity-10 absolute -top-8 -left-4 font-bold select-none">01</div>
              <div className="bg-bg-main w-12 h-12 rounded-full flex items-center justify-center font-bold text-accent-blue border border-border-subtle relative z-10">1</div>
              <h3 className="text-xl font-bold">Search any extension</h3>
              <p className="text-text-secondary leading-relaxed">
                Find any Chrome extension by name, developer, or simply paste the Chrome Web Store URL directly into the search bar.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex flex-col gap-6">
              <div className="font-mono text-7xl text-accent-blue opacity-10 absolute -top-8 -left-4 font-bold select-none">02</div>
              <div className="bg-bg-main w-12 h-12 rounded-full flex items-center justify-center font-bold text-accent-blue border border-border-subtle relative z-10">2</div>
              <h3 className="text-xl font-bold">Click Track</h3>
              <p className="text-text-secondary leading-relaxed">
                We start monitoring it automatically every single day. No setup required. No configuration. Just one click to stay informed.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="relative flex flex-col gap-6">
              <div className="font-mono text-7xl text-accent-blue opacity-10 absolute -top-8 -left-4 font-bold select-none">03</div>
              <div className="bg-bg-main w-12 h-12 rounded-full flex items-center justify-center font-bold text-accent-blue border border-border-subtle relative z-10">3</div>
              <h3 className="text-xl font-bold">Get alerted instantly</h3>
              <p className="text-text-secondary leading-relaxed">
                Receive a clean email alert the moment the rating, version, or user count changes. View the history anytime on your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Comparison Table */}
      <section className="py-24 bg-bg-main">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-16">Finally, a better alternative to ChromeStats</h2>
          
          <div className="bg-white rounded-2xl border border-border-subtle shadow-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 text-sm font-medium text-text-muted border-b border-border-subtle">Feature</th>
                  <th className="p-6 text-sm font-bold bg-accent-blue text-white border-b border-blue-600 text-center">Extly</th>
                  <th className="p-6 text-sm font-medium text-text-muted border-b border-border-subtle text-center">ChromeStats</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: 'Update frequency', a: 'Daily', b: 'Monthly' },
                  { f: 'Real time email alerts', a: true, b: false },
                  { f: 'Free to start', a: true, b: false },
                  { f: 'Competitor tracking', a: true, b: 'Limited' },
                  { f: 'Modern UI', a: true, b: false },
                  { f: 'Starting price', a: '$0/month', b: '$14.99/mo' },
                ].map((row, i) => (
                  <tr key={row.f} className={i % 2 === 0 ? 'bg-bg-main/30' : 'bg-white'}>
                    <td className="p-6 text-sm font-semibold border-b border-border-subtle">{row.f}</td>
                    <td className="p-6 text-sm font-bold text-center border-b border-border-subtle">
                      {row.a === true ? <Check className="mx-auto text-accent-green" size={20} /> : row.a}
                    </td>
                    <td className="p-6 text-sm text-text-secondary text-center border-b border-border-subtle">
                      {row.b === false ? <X className="mx-auto text-accent-red" size={20} /> : row.b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="py-28 bg-blue-50 border-y border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Stop checking manually.<br />Start knowing automatically.</h2>
          <p className="text-lg text-text-secondary mb-12">Join developers who never miss a beat.</p>
          
          <EmailCaptureForm />
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-muted font-medium">
             <div className="flex items-center gap-2"><Check size={16} className="text-accent-green" /> Free forever</div>
             <div className="flex items-center gap-2"><Check size={16} className="text-accent-green" /> No credit card</div>
             <div className="flex items-center gap-2"><Check size={16} className="text-accent-green" /> Unsubscribe anytime</div>
          </div>
        </div>
      </section>

      {/* Section 8: Footer */}
      <Footer />
    </div>
  )
}
