# Next Task — Build project case-study pages

**Task ID:** P3-02  
**Title:** Turn the typed project catalogue into evidence-rich case studies  
**Status:** Typed project registry implemented; latest contract-test correction is awaiting CI; Pages build for registry-backed UI succeeded

## Current implementation
- Public portfolio is the default root experience, with Persian/English introduction, About, selected work, focus areas, technologies, and contact.
- Eight project entries live in a separate typed registry at apps/platform/src/content/projects.ts.
- The registry checks URL-safe unique slugs, unique names, complete bilingual descriptions, non-empty tags, supported project statuses, and HTTPS source links restricted to approved hosts.
- Every current project entry is marked needs-owner-review. Only the exact verified AetherFlow repository link is published.
- Root portfolio includes the dark portfolio layout and optional refraction lens; the Spatial OS is a secondary workspace.
- Full-site redesign with Pooya's feedback is a required pre-release Phase 7 gate.

## Priority next
1. Verify CI run 42045396058 after the latest test update; the previous TypeScript and build stages passed, but a test still referenced the old in-component project data location.
2. Add a typed case-study model with sections for context, problem, Pooya's contribution, architecture, implementation, decisions, validation, outcomes, and media.
3. Add project detail routes using the stable project slugs.
4. Curate the featured-project order with Pooya and request only the facts needed to make each public case study accurate.
5. Add verified repository/demo/release links, screenshots, captions, alt text, and lazy-loaded media.
6. Add page-level SEO and social preview metadata for shareable project pages.

## Owner review and release gate
The current homepage and project descriptions are drafts. The final release must wait for the complete redesign and two owner feedback rounds in Phase 7. Record Pooya's feedback and obtain his explicit approval before V1.

## Boundaries
- Keep the public portfolio as the product center of gravity.
- Do not add a generic customer login/dashboard to the portfolio.
- Keep the owner workspace secondary and protected if private management features are added.
- Apps Script sync/deployment is deferred; the static Pages portfolio can ship without it.
- Never invent project accomplishments, skill levels, metrics, contact details, or links.
- Do not modify previous project repositories. Source integration remains Phase 9.
