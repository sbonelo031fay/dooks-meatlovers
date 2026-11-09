# Content & Asset Checklist (`docs/content-checklist.md`)

**Rule**: Never invent business details, contact numbers, addresses, opening hours, prices, reviews, or dietary certifications (such as halal status). Any unconfirmed contact action must remain visibly disabled or labelled as a development placeholder until confirmed by the business owner.

## 1. Confirmed Context (from Build Brief)

| Item | Confirmed Detail | Status |
|---|---|---|
| Business Type | Family-run South African bakery and BBQ deli | Confirmed |
| Vibe / Aesthetic | Rustic South African BBQ, smokehouse, street food, local and approachable | Confirmed |
| Core Categories | Smoked brisket specials (`bbq`), loaded kotas (`kotas`), sharing platters (`platters`), bakery (`bakery`), custom cakes (`cakes`) | Confirmed |
| Custom Cakes Pricing | Quote-based (`quote` pricing type; no fixed prices unless owner explicitly confirms a `from` starting price) | Confirmed |
| Instagram Handle Reference | `@dooks_meatlover` (never hotlink Instagram URLs; use local optimised assets) | Confirmed |
| Enquiry Mechanism | Prefilled WhatsApp link initiated by visitor (no automated order placement or database storage of personal enquiry data in v1) | Confirmed |

## 2. Unconfirmed Business Facts (Owner Confirmation Required)

| Item | Current Placeholder / Handling | Action Needed from Owner | Status |
|---|---|---|---|
| **Exact Trading Name Spelling** | Display as `Dooks Meatlovers` (pending confirmation of apostrophe or subtitle) | Confirm official trading name spelling | **Unconfirmed** |
| **WhatsApp Enquiry Number** | `null` in config — WhatsApp action buttons must render in a disabled/unavailable state when missing | Provide full WhatsApp number with country code (`27...`) | **Unconfirmed** |
| **Telephone Number** | `null` in config — omit or disable call link until provided | Provide public contact phone number | **Unconfirmed** |
| **Physical Address** | `null` in config — show placeholder notice in Visit section | Provide street address, suburb, and city | **Unconfirmed** |
| **Map Coordinates / Google Maps URL** | `null` in config — disable "Get Directions" button until provided | Provide verified Google Maps share link | **Unconfirmed** |
| **Opening Hours (`mon`–`sun`)** | Mark as "Hours to be confirmed" in UI fixture | Confirm opening and closing times (`HH:mm`) for Monday–Sunday (`Africa/Johannesburg`) | **Unconfirmed** |
| **Complete Menu & ZAR Prices** | Use clearly labelled `[SAMPLE DATA]` fixtures during development | Provide item names, descriptions, categories, and ZAR prices (`fixed`, `from`, or `quote`) | **Unconfirmed** |
| **Dietary & Allergen Statements** | No dietary/halal claims made | Confirm any required allergen warnings or verified dietary statements | **Unconfirmed** |
| **Custom Domain Name** | Use Firebase Hosting default preview/staging domain initially | Confirm desired production domain and business registrar account | **Unconfirmed** |

## 3. Visual Assets & Media Gaps

| Asset | Requirement | Current Status |
|---|---|---|
| **Logo Files** | SVG or high-res transparent PNG/WebP in `public/images/` | **Missing** — Use text-based brand wordmark placeholder until provided |
| **Hero Photograph** | High-impact smoked meat / platter photograph (`WebP`/`JPEG`, explicit dimensions, eager loaded) | **Missing** — Screenshots referenced in another chat are not in this workspace; use visibly labelled placeholder graphic until approved images are copied into `public/images/` |
| **Category / Menu Item Photos** | Web-optimised photos (`<= 5 MiB`, `JPEG`/`PNG`/`WebP`) | **Missing** — Use labelled placeholder thumbnails until owner provides approved photos |
| **Social Preview (`og:image`)** | 1200x630 WebP/JPEG brand preview image | **Missing** — Pending logo and photography |
