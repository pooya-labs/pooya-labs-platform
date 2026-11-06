# Project content audit — pre-release source of truth

**Last reviewed:** 2026-11-06  
**Purpose:** Separate facts supported by the eight source repositories from information/evidence still required before Pooya Labs V1.  
**Rule:** Do not fill gaps with assumptions. Keep verified descriptions in the portfolio and keep missing items as release checklist tasks.

## What is already populated

The portfolio now has eight bilingual project dossiers. Each includes the documented role/attribution (or explicitly says when the source does not identify an individual), architecture, implementation details, engineering decisions, verification evidence, and links to source documentation and relevant CI runs. Case-study pages render these in Persian and English. Source repositories remain independent; no project code was copied into this portfolio.

## Artifact-only interface recapture review — 2026-11-06

**Capture evidence:** workflow [42235240283](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42235240283), artifact [13510233762](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42235240283/artifacts/13510233762), with `capture-report.json` and twelve PNG candidates:
- AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse; each at 1440×1000 and 390×844.
- All twelve page requests returned HTTP 200 and all twelve viewport diagnostics reported no horizontal overflow.
- The capture runner reported no page/console/network errors for AetherFlow, ORBIT, Pooya.OS, NexusCanvas, or LuminaGlass. AuraPulse reported a failed request to Binance's `/api/v3/ticker/24hr` endpoint because the browser origin `https://pooya-labs.github.io` did not receive an `Access-Control-Allow-Origin` response.
- All twelve individual screenshots were visually inspected at full size on 2026-11-06. This is a visual review of candidate evidence, not owner approval or permission to publish. The files remain in the workflow artifact only; none was committed to the public portfolio.

**Per-project visual findings**
- **AetherFlow:** Desktop and mobile layouts are composed cleanly, but both show `CONTROL PLANE / M07` while the source README records M08 in progress. The desktop header also visibly contains two `Dashboard` navigation labels. Keep both screenshots withheld until the upstream owner reconciles milestone labels/navigation, public host links, and dashboard/API CORS instructions.
- **ORBIT:** Desktop and mobile screenshots clearly show `DEMO ENVIRONMENT` and explicitly say the metrics, services, and incidents are illustrative; the side rail also says demo telemetry/sample rather than live usage. These are useful Overview candidates, not evidence of a real connected infrastructure. Incidents/Metrics/Logs/Traces focused states remain missing.
- **Pooya.OS:** Both screenshots show the profile portrait and the X-Ray/engineering-profile window. The owner must approve the visible portrait and verify that the displayed frame-time/FPS indicators are demo/interface telemetry before these candidates replace any existing approved media.
- **NexusCanvas:** Both screenshots expose the graph editor and node inspector; the desktop identifies modelled latency/throughput, and the side panel explicitly says telemetry is illustrative, not live. They are candidates for the main canvas only; rack view, focused graph analysis, and snapshot import/export still need dedicated evidence.
- **LuminaGlass:** Both screenshots show the optical-glass editor, preset list, and PNG export area, with Blur set to 32px. The preset-title/input area is heavily blurred in this state. Keep as a candidate; add a clearer low/no-blur or successful-export capture, plus Audio Lab and task-board states, before treating the case study as complete.
- **AuraPulse:** Desktop and mobile screenshots visibly carry a `SIMULATED` badge and the chart is labeled illustrative OHLC. This supports an explicitly simulated UI showcase only. The same capture run's Binance ticker request failed CORS, so do not describe the screenshot as live market data or a verified connected-feed capture.
- **Salon Booking:** Deliberately excluded from this run because a usable capture requires owner-approved, privacy-reviewed synthetic/redacted content.

**Publication rule:** keep these twelve new files separate from previously approved/pinned screenshots. Promote a candidate only through the existing checksum-gated approval-manifest workflow after owner approval and any project-specific factual/privacy checks.

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
- [ ] Capture and approve current AetherFlow UI evidence. The portfolio's artifact-only capture workflow [42234110094](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110094) reached the current `pooya-labs.github.io` landing route and produced an unreviewed candidate, but the visible milestone still reads M07.
- [ ] Resolve the public landing-page milestone mismatch before screenshot acceptance: README says M08 is in progress while the landing page and dashboard still display M07. The portfolio continues to withhold AetherFlow UI imagery.

**Verified source detail (2026-11-06; read-only recheck)**
- Inspected upstream `pooya-labs/aetherflow` main at `c7cb553f0751514df0d916e69c29807636e66c67`. README says M00–M07 are complete and M08 is in progress.
- The same source revision's `index.html` still displays `Control plane / M07`, and `dashboard/index.html` still displays `Observability / M07`.
- The portfolio capture workflow [42234110094](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110094) reached `https://pooya-labs.github.io/aetherflow/` with HTTP 200 and no failed page request. This proves landing-page reachability only, not API connectivity.
- The AetherFlow README's exact CORS guidance and dashboard/index.html notice now use `https://pooya-labs.github.io`. Some landing-page source/repository/navigation links still point to the old `pooya16pg-spec` account. Dashboard API base URL is operator-entered, and its client requires remote API URLs to use HTTPS.
- No live API preflight or successful hosted dashboard/API exchange was verified. Do not describe the dashboard as connected on the new origin until the deployed API CORS allowlist is tested from the real browser origin.
- Pages deployment [42239430319](https://github.com/pooya-labs/aetherflow/actions/runs/42239430319) passed on exact source `c7cb553`. Rust CI [42239384393](https://github.com/pooya-labs/aetherflow/actions/runs/42239384393), PostgreSQL schema [42239384017](https://github.com/pooya-labs/aetherflow/actions/runs/42239384017), and supply-chain/security [42239384049](https://github.com/pooya-labs/aetherflow/actions/runs/42239384049) passed on parent source `fc6e44b`; the child commit only applies rustfmt to a CORS test. These results do not establish live browser/API CORS behavior.
- This was a read-only inspection; the independent AetherFlow repository was not modified. Keep its UI screenshot withheld until the owner reconciles the M07 page badge with M08 README status, removes duplicate Dashboard navigation, aligns remaining public/source links, verifies live API preflight from the real browser origin, and approves the new screenshot.
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
- Product version **1.0.0** was released on 2026-11-05 and marked owner-accepted in the repository release record; official tag: [v1.0.0](https://github.com/pooya-labs/salon-booking/releases/tag/v1.0.0).
- The frontend is React / TypeScript / Vite on GitHub Pages. The active backend path is the hidden iframe bridge → Google Apps Script → private Google Sheets; Firebase Cloud Messaging is the manager push path. Cloudflare Workers/D1 are legacy recovery material, not the active runtime.
- The Apps Script source version is **1.5.3** (APP_VERSION_ in relay/Code.gs); this is distinct from product version 1.0.0.
- Release CI [42086718663](https://github.com/pooya-labs/salon-booking/actions/runs/42086718663) and Pages deployment [42086718821](https://github.com/pooya-labs/salon-booking/actions/runs/42086718821) passed on exact release commit 56ff5cde573eccb3febd7efe2de270f9ded2b7e5. The Pages workflow also recorded a read-only live relay smoke.
- The release record states that the product owner accepted the operational setup, schedule configuration, and manager notification checks on 2026-11-05.
- The public case study must still avoid customer personal information; no unredacted bookings, phone numbers, names, references, or tokens may appear in screenshots.

**Required before portfolio release**
- [ ] Confirm the salon product owner’s permission to publish the case-study details and attribution in this portfolio.
- [ ] Capture only synthetic/demo screens or owner-approved redacted screenshots; never expose customer names, phone numbers, booking references, or tokens.
- [ ] Pooya to approve the exact public project description, attribution, and whether the official v1.0.0 release should be featured.

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
3. [x] Build crawler-readable Persian/English static case-study pages with canonical/hreflang/JSON-LD, 17 PNG social preview cards (homepage plus eight projects × two languages), and matching SVG sources. [x] Inspect the actual Pages artifact: all 17 generated HTML routes resolve, every sitemap entry has `lastmod` equal to the 2026-11-06 build date, canonical/OG/hreflang/JSON-LD metadata parses, and all 17 PNG cards have valid signatures and 1200×627 dimensions. [x] Confirm the deployed artifact omits the ten unused local screenshot duplicates while retaining immutable raw-GitHub image URLs; its ZIP size is 3,811,158 bytes (51.6% smaller than 7,870,673 bytes). [ ] Validate actual rendering and cache refresh with external LinkedIn/Facebook crawlers; source/artifact validation alone is not platform acceptance.
4. Complete the full visual redesign with Pooya's first and second feedback rounds.
5. Complete exact-SHA CI/Pages, accessibility, responsive, browser, performance, link, metadata, and manual acceptance checks.
6. Obtain explicit owner approval and only then publish V1.

**Release rule:** no V1 tag or release while any mandatory checklist item above is unchecked. Do not publish unsupported role, skill, performance, live-service, or production-readiness claims.
