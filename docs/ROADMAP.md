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
- [x] Add honest prototype / in-development labels and verified repository links only.
- [x] Retain the Antigravity-inspired refraction lens as a restrained optional effect.
- [x] Keep the Spatial OS shell as a secondary workspace, not the homepage.
- [ ] Refine the responsive navigation, keyboard behavior, focus states, and mobile reading flow.
- [ ] Replace draft content with owner-approved biography, project summaries, and links.

## Phase 3 — Portfolio content architecture and case studies
- [x] Create a typed project content schema with explicit project status and owner-review state.
- [x] Move project data out of the portfolio component into a validated content registry with unique slugs and verified-link rules.
- [ ] Curate the featured project order with Pooya; highlight only the strongest and most presentable work.
- [ ] Create individual case-study pages with problem, context, Pooya's role, architecture, implementation, technologies, key decisions, validation, outcomes, and current status.
- [ ] Add verified repository, live-demo, release, and documentation links where available.
- [ ] Add responsive image/media handling, captions, alt text, and lazy loading.
- [ ] Add page titles, descriptions, social preview metadata, sitemap, and useful shareable URLs.

## Phase 4 — Secondary private workspace and owner tools
- [ ] Decide which existing Spatial OS tools are useful enough to retain after the public portfolio is complete.
- [ ] Keep private workspace tools separate from the public project catalogue and visitor experience.
- [ ] Define the minimum owner console scope: edit profile, curate projects, update case studies, and control draft/publication state.
- [ ] Enforce owner authorization server-side before any protected operation.
- [ ] Do not build a customer login/dashboard unless a separate product requirement is approved.

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
This phase is mandatory. The current portfolio layout is an initial working draft, not the final design.

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
- [ ] Verify every public statement, skill, project status, image, and external link.
- [ ] Validate SEO metadata, social previews, custom-domain readiness if desired, and analytics/privacy decisions.
- [ ] Complete CI, Pages publishing, rollback, and recovery rehearsal.
- [ ] Publish a versioned V1 and document the release.

## Phase 9 — Previous-project integration (after the standalone portfolio)
This phase must not block V1. Source projects remain independent unless Pooya explicitly approves an integration.

- [ ] Reassess AetherFlow and select verified milestones and presentable case-study evidence.
- [ ] Reassess ORBIT and select verified milestones and presentable case-study evidence.
- [ ] Reassess Pooya.OS, LuminaGlass, NexusCanvas, AuraPulse, GlobalCart, and Salon Booking.
- [ ] Add project-specific case studies and links before considering source-code reuse.
- [ ] Integrate reusable modules only behind clear boundaries, with attribution, tests, and rollback.
- [ ] Verify licenses, dependency compatibility, security boundaries, and avoid duplicate implementations.

**Integration rule:** the portfolio may showcase independent projects without importing their code. Any source integration is separate work performed only after explicit approval.
