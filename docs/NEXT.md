# Next Task — Android gallery handoff and product-motion acceptance

**Task ID:** P7-10  
**Checkpoint date:** 2026-11-08  
**Starting `main` SHA:** `70813af81c459664f23f676ef3a85f8682aafe70`  
**Canonical repository:** `pooya-labs/pooya-labs-platform`

## Product direction

Pooya Labs remains a personal engineering portfolio first. Its visitor journey is to meet Pooya, explore selected work, inspect evidence-backed case studies, and connect. The Spatial OS workspace is secondary. Independent project repositories remain separate; do not import or modify their source code.

## Implemented in this checkpoint

- Eight dedicated case-study hero scenes replace the previous repeated orbit/line treatment:
  - **AetherFlow:** trigger → leased worker → durable commit, with moving execution packets.
  - **ORBIT:** service-health and incident cards, illustrative metrics/logs/traces, and a trace curve.
  - **Pooya.OS:** overlapping desktop windows, profile surface, local terminal cursor, and dock.
  - **NexusCanvas:** gateway/service/worker/database topology with animated graph edges.
  - **LuminaGlass:** glass prism, refraction rings, moving light, and optical control panel.
  - **AuraPulse:** candle/price chart labelled SIMULATED; no live-market claim.
  - **GlobalCart:** product-discovery tiles flowing into a compare/cart action.
  - **Salon Booking:** appointment grid, selected time slot, and confirmation card.
- The selected-work grid receives a compact motion signature for each of the same eight products.
- Full-page mobile screenshot frames use native vertical touch scrolling and scroll chaining. A swipe that reaches the inner frame's lower edge should continue through the remaining case-study page instead of being trapped by the image.
- A bilingual hint explains the nested image-scroll interaction.
- Browser QA now captures all localized project routes at desktop and mobile sizes, checks reduced-motion, and uses Chromium touch input to test scroll handoff from the gallery to the outer page.
- Reduced-motion preferences disable the new project-scene and project-card animations while leaving the content visible.

## Validation state

The changes are committed with this handoff, but the new CI, Browser QA, physical Android behavior, and Pages deployment are not yet confirmed. Do not mark the roadmap items complete until the exact main-branch workflows pass. A desktop Chromium touch emulation is useful regression evidence, but it is not a substitute for checking a physical Android device.

## Immediate next steps

1. Verify TypeScript, all build targets, and repository contract tests.
2. Run the 17 localized-route / desktop-mobile Browser QA matrix; inspect the mobile gallery scroll-handoff records and any failures.
3. Check the private screenshots for all eight redesigned motion scenes at 390px and desktop widths.
4. Verify that reduced-motion disables all new scene animations without hiding content.
5. Review the published GitHub Pages version on Android Chrome and confirm that a swipe after reaching the bottom of a mobile screenshot continues into the next case-study section.
6. Continue the owner visual/content review, manual accessibility checks, social-preview validation, and Phase 8 hardening. The release remains pre-alpha; no V1 tag is authorized.

## Evidence boundaries

- AetherFlow's M07/M08 badge/navigation mismatch remains upstream; this animation does not claim API acceptance.
- ORBIT's Cloudflare gateway is not live-connected until its origin, secret, route, and CF01–CF05 acceptance are complete.
- AuraPulse's market visual is a simulation, not live Binance data.
- GlobalCart's full-page capture remains withheld while the product grid has blank placeholders.
- Salon Booking visuals remain restricted to approved public customer-facing screens; never capture admin routes or customer records.

## Release gate

The current milestone improves motion and mobile behavior; it does not close the full Phase 7 owner review or Phase 8 release gates. Keep the site labelled **pre-alpha / portfolio draft** until owner approval, manual accessibility, performance/security review, deployment recovery rehearsal, and explicit V1 sign-off are complete.
