# Requirements & Acceptance Criteria (`docs/requirements.md`)

## 1. Release 1 Scope

### Public Visitor Experience
- **Homepage (`/`)**:
  - Hero section communicating the rustic South African BBQ deli and bakery offer.
  - Featured Specials section displaying active, non-expired specials.
  - Menu Preview highlighting signature offerings across categories (`bbq`, `kotas`, `platters`, `bakery`, `cakes`).
  - Custom Cake Quote section explaining the bespoke quote workflow via WhatsApp.
  - Visit & Contact section showing verified opening hours, address/map link (when confirmed), and contact actions.
- **Full Menu Page (`/menu`)**:
  - Client-side category filter (`All`, `BBQ`, `Kotas`, `Platters`, `Bakery`, `Cakes`).
  - Consistent sorting by `sortOrder` ascending, then `name` ascending.
  - Explicit UI states: `loading`, `empty`, `error`, and item-level `soldOut`.
  - Accurate pricing formatting in `ZAR` (`en-ZA`) supporting `fixed`, `from`, and `quote` pricing modes.
- **Specials Expiry Logic**:
  - A special only appears as an active special when `special.enabled === true`, `startsAt` (if present) is in the past, and `endsAt` (if present) is in the future.
  - Once `endsAt` passes, the special badge and Featured Specials placement stop appearing automatically without manual intervention, while the underlying item remains on the standard menu if `published === true`.
- **WhatsApp Enquiry Handoff**:
  - Generates a URL-encoded prefilled WhatsApp message that the visitor chooses to send.
  - If a menu item is `soldOut`, the primary order enquiry action is either disabled or explicitly switched to an availability enquiry.
  - If `whatsappNumber` in business settings is `null` or unconfirmed, WhatsApp buttons render disabled with an honest explanation rather than linking to a fake number.

### Owner Administration Experience
- **Authentication (`/admin/login`)**:
  - Email and password sign-in, sign-out, and password reset via Firebase Authentication.
  - No public sign-up page; only accounts with an active document in `admins/{uid}` (`active === true`) may access admin capabilities.
- **Menu Management (`/admin`, `/admin/menu/new`, `/admin/menu/:id/edit`)**:
  - Create and edit menu items with runtime Zod validation matching Firestore rules.
  - Configure pricing (`fixed`, `from`, `quote`), category, `sortOrder`, `published`, `soldOut`, `featured`, and `special` start/end dates.
  - Default removal action is unpublishing/archiving (`published = false`) rather than permanent deletion.
  - Upload/replace item photographs (`JPEG`, `PNG`, `WebP` up to `5 MiB`) when Firebase Cloud Storage is enabled and billing is approved; otherwise select from repository-hosted images.
- **Business Settings (`/admin/settings`)**:
  - Update public trading name, tagline, WhatsApp number, telephone, physical address, map link, Instagram link, and Monday–Sunday opening hours.

## 2. Explicit Exclusions (Out of Scope for v1)

- Online cart, checkout, or payment gateway integration
- Delivery routing or driver management
- Customer accounts, logins, or loyalty programmes
- Custom Node/Express backend server
- Automated WhatsApp Business API integration
- Storing customer enquiries or personal custom cake requests in Firestore

## 3. Non-Functional & Quality Requirements

- **Responsiveness**: Usable at `360px` width and wider with zero horizontal overflow.
- **Accessibility**: Keyboard navigable, visible focus indicators, accessible form labels and validation error messages, explicit image dimensions, and verified WCAG contrast ratios.
- **Performance**: Eager load main hero media (with explicit dimensions); lazy-load below-the-fold menu images; no autoplay video.
- **Portability**: Standard Vite + React + TypeScript repository runnable via `npm ci` and `npm run dev` across Antigravity, local VS Code with Codex, and GitHub Actions CI.
