# Roadmap

The platform is developed in gated phases. A phase is not complete until its acceptance criteria are evidenced in `STATUS.md` and the relevant tests/checks are recorded.

## Phase 0 — Feasibility, inventory, and architecture proof
- [x] Confirm repository baseline and establish durable project-state tracking.
- [x] Inventory current platform-relevant capabilities and constraints in the existing project repositories without modifying them.
- [x] Prove GAS HtmlService + `google.script.run` request/response behavior in a minimal deployable spike.
- [x] Prove external browser-to-GAS transport from a real GitHub Pages origin; record the negative CORS result and browser evidence.
- [x] Decide that HtmlService is the primary app runtime and GitHub Pages is static showcase/documentation hosting.
- [x] Verify GAS quotas, execution limits, trigger behavior, and Sheets/Drive constraints against official documentation.
- [ ] Review and approve the drafted threat model/data classification, then finalize admin authentication, abuse controls, and deployment access settings before protected features.
- [x] Define provisional measurable performance budgets and a repeatable measurement strategy (baseline measurements remain pending).
- [x] Document deployment, source sync, rollback, backup, and restore procedures (rehearsal remains pending).
- [ ] Approve remaining architecture decisions and phase exit review.

**Exit gate:** transport decision is evidence-based; backend security model and data semantics are documented; integration inventory exists; no unresolved critical feasibility blocker is hidden.

## Phase 1 — Repository foundation and engineering toolchain
- [ ] Select and configure package manager, workspace layout, linting, formatting, type-checking, and test runner.
- [ ] Establish CI for install, lint, type-check, unit tests, and production build.
- [ ] Add typed shared contracts and environment configuration validation.
- [ ] Add contribution, branching, commit, and release conventions.

## Phase 2 — Core Spatial OS shell
- [ ] Design tokens and accessible component primitives.
- [ ] Desktop shell: status bar, window manager, dock, snapping, z-order, resize, minimize, maximize.
- [ ] Mobile shell with touch-first navigation and full-screen app surfaces.
- [ ] EN/FA localization with correct RTL/LTR layout.
- [ ] Theme system, reduced-motion support, keyboard navigation, and focus management.
- [ ] Command palette and safe virtual terminal.

## Phase 3 — Manifest-driven plugin platform
- [ ] Versioned and validated `PooyaAppManifest` schema.
- [ ] Registry, compatibility checks, permissions, and feature flags.
- [ ] Built-in application loader.
- [ ] Sandboxed iframe loader with strict origin allowlist and validated postMessage protocol.
- [ ] Sanitized Markdown/case-study viewer.
- [ ] Registry-driven dock and command palette.

## Phase 4 — Google Apps Script backend
- [ ] Typed action router and input validation.
- [ ] Sheets repository adapter with schema migrations and explicit consistency semantics.
- [ ] LockService critical sections and bounded retry/backoff.
- [ ] CacheService read-through caching only.
- [ ] Durable idempotency and rate-limit records with retention.
- [ ] Server-side admin authentication, authorization, audit logs, and secret handling.
- [ ] Structured logs, correlation IDs, health endpoint, and quota-aware behavior.
- [ ] Trigger-driven maintenance and backup jobs with observable outcomes.

## Phase 5 — Runtime services and offline-first behavior
- [ ] Typed `google.script.run` adapter for the primary HtmlService host.
- [ ] Explicit local mock adapter for development; never present mock results as live backend results.
- [ ] Request correlation, bounded concurrency, error normalization, and mutation ordering.
- [ ] IndexedDB offline queue with idempotency and replay policy.
- [ ] Service Worker only for static Pages content and other explicitly cacheable resources; validate HtmlService restrictions before attempting to register one inside the GAS app.
- [ ] Conflict handling, sync status, and user-visible pending/confirmed states.
- [ ] Browser integration tests for online, offline, reconnect, and duplicate submission.

## Phase 6 — Native interactive mini-apps
- [ ] Topology canvas and validated export format.
- [ ] Live telemetry visualization with honest polling cadence and source timestamps.
- [ ] Web Audio equalizer and local audio lab.
- [ ] Performance profiling; only then decide whether workers, OffscreenCanvas, or WASM are justified.

## Phase 7 — Booking, inquiries, and protected admin workspace
- [ ] Availability model and timezone-safe scheduling.
- [ ] Idempotent inquiry/booking submission and server-confirmed receipt.
- [ ] Admin review, status transitions, audit trail, and notification strategy.
- [ ] Abuse prevention, retention, export, and deletion policies.

## Phase 8 — Release hardening and first-party launch
- [ ] Security, accessibility, responsive, performance, and browser compatibility review.
- [ ] Backup/restore drill and disaster recovery verification.
- [ ] Deployment automation and documented rollback.
- [ ] Public launch checklist, versioning, changelog, and V1 acceptance review.

## Phase 9 — Previous-project integration (intentionally last)
This phase begins only after the owner confirms the relevant source projects are stable enough to integrate. It must not block the standalone platform V1.

- [ ] Reassess AetherFlow readiness and select reusable, self-contained modules.
- [ ] Reassess ORBIT readiness and select reusable observability concepts/components.
- [ ] Reassess Pooya.OS and migrate only validated shell/UI capabilities.
- [ ] Reassess LuminaGlass and migrate selected glass/audio lab modules.
- [ ] Reassess NexusCanvas and migrate topology editor capabilities.
- [ ] Reassess AuraPulse and migrate chart/command-palette capabilities.
- [ ] Reassess Salon Booking and migrate booking/admin patterns only after its own backend is stable.
- [ ] Reassess GlobalCart only if a relevant independent showcase module is identified.
- [ ] Add each integration behind a manifest and feature flag, with attribution, tests, and rollback.
- [ ] Verify licenses, dependency compatibility, security boundaries, and avoid duplicate implementations.

**Integration rule:** no source project is changed by this repository. Integration is pull-in/adaptation work performed here after explicit readiness review.
