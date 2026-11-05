# Architecture — HtmlService-first baseline

## Product shape
A bilingual, responsive, installable SPA presented as a Spatial Web OS. The platform shell owns window management, navigation, app registry, theme, localization, accessibility, and host adapters. Individual mini-apps are isolated modules loaded through a versioned manifest.

## Hosting decision
- **Primary application runtime:** Google Apps Script HtmlService. The browser loads the application from the deployed GAS Web App and calls server functions with `google.script.run`.
- **GitHub Pages:** public documentation, changelog, design previews, static case studies, and non-privileged demos only. It is not a production client for the GAS backend.
- **Local development:** Vite/dev server with explicitly labeled mock adapters. Local mocks do not prove that a static external origin can call GAS.
- **External clients:** not supported by this backend. Reconsider only if a separately approved backend provides a browser-tested CORS contract; do not add an unreviewed proxy or expose secrets in static assets.

The decision is based on a real Chromium run from the published GitHub Pages origin. Fetch to the deployed GAS `/exec` URL was rejected by browser CORS because the response lacked `Access-Control-Allow-Origin`. The browser could not read an HTTP status or body. This does not prove whether `doPost` executed. The owner separately confirmed that HtmlService `google.script.run` worked.

## Logical layers
1. Presentation shell — desktop/mobile navigation, windows, dock, command palette.
2. App runtime — built-in application modules, sandboxed external apps, sanitized Markdown.
3. Registry — schema validation, compatibility, permissions, feature flags.
4. Client platform services — storage, offline queue, localization, telemetry.
5. Host adapter — a Promise wrapper over HtmlService `google.script.run`; development mocks are separate and clearly labeled.
6. Backend application — allowlisted RPC router, validation, authorization, domain services.
7. Persistence adapters — Sheets for structured low-volume records, Drive for artifacts/backups, CacheService for expendable cache.
8. Operations — triggers, health checks, audit events, backup/restore.

## RPC contract
- Browser calls are asynchronous and must use success/failure handlers.
- Do not assume calls complete in invocation order.
- Keep concurrent in-flight calls below the documented limit of 10; serialize dependent mutations.
- Use versioned request/response envelopes, request IDs, normalized errors, and explicit action allowlists.
- Only top-level functions deliberately exposed to `google.script.run` are public entry points; implementation helpers should end in an underscore.

## Consistency and reliability
- Sheets operations are not ACID transactions. Use a single-writer/lock discipline for critical mutations, explicit idempotency keys, append-only audit records where feasible, and compensating actions where atomic multi-row changes cannot be guaranteed.
- LockService coordinates script executions; it does not create database transactions.
- CacheService entries may disappear and must be reconstructible.
- Triggers are maintenance schedulers, not durable always-on workers.
- Use batch reads/writes, bounded lock waits, and quota-aware jobs.
- Durable server-side acceptance must precede user-visible confirmation.
- Client offline operations remain pending until reconciled with the server.

## Security boundaries
- Backend validates all input and authorizes every privileged operation.
- Admin credentials and signing material remain in Script Properties or another server-side secret store.
- Never embed admin tokens in static JS or expose them to third-party iframes.
- Use expiring sessions, CSRF/origin strategy appropriate to HtmlService, rate limits, audit logs, and secret rotation.
- Sandboxed iframe messages require exact origin/source checks, schema validation, nonce/handshake, and capability scoping.
- Markdown and README content must be sanitized; external links should use safe rel attributes.

## Performance principles
- Define budgets after measuring baseline devices and target networks.
- Do not promise sub-50ms or sub-100ms GAS responses.
- Keep animation local to the browser; server telemetry is polled and timestamped.
- Add workers, OffscreenCanvas, or WASM only after profiling proves a bottleneck.

## Deferred by design
Integration of existing repositories is Phase 9 and must not block the first standalone release.
