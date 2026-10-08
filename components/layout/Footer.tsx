import React from 'react'
import Link from 'next/link'
import { Zap, Globe } from 'lucide-react'

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
              100% free real-time intelligence for Chrome extensions. No signup, no limits, no paywalls.
            </p>
          </div>

          {/* Product Col */}
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Home</Link></li>
              <li><Link href="/search" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Search & Analyze</Link></li>
              <li><Link href="/saved" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Saved Extensions</Link></li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">Quick Analysis</h4>
            <ul className="space-y-3">
              <li><Link href="/extension/cjpalhdlnbpafiamejdnhcphjbkeiagm" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">uBlock Origin Stats</Link></li>
              <li><Link href="/extension/kbfnbcaeplbcioakkpcpgfkobkghlhen" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Grammarly Stats</Link></li>
              <li><Link href="/extension/liecbddmkiiihnedobmlmillhodjkdmb" className="text-sm text-text-secondary hover:text-accent-blue transition-colors">Loom Stats</Link></li>
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
            © 2026 Extly. 100% Free & Open Utility.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-text-muted">Zero tracking • Zero cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
