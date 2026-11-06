# Next Task — Review interface evidence, validate social previews, and close owner gates before Phase 7

**Task ID:** P3-08  
**Title:** Complete remaining project evidence, external share validation, and owner acceptance before Phase 7  
**Status:** Eight bilingual dossiers, eight bilingual architecture diagrams, 16 static case-study pages, 17 PNG social cards plus 17 SVG sources, GlobalCart desktop/mobile storefront screenshots, and twelve reviewed interface screenshots across GlobalCart, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse are implemented. Repository CI passed **46/46 tests** and all three build targets on `dc991c4a90aad92ec4006332fffccf04fdd09951`. Current Chromium/axe QA passed 17/17 routes and 34/34 desktop/mobile checks with zero violations; 34 color-contrast incomplete checks remain for human visual review. GitHub Pages build passed on the same SHA and deployment run `42238363799` was still in progress at the last checkpoint. Cloudflare and Apps Script actual deploy jobs were skipped because required repository secrets are unavailable.

See [DEPLOYMENT-TARGETS.md](DEPLOYMENT-TARGETS.md) for independent host build/deploy paths and the remaining credential gates.

## Current implementation
- Public bilingual portfolio is the default root experience; Spatial OS is secondary.
- A dedicated Chromium workflow now opens all 17 public portfolio routes (homepage plus 16 bilingual case studies), checks each at 1440×1000 and 390×844, validates language/direction, canonical URL, one H1/main landmark, image alt attributes, and keyboard skip navigation. Latest run [42234110102](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110102) passed **17/17 routes, 34/34 viewport checks, 0 failures**; report artifact: [portfolio-browser-qa-report](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110102/artifacts/13510613719).
- Bilingual skip navigation is implemented on the homepage and interactive/static case-study routes; its contract passes. Real keyboard-only, screen-reader, and device accessibility review remains open.
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
- Repository CI [42238363801](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363801) passed on current main SHA `dc991c4a90aad92ec4006332fffccf04fdd09951`: TypeScript, three-target builds, artifacts, and **46/46 contract tests**.
- Portfolio Browser QA [42238363900](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363900) passed on the same SHA: **17/17 routes, 34/34 viewport checks, zero axe violations, zero workflow failures**. The 34 incomplete axe records are color-contrast checks which require manual visual review; this is not a formal WCAG certification.
- GitHub Pages build on current SHA succeeded; deployment [42238363799](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363799) was still running at the last checkpoint. The last confirmed successful Pages deployment is run [42236669522](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42236669522) after retry on SHA `65d0e841b95f947d671f88d07c32362984cf36f1`.
- Cloudflare Pages actual deployment was skipped because `CLOUDFLARE_API_TOKEN` is missing; Apps Script deployment was skipped because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are missing.
- The existing Pages artifact audit found 16 bilingual case-study routes and 17 valid 1200×627 social PNG cards. Real LinkedIn/Facebook crawler rendering/cache refresh remains unverified.

## Next implementation sequence
1. [x] Confirm current-main Repository CI, TypeScript, Pages/GAS builds, artifact upload, and 40/40 contract tests. [x] Confirm Pages build and deployment for the dynamic-sitemap application source.
2. [x] Inspect the actual Pages artifact: all 17 HTML routes, canonical/Open Graph/JSON-LD/hreflang metadata, 17 current-date sitemap targets, and all 17 PNG signature/dimension checks passed. [ ] Still validate actual rendering and cache refresh through LinkedIn Post Inspector and Facebook Sharing Debugger; add alternate formats only if a real client requires them.
3. [x] Prune ten unreferenced local screenshot copies from the Pages artifact while retaining the immutable source files; ZIP size reduced by 51.6% (7,870,673 → 3,811,158 bytes).
4. Keep AetherFlow screenshot acceptance blocked until its upstream owner resolves the M08 README versus M07 landing/dashboard labels and updates legacy `pooya16pg-spec.github.io` links/CORS guidance. The new `https://pooya-labs.github.io/aetherflow/` landing route returned HTTP 200 in portfolio capture run 42234110094, but that proves page reachability only; API CORS has not been verified. Keep the independent AetherFlow repository untouched during portfolio work.
5. Extend ORBIT evidence beyond Overview (Incidents, Metrics, Logs, Traces); add focused NexusCanvas rack/graph/snapshot states and LuminaGlass export/Audio Lab/task-board states where they materially improve the case studies.
6. Capture AuraPulse connected-feed and fallback states in a browser/network context where the actual public ticker request is allowed; keep current images explicitly simulated until then.
7. Obtain Pooya's confirmation of biography/positioning, first three featured projects, attribution wording, project statuses, contact channel, and approved assets.
8. Complete AetherFlow M08 and license decision; complete ORBIT's Apps Script smoke and human device accessibility review.
9. Reconcile GlobalCart source documentation and complete M09.6 gallery/deploy E2E acceptance on an exact current SHA.
10. Verify Salon Booking Apps Script 1.4.0, TimeBlocks, relay/bootstrap/booking, actual salon configuration, and FCM push acceptance; use only owner-approved synthetic/redacted imagery.
11. Complete current-source accessibility, responsive, keyboard, RTL/LTR, reduced-motion, browser, and performance QA.
12. After the factual/evidence gate, begin Phase 7: full redesign with two owner feedback rounds; V1 remains blocked until explicit approval.

## Release boundaries
- No generic customer login/dashboard is added to the portfolio.
- Do not claim real payments, real trades, live infrastructure metrics, hosted production backends, real booking notifications, formal WCAG conformance, or production readiness unless evidence is added to the source record.
- Do not modify previous project repositories.
- Do not treat Playwright capture artifacts as human-reviewed or publishable evidence until a person visually inspects them.
- No V1 tag/release while any mandatory item in PROJECT-CONTENT-AUDIT.md or Phase 7/8 remains open.
