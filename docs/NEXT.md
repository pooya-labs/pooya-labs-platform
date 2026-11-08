# Next Task — Owner review and pre-V1 release readiness

**Task ID:** P7-09  
**Checkpoint date:** 2026-11-08  
**Verified application `main` SHA:** `7a2d6c38731ea57e66bcedc5363566905ab5affe`  
**Canonical repository:** `pooya-labs/pooya-labs-platform`

## Product direction

Pooya Labs is a personal engineering portfolio first. Its primary visitor journey is to meet Pooya, explore selected work, inspect evidence-backed case studies, and connect. The Spatial OS workspace is secondary; a generic customer account/dashboard is not part of this product. Independent project repositories remain separate. Do not import or modify their source code as part of this portfolio task.

## Current implementation

- Public portfolio homepage in Persian/RTL by default, with English/LTR switching and dark/light themes.
- Eight bilingual project dossiers, eight architecture diagrams, and sixteen crawler-readable localized case-study routes.
- Seventeen 1200×627 PNG social-preview cards, with matching SVG sources, canonical metadata, sitemap, robots.txt, and Person JSON-LD.
- Motion-led homepage with the emerald Pooya mark and matching favicon; screenshot-led hero; radial proof scene; three-node Systems in Motion section; four-card craft-principles gallery; and responsive, reduced-motion-aware animations.
- Bidi-isolated hero text and architecture-diagram labels; direct route entry resets to the top; project screenshots have labelled, keyboard-focusable, internally scrollable frames.
- About, contact, and footer sections include the approved mark, GitHub, Telegram (`@pooyayee`), and Instagram (`@_p.ooya`) links.
- Fourteen approved full-page desktop/mobile captures are published for seven projects: AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and Salon Booking. Salon Booking imagery is restricted to its public customer flow. GlobalCart keeps its curated screenshots; its full-page capture remains withheld while the public collection grid has blank product placeholders.
- The novels library and in-site reader are implemented, but the public catalog is intentionally empty until Pooya supplies titles, copy, covers, and manuscripts.

## Latest verified main-branch checks

All results below refer to the same application commit, `7a2d6c38731ea57e66bcedc5363566905ab5affe`.

| Check | Run | Verified result |
|---|---:|---|
| Repository CI | [42483757067](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757067) | TypeScript, Pages/GAS/Cloudflare builds, and contract-test step passed |
| Portfolio Browser QA | [42483757051](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757051) | Passed: 17 routes × desktop/mobile (34 viewport checks); report artifact [13618234167](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757051) |
| GitHub Pages | [42483757053](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757053) | Build and deployment jobs passed |
| Cloudflare Pages | [42483757077](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757077) | Credential check passed, actual deploy job skipped because the required secret was unavailable |
| Apps Script | [42483757133](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757133) | Configuration check passed, actual publish job skipped because clasp deployment secrets were unavailable |

The latest Browser QA artifact has not yet been inspected for its detailed axe counts. The last detailed report (run [42476478346](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42476478346)) recorded zero axe violations and 36 incomplete checks (34 contrast checks and 2 `aria-prohibited-attr` checks). Those incomplete checks are not confirmed violations, but still require human review. Keyboard-only and screen-reader review also remains open.

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
