# Project content audit — pre-release source of truth

**Last reviewed:** 2026-11-06  
**Purpose:** Separate facts supported by the eight source repositories from information/evidence still required before Pooya Labs V1.  
**Rule:** Do not fill gaps with assumptions. Keep verified descriptions in the portfolio and keep missing items as release checklist tasks.

## What is already populated

The portfolio now has eight bilingual project dossiers. Each includes the documented role/attribution (or explicitly says when the source does not identify an individual), architecture, implementation details, engineering decisions, verification evidence, and links to source documentation and relevant CI runs. Case-study pages render these in Persian and English. Source repositories remain independent; no project code was copied into this portfolio.

## Per-project audit

### 01 — AetherFlow

**Recorded from source**
- Rust/Tokio workflow engine with Axum control plane, PostgreSQL persistence, NATS JetStream, outbox/inbox delivery, Wasmtime extension support, CLI, typed Rust SDK, versioned API/OpenAPI, and OpenTelemetry.
- Durable workflow/task state, recoverable workers, leases/heartbeats/epoch fencing, tenant-scoped routes, and FORCE ROW LEVEL SECURITY on ten tables.
- M00–M07 are recorded complete; M08 production engineering remains in progress.
- Restore-to-runtime evidence: [PostgreSQL/NATS run 41882781118](https://github.com/pooya-labs/aetherflow/actions/runs/41882781118).
- API process-kill/restart evidence: [run 42011508896](https://github.com/pooya-labs/aetherflow/actions/runs/42011508896).
- Performance results are restricted to matching AMD EPYC 9V45 runner/workload fingerprints; they are lab results, not production SLO or capacity guarantees.

**Required before portfolio release**
- [ ] Confirm exact public attribution/role wording. The current README does not identify an individual author or provide a personal contribution breakdown.
- [x] Add a bilingual architecture/execution-flow diagram based on the documented Rust, PostgreSQL, JetStream, Worker, and observability boundaries.
- [ ] Capture an owner-approved current UI/API/worker screenshot; no actual product screenshot was found in the repository.
- [ ] Resolve the public landing-page milestone label mismatch before using a current screenshot: the live page still displays M07 while the source audit records M08 in progress. The portfolio currently withholds AetherFlow UI screenshots until the public source evidence is reconciled.

**Verified source detail (2026-11-06)**
- The current AetherFlow README says M00–M07 are complete and M08 is in progress.
- The public landing page still labels its execution preview `Control plane / M07`, and `dashboard/index.html` still labels the page `Observability / M07`.
- The dashboard's CORS setup notice still asks operators to allow `https://pooya16pg-spec.github.io`; the portfolio's current Pages preview is `https://pooya-labs.github.io/aetherflow/`. The public-host change therefore must be reconciled with the actual API CORS allowlist before describing hosted dashboard/API connectivity as verified.
- The AetherFlow README still advertises its previous `pooya16pg-spec.github.io` live URLs. The portfolio points to the currently captured `pooya-labs.github.io` host, but the AetherFlow source repository remains the authority for the dashboard host and CORS policy.
- These are upstream AetherFlow documentation/UI consistency items. The portfolio work does not modify the independent AetherFlow repository. Keep its UI screenshot withheld until the project owner aligns its visible milestone labels, public host links, and CORS origin guidance with the current README and deployment.
- [ ] Recheck M08 against the current main SHA: in-flight worker completion during API outage, additional distinct recovery/failure-injection cases, and the fingerprint-aware benchmark comparator. Resolve or clearly describe any outstanding schema/CI failure.
- [ ] Record the owner's license choice; README states license selection is still pending.
- [ ] Confirm which benchmark/recovery results may be quoted publicly and retain exact run/source links.
- [ ] Keep production-readiness, exactly-once, and SLO claims out unless the source later provides evidence.

### 02 — ORBIT

**Recorded from source**
- Stable v1.0.0 for the stated portfolio-demo scope.
- Ten observability areas: Overview, Incidents, Alerts, Notifications, Deployments, SLOs, Audit, Metrics, Logs, and Traces.
- Public architecture is a static Pages dashboard plus a separate Apps Script synthetic-data demo. The local engineering stack (Go API, PostgreSQL, OpenTelemetry Collector, Prometheus, Loki, Tempo) is not a hosted production service.
- Release CI, Security, and Pages evidence are linked from the dossier. Demo notifications are simulated; no real webhook/email is sent.

**Evidence checkpoint (2026-11-06)**
- The ORBIT case study now uses a visually reviewed desktop hero and mobile screenshot, committed at `77bc3ce0c41533661b8970d2527f4cd94b8a4341` and referenced through immutable raw-GitHub URLs. Both images show the public synthetic-data demo and were checked for private data, browser errors, failed requests, and horizontal overflow.
- The capture workflow remains artifact-only. A separate approval-manifest publisher verifies exact artifact identity, PNG signatures, byte sizes, and SHA-256 checksums before it commits explicitly selected screenshots.

**Required before portfolio release**
- [x] Add a bilingual architecture diagram that keeps the public Apps Script demo path separate from the local Go/OTel/Prometheus/Loki/Tempo engineering path.
- [x] Capture and visually approve the Overview dashboard in desktop and mobile sizes; both screenshots are in the case study and pinned to immutable portfolio commits. The current images show synthetic demo data and no private records.
- [ ] Capture additional real dashboard states for Incidents, Metrics, Logs, and Traces; these are not covered by the current Overview screenshots.
- [ ] Have the owner run and record an Apps Script demo smoke: bootstrap, a mutation in a synthetic workspace, reload/refresh persistence, and an isolated second browser profile. The external verification environment could not independently validate the owner's Apps Script deployment.
- [ ] Complete real-device TalkBack and VoiceOver sessions and the remaining human keyboard/chart-table review; automated axe/Playwright/NVDA runs do not constitute formal WCAG certification.
- [ ] Keep synthetic data, non-hosted Go/PostgreSQL/OTel infrastructure, and simulated notifications clearly disclosed.

### 03 — Pooya.OS

**Recorded from source**
- Authored by Pooya; static Next.js 16 / React 19 / TypeScript desktop-style portfolio using Zustand, Tailwind CSS, and Framer Motion.
- Window manager, four project case studies, local allowlisted CLI, Design Token inspector/X-Ray labels, and browser-side frame monitor.
- No backend, database, accounts, API routes, or real operating-system shell.
- Latest recorded Pages deployment in the README history is linked from the dossier.

**Required before portfolio release**
- [x] Add a bilingual architecture diagram showing the static Pages export, Next/React workspace, Zustand state, and browser-local tools; the no-backend boundary is explicit.
- [x] Capture and visually review current desktop and mobile interface screenshots, including the engineering-profile window; both are committed and included in the case study.
- [ ] Run current-source browser, keyboard, responsive, reduced-motion, and accessibility checks; the README did not provide a consolidated current QA report at audit time.
- [ ] Confirm whether the project is still actively maintained or should be labelled as a completed experiment/demonstration.

### 04 — NexusCanvas

**Recorded from source**
- Authored by Pooya; client-side Next.js 16 / React 19 / TypeScript / Tailwind / SVG topology tool.
- Gateway/service/AI-worker/database/cache nodes, canvas and rack views, graph analysis, cycle/path checks, local stress simulation, validated versioned snapshots, and Docker Compose starter generation.
- BroadcastChannel synchronizes only same-origin tabs in the same browser. Metrics shown by the tool are modelled inputs, not measurements from real containers. No server, account system, live telemetry, or remote collaboration.
- Latest recorded Pages deployment is linked from the dossier.

**Required before portfolio release**
- [x] Add a bilingual architecture diagram for the browser graph editor, graph analysis, validated model, local simulation, and snapshot/Compose export.
- [x] Capture and visually review representative desktop and mobile screenshots of the live canvas/topology workspace.
- [ ] Add focused evidence for rack view, graph analysis, and snapshot import/export; these states are not represented by the current two screenshots.
- [ ] Run current-source browser, keyboard, mobile, reduced-motion, and accessibility checks; no consolidated current QA report was found in the README.
- [ ] Confirm whether generated Compose output has an example verified by a real local Docker Compose run; otherwise continue calling it a starter, not a deployable production topology.

### 05 — LuminaGlass

**Recorded from source**
- Authored by Pooya; Next.js 16 / React 19 / TypeScript / Tailwind browser lab.
- SVG optical controls, Canvas PNG export, Web Audio API with five Biquad filters, presets, local task board, and cleanup of audio/microphone/object URL resources.
- Presets, EQ, and tasks are browser-local. Audio is not uploaded to a server; microphone requires secure context and user permission.
- Latest recorded Pages deployment is linked from the dossier.

**Required before portfolio release**
- [x] Add a bilingual architecture diagram showing the separate SVG/Canvas optical path, Web Audio filter chain, and browser-local preset/task storage.
- [x] Capture and visually review desktop and mobile screenshots of the Optical Studio.
- [ ] Add focused evidence for PNG export, Audio Lab, and the task board; the current images do not demonstrate all four features.
- [ ] Run current-source tests for mic permission denial, stop/source switching, AudioContext/resource cleanup, and reduced-motion/accessibility behavior.
- [ ] Do not claim cloud sync, AI audio processing, or server persistence.

### 06 — AuraPulse

**Recorded from source**
- Authored by Pooya; Next.js 16 / React 19 / TypeScript market-data dashboard and browser-local paper-trading simulator.
- Binance 24-hour BTC/ETH/SOL tickers are read when reachable; fallback data is labelled illustrative. NVDA/AI is a synthetic demo instrument. Candle/order-book/pressure/AI-style markers may be illustrative.
- Local simulation includes buy/sell, average entry, valuation, realized/unrealized P&L, an illustrative 0.10% fee, history, and reset.
- No exchange API key or real order execution. Account state belongs to the current browser/device.
- Latest recorded Pages deployment is linked from the dossier.

**Required before portfolio release**
- [x] Add a bilingual architecture diagram separating Binance public ticker input, labelled illustrative fallback, browser dashboard, and local paper-trading storage; no exchange order path is shown.
- [x] Capture and visually review desktop and mobile screenshots of the clearly labelled simulated workspace; the images identify the chart as illustrative and the account as simulated.
- [ ] Capture separate connected-ticker and disconnected/fallback states plus a focused paper-trading flow. The current automation-origin browser run logged a CORS failure for the optional Binance ticker request, so these screenshots must not be presented as proof of live market connectivity.
- [ ] Re-run tests for feed availability/fallback labelling, local storage reset, arithmetic, and browser/accessibility behavior on current source.
- [ ] Ensure the portfolio never presents illustrative indicators as live market data or the project as a real trading platform.

### 07 — GlobalCart

**Recorded from source**
- README identifies Pooya as owner and product engineer.
- The source repository contains actual desktop and mobile storefront homepage screenshots; both are now embedded in the GlobalCart case study and pinned to immutable source commit `5ca43e40ff101e673ee7cf261850bff0a679047c`.
- Current line is **0.2.3-dev / M09.6**, not 1.0.0.
- Static Next.js storefront with a local 1,000-product Amazon Berkeley Objects snapshot and self-hosted WebP galleries, plus a separate runtime Shopify Global Catalog discovery path through a constrained Cloudflare Worker.
- Shopify runtime search is not a persisted local catalog: results and merchant images are not cached or re-hosted; merchant identity, seller URL, and seller-supplied price/availability remain visible.
- Local cart/checkout/orders/returns are simulations; no real payment, inventory reservation, shipping, or fulfillment occurs.
- Local Go/PostgreSQL/OpenAPI backend is a development/CI foundation; current public API endpoints are read-only and are not hosted production infrastructure.
- Latest Lighthouse lab and Shopify catalog smoke runs were successful on current HEAD at audit time. A Browser E2E run was still in progress on a prior commit; a Pages deployment of that previous commit succeeded.

**Required before portfolio release**
- [ ] Complete M09.6: verify all 1,000 imported product galleries, all referenced local image files, deploy smoke, and desktop/mobile detail/gallery E2E on the exact current SHA.
- [ ] Read and record the final Browser E2E result and publish the same successful code SHA to Pages.
- [ ] Reconcile stale/conflicting source-document statements about which catalog path is active (local ABO snapshot versus Shopify runtime discovery) across README, PROJECT_CONTEXT, ARCHITECTURE, DATA_SOURCES, and REAL_CATALOG_MIGRATION.
- [x] Add a bilingual architecture diagram for the local ABO snapshot, no-store Shopify discovery proxy, TGJU FX snapshot, storefront, and simulated cart.
- [x] Locate, visually inspect, and embed the actual desktop and mobile storefront homepage screenshots from the source repository; both show the storefront interface without customer personal data, use device-specific captions, and are pinned to commit `5ca43e40ff101e673ee7cf261850bff0a679047c`.
- [x] Link the original screenshot evidence folder directly from the GlobalCart case-study source references.
- [ ] Review the embedded screenshots against the latest published GlobalCart HEAD and capture missing product-detail/gallery states if they materially improve the case study.
- [ ] Complete physical-device, manual screen-reader, human RTL/LTR, and normal-network checks.
- [ ] Keep 0.2.3-dev and do not tag 1.0.0 until manual visual approval and all repository release gates pass.

### 08 — Salon Booking

**Recorded from source**
- README identifies Pooya as engineer/creator and the salon owner as product owner.
- Current frontend release line is 0.7.0; Apps Script backend target is 1.4.0 with rolling 30-day owner sessions.
- Active architecture is Pages frontend → hidden Apps Script iframe bridge → Apps Script API → private Google Sheets. Firebase Cloud Messaging is the manager push path; optional email is off by default. Legacy Cloudflare Worker/D1 is retained only for recovery and is not active.
- Implemented journeys include Jalali availability, idempotent booking, reference and one-time customer token, customer lookup/cancellation, owner sign-in/session, booking status management, services, multi-interval hours, exceptions, time blocks, audit, and rate limits.
- Real customer data must not be entered into the public demo until owner-side deployment/configuration and acceptance are verified.

**Required before portfolio release**
- [ ] Verify the latest CI and Pages runs for the current main commit; they were queued when the source was inspected.
- [ ] Confirm deployment of Apps Script 1.4.0, SALON_RELAY_URL, additive TimeBlocks/schema setup if required, fresh bootstrap/login, and end-to-end booking/lookup/cancellation/overlap checks.
- [ ] Verify actual salon timezone, business hours, services, prices, contact details, and booking/cancellation policy with the product owner. Do not publish placeholders as confirmed facts.
- [ ] Verify Firebase project, FCM API, web config/VAPID, manager-device registration, and an actual background push on the manager's Android device before describing push as live.
- [x] Add a bilingual architecture diagram for the Pages frontend, hidden Apps Script bridge, Apps Script API, private Sheets, and FCM manager-push path.
- [ ] Capture only synthetic/demo screens or owner-approved redacted screenshots; never expose client names, phone numbers, booking references, or tokens.
- [ ] Confirm whether the product owner permits public case-study details and the credit wording to be published.

## Global portfolio information still needed from Pooya

- [ ] Approve the exact public biography, headline, and positioning (the current copy is a draft).
- [ ] Choose the first three featured projects and approve the order of all eight.
- [ ] Confirm personal role/contribution statements project by project. AetherFlow's README does not identify an individual author; other project README files provide different attribution wording.
- [ ] Approve each project status and the precise public claims after checking current source and current workflow evidence.
- [ ] Choose the contact channel to publish (do not invent an email or social profile).
- [ ] Supply/approve any personal portrait or owner-provided assets. Do not substitute stock imagery.
- [ ] Approve the generated architecture diagrams, screenshots, captions, and alt text; confirm that no confidential/client data appears.
- [ ] Give feedback on final visual direction, typography, color, animation, navigation, case-study density, and mobile reading flow in the two required redesign rounds.

## Required order before V1

1. Finish source-backed technical content and verify statuses against each current source repository.
2. Complete the per-project evidence and owner-review tasks above; record unresolved items as blockers rather than writing around them.
3. [x] Build crawler-readable Persian/English static case-study pages with canonical/hreflang/JSON-LD, 17 PNG social preview cards (homepage plus eight projects × two languages), and matching SVG sources. [x] Inspect the actual Pages artifact: 17 generated HTML routes resolve, canonical/OG/hreflang/JSON-LD metadata parses, sitemap targets exist, and all 17 PNG cards have valid signatures and 1200×627 dimensions. [ ] Validate actual rendering and cache refresh with external LinkedIn/Facebook crawlers; source/artifact validation alone is not platform acceptance.
4. Complete the full visual redesign with Pooya's first and second feedback rounds.
5. Complete exact-SHA CI/Pages, accessibility, responsive, browser, performance, link, metadata, and manual acceptance checks.
6. Obtain explicit owner approval and only then publish V1.

**Release rule:** no V1 tag or release while any mandatory checklist item above is unchecked. Do not publish unsupported role, skill, performance, live-service, or production-readiness claims.
