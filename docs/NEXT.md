# Next Task — Phase 7 pre-redesign readiness closeout

**Task ID:** P7-12  
**Checkpoint date:** 2026-11-08  
**Latest verified `main` docs checkpoint:** see [Project Status](STATUS.md) and [project-state.json](project-state.json)  
**Canonical repository:** `pooya-labs/pooya-labs-platform`

## Release order (owner-requested)

1. Finish Phase 7: all autonomous engineering, facts/source audit, accessibility, performance, security/privacy, SEO/social, deployment/recovery, and owner/device readiness preparation.
2. Phase 8 is penultimate: complete redesign of the entire public site, two owner feedback rounds, and explicit approval.
3. Phase 9 is the final implementation stage before publication: recheck and fully integrate all eight independent projects into the approved portfolio. Do not copy source code wholesale; retain repo boundaries unless a separate architecture decision is approved.
4. Phase 10: final V1 hardening and publication.

## Read-only source recheck — 2026-11-08

Latest source commits inspected: AetherFlow `b7ee1de`, ORBIT `161913b`, Pooya.OS `b3e4ee8`, NexusCanvas `ebcda40`, LuminaGlass `9c479da`, AuraPulse `99f9048`, GlobalCart `2101f02`, and Salon Booking `fcd7b0f`. The observed changes are recorded in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). These are not yet final Phase 9 source/feature acceptance.

## Post-remediation verification checkpoint — 2026-11-08

- PR [#13](https://github.com/pooya-labs/pooya-labs-platform/pull/13) is merged. The hydration-safe case-study fix is on application commit [`045bc845`](https://github.com/pooya-labs/pooya-labs-platform/commit/045bc84526ef823a37599c6790d144d68465d35c); the current `main` also includes a later Persian README documentation commit.
- Repository CI [42513404028](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404028) passed dependency audit, lint/format, TypeScript, all three build targets, and repository contracts.
- Browser QA [42513404040](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404040) attempt 2 passed 18/18 routes and 36/36 viewports, zero failures, and zero confirmed axe violations. 36 incomplete gradient/pseudo-background contrast checks remain for manual review.
- Performance artifact [13630148273](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404040/artifacts/13630148273) reports 20 samples per host and p50/p75/maximum CLS **0.0000** on local build, GitHub Pages, and Cloudflare Pages. See [PERFORMANCE-BUDGET.md](PERFORMANCE-BUDGET.md).
- GitHub Pages deployment [42513404002](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404002) succeeded. Cloudflare production deployment [`592357af`](https://592357af.pooya-labs-platform.pages.dev/) succeeded through the authorized Pages API for the same application commit.
- Cloudflare's GitHub Actions automation still requires the private `CLOUDFLARE_API_TOKEN` secret. Apps Script publishing remains skipped until `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are configured; do not represent the Apps Script Web App as updated by this checkpoint.

## Phase 7 work order

1. Complete repository-level quality, security, dependency, secret/asset boundary, and workflow review.
2. Measure baseline performance and define enforceable budgets; inspect the current browser QA artifacts and resolve reproducible defects.
3. Finish accessibility preparation, including a manual contrast matrix for gradient/pseudo backgrounds and keyboard/focus/screen-reader checks where accessible.
4. Configure the Cloudflare Actions secret privately for repeatable automatic publishing (the current manual Pages API production deployment is verified), decide whether Apps Script publishing is required and supply its three secrets if so, then rehearse rollback/recovery.
5. Verify current SEO/social preview behavior, project links and facts, and prepare the owner approval packet.
6. Collect the physical Android/device and owner/content acceptance inputs required to start Phase 8.

## Boundaries

- No V1 tag, no release claim, and no new design rebuild before the Phase 8 gate.
- No final project content/media import until Phase 9.
- Do not modify independent project repositories during this platform readiness pass unless a concrete blocker is explicitly approved as an upstream task.
- A missing owner approval, physical-device test, private credential, or third-party salon permission must remain an explicit blocker; do not mark it complete on the owner's behalf.

