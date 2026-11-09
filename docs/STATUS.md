## 2026-11-09 update — reviewed screenshot publisher migration (PR #26)

The Phase 7 source audit from PR #25 remains preserved below. Current main `3a083aa` still contains the old direct-write publishers until PR #26 merges. PR [#26](https://github.com/pooya-labs/pooya-labs-platform/pull/26) migrates the three publisher workflows to scoped GitHub App-backed pull requests.

The code/test checkpoint `8037631` passed Repository CI [42623349335](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42623349335) with 111/111 tests and no failures; lint, format, typecheck, all three builds, dependency audit and credential scan also passed. Browser QA [42623349393](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42623349393) passed 18/18 routes, 36/36 viewports, zero confirmed axe violations and zero failures. Axe still has 36 incomplete checks that require manual contrast/accessibility review. Performance checks passed 20/20 samples on local, GitHub Pages and Cloudflare Pages; report [artifact 13676544569](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42623349393/artifacts/13676544569).

A documentation-only commit followed that tested code checkpoint. Revalidate CI and Browser QA on the final rebased PR head before merging. App installation, private repository secrets, first live publisher PRs and the active `main` ruleset remain owner-side gates. No settings or secrets have been changed.

## Phase 7 source refresh and PR #24 merge — 2026-11-09

- PR [#24](https://github.com/pooya-labs/pooya-labs-platform/pull/24) merged to `main` as [`4482c96`](https://github.com/pooya-labs/pooya-labs-platform/commit/4482c96c6a6a8ec2548c8f37210c2f4674f617b2). Merged-main Repository CI [42621840105](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42621840105) passed the typecheck, GitHub Pages and Apps Script builds, Cloudflare build, dependency audit, credential scan, and repository contract tests.
- PR Browser QA [42526817146](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526817146) passed 18/18 routes and 36/36 viewports with zero failures and zero confirmed axe violations. Its 36 incomplete records are all color-contrast reviews that axe could not compute because of pseudo-elements, gradients, overlays, or non-text-only content. They remain manual review items, not passes. The run is on PR head `9f91535`, not on the merged main SHA; no merged-main Browser QA rerun was observed.
- PR #24 was documentation/state-only. It did not change application bundles or public deployments. The last confirmed GitHub Pages deployment remains run [42526088212](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088212) on application commit `558970f`. Cloudflare publishing remains skipped without `CLOUDFLARE_API_TOKEN`; Apps Script publishing remains skipped without `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID`.
- The latest read-only upstream source recheck is recorded in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). AetherFlow main advanced to `cc56560`; GlobalCart main advanced to `ffc51c7` with a catalog-only change not yet observed in a Pages deployment; ORBIT PR #138 advanced to `37ec149`, with its patched candidate matrix passing both architectures but the upstream image scan still failing on Guava 33.6.0-jre / CVE-2026-102554.
- The platform remains **pre-alpha / Phase 7**. Main governance, human contrast/device acceptance, source/deployment parity, owner content approvals, Phase 8 redesign, Phase 9 integration, and Phase 10 V1 gates remain open. No V1 tag or release was created.

## Post-merge verification — Pooya Monogram owner identity (2026-11-09)

- PR [#20](https://github.com/pooya-labs/pooya-labs-platform/pull/20) merged as [`558970f`](https://github.com/pooya-labs/pooya-labs-platform/commit/558970fefad25fa16632a8d740eb1a7a32c8f3bd).
- Main Repository CI [42526088297](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088297) passed: 110 contract tests, zero failures, typecheck, all three build targets, dependency audit, and credential scan.
- Merged-main Browser QA [42526088326](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088326) passed **18/18 localized routes**, **36/36 viewports**, zero confirmed axe violations, and zero failures. Axe still reports **36 incomplete rule checks**; these are not passes and remain in the manual contrast/accessibility review.
- GitHub Pages run [42526088212](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088212) deployed the exact `558970f` commit and reported success at https://pooya-labs.github.io/pooya-labs-platform/.
- Cloudflare workflow [42526088253](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088253) skipped its production publish because `CLOUDFLARE_API_TOKEN` is absent. Apps Script workflow [42526088224](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088224) skipped the actual Web App publish because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are not configured. No deployment to those two targets is claimed for this commit.
- Pooya Monogram / پویا مونوگرام is now the named owner identity on the homepage and all bilingual case-study footers, the English and Persian README ownership blocks, and Person/Brand structured metadata; Pooya Goodarzi is credited as creator and maintainer.
- The owner confirmed the platform identity only. The release remains **pre-alpha** in Phase 7; no V1 tag or release was created. The full-site owner/device/accessibility review, governance hardening, content approvals, Phase 8 redesign, Phase 9 project integration, and Phase 10 release gates remain open.

## Post-merge verification — GitHub governance audit (2026-11-09)

- PR [#22](https://github.com/pooya-labs/pooya-labs-platform/pull/22) merged to `main` as [`a009b4c`](https://github.com/pooya-labs/pooya-labs-platform/commit/a009b4c65b8ea964b4b43f39ed636f86d56ffe33).
- PR Repository CI [42524475237](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475237) passed on PR head `40bd71b5de28f1af6176679e4c64b18772a2730e). Browser QA [42524475250](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475250) also passed responsive/routes/metadata/keyboard checks and cold-route measurements on the local build, GitHub Pages, and Cloudflare Pages. Report artifact: [13634757460](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475250/artifacts/13634757460).
- Post-merge main Repository CI [42524729014](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524729014) passed on the exact merged commit.
- This was documentation and project-state maintenance only. No application bundle, public deployment, branch setting, ruleset, Actions secret, or independent project repository changed.
- The governance finding is unchanged: `main` remains unprotected; the three reviewed-capture publishers still push directly to `main`. See [GITHUB-REPOSITORY-GOVERNANCE.md](GITHUB-REPOSITORY-GOVERNANCE.md).

## GitHub workflow and repository-governance audit — 2026-11-09

- Audited all ten `.github/workflows/*.yml` files on main revision `659189dd99af59154cbfd88ce5f9dcecb23e1e0e`.
- Validation and capture workflows declare `contents: read`; GitHub Pages declares only `contents: read`, `pages: write`, and `id-token: write`; the three reviewed-capture publishers declare `contents: write` and `actions: read`. No `actions: write`, `pull_request_target`, or `workflow_run` permission/trigger was found.
- GitHub reports `main` as unprotected (`protected: false`, `protection.enabled: false`), with no required status contexts. The repository has no rulesets. This is a governance blocker, not a failed CI result.
- Main Repository CI [42523193131](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42523193131) passed the exact `659189d` head. The latest observed Browser QA [42522600586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600586) passed on PR #18.
- The three capture publishers currently push verified assets directly to `main`. A PR-required ruleset would block those pushes unless the publisher design is changed or a GitHub Actions bypass is explicitly accepted. See [GITHUB-REPOSITORY-GOVERNANCE.md](GITHUB-REPOSITORY-GOVERNANCE.md).
- No branch setting, secret, application source, public bundle, or deployment was changed in this audit.

## Owner identity and monogram attribution — 2026-11-09

- Applied Pooya's explicit platform-brand instruction: **Pooya Monogram / پویا مونوگرام** is the displayed project-owner identity, paired with the existing centered black-tile logo. The signature is shared by the homepage and all bilingual case-study footers, both README language sections, and Person/Brand structured metadata.
- **Pooya Goodarzi** is credited as creator and maintainer. No independent project repository or third-party product ownership attribution was changed.
- Added a route-level Browser QA assertion and a repository contract test for the owner name, logo asset, bilingual wording, and metadata. Merged-main Browser QA [42526088326](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088326) confirmed **18/18 routes, 36/36 viewports, zero confirmed axe violations, zero failures**; 36 incomplete axe checks still require manual review.
- This confirms platform brand identity only. Phase 7 remains active; it does not approve the complete portfolio, project copy/media, or the remaining release gates. No V1 tag or release is authorized.

## Post-merge verification — source audit and owner packet (2026-11-09)

- PR [#18](https://github.com/pooya-labs/pooya-labs-platform/pull/18) merged to `main` as commit [`23f1689`](https://github.com/pooya-labs/pooya-labs-platform/commit/23f16896624ef391e284d3579a7f7278f5c8cbaf).
- PR Repository CI [42522600509](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600509) passed. Browser QA [42522600586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600586) passed responsive/routes/metadata/keyboard checks and cold-route measurements on local, GitHub Pages, and Cloudflare Pages. The merged-main Repository CI [42522790018](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522790018) also passed.
- The merged change is documentation and contract-test maintenance only. The portfolio application bundle and both public deployments were not changed by this PR.
- The source audit and owner-review packet remain preparation, not approval. Phase 7 remains active and all eight Pooya Labs project review states remain `needs-owner-review`.

## Latest checkpoint — upstream source refresh and owner-packet correction (2026-11-09)

- Refreshed the read-only branch-head, release, and open-PR inventory for all eight independent projects in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). No upstream repository was modified.
- Corrected the bilingual owner packet's GlobalCart label to the published stable portfolio/demo release **v1.0.0**. Current-main docs confirm the owner completed real desktop/mobile, actual platform screen-reader, and full human RTL/LTR review on 2026-11-08; the exact device/browser matrix was not recorded. Physical tablet and eligible field Core Web Vitals remain unverified.
- GlobalCart merged-main Browser E2E [42516946135](https://github.com/pooya-labs/globalcart/actions/runs/42516946135) passed **163 tests / 9 intentional skips / 0 failures**. Current-main deployment [42521324455](https://github.com/pooya-labs/globalcart/actions/runs/42521324455), Security [42521324428](https://github.com/pooya-labs/globalcart/actions/runs/42521324428), Lighthouse [42521506954](https://github.com/pooya-labs/globalcart/actions/runs/42521506954), visual QA [42521507125](https://github.com/pooya-labs/globalcart/actions/runs/42521507125), and catalog smoke [42521507117](https://github.com/pooya-labs/globalcart/actions/runs/42521507117) passed. PR #23 was closed without merge; closeout facts are present on main commit `220b216`.
- AetherFlow main is `dc1edea3946e`. The owner confirmed the live Apps Script Sheet write/reload/read test; Browser QA [42521608664](https://github.com/pooya-labs/aetherflow/actions/runs/42521608664) passed 12 tests. The checked-in `pending`-state correction still requires manual redeployment of the Apps Script Web App; it is not auto-synced from GitHub. Pages [42522116708](https://github.com/pooya-labs/aetherflow/actions/runs/42522116708) passed; latest Rust CI and supply-chain runs [42522117027](https://github.com/pooya-labs/aetherflow/actions/runs/42522117027) and [42522117055](https://github.com/pooya-labs/aetherflow/actions/runs/42522117055) were in progress at inspection.
- ORBIT PR [#138](https://github.com/pooya-labs/orbit/pull/138) remains open. Its CI-only Keycloak candidate build and repository Security checks passed, but the strict production-image scan [42521243847](https://github.com/pooya-labs/orbit/actions/runs/42521243847) still fails; no candidate deployment is claimed.
- Platform main baseline before this documentation update was `8ae608342aaf`; Repository CI [42520197557](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42520197557) passed. The source refresh and owner-packet correction remain docs/test-only. No platform application code or public deployment changed.
- Phase 7 remains active. Manual contrast/keyboard/screen-reader review and physical Android review for the Pooya Labs platform itself, social crawler validation, current Pages-source confirmation, Cloudflare Actions secret, rollback rehearsal, and owner content/media decisions remain open. All eight portfolio project review states remain pending.

## Latest verified checkpoint — bilingual owner review packet prepared (2026-11-08)

- Added [`docs/OWNER-REVIEW-PACKET.md`](OWNER-REVIEW-PACKET.md), a bilingual snapshot of the current homepage headline/introduction/About copy, language/theme defaults, project order, source-backed status and role wording, public contact links, media inventory, disclosure boundaries, and the empty Novels decision.
- The packet explicitly records the AetherFlow individual-contribution limitation and Salon Booking's separate product owner; it preserves the simulation/synthetic-data, connection-required, privacy, and owner-permission boundaries for each relevant project.
- The packet is a review aid, not approval. All eight project registry entries remain `needs-owner-review`; Salon Booking permission, personal media approval, and the Novels content decision remain open.
- PR [#16](https://github.com/pooya-labs/pooya-labs-platform/pull/16) is merged as [`aca57350`](https://github.com/pooya-labs/pooya-labs-platform/commit/aca573500192f8581896bde10e68ef82c0ca2256). Latest-head Repository CI [42519333195](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519333195) passed with **105/105** tests; Browser QA [42519333196](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519333196) passed **18/18 routes**, zero failures, and zero confirmed Axe violations. **36 incomplete contrast checks** remain for manual review.
- Mainline after PR #15 is healthy: Repository CI [42518373614](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42518373614), Browser QA [42518373619](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42518373619), and GitHub Pages [42518373632](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42518373632) all passed. The Cloudflare Actions deploy job in [42518373586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42518373586) skipped at its credential gate; the prior authorized Cloudflare production deployment remains recorded separately.
- The packet completes preparation only. Owner content approval, manual accessibility/device checks, social crawler verification, deployment automation, and rollback rehearsal remain open.

## Latest verified checkpoint — tracked-source and public-bundle credential scan (2026-11-08)

- Added `scripts/secret-scan.mjs` and the root command `npm run security:secrets`; Repository CI runs it after both static hosting bundles are built.
- The scanner inspects tracked UTF-8 text, `dist/pages`, and `dist/cloudflare`; it checks high-confidence private-key/provider-token patterns, quoted credential assignments, and sensitive credential filenames. Matched values are never printed.
- Repository CI [42519574691](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519574691) passed on main commit `aca573500192`: `npm audit` reported **0 vulnerabilities**, all three build targets passed, the credential scan reported **no recognized matches**, and **105/105** contract tests passed.
- Scanner limitations are recorded in [SECURITY-MODEL.md](SECURITY-MODEL.md): no binary-content or Git-history scan, and only recognized high-confidence patterns are detected. Broader security review and manual public/private asset checks remain open.
- PR [#15](https://github.com/pooya-labs/pooya-labs-platform/pull/15) contains the implementation and tests; browser QA is being run independently. No application runtime, deployment, or project repository was changed by this security task.

## Latest verified checkpoint — monogram asset, current source audit, and host-specific QA (2026-11-08)

- Latest application asset revision: [`41ea1004433196aa81e4e50b17a1620f110ecea8`](https://github.com/pooya-labs/pooya-labs-platform/commit/41ea1004433196aa81e4e50b17a1620f110ecea8), which adds the centered rounded black-tile Pooya Labs monogram asset. GitHub Pages workflow [42514976384](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976384) passed build and deployment for this revision.
- Repository CI [42515288490](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42515288490) passed on current `main` documentation head `a37de4cf21bc5e41f8fca9ea08ba6d6dfd350b67`: dependency audit, lint, format, TypeScript, all three build targets, and repository contract tests.
- Browser QA [42514976406](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406) passed on application asset revision `41ea1004`: 18/18 routes, zero failures, zero confirmed Axe violations, and 36 incomplete color-contrast checks retained for manual review. Report artifact: [13631024148](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406/artifacts/13631024148).
- The latest Browser QA run collected 20 cold-context samples per host. p75 CLS was **0.0000** on the local build, GitHub Pages, and Cloudflare Pages. p75 LCP was **316 ms** locally, **400 ms** on GitHub Pages, and **400 ms** on Cloudflare Pages; detailed figures and measurement limits are in [PERFORMANCE-BUDGET.md](PERFORMANCE-BUDGET.md).
- **Production host parity is verified:** GitHub Pages is deployed from application asset revision `41ea1004`. Cloudflare production deployment [`107de2a2`](https://107de2a2.pooya-labs-platform.pages.dev/) (ID `107de2a2-d69c-4b9d-ae2c-38da68c7bad4`) was built from current main commit `a37de4cf` and all five Cloudflare deployment stages completed successfully; that commit includes the same `41ea1004` application asset. The GitHub Actions Cloudflare publishing workflow still needs the private `CLOUDFLARE_API_TOKEN` secret for repeatable automated publishing.
- Apps Script workflow [42514976476](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976476) completed its credential-check job but skipped the production publish job because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are absent. The static portfolio remains independent of this optional deployment.
- The upstream source audit now records the exact 2026-11-08 main heads for all eight projects. Seven latest commits only update bilingual ownership artwork; GlobalCart adds desktop/mobile storefront screenshots. No independent project repository or project application code was modified in this checkpoint.
- The project remains **pre-alpha**. Human contrast/keyboard/screen-reader review, physical Android acceptance, external social-crawler validation, rollback rehearsal, owner content/design approval, and repeatable GitHub Actions Cloudflare publishing remain open.

## Release sequence decision — 2026-11-08

Pooya requested a strict final-stage order. The roadmap now reserves **Phase 8 for the complete redesign and its two owner approval rounds (penultimate stage)**, then **Phase 9 for full portfolio-level integration of all eight projects (last stage before publication)**, followed by **Phase 10 for V1 release**. Work is currently confined to Phase 7 readiness; final project media/content integration must not be pulled forward.

- Phases 4–6 are closed for current V1 scope by explicit decisions: no owner CMS/customer accounts, direct contact links instead of a backend form, and no heavy embedded demos until Phase 9.
- All eight independent repositories have newer source commits since the previous audit. Their latest observed changes and SHAs are recorded in PROJECT-CONTENT-AUDIT.md; this is an evidence baseline, not final acceptance. No upstream repo was modified.
- Phase 7 will close remaining autonomous engineering, source verification, accessibility, performance, security, crawler, deployment, recovery, and owner/device-readiness tasks before the redesign starts.
- The site remains pre-alpha. Neither the redesign nor final project integration is approved or completed.

## Latest implementation checkpoint — repository quality conventions (2026-11-08)

- Added dependency-free JavaScript syntax/debugger checks and source/config formatting checks; these do not add runtime or development dependencies.
- Added `.editorconfig`, root npm commands `lint` and `format:check`, and required both checks in Repository CI.
- Added [CONTRIBUTING.md](../CONTRIBUTING.md) and [RELEASE.md](RELEASE.md) to standardize local validation, commit/PR expectations, deployment evidence, and V1 restrictions.
- Merged as [PR #12](https://github.com/pooya-labs/pooya-labs-platform/pull/12), commit [`1746c11`](https://github.com/pooya-labs/pooya-labs-platform/commit/1746c11ee87fba4a37ea8fff0f548cb832fe4b22).
- Repository CI [42504771438](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42504771438) passed both new quality checks, TypeScript, all three build targets, and the contract suite. Browser QA [42504771467](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42504771467) also passed (report artifact [13627206292](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42504771467)).
- This is tooling/documentation-only; the public UI and deployed application revision are unchanged. Pre-alpha remains the accurate release label.
- Physical Android review, owner design/content approval, and human accessibility acceptance remain open.

# Project Status

**Last updated:** 2026-11-09  
**Repository:** pooya-labs/pooya-labs-platform  
**Branch:** main  
**Current phase:** Phase 7 — Pre-redesign readiness and engineering closeout  
**Release:** Pre-alpha / portfolio draft

## Previous checkpoint — accessibility semantics and Cloudflare production before PR #13 (2026-11-08)

- Added a valid `role="group"` to the homepage proof statistics container, preserving its descriptive label. The latest axe report no longer contains the four repeated `aria-prohibited-attr` incomplete findings.
- Removed an obsolete header pseudo-element and made the header base color opaque in both themes while preserving its frosted blur. Gradient-backed hero text still prevents axe from calculating definite contrast values.
- Repository CI [42502717615](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717615) passed TypeScript, all three builds, and 93/93 contract tests.
- Browser QA [42502717608](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717608) passed 18/18 routes and 36/36 viewport checks, with zero failures and zero confirmed axe violations. All 36 incomplete records are color-contrast checks on gradient/pseudo backgrounds; manual review remains open.
- GitHub Pages deployment [42502717618](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717618) passed.
- Cloudflare deployment [`a1a69456`](https://a1a69456.pooya-labs-platform.pages.dev/) (ID `a1a69456-fc5a-4ac3-917b-f5cb0cb909a5`) from main commit `c7a86a2e2f54d157b7e0b806c9c022afd41fd208` completed with successful `build` and `deploy` stages.
- The GitHub Cloudflare deployment workflow [42502717616](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717616) passed its credential-check job but skipped production publishing because `CLOUDFLARE_API_TOKEN` is absent. Cloudflare's source settings show the GitHub `main` branch configured, but automatic push-to-production was not observed. The latest deployment was published explicitly through the authorized Pages API; automatic publishing is not yet verified.
- Physical Android review, owner motion/content approval, and human accessibility acceptance remain open. The project remains pre-alpha.



## Latest verified checkpoint — Node 24 Actions runtime migration (2026-11-08)

- Updated all 10 repository workflows to current maintained action majors: checkout v7, setup-node v7, upload-artifact v7, upload-pages-artifact v5, and deploy-pages v5. The exact current minor releases are recorded in CHANGELOG.md.
- Verified the updated checkout, setup-node, upload-artifact, and deploy-pages action manifests use Node 24. The latest successful Repository CI log contains no Node.js 20 deprecation warning.
- Repository CI [42501048926](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42501048926) passed TypeScript, all three build targets, and 92/92 contract tests.
- Browser QA [42501048917](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42501048917) passed 18/18 routes and 36/36 desktop/mobile viewport checks, with zero failures and zero confirmed axe violations. Forty axe checks remain incomplete and are not counted as passed.
- GitHub Pages [42500830187](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42500830187) passed using the updated deployment actions.


## Latest verified checkpoint — Cloudflare production parity (2026-11-08)

- Corrected the stale Cloudflare Pages production host by publishing main commit `a0bac438d377571d0a2c2a6a7c46bee8bd7cf746` to deployment [`efa5ecb4-356d-4112-be60-31401506d940`](https://efa5ecb4.pooya-labs-platform.pages.dev/). Cloudflare confirmed successful `build` and `deploy` stages.
- The canonical Cloudflare alias is [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/).
- Cloudflare's project settings show GitHub source, `main` as the production branch, and app-source path filters `apps/platform/**` and `package.json`, with preview deployments disabled. However, automatic deployment on a push was not observed.
- The GitHub Actions `CLOUDFLARE_API_TOKEN` secret is not configured; the explicit deploy job skipped in run 42502717616. Use the direct authorized Pages API until the secret is added and a push-triggered deployment is verified.
- Documentation-checkpoint CI [42498895229](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498895229) passed on `a0bac438d377571d0a2c2a6a7c46bee8bd7cf746`. The latest runtime Browser QA is [42498428681](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428681), with 18/18 routes and 36/36 viewport checks passed.
- A direct visual browser fetch of the public pages.dev host could not be verified by the available page inspector. Cloudflare's deployment API does confirm the production publish stages succeeded.


## Latest verified checkpoint — homepage Projects Android visibility (2026-11-08)

- Latest verified `main` HEAD: `c7a86a2e2f54d157b7e0b806c9c022afd41fd208`; the current homepage Projects visibility fix is `2305f5a68f1148c8293f6e3b55746c01eb52d8f2`.
- Application fix commit: `2305f5a68f1148c8293f6e3b55746c01eb52d8f2`; final Browser QA harness/DOM-measurement commit: `5131660b0b3e0156ac350f6a9aafc648556fc814`.
- Root cause: the homepage Projects section, its heading, and its long list of project cards were hidden behind separate IntersectionObserver reveal gates. On mobile, the reveal conditions could leave the content at opacity zero. All three reveal gates were removed. The card visuals and their own animations remain intact.
- Browser QA now checks both default Persian and English homepage routes. It confirmed the Projects section, heading, and first card at opacity 1 on desktop and mobile in both languages, with all eight project-card animations active.
- Repository CI [42498428514](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428514) passed TypeScript, three build targets, and 92/92 contract tests. The current main checkpoint passed CI in [42502717615](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717615), with 93/93 tests.
- Browser QA [42498428681](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428681) passed 18/18 routes / 36/36 viewports: zero failures, zero horizontal overflow, zero confirmed axe violations. Thirty-six axe contrast checks remain incomplete for manual review.
- GitHub Pages deployment [42498199551](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498199551) passed on the application fix. Public site: https://pooya-labs.github.io/pooya-labs-platform/.
- Automated mobile checks use Chromium mobile emulation. Physical Android confirmation remains part of owner acceptance on both [GitHub Pages](https://pooya-labs.github.io/pooya-labs-platform/) and [Cloudflare Pages](https://pooya-labs-platform.pages.dev/).

## Latest verified checkpoint — product motion and mobile gallery (2026-11-08)

- Latest verified `main` HEAD: `b429828f0ed8f967317934fffed32daffa7b6a5f`. Documentation-only checkpoint CI [42496528868](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496528868) also passed on this exact HEAD: TypeScript, all three builds, 87/87 tests.
- Application motion and clean case-study hero commit: `714d4ea2ea017189886ddb4e0d2e386e19edcaf3`; browser QA harness update: `549c6a3c66eade850d175cddad3a7b7dea5466e8`.
- Eight case-study hero visuals are product-specific; the old generic orbit composition and static screenshot/monogram overlay were removed from the hero. Screenshots remain in the lower evidence gallery.
- The eight selected-project cards each have their own compact animated scene. Browser QA recorded running animations for all 8 cards at desktop and all 8 at mobile.
- Full-page mobile screenshot frames now allow native vertical touch scroll chaining. Chromium emulation passed on 16/16 localized project routes by verifying that the outer case-study page scroll position advances after the inner image reaches its lower edge.
- Repository CI [42496113019](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496113019) passed TypeScript, all three build targets, and 87/87 contract tests.
- Browser QA [42496014812](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014812) passed 17/17 localized routes and 34/34 desktop/mobile viewport checks: zero failures, zero horizontal overflow, and zero confirmed axe violations. Thirty-six axe rule checks remain incomplete and need manual review.
- Private visual QA artifact: [13623776195](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014812). It includes desktop/mobile route captures and homepage project-grid captures at both viewport sizes.
- GitHub Pages [42496014762](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014762) passed build and deployment for the final application checkpoint. Public site: https://pooya-labs.github.io/pooya-labs-platform/.
- Physical Android confirmation is still pending. Desktop Chromium touch emulation is useful regression evidence but is not a substitute for checking an actual Android device/browser.
- No independent project repository was modified.

## Remaining Phase 7 / Phase 8 blockers

- Pooya must review the latest deployed portfolio on real desktop, mobile, and Android hardware, then approve the full visual redesign and project-card/case-study motion.
- Owner content approval remains open for biography/positioning, featured-project order, personal contribution statements, public project statuses, and contact details.
- Manual accessibility acceptance remains open: inspect the 36 incomplete axe checks and manually verify color contrast, focus visibility, keyboard-only operation, and screen-reader flow in both languages and themes.
- External LinkedIn/Facebook social-crawler rendering and cache-refresh validation for the 17 PNG social cards remains open.
- Phase 8 performance/security/privacy/recovery checks and deployment rollback rehearsal remain open.
- No V1 tag or production-readiness claim is authorized.

## Previous verified checkpoints

