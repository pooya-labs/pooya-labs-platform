## Latest verified main checkpoint — P7-13 governance complete; upstream audit refreshed (2026-11-09)

The active `main` ruleset [Protect main — PR + CI](https://github.com/pooya-labs/pooya-labs-platform/rules/26861856) was exercised through the normal connector path. PR [#36](https://github.com/pooya-labs/pooya-labs-platform/pull/36) was created from a working branch after ruleset activation; both exact required checks passed on PR head `2b56ce1`: Repository CI [42642712582](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42642712582) and Browser QA [42642712314](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42642712314). Browser QA passed 18/18 routes and 36/36 viewports with zero failures and zero confirmed axe violations; 36 incomplete contrast checks remain for human review. The report artifact is [13685757493](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42642712314/artifacts/13685757493). The PR squash-merged as [`82f975a`](https://github.com/pooya-labs/pooya-labs-platform/commit/82f975a81e352354bbab1995721ae7ba101d4c02), and post-merge Repository CI [42643318377](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42643318377) passed on that exact main commit.

The ruleset remains active, targets only `refs/heads/main`, and has an empty bypass list. GitHub reports `main` as protected. The positive PR/check/normal-merge path is now verified for both the repository connection and, separately, the dedicated capture App (PR #34). No direct push or bypass was used. No deliberately failing PR was created, so negative pending/failed-check blocking has not been explicitly exercised.

A fresh read-only source audit for all eight independent repositories is recorded in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md), reviewed 2026-11-09 15:25 UTC. Important corrections: GlobalCart's latest main `1c3d27f` is now deployed with live-catalog, visual, and Lighthouse checks passed; AetherFlow's comparator hardening PR #14 and exact-main checks passed while matching-runner benchmark evidence remains open; ORBIT PR #138 remains open because its deferred Keycloak scan reports HIGH CVE-2026-102554 in Guava 33.6.0-jre despite patched candidate architecture builds passing. The other five projects have current ownership documentation and successful exact-head build/deploy checks.

**Next Phase 7 task:** complete the remaining autonomous public-site SEO/social-preview and deployment/rollback evidence where externally accessible, then close the owner/device/accessibility inputs only with real review evidence. Human contrast, keyboard/screen-reader, physical Android, biography/project-order/contribution/media approval, Salon Booking privacy permission, and rollback rehearsal remain open. Do not begin Phase 8 redesign until the Phase 7 exit gate is met.

The platform remains **pre-alpha / Phase 7**. No V1 tag, release, or new public application deployment is claimed by this documentation-only audit.

## Previous checkpoint — App permission smoke harness merged before owner dispatch (2026-11-09)

PR [#32](https://github.com/pooya-labs/pooya-labs-platform/pull/32) merged as [`7e2e5a2`](https://github.com/pooya-labs/pooya-labs-platform/commit/7e2e5a2ff0e43f46e125e5c63db2d453e9b6bf0c). It adds the manual-only workflow [GitHub App Publisher Permission Smoke](https://github.com/pooya-labs/pooya-labs-platform/actions/workflows/app-publisher-smoke.yml), which uses the dedicated App to create a PR containing only `.github/app-publisher-smoke/latest-run.md`. No application code, public/product screenshots, or deployment is changed.

PR Repository CI [42635400246](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400246) passed 112/112 tests. PR Browser QA [42635400130](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400130) passed 18/18 routes and 36/36 viewport checks, with zero failures and zero confirmed axe violations; 36 incomplete contrast checks remain manual. It collected 20 performance samples per host with zero failures; report artifact [13683600592](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400130/artifacts/13683600592). Main CI [42635961927](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635961927) passed on exact main `7e2e5a2`.

**Historical next step at this checkpoint:** run the manual smoke workflow and verify an App-created PR. This was completed by PR #34; see the latest checkpoint above for the merged result. The workflow inventory now contains 11 files. The platform remains **pre-alpha / Phase 7**; no V1 tag or release.

## Latest verified main checkpoint — App activation and publisher smoke runs (2026-11-09)

The owner confirmed the dedicated GitHub App is installed only on `pooya-labs/pooya-labs-platform` and both private Actions secrets are configured. The three manual dispatches completed successfully: reviewed ORBIT interface [42631761203](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42631761203), portfolio captures [42632714049](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42632714049), and full-page captures [42632732364](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42632732364).

All three runs validated their manifests and image integrity, detected the secrets, and successfully created a short-lived GitHub App installation token scoped by the workflow to this repository. Each `create-pull-request` step completed, but its log reported `pull-request-operation = none`: all approved image destinations already matched the files on `main`, so no automation branch or new PR was necessary. No images were changed or published.

This proves the credential and installation-token flow and the no-diff behavior. It does not yet prove a real branch push/PR write or downstream CI and Browser QA on a publisher-generated PR. Do not manufacture a screenshot diff. Use the next genuine owner-approved capture update for that test. The `main` ruleset remains inactive until this proof exists. The public application bundle remains GitHub Pages commit `558970f`; these runs changed no app code or deployment. The platform remains **pre-alpha / Phase 7**, with no V1 tag.

## Latest verified main checkpoint — PR #24 (2026-11-09)

PR [#24](https://github.com/pooya-labs/pooya-labs-platform/pull/24) merged as [`4482c96`](https://github.com/pooya-labs/pooya-labs-platform/commit/4482c96c6a6a8ec2548c8f37210c2f4674f617b2). Merged-main Repository CI [42621840105](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42621840105) passed typecheck, all three build targets, dependency audit, credential scan, and repository contract tests.

PR-head Browser QA [42526817146](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526817146) passed 18/18 routes and 36/36 viewport checks with zero failures and zero confirmed axe violations. Its 36 incomplete axe records are all color-contrast reviews that axe could not resolve because of pseudo-elements, gradients, overlays, or non-text-only elements; they remain manual review items and are not recorded as passes. This Browser QA run belongs to PR head `9f91535`, not the merged main SHA; no new merged-main Browser QA run was observed.

PR #24 changed documentation/state only. The latest verified application deployment remains GitHub Pages run [42526088212](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088212) on application commit `558970f`; no new public app deployment is claimed for the docs-only merge. The Cloudflare and Apps Script production jobs remain gated by missing private configuration. Pooya Monogram remains the platform owner mark; the platform is still **pre-alpha / Phase 7**, with no V1 tag.

# Next Task — P7-13 publisher PR-path proof and main governance

**Task ID:** P7-13  
**Checkpoint date:** 2026-11-09  
The latest verified `main` checkpoint is PR #32 at `7e2e5a2` (see the new checkpoint above). The latest confirmed public application bundle remains GitHub Pages commit `558970f`; PR #28 changed workflows/tests only and did not alter or deploy the app bundle.  
**Canonical repository:** `pooya-labs/pooya-labs-platform`

## Owner App activation and smoke verification — 2026-11-09

The owner confirmed the dedicated GitHub App installation is restricted to this repository and the two Actions secrets are configured. The three dispatches above generated valid short-lived App tokens. The PR actions made no write because every approved image destination matched `main`; actual PR creation remains unproven until an authentic approved image change exists.

## Post-merge verification — governance audit (2026-11-09)

PR #22 merged as `a009b4c65b8ea964b4b43f39ed636f86d56ffe33`. PR CI [42524475237](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475237), Browser QA [42524475250](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475250), and post-merge main CI [42524729014](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524729014) passed. The browser report artifact is [13634757460](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475250/artifacts/13634757460). Scope remained docs/state only; no public deployment changed.

## GitHub governance audit — 2026-11-09

- Main HEAD: `659189dd99af59154cbfd88ce5f9dcecb23e1e0e`; main CI [42523193131](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42523193131) passed.
- The main branch is currently unprotected and the repository has no rulesets or required status-check contexts.
- All ten Actions workflows were checked for declared token permissions. Validation/capture jobs are read-only; Pages has deployment-only scopes; three artifact publishers have `contents: write` and `actions: read`.
- PR #28 removed direct-to-`main` publisher writes. The owner has since configured the dedicated App and secrets; all three manual dispatches succeeded and created App installation tokens, but no PR was needed because there was no image diff.
- See [GITHUB-REPOSITORY-GOVERNANCE.md](GITHUB-REPOSITORY-GOVERNANCE.md) for evidence, observed check names, and the owner-side setup procedure.

**Next atomic task:** dispatch the merged GitHub App Publisher Permission Smoke workflow from `main`; verify its marker-only App-created PR and passing Repository CI plus Portfolio Browser QA, then merge it and configure/test the `main` ruleset against pending/failed checks. Do not fabricate a screenshot diff; the next genuine owner-approved capture change will separately exercise a real image-publisher PR. Keep Phase 7 open for manual contrast, device, content, crawler, and rollback gates.

## Post-merge verification — 2026-11-09

PR [#18](https://github.com/pooya-labs/pooya-labs-platform/pull/18) merged to main as [`23f1689`](https://github.com/pooya-labs/pooya-labs-platform/commit/23f16896624ef391e284d3579a7f7278f5c8cbaf). Repository CI on the merged main commit [42522790018](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522790018) passed. PR Browser QA [42522600586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600586) passed responsive routes, metadata, keyboard checks, cold-route measurements, and published GitHub Pages/Cloudflare Pages measurements. The merge changed documentation and a contract test only; it did not alter the public app bundle or deploy either host.

## Platform owner identity instruction — 2026-11-09

The platform now uses **Pooya Monogram (پویا مونوگرام)** as its displayed owner identity with the centered black-tile logo on the homepage, bilingual case-study pages, bilingual README blocks, and structured metadata. **Pooya Goodarzi** is credited as creator and maintainer. Browser QA verified the signature and loaded tile on all 18 localized routes with 36/36 viewport checks and zero failures. This is the only newly confirmed public identity item; all eight project review states remain `needs-owner-review`, and the full-site approval and Phase 7–10 gates are unchanged.

## Release order (owner-requested)

1. Finish Phase 7: all autonomous engineering, facts/source audit, accessibility, performance, security/privacy, SEO/social, deployment/recovery, and owner/device readiness preparation.
2. Phase 8 is penultimate: complete redesign of the entire public site, two owner feedback rounds, and explicit approval.
3. Phase 9 is the final implementation stage before publication: recheck and fully integrate all eight independent projects into the approved portfolio. Do not copy source code wholesale; retain repo boundaries unless a separate architecture decision is approved.
4. Phase 10: final V1 hardening and publication.

## Latest read-only source recheck — 2026-11-09 13:07 UTC

The refreshed eight-repository source-of-truth table is in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). Material deltas: AetherFlow main advanced to `cc56560` with Pages deployed on that exact SHA, while the newest Rust CI was still in progress on its preceding commit and three dependency PRs remain open; ORBIT PR #138 advanced to `37ec149`, its patched candidate matrix has passed both architectures, but the published upstream Keycloak image still fails the strict Guava 33.6.0-jre / CVE-2026-102554 scan and no patched image is published; GlobalCart main advanced to `ffc51c7` with a catalog-only snapshot, while the latest observed Pages deployment is on the preceding `aeb0e20` commit. The other five project main heads showed no newer changes in this inspection. No independent project repository was modified.

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

