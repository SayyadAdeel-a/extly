import React from 'react'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FileText, CheckCircle2, AlertCircle, Scale, Code2, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | Extly — 100% Free & Open Source',
  description: 'Extly Terms of Service. 100% free, unlimited, open source under the MIT License. Fair use guidelines and public data disclaimers.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-main text-text-primary">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-16 md:py-24">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-accent-blue rounded-full text-xs font-semibold mb-4">
              <FileText size={14} />
              <span>Terms &amp; Fair Use</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
            <p className="text-text-secondary text-sm">Last updated: October 2026</p>
          </header>

          <div className="space-y-10 prose prose-sm max-w-none">
            {/* Summary card */}
            <section className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm">
              <p className="text-text-secondary leading-relaxed">
                Welcome to <strong>Extly</strong>. By accessing or using our website, you agree to comply with and be bound by these 
                Terms of Service. Extly is a <strong>100% free, unlimited, and open-source platform</strong> governed by the permissive 
                MIT License.
              </p>
            </section>

            {/* 1. Acceptance */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-accent-green" />
                1. Acceptance of Terms
              </h2>
              <p className="text-text-secondary leading-relaxed">
                By visiting, using, or self-hosting Extly, you agree to these Terms. If you do not agree with any part of these terms, 
                you may choose not to use the service. Because Extly is open source, you are also free to fork, customize, and inspect 
                the entire code on GitHub.
              </p>
            </section>

            {/* 2. What Extly Does */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Globe size={20} className="text-accent-blue" />
                2. Scope of Service
              </h2>
              <p className="text-text-secondary leading-relaxed mb-3">
                Extly provides real-time search, competitive analytics, rating insights, and growth projections for extensions published on the 
                Google Chrome Web Store.
              </p>
              <p className="text-text-secondary leading-relaxed">
                All data presented is publicly viewable on the Chrome Web Store and is parsed and structured in real time for educational, research, 
                and market intelligence purposes. Extly is an independent project and is not affiliated with, sponsored by, or endorsed by Google LLC.
              </p>
            </section>

            {/* 3. Free & Unlimited */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Scale size={20} className="text-accent-blue" />
                3. 100% Free &amp; Unlimited Access
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-text-secondary leading-relaxed">
                <li><strong>No Subscriptions or Paywalls:</strong> Extly is free for all users. There are no paid tiers, trials, or hidden fees.</li>
                <li><strong>No Artificial Extension Limits:</strong> You may search and analyze as many extensions as you need.</li>
                <li><strong>No Accounts Required:</strong> You never need to sign in, create a password, or share an email address.</li>
              </ul>
            </section>

            {/* 4. Acceptable Use */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-amber-500" />
                4. Acceptable Use &amp; Fair Use
              </h2>
              <p className="text-text-secondary leading-relaxed mb-3">
                To keep this free community service available to everyone, you agree to respect our hosted infrastructure:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-text-secondary leading-relaxed">
                <li>Do not execute automated denial-of-service (DoS) attacks or bombard the hosted endpoints with abusive bot requests.</li>
                <li>If you need high-volume automated batch scraping, please clone and self-host Extly on your own server.</li>
                <li>Do not use the service for any unlawful activities or in violation of applicable laws.</li>
              </ul>
            </section>

            {/* 5. Open Source MIT License */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Code2 size={20} className="text-accent-blue" />
                5. Open Source License (MIT)
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Extly&apos;s source code is licensed under the <strong>MIT License</strong>. You are permitted to view, modify, distribute, 
                and deploy copies of the software according to the terms of the license, provided that copyright and permission notices are included.
              </p>
            </section>

            {/* 6. Disclaimer of Warranties */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                6. Disclaimer of Warranties &amp; Data Accuracy
              </h2>
              <p className="text-text-secondary leading-relaxed mb-3">
                Extly is provided on an <strong>&ldquo;AS IS&rdquo;</strong> and <strong>&ldquo;AS AVAILABLE&rdquo;</strong> basis without warranties of any kind, either express or implied.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-text-secondary leading-relaxed">
                <li>Because Chrome Web Store listings and Google HTML structures can change at any time, we cannot guarantee 100% continuous uptime or data accuracy.</li>
                <li>Extly&apos;s analytics and projections are informational estimates and should not be considered binding commercial or investment advice.</li>
              </ul>
            </section>

            {/* 7. Limitation of Liability */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-text-secondary leading-relaxed">
                In no event shall the authors, maintainers, or contributors of Extly be liable for any direct, indirect, incidental, special, exemplary, 
                or consequential damages arising out of the use or inability to use this software.
              </p>
            </section>

            {/* 8. Questions */}
            <section className="pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-bold text-text-primary mb-3">8. Inquiries &amp; Contributions</h2>
              <p className="text-text-secondary leading-relaxed">
                Have questions or suggestions regarding these terms? Feel free to reach out or contribute directly via our 
                <a 
                  href="https://github.com/SayyadAdeel-a/extly" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent-blue ml-1 font-medium hover:underline"
                >
                  GitHub Repository
                </a>.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
