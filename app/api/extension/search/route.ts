import { NextRequest, NextResponse } from 'next/server'
import { extractChromeId } from '@/lib/scraper/extractId'

// Curated index of popular Chrome extensions for zero-DB instant search
const POPULAR_EXTENSIONS = [
  {
    id: 'cjpalhdlnbpafiamejdnhcphjbkeiagm',
    chromeId: 'cjpalhdlnbpafiamejdnhcphjbkeiagm',
    name: 'uBlock Origin',
    developer: 'Raymond Hill',
    category: 'Productivity',
    iconUrl: 'https://lh3.googleusercontent.com/4q-vWlPj82tqI3_L4jTqPz1n7rA0v6vQ8Xp_Y2s-k3P5m8N=s128',
    chromeUrl: 'https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm',
    latestSnapshot: { userCount: 40000000, rating: 4.8, reviewCount: 42000, version: '1.60.0' }
  },
  {
    id: 'kbfnbcaeplbcioakkpcpgfkobkghlhen',
    chromeId: 'kbfnbcaeplbcioakkpcpgfkobkghlhen',
    name: 'Grammarly: AI Writing and Grammar Checker App',
    developer: 'Grammarly Inc.',
    category: 'Productivity',
    iconUrl: 'https://lh3.googleusercontent.com/2s_m-8-77a8S9r3t-aQ5_1k-7i9w8e-8_2s-k3P5m8N=s128',
    chromeUrl: 'https://chromewebstore.google.com/detail/grammarly/kbfnbcaeplbcioakkpcpgfkobkghlhen',
    latestSnapshot: { userCount: 45000000, rating: 4.5, reviewCount: 450000, version: '14.1200.0' }
  },
  {
    id: 'eimadpbcbfnmbkopoojfekhnkhdbieeh',
    chromeId: 'eimadpbcbfnmbkopoojfekhnkhdbieeh',
    name: 'Dark Reader',
    developer: 'Alexander Shutau',
    category: 'Productivity',
    iconUrl: 'https://lh3.googleusercontent.com/d_r8q9s0=s128',
    chromeUrl: 'https://chromewebstore.google.com/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh',
    latestSnapshot: { userCount: 6000000, rating: 4.7, reviewCount: 52000, version: '4.9.96' }
  },
  {
    id: 'bmnlcjabgnpnenekpadlanbbkooimhnj',
    chromeId: 'bmnlcjabgnpnenekpadlanbbkooimhnj',
    name: 'PayPal Honey: Automatic Coupons, Cash Back & Rewards',
    developer: 'Honey Science',
    category: 'Shopping',
    iconUrl: 'https://lh3.googleusercontent.com/honey=s128',
    chromeUrl: 'https://chromewebstore.google.com/detail/honey/bmnlcjabgnpnenekpadlanbbkooimhnj',
    latestSnapshot: { userCount: 17000000, rating: 4.8, reviewCount: 170000, version: '15.6.3' }
  },
  {
    id: 'fmkadmapgofadopljbjfkapdkoienihi',
    chromeId: 'fmkadmapgofadopljbjfkapdkoienihi',
    name: 'React Developer Tools',
    developer: 'facebook.com',
    category: 'Developer Tools',
    iconUrl: 'https://lh3.googleusercontent.com/react=s128',
    chromeUrl: 'https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi',
    latestSnapshot: { userCount: 4000000, rating: 4.2, reviewCount: 1600, version: '5.3.1' }
  },
  {
    id: 'liecbddmkiiihnedobmlmillhodjkdmb',
    chromeId: 'liecbddmkiiihnedobmlmillhodjkdmb',
    name: 'Loom – Screen Recorder & Screen Capture',
    developer: 'loom.com',
    category: 'Productivity',
    iconUrl: 'https://lh3.googleusercontent.com/loom=s128',
    chromeUrl: 'https://chromewebstore.google.com/detail/loom/liecbddmkiiihnedobmlmillhodjkdmb',
    latestSnapshot: { userCount: 8000000, rating: 4.7, reviewCount: 12000, version: '5.5.94' }
  },
  {
    id: 'nngceckbapebfimnlniiiahkandclblb',
    chromeId: 'nngceckbapebfimnlniiiahkandclblb',
    name: 'Bitwarden Password Manager',
    developer: 'Bitwarden Inc.',
    category: 'Productivity',
    iconUrl: 'https://lh3.googleusercontent.com/bitwarden=s128',
    chromeUrl: 'https://chromewebstore.google.com/detail/bitwarden/nngceckbapebfimnlniiiahkandclblb',
    latestSnapshot: { userCount: 5000000, rating: 4.8, reviewCount: 65000, version: '2024.4.1' }
  },
  {
    id: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
    chromeId: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
    name: 'MetaMask',
    developer: 'ConsenSys Software Inc.',
    category: 'Productivity',
    iconUrl: 'https://lh3.googleusercontent.com/metamask=s128',
    chromeUrl: 'https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
    latestSnapshot: { userCount: 15000000, rating: 4.4, reviewCount: 4800, version: '11.16.14' }
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 })
  }

  // 1. If it looks like a Chrome ID or URL, return immediate direct match
  const chromeId = extractChromeId(query)
  if (chromeId) {
    return NextResponse.json({
      success: true,
      data: { chrome_id: chromeId }
    })
  }

  // 2. Search against popular extensions index (case-insensitive)
  const qLower = query.toLowerCase()
  const matched = POPULAR_EXTENSIONS.filter(ext => 
    ext.name.toLowerCase().includes(qLower) || 
    ext.developer.toLowerCase().includes(qLower) ||
    ext.category.toLowerCase().includes(qLower)
  )

  return NextResponse.json({
    results: matched,
    total: matched.length
  })
}
