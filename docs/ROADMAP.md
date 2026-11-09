# Roadmap

The release target is a credible, distinctive personal portfolio that introduces Pooya and makes his strongest engineering projects easy to inspect. A phase is complete only when its acceptance criteria are evidenced in STATUS.md and relevant checks have passed.

## Phase 0 — Product positioning and audience
- [x] Define Pooya Labs as a personal portfolio and engineering project showcase.
- [x] Set the primary visitor journey: understand Pooya → explore selected work → inspect case studies/evidence → connect.
- [x] Separate the public portfolio from the secondary owner workspace.
- [x] Decide that portfolio visitors do not need a generic customer account or dashboard.
- [x] Define guardrails against fake metrics, inflated skills, guessed project links, and unsupported completion claims.
- [ ] Review and approve the public biography, positioning, and featured-project priorities with Pooya.

**Exit gate:** the website has one clear audience and purpose; the content and feature scope supports the portfolio journey.

## Phase 1 — Repository foundation and engineering toolchain
- [x] Establish the repository, agent instructions, recovery/handoff state, and ten-phase delivery plan.
- [x] Configure React, TypeScript, Vite, npm workspaces, and Node contract tests.
- [x] Add GitHub Actions CI for type-check, builds, tests, and Pages deployment.
- [x] Add bilingual and RTL/LTR foundations.
- [x] Add dependency-free lint/format checks, editor defaults, contribution guidance, and release conventions.
- [x] Update GitHub Actions to maintained Node 24-compatible action releases and confirm the Node.js 20 deprecation warning is gone.
- [ ] Verify the active GitHub Pages source is GitHub Actions and that the canonical public site tracks the latest successful build.

## Phase 2 — Public portfolio foundation
- [x] Make the personal portfolio the default root experience.
- [x] Add the first bilingual intro / hero, about, selected-projects, tools, and contact sections.
- [x] Add honest prototype / in-development / released labels based on project source records.
- [x] Remove the experimental pointer-following lens at owner request; preserve the native pointer.
- [x] Keep the Spatial OS shell as a secondary workspace, not the homepage.
- [ ] Refine the responsive navigation, keyboard behavior, focus states, and mobile reading flow.
- [ ] Replace draft personal copy with owner-approved biography, project summaries, and links.

## Phase 3 — Portfolio content architecture and case studies
- [x] Create a typed project content schema with explicit project status and owner-review state.
- [x] Move project data out of the portfolio component into a validated content registry with unique slugs and verified-link rules.
- [x] Add verified repository and public preview links for the eight current projects.
- [x] Add initial bilingual project case-study views with shareable query-string routes.
- [x] Add project-specific challenge, approach, engineering highlights, and scope/boundary sections based on repository documentation.
- [x] Expand all eight bilingual dossiers with source-backed role/attribution, architecture, implementation details, engineering decisions, verification evidence, and direct source/CI references.
- [x] Add a per-project content audit that separates source-confirmed facts from the missing evidence and owner decisions needed before V1.
- [x] Add a separate public novels library driven by a validated JSON catalog, with cover images, an in-site Markdown/TXT reader, and a documented GitHub upload workflow. Keep the catalog empty until Pooya supplies final titles and copy.
- [ ] Curate the featured-project order with Pooya; highlight only the strongest and most presentable work.
- [ ] Review and approve every public project description and status with Pooya; retain source-backed technical facts as the baseline.
- [ ] Confirm personal role/contribution wording for all eight projects; AetherFlow's current README does not identify an individual author or contribution split.
- [ ] Complete the per-project screenshot, architecture-diagram, current-SHA verification, manual QA, and owner-acceptance tasks in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).
- [ ] Add any missing project outcomes or measured results only when the source repository provides reproducible evidence; never infer metrics.
- [x] Add seven source-repository project-card/hero visuals pinned to immutable commits, bilingual alt text, lazy loading, responsive rendering, and graceful fallbacks.
- [x] Add real GlobalCart desktop/mobile storefront screenshots from its source repository, pinned to the same immutable source commit and shown in the GlobalCart case study.
- [x] Add visually reviewed desktop/mobile UI screenshots for ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse; pin every published image to an immutable portfolio commit and use bilingual alt text.
- [ ] Capture AetherFlow desktop/mobile UI evidence after reconciling the public M07 badge with the audited M08 status.
- [ ] Add further feature-specific captures for ORBIT Incidents/Metrics/Logs/Traces, NexusCanvas rack/analysis/snapshot states, LuminaGlass export/Audio Lab/task-board states, and AuraPulse connected/fallback ticker states where useful.
- [ ] Use only owner-approved, privacy-reviewed synthetic/redacted interface screenshots for Salon Booking.
- [x] Add dynamic browser titles/descriptions, base Open Graph metadata, canonical URL updates, Person JSON-LD, and a branded SVG favicon.
- [x] Add an XML sitemap for the portfolio homepage and eight shareable project-detail URLs.
- [x] Generate crawler-readable static Persian and English case-study pages for all eight projects, with canonical URLs, hreflang, JSON-LD, source links, 17 raster PNG social preview cards (homepage plus eight projects × two languages), and matching SVG source cards.
- [ ] Validate the 1200×627 PNG Open Graph previews in external crawler/share clients; confirm the platforms refresh their cached cards and add alternate formats only if an actual client requires them.

## Phase 4 — Secondary workspace boundary (closed for V1 scope)

- [x] Keep the public portfolio as the primary visitor experience; the existing Spatial OS shell remains a separate, secondary experience.
- [x] Do not add public visitor accounts, a generic SaaS dashboard, or an owner CMS to the portfolio V1.
- [x] Keep private owner functionality out of public routes unless a real server-side authorization boundary is designed and tested.
- [x] Defer new owner-console tools until there is a concrete content-management need and a separate security design.

**Scope decision:** a new owner console is not required to launch this static portfolio. This phase is closed by an explicit scope boundary, not by claiming that a private CMS was built. Reopen it only for a separate, approved product requirement.

## Phase 5 — Contact and backend boundary (closed for V1 scope)

- [x] Use the already configured direct contact destinations: GitHub, Telegram, and Instagram.
- [x] Do not add a submission form, database, or Apps Script dependency while direct contact links satisfy the visitor journey.
- [x] Keep the static GitHub Pages and Cloudflare Pages portfolio independent of the historical Apps Script transport proof.
- [x] Preserve privacy/security requirements if a future form is approved: explicit consent, validation, abuse controls, retention/deletion policy, and server-confirmed receipt.

**Scope decision:** direct contact links are sufficient for V1. A contact backend is not a release blocker and must not be built without an explicit need.

## Phase 6 — Focused project showcases (closed for current scope)

- [x] Build eight project-specific case-study hero scenes that explain each project's actual workflow or interface.
- [x] Add a distinct motion signature to the eight selected-project cards.
- [x] Respect reduced-motion preferences and keep static fallbacks available.
- [x] Keep screenshot evidence separate from decorative hero motion and lazy-load lower-page media.
- [x] Avoid embedding heavy standalone project applications into the portfolio before the final project-integration stage.

**Scope decision:** the existing motion-led case-study and card experiences are the approved baseline for the next review. New interactive demos, embedded applications, and project-specific deep integrations are deliberately deferred to Phase 9, after the complete redesign is approved.

## Phase 7 — Pre-redesign readiness and engineering closeout

### Ownership and portfolio boundaries
- [x] Record the owner's explicit project boundary: Pooya Labs Platform is the sole project in this portfolio set intended for his exclusive ownership, control, product direction, and use. Keep the statement limited to original platform work; do not extend it to independent projects, client assets, contributors, upstream code, or dependencies.
- [x] Add a bilingual ownership/IP policy and a ten-repository ownership/license register. Preserve AetherFlow's Apache-2.0 license, ORBIT's existing no-license/all-rights-reserved position, and Salon Booking's client-controlled assets. Do not add a root LICENSE or general reuse grant to the platform without a separate owner decision.
- [ ] Complete a project-specific legal/title and third-party asset review before making any formal copyright/rights assignment claim.


This phase is the work currently in progress. Complete every autonomous engineering, source-verification, documentation, deployment, performance, and accessibility-preparation task before starting the penultimate redesign. Do not begin the full redesign while known platform defects or unresolved technical uncertainty can still change its requirements.

### Product and content readiness
- [x] Record and refresh read-only checkpoints of all eight current upstream `main` SHAs, latest commits, release states, open PRs, and exact-head build/deploy evidence in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md) (latest: 2026-11-09 15:25 UTC). No upstream repository was modified.
- [ ] Complete the full feature/route, live-link, contribution, logo/media/source, caption, and alt-text acceptance for all eight projects. Final portfolio content/media integration remains Phase 9 work.
- [ ] Keep every unverified claim, missing contribution statement, and unavailable runtime visibly bounded; never convert a prototype, simulated feed, synthetic demo, or unpublished service into a live/production claim.
- [ ] Verify all current project links, logos, owner attributions, image sources, captions, and alt text against the newly rechecked upstream repositories; the new SHA inventory does not substitute for feature-level or owner acceptance.
- [x] Apply Pooya's 2026-11-09 platform identity instruction: identify Pooya Monogram (پویا مونوگرام) as the platform owner, use the centered black-tile logo in the homepage/case-study footers and bilingual README ownership blocks, and expose the brand in structured metadata. This is a narrow identity confirmation only; it does not approve project-specific claims or media.
- [x] Prepare the bilingual owner-review packet covering homepage copy, featured-project order, source-backed roles/statuses, contact channels, media, disclosure boundaries, and Novels decision; see [OWNER-REVIEW-PACKET.md](OWNER-REVIEW-PACKET.md). Preparation is complete; owner content/media approvals remain pending.
- [ ] Confirm whether the empty novels library should stay hidden/empty or receive owner-provided content; do not invent titles, covers, or manuscripts.

### Platform engineering and quality
- [x] Add dependency-free lint and formatting checks to CI and publish contribution/release conventions.
- [x] Keep Node 24-compatible GitHub Actions and the passing Repository CI/Browser QA checks.
- [x] Add a cold-context Chromium performance probe for the homepage and all eight project routes at desktop/mobile sizes; collect navigation timing, FCP/LCP, CLS, and resource-size data.
- [x] Resolve direct-route CLS by server-rendering the shared case-study component and hydrating the existing DOM with `hydrateRoot`; preserve crawler-readable direct routes.
- [x] Repeat the cold-context three-host baseline after the monogram asset publish: Browser QA [42514976406](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406), artifact [13631024148](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406/artifacts/13631024148), measured 20 samples per host with p75 CLS 0.0000 on local build, GitHub Pages, and Cloudflare Pages; p75 LCP was 316 ms local, 400 ms on GitHub Pages, and 400 ms on Cloudflare Pages. Keep enforcement report-only pending owner/device/network review.
- [ ] Keep performance budget enforcement report-only until representative physical-device/network evidence and owner review are complete.
- [x] Add a high-severity dependency advisory gate; Repository CI run [42509020236](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42509020236) reported 0 dependency vulnerabilities.
- [ ] Complete responsive navigation, keyboard-only operation, visible focus, and screen-reader-flow audit for Persian and English, both themes.
- [ ] Resolve or document every reproducible accessibility defect. Manually evaluate gradient/pseudo-background contrast cases that axe cannot calculate; incomplete checks are not passes.
- [ ] Establish measurable performance budgets for initial load, route transitions, largest media, animation cost, and mobile responsiveness; measure the current implementation against them.
- [x] Add a dependency-free high-confidence credential scan for tracked source and both public build outputs; Repository CI [42517885668](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42517885668) passed the scan with no recognized matches, 0 dependency vulnerabilities, and 101/101 contract tests. The scanner's pattern and binary/history limitations are documented in [SECURITY-MODEL.md](SECURITY-MODEL.md); broader security review remains open.
- [x] Audit all eleven GitHub Actions workflows for explicit least-privilege token permissions and sensitive triggers. Validation/capture jobs remain read-only, Pages has deployment-only scopes, the three image publishers use read-only default tokens plus repository-scoped App tokens, and the manual App smoke workflow is restricted to a non-product marker file. No `actions: write`, `pull_request_target`, or `workflow_run` permission/trigger was found (2026-11-09).
- [x] Remove direct-to-`main` writes from all three reviewed-capture publishers and replace them with repository-scoped GitHub App PR creation; merge PR [#28](https://github.com/pooya-labs/pooya-labs-platform/pull/28) and verify CI, Browser QA, and fail-closed main-branch behavior when App secrets are absent. See [GITHUB-REPOSITORY-GOVERNANCE.md](GITHUB-REPOSITORY-GOVERNANCE.md).
- [x] Install the dedicated GitHub App and configure both private Actions secrets; owner confirmed the installation is limited to `pooya-labs/pooya-labs-platform`. All three manual publisher dispatches successfully created repository-scoped App installation tokens (runs [42631761203](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42631761203), [42632714049](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42632714049), [42632732364](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42632732364)).
- [x] Add a manual GitHub App permission smoke workflow that reuses the App token and PR action but stages only `.github/app-publisher-smoke/latest-run.md`; merge PR [#32](https://github.com/pooya-labs/pooya-labs-platform/pull/32) after CI and Browser QA pass.
- [x] Dispatch the App permission smoke workflow from `main`, verify its App-created marker-only PR and passing Repository CI plus Portfolio Browser QA, then merge it as PR #34 / commit `42d12a1` (2026-11-09).
- [x] Verify the active `main` ruleset's normal PR/check/merge path under the newly enforced policy. The active ruleset `26861856` was exercised by docs PRs #36 and #37; both required checks passed and both PRs merged through the normal path with no bypass. Post-merge Repository CI passed. A deliberately failing PR was not created; negative pending/failed-check enforcement is not tested.
- [ ] On the next genuine owner-approved capture update, verify one image publisher proposes the actual approved image diff in its own App-created PR. Do not fabricate a screenshot change.
- [ ] Complete the remaining manual public/private asset-boundary and external-link safety review.
- [x] Verify production-rendered Open Graph/canonical/hreflang metadata on the homepage and Persian/English ORBIT routes via Cloudflare Browser Rendering; both case-study routes returned the correct locale, language-specific OG image (1200×627), canonical URL, and fa/en/x-default alternates. The deployed file manifest contains all 17 PNG cards.
- [ ] Validate all 17 PNG social preview cards with external crawler/share clients and document which clients/cache refreshes were actually verified.
- [x] Verify source/build generation of host-specific `robots.txt` and `sitemap.xml`: the Vite plugin derives both from `SITE_ORIGIN` / `SITE_BASE`, and `tests/platform/multi-host-build-contract.test.mjs` asserts 17 canonical sitemap locations and a matching Sitemap URL in both Pages and Cloudflare build outputs.
- [ ] Fetch the live robots.txt/sitemap.xml response bodies and validate the deployed responses; direct Browser Rendering requests were rate-limited. Authenticated external social crawler/cache validation remains a separate gate.
- [x] Verify the canonical GitHub Pages host serves the exact latest application build: workflow 42651297113 passed both Build and Deploy on main `97094ed0`, artifact `13690386196`, with canonical environment URL. The owner-side Settings source selection remains separately reviewable if needed.
- [x] Verify Cloudflare production deployment from current main commit `97094ed0`: deployment [`a075e139`](https://a075e139.pooya-labs-platform.pages.dev/) (ID `a075e139-20d1-4587-91a9-b73904499065`) completed queue, initialize, clone, build, and deploy stages successfully; the deployment manifest contains 106 files including all public routes, brand, sitemap, robots, and OG assets.
- [ ] Repair and re-verify native Cloudflare Git-integration push trigger. PR #39 merged a matching-path change under `apps/platform/**`; no `github:push` deployment was created even though the Pages project reports GitHub source, production branch `main`, production deployments enabled, and matching path filters. Manual fallback deployment `a075e139` was therefore started through the Cloudflare API with trigger `ad_hoc`. The separate GitHub Actions deploy job `42651297288` skipped because `CLOUDFLARE_API_TOKEN` is absent. Do not add or change secrets/settings without Pooya's explicit action.
- [ ] If the Apps Script Web App is required, configure `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID`; the latest production publish job skipped because these secrets are missing.
- [x] Document independent GitHub Pages and Cloudflare Pages publish, smoke-test, and source-consistent rollback procedures in [STATIC-HOST-DEPLOYMENT.md](STATIC-HOST-DEPLOYMENT.md).
- [x] Verify both production hosts are built from exact current main `97094ed0`: Pages run 42651297113 / artifact 13690386196; Cloudflare deployment `a075e139` / ID `a075e139-20d1-4587-91a9-b73904499065`. Cloudflare was published through authorized API fallback after the native Git-push trigger did not materialize.
- [ ] Rehearse a rollback/recovery for each public host and record exact steps, expected artifacts, and verification. Do not perform a destructive production rollback without explicit owner approval; the procedure is documented, not executed.
- [ ] Run a final source/content audit checkpoint and synchronize STATUS, NEXT, CHANGELOG, and project-state.json.

### Owner/device acceptance inputs required to exit Phase 7
- [ ] Pooya reviews the current baseline on desktop and a physical Android device; Chromium emulation alone is not physical-device acceptance.
- [ ] Pooya confirms the biography, headline, role/contribution wording, featured order, public contact details, and permitted personal assets.
- [ ] Pooya/salon owner approves any public Salon Booking case-study attribution and privacy-reviewed synthetic/redacted imagery.
- [ ] Complete the remaining human accessibility review with keyboard and assistive technology; record the exact browser/device/screen-reader combinations.

**Exit gate:** autonomous readiness work is complete, all known defects are fixed or explicitly bounded, and the owner-review packet is ready. Only then begin Phase 8. Phase 7 does not include the final project-by-project media/content integration; that is intentionally reserved for Phase 9.

## Phase 8 — Complete redesign and owner approval (penultimate stage)

This is the second-to-last stage before V1. The full public site is redesigned again only after Phase 7 readiness is satisfied. The current site remains a review baseline, not the final approved design.

- [ ] Revisit the full visual direction with Pooya, including identity, logo usage, typography, color system, hierarchy, spacing, page flow, responsive behavior, navigation, motion, and project-storytelling approach.
- [ ] Compare at least two coherent design directions and agree on one before implementation.
- [ ] Redesign the entire portfolio consistently—not as isolated section patches—including homepage, navigation, project cards, case-study templates, media galleries, About, novels, contact, and footer.
- [ ] Preserve correct content boundaries, verified links, RTL/LTR behavior, reduced motion, accessibility, and performance budgets throughout the redesign.
- [ ] Publish a review preview and complete owner review round one on desktop and mobile.
- [ ] Record all requested revisions and apply the approved changes.
- [ ] Publish the revised preview and complete owner review round two, including physical-device confirmation.
- [ ] Obtain explicit written owner approval of the complete redesigned site and freeze the design direction.

**Exit gate:** Pooya explicitly approves the complete redesigned portfolio after the second review. Do not begin final project integration until this approval is recorded.

## Phase 9 — Full project integration (final stage before V1 publication)

This is the last implementation stage before release. Integrate all eight independent projects into the approved portfolio design only after Phase 8 approval. "Integration" here means complete portfolio-level presentation—verified product facts, case studies, project-specific evidence, links, media, and only the interactive demonstrations that genuinely improve understanding. It does not mean blindly copying all source code into one repository.

- [ ] Recheck exact upstream main SHAs, releases, current CI, open PRs, hosted routes, and project acceptance state for AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, GlobalCart, and Salon Booking.
- [ ] Complete and approve each project's full bilingual case study, challenge, role/contribution, architecture, decisions, feature walkthrough, validation evidence, limitations, and current status.
- [ ] Add the final owner-approved desktop/mobile screenshots, feature-specific captures, diagrams, logos, captions, and alt text. Promote capture artifacts only through the existing checksum/approval workflow.
- [ ] Finish missing project-specific evidence: AetherFlow's reconciled milestone/UI and API boundary; ORBIT's focused synthetic/demo states and explicit unconnected runtime boundary; Pooya.OS's current browser evidence; NexusCanvas rack/analysis/snapshot evidence; LuminaGlass export/Audio Lab/task-board evidence; AuraPulse feed/fallback and paper-trading evidence with simulation labels; GlobalCart current catalog/PDP/gallery evidence; Salon Booking only approved synthetic/redacted customer-facing evidence.
- [ ] Resolve any upstream test or runtime blockers that materially affect a public claim, or keep that feature explicitly marked unavailable/deferred. Do not modify an independent repository merely to make the portfolio look complete.
- [ ] Add or refine interactive demos only where the approved redesign and evidence show clear value; enforce their performance, security, privacy, and accessibility budgets.
- [ ] Re-verify every public claim, source link, live/demo URL, image URL, status, external attribution, and repository release boundary against its exact source SHA.
- [ ] Run exact-SHA per-project and portfolio CI/browser/accessibility/performance checks; freeze the integrated content and record the evidence.

**Exit gate:** all eight projects are fully represented with owner-approved and source-backed content/evidence, with no fabricated live capability or production claim. The platform is then ready for Phase 10 release hardening and V1 publication.

## Phase 10 — Final release hardening and V1 publication

- [ ] Run the final exact-SHA lint, formatting, typecheck, contract, build, Browser QA, accessibility, performance, security, SEO, and link checks.
- [ ] Verify the approved redesign and all eight final project integrations on desktop, mobile, and physical Android hardware.
- [ ] Complete owner/content/privacy approvals and confirm all mandatory audit items are closed.
- [ ] Rehearse GitHub Pages and Cloudflare Pages deployment, smoke tests, rollback, and recovery on the final release commit.
- [ ] Confirm canonical URLs, metadata, sitemap, social cards, and cache behavior on the published hosts.
- [ ] Create a versioned V1 tag and publish release notes only after every preceding gate passes.
- [ ] Update STATUS, NEXT, CHANGELOG, RELEASE, and project-state.json with exact source, CI, artifact, and deployment identifiers.

**Release rule:** no V1 tag while any required Phase 7, 8, 9, or 10 gate is open. Project integration is deliberately the final stage before release; redesign and its owner approvals are deliberately the penultimate stage.

## Historical implementation checkpoints

### Phase 8 history — owner feedback checkpoint (2026-11-08)

- [x] Record Pooya's first visual feedback round: header redesign, desktop case-study text containment, richer motion/graphics, supplied P logo, and responsive project imagery.
- [x] Implement first-pass header, logo, case-study containment, and original Stripe-inspired radial statistics artwork on the review branch.
- [x] Capture and visually/privacy-review full-page desktop and mobile screenshots for all public projects, including Salon Booking's customer route only.
- [ ] Review the revised live preview with Pooya and record round-two feedback.
- [ ] Obtain explicit approval of the complete redesigned site.


### Phase 8 history — responsive capture evidence (2026-11-08)

- [x] Capture all public project demos at desktop and mobile sizes, including full-page screenshots and selected interactive views.
- [x] Review the 14 approved full-page captures for visual quality and privacy.
- [x] Add exact-run artifact verification and SHA-256/PNG dimension checks before publication.
- [x] Publish approved captures and connect them to the case-study galleries.
- [ ] Obtain Pooya's round-two review of the live site before closing Phase 7.


### Phase 8 history — full-page gallery integration (2026-11-08)

- [x] Publish the 14 visually and privacy reviewed full-page screenshots to the repository.
- [x] Add immutable, commit-pinned desktop/mobile screenshot references to seven project case studies.
- [x] Make screenshot frames keyboard-focusable, labelled, and scrollable.
- [ ] Verify all gallery assets on the live site and collect Pooya's second feedback round.


### Phase 8 history — product-aligned motion and Android gallery behavior (2026-11-08)

- [x] Replace the shared abstract hero treatment with eight motion scenes that explain each project's actual workflow or interface.
- [x] Add a compact, project-specific motion signature to every project card in the selected-work grid.
- [x] Allow native vertical touch scroll chaining from the end of a full-page mobile screenshot into the remaining case-study page on Android.
- [x] Extend Chromium Browser QA to inspect every localized project route at desktop/mobile sizes, verify reduced-motion behavior, and exercise a touch swipe at the gallery boundary.
- [ ] Review the updated motion and gesture behavior on a physical Android device before owner acceptance. Chromium touch emulation passed; physical-device verification is still open.


### Phase 7 readiness history — Cloudflare production parity and deployment handoff (2026-11-08)

- [x] Publish the latest CI-verified application commit `c7a86a2e2f54d157b7e0b806c9c022afd41fd208` to Cloudflare Pages. Deployment `a1a69456-fc5a-4ac3-917b-f5cb0cb909a5` completed with successful build and deploy stages.
- [x] Confirm the canonical Pages host `https://pooya-labs-platform.pages.dev/` points to the current release.
- [x] Set the Pages production branch to `main`, enable production deployment in project settings, and restrict watched paths to `apps/platform/**` and root `package.json`.
- [x] Keep preview-branch publishing disabled; GitHub Pages and Cloudflare Pages build outputs remain independent.
- [ ] Verify that a real GitHub push triggers a Cloudflare production deployment; the settings are enabled but the latest push did not create a deployment.
- [ ] Add `CLOUDFLARE_API_TOKEN` as a private GitHub Actions secret so `.github/workflows/deploy-cloudflare.yml` can perform its Pages API deployment rather than skipping.
- [ ] Check the refreshed Cloudflare host on a physical Android device and compare it with GitHub Pages.
- [ ] Continue P7-11 owner review: approve the full design/motion, content, project order, and personal contribution wording before Phase 8.

### Phase 7 readiness history — accessibility semantics and contrast audit (2026-11-08)

- [x] Give the proof statistics container a valid `group` role for its descriptive label; remove the repeated `aria-prohibited-attr` axe incomplete finding.
- [x] Remove the obsolete sticky-header pseudo-element and preserve the glass treatment with an opaque theme-aware base surface.
- [x] Add contract coverage for the proof-statistics accessible group and header surface behavior.
- [x] Pass CI [42502717615](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717615): 93/93 tests and all three build targets.
- [x] Pass Browser QA [42502717608](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717608): 18/18 routes, 36/36 viewport checks, zero failures, zero confirmed axe violations.
- [ ] Complete human contrast review for the 36 incomplete color-contrast records caused by gradient/pseudo backgrounds; also finish keyboard-only and screen-reader checks.



### Phase 1 — Node 24 GitHub Actions runtime maintenance (2026-11-08)

- [x] Migrate all 10 repository workflows from legacy action majors to current Node 24-compatible releases: `actions/checkout@v7`, `actions/setup-node@v7`, `actions/upload-artifact@v7`, `actions/upload-pages-artifact@v5`, and `actions/deploy-pages@v5`.
- [x] Align the Browser QA and project-capture workflow contract tests with the maintained artifact action version; keep both tests active.
- [x] Confirm the action manifests use Node 24 and the successful repository CI log contains no Node.js 20 deprecation warning.
- [x] Pass Repository CI [42501048926](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42501048926): TypeScript, all three build targets, and 92/92 contract tests.
- [x] Pass Browser QA [42501048917](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42501048917): 18/18 routes, 36/36 viewport checks, zero failures, and zero confirmed axe violations.
- [x] Pass GitHub Pages deployment [42500830187](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42500830187) using the updated Pages actions.
- [ ] Continue manual accessibility review; 40 axe checks remain incomplete and require human inspection.

