# Pooya Labs — Personal Portfolio

Pooya Labs is Pooya's personal engineering portfolio and project showcase. Its main purpose is to introduce Pooya, explain how he approaches software engineering, and make his most meaningful projects easy to explore.

This is a portfolio first—not a generic SaaS dashboard or customer-account product.

## The visitor journey

1. Meet Pooya and understand his current engineering focus.
2. Browse a curated set of selected projects.
3. Open detailed case studies covering the problem, contribution, architecture, technical decisions, implementation, validation, and current state.
4. Inspect real repositories, demos, and evidence where available.
5. Find a clear way to connect.

## Product surfaces

- **Public portfolio (primary):** the default website, published as a static site.
- **Private owner workspace (secondary):** the retained Spatial OS shell and possible owner-only content tools.
- **Customer dashboard:** not part of the portfolio by default. A separate product can add one later only if there is a real customer workflow.

The current public design is an early working draft. A full redesign based on Pooya's feedback is a mandatory pre-release roadmap gate.

## Technology and hosting

- React + TypeScript + Vite.
- GitHub Actions for type-checking, contract tests, and builds.
- GitHub Pages as the primary public portfolio host.
- Persian-first RTL with English LTR support.
- Deep graphite surfaces, cyan/emerald accents, and a restrained Antigravity-inspired pointer refraction effect.
- Apps Script remains a deferred experiment/optional backend adapter; the static portfolio does not depend on it.

**Preview:** https://pooya-labs.github.io/pooya-labs-platform/

## Current implementation

The first portfolio draft includes:
- Personal introduction and project showcase as the root page.
- About, focus areas, technology list, and contact sections.
- Eight project cards with verified source-repository and GitHub Pages preview links, honest project statuses, and explicit scope boundaries.
- Eight bilingual, shareable in-site case-study views covering challenge, approach, engineering highlights, and current limitations.
- Seven commit-pinned visual assets from the source project repositories, with Persian/English alt text, lazy loading, responsive rendering, and a fallback for projects without visual media. GlobalCart currently has the actual storefront screenshot; other assets are project artwork or brand marks.
- Canonical and Open Graph metadata, dynamic browser titles/descriptions for case-study routes, Person JSON-LD, and a branded SVG favicon.
- An optional link to the existing GlobalCart bilingual case study.
- A secondary link to the existing Spatial OS workspace.
- Persian/English language switching and a responsive layout.

All project content is still marked for Pooya's review. The public biography, featured order, role/contribution details, additional real UI screenshots/architecture evidence, and contact channel must be reviewed before release. Static crawler-readable case-study pages, social preview images, and sitemap are still pending. No project is presented as production-ready without evidence.

## Development

Start with README-linked docs: docs/ROADMAP.md, docs/STATUS.md, docs/NEXT.md, docs/PRODUCT-SURFACES.md, docs/DESIGN-DIRECTION.md, docs/ARCHITECTURE.md, and docs/RECOVERY.md.

Commands: npm install · npm run typecheck · npm test · npm run build:pages

## Project identity

- Product: Pooya Labs personal portfolio
- Repository: pooya-labs/pooya-labs-platform
- Default branch: main
- Current release: pre-alpha / portfolio draft
- Previous-project code integration: deferred to Phase 9
