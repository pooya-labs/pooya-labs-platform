# Project Status

**Last updated:** 2026-11-08  
**Repository:** pooya-labs/pooya-labs-platform  
**Branch:** main  
**Current phase:** Phase 7 — Owner-led visual redesign and release review  
**Release:** Pre-alpha / portfolio draft

## Historical repository checkpoint — 2026-11-07 18:17 UTC (superseded by the latest checkpoint below)

- Current `main` HEAD at this audit: `74b19508e77cf20efe414009bb71ca69f91eb700`. The latest commit is documentation-only; the latest application styling change is `e66f4b42562fb6a164117e2b8a3f9905634a1b9e`, and the capture-runner update is `d74c12952be73233f551034d08b5fd212d260d0e`.
- Repository CI [42400540542](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42400540542) passed on the exact current `main` HEAD: TypeScript, Pages/GAS/Cloudflare builds, bundle assembly, and **54/54 contract tests** (0 failures, 0 skipped).
- Portfolio Browser QA [42399972654](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972654) passed on the current application/capture source tree: 17/17 routes, 34/34 desktop/mobile viewports, and zero axe violations. Thirty-four contrast checks remain incomplete and need human visual review.
- GitHub Pages [42399972687](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972687) passed both build and deploy on that same application/capture source tree. Public preview: https://pooya-labs.github.io/pooya-labs-platform/.
- Project capture [42399972697](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972697), artifact [13584314344](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972697/artifacts/13584314344), contains 29 PNG candidates and seven WebM reels. The technical contact-sheet scan completed; these assets remain artifact-only, unpublished, and pending Pooya's publication approval.
- Cloudflare Pages [42399972690](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972690) and Apps Script [42399972770](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972770) completed their configuration checks, but each actual production-deploy job was **skipped** because repository Actions secrets are unavailable. A green wrapper workflow is not evidence of a new production deployment.
- The repository currently has only the `main` branch and no open pull requests or issues. No independent project repository was modified.
- CI emits a Node.js 20 deprecation warning for the current GitHub Actions checkout/setup-node/upload-artifact actions; track the move to Node 24-compatible action releases as maintenance work.

## Product direction — owner clarified
- The main purpose is to introduce Pooya and showcase his software projects to visitors.
- The root website is the public personal portfolio, not a SaaS dashboard or generic customer portal.
- The Spatial OS shell is secondary and remains accessible as a separate workspace experience.
- An owner-only content/management console may be considered after the project content model is stable.
- Full site redesign using Pooya's feedback is a mandatory pre-release Phase 7 gate.
- Apps Script, GitHub Pages, and Cloudflare Pages are independent publishing/runtime targets; none is allowed to become a hard dependency of the others.

## Upstream evidence refresh — 2026-11-07 (17:15 UTC)

- GlobalCart main advanced to 9afa4f5; the current application tree is 6192f8e. Pages and security pass, but Browser E2E remains red at 137/3/9 because hero product links still compute to empty accessible names. Lighthouse, visual QA, and Shopify smoke pass.
- Salon Booking main advanced to 4c4840c through documentation-only updates. Its deployment guide now records Apps Script owner acceptance and keeps the legacy Cloudflare Worker/D1 as archive-only recovery material. Current Pages workflow passed, while current CI fails the owner-dashboard date-range assertion on both Linux and Windows (expected 2026-11-06; actual 2026-11-08); other checks in that run passed.
- ORBIT main remains 2680173; PRs #137, #138, #140 (draft), and #142 (draft) are open proposals, not merged runtime changes.
- No independent project repository was modified during this refresh. Exact evidence and release implications are tracked in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).


## Publishing status — 2026-11-06
- [x] Added an isolated Cloudflare build target: `npm run build:cloudflare` → `dist/cloudflare`, with Cloudflare-specific canonical origin and root base.
- [x] Created Cloudflare Pages project `pooya-labs-platform` on `pooya-labs-platform.pages.dev`; latest checked deployment `0bba4323-359d-4fb6-8d5e-aa833e36b22c` completed successfully from main commit `f9011ec5a3f9eb2faffdac222596b37444184191`. All 83 expected assets, including homepage, bilingual ORBIT routes, sitemap, and robots, are present.
- [x] Added a secret-gated GitHub Actions Cloudflare production trigger that runs type-check/build/contract tests, deploys the exact pushed main commit through the Pages API, and polls for success. Native Pages Git push deployment is paused because the repository push probe did not trigger a deployment. The required `CLOUDFLARE_API_TOKEN` secret is not configured yet.
- [x] Added a secret-gated `clasp` workflow for the isolated HtmlService payload. CI builds and uploads the GAS bundle; production deployment waits for `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` repository secrets.
- [x] Kept each target independent: GitHub Pages (`dist/pages`), Cloudflare Pages (`dist/cloudflare`), and Apps Script (`dist/gas` / `dist/gas-deploy`). Added a build contract to verify host-specific canonical/meta URLs, sitemap, robots, and route asset paths.
- [ ] Add the Cloudflare Pages API token and Apps Script clasp secrets to repository Actions settings, then run the production workflows. Do not put credentials in repository files or chat.
- [ ] Confirm the final pages.dev and Apps Script /exec routes in a real browser from the owner's device. Cloudflare API confirms publication and artifact integrity; direct external browser fetching was unavailable in this session. Apps Script's automatic deployment is still secret-gated.

## Motion-led redesign — first prototype, 2026-11-07

- Added the first Framer-referenced Pooya Labs motion design pass: oversized editorial hero type, sticky glass navigation, real project screenshots layered in a 3D preview stage, project marquee, reveal-on-scroll sections, floating preview windows, gradient motion, hover depth, and mobile layouts. This is an original design implementation, not a pixel-for-pixel copy of Framer or reuse of Framer-owned assets.
- The hero draws from five current project interface images (GlobalCart, ORBIT, NexusCanvas, LuminaGlass, AuraPulse). Project cards prefer interface screenshots over brand marks when a capture exists. Reduced-motion handling remains enabled; the removed pointer-following lens remains removed.
- Latest code/contract tests passed: Repository CI [42400540542](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42400540542) — 54/54 tests on the exact current documentation HEAD, with TypeScript and Pages/GAS/Cloudflare builds.
- Browser QA [42399972654](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972654) passed 17/17 routes and 34/34 viewports with zero axe violations. 34 incomplete axe checks and manual keyboard/screen-reader review remain.
- Pages build/deploy [42399972687](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972687) passed. Cloudflare/GAS production deployment still depends on their separately configured secrets.
- Private screenshot/motion evidence: Project Interface Captures [42399972697](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972697), artifact [13584314344](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972697/artifacts/13584314344), contains 29 PNG captures and seven 8.6–14.5 second WebM reels across AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and GlobalCart. All remain private, artifact-only candidates and are not public website assets; the technical contact-sheet scan is complete, while Pooya's publication approval is still pending.
- Salon Booking is deliberately excluded pending salon-owner approval for a synthetic/redacted capture. No independent project source repo was modified.
- Owner feedback round 1 and round 2 remain mandatory before marking Phase 7 complete. The site remains pre-alpha; do not tag V1.

## Newly implemented
- [x] Added bilingual Persian/English public portfolio as the default root experience.
- [x] Added hero, About, selected project cards, focus areas, technology list, contact section, and secondary workspace entry.
- [x] Added responsive dark obsidian design with cyan/emerald accents; removed the custom pointer-following lens at owner request.
- [x] Added honest project status labels and links verified against the individual source READMEs.
- [x] Retained the Spatial OS shell as a secondary workspace, with a return link to the public portfolio.
- [x] Added versioned built-in app manifest v1 and validation for unique IDs/shortcuts, localized metadata, and owner-workspace scope.
- [x] Added a typed portfolio content registry with explicit review state, localized copy, unique slugs, and verified HTTPS source/demo URLs.
- [x] Added a bilingual novels library with an empty public catalog, responsive book-cover cards, an in-site Markdown/TXT reader, and a documented GitHub upload workflow in [NOVELS-GUIDE.md](NOVELS-GUIDE.md). No story copy or titles have been invented.
- [x] Added eight bilingual internal case-study views with challenge, approach, engineering highlights, scope boundaries, and shareable query-string routes.
- [x] Expanded all eight case studies with source-backed role/attribution, architecture, implementation details, engineering decisions, verification evidence, and direct source/CI references.
- [x] Added a per-project content audit that explicitly separates source-confirmed facts from release-blocking owner inputs and missing evidence.
- [x] Generated eight project-specific architecture diagrams in Persian and English from the documented system boundaries and data flows.
- [x] Generated 16 static crawler-readable case-study pages (8 projects × 2 languages) with canonical URLs, hreflang, JSON-LD, rendered article content, and locale-specific source links.
- [x] Generated 16 per-project social preview SVG cards and a homepage card; added OG image metadata, sitemap alternates, and robots.txt.
- [x] Added demo, source, and case-study actions to project cards.
- [x] Added seven verified source-repository visual assets with pinned commit URLs and bilingual alt text; card media is lazy-loaded, responsive, and falls back cleanly.
- [x] Added actual GlobalCart desktop/mobile storefront screenshots and ten reviewed desktop/mobile UI captures across ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse. Remaining brand artwork is clearly distinguished from product-interface evidence; AetherFlow and Salon Booking UI captures remain gated by their documented evidence requirements.
- [x] Added a separate Chromium browser-QA workflow. The current build passed **17/17 Persian/English routes** and **34/34 desktop/mobile viewport checks** (1440×1000 and 390×844), with zero horizontal overflow, missing image-alt attributes, uncaught page errors, or failed keyboard skip-navigation checks. The full report is preserved as Actions artifact [13510613719](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110102/artifacts/13510613719).
- [x] Added bilingual keyboard skip links to the home page and both interactive/static case-study renderers. They are hidden until keyboard focus, use fixed positioning so they remain visible after restored scrolling, target the main content, and disable the entrance transition under reduced motion. This is a focused implementation improvement, not a substitute for full manual keyboard/screen-reader QA.
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

## Novel library
- The homepage includes a Persian/English novels section backed by apps/platform/public/novels/catalog.json.
- Cover art belongs in apps/platform/public/novels/covers/; manuscripts belong in apps/platform/public/novels/manuscripts/.
- Only published=true entries appear as cards. Because this repository is public, published=false hides a card but does not make its files private.
- Read [NOVELS-GUIDE.md](NOVELS-GUIDE.md) for the exact GitHub upload steps and JSON catalog example.

## CI and publishing status
- Follow-up documentation checkpoint CI [42248414717](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42248414717) passed after the latest docs-only update.
- Repository CI [42247729151](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247729151) passed on test checkpoint SHA 53c13993ca2aa2dbbb007454729a084fcdce43b4: TypeScript, all three target builds, artifact upload, and **52/52 contract tests**.
- Portfolio Browser QA [42247171025](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247171025) passed on UI SHA 468c1f60ab11223693f3678213d48848100ae63e: **17/17 routes, 34/34 desktop/mobile viewports, zero axe violations, zero workflow failures**. The 34 incomplete records remain color-contrast checks requiring manual visual review; this is not WCAG certification.
- GitHub Pages run [42247171442](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247171442) completed successfully on UI SHA `468c1f60ab11223693f3678213d48848100ae63e`; both Build and Deploy jobs passed. Artifact [13518846598](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247171442/artifacts/13518846598) contains the novels catalog, cover/manuscript directories, and the updated application bundle.
- Cloudflare and Apps Script deployment configuration checks completed for SHA 468c1f6, but their actual production deploy jobs were skipped because the required credentials are unavailable (runs 42247171477 and 42247171633).
- Repository CI [42238363801](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363801) passed on code SHA `dc991c4a90aad92ec4006332fffccf04fdd09951`: TypeScript, all three target builds, artifact uploads, and **46/46 contract tests**.
- Accessibility remediation: commit [38203322](https://github.com/pooya-labs/pooya-labs-platform/commit/38203322f11184adb06064a530c5f8b4bc5c05a2) removed the redundant custom brand name and enlarged header/navigation hit areas. Browser run [42236238032](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42236238032) passed all 17 routes and 34 desktop/mobile viewport checks with zero axe violations.
- Strict axe QA is enforced: critical and serious findings fail the browser workflow, and incomplete rule details are retained in the report. On UI SHA `dc991c4a90aad92ec4006332fffccf04fdd09951`, browser run [42238363900](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363900) passed **17/17 routes, 34/34 viewport checks, and zero critical/serious/moderate/minor violations**. Its 34 incomplete checks are all `color-contrast` reviews that axe cannot automatically resolve against layered gradients/glass surfaces; human visual contrast review remains open. The hero artwork has explicit `role="img"` and localized accessible naming.
- GitHub Pages deployment [42238363799](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363799) completed successfully on code SHA `dc991c4a90aad92ec4006332fffccf04fdd09951`; both build and deploy jobs passed on the final attempt. The documentation-only checkpoint is now `aa62b230eaaee350df0c6c8017d1eccf9fb91e10` on `main`; it does not alter the deployed UI bundle.
- The exact GitHub Pages artifact [13511808294](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363799/artifacts/13511808294) was downloaded and audited: **17 HTML documents** (homepage + 16 bilingual case-study routes), **17 PNG Open Graph cards** (all valid PNGs at 1200×627), **17 sitemap targets**, and a robots.txt sitemap pointer. All 17 HTML documents contain canonical, OG image, description, and JSON-LD metadata; all 16 case-study pages also contain language alternates. The AetherFlow bilingual pages point to the current `pooya-labs.github.io` host.
- A separate recapture workflow [42235240283](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42235240283) produced twelve new artifact-only desktop/mobile candidates for AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse. All twelve were visually inspected individually; they remain unapproved and unpublished. AetherFlow still shows M07 and duplicate Dashboard labels, AuraPulse's Binance ticker request failed CORS, ORBIT/NexusCanvas display illustrative/demo data, LuminaGlass is captured at 32px blur, and Pooya.OS exposes a profile portrait that needs owner approval.
- Cloudflare workflow [42238363845](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363845) skipped the actual deployment because `CLOUDFLARE_API_TOKEN` is unavailable. Last verified Cloudflare production deployment remains `0bba4323-359d-4fb6-8d5e-aa833e36b22c` from SHA `f9011ec5a3f9eb2faffdac222596b37444184191`.
- Apps Script workflow [42238363818](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363818) skipped actual deployment because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are unavailable.
- External LinkedIn/Facebook crawler rendering and cache refresh still require authenticated owner-side checks; the static artifact audit is not a substitute.
- Public preview: https://pooya-labs.github.io/pooya-labs-platform/
- Current project-specific evidence gaps and screenshot acceptance rules are tracked in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).
- Confirm that repository Pages source remains GitHub Actions so a legacy branch/Jekyll deployment cannot supersede the Vite portfolio.

## Pending owner review
- [ ] Work through every project-specific release item in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md); it identifies missing attribution, screenshots/diagrams, current-SHA evidence, manual QA, and runtime acceptance for each project.
- [ ] Review and approve the public biography and positioning.
- [ ] Curate the featured project order and descriptions.
- [ ] Confirm project statuses, links, screenshots, and public evidence.
- [ ] Confirm your role/contribution for each project before final case-study copy is approved.
- [ ] Decide which contact channel should be published.
- [ ] Review the complete portfolio design on desktop and mobile. The current implementation is a draft, not final. Automated browser checks are green; manual visual, keyboard, and screen-reader review remains open.

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

## Latest checkpoint — 2026-11-07

- Current verified portfolio application/source checkpoint: [`5a379757809888a1a8c98335f6006746372779e1`](https://github.com/pooya-labs/pooya-labs-platform/commit/5a379757809888a1a8c98335f6006746372779e1). It refreshes GlobalCart's latest M09.8 accessibility evidence in the bilingual dossier, source audit, handoff, and machine-readable state.
- Repository CI [42393819743](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42393819743) passed on the exact checkpoint: **52/52 contract tests**, TypeScript, and all three builds (Pages, Cloudflare Pages, and Apps Script).
- Portfolio Browser QA [42393819729](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42393819729) passed on the same checkpoint: **17/17 routes, 34/34 desktop/mobile viewports, zero axe violations**. Thirty-four incomplete contrast records still require human visual review; they are not violations but remain manual acceptance work.
- GitHub Pages build and deployment [42393819716](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42393819716) both passed on the same SHA. This is the currently verified public-host release.
- Cloudflare Pages workflow [42393819745](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42393819745) and Apps Script workflow [42393819727](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42393819727) completed their credential/configuration checks, but their actual production deploy jobs were skipped because the required repository secrets are not present. Their green wrapper runs do not prove production deployment.
- **ORBIT main** `268017365cd22f7db9dd8895fb59fbccc76c9b8f`: PR #136 added the Cloudflare Worker edge gateway. CI [42223939950](https://github.com/pooya-labs/orbit/actions/runs/42223939950), Security [42223939967](https://github.com/pooya-labs/orbit/actions/runs/42223939967), and Pages [42223939898](https://github.com/pooya-labs/orbit/actions/runs/42223939898) passed. The Worker is **not live-connected**: workers.dev route disabled, private origin and `ORBIT_GATEWAY_SECRET` unset, API routes fail-closed. CF01–CF05 acceptance remains open.
- **GlobalCart main** `119afcd4924fbdda0287558d00926ab051255e59`: v0.2.3-dev / M09.8. Current application SHA `61ce7f5` remains the application tree because the later main commit changed only `data/catalog.json`. Pages [42392071302](https://github.com/pooya-labs/globalcart/actions/runs/42392071302) and Security [42392071307](https://github.com/pooya-labs/globalcart/actions/runs/42392071307) passed. Browser E2E [42392071315](https://github.com/pooya-labs/globalcart/actions/runs/42392071315) failed **134 passed / 6 failed / 9 skipped**: six serious `label-content-name-mismatch` axe findings on hero product-link accessible names across Chromium, Firefox and WebKit. Lighthouse [42392214241](https://github.com/pooya-labs/globalcart/actions/runs/42392214241), visual QA [42392214297](https://github.com/pooya-labs/globalcart/actions/runs/42392214297), and Shopify smoke [42392214325](https://github.com/pooya-labs/globalcart/actions/runs/42392214325) passed. M09.8 and 1.0.0 remain blocked pending an accessible-name fix and full E2E rerun, plus manual owner review.
- Read-only main-ref enumeration was performed for all eight source repositories. Only GlobalCart had a later upstream main commit relative to the previous platform audit. No upstream project repository was modified; integration remains deferred to Phase 9.
- The public novels catalog remains intentionally empty pending Pooya-provided titles, descriptions, cover art, and manuscripts. Product remains pre-alpha / portfolio draft. Phase 3, mandatory Phase 7 redesign, and Phase 8 V1 hardening remain open.

## Current release blockers (ordered)

1. **Owner content approval:** biography/positioning, first three featured projects, project order, personal contribution wording, statuses, contact channel, and visual assets.
2. **Project evidence:** AetherFlow M07/M08 + duplicate Dashboard mismatch; feature-specific ORBIT/NexusCanvas/LuminaGlass/AuraPulse captures; Salon Booking privacy-approved redacted screenshots and publication permission.
3. **Manual accessibility and visual review:** color contrast, keyboard-only navigation, screen reader, and representative real devices.
4. **External share validation:** LinkedIn/Facebook crawler rendering and cache refresh for the 17 PNG social cards.
5. **Current-source project verification:** GlobalCart M09.8 full Browser E2E, 1,000-gallery verification and exact-current-SHA deployment E2E, ORBIT runtime acceptance, and remaining project-specific checks in PROJECT-CONTENT-AUDIT.md.
6. **Release design:** full-site redesign with two owner feedback rounds (Phase 7), followed by Phase 8 hardening and explicit V1 approval.

No V1 release is authorized while these mandatory gates remain open.


## Owner feedback — 2026-11-08: visual polish round 1

- Pooya requested a more polished, graphic, motion-rich portfolio; the floating utility controls in the header are not accepted and must be replaced by a clearer compact control group.
- The case-study desktop layout has a reported text containment defect. The implementation adds min-width-safe grids, wrapping, and bounded media frames.
- The supplied Pooya P mark is the approved brand direction. A warm metallic-gold SVG treatment is selected as the primary mark; verify contrast in both themes.
- Stripe's “The backbone of global commerce” section was inspected on the live desktop reference. Its hierarchy is a quiet headline/statistics band followed by an animated radial particle burst. A distinct Pooya Labs version uses truthful portfolio metrics (8 projects, 16 localized case-study routes, 2 interface languages, 3 publishing targets), with original CSS artwork.
- Case-study media now supports paired desktop and mobile captures. Fresh full-page capture candidates are requested for all seven prior public demos plus Salon Booking's public customer journey.
- Salon Booking admin routes and customer records are explicitly excluded from capture. Capture workflow output remains private artifact-only until visual/privacy review.
- This feedback round is implemented on branch `feat/portfolio-polish-stripe-motion`; no independent project repository is modified.
- This task is not final owner approval. Phase 7 remains open until Pooya reviews the revised desktop and mobile result and confirms the complete design.


## Capture review — 2026-11-08

- The Playwright capture run `42468215117` completed successfully: 47 screenshots and 8 short motion reels across 8 public project demos.
- 14 full-page desktop/mobile captures were visually and privacy reviewed and approved for publication: AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and Salon Booking.
- Salon Booking screenshots cover only the public customer booking flow. No admin route or customer records were visited or captured.
- AuraPulse screenshots show its simulated trading dashboard. The capture environment cannot access its Binance ticker endpoint due to CORS, so no live-market claim is made.
- GlobalCart full-page captures are deliberately not approved: its currently published collection grid shows blank product placeholders. Existing curated GlobalCart screenshots remain in the portfolio until that separate project is repaired.
- A checksum-verified publishing workflow and approval manifest are included in the review branch. Images will be committed to the public asset directory only after this PR is merged.


## Full-page gallery integration — 2026-11-08

- The 14 approved full-page desktop/mobile screenshots have been published in `apps/platform/public/interface-captures/` at asset commit `eba5e2d02047375ae8a42514f7bbb58c75106ba7`.
- A follow-up review branch adds immutable, commit-pinned image references to seven case studies: AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and Salon Booking.
- The full-page frames are keyboard-focusable, labelled, and internally scrollable so the complete pages remain readable.
- GlobalCart keeps its existing curated desktop/mobile screenshots; its full-page capture remains excluded until the public collection grid is fixed.


## Latest verified checkpoint — 2026-11-08 11:37 UTC

- **Current `main` HEAD:** `fa5d412506387622ca39df792fcaed62eb88cb67`. Phase 7's third visual feedback cycle and the screenshot-landmark accessibility follow-up are merged. Pull requests [#6](https://github.com/pooya-labs/pooya-labs-platform/pull/6) and [#7](https://github.com/pooya-labs/pooya-labs-platform/pull/7) are closed and merged.
- **Design round 3:** replaced the old gold folded logo with a compact ivory/emerald P monogram and matching favicon; rebuilt the header and theme-aware controls; unified the graphite/ivory/emerald palette; redesigned the footer; slowed the homepage screenshot stage; and made the radial proof section full-width with a centered headline, four metrics, and an original animated vector ray/particle field inspired by Stripe's visual hierarchy (no Stripe code or assets are reused).
- **Case-study diagrams:** the SVG generator now wraps bilingual node titles, details, and diagram captions into bounded text lines with explicit RTL/LTR direction and centered alignment. This addresses the overflow visible in the ORBIT monitor photo across all eight project diagrams.
- **Direct navigation:** browser scroll restoration is manual and direct page visits are reset to the top of the document.
- **Contact links:** Telegram `@pooyayee` and Instagram `@_p.ooya` are now first-class buttons in the contact section and footer, with both profiles added to Person metadata.
- **Project media:** reviewed AuraPulse dashboard and Shayan Salon public customer-booking captures are wired to the project cards and case-study pages. Salon Booking admin routes and customer records remain excluded.
- **Accessibility follow-up:** project screenshot scroll regions have unique project-specific accessible names. This removed the 32 repeated `landmark-unique` moderate axe findings. The latest Browser QA now reports zero axe violations.
- **Validation on exact `main` SHA `fa5d412506387622ca39df792fcaed62eb88cb67`:**
  - Repository CI [42476478338](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42476478338): TypeScript, three-target builds, and **67/67 contract tests** passed.
  - Portfolio Browser QA [42476478346](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42476478346): **17/17 routes**, **34/34 desktop/mobile viewports**, zero axe violations, zero workflow failures.
  - GitHub Pages [42476478354](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42476478354), Cloudflare Pages [42476478409](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42476478409), and Apps Script [42476478245](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42476478245): deployments all completed successfully on the same main SHA.
- **Manual accessibility is not closed:** 36 axe checks remain incomplete (34 color-contrast checks and 2 `aria-prohibited-attr` checks). These are inconclusive checks, not reported violations; verify them manually on representative light/dark, Persian/English, desktop/mobile surfaces. Keyboard-only and screen-reader sessions still need human review.
- **Release remains pre-alpha:** the redesign is implemented and deployed, but Pooya has not yet approved the complete visual result or the outstanding biography, project ordering, attribution, manual accessibility, external social-preview, and release/rollback checks. Do not tag V1 until those owner/release gates are completed.
