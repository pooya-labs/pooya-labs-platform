## 2026-11-07 — Final source audit and exact-SHA portfolio verification

- Enumerated the current `main` refs of all eight independent project repositories. Only GlobalCart had advanced beyond the previous platform audit; its latest HEAD and concrete accessibility regression are recorded in `PROJECT-CONTENT-AUDIT.md`.
- Updated the GlobalCart bilingual case-study dossier and source audit to reflect main `119afcd`, app SHA `61ce7f5`, and Browser E2E [42392071315](https://github.com/pooya-labs/globalcart/actions/runs/42392071315): 134 passed / 6 failed / 9 skipped. All failures are serious axe `label-content-name-mismatch` findings on hero product links across Chromium, Firefox and WebKit. No GlobalCart source files were modified.
- Updated handoff/status/state/changelog with the verified blockers and current source commit inventory.
- Exact platform checkpoint `5a379757809888a1a8c98335f6006746372779e1` passed Repository CI [42393819743](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42393819743), **52/52 contract tests**, TypeScript, and all three target builds. Browser QA [42393819729](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42393819729) passed 17/17 routes, 34/34 viewports, and zero axe violations. GitHub Pages [42393819716](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42393819716) passed build and deploy.
- Cloudflare Pages and Apps Script production jobs were skipped due missing deployment secrets; no new production releases on those targets are claimed. Manual contrast/accessibility, owner content/design approval, external social crawler validation, and the required Phase 7 redesign remain release gates.

## 2026-11-07 — GlobalCart M09.8 accessibility regression recheck

- Rechecked upstream `pooya-labs/globalcart` main at `119afcd4924fbdda0287558d00926ab051255e59`. Compared with application-code SHA `61ce7f5da832000b6bcb6fa56b1a4f2fc0c69a0f`, the only later commit changes `data/catalog.json`, so the latest Browser E2E run still represents the current application tree.
- Pages deploy/public smoke [42392071302](https://github.com/pooya-labs/globalcart/actions/runs/42392071302) and Security [42392071307](https://github.com/pooya-labs/globalcart/actions/runs/42392071307) passed.
- Full Browser E2E [42392071315](https://github.com/pooya-labs/globalcart/actions/runs/42392071315) completed with **134 passed / 6 failed / 9 skipped**. All six failures are serious axe `label-content-name-mismatch` findings: visible text in hero-product tiles is not included in link accessible names. The defect reproduces across Chromium, Firefox and WebKit, in homepage and command-palette-open-state tests.
- Lighthouse [42392214241](https://github.com/pooya-labs/globalcart/actions/runs/42392214241) passed six route/mode budgets (home mobile Performance 92, LCP 2.5 s, TBT 260 ms; Accessibility, Best Practices and SEO all 100). Post-deploy image QA [42392214297](https://github.com/pooya-labs/globalcart/actions/runs/42392214297) passed two desktop/mobile checks and skipped two unavailable cases; Shopify smoke [42392214325](https://github.com/pooya-labs/globalcart/actions/runs/42392214325) passed.
- Updated the portfolio's GlobalCart dossier, source audit, handoff, and status to identify the concrete accessibility failure instead of carrying forward the older cancelled-run-only record. No GlobalCart source files were modified; M09.8 and 1.0.0 remain open.

## 2026-11-07 — ORBIT dual-runtime and GlobalCart M09.8 source refresh

- Rechecked ORBIT main at `268017365cd22f7db9dd8895fb59fbccc76c9b8f`. PR #136 added the Cloudflare Worker edge-gateway path; exact-main CI [42223939950](https://github.com/pooya-labs/orbit/actions/runs/42223939950), Security [42223939967](https://github.com/pooya-labs/orbit/actions/runs/42223939967), and Pages [42223939898](https://github.com/pooya-labs/orbit/actions/runs/42223939898) passed. The Worker is not live-connected: workers.dev route is disabled, origin and `ORBIT_GATEWAY_SECRET` are unset, so API routes remain fail-closed.
- Updated the ORBIT bilingual technical dossier and architecture diagram to document the independent Apps Script synthetic demo, Cloudflare Worker-to-Go path, canonical PostgreSQL boundary, and separate authenticated OTLP telemetry pipeline. Explicitly recorded that CF01–CF05 live acceptance remains pending.
- Rechecked GlobalCart main at `8a89f0d612cdf69d619b64049304eaa789b4785c`: v0.2.3-dev / M09.8. Updated the portfolio project-card status and its bilingual dossier with current deployment, Lighthouse, image QA, Shopify smoke, and outstanding Browser E2E evidence.
- GlobalCart Pages run [42387896585](https://github.com/pooya-labs/globalcart/actions/runs/42387896585) passed catalog/image persistence, TypeScript, unit tests, build, deployment, and published-site smoke. Lighthouse [42367298478](https://github.com/pooya-labs/globalcart/actions/runs/42367298478) passed six lab route/mode budgets; home mobile measured LCP 2.4 s / TBT 250 ms. Visual QA [42367298484](https://github.com/pooya-labs/globalcart/actions/runs/42367298484) and Shopify smoke [42367298509](https://github.com/pooya-labs/globalcart/actions/runs/42367298509) passed on an earlier SHA. Browser E2E [42247489435](https://github.com/pooya-labs/globalcart/actions/runs/42247489435) was cancelled; current-SHA full E2E remains open.
- Portfolio code commit [cc157e4](https://github.com/pooya-labs/pooya-labs-platform/commit/cc157e4c9dd3e52a5181fb1a7e5e33821045f41b) passed GitHub Pages build/deploy [42391868126](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42391868126) and Browser QA [42391868133](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42391868133). A stale GlobalCart release-wording assertion was corrected rather than weakening the test; final Repository CI [42392401131](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42392401131) passed **52/52 contract tests**, typecheck, and all three target builds on test checkpoint `087fee17a8bfff503075dbae14609d530a7e63a4`.
- No previous project repository was modified. Cloudflare Pages and Apps Script production deploy jobs were skipped for this platform update because required Actions secrets remain unavailable; their workflow wrapper success is not counted as production deployment.

## 2026-11-07 — Platform handoff and release-gate reconciliation

- Reconciled the platform handoff against the live `main` branch and the latest available repository state.
- Compared current code checkpoint `0f6e8b596b41701954f9e981f38aa7315eb593dd` with the last verified deployed UI source `468c1f60ab11223693f3678213d48848100ae63e`: 12 commits ahead, with changes limited to capture automation, README/docs, and contract tests; no app runtime source changed.
- Rewrote `docs/NEXT.md` into ordered P3-08A/B/C owner-content, project-evidence, accessibility, and social-validation work queues, followed by mandatory Phase 7 redesign and Phase 8 V1 hardening.
- Refreshed `docs/STATUS.md` with explicit distinctions between current main head, last verified UI source, last CI checkpoint, browser QA, and Pages deployment. No fresh CI run is claimed for the newer code head.
- Refreshed `docs/project-state.json` with the reconciliation checkpoint and current release blockers.
- Preserved the portfolio-first product boundary, the intentionally empty novels catalog, independent hosting targets, and Phase 9 deferral for previous-project code integration.
- Validation limitation: this documentation-only reconciliation was committed through GitHub; a new Actions run for the resulting documentation commits has not yet been observed.

## 2026-11-06 — Novels library, Salon Booking v1.0.0 alignment, and final checks
- Added the bilingual novels section with an empty public catalog, responsive cover cards, and an in-site Markdown/TXT reader. The exact GitHub upload instructions are in docs/NOVELS-GUIDE.md; titles and story content remain empty until Pooya supplies them.
- Added six novels-library contract tests covering catalog schema, path validation, publication gating, safe Markdown rendering, homepage wiring, upload guide paths, and Pages catalog packaging.
- Corrected Salon Booking's portfolio status to the owner-accepted product release v1.0.0. The Apps Script source version is 1.5.3; CI and Pages evidence are linked from runs 42086718663 and 42086718821.
- Repository CI [42247729151](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247729151) passed **52/52 tests** on test checkpoint 53c13993ca2aa2dbbb007454729a084fcdce43b4.
- Browser QA [42247171025](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247171025) passed 17/17 routes and 34/34 viewports on UI SHA 468c1f60ab11223693f3678213d48848100ae63e with zero axe violations; 34 color-contrast checks still need human visual review.
- Pages Build and Deploy both succeeded for UI SHA 468c1f6 in run [42247171442](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247171442); artifact [13518846598](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247171442/artifacts/13518846598) contains the novels catalog and updated app bundle.
- AetherFlow's README and dashboard CORS guidance now use https://pooya-labs.github.io; the landing/dashboard M07 vs README M08 mismatch, duplicate Dashboard navigation, and old owner links still block screenshot approval.


# Changelog

## 2026-11-06 — GitHub Pages release verification and visual screenshot candidate audit
- GitHub Pages run [42238363799](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363799) completed successfully on code SHA `dc991c4a90aad92ec4006332fffccf04fdd09951`; both the build and deploy jobs passed.
- Downloaded and audited deployed artifact [13511808294](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363799/artifacts/13511808294): 17 HTML pages, 17 valid PNG Open Graph cards at 1200×627, 17 sitemap URLs, and robots.txt sitemap pointer. All HTML pages have canonical/OG image/description/JSON-LD; all 16 case-study pages have language alternates.
- Individually inspected the twelve artifact-only screenshot candidates from [42235240283](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42235240283). All twelve returned HTTP 200 and have no horizontal overflow, but remain unpublished and owner-unapproved. The visual audit records AetherFlow's stale M07/duplicate Dashboard, AuraPulse's Binance CORS failure and simulated labels, the visible Pooya.OS portrait needing approval, NexusCanvas's illustrative modelled metrics, LuminaGlass's 32px blur state, and ORBIT's explicit demo/illustrative data disclosure.
- Salon Booking remained excluded from automated capture because it requires owner-approved, privacy-reviewed redacted content.
- Updated STATUS, NEXT, project content audit, and machine-readable project state. The current code UI remains at `dc991c4`; documentation checkpoint is `aa62b23`.

## 2026-11-06 — Portfolio accessibility remediation and strict axe QA
- The first axe scan on commit `2933bad` identified 51 repeated serious findings: 34 brand-name mismatches and 17 undersized navigation targets. Both were fixed centrally in [38203322](https://github.com/pooya-labs/pooya-labs-platform/commit/38203322f11184adb06064a530c5f8b4bc5c05a2).
- QA run [42236238032](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42236238032) passed 17/17 routes and 34/34 desktop/mobile checks with zero axe violations. The first report exposed 36 incomplete rule checks; two `aria-prohibited-attr` cases on the hero artwork were fixed with `role="img"` and localized accessible naming in [dc991c4](https://github.com/pooya-labs/pooya-labs-platform/commit/dc991c4a90aad92ec4006332fffccf04fdd09951).
- Strict browser QA now fails critical/serious axe violations and retains incomplete-rule details. Current-SHA run [42238363900](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363900) passed **17/17 routes, 34/34 viewport checks, zero axe violations, and zero failures**. Its 34 incomplete records are all color-contrast checks that need human visual review because glass/gradient/overlapped backgrounds prevent reliable automatic calculation. No formal WCAG certification is claimed.
- Repository CI [42238363801](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363801) passed all three builds and **46/46 contract tests** on current SHA `dc991c4a90aad92ec4006332fffccf04fdd09951`.
- GitHub Pages build succeeded on current SHA; deployment [42238363799](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363799) was still running at this checkpoint.
- Cloudflare and Apps Script actual deploy jobs were skipped because their required Actions secrets are unavailable.

## 2026-11-06 — Portfolio Chromium browser QA
- Added a dedicated Playwright/Chromium workflow for the GitHub Pages build, independent of the external-project screenshot capture workflow.
- The test opens the homepage and all 16 Persian/English case-study routes directly, at desktop 1440×1000 and mobile 390×844.
- Validates HTTP status, title, locale/direction, canonical route, one H1 and main landmark, image alt attributes, horizontal overflow, and keyboard skip-link focus/activation.
- Browser QA [42234110102](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110102) passed **17/17 routes, 34/34 viewport checks, and zero failures**. The JSON report is retained as [artifact 13510613719](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110102/artifacts/13510613719).
- Repository CI [42234110197](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110197) passed TypeScript, all three target builds, artifacts, and **45/45 contract tests** on `515ef71d9105af0faf9fb3208d702520fd37be7f`.
- GitHub Pages build and deploy [42234110256](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110256) succeeded on the same SHA. Manual screen-reader/accessibility and visual review remain open; the automated run is not a WCAG certification.
- Cloudflare and Apps Script deploy jobs were skipped because the required repository Actions secrets are still unavailable.
## 2026-11-06 — Bilingual keyboard skip navigation
- Added a skip-to-main-content link to the homepage and both interactive and crawler-readable static case-study pages in Persian and English.
- Skip links appear when reached by keyboard focus, move focus to the main region, and avoid entrance transitions under reduced-motion preferences.
- Added a regression contract for both locales and all page renderers; existing focus-visible outlines remain in place.
- Repository CI [42231110043](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42231110043) passed TypeScript, all three build targets, artifact uploads, and **42/42 contract tests** on main `fc4d865b8fa4a19a3899f4b72847d39594c201ad`.
- GitHub Pages build and deploy [42231109831](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42231109831) succeeded on `fc4d865b8fa4a19a3899f4b72847d39594c201ad`.
- Cloudflare and Apps Script deployment jobs remained skipped because their required repository Actions secrets were unavailable; no formal accessibility certification or manual screen-reader review is claimed.
## 2026-11-06 — Case-study section hierarchy consistency
- Corrected the final two interactive case-study section labels to 09 and 10, matching the crawler-readable static pages.
- Moved the supplemental interface-capture heading out of the numbered sequence in both renderers, avoiding a duplicate 05 label.
- Added a regression contract that checks both renderers expose the same uninterrupted 01–10 section sequence.
- Repository CI [42227942261](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42227942261) passed TypeScript, all three target builds, artifact uploads, and **41/41 contract tests** on 328de1fc838cb4a5b9af9c3515a7c261cb3e47ec.
- GitHub Pages build and deployment [42227942275](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42227942275) succeeded on the same commit.
- Cloudflare and Apps Script deploy jobs were still skipped because their required GitHub Actions secrets were unavailable; the prior Cloudflare production deployment remains the f9011ec5a3f9eb2faffdac222596b37444184191 build.
## 2026-11-05 — Raster social previews for reliable link sharing
- Added pinned build dependency `@resvg/resvg-js@2.6.2` to render social-card SVGs into real PNG files during the Pages build; editable SVG sources remain available beside each PNG.
- Switched homepage and all 16 localized project case-study Open Graph images to PNG.
- Standardized all 17 PNG cards at **1200×627 (1.91:1)**, matching LinkedIn's published share-preview recommendation; retained large-image Twitter/X card metadata.
- Extended built-output tests to verify PNG signatures, exact pixel dimensions, correct per-project routes, and image/png metadata.
- Repository CI [42072937855](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42072937855) passed TypeScript, Pages/GAS builds, artifact upload, and **34/34 contract tests**.
- Pages deployment containing the PNG generator and social image references [42071642813](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42071642813) succeeded.
- External share-client cache/rendering validation remains open; see the [LinkedIn sharing requirements](https://www.linkedin.com/help/linkedin/answer/a1322434) and [resvg-js package](https://www.npmjs.com/package/@resvg/resvg-js).

## 2026-11-05 — Persian SVG typography and GlobalCart interface evidence
- Improved generated Persian architecture diagrams and social cards with an Amiri/Tahoma fallback stack, RTL alignment, more compact labels, and stable node-number positioning; constrained Persian social-card descriptions to prevent horizontal overflow.
- Added a source-pinned GlobalCart desktop homepage screenshot as the case-study hero and a separate mobile homepage capture section, both with bilingual captions/alt text and lazy loading.
- Added source validation for case-study screenshot URLs, immutable commit pins, and localized captions/alt text.
- Expanded build smoke checks to assert the desktop hero and mobile screenshot appear in the static Persian and English GlobalCart pages.
- Repository CI [42070270418](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42070270418) passed TypeScript, Pages/GAS builds, artifact upload, and **34/34 contract tests**.
- Pages deployment with Persian SVG font/RTL corrections and GlobalCart screenshot integration [42069853533](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42069853533) succeeded.
- GlobalCart's product-detail/gallery screenshot coverage and manual release QA remain open.

## 2026-11-05 — GlobalCart responsive UI evidence
- Added the actual GlobalCart desktop and mobile storefront homepage captures to the case study; the desktop image is the pinned hero visual and the mobile image is shown in a dedicated responsive gallery section.
- Both images were visually inspected: they show the storefront UI and do not expose customer personal data. Asset URLs are pinned to source commit `5ca43e40ff101e673ee7cf261850bff0a679047c`.
- Added regression checks for pinned source URLs, localized captions/alt text, and correct project-only placement in the generated Persian and English pages.
- Repository CI [42070270418](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42070270418) passed TypeScript, Pages/GAS builds, artifact upload, and **34/34 contract tests**.
- Pages deployment containing the screenshots and case-study media section [42069853533](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42069853533) succeeded.
- Remaining screenshot gaps are AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse; Salon Booking requires owner-approved redacted interface evidence.

## 2026-11-05 — Static bilingual case studies and architecture diagrams
- Added build-generated Persian and English static HTML case-study routes for all eight projects (16 pages), including canonical URLs, hreflang alternates, JSON-LD, pre-rendered article content, and direct source links.
- Added 16 per-project/per-language Open Graph SVG cards plus a homepage card, and published robots.txt and a canonical sitemap with locale alternates.
- Added eight project-specific architecture diagrams in Persian and English (16 SVGs), embedded in static and interactive case studies. Diagrams are explicitly distinguished from UI screenshots and production evidence.
- Extended route handling so direct static-page visits and in-page navigation resolve the right project and locale; GAS mode retains the query-string route fallback.
- Added build-output smoke tests for every HTML route, metadata, diagram, social card, sitemap, and robots.txt.
- Repository CI [42066575496](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42066575496) passed TypeScript, Pages/GAS builds, artifact upload, and **32/32 contract tests**.
- Pages deployment containing the static-page and architecture-diagram implementation [42066311960](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42066311960) succeeded.
- Remaining before V1: actual UI screenshots, external social-crawler validation (SVG compatibility/fallback), owner-approved biography/roles/project order/contact, per-project manual QA, and the mandatory two-round full redesign.

## 2026-11-05 — Source-grounded engineering dossiers and release audit
- Expanded all eight bilingual case studies with documented role/attribution, architecture, implementation details, engineering decisions, verification evidence, and direct source/CI references.
- Kept attribution explicit where source READMEs do not identify an individual author; AetherFlow's individual contribution wording remains an owner-review item.
- Aligned GlobalCart and Salon Booking status labels with their current source release lines and disclosed simulated/non-production boundaries.
- Added contract coverage for all eight dossier records and their bilingual sections.
- Added [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md), a per-project checklist of source-confirmed facts and the exact missing information/evidence required before V1.
- Repository CI [42059342492](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42059342492) passed TypeScript, Pages/GAS builds, artifact upload, and **29/29 contract tests**.
- Pages deployment containing the dossier code [42058556955](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42058556955) succeeded; the later 9c2c035 commit changed only a test assertion.

## 2026-11-05 — Project visuals and portfolio metadata
- Added seven visual assets referenced directly from the source project repositories and pinned to immutable commit SHAs; every asset has Persian/English alt text and a semantic visual kind.
- Added lazy-loaded responsive project-card media and matching case-study hero media; failed remote media gracefully falls back to the local project artwork.
- Used an actual GlobalCart storefront screenshot; retained branded artwork/logos for other repositories rather than presenting those as product screenshots. AetherFlow currently keeps its CSS-generated project motif until real visual evidence is available.
- Added bilingual case-study page titles/descriptions, dynamic canonical and Open Graph URL/title/description/locale updates, base social metadata, Person JSON-LD, and a custom SVG favicon.
- CI [42053063421](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42053063421) passed TypeScript, Pages/GAS builds, artifact upload, and **27/27 contract tests**.
- Pages deployment [42053052111](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42053052111) succeeded with the sitemap included.

## 2026-11-05 — Shareable bilingual project case studies
- Added an evidence-based bilingual case-study record for each of the eight featured projects: challenge, approach, engineering highlights, and explicit scope boundaries.
- Added in-site detail views with shareable `?project=<slug>` URLs, Persian/English copy, demo/source links, and an optional existing external case-study link.
- Project cards now link to their live demos, repositories, and detail views.
- Verified public repository and preview URLs against the actual project repositories and READMEs; every project remains marked as needing Pooya's editorial review.
- Repository CI [42048164129](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42048164129) passed TypeScript, both build targets, artifact upload, and 24/24 tests.
- GitHub Pages deployment [42047985066](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42047985066) succeeded.

## 2026-11-05 — Typed portfolio content registry
- Moved the eight initial project records out of the page component into a typed content module.
- Added stable URL-safe project slugs, honest project status keys, explicit owner-review state, localized copy checks, unique-name/slug checks, and validated HTTPS source links.
- Verified exact repo and preview links against the actual GitHub repositories and project READMEs.
- Updated the next milestone to reusable project case-study pages.
- Repository CI [42045396058](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42045396058) passed TypeScript, both build targets, artifact upload, and 23/23 tests.

## 2026-11-05 — Portfolio-first public website
- Reframed the product around Pooya's personal profile and project showcase; the portfolio is now the default root experience.
- Added bilingual intro, About, selected project cards, focus areas, technology list, contact section, and a secondary entry to the Spatial OS workspace.
- Added dark obsidian / cyan / emerald portfolio styling with a restrained, touch-safe and reduced-motion-safe pointer refraction effect.
- Changed the roadmap so a complete redesign using Pooya's feedback is a mandatory pre-release gate with two review rounds and explicit approval.
- Clarified that a generic customer login/dashboard is not part of the portfolio by default and that Apps Script is deferred.
- Added ADR-0006, portfolio product-surface and architecture documentation, and contract tests.
