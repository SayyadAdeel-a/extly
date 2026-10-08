'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, Menu, X, Search, Bookmark, ExternalLink } from 'lucide-react'
import { Button } from '../ui/Button'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-bg-surface border-b border-border-subtle sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2 font-serif text-2xl text-accent-blue hover:opacity-90 transition-opacity"
            >
              <Zap size={24} fill="currentColor" />
              <span>Extly</span>
            </Link>
            <span className="hidden sm:inline-block bg-blue-50 text-accent-blue text-[11px] font-semibold px-2 py-0.5 rounded-full border border-blue-100">
              100% Free
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/search" 
              className={`text-sm font-medium transition-colors ${pathname === '/search' ? 'text-accent-blue' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Search
            </Link>
            <Link 
              href="/saved" 
              className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${pathname === '/saved' ? 'text-accent-blue' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Bookmark size={15} />
              Saved
            </Link>
            <div className="flex items-center gap-3 ml-2">
              <Button size="sm" href="/search">
                <Search size={15} className="mr-1.5" />
                Analyze Any Extension
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-secondary hover:text-text-primary p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border-subtle bg-bg-surface px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-text-primary"
          >
            Home
          </Link>
          <Link
            href="/search"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-text-secondary"
          >
            Search Extensions
          </Link>
          <Link
            href="/saved"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-text-secondary"
          >
            Saved Extensions
          </Link>
          <div className="pt-2">
            <Button href="/search" className="w-full">
              Analyze Any Extension
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
