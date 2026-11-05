# Next Task — Curate project content and build case-study structure

**Task ID:** P3-01
**Title:** Turn the portfolio draft into a verified project showcase
**Status:** Root portfolio implemented; project content is still draft; latest CI verification pending

## Current implementation
- Public portfolio is now the default root experience.
- Persian/English hero, About, selected projects, focus areas, technology stack, and contact sections.
- Eight project cards with explicit prototype / in-development status.
- One exact verified AetherFlow source link; other repository links are intentionally withheld until verified.
- Dark obsidian visual direction with cyan/emerald accents, layered glass surfaces, and reduced-motion/touch-safe pointer refraction.
- Existing Spatial OS shell remains accessible as a secondary workspace.
- Versioned built-in app manifest v1 powers the workspace rail, dock, app cards, and command palette.

## Priority next
1. Validate the root portfolio build and CI. Do not treat a queued workflow as passed.
2. Establish a validated typed content schema for the public profile, project cards, links, status, and case-study sections.
3. Move the inline project list into a content registry with draft/published states.
4. Curate the initial featured-project order with Pooya and request only facts needed to make the public descriptions accurate.
5. Build reusable case-study page templates and connect each featured card to a real case-study route as content becomes available.
6. Add verified links, screenshots, demos, page metadata, and accessible media handling.

## Mandatory release requirement
A complete public-site redesign based on Pooya's feedback is a release-blocking Phase 7. The current homepage is a functional draft only. Before V1, present a full design for review, record Pooya's feedback, redesign the whole site, run a second review, and obtain explicit approval. See DESIGN-DIRECTION.md and ROADMAP.md.

## Boundaries
- Keep the public portfolio as the product center of gravity.
- Do not add a generic customer login/dashboard to the portfolio.
- Keep the owner workspace secondary and protected if private management features are added.
- Apps Script sync/deployment is deferred; the static Pages portfolio can ship without it.
- Never invent project accomplishments, skill levels, metrics, contact details, or links.
- Do not modify previous project repositories. Source integration remains Phase 9.
