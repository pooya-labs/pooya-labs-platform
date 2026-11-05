# Visual Direction — Antigravity-inspired workspace

**Status:** First implementation slice committed; browser review and polish remain open.

## Reference and interpretation
The visual direction takes cues from the public Google Antigravity product experience:
- An agent-first command-center idea rather than a conventional marketing dashboard.
- Clear hierarchy and calm, dark work surfaces.
- Compact navigation, focused content, and identifiable workspace tools.
- A restrained atmospheric field of particles and light that makes the workspace feel active without making it noisy.

References:
- [Google Antigravity](https://antigravity.google/)
- [Antigravity product direction](https://www.antigravity.google/product)
- [Antigravity 2.0](https://www.antigravity.google/product/antigravity-2)

This is an original Pooya Labs design. It does not reuse Google's proprietary logos, screenshots, copy, or product assets.

## Design system

### Visual language
- Deep graphite / blue-black base, quiet cyan accents, muted violet secondary light.
- Layered translucent surfaces with subtle borders, restrained blur, and controlled contrast.
- Large, direct hero statement and a recognizable spatial command-center composition.
- Small uppercase technical labels and compact metadata; Persian remains the default interface language.
- Light theme remains supported, but dark is the primary presentation.

### Cursor refraction field
The workspace contains a custom pointer-following visual layer:
- A broad, low-opacity glow follows the pointer with a slower interpolation.
- A smaller translucent lens follows slightly faster and uses `backdrop-filter: blur()` plus saturation to refract/soften the UI behind it.
- The native OS cursor remains visible and unchanged.
- The field has `pointer-events: none`, so it cannot intercept clicks, selection, or drag gestures.
- It is enabled only for fine pointers (mouse/trackpad); it is disabled for coarse/touch pointers and for `prefers-reduced-motion: reduce`.
- Position updates use `requestAnimationFrame` only while the target is moving, avoiding a permanent animation loop.

### Interaction
- The command palette opens with Ctrl/Cmd + K.
- Ctrl/Cmd + 1–4 opens the four initial workspace apps.
- Desktop windows support focus/z-order, minimize, maximize, restore, and drag.
- Mobile uses a touch-first bottom app rail and full-screen app surfaces.
- Locale and theme preferences are stored locally in the current browser only.

## Current app surfaces
- Overview — workspace summary, currently static/local demonstration content.
- Files — a visual sample listing; not connected to Drive or a real file system.
- Terminal — an allowlisted local demo command set only; it does not execute OS commands.
- Settings — language and theme controls.

No AI-agent execution, file synchronization, project persistence, or real terminal functionality is claimed in this first visual slice. Those require separate runtime and security milestones.

## Review checklist
- [ ] Verify the cursor lens visually across light/dark backgrounds and high-DPI displays.
- [ ] Confirm no pointer lag or noticeable frame drops on target desktop hardware.
- [ ] Confirm touch devices do not render or run the cursor field.
- [ ] Confirm reduced-motion disables the effect.
- [ ] Test Persian RTL and English LTR at desktop, tablet, and narrow mobile widths.
- [ ] Validate keyboard focus, contrast, and modal behavior.
