# Next Task — Spatial OS shell

**Task ID:** P2-01  
**Title:** Validate and publish the first Antigravity-inspired Spatial OS shell  
**Status:** UI source committed; full CI build and Pages publication are the immediate verification gates

## What is implemented
- React + TypeScript + Vite workspace at `apps/platform`.
- Responsive desktop/mobile Spatial OS first screen and app window shell.
- Initial Overview, Files sample, local-only Terminal, and Settings mini-apps.
- Command palette (Ctrl/Cmd + K), numeric app shortcuts, dark/light theme, Persian RTL / English LTR.
- Cursor refraction field: eased glow plus glass lens, with touch/reduced-motion fallback.
- Vite build targets for GitHub Pages static content and a single-file HtmlService bundle.

## Immediate validation
1. Check the latest `Repository CI` run for package install, TypeScript, both build targets, and contract tests.
2. Check the `Platform GitHub Pages` workflow. If the repository still uses branch/Jekyll Pages publishing, change **Settings → Pages → Build and deployment → Source** to **GitHub Actions** once.
3. Open the published Pages preview on desktop and mobile; inspect cursor lens behavior, Persian RTL, English LTR, theme switching, and app windows.
4. Build artifact `dist/gas/index.html` is the single-file HtmlService app. Once CI uploads it, sync its content into the Apps Script HTML file named `Index`; keep the existing `Code.gs` RPC router and publish a new Web App version. Do not copy the Vite source module entrypoint into Apps Script.

## Important boundaries
- Cursor lens is decorative only and must not intercept pointer interactions.
- Files are labeled sample content, not real Drive files.
- Terminal commands are local allowlisted demo responses only, not shell execution.
- No AI agents, real project persistence, Drive synchronization, or privileged actions are connected yet.
- Public and owner-only admin apps remain separate; this milestone creates only the public shell.
- Existing project repositories remain untouched; integrations are still Phase 9.

## Next after verification
Add a validated manifest-driven app registry and runtime service interfaces, then replace the static sample activity with explicit empty/loading/error states. Keep the backend health check as the only live RPC until data/auth contracts are designed.
