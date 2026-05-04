import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { Check, X } from 'lucide-react'

export const metadata = {
  title: 'Pricing - Extly Intelligence',
  description: 'Simple, transparent pricing for Chrome extension monitoring and analytics.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="pt-20 pb-12 px-6 text-center">
          <p className="text-xs text-accent-blue uppercase tracking-widest font-medium mb-2">
            Pricing
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-text-primary mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Start free. Upgrade when you need more.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Free Card */}
            <div className="bg-bg-surface border border-border-subtle rounded-lg p-8 flex flex-col h-full relative">
              <div className="mb-8">
                <span className="bg-gray-100 text-text-secondary text-xs px-2 py-1 rounded-full font-medium mb-4 inline-block">
                  Free Forever
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-5xl font-mono font-bold text-text-primary">$0</span>
                  <span className="text-text-secondary">/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <FeatureItem label="Track up to 3 extensions" included />
                <FeatureItem label="7 days of history" included />
                <FeatureItem label="Daily email alerts" included />
                <FeatureItem label="Basic metrics and charts" included />
                <FeatureItem label="Competitor comparison" included={false} />
                <FeatureItem label="CSV export" included={false} />
                <FeatureItem label="Slack alerts" included={false} />
              </div>

              <div className="mt-auto">
                <Link 
                  href="/login"
                  className="block w-full bg-accent-blue text-white text-center px-4 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Start Free →
                </Link>
                <p className="text-xs text-text-muted text-center mt-3">
                  No credit card required
                </p>
              </div>
            </div>

            {/* Pro Card */}
            <div className="bg-bg-surface border-2 border-accent-blue shadow-lg rounded-lg p-8 flex flex-col h-full relative transform md:-translate-y-2">
              <div className="mb-8">
                <span className="bg-blue-50 text-accent-blue text-xs px-2 py-1 rounded-full font-medium mb-4 inline-block">
                  Most Popular
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-5xl font-mono font-bold text-accent-blue">$14</span>
                  <span className="text-text-secondary">/month</span>
                </div>
                <p className="text-xs text-text-muted mt-1">
                  or $140/year (save 2 months)
                </p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <FeatureItem label="Track up to 25 extensions" included />
                <FeatureItem label="6 months of history" included />
                <FeatureItem label="Daily email alerts" included />
                <FeatureItem label="All metrics and charts" included />
                <FeatureItem label="Competitor comparison" included labelSuffix="(coming soon)" />
                <FeatureItem label="CSV export" included labelSuffix="(coming soon)" />
                <FeatureItem label="Slack alerts" included labelSuffix="(coming soon)" />
              </div>

              <div className="mt-auto">
                <button 
                  disabled
                  className="w-full bg-gray-100 text-text-muted cursor-not-allowed px-4 py-3 rounded-md text-sm font-medium"
                >
                  Start Pro — Coming Soon
                </button>
                <p className="text-xs text-text-muted text-center mt-3">
                  7-day free trial
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-2xl mx-auto mt-24 mb-24 px-6">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Common questions
          </h2>
          <div className="space-y-8">
            <FAQItem 
              q="Can I cancel anytime?" 
              a="Yes. Cancel anytime, no questions asked. No long-term commitments." 
            />
            <FAQItem 
              q="What happens when I hit the free plan limit?" 
              a="We'll prompt you to upgrade. You won't lose any existing data or tracking." 
            />
            <FAQItem 
              q="Do you offer refunds?" 
              a="Yes, within 7 days of purchase on the Pro plan, no questions asked." 
            />
            <FAQItem 
              q="What counts as one tracked extension?" 
              a="Each unique Chrome extension you add to your dashboard counts as one." 
            />
            <FAQItem 
              q="How often do you check extensions for changes?" 
              a="Once per day at 9 AM UTC. You'll receive an email within minutes of detection." 
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureItem({ label, included, labelSuffix }: { label: string, included: boolean, labelSuffix?: string }) {
  return (
    <div className={`flex items-start gap-3 text-sm ${included ? 'text-text-primary' : 'text-text-muted line-through'}`}>
      {included ? (
        <Check className="w-4 h-4 text-accent-green mt-0.5 flex-shrink-0" />
      ) : (
        <X className="w-4 h-4 text-text-muted mt-0.5 flex-shrink-0" />
      )}
      <span>
        {label} {labelSuffix && <span className="text-xs text-text-muted ml-1 italic">{labelSuffix}</span>}
      </span>
    </div>
  )
}

function FAQItem({ q, a }: { q: string, a: string }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-text-primary mb-2">{q}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{a}</p>
    </div>
  )
}
