# Project Status

**Last updated:** 2026-11-05  
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
- [x] Added demo, source, and case-study actions to project cards.
- [x] Added seven verified source-repository visual assets with pinned commit URLs and bilingual alt text; card media is lazy-loaded, responsive, and falls back cleanly.
- [x] Added the actual GlobalCart storefront screenshot; other current visuals are correctly identified as brand marks or project artwork, not product screenshots.
- [x] Added dynamic case-study page title/description and canonical/Open Graph metadata updates, Person JSON-LD, and a branded SVG favicon.
- [x] Added an XML sitemap listing the portfolio homepage and all eight shareable case-study URLs.
- [x] Reframed README, architecture, product surfaces, design direction, next task, and roadmap around the portfolio-first purpose.
- [x] Added ADR-0006 to record portfolio-first hosting and scope.

## CI and publishing status
- Dossier-enabled code passed CI [42059342492](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42059342492): TypeScript, both Pages/Apps Script builds, artifact upload, and **29/29 contract tests**.
- Pages deployment containing the dossier code [42058556955](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42058556955) succeeded. The later 9c2c035 commit only corrected a test assertion.
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
- [ ] Actual interface screenshots and architecture diagrams for AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse; current assets do not all represent product UI.
- [x] Source-backed role/architecture/implementation/decision/verification sections are populated for all eight projects; owner-confirmed personal contribution and any additional measured outcomes remain pending.
- [ ] Static crawler-readable case-study pages and per-project social preview images; current case-study metadata is dynamically updated in the browser.
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
The root website now introduces Pooya and his projects. Eight bilingual case-study views are available as shareable query routes and now include source-grounded engineering dossiers. The per-project missing-information and evidence gate is documented in PROJECT-CONTENT-AUDIT.md. Seven source-repository visual assets are pinned to immutable commits and carry bilingual alt text; one is the GlobalCart storefront screenshot while the rest are clearly treated as brand/project artwork. Case-study titles/descriptions and canonical/Open Graph metadata update in the browser, and the sitemap covers the homepage plus all eight case-study URLs. CI run 42060077585 passed 29/29 tests and Pages run 42058556955 deployed the dossier-enabled code. Public copy, featured order, project contribution details, and richer project evidence still require Pooya's review. Static crawler-readable case-study pages and per-project social images, owner-confirmed details, project evidence, and the complete two-round feedback-driven redesign remain mandatory pre-release work.
