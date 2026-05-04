import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Using Inter and JetBrains_Mono as fallbacks for Geist and Geist_Mono 
// which are not available in next/font/google for this Next.js version (14.2.x).
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

export const metadata: Metadata = {
  title: "Extly — Chrome Extension Intelligence",
  description: "Real-time alerts for Chrome extension developers. Track ratings, users, and versions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased bg-bg-main text-text-primary min-h-full`}
      >
        {children}
      </body>
    </html>
  );
}
