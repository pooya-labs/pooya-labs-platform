# Next Task — Owner review and pre-V1 release readiness

**Task ID:** P7-09  
**Checkpoint date:** 2026-11-08  
**Verified application `main` SHA:** `377dbcbc2544976485f04fd1aeeb1b19d09d7bf7`  
**Canonical repository:** `pooya-labs/pooya-labs-platform`

## Product direction

Pooya Labs is a personal engineering portfolio first. Its primary visitor journey is to meet Pooya, explore selected work, inspect evidence-backed case studies, and connect. The Spatial OS workspace is secondary; a generic customer account/dashboard is not part of this product. Independent project repositories remain separate. Do not import or modify their source code as part of this portfolio task.

## Current implementation

- Public portfolio homepage in Persian/RTL by default, with English/LTR switching and dark/light themes.
- Eight bilingual project dossiers, eight architecture diagrams, and sixteen crawler-readable localized case-study routes.
- Seventeen 1200×627 PNG social-preview cards, with matching SVG sources, canonical metadata, sitemap, robots.txt, and Person JSON-LD.
- The site uses the two original owner-designed image files supplied by Pooya: the portrait geometric monogram in the header, About stamp, and favicon; and the horizontal POOYA — LABS wordmark in the About section. Both are exact image assets, not a recreated SVG substitute. The monogram has no badge or square frame.
- The English hero renders into thoughtful on one solid-mint LTR line, without gradient text clipping. Browser QA waits for fonts and measures the actual text range and final glyph; desktop and mobile both confirm the complete g remains visible.
- Eight case-study pages now have product-specific hero motion: distributed worker graph (AetherFlow), telemetry orbits (ORBIT), floating desktop windows (Pooya.OS), service topology (NexusCanvas), refractive rings (LuminaGlass), chart bars (AuraPulse), floating catalog panels (GlobalCart), and an appointment calendar (Salon Booking).
- Instagram contact actions use the dedicated Instagram glyph rather than a generic camera icon. Browser QA retains private homepage desktop/mobile, all bilingual project desktop views, and a settled About-section screenshot proving the supplied wordmark is loaded; these images are workflow artifacts only and never enter the public site.
- Bidi-isolated hero text and architecture-diagram labels; direct route entry resets to the top; project screenshots have labelled, keyboard-focusable, internally scrollable frames.
- About, contact, and footer sections include the approved mark, GitHub, Telegram (`@pooyayee`), and Instagram (`@_p.ooya`) links.
- Fourteen approved full-page desktop/mobile captures are published for seven projects: AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and Salon Booking. Salon Booking imagery is restricted to its public customer flow. GlobalCart keeps its curated screenshots; its full-page capture remains withheld while the public collection grid has blank product placeholders.
- The novels library and in-site reader are implemented, but the public catalog is intentionally empty until Pooya supplies titles, copy, covers, and manuscripts.

## Latest verified main-branch checks

Validation code commit: 377dbcbc2544976485f04fd1aeeb1b19d09d7bf7. The final browser-QA and contract-test harness checkpoint is a08de7ec138c8790134a177b20a80ca7af137699 (QA/test-only changes after the published application source).

| Check | Run | Verified result |
|---|---:|---|
| Repository CI | [42491842095](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42491842095) | Passed on QA/test harness commit a08de7ec: TypeScript, all three build targets, and repository contract tests |
| Portfolio Browser QA | [42491842131](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42491842131) | Passed: 17 localized routes × desktop/mobile (34 checks), zero failures, zero horizontal overflow, zero axe violations; 36 axe checks remain incomplete for human review. Private artifact [13621507487](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42491842131) contains 19 PNGs |
| GitHub Pages | [42491842070](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42491842070) | Build and deployment jobs passed; the corrected exact wordmark asset is present on the published source commit |
| Cloudflare Pages | [42491842068](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42491842068) | Credential check ran; production deploy skipped because CLOUDFLARE_API_TOKEN is not configured |
| Apps Script | [42491842057](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42491842057) | Configuration check ran; publication skipped because clasp deployment secrets are not configured |

The inspected Browser QA artifact contains homepage desktop/mobile, a settled About-section image, and desktop images of all eight projects in Persian and English. The About report confirms the owner wordmark loaded at its intrinsic 390×142 dimensions. The measured thoughtful text range contains one unbroken LTR run and its final glyph remains inside the title bounds. The report records zero failures, zero horizontal overflow, and zero axe violations; 36 axe incomplete checks are not confirmed violations and still need manual review. Project heroes also expose running visual animations under normal motion preferences, while a separate check confirms that prefers-reduced-motion disables them. Keyboard-only, contrast, and screen-reader review remain open.

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
