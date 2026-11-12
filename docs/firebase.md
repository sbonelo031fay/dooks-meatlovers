# Firebase integration: next milestone

## Already implemented

- Modular Web SDK dependency and lazy Firebase read repository.
- Validated config, development-only explicit Firestore emulator switch.
- Published-only query sorted by `sortOrder` and runtime record validation.
- Compound index declaration; read-only Firestore rules; Storage denied.
- Firebase Hosting `dist/` + SPA rewrite configuration for a separately approved migration.

## Connect a development project

1. Create/select a business-authorised development Firebase project and register a web app.
2. Copy `.env.example` to ignored `.env.local`; fill the six web configuration values.
3. Set `VITE_DATA_SOURCE=firebase` and deliberately choose emulator mode. Prefer local emulators for development; this repository does not install or start a Firebase CLI yet.
4. Pin a supported `firebase-tools` version as a dev dependency when introducing the emulator/deploy workflow. Use `npx firebase`, never a machine-only dependency.
5. Review/test the supplied rules, then import **synthetic** menu documents with exactly the `MenuItem` fields. The document ID supplies `id`; `special.startsAt/endsAt` are timestamps or null. Every document needs `sortOrder`. `published` is boolean.
6. For live reads, deploy the reviewed Firestore rules and indexes to the explicitly selected development project. Build-time environment changes require restarting Vite/rebuilding.

The current UI cannot edit Firebase. Writes are denied to every client, including signed-in accounts. This is a safe read-only foundation rather than a completed admin system. No rules emulator tests were run in this delivery because no emulator/owner-write layer was added.

## Add owner tools as one deliberate change

Implement Firebase Auth email/password sign-in, reset and sign-out. A trusted process must provision `admins/{uid}.active`; client writes to admin membership always remain denied. Add validated menu/settings forms and enforce the same schema in rules before enabling admin writes. Use server timestamps for created/updated dates. Test unauthorised writes, drafts, role escalation, malformed price unions and save failures against emulators before enabling a real backend.

Use approved repository photos initially. Add Storage uploads only with billing approval, active-admin rules, JPEG/PNG/WebP constraints, a 5 MiB cap, optimisation and orphan cleanup. Do not use VITE variables for secrets or service-account keys.

Business settings should move behind a `BusinessRepository` when confirmed: displayName, tagline, contact/WhatsApp, map/address, hours and Africa/Johannesburg timezone. Do not make the public UI call Firebase directly. The current visit copy is deliberately static and qualified.

## Official reference

- https://firebase.google.com/docs/web/setup
- https://firebase.google.com/docs/firestore/query-data/queries
- https://firebase.google.com/docs/firestore/security/get-started
- https://firebase.google.com/docs/emulator-suite

## Privacy during migration

Firebase Hosting configuration is a portable future option, **not an instruction to deploy**. Public Hosting does not inherit the private Site audience. Keep the current private Site until an approved release plan exists. Code backups and Firestore/Storage data backups are separate responsibilities.
