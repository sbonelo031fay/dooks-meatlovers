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

## GitHub and another device

The private Sites source is backed by Git. A **personal GitHub repository has not been created**. To transfer the supplied ZIP, extract it, create an **empty private** GitHub repository named `dooks-meatlovers` in your account, then run these commands from the extracted project folder (replace the URL):

```sh
git init -b main
git add .
git commit -m "Build private Dooks Meatlovers interactive preview"
git remote add origin https://github.com/YOUR_ACCOUNT/dooks-meatlovers.git
git push -u origin main
```

If you are using the existing Sites Git checkout instead of the ZIP, **do not reinitialise or replace its origin**. Add a second remote:

```sh
git remote add github https://github.com/YOUR_ACCOUNT/dooks-meatlovers.git
git push -u github main
```

On another computer:

```sh
git clone https://github.com/YOUR_ACCOUNT/dooks-meatlovers.git
cd dooks-meatlovers
npm ci
npm run dev
```

For ongoing work: inspect `git status`, `git pull --ff-only`, create `feat/your-task`, edit, run checks, commit and push. Use the same repository in every editor. Read `AGENTS.md` and `docs/progress.md` before asking Codex to continue. Source control contains code, **not future Firebase records/uploads**.

## Firebase path

Read [docs/firebase.md](docs/firebase.md). The actual read adapter is implemented and lazy-loaded. Production remains demo mode. No Firebase project, billing service, Authentication account or live data is provisioned. Read-only rules, indexes, Storage deny rules, environment template and optional Hosting SPA configuration are included. Admin editing is a separate future milestone.

## Hosting and privacy

This delivery uses private Sites hosting, identified in `.openai/hosting.json`. Keep the Site audience private. `noindex` is additional metadata, not access control. Do not run a Firebase Hosting deploy or change Site sharing without explicit approval; default Firebase Hosting is not this private audience. Public release requires the content checklist and owner approval.
