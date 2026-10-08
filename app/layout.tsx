import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://extly.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Extly — 100% Free Chrome Extension Intelligence & Analytics",
    template: "%s | Extly",
  },
  description:
    "Real-time analytics and monitoring for Chrome Web Store extensions. Track active users, ratings, versions, and trends with zero signup and zero database.",
  keywords: [
    "Chrome Extension Analytics",
    "Chrome Web Store Stats",
    "Extension User Tracking",
    "Chrome Extension Intelligence",
    "Extension Review Sentiment",
    "Open Source Chrome Analytics",
  ],
  authors: [{ name: "Extly Contributors" }],
  creator: "Extly",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Extly",
    title: "Extly — 100% Free Chrome Extension Analytics",
    description:
      "Instant real-time analytics for any Chrome extension. No account required, 100% free forever.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Extly — 100% Free Chrome Extension Analytics",
    description:
      "Instant real-time analytics for any Chrome extension. No account required, 100% free forever.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "b2eWOuLfwIqcz9QLrnpVqE5dsITdrH0S6HTgO0I30t8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Extly",
    url: siteUrl,
    description:
      "100% Free Chrome Web Store intelligence and analytics platform.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <meta
          name="google-site-verification"
          content="b2eWOuLfwIqcz9QLrnpVqE5dsITdrH0S6HTgO0I30t8"
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased bg-bg-main text-text-primary min-h-full`}
      >
        {children}
      </body>
    </html>
  );
}
