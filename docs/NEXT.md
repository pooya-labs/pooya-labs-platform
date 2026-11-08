# Next Task — Phase 7 pre-redesign readiness closeout

**Task ID:** P7-12  
**Checkpoint date:** 2026-11-09  
**Latest verified `main` docs checkpoint:** PR [#18](https://github.com/pooya-labs/pooya-labs-platform/pull/18) merged as [`23f1689`](https://github.com/pooya-labs/pooya-labs-platform/commit/23f16896624ef391e284d3579a7f7278f5c8cbaf); post-merge Repository CI [42522790018](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522790018) and Browser QA [42522600586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600586) passed. See [Project Status](STATUS.md) and [project-state.json](project-state.json)  
**Canonical repository:** `pooya-labs/pooya-labs-platform`

## Post-merge verification — 2026-11-09

PR [#18](https://github.com/pooya-labs/pooya-labs-platform/pull/18) merged to main as [`23f1689`](https://github.com/pooya-labs/pooya-labs-platform/commit/23f16896624ef391e284d3579a7f7278f5c8cbaf). Repository CI on the merged main commit [42522790018](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522790018) passed. PR Browser QA [42522600586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600586) passed responsive routes, metadata, keyboard checks, cold-route measurements, and published GitHub Pages/Cloudflare Pages measurements. The merge changed documentation and a contract test only; it did not alter the public app bundle or deploy either host.

## Release order (owner-requested)

1. Finish Phase 7: all autonomous engineering, facts/source audit, accessibility, performance, security/privacy, SEO/social, deployment/recovery, and owner/device readiness preparation.
2. Phase 8 is penultimate: complete redesign of the entire public site, two owner feedback rounds, and explicit approval.
3. Phase 9 is the final implementation stage before publication: recheck and fully integrate all eight independent projects into the approved portfolio. Do not copy source code wholesale; retain repo boundaries unless a separate architecture decision is approved.
4. Phase 10: final V1 hardening and publication.

## Latest read-only source recheck — 2026-11-09

The exact current `main` heads, latest commits, release status, and material open-PR states for all eight independent projects are recorded in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).

- **AetherFlow:** current main `dc1edea3946e`; M08 remains experimental/in progress. The owner completed one live Apps Script private-Sheet write/reload/read check and Browser QA passed 12 tests. A follow-up source correction keeps new storage-only rows in `pending`, but the live Apps Script deployment still needs a manual new-version redeploy. Latest Rust CI and supply-chain checks were still running at inspection.
- **GlobalCart:** current main `220b216fbad4`; stable portfolio/demo release v1.0.0 is complete. Merged-main Browser E2E passed **163 / 9 intentional skips / 0 failed**. Current-main documentation records owner-confirmed physical desktop/mobile, actual platform screen-reader, and full human RTL/LTR review on 2026-11-08; exact device/browser matrix was not recorded. Physical tablet and field Core Web Vitals remain unverified/optional. PR #23 was closed without merge.
- **ORBIT:** main unchanged; PR #138 remains open. Its candidate Keycloak build is CI-only, and the strict production-image scan still fails on unresolved findings.
- **Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and Salon Booking:** main heads remain the same as in the prior checkpoint; no open PRs were observed at the recheck.

The bilingual [OWNER-REVIEW-PACKET.md](OWNER-REVIEW-PACKET.md) now reflects the current GlobalCart release and the new source-backed AetherFlow/GlobalCart acceptance facts. The source facts do not imply approval of the Pooya Labs portfolio copy/media. No upstream repository was modified.

## Post-remediation verification checkpoint — 2026-11-08

- PR [#13](https://github.com/pooya-labs/pooya-labs-platform/pull/13) is merged. The hydration-safe case-study fix is on application commit [`045bc845`](https://github.com/pooya-labs/pooya-labs-platform/commit/045bc84526ef823a37599c6790d144d68465d35c); the current `main` also includes a later Persian README documentation commit.
- Repository CI [42513404028](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404028) passed dependency audit, lint/format, TypeScript, all three build targets, and repository contracts.
- Browser QA [42513404040](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404040) attempt 2 passed 18/18 routes and 36/36 viewports, zero failures, and zero confirmed axe violations. 36 incomplete gradient/pseudo-background contrast checks remain for manual review.
- Performance artifact [13630148273](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404040/artifacts/13630148273) reports 20 samples per host and p50/p75/maximum CLS **0.0000** on local build, GitHub Pages, and Cloudflare Pages. See [PERFORMANCE-BUDGET.md](PERFORMANCE-BUDGET.md).
- GitHub Pages deployment [42513404002](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404002) succeeded. Cloudflare production deployment [`592357af`](https://592357af.pooya-labs-platform.pages.dev/) succeeded through the authorized Pages API for the same application commit.
- Cloudflare's GitHub Actions automation still requires the private `CLOUDFLARE_API_TOKEN` secret. Apps Script publishing remains skipped until `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are configured; do not represent the Apps Script Web App as updated by this checkpoint.

## Latest verified app/host checkpoint — centered monogram asset (2026-11-08)

- Application asset commit [`41ea1004`](https://github.com/pooya-labs/pooya-labs-platform/commit/41ea1004433196aa81e4e50b17a1620f110ecea8) adds the centered rounded black-tile Pooya Labs monogram asset. GitHub Pages build and deployment [42514976384](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976384) succeeded on that exact commit.
- Browser QA [42514976406](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406) completed successfully: 18/18 routes, zero failures, zero confirmed Axe violations, and 36 incomplete color-contrast checks retained for human review. Artifact: [13631024148](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406/artifacts/13631024148).
- The same run measured 20 cold-context samples per host. p75 CLS was 0.0000 on local build, GitHub Pages, and Cloudflare Pages. p75 LCP was 316 ms local, 400 ms GitHub Pages, and 400 ms Cloudflare Pages. Full navigation/resource figures are recorded in [PERFORMANCE-BUDGET.md](PERFORMANCE-BUDGET.md).
- Repository CI [42515288490](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42515288490) passed on current documentation head `a37de4cf`.
- Cloudflare production deployment [`107de2a2`](https://107de2a2.pooya-labs-platform.pages.dev/) (ID `107de2a2-d69c-4b9d-ae2c-38da68c7bad4`) was verified through the Cloudflare API on current `main` commit `a37de4cf21bc5e41f8fca9ea08ba6d6dfd350b67`; its queue, initialization, clone, build, and deploy stages all succeeded. This commit includes the `41ea1004` monogram-tile asset, so both public hosts now contain the current platform asset revision. The GitHub Actions Cloudflare publish workflow remains separately credential-gated by the private `CLOUDFLARE_API_TOKEN` secret; automatic push-triggered publishing is not yet proven.
- Apps Script workflow [42514976476](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976476) passed its configuration-check job but skipped the actual publish job because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are not configured. This does not block the static portfolio.


## Security automation checkpoint — 2026-11-08

- PR [#15](https://github.com/pooya-labs/pooya-labs-platform/pull/15) adds a dependency-free credential scanner for tracked UTF-8 files and both generated public bundles.
- Repository CI [42517885668](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42517885668) passed on PR head `e7b5d2e4a592700ea309ff55f4428947cd7e2816`: dependency audit **0 vulnerabilities**, three build targets successful, credential scan **no recognized matches**, contract tests **101/101**.
- The scan reports only path/line/rule, not secret values. It does not scan binary contents or Git history and is not exhaustive; these limitations are in [SECURITY-MODEL.md](SECURITY-MODEL.md).
- Continue the broader Phase 7 review: manual public/private asset boundary review, workflow/deployment permissions, link safety, human contrast/keyboard/screen-reader checks, social crawler validation, rollback rehearsal, and owner/device acceptance.


## Owner review packet prepared — 2026-11-08

- [`docs/OWNER-REVIEW-PACKET.md`](OWNER-REVIEW-PACKET.md) now consolidates the current bilingual homepage copy, project order, status and role wording, contact channels, media inventory, public disclosure boundaries, and the empty Novels decision.
- The packet is prepared but **not approved**. All eight project review states remain `needs-owner-review`; owner decisions on biography/copy, featured order, roles, statuses, public media, Salon Booking permission, and Novels content remain pending.
- PR [#16](https://github.com/pooya-labs/pooya-labs-platform/pull/16) includes the packet and a contract test that guards its coverage and non-approval language.


## Latest owner-review and CI checkpoint — 2026-11-08

- Owner review packet: [`OWNER-REVIEW-PACKET.md`](OWNER-REVIEW-PACKET.md), merged via PR [#16](https://github.com/pooya-labs/pooya-labs-platform/pull/16) at main commit `aca573500192`.
- Latest-head Repository CI [42519333195](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519333195) passed **105/105 tests**, 0 dependency vulnerabilities, all three build targets, and the credential scan. Mainline post-merge CI [42519574691](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519574691) also passed.
- Latest-head Browser QA [42519333196](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519333196) passed 18/18 routes with zero failures and zero confirmed Axe violations; 36 incomplete contrast checks remain for human review.
- All eight project review states remain `needs-owner-review`; the packet is prepared but not owner-approved. The next practical gate is owner review of the packet plus the remaining physical-device, accessibility, Salon Booking permission, social-preview, deployment-automation, and rollback checks.


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

