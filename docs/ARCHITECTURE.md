# Architecture — portfolio-first public website

## Product shape

The primary product is a bilingual personal portfolio and engineering project showcase. The public route is a static, responsive website. The existing Spatial OS shell is secondary and can remain as a separate workspace experience.

The system is intentionally split by purpose:
1. **Public portfolio:** identity, project catalogue, case studies, technology focus, and contact links.
2. **Private owner workspace:** optional tools and future portfolio content management.
3. **Independent project repositories:** remain separate; the portfolio links to them and documents them without importing source code by default.

A generic public customer dashboard is not part of the portfolio architecture. A product-specific customer surface may be added only when a real product requirement exists.

## Hosting and runtime

- **Primary public host:** GitHub Pages static build.
- **Frontend development:** React + TypeScript + Vite.
- **Build and delivery:** GitHub Actions with type-checks, contract tests, static build, and Pages deployment.
- **No backend required for the core portfolio:** project content can be compiled from reviewed local data files.
- **Apps Script:** deferred compatibility/operations option, not the primary public runtime and not a release blocker for the static portfolio.
- **Private administration:** if implemented, it must be isolated from public content and protected by server-side access control. Choose the smallest feasible backend after requirements are known.

The earlier HtmlService transport experiment remains documented as historical evidence for a possible Apps Script-hosted application. It does not require the personal portfolio to be served by Apps Script. Do not call Apps Script directly from the GitHub Pages origin; the previous real-browser test observed a CORS block.

## Public content model

Use a typed, validated source for:
- Profile identity and approved public biography.
- Project metadata, status, featured order, language-specific summaries, and verified links.
- Case-study sections and evidence assets.
- Skill/tool tags with evidence references.
- Social and contact destinations.

The data model must distinguish a draft entry from a published entry. Never render an item as released solely because a local boolean or unreviewed label says so.

## Engineering boundaries

- Keep content separate from presentational components.
- External project links must be exact and verified; no guessed repository paths.
- Use lazy loading and dimensioned assets for project media.
- Respect reduced-motion, keyboard navigation, semantic headings, color contrast, and RTL/LTR behavior.
- No analytics, tracking, contact form backend, or private account system until purpose, privacy, and retention are defined.
- If a contact form is added, report accepted only after server confirmation; otherwise provide direct approved contact links.

## Private workspace and security

The current Spatial OS shell is retained as a secondary owner workspace / experiment. Do not expose private workspace data in the public portfolio. Any future admin surface must use server-side authorization; a hidden link, localStorage flag, or browser-supplied role is not an authorization boundary.

## Deferred

- Apps Script data sync and deployment.
- Customer accounts or booking flows.
- Owner CMS and protected admin functions.
- Offline queues, telemetry, AI agents, and embedded external applications.
- Source-code integration from earlier project repositories.

These are added only when they serve the portfolio or a clearly defined standalone product.
