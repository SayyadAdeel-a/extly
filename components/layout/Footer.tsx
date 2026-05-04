import React from 'react'
import Link from 'next/link'
import { Zap, X as XIcon, Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-border-subtle py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-serif text-2xl text-accent-blue mb-4">
              <Zap size={24} fill="currentColor" />
              <span>Extly</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Daily intelligence for Chrome extension developers. Monitor growth, track ratings, and stay ahead of the competition.
            </p>
          </div>

          {/* Product Col */}
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/search" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Search</Link></li>
              <li><Link href="/pricing" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">About</Link></li>
              <li><Link href="#" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Contact</Link></li>
              <li><Link href="https://twitter.com" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Twitter</Link></li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            © 2026 Extly. Built by Sayyad.
          </p>
          <div className="flex items-center gap-6">
            <Link href="https://twitter.com" className="text-text-muted hover:text-accent-blue transition-colors">
              <XIcon size={18} />
            </Link>
            <Link href="https://github.com" className="text-text-muted hover:text-accent-blue transition-colors">
              <Globe size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
