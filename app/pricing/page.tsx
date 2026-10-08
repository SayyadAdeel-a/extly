import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Pricing | Extly — 100% Free Forever',
  description: 'Extly is 100% free with unlimited Chrome extension lookups and 90 days of analytics history. No credit card, no sign up required.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="pt-20 pb-12 px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-semibold text-accent-green mb-4">
            <Sparkles size={14} />
            <span>Open & Free For Everyone</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-text-primary mb-4">
            100% Free Forever
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            No subscriptions. No artificial limits. No account creation needed.
          </p>
        </section>

        {/* Pricing Card */}
        <section className="px-6 py-8 pb-20">
          <div className="max-w-xl mx-auto bg-bg-surface border-2 border-accent-blue/40 rounded-2xl p-8 md:p-10 shadow-lg relative">
            <div className="text-center mb-8">
              <span className="bg-blue-50 text-accent-blue text-xs px-3 py-1 rounded-full font-semibold mb-4 inline-block border border-blue-100">
                Community Edition
              </span>
              <div className="flex items-baseline justify-center gap-1 mt-2">
                <span className="text-6xl font-mono font-bold text-text-primary">$0</span>
                <span className="text-text-secondary text-xl">/forever</span>
              </div>
              <p className="text-text-secondary text-sm mt-2">
                All features unlocked for every developer and indie hacker.
              </p>
            </div>

            <div className="space-y-4 mb-10">
              <FeatureItem label="Unlimited Chrome extension lookups" />
              <FeatureItem label="Real-time live stats from Chrome Web Store" />
              <FeatureItem label="90-day interactive user growth charts" />
              <FeatureItem label="Rating & review trend monitoring" />
              <FeatureItem label="Full version changelogs & historical milestones" />
              <FeatureItem label="Save & bookmark extensions locally in your browser" />
              <FeatureItem label="Zero ads, zero data tracking, zero sign-up friction" />
            </div>

            <Link 
              href="/"
              className="block w-full bg-accent-blue text-white text-center px-6 py-4 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              Analyze An Extension Now &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 text-accent-green" />
      </div>
      <span className="text-sm text-text-primary font-medium">{label}</span>
    </div>
  )
}
