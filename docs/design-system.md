# Design System & Brand Tokens (`docs/design-system.md`)

## 1. Brand Direction

- **Character**: Rustic South African BBQ, smokehouse, street food, family bakery — local, warm, bold, and approachable.
- **Visual Hierarchy**: Dark charcoal/timber surfaces that let rich food photography and warm parchment typography stand out, accented by smokehouse burnt orange.

## 2. Colour Tokens (Tailwind CSS Reference)

> **Note**: These tokens are initial design choices from the build brief, not sampled official corporate specifications. Every text/background and button combination must pass WCAG AA contrast checks (`>= 4.5:1` for normal body text, `>= 3:1` for large headings and UI components).

| Role | Suggested Tailwind Token | Hex Equivalent | Usage & Contrast Notes |
|---|---|---|---|
| **Primary Background** | `stone-950` | `#0c0a09` | Main page background and deep charcoal sections |
| **Elevated Surface / Card** | `stone-900` | `#1c1917` | Menu cards, navigation bar, form panels |
| **Subtle Border / Divider** | `stone-800` | `#292524` | Card borders, section dividers, input outlines |
| **Primary Text** | `orange-50` / `orange-100` | `#fff7ed` / `#ffedd5` | High-contrast warm parchment cream text on dark surfaces |
| **Secondary / Muted Text** | `stone-300` / `stone-400` | `#d6d3d1` / `#a8a29e` | Descriptions, metadata, timestamps (verify `>= 4.5:1` on `stone-900`) |
| **Primary Accent / CTA** | `orange-700` (hover `orange-600`) | `#c2410c` (`#ea580c`) | Primary buttons and active badges with `orange-50` (`#fff7ed`) text for safe contrast |
| **Highlight / Badge Text** | `amber-400` / `orange-300` | `#fbbf24` / `#fdba74` | Price highlights or accent labels on dark `stone-900`/`stone-950` backgrounds |
| **Danger / Sold Out / Error** | `red-500` / `red-900/40` | `#ef4444` | Form errors, sold-out indicators (always pair colour with clear text labels) |

## 3. Typography

- **Headings (`font-display`)**: `Oswald` (Bold / 700), uppercase or title case with slight letter-spacing for smokehouse menu boards and section headers.
- **Body & UI (`font-sans`)**: `Inter` (Regular 400, Medium 500, SemiBold 600) for clear mobile legibility on descriptions, prices, and admin forms.
- **Fallback Stack**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.

## 4. Layout, Spacing & Media Guidelines

- **Mobile-First Viewport**: Base styles target `360px–480px` screens first, scaling cleanly to tablet (`md:`) and desktop (`lg:`).
- **Tap Targets**: All interactive buttons, category pills, and navigation links must maintain a minimum touch target of `44px x 44px`.
- **Photography & Placeholders**:
  - Never hotlink Instagram images.
  - Always set explicit `width` and `height` (or aspect-ratio containers) to prevent Cumulative Layout Shift (CLS).
  - Until approved photography is added to `public/images/`, use visibly labelled `[Sample Photo Placeholder]` cards so unconfirmed visuals are never mistaken for final product photos.
