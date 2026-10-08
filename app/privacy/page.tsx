import React from 'react'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ShieldCheck, Database, EyeOff, Cookie, Server } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Extly — 100% Free & Zero-Tracking',
  description: 'Extly Privacy Policy. Zero tracking cookies, zero account registrations, zero databases. Pure client-side privacy by design.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-main text-text-primary">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-16 md:py-24">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 text-accent-green rounded-full text-xs font-semibold mb-4">
              <ShieldCheck size={14} />
              <span>Privacy By Design</span>
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
            <p className="text-text-secondary text-sm">Last updated: October 2026</p>
          </header>

          <div className="space-y-10 prose prose-sm max-w-none">
            {/* Intro */}
            <section className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm">
              <p className="text-text-secondary leading-relaxed">
                At <strong>Extly</strong>, privacy is not an afterthought — it is the core foundation of our architecture. 
                Extly is a <strong>100% free and open-source platform</strong>. We do not require account registration, 
                we do not store databases with user records, and we do not track or sell your personal data.
              </p>
            </section>

            {/* 1. What We Don't Collect */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <EyeOff size={20} className="text-accent-blue" />
                1. What We Do NOT Collect
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-text-secondary leading-relaxed">
                <li><strong>No Names or Emails:</strong> We do not ask for, collect, or store email addresses.</li>
                <li><strong>No Passwords or Credentials:</strong> There are no accounts, user logins, or magic links.</li>
                <li><strong>No Browsing History:</strong> We never access or inspect your personal browser history or which extensions you have installed in your browser.</li>
                <li><strong>No Payment Details:</strong> Extly is 100% free forever; we never collect credit card or billing details.</li>
                <li><strong>No Cross-Site Tracking:</strong> We do not use third-party advertising tracking pixels or retargeting scripts.</li>
              </ul>
            </section>

            {/* 2. How Bookmarks Work (localStorage) */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Database size={20} className="text-accent-blue" />
                2. Local Bookmarking (Zero-Database)
              </h2>
              <p className="text-text-secondary leading-relaxed mb-3">
                When you click <em>&ldquo;Save to My List&rdquo;</em> on any extension, that information is saved directly inside your own web browser using 
                standard HTML5 <code>localStorage</code>.
              </p>
              <p className="text-text-secondary leading-relaxed">
                This data stays on your local device and is <strong>never transmitted to any remote user database</strong>. 
                You can clear your saved extensions at any time by clearing your browser cache or clicking the remove button in your saved list.
              </p>
            </section>

            {/* 3. Cookies and Analytics */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Cookie size={20} className="text-accent-blue" />
                3. Cookies & Technical Logs
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Extly uses <strong>no tracking cookies</strong> and no persistent session cookies. 
                Standard web server hosting (such as Vercel) may log anonymous operational request metadata (such as anonymized IP address, request method, and HTTP status code) solely for server reliability, denial-of-service defense, and performance monitoring.
              </p>
            </section>

            {/* 4. Public Web Store Data */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Server size={20} className="text-accent-blue" />
                4. Chrome Web Store Data
              </h2>
              <p className="text-text-secondary leading-relaxed">
                When you analyze an extension or perform a search, Extly fetches publicly available metadata from Google&apos;s Chrome Web Store in real time. 
                All extension titles, user counts, ratings, and version numbers are public records available to any web browser.
              </p>
            </section>

            {/* 5. Open Source Transparency */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                5. Complete Open Source Transparency
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Extly is fully open source under the MIT License. Anyone can audit the complete codebase, data flow, and scraper logic on our 
                <a 
                  href="https://github.com/SayyadAdeel-a/extly" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent-blue ml-1 font-medium hover:underline"
                >
                  GitHub repository
                </a>.
              </p>
            </section>

            {/* 6. Contact */}
            <section className="pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-bold text-text-primary mb-3">6. Questions & Contact</h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions about this Privacy Policy or Extly&apos;s open source architecture, feel free to open an issue or discussion on 
                <a 
                  href="https://github.com/SayyadAdeel-a/extly/issues" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent-blue ml-1 font-medium hover:underline"
                >
                  GitHub Issues
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
