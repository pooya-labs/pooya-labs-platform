# Project Status

**Last updated:** 2026-11-05  
**Repository:** pooya-labs/pooya-labs-platform  
**Branch:** main  
**Current phase:** Phase 2 — Public portfolio foundation  
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
- [x] Added explicit prototype / in-development labels and withheld unverified repository links.
- [x] Retained the Spatial OS shell as a secondary workspace, with a return link to the public portfolio.
- [x] Added versioned built-in app manifest v1 and validation for unique IDs/shortcuts, localized metadata, and owner-workspace scope.
- [x] Reframed README, architecture, product surfaces, design direction, next task, and roadmap around the portfolio-first purpose.
- [x] Added ADR-0006 to record portfolio-first hosting and scope.
- [x] Added portfolio contract tests and corrected a manifest-test counting issue.

## CI and publishing status
- The initial portfolio CI run passed type-check and both builds, but failed one contract test because its manifest fixture count included a validator predicate. The test was corrected.
- Latest relevant CI run [42044256942](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42044256942) is queued at the time of this status update; its outcome is not yet verified.
- Pages deployment [42043972152](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42043972152) succeeded for the preceding portfolio commit. A later Pages run for the next UI commit is still being validated.
- The active GitHub Pages source must remain GitHub Actions rather than the legacy branch/Jekyll source so the Vite portfolio remains canonical.

## Pending owner review
- [ ] Review and approve the public biography and positioning.
- [ ] Curate the featured project order and descriptions.
- [ ] Confirm project statuses, exact repository/demo links, screenshots, and public evidence.
- [ ] Decide which contact channel should be published.
- [ ] Review the complete portfolio design on desktop and mobile. The current implementation is a draft, not final.

## Not implemented
- [ ] Individual case-study pages and typed published/draft content registry.
- [ ] Verified project-specific screenshots, demos, documentation, and links beyond those already confirmed.
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
The public root now introduces Pooya and his projects instead of opening directly into the Spatial OS workspace. The first portfolio draft is in the repository; its content and design remain subject to Pooya's review. CI validated TypeScript and the Pages/GAS builds before a single contract-test assertion failed. That test was corrected, and the latest CI run is pending verification. Next, stabilize the current build and move project content into a typed registry so case-study pages can be built without hardcoding presentation content.
