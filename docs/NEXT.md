# Next Task — Owner content review and evidence-rich case studies

**Task ID:** P3-04  
**Title:** Review project storytelling and expand verified visual evidence  
**Status:** Seven source-pinned visual assets and dynamic metadata implemented; CI green (26/26 tests); Pages deployment successful; owner review pending

## Current implementation
- Public bilingual portfolio is the default root experience; Spatial OS remains secondary.
- Eight project entries live in the typed registry at `apps/platform/src/content/projects.ts`.
- Each entry has localized copy, explicit project status, review state, stable slug, verified repository URL, and public preview URL.
- Project cards include live demo, source, and internal case-study actions.
- Every project has a shareable bilingual case-study view at `?project=<slug>` with challenge, approach, engineering highlights, scope/boundaries, status, tags, source, and demo links.
- Seven assets are referenced from public source repositories using immutable commit SHAs; each has localized alt text and a declared kind (interface, brand, or illustration). The real GlobalCart storefront screenshot is not mislabeled as a generic illustration; AetherFlow retains an honest CSS art fallback until visual evidence exists.
- Project images are lazy-loaded in the grid, responsive, and fall back to CSS artwork when remote loading fails.
- Page title, description, canonical URL, and Open Graph title/description/url/locale update for the selected case study in the browser. The base page also includes Person JSON-LD and a branded SVG favicon.
- All eight project records remain marked `needs-owner-review`; initial copy is grounded in source-repository documentation, not owner-approved final biography or contribution statements.

## Verified implementation checks
- Repository CI [42052038712](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42052038712) passed TypeScript, both build targets, artifact upload, and 26/26 contract tests.
- Pages deployment [42052038732](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42052038732) succeeded for the same main-branch commit.
- Public preview: https://pooya-labs.github.io/pooya-labs-platform/

## Priority next
1. Confirm Pooya's public positioning/biography, the first three featured projects, and actual contribution/role for all eight projects.
2. Replace draft descriptions/statuses with owner-confirmed wording and collect missing UI screenshots, diagrams, and captions from AetherFlow, ORBIT, and any project that currently has only brand artwork.
3. Expand the strongest case studies with architecture diagrams, implementation decisions, validation evidence, trade-offs, and outcomes; keep unsupported metrics out.
4. Add crawler-readable static case-study URLs, project-specific social preview images, and a sitemap. The current SPA updates metadata at runtime, which is not a substitute for static metadata in every crawler.
5. Complete responsive, keyboard, accessibility, RTL/LTR, reduced-motion, and performance QA.
6. Only then begin Phase 7's complete visual redesign with Pooya's feedback; this remains a mandatory V1 release blocker.

## Owner review and release gate
The current homepage, biography, project order, and case-study copy are drafts. The final release must wait for the complete redesign and two owner feedback rounds. Record Pooya's feedback and obtain explicit approval before V1.

## Boundaries
- Keep the public portfolio as the product center of gravity.
- Do not add a generic customer login/dashboard to the portfolio.
- Keep the owner workspace secondary and protected if private management features are added.
- Apps Script sync/deployment is deferred; the static portfolio can ship without it.
- Never invent project accomplishments, skill levels, metrics, contact details, or links.
- Do not modify previous project repositories. Source integration remains Phase 9.
