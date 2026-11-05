# Agent Instructions — Pooya Labs Platform

## Mission
Build the Pooya Labs personal engineering platform in this repository only. Treat this file and the current committed project state as the source of truth, not chat history.

## Scope and repository boundaries
- Canonical repository: `pooya-labs/pooya-labs-platform`.
- Do not modify `pooya-labs/pooya-labs` (personal profile) or any existing project repository as part of this work.
- Do not import, copy, refactor, or integrate code from AetherFlow, ORBIT, GlobalCart, Pooya.OS, AuraPulse, NexusCanvas, LuminaGlass, or Salon Booking until the dedicated final integration phase and only after the owner confirms the relevant source project is ready.
- Earlier phases may inspect public documentation or repository structure to create an integration inventory. Inspection does not authorize changes to those repositories.
- Keep unrelated work out of commits.

## Working protocol
1. Before each task, read `docs/STATUS.md`, `docs/NEXT.md`, the relevant roadmap section, and relevant architecture/decision documents.
2. Inspect the existing repository before creating or replacing files. Never overwrite unknown user work.
3. Work in small, reviewable milestones. Prefer one coherent commit per milestone.
4. Run available checks; record exact commands, results, and limitations.
5. Update `docs/STATUS.md`, `docs/NEXT.md`, `docs/project-state.json`, and `docs/CHANGELOG.md` in the same milestone as the implementation.
6. Update `docs/ROADMAP.md` checkboxes only when evidence supports completion.
7. Record significant decisions in `docs/decisions/` with context, decision, alternatives, and consequences.
8. Never claim a test, deployment, browser check, or integration succeeded unless it was actually run and observed.
9. Do not leave mock data presented as live data or TODO-only code presented as complete.
10. Keep documentation self-contained so a new AI agent can resume without previous conversations.

## Engineering constraints
- Prefer React + Vite + TypeScript for the SPA; avoid Next.js/SSR unless a validated requirement emerges.
- Keep host-specific behavior behind typed adapters. HtmlService uses `google.script.run`; external hosting uses a separately verified HTTP transport.
- A `text/plain` request may avoid some CORS preflights but does not itself solve CORS. Verify actual browser behavior.
- CacheService is an expendable cache, not a durable queue or database.
- Google Sheets is a small-scale persistence adapter, not a relational ACID database.
- Use LockService for critical write sections, unique operation IDs, idempotency, and explicit consistency semantics.
- Use IndexedDB for durable browser-side offline queueing. Server confirmation is required before confirming bookings.
- Security decisions and admin authorization must be enforced server-side. Never expose secrets in frontend bundles or untrusted iframes.
- Use least-privilege plugin permissions, strict manifest validation, origin allowlists, and safe Markdown rendering.
- WASM and OffscreenCanvas are optional optimizations. Profile first.
- Design for EN/FA, RTL/LTR, mobile, keyboard navigation, screen readers, and reduced motion.

## Definition of done
A milestone is complete only when implementation, tests, error states, accessibility considerations, documentation, and integration boundaries have been reviewed. A commit alone does not prove correctness.
