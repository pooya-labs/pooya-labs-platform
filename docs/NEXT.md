# Next Task — Owner review and pre-V1 release readiness

**Task ID:** P7-09  
**Checkpoint date:** 2026-11-08  
**Verified application `main` SHA:** `59a0c5a7179cc96260e50e59c561de44a89520e7`  
**Canonical repository:** `pooya-labs/pooya-labs-platform`

## Product direction

Pooya Labs is a personal engineering portfolio first. Its primary visitor journey is to meet Pooya, explore selected work, inspect evidence-backed case studies, and connect. The Spatial OS workspace is secondary; a generic customer account/dashboard is not part of this product. Independent project repositories remain separate. Do not import or modify their source code as part of this portfolio task.

## Current implementation

- Public portfolio homepage in Persian/RTL by default, with English/LTR switching and dark/light themes.
- Eight bilingual project dossiers, eight architecture diagrams, and sixteen crawler-readable localized case-study routes.
- Seventeen 1200×627 PNG social-preview cards, with matching SVG sources, canonical metadata, sitemap, robots.txt, and Person JSON-LD.
- Motion-led homepage with a refreshed emerald folded-ribbon monogram and matching favicon. The header mark is deliberately borderless (no square badge); its restrained entrance/aura motion respects reduced-motion settings.
- The English hero separates `into` and `thoughtful` into isolated LTR runs, reserves terminal-glyph space, and is checked using actual text-range geometry after fonts load. Desktop and mobile screenshots confirm the final `g` is fully visible.
- Eight case-study pages now have product-specific hero motion: distributed worker graph (AetherFlow), telemetry orbits (ORBIT), floating desktop windows (Pooya.OS), service topology (NexusCanvas), refractive rings (LuminaGlass), chart bars (AuraPulse), floating catalog panels (GlobalCart), and an appointment calendar (Salon Booking).
- Instagram contact actions use a dedicated Instagram glyph rather than the generic camera icon. Browser QA retains private homepage desktop/mobile and bilingual project desktop screenshots as workflow artifacts only; none are published into the website.
- Bidi-isolated hero text and architecture-diagram labels; direct route entry resets to the top; project screenshots have labelled, keyboard-focusable, internally scrollable frames.
- About, contact, and footer sections include the approved mark, GitHub, Telegram (`@pooyayee`), and Instagram (`@_p.ooya`) links.
- Fourteen approved full-page desktop/mobile captures are published for seven projects: AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and Salon Booking. Salon Booking imagery is restricted to its public customer flow. GlobalCart keeps its curated screenshots; its full-page capture remains withheld while the public collection grid has blank product placeholders.
- The novels library and in-site reader are implemented, but the public catalog is intentionally empty until Pooya supplies titles, copy, covers, and manuscripts.

## Latest verified main-branch checks

All results below refer to the same application commit, `7a2d6c38731ea57e66bcedc5363566905ab5affe`.

| Check | Run | Verified result |
|---|---:|---|
| Repository CI | [42487890470](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42487890470) | Passed on application commit `59a0c5a7`: TypeScript, all three build targets, and repository contract tests |
| Portfolio Browser QA | [42487890517](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42487890517) | Passed: 17 routes × desktop/mobile (34 viewport checks), zero failures, zero horizontal overflow, zero axe violations; 36 axe checks remain incomplete for human review. Private visual artifact [13620068611](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42487890517) contains 18 PNGs |
| GitHub Pages | [42487890534](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42487890534) | Build and deployment jobs passed on the same application commit |
| Cloudflare Pages | [42487890531](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42487890531) | Credential check ran; deploy job skipped because `CLOUDFLARE_API_TOKEN` is not configured |
| Apps Script | [42487890498](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42487890498) | Configuration check ran; publish job skipped because clasp deployment secrets are not configured |

The latest Browser QA artifact for run [42487890517](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42487890517) was inspected. Its 18 private screenshots cover the homepage in desktop/mobile and all eight projects in Persian/English desktop. The report records zero failures, zero horizontal overflow, and zero axe violations across 34 viewports. It retains 36 incomplete axe checks; these are not confirmed violations, but still require manual inspection. Keyboard-only and screen-reader review also remains open.

## Immediate next steps

1. **Owner visual review:** inspect the deployed [GitHub Pages portfolio](https://pooya-labs.github.io/pooya-labs-platform/) on a real desktop and phone. Review the emerald mark in the header/About/footer, hero timing, radial proof scene, Systems in Motion, craft gallery, theme controls, project galleries, architecture diagrams, contact actions, and footer.
2. **Content approval:** confirm the public biography and positioning, first three featured projects and ordering, personal contribution/role wording, project statuses, links, and contact handles. Do not invent outcomes or metrics.
3. **Manual accessibility:** inspect the latest Browser QA artifact; manually check color contrast, focus visibility, keyboard-only navigation, and screen-reader flow in both languages/directions and both themes.
4. **Social and SEO validation:** test the 17 PNG preview cards in external LinkedIn/Facebook crawlers and refresh caches; confirm canonical URLs and shared-page rendering.
5. **Phase 8 hardening:** measure real desktop/mobile performance, review security and privacy boundaries, verify every public claim and link, and rehearse deployment rollback and backup/restore before requesting V1 approval.

## Evidence boundaries — keep these claims accurate

- **AetherFlow:** the public M07 badge / documented M08 status and duplicate Dashboard navigation still need reconciliation. Do not claim unverified API acceptance.
- **ORBIT:** the Cloudflare gateway is not live-connected until its origin, secret, route, and CF01–CF05 acceptance are complete. Do not claim live telemetry.
- **AuraPulse:** the showcased trading dashboard is simulated; the capture environment cannot verify the Binance ticker connection.
- **GlobalCart:** do not publish the new full-page capture while the collection grid visibly has blank product placeholders.
- **Salon Booking:** use only owner-approved public customer-flow imagery; never capture admin routes or customer records.
- Keep all independent project repositories untouched unless Pooya explicitly requests work in them.

## Release gate

The site is published on GitHub Pages, but the product release remains **pre-alpha / portfolio draft**. Phase 7 implementation is in place; owner visual/content approval and manual acceptance remain open. Phase 8 release hardening and explicit V1 approval are mandatory. Do not create a V1 tag or call the portfolio final before those gates pass.
