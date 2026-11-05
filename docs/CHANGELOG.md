# Changelog

## 2026-11-05 — Source-grounded engineering dossiers and release audit
- Expanded all eight bilingual case studies with documented role/attribution, architecture, implementation details, engineering decisions, verification evidence, and direct source/CI references.
- Kept attribution explicit where source READMEs do not identify an individual author; AetherFlow's individual contribution wording remains an owner-review item.
- Aligned GlobalCart and Salon Booking status labels with their current source release lines and disclosed simulated/non-production boundaries.
- Added contract coverage for all eight dossier records and their bilingual sections.
- Added [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md), a per-project checklist of source-confirmed facts and the exact missing information/evidence required before V1.
- Repository CI [42059342492](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42059342492) passed TypeScript, Pages/GAS builds, artifact upload, and **29/29 contract tests**.
- Pages deployment containing the dossier code [42058556955](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42058556955) succeeded; the later 9c2c035 commit changed only a test assertion.

## 2026-11-05 — Project visuals and portfolio metadata
- Added seven visual assets referenced directly from the source project repositories and pinned to immutable commit SHAs; every asset has Persian/English alt text and a semantic visual kind.
- Added lazy-loaded responsive project-card media and matching case-study hero media; failed remote media gracefully falls back to the local project artwork.
- Used an actual GlobalCart storefront screenshot; retained branded artwork/logos for other repositories rather than presenting those as product screenshots. AetherFlow currently keeps its CSS-generated project motif until real visual evidence is available.
- Added bilingual case-study page titles/descriptions, dynamic canonical and Open Graph URL/title/description/locale updates, base social metadata, Person JSON-LD, and a custom SVG favicon.
- CI [42053063421](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42053063421) passed TypeScript, Pages/GAS builds, artifact upload, and **27/27 contract tests**.
- Pages deployment [42053052111](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42053052111) succeeded with the sitemap included.

## 2026-11-05 — Shareable bilingual project case studies
- Added an evidence-based bilingual case-study record for each of the eight featured projects: challenge, approach, engineering highlights, and explicit scope boundaries.
- Added in-site detail views with shareable `?project=<slug>` URLs, Persian/English copy, demo/source links, and an optional existing external case-study link.
- Project cards now link to their live demos, repositories, and detail views.
- Verified public repository and preview URLs against the actual project repositories and READMEs; every project remains marked as needing Pooya's editorial review.
- Repository CI [42048164129](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42048164129) passed TypeScript, both build targets, artifact upload, and 24/24 tests.
- GitHub Pages deployment [42047985066](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42047985066) succeeded.

## 2026-11-05 — Typed portfolio content registry
- Moved the eight initial project records out of the page component into a typed content module.
- Added stable URL-safe project slugs, honest project status keys, explicit owner-review state, localized copy checks, unique-name/slug checks, and validated HTTPS source links.
- Verified exact repo and preview links against the actual GitHub repositories and project READMEs.
- Updated the next milestone to reusable project case-study pages.
- Repository CI [42045396058](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42045396058) passed TypeScript, both build targets, artifact upload, and 23/23 tests.

## 2026-11-05 — Portfolio-first public website
- Reframed the product around Pooya's personal profile and project showcase; the portfolio is now the default root experience.
- Added bilingual intro, About, selected project cards, focus areas, technology list, contact section, and a secondary entry to the Spatial OS workspace.
- Added dark obsidian / cyan / emerald portfolio styling with a restrained, touch-safe and reduced-motion-safe pointer refraction effect.
- Changed the roadmap so a complete redesign using Pooya's feedback is a mandatory pre-release gate with two review rounds and explicit approval.
- Clarified that a generic customer login/dashboard is not part of the portfolio by default and that Apps Script is deferred.
- Added ADR-0006, portfolio product-surface and architecture documentation, and contract tests.
