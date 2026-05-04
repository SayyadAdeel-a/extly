# Design Tokens & UI System — Extly

## 1. Colors
Clean, high-contrast palette optimized for data density.

| Token | Hex | Usage |
| :--- | :--- | :--- |
| `bg-main` | `#FAFAFA` | Main app background |
| `bg-surface` | `#FFFFFF` | Cards, modals, sidebars |
| `border-subtle` | `#E8ECF0` | Default borders |
| `text-primary` | `#0F1117` | Headlines, primary text |
| `text-secondary` | `#6B7280` | Subtext, labels |
| `accent-blue` | `#2563EB` | Primary buttons, links |
| `accent-green` | `#10B981` | Growth, positive changes |
| `accent-red` | `#EF4444` | Drops, alerts, danger |
| `accent-amber` | `#F59E0B` | Warnings, neutral changes |

## 2. Typography
- **Headlines:** `Instrument Serif` (Elegant, professional).
- **Dashboard/UI:** `Geist` (Modern, highly readable).
- **Data/Numbers:** `Geist Mono` (Precision, tabular alignment).

## 3. Component Specs

### Cards
- **Background:** `#FFFFFF`
- **Border:** `1px solid #E8ECF0`
- **Radius:** `8px`
- **Shadow:** `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`

### Buttons
- **Primary:** Background `accent-blue`, Text `White`, Radius `6px`.
- **Secondary:** Background `White`, Border `border-subtle`, Text `text-primary`.

### Metric Tiles
- **Large Number:** `text-primary`, `font-mono`, `text-2xl`.
- **Label:** `text-secondary`, `text-xs`, `uppercase`.
- **Trend Indicator:** Small badge with icon (up/down) and color (green/red).

### Charts (Recharts)
- **Line Color:** `accent-blue` (default).
- **Grid:** Very subtle horizontal lines only.
- **Tooltip:** Minimalist white card with `text-secondary` labels.