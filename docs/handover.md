# Owner Handover & Operations Guide (`docs/handover.md`)

> **Status**: Initial template created in Milestone 0. Specific production URLs and final workflows will be completed in Milestone 6 prior to release.

## 1. Routine Owner Tasks

### Signing In & Resetting Password
- Visit `/admin/login` on the website.
- Sign in using the authorised owner email address and password.
- If you forget your password, use the **Reset Password** button on `/admin/login` to receive a password reset link via email.
- **Security Note**: There is no public sign-up page. New admin accounts can only be granted by the project administrator adding the user's UID to the `admins` collection in Firestore.

### Managing Menu Items (`/admin`)
- **Adding or Editing an Item**: Use **New Menu Item** or **Edit** on any item card.
- **Pricing Modes**:
  - **Fixed Price (`fixed`)**: Standard set price in Rands (e.g., `R 120.00`).
  - **Starting From (`from`)**: Minimum confirmed starting price (e.g., `From R 450.00`).
  - **Custom Quote (`quote`)**: Used for bespoke cakes or platters where price depends on customer requirements. Never enter `R 0` for quote items.
- **Sold Out vs. Unpublished**:
  - **Sold Out (`soldOut = true`)**: The item stays visible on the public menu so customers know you offer it, but it shows a **Sold Out** badge and disables direct order enquiries.
  - **Unpublished (`published = false`)**: Hides the item completely from the public website. Use **Unpublish** as the default way to remove seasonal or discontinued items.
- **Running a Timed Special**:
  - Enable **Special Offer** on the item and optionally set a **Start Date/Time** and **End Date/Time** (South African time, `Africa/Johannesburg`).
  - Once the end time passes, the item automatically stops appearing in the **Featured Specials** section without needing manual edits.

### Updating Business Details (`/admin/settings`)
- Update your public **WhatsApp number** (digits including `27` country code), **telephone**, **physical address**, **Google Maps link**, and **Monday–Sunday opening hours**.
- Changes take effect immediately on the public site once saved.

## 2. Photographs & Media

- While in repository-hosted image mode (no cloud storage billing required), product photographs are optimised (`WebP`/`JPEG`, under `5 MiB`) and stored in `public/images/`.
- If Firebase Cloud Storage is later approved and enabled on the Blaze plan, photos can be uploaded directly from the Menu Item form (`JPEG`, `PNG`, or `WebP` only, max `5 MiB`).

## 3. Backups, Rollback & Ongoing Maintenance

| Responsibility | Frequency | Procedure |
|---|---|---|
| **Code & Frontend Rollback** | Per release | Managed via Git tags and Firebase Hosting release history. Rolling back Hosting restores code/UI only, not database records. |
| **Firestore Data Export** | Monthly / Before major changes | Export `menuItems` and `settings` collections using Google Cloud / Firebase CLI export tools; test restore into the development emulator. |
| **Dependency & Security Review** | Quarterly | Run `npm audit` and update dependencies on a branch; verify via CI before merging. |
| **Billing & Usage Monitoring** | Monthly | Check Firebase console usage quotas and Google Cloud budget alerts (if Blaze plan is enabled). |
| **Domain Renewal** | Annually | Confirm domain registrar auto-renewal and DNS status. |
