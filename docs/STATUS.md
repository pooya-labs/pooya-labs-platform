# Project Status

**Last updated:** 2026-11-06  
**Repository:** pooya-labs/pooya-labs-platform  
**Branch:** main  
**Current phase:** Phase 3 — Portfolio content architecture and case studies  
**Release:** Pre-alpha / portfolio draft

## Product direction — owner clarified
- The main purpose is to introduce Pooya and showcase his software projects to visitors.
- The root website is the public personal portfolio, not a SaaS dashboard or generic customer portal.
- The Spatial OS shell is secondary and remains accessible as a separate workspace experience.
- An owner-only content/management console may be considered after the project content model is stable.
- Full site redesign using Pooya's feedback is a mandatory pre-release Phase 7 gate.
- Apps Script is deferred and is not required to publish the static portfolio on GitHub Pages.

## Newly implemented
- [x] Added bilingual Persian/English public portfolio as the default root experience.
- [x] Added hero, About, selected project cards, focus areas, technology list, contact section, and secondary workspace entry.
- [x] Added responsive dark obsidian design with cyan/emerald accents and an Antigravity-inspired decorative pointer lens.
- [x] Added honest project status labels and links verified against the individual source READMEs.
- [x] Retained the Spatial OS shell as a secondary workspace, with a return link to the public portfolio.
- [x] Added versioned built-in app manifest v1 and validation for unique IDs/shortcuts, localized metadata, and owner-workspace scope.
- [x] Added a typed portfolio content registry with explicit review state, localized copy, unique slugs, and verified HTTPS source/demo URLs.
- [x] Added eight bilingual internal case-study views with challenge, approach, engineering highlights, scope boundaries, and shareable query-string routes.
- [x] Expanded all eight case studies with source-backed role/attribution, architecture, implementation details, engineering decisions, verification evidence, and direct source/CI references.
- [x] Added a per-project content audit that explicitly separates source-confirmed facts from release-blocking owner inputs and missing evidence.
- [x] Generated eight project-specific architecture diagrams in Persian and English from the documented system boundaries and data flows.
- [x] Generated 16 static crawler-readable case-study pages (8 projects × 2 languages) with canonical URLs, hreflang, JSON-LD, rendered article content, and locale-specific source links.
- [x] Generated 16 per-project social preview SVG cards and a homepage card; added OG image metadata, sitemap alternates, and robots.txt.
- [x] Added demo, source, and case-study actions to project cards.
- [x] Added seven verified source-repository visual assets with pinned commit URLs and bilingual alt text; card media is lazy-loaded, responsive, and falls back cleanly.
- [x] Added the actual GlobalCart storefront screenshot; other current visuals are correctly identified as brand marks or project artwork, not product screenshots.
- [x] Added dynamic case-study page title/description and canonical/Open Graph metadata updates, Person JSON-LD, and a branded SVG favicon.
- [x] Added an XML sitemap listing the portfolio homepage and all eight shareable case-study URLs.
- [x] Reframed README, architecture, product surfaces, design direction, next task, and roadmap around the portfolio-first purpose.
- [x] Added ADR-0006 to record portfolio-first hosting and scope.
- [x] Added validation for dedicated case-study hero images: HTTPS, immutable source-commit URLs, and Persian/English alt text.
- [x] Changed the project screenshot workflow to read-only, artifact-only capture; it no longer publishes images automatically before human review.
- [x] Added three evidence-integrity contract tests: local image paths must resolve to committed public files, case-study hero assets must be immutable bilingual source assets, and screenshot capture must remain review-only.

## CI and publishing status
- The last confirmed green CI run is [42072937855](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42072937855): TypeScript, Pages/Apps Script builds, artifact upload, and **34/34 contract tests**, including PNG signature and 1200×627 dimension checks. This run predates the latest portfolio code changes; it is not evidence that the current main SHA passes.
- Pages deployment containing the Resvg PNG generator and 1200×627 Open Graph images [42071642813](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42071642813) succeeded. The same deployment also contains the bilingual static pages, architecture diagrams, and GlobalCart screenshots.
- Public preview: https://pooya-labs.github.io/pooya-labs-platform/
- Current repo status and unresolved pre-release evidence are tracked in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).
- Confirm the repository Pages source remains GitHub Actions so a legacy branch/Jekyll deployment cannot supersede the Vite portfolio.

## Pending owner review
- [ ] Work through every project-specific release item in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md); it identifies missing attribution, screenshots/diagrams, current-SHA evidence, manual QA, and runtime acceptance for each project.
- [ ] Review and approve the public biography and positioning.
- [ ] Curate the featured project order and descriptions.
- [ ] Confirm project statuses, links, screenshots, and public evidence.
- [ ] Confirm your role/contribution for each project before final case-study copy is approved.
- [ ] Decide which contact channel should be published.
- [ ] Review the complete portfolio design on desktop and mobile. The current implementation is a draft, not final.

## Not implemented
- [x] Added actual GlobalCart desktop and mobile storefront screenshots to its case study; both are visually inspected, contain no customer data, and are pinned to source commit `5ca43e40ff101e673ee7cf261850bff0a679047c`.
- [ ] Actual interface screenshots for AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse; Salon Booking requires owner-approved redacted UI evidence. Architecture diagrams are not product screenshots.
- [x] Source-backed role/architecture/implementation/decision/verification sections are populated for all eight projects; owner-confirmed personal contribution and any additional measured outcomes remain pending.
- [x] Static crawler-readable bilingual case-study pages are generated; 17 PNG Open Graph cards (homepage plus eight projects × two languages) are the primary social images, with 17 matching SVG source cards retained.
- [ ] Validate the PNG social previews in external platforms/crawlers and confirm that cache refresh works; add alternate formats only if an actual client requires them.
- [ ] Private owner content-management console.
- [ ] Customer accounts or customer dashboard; excluded from the portfolio by default.
- [ ] Production contact form, CMS/backend, Apps Script sync, or data persistence.
- [ ] Final full-site redesign and owner approval before V1.
- [ ] Production performance, accessibility, and recovery review.

## Historical architecture and security evidence
- Apps Script HtmlService with google.script.run health RPC was previously owner-verified.
- Direct external browser-to-GAS fetch from GitHub Pages was blocked by CORS in Chromium; see diagnostic run [42028842302](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42028842302).
- These findings remain relevant only if a future server-backed/private feature is approved. They do not block the static portfolio.
- Public/admin separation remains a security requirement for any future protected tool.
- Previous project repositories remain untouched; project integration stays in Phase 9.

## Latest checkpoint

At the start of the 2026-11-06 verification pass, `main` was at `9273f19f05b37e556a71c3d90f06373c0e71b283`. The latest ORBIT content change pointed its case-study hero and mobile media at local PNG paths that were not present in the repository (both paths returned 404). Those references were removed in [`7365a7b`](https://github.com/pooya-labs/pooya-labs-platform/commit/7365a7bcdeef73afd25eb31048b7a6fc9cc6c3dc); the pinned ORBIT brand mark remains, and real UI screenshots remain an open evidence item.

The dedicated case-study hero asset validator now enforces immutable raw-GitHub source URLs and localized alternative text. Three additional contract tests guard local asset existence, hero metadata, and the artifact-only capture workflow. The project screenshot workflow now has read-only repository permissions and uploads capture candidates only; it does not commit or publish screenshots automatically. A person must inspect the artifact and explicitly decide which images are safe and suitable to publish.

The latest confirmed green CI result remains run 42072937855 (34/34 tests), which predates the current main changes. The code and workflow updates were pushed to main, which is configured to trigger repository CI; edits under `apps/platform/**` also trigger the Pages build. The current SHA's remote workflow result has not yet been confirmed, so the repository is not marked verified or release-ready.
