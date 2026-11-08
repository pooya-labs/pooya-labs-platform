# Next Task — Physical Android review and owner acceptance

**Task ID:** P7-11  
**Checkpoint date:** 2026-11-08  
**Latest verified application commit:** `c7a86a2e2f54d157b7e0b806c9c022afd41fd208` (the subsequent tooling/documentation merge `1746c11ee87fba4a37ea8fff0f548cb832fe4b22` does not change public application output; homepage Projects fix remains `2305f5a68f1148c8293f6e3b55746c01eb52d8f2`)  
**Application motion commit:** `714d4ea2ea017189886ddb4e0d2e386e19edcaf3`  
**Browser QA commit:** `549c6a3c66eade850d175cddad3a7b7dea5466e8`  
**Homepage Projects visibility fix:** `2305f5a68f1148c8293f6e3b55746c01eb52d8f2`  
**Browser QA harness:** `5131660b0b3e0156ac350f6a9aafc648556fc814`  
**Cloudflare production deployment:** `a1a69456-fc5a-4ac3-917b-f5cb0cb909a5` from `c7a86a2e2f54d157b7e0b806c9c022afd41fd208` (build and deploy succeeded)  
**Accessibility semantics and header contrast fix:** `41b7e734098db0bf0ecf8b687517516a75e2a707`  
**Opaque theme control surface adjustment:** `c7a86a2e2f54d157b7e0b806c9c022afd41fd208`  
**Node 24 workflow migration:** `7cd984a09f2d4e96528fbf10acca44dfcddeec9f`  
**Workflow test-contract update:** `66c08923be9b814494d17af7ffb9877c5f7c73b1`  
**Canonical repository:** `pooya-labs/pooya-labs-platform`

## Product direction

Pooya Labs remains a personal engineering portfolio first. The visitor journey is to meet Pooya, explore selected work, inspect evidence-backed case studies, and connect. The Spatial OS workspace is secondary. Independent project repositories remain separate; do not import or modify their source code.

## Completed in P7-10

- Eight dedicated case-study hero scenes replace the repeated abstract orbit/line treatment:
  - **AetherFlow:** trigger → leased worker → durable commit, with moving execution packets.
  - **ORBIT:** service health, incident state, illustrative metrics/logs/traces, and a trace curve.
  - **Pooya.OS:** layered desktop windows, profile surface, local terminal cursor, and dock.
  - **NexusCanvas:** gateway/service/worker/database topology with animated graph edges.
  - **LuminaGlass:** glass prism, refraction rings, moving light, and optical controls.
  - **AuraPulse:** chart/candlestick motion explicitly labelled SIMULATED.
  - **GlobalCart:** product discovery panels moving toward compare/cart.
  - **Salon Booking:** weekly appointment grid, selected time slot, and confirmation.
- Every selected-project card has its own compact product-specific motion signature. Browser QA verifies all 8 cards at desktop and mobile sizes.
- The case-study hero is now a clean motion stage; actual desktop/mobile interface screenshots remain in the lower evidence gallery instead of covering the animation.
- Mobile screenshot frames use native vertical touch scrolling and scroll chaining. A continuing swipe after the inner image reaches its lower edge can move the outer case-study page.
- Reduced-motion styles disable decorative project-scene and project-card movement while keeping the visual content visible.
- A bilingual hint explains the nested screenshot scroll interaction.

## Additional completed bugfix — Android homepage Projects visibility (2026-11-08)

- The Projects section, heading, and all eight project cards no longer use IntersectionObserver opacity gates. This prevents mobile Chromium/WebView scroll-root timing from leaving the entire grid or its first card hidden.
- The compact project-specific card motion remains active.
- Verified in Persian and English at desktop and mobile: 18/18 routes and 36/36 viewports passed; all four homepage-language/viewport combinations recorded opacity 1 for the section, heading, and first card. All eight cards showed active animations.
- CI passed 92/92 tests. GitHub Pages deployment succeeded on the fix.
- Physical Android browser review remains recommended; automated mobile tests use Chromium emulation.

## Verified evidence

| Check | Run / deployment | Result |
|---|---:|---|
| Repository CI | [42502717615](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717615) | Passed: TypeScript, all three build targets, 93/93 contract tests |
| Browser QA | [42504771467](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42504771467) | Passed on the quality-conventions PR; report artifact [13627206292](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42504771467) |
| Accessibility report | Artifact [13626247200](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717608) | Four homepage `aria-prohibited-attr` findings removed; 36 remaining incomplete records are color-contrast checks on gradient/pseudo backgrounds |
| Project-card motion | [Artifact 13624393118](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428681) | 8/8 project cards retain active motion at desktop and mobile in Persian and English |
| GitHub Pages | [42502717618](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717618) | Build and deployment passed on `c7a86a2e2f54d157b7e0b806c9c022afd41fd208` |
| Cloudflare Pages | [Deployment `a1a69456`](https://a1a69456.pooya-labs-platform.pages.dev/) | Build and deploy succeeded from `c7a86a2e2f54d157b7e0b806c9c022afd41fd208`; canonical alias is `pooya-labs-platform.pages.dev` |
| Cloudflare GitHub Actions deploy | [42502717616](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717616) | Credential check passed; actual deploy job skipped because `CLOUDFLARE_API_TOKEN` is not configured |
| Cloudflare Git integration | Pages project settings | `main` and app path filters are configured, but automatic deployment on push is not yet verified |

The remaining 36 axe records are **incomplete checks, not violations and not passes**. They are all color-contrast assessments where gradient/pseudo backgrounds prevent axe from calculating a definite backdrop; human visual contrast review remains required. Automated mobile testing uses Chromium emulation, not a physical Android phone.

## Immediate next steps

1. Review both live hosts on a physical Android phone using Chrome (and Samsung Internet if available): [GitHub Pages](https://pooya-labs.github.io/pooya-labs-platform/) and [Cloudflare Pages](https://pooya-labs-platform.pages.dev/). The latest Cloudflare deployment is pinned to `c7a86a2e`. Swipe within a long mobile screenshot to its bottom, then continue the same gesture and confirm the page advances.
2. Check that each of the eight case-study animations feels relevant and remains legible on the actual device; verify reduced-motion and battery/performance behavior.
3. Review the two homepage project-grid captures and approve the visual scale/timing of all eight card animations.
4. Complete manual color-contrast review for the 36 incomplete gradient-background checks, then verify focus visibility, keyboard-only operation, and screen-reader flow in both languages and themes.
5. Continue the owner review of the biography, project ordering, role wording, statuses, contact details, and full-site redesign. Then proceed to Phase 8 release hardening.

## Cloudflare automation handoff

Cloudflare's project settings report the GitHub source and the `main` production branch as enabled, but the latest pushes did not create a production deployment. The GitHub Actions deploy job is currently skipped because `CLOUDFLARE_API_TOKEN` is missing. Add that secret privately under repository Actions settings to enable the workflow's verified API path; do not paste the token into source or chat. Until then, each Cloudflare application release must be explicitly published through the authorized Cloudflare Pages API and verified by deployment ID.

## Evidence boundaries

- AetherFlow's M07/M08 badge/navigation mismatch remains upstream; animation does not imply API acceptance.
- ORBIT's Cloudflare gateway is not live-connected until its origin, secret, route, and CF01–CF05 acceptance are complete.
- AuraPulse's market visual is simulated, not live Binance data.
- GlobalCart's full-page capture remains withheld while the product grid has blank placeholders.
- Salon Booking visuals remain restricted to approved public customer-facing screens; never capture admin routes or customer records.

## Release gate

P7-10's implementation and automated regression checks are complete. P7-11 still requires physical Android review and owner acceptance. Both public static hosts now have the current application revision. The portfolio remains **pre-alpha / portfolio draft**; no V1 tag is authorized until physical-device review, owner approval, content sign-off, and manual accessibility/release checks are complete.
