# Owner and developer handover

## Use this preview

Open the private site while signed in to the owning ChatGPT account. Try a category and search together; tap a heart to save a dish. Tap a dish for details, + to build an enquiry, then My enquiry to change quantities and copy a message. Cake enquiries have their own planner. Nothing is sent automatically.

Only favourite dish IDs persist in this browser. Enquiries and cake ideas clear when reloading; there is no account sync. Private access is enforced by hosting, not by the robots tag.

## Change the sample menu

Edit `src/data/menu.seed.ts`: amount is supplied to the helper in rands then stored as integer cents. Use null for individually quoted cakes. Mark `soldOut` to disable adding; set `published:false` to hide a dish. `featured` controls the favourite badge; `sortOrder` sets default order. Add approved images under `public/images`. Run tests and build before committing.

Owner editing through a sign-in dashboard is not yet implemented. Follow docs/firebase.md to add it securely. Do not present this preview as a completed owner CMS.

## Public release still needs approval

Confirm the content checklist, menu accuracy, map, WhatsApp, hours and originals for low-resolution crops. Finish and test the chosen data/editing layer. A code rollback restores frontend source, not future Firestore records or photos. Assign someone to content updates, dependencies, domain renewal and future billing/backups.
