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
- [x] Added demo, source, and case-study actions to project cards.
- [x] Reframed README, architecture, product surfaces, design direction, next task, and roadmap around the portfolio-first purpose.
- [x] Added ADR-0006 to record portfolio-first hosting and scope.

## CI and publishing status
- CI status: green.
- Repository CI [42048674359](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42048674359) passed TypeScript, both Pages/Apps Script build targets, artifact upload, and **24/24 contract tests**.
- GitHub Pages deployment [42047985066](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42047985066) succeeded with the bilingual project case-study layouts.
- Public preview: https://pooya-labs.github.io/pooya-labs-platform/
- Confirm the repository Pages source remains GitHub Actions so a legacy branch/Jekyll deployment cannot supersede the Vite portfolio.

## Pending owner review
- [ ] Review and approve the public biography and positioning.
- [ ] Curate the featured project order and descriptions.
- [ ] Confirm project statuses, links, screenshots, and public evidence.
- [ ] Confirm your role/contribution for each project before final case-study copy is approved.
- [ ] Decide which contact channel should be published.
- [ ] Review the complete portfolio design on desktop and mobile. The current implementation is a draft, not final.

## Not implemented
- [ ] Real project screenshots, diagrams, captions, alt text, and richer evidence.
- [ ] Fully detailed case studies with owner-confirmed role, architecture, decisions, validation, and outcomes.
- [ ] Page-level SEO and social preview metadata for individual case studies.
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
The root website now introduces Pooya and his projects. Eight bilingual project detail views are available as shareable query routes, based on the actual repository documentation. The latest repository CI passed 24/24 tests and the matching Pages build deployed successfully. The project descriptions and case-study content remain drafts until Pooya reviews them. The complete feedback-driven visual redesign remains a release blocker before V1.
