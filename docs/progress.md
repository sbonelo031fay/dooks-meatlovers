# Progress & Handoff Log (`docs/progress.md`)

## Current Status

- **Current Milestone**: Milestone 1 — Portable Foundation (**Source Files Created — Ready for GitHub Upload & Verification**)
- **Active Workspace Path**: `C:\Users\fayes\.gemini\antigravity\scratch\dooks-meatlovers`
- **Branch**: To be uploaded to `main` on private GitHub repository `dooks-meatlovers`
- **Latest Commit Hash**: Pending initial upload to GitHub (Work PC does not have `git`, `node`, or `npm` installed in `PATH`)

---

## Handoff Summary (2026-11-09)

### 1. Files Created in Milestone 0 & Milestone 1
- **Documentation (`docs/` & Root)**:
  - `AGENTS.md`, `README.md`, `docs/blueprint.md`, `docs/requirements.md`, `docs/design-system.md`, `docs/architecture.md`, `docs/decisions.md`, `docs/content-checklist.md`, `docs/handover.md`, `docs/progress.md`, `public/images/README.md`
- **Portable Project Foundation (Milestone 1)**:
  - `.nvmrc` (Node `22.14.0` LTS)
  - `.gitignore` (excludes `node_modules/`, `dist/`, `.env.local`, Firebase debug/emulator artifacts, and credentials)
  - `.env.example` (all required `VITE_FIREBASE_*`, `VITE_USE_EMULATORS`, and `VITE_DEMO_MODE` keys)
  - `package.json` (Vite, React 18, TypeScript, Tailwind CSS 3, React Router v6, Zod, Vitest, React Testing Library, ESLint 9, Prettier)
  - `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
  - `vite.config.ts`, `postcss.config.js`, `tailwind.config.js`, `eslint.config.js`, `.prettierrc.json`
  - `index.html` (with `Oswald` and `Inter` Google Fonts and dark smokehouse base classes)
  - `src/main.tsx`, `src/app/App.tsx`, `src/app/App.test.tsx`, `src/lib/firebase/env.ts`, `src/styles/index.css`, `src/test/setup.ts`, `src/vite-env.d.ts`
  - `.github/workflows/ci.yml` (GitHub Actions workflow running `npm ci` / `npm install`, `lint`, `typecheck`, `test`, and `build`)

### 2. Checks Actually Run & Environment Limitation
- **Command run**: `node -v; npm -v; git --version; gh --version`
- **Result**: None of `node`, `npm`, `git`, or `gh` are installed on this work PC.
- **Verification Status**: Per the working agreement (*"Never claim tests passed if they were not run"*), `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` **have not yet been executed locally on this work PC** because Node/npm are absent. They will run automatically via `.github/workflows/ci.yml` as soon as the folder is uploaded to GitHub, and locally once cloned onto Sibonelo's personal PC (or opened in GitHub Codespaces).

---

## Prioritised Task List Across Milestones

### Milestone 0: Inspect and Plan (Completed)
- [x] **Task 0.1**: Inspect workspace and report existing directory state.
- [x] **Task 0.2**: Save authoritative build brief as `docs/blueprint.md`.
- [x] **Task 0.3**: Create `AGENTS.md`, `README.md`, `docs/requirements.md`, `docs/design-system.md`, `docs/architecture.md`, `docs/decisions.md`, `docs/content-checklist.md`, `docs/handover.md`, and `docs/progress.md`.
- [x] **Gate 0**: Sibonelo reviewed options and requested Milestone 1 foundation files for browser upload to GitHub.

### Milestone 1: Portable Foundation (In Progress — Ready for GitHub Upload)
- [x] **Task 1.1**: Create `.nvmrc`, `.gitignore`, and Vite + React + TypeScript project configuration (`package.json`, `tsconfig*.json`, `vite.config.ts`).
- [x] **Task 1.2**: Configure Tailwind CSS with brand tokens (`stone-950`, `orange-100`, `orange-700`, `Oswald`, `Inter`), ESLint, Prettier, and check scripts.
- [x] **Task 1.3**: Add `.env.example` and Zod startup environment validation (`src/lib/firebase/env.ts`).
- [x] **Task 1.4**: Add initial Vitest test (`src/app/App.test.tsx`) and GitHub Actions CI workflow (`.github/workflows/ci.yml`).
- [ ] **Gate 1 (Next Step on GitHub / Personal PC)**: Upload folder to private `dooks-meatlovers` GitHub repo, run `npm install` on personal PC (or Codespaces) to generate and commit `package-lock.json`, and confirm `lint`/`typecheck`/`test`/`build` pass.

### Milestone 2: Public UI (With Labelled Fixtures — Next After Gate 1)
- [ ] **Task 2.1**: Implement `PublicLayout` (responsive `Header`, `MobileNavigation`, `Footer`, and disabled/safe `FloatingWhatsAppLink`).
- [ ] **Task 2.2**: Implement routes (`/`, `/menu`, `*` 404) and labelled `[SAMPLE DATA]` menu/business fixtures.
- [ ] **Task 2.3**: Build `HomePage` (`HeroSection`, `FeaturedSpecials`, `MenuPreview`, `CustomCakeSection`, `VisitSection`).
- [ ] **Task 2.4**: Build `MenuPage` (`CategoryFilter`, `MenuGrid`, `MenuCard`, `PriceDisplay`, loading/empty/error/sold-out states).
- [ ] **Gate 2**: Usable at `360px` and wider, zero horizontal overflow, full keyboard navigation, contrast verified.

### Milestone 3: Live Menu & Firestore Contract
- [ ] **Task 3.1**: Implement Zod domain schemas (`menuItems`, `settings/business`), ZAR `Intl.NumberFormat('en-ZA')` formatter, and special expiry boundary logic with unit tests.
- [ ] **Task 3.2**: Implement Firebase Modular SDK initialization and typed repositories (`menuRepository`, `businessRepository`).
- [ ] **Task 3.3**: Author `firestore.rules` and `firestore.indexes.json` enforcing published-only public reads and admin-only writes, verified by rules unit tests.
- [ ] **Gate 3**: `fixed`/`from`/`quote` pricing, sold-out, expiry, and error states work; unpublished drafts are inaccessible to public queries.

### Milestone 4: Owner Tools
- [ ] **Task 4.1**: Implement Firebase Auth (`LoginPage`, sign-out, password reset) and `AdminGuard` verifying `admins/{uid}.active == true`.
- [ ] **Task 4.2**: Build `AdminLayout`, `Dashboard` / `MenuList`, and `MenuItemForm`.
- [ ] **Task 4.3**: Build `BusinessSettingsForm` for updating contact details and opening hours.
- [ ] **Task 4.4**: Implement static image path selector (and optional gated `storage.rules` + `ImageUploadField` if Blaze billing is approved).
- [ ] **Gate 4**: Active admin can manage menu and settings; unauthorised accounts are rejected; save errors are visible.

### Milestone 5: Validation & Content Confirmation
- [ ] **Task 5.1**: Expand Vitest unit/component tests and Playwright E2E tests against emulators/controlled fixtures.
- [ ] **Task 5.2**: Replace sample placeholders with owner-confirmed menu items, contact details, and optimised photographs from `docs/content-checklist.md`.
- [ ] **Gate 5**: All automated checks, security tests, mobile checks, and owner content reviews pass.

### Milestone 6: Release & Handover
- [ ] **Task 6.1**: Configure `firebase.json` Hosting, deploy to preview channel first, and smoke test.
- [ ] **Task 6.2**: Finalize `docs/handover.md` with backup/export/restore procedures and tag the release in Git.
- [ ] **Gate 6**: Production deployment verified and handed over to owner.
