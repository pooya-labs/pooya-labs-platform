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
- [ ] Add linting, formatting, contribution, and release conventions.
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

## Phase 4 — Secondary private workspace and owner tools
- [ ] Decide which existing Spatial OS tools are useful enough to retain after the public portfolio is complete.
- [ ] Keep private workspace tools separate from the public project catalogue and visitor experience.
- [ ] Define the minimum owner console scope: edit profile, curate projects, update case studies, and control draft/publication state.
- [ ] Enforce owner authorization server-side before any protected operation.
- [ ] Do not build a generic customer login/dashboard into the portfolio. A separate future product may require its own customer surface.

## Phase 5 — Backend and contact capabilities (only where needed)
- [ ] Decide whether the contact section needs a real submission endpoint or direct contact links are sufficient.
- [ ] If a form is approved, define consent, validation, spam/abuse controls, retention, deletion, and server-confirmed receipt semantics.
- [ ] Choose the smallest appropriate backend after requirements are known.
- [ ] Keep Apps Script as an optional deferred adapter; it is not required to publish the static portfolio.
- [ ] Never expose privileged credentials or treat browser-supplied identity as authorization.

## Phase 6 — Interactive project showcases
- [ ] Add only interactive demos that help explain a featured project's engineering value.
- [ ] Define per-demo performance and accessibility budgets.
- [ ] Lazy-load heavy interactive experiences and provide static fallbacks.
- [ ] Keep experiments clearly labeled; do not let them overwhelm core portfolio content.

## Phase 7 — Full pre-release redesign with Pooya's feedback (release blocker)

Before starting the visual redesign, close the factual/content gate in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md): the source-backed dossiers are populated, and every remaining owner input, screenshot/diagram, current-SHA test result, runtime acceptance, and manual QA item must either be completed or remain a visible release blocker.

This phase is mandatory. The current portfolio layout is an initial working draft, not the final visual identity.

- [ ] Run a complete review of the site with Pooya on desktop and mobile.
- [ ] Collect and record his feedback on identity, biography, visual references, page hierarchy, project order, case-study format, imagery, color, typography, motion, and navigation.
- [ ] Compare alternative design directions and agree on the final visual language before polishing.
- [ ] Redesign the entire public website using the accepted direction, not merely patch individual sections.
- [ ] Present the revised version for a second feedback round; record changes and unresolved decisions.
- [ ] Verify that the final design gives the strongest projects enough context and evidence.
- [ ] Obtain explicit owner approval before marking this phase complete.

**Exit gate:** Pooya has reviewed and explicitly approved the complete final portfolio design. No V1 release is allowed before this gate passes.

## Phase 8 — Release hardening and V1 launch
- [ ] Complete accessibility, keyboard, RTL/LTR, responsive, browser, and reduced-motion checks.
- [ ] Measure loading performance on representative desktop and mobile conditions.
- [ ] Verify every public statement, skill, project status, image, and external link against [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md); close every mandatory per-project item.
- [ ] Validate SEO metadata and social previews in external crawler/share clients, custom-domain readiness if desired, and analytics/privacy decisions.
- [ ] Complete CI, Pages publishing, rollback, and recovery rehearsal.
- [ ] Confirm all owner approvals (biography, project order/roles, assets, contact channel, redesigned UI) and all mandatory audit checkboxes are complete.
- [ ] Publish a versioned V1 and document the release. No V1 tag is permitted while any required audit/release checkbox remains open.

## Phase 9 — Previous-project integration (after the standalone portfolio)
This phase must not block V1. Source projects remain independent unless Pooya explicitly approves an integration.

- [ ] Reassess AetherFlow and select verified milestones and presentable case-study evidence.
- [ ] Reassess ORBIT and select verified milestones and presentable case-study evidence.
- [ ] Reassess Pooya.OS, LuminaGlass, NexusCanvas, AuraPulse, GlobalCart, and Salon Booking.
- [ ] Add project-specific case studies and links before considering source-code reuse.
- [ ] Integrate reusable modules only behind clear boundaries, with attribution, tests, and rollback.
- [ ] Verify licenses, dependency compatibility, security boundaries, and avoid duplicate implementations.

**Integration rule:** the portfolio may showcase independent projects without importing their code. Any source integration is separate work performed only after explicit approval.


### Phase 7 — owner feedback checkpoint (2026-11-08)

- [x] Record Pooya's first visual feedback round: header redesign, desktop case-study text containment, richer motion/graphics, supplied P logo, and responsive project imagery.
- [x] Implement first-pass header, logo, case-study containment, and original Stripe-inspired radial statistics artwork on the review branch.
- [x] Capture and visually/privacy-review full-page desktop and mobile screenshots for all public projects, including Salon Booking's customer route only.
- [ ] Review the revised live preview with Pooya and record round-two feedback.
- [ ] Obtain explicit approval of the complete redesigned site.


### Phase 7 — responsive capture evidence (2026-11-08)

- [x] Capture all public project demos at desktop and mobile sizes, including full-page screenshots and selected interactive views.
- [x] Review the 14 approved full-page captures for visual quality and privacy.
- [x] Add exact-run artifact verification and SHA-256/PNG dimension checks before publication.
- [x] Publish approved captures and connect them to the case-study galleries.
- [ ] Obtain Pooya's round-two review of the live site before closing Phase 7.


### Phase 7 — full-page gallery integration (2026-11-08)

- [x] Publish the 14 visually and privacy reviewed full-page screenshots to the repository.
- [x] Add immutable, commit-pinned desktop/mobile screenshot references to seven project case studies.
- [x] Make screenshot frames keyboard-focusable, labelled, and scrollable.
- [ ] Verify all gallery assets on the live site and collect Pooya's second feedback round.


### Phase 7 — product-aligned motion and Android gallery behavior (2026-11-08)

- [x] Replace the shared abstract hero treatment with eight motion scenes that explain each project's actual workflow or interface.
- [x] Add a compact, project-specific motion signature to every project card in the selected-work grid.
- [x] Allow native vertical touch scroll chaining from the end of a full-page mobile screenshot into the remaining case-study page on Android.
- [x] Extend Chromium Browser QA to inspect every localized project route at desktop/mobile sizes, verify reduced-motion behavior, and exercise a touch swipe at the gallery boundary.
- [ ] Review the updated motion and gesture behavior on a physical Android device before owner acceptance. Chromium touch emulation passed; physical-device verification is still open.


### Phase 7 — Cloudflare production parity and deployment handoff (2026-11-08)

- [x] Publish the latest CI-verified application commit `c7a86a2e2f54d157b7e0b806c9c022afd41fd208` to Cloudflare Pages. Deployment `a1a69456-fc5a-4ac3-917b-f5cb0cb909a5` completed with successful build and deploy stages.
- [x] Confirm the canonical Pages host `https://pooya-labs-platform.pages.dev/` points to the current release.
- [x] Set the Pages production branch to `main`, enable production deployment in project settings, and restrict watched paths to `apps/platform/**` and root `package.json`.
- [x] Keep preview-branch publishing disabled; GitHub Pages and Cloudflare Pages build outputs remain independent.
- [ ] Verify that a real GitHub push triggers a Cloudflare production deployment; the settings are enabled but the latest push did not create a deployment.
- [ ] Add `CLOUDFLARE_API_TOKEN` as a private GitHub Actions secret so `.github/workflows/deploy-cloudflare.yml` can perform its Pages API deployment rather than skipping.
- [ ] Check the refreshed Cloudflare host on a physical Android device and compare it with GitHub Pages.
- [ ] Continue P7-11 owner review: approve the full design/motion, content, project order, and personal contribution wording before Phase 8.

### Phase 7 — accessibility semantics and contrast audit (2026-11-08)

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

