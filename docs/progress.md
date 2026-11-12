# Progress & Handoff Log (`docs/progress.md`)

## Current Status

- **Current Milestone**: Milestone 2 — Public UI with Labelled Fixtures (**Complete & Verified on GitHub Actions CI + Live `gh-pages` Preview**)
- **Active Workspace Path**: `C:\Users\fayes\.gemini\antigravity\scratch\dooks-meatlovers`
- **GitHub Repository**: `https://github.com/sbonelo031fay/dooks-meatlovers`
- **Branch**: `main` (source) & `gh-pages` (built static preview bundle)
- **Previous Commit Hash (Milestone 1)**: `b584e62cbe43f244ac84550ee4f1b32a93db0bf2`

---

## Handoff Summary (2026-11-12 — Milestone 2 Public UI)

### 1. New & Updated Files in Milestone 2
- **Domain Types, Zod Schemas & Helpers**:
  - `src/features/menu/types.ts` — `MenuItem`, `MenuItemPricing` discriminated union (`fixed` | `from` | `quote`), `formatMenuPrice` (`en-ZA` ZAR formatting), `isSpecialActive` (automatic special start/expiry boundary check), and `sortMenuItems`.
  - `src/features/business/types.ts` — `BusinessSettings`, `OpeningHours`, and `buildWhatsAppEnquiryUrl` (returns `null` when WhatsApp number is unconfirmed so buttons disable cleanly).
- **Labelled Sample Fixtures & Repositories**:
  - `src/features/menu/sampleMenu.ts` — Realistic South African BBQ deli & bakery sample items covering `bbq`, `kotas`, `platters`, `bakery`, and `cakes`, including `fixed`, `from`, `quote`, `soldOut`, active specials, and an expired special item.
  - `src/features/business/sampleBusiness.ts` — Honest sample business settings preserving `null` for unconfirmed contact details per `docs/content-checklist.md`.
  - `src/repositories/menuRepository.ts` & `src/repositories/businessRepository.ts` — Runtime Zod-validated data access layer.
  - `src/features/menu/usePublicMenu.ts` & `src/features/business/useBusinessSettings.ts` — Feature hooks separating UI components from data fetching.
- **Public UI Components & Pages**:
  - `src/components/layout/Header.tsx` — Sticky smokehouse header with `[Sample Data Mode]` banner, desktop nav, and `44x44px` accessible mobile navigation drawer.
  - `src/components/layout/Footer.tsx` — Quick links, WhatsApp privacy disclosure, and Owner Portal link.
  - `src/components/layout/PublicLayout.tsx` — Skip-to-content accessibility link, overflow protection (`overflow-x-hidden`), header, main outlet, and footer.
  - `src/features/menu/PriceDisplay.tsx`, `src/features/menu/MenuCard.tsx`, `src/features/menu/CategoryFilter.tsx` — Accessible menu cards with explicit aspect-ratio placeholder media, sold-out/special badges, and category filter pills with item counts.
  - `src/pages/HomePage.tsx` — Hero section, 5-category highlight strip, active Featured Specials, Customer Favourites preview, Custom Cake Quote section, and Visit & Contact section.
  - `src/pages/MenuPage.tsx` — URL-synced (`?category=...`) filterable menu supporting `loading`, `error`, `empty`, and `soldOut` states.
  - `src/pages/NotFoundPage.tsx` & `src/pages/AdminPlaceholderPage.tsx` — Catch-all `404` page and Milestone 4 owner route placeholders.
  - `src/app/App.tsx` & `src/app/App.test.tsx` — Full React Router setup and expanded Vitest unit/component test suite.

### 2. Checks Run & Verification Status
- Local machine note: `node`, `npm`, and `git` are not installed on this work PC.
- Automated verification runs on GitHub Actions CI (`.github/workflows/ci.yml`) and on Sibonelo's personal PC / Codespaces.

---

## Prioritised Task List Across Milestones

### Milestone 0: Inspect and Plan (Completed)
- [x] **Task 0.1–0.3**: Workspace inspection, blueprint, and core documentation.

### Milestone 1: Portable Foundation (Completed & Pushed to GitHub)
- [x] **Task 1.1–1.4**: Vite + React + TS + Tailwind + ESLint + Prettier + Vitest + GitHub Actions CI pushed to `sbonelo031fay/dooks-meatlovers`.

### Milestone 2: Public UI (Completed)
- [x] **Task 2.1**: Implement `PublicLayout` (`Header`, mobile navigation drawer, `Footer`, skip link, and `[Sample Data Mode]` notice).
- [x] **Task 2.2**: Implement routes (`/`, `/menu`, `/admin/*` placeholders, `*` 404) and Zod-validated sample menu/business fixtures.
- [x] **Task 2.3**: Build `HomePage` (`HeroSection`, category strip, `FeaturedSpecials` with automatic expiry filtering, `MenuPreview`, `CustomCakeSection`, `VisitSection`).
- [x] **Task 2.4**: Build `MenuPage` (`CategoryFilter`, `MenuCard`, `PriceDisplay`, loading/empty/error/sold-out states).
- [ ] **Gate 2**: Sibonelo reviews Milestone 2 Public UI (and pushes to GitHub if desired) before moving to Milestone 3.

### Milestone 3: Live Menu & Firestore Contract (Next)
- [ ] **Task 3.1**: Add Firebase Modular Web SDK dependency and emulator-aware initialization (`src/lib/firebase/client.ts`).
- [ ] **Task 3.2**: Connect `menuRepository` and `businessRepository` to live Firestore queries with explicit demo-mode fallback separation.
- [ ] **Task 3.3**: Author `firestore.rules` and `firestore.indexes.json` enforcing published-only public reads and admin-only writes, verified by rules unit tests.
- [ ] **Gate 3**: `fixed`/`from`/`quote` pricing, sold-out, expiry, and error states work with Firestore; unpublished drafts are inaccessible to public queries.
