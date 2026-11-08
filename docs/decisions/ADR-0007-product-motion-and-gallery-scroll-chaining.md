# ADR-0007: Product-aligned motion and native gallery scroll chaining

**Date:** 2026-11-08  
**Status:** Implemented; automated verification pending

## Context

The previous case-study heroes reused a small set of abstract orbits, lines, and floating panels. Although each route technically had a different CSS class, the motion did not clearly communicate what its product does. The selected-project cards also lacked a project-specific motion signature.

The full-page mobile interface captures are intentionally placed in an internally scrollable frame so a visitor can inspect a long screenshot without shrinking it into an unreadable thumbnail. The previous `overscroll-behavior: contain` setting stopped the touch gesture at the inner frame boundary, which could make the rest of the case-study page feel stuck on Android.

## Decision

1. Use a separate motion composition for each of the eight projects:
   - AetherFlow: trigger, leased worker, durable commit, and execution packets.
   - ORBIT: health, incident, illustrative telemetry, and trace activity.
   - Pooya.OS: layered workspace windows, profile surface, terminal cursor, and dock.
   - NexusCanvas: gateway/service/worker/database topology and connected graph edges.
   - LuminaGlass: optical prism, refraction rings, light rays, and control surface.
   - AuraPulse: price/candlestick movement explicitly labelled as simulated.
   - GlobalCart: product discovery panels moving toward compare/cart.
   - Salon Booking: weekly appointment grid, selected slot, and confirmation.
2. Reuse the same product identity in a compact animated form on the selected-project cards. Motion is decorative and never represents live service state or unverified metrics.
3. Keep the project scenes visible without animation and disable their motion under `prefers-reduced-motion: reduce`.
4. Keep full-page screenshots as inner scroll surfaces. Use `overflow-y: auto`, `overscroll-behavior-y: auto`, `touch-action: pan-y pinch-zoom`, and `-webkit-overflow-scrolling: touch` so native vertical gestures can chain from the screenshot frame to the outer portfolio page.
5. Add a Chromium touch-input regression test for the inner-gallery boundary, alongside route, viewport, active-motion, and reduced-motion checks. Automated emulation is regression evidence only; physical Android browser verification is still required.

## Consequences

- Each project hero now tells a more recognizable product story instead of repeating one abstract visual.
- Project cards have a small animated visual cue while keeping the source interface screenshot as the primary evidence.
- Long screenshots remain readable and independently scrollable, but a swipe after reaching their end can continue down the page.
- More animation markup and CSS are maintained; new scenes must remain lightweight, decorative, responsive, accessible, and reduced-motion aware.
- The portfolio does not claim that illustrative telemetry, simulated market data, or demo states are live.

## Alternatives considered

- One generic animated motif with only accent-color changes: rejected because it did not communicate product identity.
- Disable inner scrolling and show the entire screenshot at full height: rejected because it creates excessively long cards and pushes the rest of the page far down.
- `overscroll-behavior: contain` on the inner screenshot: rejected because it traps the gesture at the gallery boundary.
