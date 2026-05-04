import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Terms of Service - Extly Intelligence',
  description: 'Our terms of service and usage conditions.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-16 md:py-24">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Terms of Service</h1>
            <p className="text-text-secondary text-sm">Last updated: May 2026</p>
          </header>

          <div className="space-y-10 prose prose-sm max-w-none">
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
              <p className="text-text-secondary leading-relaxed">
                By using Extly, you agree to these terms. If you do not agree, do not use the service. 
                Your continued use of the platform signifies your acceptance of these conditions and 
                any future modifications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">2. What Extly Does</h2>
              <p className="text-text-secondary leading-relaxed">
                Extly provides analytics and monitoring for publicly available Chrome Web Store 
                extension data. All data displayed is publicly visible on the Chrome Web Store 
                and is aggregated for your convenience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">3. Free Plan</h2>
              <ul className="list-disc pl-5 space-y-2 text-text-secondary">
                <li>Maximum 3 tracked extensions on the free plan</li>
                <li>7 days of historical data</li>
                <li>We may change free plan limits with 30 days advance notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">4. Acceptable Use</h2>
              <p className="text-text-secondary leading-relaxed mb-4">You may not:</p>
              <ul className="list-disc pl-5 space-y-2 text-text-secondary">
                <li>Use Extly data for resale or redistribution without explicit permission</li>
                <li>Create multiple accounts to circumvent free plan limits</li>
                <li>Attempt to reverse engineer or overload our scraping infrastructure</li>
                <li>Use the service for any unlawful purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">5. Data Accuracy</h2>
              <ul className="list-disc pl-5 space-y-2 text-text-secondary">
                <li>Extension data is fetched from Chrome Web Store daily</li>
                <li>We cannot guarantee 100% accuracy or uninterrupted service</li>
                <li>Data is provided &quot;as is&quot; for informational purposes only</li>
                <li>Do not make critical business decisions based solely on our data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">6. Payments (Pro Plan)</h2>
              <ul className="list-disc pl-5 space-y-2 text-text-secondary">
                <li>Billed monthly or annually via Stripe (not yet available)</li>
                <li>Cancel anytime; no partial refunds except within 7-day trial window</li>
                <li>We may change prices with 30 days advance notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">7. Termination</h2>
              <p className="text-text-secondary leading-relaxed">
                We may suspend or terminate accounts that violate these terms or engage in 
                abusive behavior. You may also delete your account at any time from the 
                Settings page, which will result in the immediate cessation of tracking.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">8. Limitation of Liability</h2>
              <p className="text-text-secondary leading-relaxed">
                Extly is not liable for any business decisions, losses, or damages resulting 
                from the use of our platform or the data presented within it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">9. Contact</h2>
              <p className="text-text-secondary leading-relaxed">
                For questions about these terms, please contact us at: 
                <a href="mailto:hello@extly.com" className="text-accent-blue ml-1 hover:underline">
                  hello@extly.com
                </a>
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
