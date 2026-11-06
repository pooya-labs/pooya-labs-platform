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
- [x] Added actual GlobalCart desktop/mobile storefront screenshots and ten reviewed desktop/mobile UI captures across ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse. Remaining brand artwork is clearly distinguished from product-interface evidence; AetherFlow and Salon Booking UI captures remain gated by their documented evidence requirements.
- [x] Added dynamic case-study page title/description and canonical/Open Graph metadata updates, Person JSON-LD, and a branded SVG favicon.
- [x] Added an XML sitemap listing the portfolio homepage and all eight shareable case-study URLs.
- [x] Reframed README, architecture, product surfaces, design direction, next task, and roadmap around the portfolio-first purpose.
- [x] Added ADR-0006 to record portfolio-first hosting and scope.
- [x] Added validation for dedicated case-study hero images: HTTPS, immutable source-commit URLs, and Persian/English alt text.
- [x] Kept the Playwright capture runner artifact-only and read-only; separate approval-manifest publishers verify artifact identity, PNG signature, dimensions, file size, and SHA-256 before publishing selected images.
- [x] Added three evidence-integrity contract tests: local image paths must resolve to committed public files, case-study hero assets must be immutable bilingual source assets, and screenshot capture must remain review-only.
- [x] Captured and visually reviewed ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse desktop/mobile interface evidence; 10 PNGs are pinned to immutable portfolio commits and referenced by the case-study registry.
- [x] Replaced five stale `pooya16pg-spec.github.io` preview URLs with the currently verified `pooya-labs.github.io` Pages hosts; AetherFlow's screenshot remains withheld until its M07/M08 public label mismatch is resolved.

## CI and publishing status
- Repository CI [42214072630](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42214072630) passed on main SHA `22d6f9714982a982f36fcf936719235d94340c02`: TypeScript, GitHub Pages build, Apps Script bundle build, artifact upload, and **39/39 contract tests**. Job logs confirm zero test failures.
- GitHub Pages build and deployment [42212627465](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42212627465) both succeeded on application-source SHA `6f40bd0f919a23fbd03718d9b312fc62fbfa432f`, which embeds the ten reviewed project screenshots and corrected preview links. Later commits only changed audit/status docs, README, and tests.
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
- [x] Actual interface screenshots for ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse (desktop + mobile) are committed and used in their case studies; each is pinned to immutable portfolio commits. AuraPulse captures are explicitly described as simulated/illustrative and do not prove live Binance connectivity.
- [ ] AetherFlow interface screenshot remains blocked by the public M07 versus audited M08 label mismatch. Salon Booking still requires owner-approved, privacy-reviewed synthetic/redacted UI evidence. Architecture diagrams are not product screenshots.
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

The public portfolio now embeds ten reviewed desktop/mobile interface screenshots across ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse. The images are committed under `apps/platform/public/interface-captures/`, use immutable raw-GitHub URLs, and include bilingual alt text. ORBIT's two captures come from commit `77bc3ce0c41533661b8970d2527f4cd94b8a4341`; the other eight captures come from `b0c538b2523daf96700b731a959d690dd3457f7e`. The desktop image is used as the case-study hero and the mobile image appears in the lazy-loaded interface-evidence section.

The five preview URLs that previously used the legacy `pooya16pg-spec.github.io` host now point to the verified `pooya-labs.github.io` host. AetherFlow's URL was corrected too, but its interface screenshot remains withheld until the public page's M07 badge is reconciled with the source audit's M08 status. AuraPulse's images are visibly labelled simulated/illustrative; an automation-origin CORS failure on the optional Binance ticker request means they do not establish live market connectivity.

The screenshot capture workflow is artifact-only. Separate approval-manifest publishers validate exact artifact identity, PNG signatures, viewport dimensions, file sizes, and SHA-256 checksums before committing reviewed images. The project evidence audit and remaining manual/runtime acceptance gaps are in `docs/PROJECT-CONTENT-AUDIT.md`. Repository CI run 42214072630 passed 39/39 tests on main SHA `22d6f9714982a982f36fcf936719235d94340c02`; Pages run 42212627465 passed both build and deploy jobs for the application-source SHA `6f40bd0f919a23fbd03718d9b312fc62fbfa432f`. This confirms the current website bundle is built and published, but does not complete owner review, remaining detailed project evidence, the full feedback-driven redesign, or Phase 8 hardening. No V1 release is authorized yet.
