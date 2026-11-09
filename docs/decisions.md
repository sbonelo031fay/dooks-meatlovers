# Architectural Decision Log (`docs/decisions.md`)

All significant technical, architectural, and scope decisions are recorded here chronologically.

---

## ADR-001: Initialize Project in Standard Portable Directory Structure
- **Date**: 2026-11-02
- **Status**: Accepted
- **Context**: The workspace inspection showed no pre-existing `dooks-meatlovers` folder in the active Antigravity scratch directory (`C:\Users\fayes\.gemini\antigravity\scratch`). The project must be started in Antigravity, pushed to a single private GitHub repository (`dooks-meatlovers`), and seamlessly continued in VS Code with Codex on a personal machine outside OneDrive.
- **Decision**: Create `dooks-meatlovers` using standard Vite + React + TypeScript + npm tooling with zero proprietary Antigravity runtime dependencies, and document all project knowledge in `docs/` and `AGENTS.md`.
- **Consequences**: Any developer or AI agent can clone the repository, run `npm ci`, and continue work from the exact milestone recorded in `docs/progress.md`.

---

## ADR-002: Repository Pattern with Zod Runtime Validation and Explicit Demo Fixtures
- **Date**: 2026-11-02
- **Status**: Accepted
- **Context**: Public UI development (Milestone 2) precedes live Firestore integration (Milestone 3), and TypeScript compile-time types do not guarantee the validity of stored Firestore documents at runtime.
- **Decision**: Introduce a thin repository layer (`src/repositories/`) that validates data via Zod schemas (`src/features/menu/` and `src/features/business/`). Support a clearly labelled Demo/Fixture mode for local UI development and testing, while ensuring live mode never silently falls back to fake sample data if Firestore fails.
- **Consequences**: UI components remain decoupled from Firebase SDK internals, invalid records fail safely, and visitors are never misled by sample prices in production.

---

## ADR-003: Defer Firebase Cloud Storage Photo Uploads Until Blaze Plan Approval
- **Date**: 2026-11-02
- **Status**: Accepted
- **Context**: Cloud Storage for Firebase requires the Blaze pay-as-you-go billing plan. No paid services may be enabled without explicit owner/developer billing approval.
- **Decision**: Retain the complete `image: { url, storagePath, alt }` data contract in `menuItems`, but use repository-hosted static images (`storagePath: null`, `url: '/images/...'`) initially. Gate the live Storage upload component behind explicit billing approval.
- **Consequences**: Zero unexpected cloud billing during initial development and launch, with no schema migration required if Cloud Storage is enabled later.
