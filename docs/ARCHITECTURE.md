# Architecture — Provisional

## Product shape
A bilingual, responsive, installable SPA presented as a Spatial Web OS. The platform shell owns window management, navigation, app registry, theme, localization, accessibility, and host adapters. Individual mini-apps are isolated modules loaded through a versioned manifest.

## Provisional technology choices
- Frontend: React + Vite + TypeScript.
- State: Zustand only where shared mutable state is justified; local component state by default.
- Styling: token-based CSS and accessible primitives; visual direction is dark spatial glass with restrained motion.
- Client persistence: IndexedDB for durable offline data; Service Worker for shell/content caching.
- Backend: Google Apps Script, Sheets, Drive, PropertiesService, LockService, CacheService, and triggers, subject to Phase 0 validation.
- Hosting: undecided between HtmlService as primary runtime and GitHub Pages as an external presentation/runtime. Decision depends on browser transport and authentication tests.
- Testing: unit, component, contract, and real-browser integration tests.

## Logical layers
1. Presentation shell — desktop/mobile navigation, windows, dock, command palette.
2. App runtime — built-in React apps, sandboxed external apps, sanitized Markdown.
3. Registry — schema validation, compatibility, permissions, feature flags.
4. Client platform services — storage, offline queue, localization, telemetry, transport.
5. Transport adapters — HtmlService RPC and external HTTP adapter, separately tested.
6. Backend application — router, validation, authorization, domain services.
7. Persistence adapters — Sheets for structured low-volume records, Drive for artifacts/backups, CacheService for expendable cache.
8. Operations — triggers, health checks, audit events, backup/restore.

## Consistency and reliability
- Sheets operations are not ACID transactions. Use a single-writer/lock discipline for critical mutations, explicit idempotency keys, append-only audit records where feasible, and compensating actions where atomic multi-row changes cannot be guaranteed.
- LockService coordinates script executions; it does not create database transactions.
- CacheService entries may disappear and must always be reconstructible.
- Triggers are maintenance schedulers, not durable always-on workers.
- Use batch reads/writes, bounded lock waits, and quota-aware jobs.
- Durable server-side acceptance must precede user-visible confirmation.
- Client offline operations remain pending until reconciled with the server.

## Security boundaries
- Backend validates all input and authorizes every privileged operation.
- Admin credentials and signing material remain in Script Properties or another server-side secret store.
- Never embed admin tokens in static JS or expose them to third-party iframes.
- Use expiring sessions, CSRF/origin strategy validated by transport tests, rate limits, audit logs, and secret rotation.
- Sandboxed iframe messages require exact origin/source checks, schema validation, nonce/handshake, and capability scoping.
- Markdown and README content must be sanitized; external links should use safe rel attributes.

## Performance principles
- Define budgets after measuring baseline devices and target networks.
- Do not promise sub-50ms or sub-100ms GAS responses.
- Keep animation local to the browser; server telemetry is polled and timestamped.
- Add workers, OffscreenCanvas, or WASM only after profiling proves a bottleneck.

## Deferred by design
Integration of existing repositories is Phase 9 and must not block the first standalone release.
