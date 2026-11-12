# Decisions — 2 November 2026

- Complete usable private React preview authorised by the current user request; public release remains forbidden without approval.
- Vite static app with standard React/TypeScript; private Sites deployment now, optional Firebase Hosting later.
- Demo repository first, with a real lazy-loaded read adapter and explicit Firebase configuration. No cloud fallback to fixtures on errors.
- Historical poster guide prices are visibly qualified. Contact/WhatsApp disabled pending confirmation.
- Local enquiry/cake message drafting rather than order placement. No customer account, checkout or backend personal-data writes.
- Reuse approved food screenshots, crop out social UI/notifications and record attribution in the asset manifest. No image hotlinks.
- Use a readable shared CSS file rather than introducing Tailwind for this preview. Keep feature/repository boundaries as in the original blueprint.
- Self-host fonts to avoid waiting for external font servers.
- Include a private unlinked responsive QA harness; it sizes a real iframe to 360/390/768/1366px. It does not claim a physical-phone test.
- Deliver source ZIP and Git instructions. Connected GitHub tooling does not expose repository creation; no personal GitHub repository is claimed.
