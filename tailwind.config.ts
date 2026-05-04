import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#FAFAFA',        // Main app background
        'bg-surface': '#FFFFFF',     // Cards, panels, modals
        'border-subtle': '#E8ECF0',  // All borders
        'text-primary': '#0F1117',   // Headlines, primary text
        'text-secondary': '#6B7280', // Labels, subtext
        'text-muted': '#9CA3AF',     // Hints, timestamps
        'accent-blue': '#2563EB',    // Primary buttons, links, active states
        'accent-green': '#10B981',   // Positive changes, growth, success
        'accent-red': '#EF4444',     // Drops, alerts, errors, danger
        'accent-amber': '#F59E0B',   // Warnings, neutral changes
      },
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'serif'],     // Hero headlines ONLY
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'], // All UI text
        mono: ['var(--font-geist-mono)', 'monospace'],        // ALL numbers, versions, IDs
      },
    },
  },
  plugins: [],
};
export default config;
