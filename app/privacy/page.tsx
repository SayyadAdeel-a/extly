import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Privacy Policy - Extly Intelligence',
  description: 'Our privacy policy and commitment to data protection.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-16 md:py-24">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Privacy Policy</h1>
            <p className="text-text-secondary text-sm">Last updated: May 2026</p>
          </header>

          <div className="space-y-10 prose prose-sm max-w-none">
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">1. What We Collect</h2>
              <ul className="list-disc pl-5 space-y-2 text-text-secondary">
                <li>Email address (for magic link authentication and sending alerts)</li>
                <li>Which extensions you choose to track</li>
                <li>Basic usage data via Vercel Analytics (page views only, no personal tracking)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">2. What We Don&apos;t Collect</h2>
              <ul className="list-disc pl-5 space-y-2 text-text-secondary">
                <li>We never collect your Chrome browsing history</li>
                <li>We never access which extensions are installed on your browser</li>
                <li>We never sell your data to any third party</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">3. How We Use Your Data</h2>
              <p className="text-text-secondary leading-relaxed">
                We use your information to send you email alerts about extensions you track, 
                to maintain your dashboard and tracking preferences, and to improve the 
                product based on aggregate usage patterns.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">4. Data Storage</h2>
              <p className="text-text-secondary leading-relaxed">
                All data is stored securely in Supabase (PostgreSQL). Data is encrypted 
                at rest and in transit via HTTPS. Servers are located in the EU region 
                to ensure high availability and data sovereignty.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">5. Email Communications</h2>
              <p className="text-text-secondary leading-relaxed">
                We only send alerts you explicitly signed up for. Every email includes a 
                working unsubscribe link. We never send unsolicited marketing emails.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">6. Deleting Your Data</h2>
              <p className="text-text-secondary leading-relaxed">
                You can delete your account anytime from the Settings page. All your data 
                is permanently deleted within 30 days of account deletion. You may also 
                email us at privacy@extly.com to request manual deletion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">7. Contact</h2>
              <p className="text-text-secondary leading-relaxed">
                For privacy questions or concerns, please contact us at: 
                <a href="mailto:privacy@extly.com" className="text-accent-blue ml-1 hover:underline">
                  privacy@extly.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">8. Changes to This Policy</h2>
              <p className="text-text-secondary leading-relaxed">
                We will notify you by email if we make material changes to this privacy policy. 
                Continued use of the service after such changes constitutes acceptance of the new policy.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
