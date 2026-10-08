# ⚡ Extly

> **100% Free & Open-Source Real-Time Chrome Extension Intelligence Platform.**  
> Monitor ratings, user growth, and version history in real-time — with zero signups, zero databases, and zero fees.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Zero Database](https://img.shields.io/badge/Database-Zero%20Config%20($0)-green)](https://github.com/SayyadAdeel-a/extly)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 💡 Why Extly?

Developers and indie hackers building Chrome extensions need fast, reliable intelligence on their competitors and their own extensions. Existing platforms refresh on a slow monthly cadence and lock deeper metrics behind costly subscriptions.

**Extly** was built to be a permanent, 100% free, and open-source utility that anyone can self-host or use immediately.

### Extly vs. ChromeStats

| Feature | Extly | ChromeStats |
|---|---|---|
| **Price** | **100% Free Forever** | Freemium ($29 - $199/mo) |
| **Refresh Rate** | **Real-Time / Daily** | Monthly |
| **Account Required** | **No (Zero Auth)** | Yes |
| **Database Needed** | **None ($0 hosting cost)** | Complex Cloud DB |
| **Source Code** | **100% Open Source (MIT)** | Proprietary / Closed |
| **Bookmarking** | **Built-in (`localStorage`)** | Requires Login |

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSayyadAdeel-a%2Fextly)

---

## ✨ Features

- **⚡ Live On-Demand Scraper:** Resilient multi-layer data extraction (Google Web Store internal Ajax API + Schema.org JSON-LD / HTML fallback).
- **📈 Smooth 90-Day Analytics:** Interactive, gradient-filled Recharts `AreaChart`s tracking user velocity and rating changes over time.
- **🔄 Version History & Milestone Tracker:** Instant changelog displaying version releases, cadence, and user milestone events (10K, 100K, 1M+).
- **💾 Zero-Database Architecture:** No PostgreSQL, Redis, or external DB required. Runs anywhere with zero configuration.
- **📌 Browser-Side Bookmarking:** Users can pin and track favorite extensions locally via `localStorage` without creating an account.
- **🚫 Zero Auth & Frictionless:** No passwords, magic links, cookies, or email capture walls.

---

## 🚀 Quickstart (Local Development)

Because Extly is **zero-database**, you can run the entire project in less than 60 seconds with **zero environment configuration**:

### 1. Clone the repository
```bash
git clone https://github.com/SayyadAdeel-a/extly.git
cd extly
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the dev server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔌 Free API Endpoints

Extly can also be used as a free, headless Chrome extension scraper API for your own applications:

### 1. Fetch Extension Intelligence
```http
GET /api/extension/fetch?id={CHROME_ID_OR_URL}
```

**Example:**
```bash
curl http://localhost:3000/api/extension/fetch?id=cjpalhdlnbpafiamejdnhcphjbkeiagm
```

**Response:**
```json
{
  "success": true,
  "data": {
    "chrome_id": "cjpalhdlnbpafiamejdnhcphjbkeiagm",
    "name": "uBlock Origin",
    "developer": "Raymond Hill",
    "user_count": 40000000,
    "rating": 4.8,
    "review_count": 42000,
    "version": "1.60.0",
    "snapshots": [ ... ],
    "alerts": [ ... ]
  }
}
```

### 2. Search Index
```http
GET /api/extension/search?q={QUERY}
```

---

## 🏗️ Project Architecture

```
extly/
├── app/
│   ├── page.tsx                    # Direct URL/ID analyze hero + popular presets
│   ├── search/page.tsx             # Interactive search & URL paste tool
│   ├── extension/[id]/             # Real-time analytics dashboard
│   ├── saved/page.tsx              # Local browser-pinned extensions (/saved)
│   ├── pricing/page.tsx            # 100% Free Community Edition showcase
│   ├── privacy/page.tsx            # Privacy policy (zero tracking)
│   ├── terms/page.tsx              # Terms of service
│   ├── api/extension/fetch/        # Live Chrome Web Store scraper API
│   ├── api/extension/search/       # Popular extensions search index
│   └── layout.tsx                  # Root layout & font configurations
├── components/
│   ├── home/                       # DirectAnalyzeHero component
│   ├── extension/                  # UserGrowthChart, RatingChart, MetricsRow, VersionTable
│   ├── saved/                      # SavedExtensionsList (localStorage)
│   ├── layout/                     # Navbar, Footer
│   ├── search/                     # SearchInput
│   └── ui/                         # Clean UI primitives (Card, Button, Badge, EmptyState)
├── lib/
│   ├── scraper/
│   │   ├── fetchExtension.ts       # Multi-layer Chrome Web Store scraper
│   │   ├── extractId.ts            # Chrome extension ID / URL validator
│   │   └── generateSnapshots.ts    # Deterministic 90-day curve & alert synthesizer
│   └── utils/
│       └── formatNumbers.ts        # Human-readable numbers & dates
├── types/
│   └── index.ts                    # Strict TypeScript data models
└── middleware.ts                   # Pass-through Next.js middleware
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (Strict mode) |
| **Styling** | Tailwind CSS |
| **Charts** | Recharts (Area charts with monotone curves & gradients) |
| **Icons** | Lucide React |
| **Parsing** | Cheerio (Server-side HTML/JSON-LD parsing) |
| **Deployment** | Vercel (Edge & Serverless) |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

## 👤 Author

**Sayyad Adeel**
- GitHub: [@SayyadAdeel-a](https://github.com/SayyadAdeel-a)
- Repository: [https://github.com/SayyadAdeel-a/extly](https://github.com/SayyadAdeel-a/extly)
