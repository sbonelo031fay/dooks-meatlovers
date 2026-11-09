# Dooks Meatlovers — Agent Working Agreement (`AGENTS.md`)

This repository is designed to be edited across multiple tools and environments (starting in Google Antigravity and continuing in VS Code with Codex). Every agent and developer working on this project must adhere to the following rules.

## 1. Core Principles

- **Portability First**: All code, scripts, and configurations must be standard, open, and runnable from a fresh Git clone on any machine with Node LTS and npm. Never introduce tool-specific runtime dependencies or rely on editor-only preview servers or secret stores.
- **One Milestone at a Time**: Follow the milestones defined in `docs/blueprint.md` and `docs/progress.md`. Pause after each milestone gate for Sibonelo's review and satisfaction. Do not generate the entire application in one pass.
- **No Invented Business Facts**: Consult `docs/content-checklist.md` before writing copy, contact links, addresses, opening hours, or menu prices. Never invent phone numbers, WhatsApp numbers, physical addresses, dietary/halal claims, or customer reviews. Disable incomplete contact actions in the UI until confirmed by the owner.
- **No Silent Paid Services**: Do not enable or require paid cloud features (such as Firebase Cloud Storage on the Blaze plan) without explicit billing approval recorded in `docs/decisions.md`.

## 2. Before Making Changes

1. Read `docs/progress.md` to understand the current milestone, branch, completed work, and next task.
2. Read `docs/decisions.md` and `docs/architecture.md` to ensure alignment with established contracts.
3. Inspect `git status` and current directory contents before scaffolding or modifying files. Never blindly overwrite existing work.

## 3. Coding & Architecture Standards

- **Tech Stack**: Vite + React + TypeScript, Tailwind CSS, React Router, Firebase Modular Web SDK (Firestore, Auth, and gated Storage), React Hook Form + Zod, Vitest + React Testing Library + Playwright.
- **Package Manager**: Use `npm` exclusively and commit `package-lock.json`. Do not mix `yarn` or `pnpm` lockfiles. Do not install libraries before their milestone requires them.
- **Separation of Concerns**:
  - Keep Firebase SDK calls strictly out of presentation components.
  - Follow the data flow: `Component -> Feature Hook -> Repository Function -> Firebase SDK / Demo Fixture`.
  - Validate all external data (Firestore records and form inputs) at runtime using Zod schemas.
- **Pricing & Currency**:
  - Use the discriminated union (`fixed` | `from` | `quote`) with `amountCents` (positive safe integer) and `currency: 'ZAR'`.
  - Never use `0` to represent an unknown or quote-based price.
  - Format currency using `Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' })`.
- **Accessibility & Mobile-First**:
  - Design for `360px` viewport width and up without horizontal overflow.
  - Verify WCAG contrast ratios for all text and button combinations (especially burnt orange accents against dark charcoal/timber or cream backgrounds).
  - Ensure full keyboard navigation, visible focus states, and explicit image dimensions.

## 4. Verification & Handoff Protocol

Before completing any task or switching environments:
1. Run all applicable checks (`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`). Never claim a check or test passed if it was not actually executed.
2. Update `docs/progress.md` with:
   - Current branch and commit hash (once committed)
   - Files changed and behaviour implemented
   - Exact commands and checks run with their results
   - Known limitations, open questions, and the immediate next task
3. Record any architectural or scope adjustments in `docs/decisions.md` with the date and rationale.
