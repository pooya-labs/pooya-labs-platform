# Changelog

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
