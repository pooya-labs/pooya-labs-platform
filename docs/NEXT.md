# Next Task — Review interface evidence, validate social previews, and close owner gates before Phase 7

**Task ID:** P3-08  
**Title:** Complete remaining project evidence, external share validation, and owner acceptance before Phase 7  
**Status:** Eight bilingual dossiers, eight bilingual architecture diagrams, 16 static case-study pages, 17 PNG social cards plus 17 SVG sources, GlobalCart desktop/mobile storefront screenshots, and ten reviewed interface screenshots across ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse are implemented. Screenshot capture is artifact-only; dedicated checksum-gated workflows publish only reviewed assets. Current main CI passed 41/41 tests and the dynamic-sitemap Pages build/deployment succeeded.

## Current implementation
- Public bilingual portfolio is the default root experience; Spatial OS is secondary.
- Eight project case studies include source-grounded role/attribution, challenge, architecture, implementation details, engineering decisions, verification evidence, boundaries, and direct source/CI references.
- Eight architecture diagrams are generated in Persian and English from documented system flows. They are diagrams, not product screenshots or production evidence.
- Sixteen static HTML case-study routes are emitted at build time: `/projects/<slug>/` and `/en/projects/<slug>/`. Each includes rendered article content, canonical URL, hreflang alternates, JSON-LD, social metadata, and source links.
- Seventeen social preview PNGs (homepage + eight projects × two languages) are primary Open Graph images at 1200×627; seventeen matching SVG sources remain alongside them.
- Sitemap and robots.txt advertise the canonical static routes.
- GlobalCart includes visually inspected desktop and mobile storefront screenshots pinned to source commit `5ca43e40ff101e673ee7cf261850bff0a679047c`; desktop is the hero and mobile is a dedicated screenshot card.
- ORBIT now has visually reviewed desktop and mobile Overview captures pinned to portfolio commit `77bc3ce0c41533661b8970d2527f4cd94b8a4341`; additional Incidents/Metrics/Logs/Traces states remain pending.
- Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse each have reviewed desktop/mobile captures pinned to portfolio commit `b0c538b2523daf96700b731a959d690dd3457f7e`. AuraPulse images must remain labelled simulated/illustrative; the capture run's optional Binance ticker request failed CORS from the automation origin.
- AetherFlow's preview URL now uses the current Pages host, but its screenshot remains withheld until the live page's M07 badge is reconciled with the source audit's M08 status.
- Three evidence-integrity contract tests check local asset existence, immutable bilingual hero metadata, and that screenshot capture cannot auto-publish.
- The exact per-project gaps remain in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).

## Verified checks
- Repository CI [42218346116](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42218346116) passed on main SHA `12dbfd33adba84f7b67153a1700f3518182e18bc`: TypeScript, Pages/GAS builds, artifact upload, and **41/41 contract tests**.
- Pages build and deployment [42217711525](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42217711525) both succeeded for application-source SHA `654da2cf1e9e975673a0d4e287fffa9125f1117c`, including dynamic sitemap generation and duplicate screenshot pruning.
- The published Pages ZIP is 3,811,158 bytes, down 51.6% from the pre-pruning 7,870,673-byte artifact. The final artifact audit confirms all 17 current-date sitemap URLs, 16 bilingual case-study pages, and 17 valid 1200×627 PNG social cards.
- Public preview: https://pooya-labs.github.io/pooya-labs-platform/

## Next implementation sequence
1. [x] Confirm current-main Repository CI, TypeScript, Pages/GAS builds, artifact upload, and 41/41 contract tests. [x] Confirm Pages build and deployment for the dynamic-sitemap application source.
2. [x] Inspect the actual Pages artifact: all 17 HTML routes, canonical/Open Graph/JSON-LD/hreflang metadata, 17 current-date sitemap targets, and all 17 PNG signature/dimension checks passed. [ ] Still validate actual rendering and cache refresh through LinkedIn Post Inspector and Facebook Sharing Debugger; add alternate formats only if a real client requires them.
3. [x] Prune ten unreferenced local screenshot copies from the Pages artifact while retaining the immutable source files; ZIP size reduced by 51.6% (7,870,673 → 3,811,158 bytes).
3. Resolve AetherFlow's public UI/documentation mismatch before screenshot acceptance: README says M08 is in progress, while the landing page and dashboard still show M07; reconcile the previous `pooya16pg-spec.github.io` links and dashboard CORS origin with the current `pooya-labs.github.io` host, then capture/review a current desktop/mobile screenshot. Keep the independent AetherFlow repository untouched during portfolio work.
4. Extend ORBIT evidence beyond Overview (Incidents, Metrics, Logs, Traces); add focused NexusCanvas rack/graph/snapshot states and LuminaGlass export/Audio Lab/task-board states where they materially improve the case studies.
5. Capture AuraPulse connected-feed and fallback states in a browser/network context where the actual public ticker request is allowed; keep current images explicitly simulated until then.
6. Obtain Pooya's confirmation of biography/positioning, first three featured projects, attribution wording, project statuses, contact channel, and approved assets.
7. Complete AetherFlow M08 and license decision; complete ORBIT's Apps Script smoke and human device accessibility review.
8. Reconcile GlobalCart source documentation and complete M09.6 gallery/deploy E2E acceptance on an exact current SHA.
9. Verify Salon Booking Apps Script 1.4.0, TimeBlocks, relay/bootstrap/booking, actual salon configuration, and FCM push acceptance; use only owner-approved synthetic/redacted imagery.
10. Complete current-source accessibility, responsive, keyboard, RTL/LTR, reduced-motion, browser, and performance QA.
11. After the factual/evidence gate, begin Phase 7: full redesign with two owner feedback rounds; V1 remains blocked until explicit approval.

## Release boundaries
- No generic customer login/dashboard is added to the portfolio.
- Do not claim real payments, real trades, live infrastructure metrics, hosted production backends, real booking notifications, formal WCAG conformance, or production readiness unless evidence is added to the source record.
- Do not modify previous project repositories.
- Do not treat Playwright capture artifacts as human-reviewed or publishable evidence until a person visually inspects them.
- No V1 tag/release while any mandatory item in PROJECT-CONTENT-AUDIT.md or Phase 7/8 remains open.
