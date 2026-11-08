# Next Task — Physical Android review and owner acceptance

**Task ID:** P7-11  
**Checkpoint date:** 2026-11-08  
**Latest verified `main` HEAD:** `5131660b0b3e0156ac350f6a9aafc648556fc814`  
**Application motion commit:** `714d4ea2ea017189886ddb4e0d2e386e19edcaf3`  
**Browser QA commit:** `549c6a3c66eade850d175cddad3a7b7dea5466e8`  
**Homepage Projects visibility fix:** `2305f5a68f1148c8293f6e3b55746c01eb52d8f2`  
**Browser QA harness:** `5131660b0b3e0156ac350f6a9aafc648556fc814`  
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

| Check | Run | Result |
|---|---:|---|
| Repository CI | [42496113019](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496113019) | Passed: TypeScript, three build targets, 87/87 tests |
| Browser QA | [42496014812](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014812) | Passed: 17/17 routes, 34/34 viewport checks, zero failures |
| Project-card motion | Browser QA artifact [13623776195](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014812) | 8/8 cards animated at desktop and 8/8 at mobile |
| Gallery touch chaining | Browser QA artifact [13623776195](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014812) | 16/16 localized project mobile routes passed |
| GitHub Pages | [42496014762](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014762) | Build and deployment passed |

The Browser QA report recorded zero axe violations, but 36 axe checks are incomplete rather than passed; they still require a human contrast/ARIA review. The automated touch gesture ran in desktop Chromium's mobile emulation and is not a physical Android-device test.

## Immediate next steps

1. Review the live preview on a physical Android phone using Chrome (and Samsung Internet if available). Swipe within a long mobile screenshot to its bottom, then continue the same gesture and confirm the page advances.
2. Check that each of the eight case-study animations feels relevant and remains legible on the actual device; verify reduced-motion and battery/performance behavior.
3. Review the two homepage project-grid captures and approve the visual scale/timing of all eight card animations.
4. Complete manual contrast, focus visibility, keyboard-only, and screen-reader checks in both languages and themes.
5. Continue the owner review of the biography, project ordering, role wording, statuses, contact details, and full-site redesign. Then proceed to Phase 8 release hardening.

## Evidence boundaries

- AetherFlow's M07/M08 badge/navigation mismatch remains upstream; animation does not imply API acceptance.
- ORBIT's Cloudflare gateway is not live-connected until its origin, secret, route, and CF01–CF05 acceptance are complete.
- AuraPulse's market visual is simulated, not live Binance data.
- GlobalCart's full-page capture remains withheld while the product grid has blank placeholders.
- Salon Booking visuals remain restricted to approved public customer-facing screens; never capture admin routes or customer records.

## Release gate

P7-10's implementation and automated regression checks are complete. P7-11 still requires physical Android review and owner acceptance. The portfolio remains **pre-alpha / portfolio draft**; no V1 tag is authorized.
