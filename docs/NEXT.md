# Next Task — Owner review and evidence-rich case-study content

**Task ID:** P3-03  
**Title:** Validate the public portfolio content and strengthen project evidence  
**Status:** Typed project registry and eight bilingual case-study views implemented; CI green (24/24 tests); Pages deployment successful

## Current implementation
- Public portfolio is the default root experience; Spatial OS remains secondary.
- Eight project entries live in the typed registry at `apps/platform/src/content/projects.ts`.
- Each entry has localized copy, explicit project status, a review state, stable slug, verified repository URL, and public preview URL.
- Project cards include actions for live demo, source repository, and internal details.
- Each project has a shareable case-study view at `?project=<slug>` with challenge, approach, engineering highlights, scope/boundaries, status, tags, source, and demo links.
- GlobalCart additionally links to its existing public bilingual case study.
- Every project record is still marked `needs-owner-review`; initial content is derived from the source repositories and is not treated as owner-approved final copy.

## Verified implementation checks
- Repository CI [42048164129](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42048164129) passed TypeScript, both build targets, artifact upload, and 24/24 contract tests.
- Pages deployment [42047985066](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42047985066) succeeded with the project case-study layouts.
- Public preview: https://pooya-labs.github.io/pooya-labs-platform/

## Priority next
1. Ask Pooya to approve or edit the public profile, current positioning, featured-project order, and project statuses.
2. Verify every project summary against its current roadmap/release notes and record Pooya's actual contribution/role in each.
3. Add real project screenshots or short visual evidence; include captions and alt text. Do not use generic stock illustrations in place of product evidence.
4. Expand case studies with architecture diagrams, implementation decisions, validation evidence, trade-offs, and outcomes.
5. Add case-study metadata and social preview assets; ensure URLs remain shareable and work directly on GitHub Pages.
6. Complete responsive, keyboard, accessibility, and performance QA before the full pre-release redesign.

## Owner review and release gate
The current homepage, project order, and case-study text are drafts. The final release must wait for the complete redesign and two owner feedback rounds in Phase 7. Record Pooya's feedback and obtain explicit approval before V1.

## Boundaries
- Keep the public portfolio as the product center of gravity.
- Do not add a generic customer login/dashboard to the portfolio.
- Keep the owner workspace secondary and protected if private management features are added.
- Apps Script sync/deployment is deferred; the static Pages portfolio can ship without it.
- Never invent project accomplishments, skill levels, metrics, contact details, or links.
- Do not modify previous project repositories. Source integration remains Phase 9.
