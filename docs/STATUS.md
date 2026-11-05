# Project Status

**Last updated:** 2026-11-05  
**Repository:** `pooya-labs/pooya-labs-platform`  
**Branch:** `main`  
**Current phase:** Phase 2 — Core Spatial OS shell (initial visual slice)  
**Release:** Pre-alpha / planning baseline

## Verified facts
- Repository identity and scope are established; previous-project repositories remain untouched.
- The owner deployed the revised HtmlService-first source and confirmed a successful `rpcCall` response with `ok: true`, `data.transport: "google.script.run"`, `error: null`, and a returned `requestId` at 2026-11-05 12:49:53 UTC.
- The GitHub Pages harness was reachable from the GitHub-hosted Chromium runner.
- The real-browser POST to the supplied GAS `/exec` URL failed with `TypeError: Failed to fetch`; repeatable diagnostic run [42028842302](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42028842302) classified it as `blocked_by_cors`.
- Chromium reported that the response lacked `Access-Control-Allow-Origin`. The browser could not read the response; this does not establish whether Apps Script executed `doPost`.
- Latest repository CI run [42031242334](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42031242334) passed all 9 source-contract tests.
- Latest GitHub Pages build/deployment run [42031242859](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42031242859) succeeded.

## Completed
- [x] Repository identity, scope, and agent rules established.
- [x] Ten-phase roadmap added; previous-project integration is Phase 9.
- [x] Recovery/handoff protocol and machine-readable project state added.
- [x] Architecture, API envelope, and deployment plan documented.
- [x] ADR-0001 records the decision to defer integrations.
- [x] Read-only integration inventory recorded for all eight existing projects.
- [x] Official GAS documentation reviewed and constraints recorded.
- [x] ADR-0002 records the original external-transport validation gate.
- [x] Minimal HtmlService RPC and external ContentService POST proof harness added.
- [x] Owner deployed the proof and confirmed HtmlService RPC works.
- [x] Real Chromium reproduced and classified the direct Pages-to-GAS CORS block.
- [x] ADR-0003 selects HtmlService as the primary app runtime and GitHub Pages as static showcase/docs hosting.
- [x] Owner copied the revised `Code.gs` and `Index.html`, published a new Web App version, and verified the `rpcCall` health response with a request ID.
- [x] Provisional performance budgets and measurement method documented in `PERFORMANCE-BUDGETS.md`.
- [x] Manual deployment, rollback, backup, and restore procedures documented in `DEPLOYMENT-RUNBOOK.md`.
- [x] Public/admin deployment separation recorded in ADR-0004 and approved by the owner; actual admin deployment implementation remains future work.
- [x] Initial threat model and data-classification baseline drafted.
- [x] Dependency-free Node.js contract tests and GitHub Actions CI added; latest verified run passes 9/9.
- [x] GitHub Pages build and deployment verified.

## Newly implemented
- [x] Created the React 19 + TypeScript + Vite npm workspace in `apps/platform`.
- [x] Added separate Vite build targets for static Pages and single-file HtmlService distribution.
- [x] Implemented the initial responsive Spatial OS UI: top bar, app rail, hero, app cards, status surfaces, dock, and window manager.
- [x] Added Overview, Files (sample only), Terminal (local allowlist only), and Settings app windows.
- [x] Added Ctrl/Cmd+K command palette and Ctrl/Cmd+1–4 shortcuts.
- [x] Added Persian RTL / English LTR and persistent local theme/language preferences.
- [x] Added cursor refraction lens with fine-pointer detection, eased animation, touch disable, and reduced-motion disable.
- [x] Added CI for type-checking, Pages/GAS builds, the single-file GAS artifact, and source-contract tests.
- [x] Added a dedicated GitHub Pages deployment workflow; repository Pages source may need a one-time switch to GitHub Actions.

## Not yet done / not yet verified
- [x] Owner approved the public-app / owner-only-admin separation. Exact deployment access and execution settings remain to be verified before privileged features.
- [ ] Performance targets are documented provisionally but not yet measured on target devices/networks.
- [ ] Operational deployment rollback and data backup/restore procedures are documented but need an owner-side rehearsal before production data.
- [x] Workspace CI passed TypeScript, Pages/GAS builds, artifact upload, and all 14 source-contract tests in run [42036638066](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42036638066).
- [x] Vite Pages workflow successfully built and deployed its artifact in run [42036636856](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42036636856).
- [ ] The legacy branch/Jekyll Pages deployment also ran successfully afterward in [42036881076](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42036881076); set the repository Pages source to GitHub Actions and rerun `Platform GitHub Pages` so the Vite preview remains canonical.
- [ ] The new bundled `dist/gas/index.html` has not yet been synced into Apps Script; current deployment remains the Phase 0 proof page.
- [ ] No production Sheets schema, booking, admin, telemetry, or customer-data feature exists.
- [ ] No previous-project code has been imported or any previous repository modified.

## Current risks
1. HtmlService is proven for the simple health RPC only; application scale, auth, and quotas still need validation.
2. A public deployment executing as the owner must not expose privileged actions.
3. GAS quotas and execution ceilings constrain workloads.
4. Google Sheets is not a relational ACID database.
5. CacheService is best-effort and cannot be a durable queue.
6. Time-driven triggers are quota-bound scheduled executions, not always-on workers.
7. A fully offline browser cannot receive server confirmation until connectivity returns.

## Latest checkpoint
The revised HtmlService runtime is now deployed and its new `rpcCall` endpoint has passed the owner's real-browser health check. The platform remains HtmlService-first; GitHub Pages is limited to public static content. The public/admin separation is owner-approved. Phase 0 transport proof is complete. The first Phase 2 UI slice is now in the repository; the immediate gate is full CI build validation and publishing the Vite Pages preview. The HtmlService build must then be synced as a single `Index.html` file to the existing GAS project. Performance budgets and operational runbooks are drafted as proposals and remain unmeasured/unrehearsed. Previous-project integration remains deferred to Phase 9.
