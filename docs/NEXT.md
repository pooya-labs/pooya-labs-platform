# Next Task — Complete project evidence, social validation, and owner review before Phase 7

**Task ID:** P3-08  
**Title:** Complete remaining project evidence, external share validation, and owner acceptance before Phase 7  
**Status:** The novels library UI, catalog, cover slots, in-site Markdown/TXT reader, and GitHub upload guide are implemented. Repository CI passed **52/52 tests** on test checkpoint `53c13993ca2aa2dbbb007454729a084fcdce43b4`. Browser QA passed **17/17 routes and 34/34 viewport checks** on UI SHA `468c1f60ab11223693f3678213d48848100ae63e`; axe reported zero violations and 34 color-contrast checks still require human review. The Pages build passed and the artifact includes the novels catalog and assets; the deploy job was still running at the latest checkpoint. Salon Booking's portfolio source is now aligned with its owner-accepted v1.0.0 release; AetherFlow remains withheld pending upstream UI cleanup. The novel catalog is intentionally empty until Pooya supplies final titles, descriptions, covers, and manuscripts.

See [DEPLOYMENT-TARGETS.md](DEPLOYMENT-TARGETS.md) for independent host build/deploy paths and the remaining credential gates.

## Current implementation
- Public bilingual portfolio is the default root experience; Spatial OS is secondary.
- A dedicated Chromium workflow now opens all 17 public portfolio routes (homepage plus 16 bilingual case studies), checks each at 1440×1000 and 390×844, validates language/direction, canonical URL, one H1/main landmark, image alt attributes, and keyboard skip navigation. Latest run [42234110102](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110102) passed **17/17 routes, 34/34 viewport checks, 0 failures**; report artifact: [portfolio-browser-qa-report](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110102/artifacts/13510613719).
- Bilingual skip navigation is implemented on the homepage and interactive/static case-study routes; its contract passes. Real keyboard-only, screen-reader, and device accessibility review remains open.
- Eight project case studies include source-grounded role/attribution, challenge, architecture, implementation details, engineering decisions, verification evidence, boundaries, and direct source/CI references.
- Eight architecture diagrams are generated in Persian and English from documented system flows. They are diagrams, not product screenshots or production evidence.
- A new bilingual novels section loads published entries from apps/platform/public/novels/catalog.json. Covers and manuscripts live in separate public folders; each novel opens in an in-site reader. The catalog is empty until Pooya supplies the final content.
- Sixteen static HTML case-study routes are emitted at build time: `/projects/<slug>/` and `/en/projects/<slug>/`. Each includes rendered article content, canonical URL, hreflang alternates, JSON-LD, social metadata, and source links.
- Seventeen social preview PNGs (homepage + eight projects × two languages) are primary Open Graph images at 1200×627; seventeen matching SVG sources remain alongside them.
- Sitemap and robots.txt advertise the canonical static routes.
- GlobalCart includes visually inspected desktop and mobile storefront screenshots pinned to source commit `5ca43e40ff101e673ee7cf261850bff0a679047c`; desktop is the hero and mobile is a dedicated screenshot card.
- ORBIT now has visually reviewed desktop and mobile Overview captures pinned to portfolio commit `77bc3ce0c41533661b8970d2527f4cd94b8a4341`; additional Incidents/Metrics/Logs/Traces states remain pending.
- Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse each have reviewed desktop/mobile captures pinned to portfolio commit `b0c538b2523daf96700b731a959d690dd3457f7e`. AuraPulse images must remain labelled simulated/illustrative; the capture run's optional Binance ticker request failed CORS from the automation origin.
- AetherFlow's preview URL now uses the current Pages host, but its screenshot remains withheld until the live page's M07 badge is reconciled with the source audit's M08 status.
- The latest recapture artifact [42235240283](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42235240283) contains 12 new desktop/mobile candidates across AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse. All 12 were visually inspected individually but remain artifact-only and owner-unapproved: AetherFlow is still M07/duplicate Dashboard, AuraPulse had a Binance CORS failure, LuminaGlass is at Blur 32px, ORBIT/NexusCanvas show explicitly illustrative data, and Pooya.OS includes a profile portrait awaiting approval. Salon Booking was excluded pending owner-approved redacted capture.
- Three evidence-integrity contract tests check local asset existence, immutable bilingual hero metadata, and that screenshot capture cannot auto-publish.
- Salon Booking is source-verified as owner-accepted product v1.0.0 (Apps Script source version 1.5.3); permission to publish its public case-study details and privacy-redacted screenshots still needs confirmation.
- The exact per-project gaps remain in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).

## Verified checks
- Repository CI [42238363801](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363801) passed on code SHA `dc991c4a90aad92ec4006332fffccf04fdd09951`: TypeScript, three-target builds, artifact uploads, and **46/46 contract tests**.
- Portfolio Browser QA [42238363900](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363900) passed on the same SHA: **17/17 routes, 34/34 viewport checks, zero axe violations, and zero workflow failures**. The 34 incomplete axe records are color-contrast checks requiring human visual review; this is not a formal WCAG certification.
- GitHub Pages build and deploy [42238363799](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363799) both succeeded on the current UI SHA. Its deployed artifact [13511808294](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363799/artifacts/13511808294) contains 17 HTML pages, 17 valid 1200×627 social PNGs, a 17-target sitemap, and robots.txt. Canonical, description, OG image, JSON-LD, and case-study hreflang metadata checks all passed.
- The 12 newest project screenshot candidates from [42235240283](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42235240283) were visually inspected individually. They remain artifact-only, unpublished, and pending owner approval; exact per-project caveats are in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).
- Cloudflare Pages actual deployment was skipped because `CLOUDFLARE_API_TOKEN` is missing; Apps Script deployment was skipped because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are missing.
- Real LinkedIn/Facebook crawler rendering and cache refresh remain unverified and need the owner's authenticated share-debugger sessions.

## Next implementation sequence
1. [x] Confirm current-main Repository CI, TypeScript, Pages/GAS builds, artifact upload, and 40/40 contract tests. [x] Confirm Pages build and deployment for the dynamic-sitemap application source.
2. [x] Inspect the actual Pages artifact: all 17 HTML routes, canonical/Open Graph/JSON-LD/hreflang metadata, 17 current-date sitemap targets, and all 17 PNG signature/dimension checks passed. [ ] Still validate actual rendering and cache refresh through LinkedIn Post Inspector and Facebook Sharing Debugger; add alternate formats only if a real client requires them.
3. [x] Prune ten unreferenced local screenshot copies from the Pages artifact while retaining the immutable source files; ZIP size reduced by 51.6% (7,870,673 → 3,811,158 bytes).
4. Keep AetherFlow screenshot acceptance blocked until its upstream owner resolves the M08 README versus M07 landing/dashboard labels and updates legacy `pooya16pg-spec.github.io` links/CORS guidance. The new `https://pooya-labs.github.io/aetherflow/` landing route returned HTTP 200 in portfolio capture run 42234110094, but that proves page reachability only; API CORS has not been verified. Keep the independent AetherFlow repository untouched during portfolio work.
5. Extend feature-specific evidence beyond current Overview/editor candidates: ORBIT Incidents, Metrics, Logs, and Traces; NexusCanvas rack view, graph analysis, and snapshot import/export; LuminaGlass PNG export, Audio Lab, and task board. Keep each capture artifact-only until visually and factually approved.
6. Fix or provide an owner-approved CORS-safe data source for AuraPulse's optional Binance ticker, then capture connected and fallback states. Until a real feed is verified, keep its current screenshot labelled SIMULATED/illustrative and make no live-market claim.
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
