# Dooks Meatlovers

Private, mobile-first React + TypeScript website for a South African family BBQ and bakery brand. Standard Vite project: editable in VS Code, Codex or Antigravity, with no proprietary UI runtime.

## Run in three steps

Use Node **24.22.1** (recorded in `.nvmrc`) and npm. Open this folder in VS Code:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Demo mode is the default; **no environment file or Firebase account is needed**. On Windows, install the specified Node version using your normal Node installer/version manager. Do not copy `node_modules` between computers.

```sh
npm test              # focused menu business tests
npm run typecheck     # TypeScript checks
npm run build         # type-check and build to dist/
npm run preview       # inspect production build locally
```

## What works now

- Home, `/menu`, section navigation and a useful not-found page.
- Category + search + favourites + availability filters; price/name sorting.
- Filter state in the URL; saved dish IDs persist in this browser.
- Item details, stock states, loading/error/retry/empty views.
- Enquiry list with quantities, removal, guide subtotal and copyable message.
- Cake planner with required inputs, future date checks and copyable draft.
- Accessible native dialogs, keyboard focus, reduced-motion support.
- Responsive diagnostic at `/__qa/viewport.html` (unlinked developer utility).
- Self-hosted fonts and locally packaged approved food photos.

**This is a labelled preview.** Historical poster prices, example descriptions and stock status are not a live commercial menu. WhatsApp, exact directions and opening hours are intentionally unavailable until owner confirmation. No order, payment, message transmission or booking occurs. Enquiry/cake details stay in memory and disappear on reload; only favourite IDs use localStorage.

## Find your way around

Start at [docs/architecture.md](docs/architecture.md) for the visual map, then [docs/progress.md](docs/progress.md) for the next task.

| You want to change… | Open… |
|---|---|
| Sample dishes and guide prices | `src/data/menu.seed.ts` |
| Menu filtering, pricing, special expiry | `src/features/menu/menu.ts` |
| A dish card | `src/components/MenuCard.tsx` |
| Page layout, enquiry/cake journeys | `src/app/App.tsx` |
| Colours, spacing and responsive rules | `src/styles/global.css` |
| Data source | `src/repositories/menuRepository.ts` |
| Firebase configuration | `src/lib/firebase/client.ts` |

## One repository across Antigravity, VS Code and Codex

Use the existing repository: [sbonelo031fay/dooks-meatlovers](https://github.com/sbonelo031fay/dooks-meatlovers). This GitHub repository is currently public; the reference Sites website has separate private access. Never commit secrets, `.env.local`, personal enquiry details or service-account files.

Clone once per device, then open that same folder in your preferred IDE. Do not copy another complete source folder into it or run `git init` again:

```sh
git clone https://github.com/sbonelo031fay/dooks-meatlovers.git
cd dooks-meatlovers
npm ci
npm run dev
```

Before editing in any IDE:

```sh
git status
git fetch origin
git switch main
git pull --ff-only
git switch -c fix/your-task
```

If `git status` shows your work, commit it on its own branch before switching; do not discard or overwrite it. Coordinate one editing branch at a time across IDEs. Before pushing, fetch again, inspect `git diff origin/main...HEAD`, and merge/rebase incoming work deliberately if needed. Run `npm test`, `npm run typecheck` and `npm run build`, then push your feature branch and open a pull request.

The current quality pass is on `fix/mobile-menu-quality`. To review it on another device after it has been pushed:

```sh
git fetch origin
git switch --track origin/fix/mobile-menu-quality
npm ci
npm run dev
```

If you already have that local branch, use `git switch fix/mobile-menu-quality` followed by `git pull --ff-only` instead. Source control contains code, not future Firebase records/uploads. Read `AGENTS.md` and `docs/progress.md` when handing work between tools.

**Deployment:** the existing GitHub Actions workflow publishes `gh-pages` on pushes to `main`. A feature-branch push does not publish; its pull request runs checks only. Merging that PR into `main` will trigger the existing deployment. Do not merge or push to `main` without release approval. This workflow is separate from private Sites hosting.

## Firebase path

Read [docs/firebase.md](docs/firebase.md). The actual read adapter is implemented and lazy-loaded. Production remains demo mode. No Firebase project, billing service, Authentication account or live data is provisioned. Read-only rules, indexes, Storage deny rules, environment template and optional Hosting SPA configuration are included. Admin editing is a separate future milestone.

## Hosting and privacy

The reference website uses private Sites hosting. Its separate source checkout contains `.openai/hosting.json`; that file is not present in this GitHub repository. Keep the Site audience private. `noindex` is additional metadata, not access control. Do not run a Firebase Hosting deploy or change Site sharing without explicit approval; default Firebase Hosting is not this private audience. Public release requires the content checklist and owner approval.
