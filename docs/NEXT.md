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

## Performance baseline checkpoint — 2026-11-08

- PR [#13](https://github.com/pooya-labs/pooya-labs-platform/pull/13), head `0dd3eca221df8e5b28b796b3db7b8e6462382fc4): Repository CI [42509020236](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42509020236) passed the dependency audit (0 reported vulnerabilities), 49-file lint/format checks, TypeScript, all three build targets, and 96/96 contract tests.
- Browser QA [42509020267](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42509020267) passed 18/18 routes and 36/36 viewports with zero failures and zero confirmed axe violations; 36 color-contrast checks remain incomplete and require human review.
- Performance QA collected 20 cold-context samples each on local build, GitHub Pages, and Cloudflare Pages. The report is [artifact 13628113221](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42509020267/artifacts/13628113221). The p75 CLS is 0.1713 on each host; the issue is reproducible on English desktop case-study routes.
- Confirmed source-level cause: build-generated static case-study HTML is placed inside `#root`, while `main.tsx` uses `createRoot`, which clears/replaces those nodes after the initial paint. Fix this without sacrificing crawler-readable direct routes, then rerun the baseline. Keep thresholds in report-only mode until this is resolved and remeasured.


## Phase 7 work order

1. Complete repository-level quality, security, dependency, secret/asset boundary, and workflow review.
2. Measure baseline performance and define enforceable budgets; inspect the current browser QA artifacts and resolve reproducible defects.
3. Finish accessibility preparation, including a manual contrast matrix for gradient/pseudo backgrounds and keyboard/focus/screen-reader checks where accessible.
4. Verify current Pages configuration and both deployed hosts, configure the Cloudflare Actions secret privately or establish a verified manual runbook, and rehearse rollback/recovery.
5. Verify current SEO/social preview behavior, project links and facts, and prepare the owner approval packet.
6. Collect the physical Android/device and owner/content acceptance inputs required to start Phase 8.

## Boundaries

- No V1 tag, no release claim, and no new design rebuild before the Phase 8 gate.
- No final project content/media import until Phase 9.
- Do not modify independent project repositories during this platform readiness pass unless a concrete blocker is explicitly approved as an upstream task.
- A missing owner approval, physical-device test, private credential, or third-party salon permission must remain an explicit blocker; do not mark it complete on the owner's behalf.

