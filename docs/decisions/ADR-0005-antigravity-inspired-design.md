# ADR-0005: Antigravity-inspired visual direction and cursor refraction

- **Status:** Accepted
- **Date:** 2026-11-05

## Context
The owner requested that the Pooya Labs Platform visual design take inspiration from Google Antigravity and include a moving filter/glass effect behind the mouse pointer.

Google describes Antigravity as an agent-first platform and its newer surfaces as a command center for managing agent work. The request is to borrow the general visual/interaction direction, not Google's brand assets or interface copy.

## Decision
- Use an original dark, restrained, agent-command-center visual language with responsive panels and clear app hierarchy.
- Add a two-layer cursor refraction field: a broad soft glow and a smaller translucent backdrop-filter lens with eased pointer tracking.
- Preserve the native cursor and keep the visual layer non-interactive.
- Disable the effect for touch/coarse pointers, reduced-motion users, and small mobile layouts.
- Keep the light theme, Persian RTL default, and English LTR support.

## Consequences
- Pointer animation is decorative only and must not imply live AI agent functionality.
- Performance and accessibility must be checked on real devices before considering the effect production-ready.
- Workspace sample content remains labeled as local/sample until real persistence is implemented.
- The visual direction is documented in `docs/DESIGN-DIRECTION.md`; the first implementation is in `apps/platform/src/App.tsx` and `apps/platform/src/styles.css`.

## References
- [Google Antigravity](https://antigravity.google/)
- [Antigravity product](https://www.antigravity.google/product)
- [Antigravity 2.0](https://www.antigravity.google/product/antigravity-2)
