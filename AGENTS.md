# Working agreement

- Read README, docs/architecture.md and docs/progress.md first.
- React + TypeScript + Vite; npm and package-lock.json only. Node 24.22.1.
- Keep components free of Firebase calls. UI → hook → repository → SDK.
- Keep changes within the requested scope. One editing agent at a time.
- Remain private. Do not publish publicly, change access, provision billing or send messages without the user's explicit request.
- Business facts must come from approved evidence. Never replace unknown prices with zero or invent hours, allergens, phone numbers, reviews or directions.
- Demo mode is explicit. A Firebase failure must show an error, never silently load fixtures.
- Do not add checkout, payment or customer account flows.
- Only favourite IDs persist in localStorage. Do not persist cake/enquiry personal details.
- Keep secrets, env.local, node_modules, dist and emulator data out of Git.
- Run npm test and npm run build for functional changes. Keep docs/progress.md current; report unverified checks honestly.
- The original planning blueprint used milestone pauses. The user's 2 Nov 2026 request authorises this complete usable private preview; further public release remains gated.
