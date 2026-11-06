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
- Apps Script, GitHub Pages, and Cloudflare Pages are independent publishing/runtime targets; none is allowed to become a hard dependency of the others.

## Publishing status — 2026-11-06
- [x] Added an isolated Cloudflare build target: `npm run build:cloudflare` → `dist/cloudflare`, with Cloudflare-specific canonical origin and root base.
- [x] Created Cloudflare Pages project `pooya-labs-platform` on `pooya-labs-platform.pages.dev`; final checked deployment `c8205f55-cb96-485e-986f-dc794dd186d5` completed successfully from main commit `6ecd5a8c6b72fab931ab5fc919c8f9b5ceb1f20c`.
- [x] Added a secret-gated GitHub Actions Cloudflare production trigger that deploys the exact pushed main commit and polls for Cloudflare's success status. The required `CLOUDFLARE_API_TOKEN` secret is not configured yet, so automatic GitHub-triggered publishing remains disabled until the token is added.
- [x] Added a secret-gated `clasp` workflow for the isolated HtmlService payload. CI builds and uploads the GAS bundle; production deployment waits for `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` repository secrets.
- [x] Kept each target independent: GitHub Pages (`dist/pages`), Cloudflare Pages (`dist/cloudflare`), and Apps Script (`dist/gas` / `dist/gas-deploy`).
- [ ] Add the Cloudflare Pages API token and Apps Script clasp secrets to repository Actions settings, then run the production workflows. Do not put credentials in repository files or chat.
- [ ] Confirm the final pages.dev and Apps Script /exec routes in a real browser from the owner's device. Cloudflare API confirms publication; external HTTP browser verification was unavailable in this session.

## Newly implemented
- [x] Added bilingual Persian/English public portfolio as the default root experience.
- [x] Added hero, About, selected project cards, focus areas, technology list, contact section, and secondary workspace entry.
- [x] Added responsive dark obsidian design with cyan/emerald accents; removed the custom pointer-following lens at owner request.
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
- [x] Added a build-generated XML sitemap listing the homepage and all eight bilingual case studies; all 17 URLs now receive the current build date in `lastmod`, keeping the sitemap synchronized with deployed content.
- [x] Reframed README, architecture, product surfaces, design direction, next task, and roadmap around the portfolio-first purpose.
- [x] Added ADR-0006 to record portfolio-first hosting and scope.
- [x] Added validation for dedicated case-study hero images: HTTPS, immutable source-commit URLs, and Persian/English alt text.
- [x] Kept the Playwright capture runner artifact-only and read-only; separate approval-manifest publishers verify artifact identity, PNG signature, dimensions, file size, and SHA-256 before publishing selected images.
- [x] Added three evidence-integrity contract tests: local image paths must resolve to committed public files, case-study hero assets must be immutable bilingual source assets, and screenshot capture must remain review-only.
- [x] Audited the actual Pages deployment artifact: all 17 HTML routes have canonical, Open Graph title/description/image, valid JSON-LD, and bilingual alternate links on case-study pages; all 17 PNG share cards are valid 1200×627 files and all sitemap routes resolve to generated pages.
- [ ] External social crawler/cache validation remains open; the internal artifact audit does not substitute for LinkedIn Post Inspector or Facebook Sharing Debugger.
- [x] Captured and visually reviewed ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse desktop/mobile interface evidence; 10 PNGs are pinned to immutable portfolio commits and referenced by the case-study registry.
- [x] Pruned ten unused local screenshot copies from the Pages output while retaining immutable source files in the repository. The real GitHub Pages ZIP artifact dropped from 7,870,673 bytes to 3,811,158 bytes (**51.6% smaller**); a guarded build check and regression test prevent removal if a local reference is introduced.
- [x] Replaced five stale `pooya16pg-spec.github.io` preview URLs with the currently verified `pooya-labs.github.io` Pages hosts; AetherFlow's screenshot remains withheld until its M07/M08 public label mismatch is resolved.

## CI and publishing status
- Repository CI [42218346116](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42218346116) passed on main SHA `12dbfd33adba84f7b67153a1700f3518182e18bc`: TypeScript, Pages build, Apps Script bundle, artifact upload, and **41/41 contract tests**. Job logs report zero failures.
- GitHub Pages build and deployment [42217711525](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42217711525) both succeeded on application-source SHA `654da2cf1e9e975673a0d4e287fffa9125f1117c`. This is the current deployed app source; subsequent commits changed only tests and CI workflow behavior.
- The deployed artifact contains the generated `sitemap.xml` with all 17 URLs marked `2026-11-06`, 16 bilingual case-study routes, and 17 valid 1200×627 PNG social cards. The ten unused local screenshot binaries are absent from the Pages bundle; immutable raw-GitHub screenshot URLs still resolve from the repository.
- The GitHub Pages artifact ZIP measured **3,811,158 bytes**, down from **7,870,673 bytes** before duplicate screenshot pruning (51.6% reduction).
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

The public portfolio embeds ten reviewed desktop/mobile interface screenshots across ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse. The images are committed under `apps/platform/public/interface-captures/`, referenced through immutable raw-GitHub URLs, and include bilingual alt text. ORBIT's two captures are pinned to portfolio commit `77bc3ce0c41533661b8970d2527f4cd94b8a4341`; the other eight captures are pinned to `b0c538b2523daf96700b731a959d690dd3457f7e`.

The five preview URLs that previously used the legacy `pooya16pg-spec.github.io` host now point to the verified `pooya-labs.github.io` host. AetherFlow's preview URL was corrected, but its UI screenshot remains withheld until the independent project's M07/M08 visible label, README host links, and dashboard CORS origin are reconciled. AuraPulse captures remain explicitly labelled simulated/illustrative; the automation-origin Binance ticker request failed CORS and does not establish live market connectivity.

The Playwright capture workflow is artifact-only. Dedicated approval-manifest publishers verify artifact identity, PNG signatures, viewport dimensions, file sizes, and SHA-256 before committing reviewed images. The production Pages build now generates the sitemap from the same project registry as the pages, stamps all 17 sitemap URLs with the build date, and prunes unused local screenshot copies only after verifying that no built HTML/JS/CSS file references them.

The optimized Pages artifact was audited after build: all 17 sitemap routes exist; all 16 case-study pages have canonical, Open Graph, JSON-LD, and bilingual alternate metadata; all 17 share-card PNGs have valid signatures and 1200×627 dimensions; and no duplicate `interface-captures` directory remains in the deployed artifact. The ZIP artifact is 3,811,158 bytes, down 51.6% from 7,870,673 bytes.

Repository CI [42218346116](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42218346116) passed 41/41 tests on main SHA `12dbfd33adba84f7b67153a1700f3518182e18bc`. Pages build and deploy [42217711525](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42217711525) succeeded for application-source SHA `654da2cf1e9e975673a0d4e287fffa9125f1117c`. External LinkedIn/Facebook rendering and cache-refresh checks, project-specific evidence gaps, owner approvals, the full feedback-driven redesign, and Phase 8 release hardening remain open. No V1 release is authorized yet.
