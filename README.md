# Dooks Meatlovers

Mobile-first web application for **Dooks Meatlovers**, a family-run South African bakery and BBQ deli offering smoked brisket specials, loaded kotas, sharing platters, bakery goods, and custom cakes.

## Project Status

- **Current Milestone**: Milestone 1 — Portable Foundation (Source scaffolded; ready for GitHub upload and `npm install` on personal PC / Codespaces)
- **Active Directory**: `C:\Users\fayes\.gemini\antigravity\scratch\dooks-meatlovers` (See `docs/progress.md` for full handoff status).

## Technical Stack

- **Framework**: React 18 + TypeScript (built with Vite 6)
- **Styling**: Tailwind CSS 3 (with documented brand tokens in `tailwind.config.js` and `docs/design-system.md`)
- **Routing**: React Router v6
- **Data & Auth**: Firebase Modular Web SDK (to be added in Milestone 3; environment validation via Zod in `src/lib/firebase/env.ts`)
- **Testing & Quality**: Vitest, React Testing Library, ESLint, Prettier, GitHub Actions CI

## Node & Package Management

- **Node Version**: `22.14.0` LTS (recorded in `.nvmrc`; compatible range `>=20.11.0 <23.0.0` in `package.json`).
- **Package Manager**: `npm` only.

## Uploading from Work PC & Cloning on Personal PC

Because this work PC does not have `git` or `node` installed locally:

### Step 1: Upload to Private GitHub Repo (Browser — No Install Needed)
1. Sign into your personal GitHub account in your browser and create a new **Private** repository named `dooks-meatlovers`.
2. Open the repository in the browser-based editor by pressing `.` (which opens `https://github.dev/YOUR_USERNAME/dooks-meatlovers`) **or** click **Add file → Upload files**.
3. Drag and drop the contents of `C:\Users\fayes\.gemini\antigravity\scratch\dooks-meatlovers` (including `.github`, `docs`, `public`, `src`, `.env.example`, `.gitignore`, `.nvmrc`, `package.json`, etc.) into the repository and commit to `main`.

### Step 2: Run & Lock Dependencies on Personal PC (or GitHub Codespaces)
On your personal computer (where Node, npm, and Git are installed):

```powershell
git clone https://github.com/YOUR_USERNAME/dooks-meatlovers.git
cd dooks-meatlovers
npm install
Copy-Item .env.example .env.local
npm run lint
npm run typecheck
npm test
npm run build
npm run dev
```

Then commit and push the generated `package-lock.json`:

```powershell
git add package-lock.json
git commit -m "chore: commit package-lock.json and verify Milestone 1 checks"
git push
```

## Available Scripts

- `npm run dev` — Start Vite local development server
- `npm run build` — Typecheck and build static production bundle to `dist/`
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint static checks
- `npm run typecheck` — Run TypeScript compiler check (`tsc --noEmit`)
- `npm test` — Run Vitest unit and component tests
- `npm run format` — Format files with Prettier

## Documentation Map

- [`AGENTS.md`](./AGENTS.md) — Working agreement for AI agents and developers across Antigravity and VS Code / Codex
- [`docs/blueprint.md`](./docs/blueprint.md) — Initial implementation and portability blueprint (v1.0)
- [`docs/requirements.md`](./docs/requirements.md) — Scope, exclusions, and milestone acceptance criteria
- [`docs/architecture.md`](./docs/architecture.md) — Route map, component hierarchy, Firestore schema, and security boundaries
- [`docs/design-system.md`](./docs/design-system.md) — Brand direction, typography, colour tokens, and accessibility rules
- [`docs/content-checklist.md`](./docs/content-checklist.md) — Confirmed business context vs. unconfirmed facts and asset gaps
- [`docs/decisions.md`](./docs/decisions.md) — Architectural Decision Log (ADR)
- [`docs/progress.md`](./docs/progress.md) — Prioritised task list, milestone status, and handoff log
- [`docs/handover.md`](./docs/handover.md) — Owner operating guide and maintenance checklist
