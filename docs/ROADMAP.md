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
