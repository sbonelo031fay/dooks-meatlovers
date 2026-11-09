# Architecture & Data Contracts (`docs/architecture.md`)

## 1. Layered Application Flow

Presentation components must never import or call the Firebase SDK directly. All data access follows a strict four-layer boundary:

```text
React Component (Presentation)
  └── Feature Hook (State, loading/error handling)
        └── Repository Function (Data source abstraction + Zod runtime parsing)
              └── Firebase Modular SDK (or explicit labelled Demo Fixtures)
```

This boundary allows Milestone 2 to build and test the complete public UI against deterministic, labelled sample fixtures while Milestone 3 wires in live Firestore repositories without rewriting UI components.

## 2. Route Map

| Path | Access | Purpose | Loading Strategy |
|---|---|---|---|
| `/` | Public | Homepage (Hero, Featured Specials, Menu Preview, Custom Cake Quote, Visit/Contact) | Eager |
| `/menu` | Public | Full filterable menu with category tabs and search/status display | Eager |
| `/admin/login` | Public (unauthenticated) | Owner email/password sign-in and password reset | Lazy |
| `/admin` | Protected (`AdminGuard`) | Owner dashboard and full menu list (including drafts/unpublished) | Lazy |
| `/admin/menu/new` | Protected (`AdminGuard`) | Create new menu item form | Lazy |
| `/admin/menu/:id/edit` | Protected (`AdminGuard`) | Edit existing menu item form | Lazy |
| `/admin/settings` | Protected (`AdminGuard`) | Edit public business details and opening hours | Lazy |
| `*` | Public | Catch-all Not Found (`404`) page with link back to `/` and `/menu` | Eager |

## 3. Planned Directory Structure

Directories will be created incrementally as their milestone requires them:

```text
dooks-meatlovers/
  docs/                  Project documentation, blueprint, checklists, and progress log
  public/
    images/              Approved optimised static photographs and placeholders
  src/
    app/                 Router configuration and global providers
    components/
      ui/                Reusable accessible buttons, inputs, badges, loading/error states
      layout/            Header, MobileNavigation, Footer, PublicLayout, AdminLayout
    features/
      menu/              Menu domain types, Zod schemas, pricing/expiry helpers, hooks, cards
      business/          Business settings types, schemas, hooks, Visit/Contact components
      auth/              Firebase Auth context, hooks, Login screen, AdminGuard
      admin/             Admin dashboard, MenuItemForm, BusinessSettingsForm
    lib/
      firebase/          Firebase app initialisation, env validation, and emulator wiring
    repositories/        Menu and business settings repository interfaces + implementations
    pages/               Route-level page compositions (HomePage, MenuPage, NotFoundPage)
    styles/              Global CSS and Tailwind token definitions
    test/                Vitest setup and test utilities
  tests/
    e2e/                 Playwright browser journey tests
    rules/               Firestore and Storage security rules unit tests
```

## 4. Firestore Data Contract

### Collection: `menuItems/{itemId}`
- `name`: `string` (non-empty, max length enforced in Zod + rules)
- `description`: `string`
- `category`: `'bbq' | 'kotas' | 'platters' | 'bakery' | 'cakes'`
- `image`:
  - `url`: `string | null`
  - `storagePath`: `string | null` (`null` for repo-hosted static images)
  - `alt`: `string`
- `pricing` (Discriminated Union):
  - When `type` is `'fixed'` or `'from'`: `amountCents` is a positive safe integer (`> 0`), `currency: 'ZAR'`
  - When `type` is `'quote'`: `amountCents` is `null`, `currency: 'ZAR'`
- `published`: `boolean`
- `soldOut`: `boolean`
- `featured`: `boolean`
- `sortOrder`: `integer`
- `special`:
  - `enabled`: `boolean`
  - `startsAt`: `Timestamp | null`
  - `endsAt`: `Timestamp | null` (must be `> startsAt` when both exist)
- `createdAt`: `Timestamp` (server timestamp)
- `updatedAt`: `Timestamp` (server timestamp)

### Document: `settings/business`
- `displayName`: `string`
- `tagline`: `string`
- `whatsappNumber`: `string | null` (digits with country code, e.g., `27...`)
- `telephone`: `string | null`
- `address`: `string | null`
- `mapUrl`: `string | null`
- `instagramUrl`: `string | null`
- `openingHours`: map of keys `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`, each with `{ closed: boolean, opens: string | null, closes: string | null }` (`HH:mm`)
- `timezone`: `'Africa/Johannesburg'`
- `updatedAt`: `Timestamp`

### Collection: `admins/{firebaseAuthUid}`
- `active`: `boolean` (Provisioned out-of-band by a trusted administrator; client writes strictly denied in `firestore.rules`).

## 5. Security & Environment Boundaries

- **Public Queries**: Must explicitly filter `.where('published', '==', true)` because Firestore security rules reject queries that could potentially return unpublished documents to unauthenticated visitors.
- **Admin Verification**: Security rules check `exists(/databases/$(database)/documents/admins/$(request.auth.uid)) && get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.active == true`.
- **Media Storage Gate**: Cloud Storage (`menu/{itemId}/{uniqueFileName}`) is deferred until Blaze billing is explicitly approved. Until then, `image.storagePath` remains `null` and `image.url` references local static assets under `/images/...`.
