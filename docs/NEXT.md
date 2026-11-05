# Next Task — Spatial OS shell

**Task ID:** P2-01  
**Title:** Validate and publish the first Antigravity-inspired Spatial OS shell  
**Status:** UI source committed, CI green, and Pages preview deployed; Apps Script bundle sync and visual QA remain

## What is implemented
- React + TypeScript + Vite workspace at `apps/platform`.
- Responsive desktop/mobile Spatial OS first screen and app window shell.
- Initial Overview, Files sample, local-only Terminal, and Settings mini-apps.
- Command palette (Ctrl/Cmd + K), numeric app shortcuts, dark/light theme, Persian RTL / English LTR.
- Cursor refraction field: eased glow plus glass lens, with touch/reduced-motion fallback.
- Vite build targets for GitHub Pages static content and a single-file HtmlService bundle.

## Verified validation
- Repository CI [42036122022](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42036122022) passed TypeScript, Pages/GAS builds, single-file artifact upload, and 14/14 contract tests.
- Platform Pages deployment [42036636856](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42036636856) succeeded at https://pooya-labs.github.io/pooya-labs-platform/.

## Remaining manual validation
1. In the repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. The integration cannot change this repository setting through the current GitHub connection.
2. Open **Actions → Platform GitHub Pages → Run workflow**. This prevents the legacy branch/Jekyll publisher from replacing the Vite app and republishes the current static bundle.
3. Open the preview on desktop and move the mouse across the hero, cards, and empty canvas; check that the glass lens follows smoothly without swallowing clicks.
4. Check Persian RTL, English LTR, theme switching, app windows, and narrow mobile layout. Touch devices and reduced-motion mode should have no cursor lens.
5. Download the `pooya-labs-gas-htmlservice-bundle` artifact from the latest CI run above. Its `index.html` is the single-file HtmlService app. Copy its content into the Apps Script HTML file named `Index`; keep the existing `Code.gs` RPC router, save, and publish a new Web App version. Do not copy the Vite source module entrypoint into Apps Script.

## Important boundaries
- The owner approved ADR-0004: public app and owner-only admin app are separate deployments. No privileged admin code is added in this visual milestone.
- Cursor lens is decorative only and must not intercept pointer interactions.
- Files are labeled sample content, not real Drive files.
- Terminal commands are local allowlisted demo responses only, not shell execution.
- No AI agents, real project persistence, Drive synchronization, or privileged actions are connected yet.
- Public and owner-only admin apps remain separate; this milestone creates only the public shell.
- Existing project repositories remain untouched; integrations are still Phase 9.

## Next after verification
Add a validated manifest-driven app registry and runtime service interfaces, then replace the static sample activity with explicit empty/loading/error states. Keep the backend health check as the only live RPC until data/auth contracts are designed.
