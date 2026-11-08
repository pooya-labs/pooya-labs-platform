## 2026-11-09 — GitHub governance audit merged and verified

- Merged [PR #22](https://github.com/pooya-labs/pooya-labs-platform/pull/22) as [`a009b4c`](https://github.com/pooya-labs/pooya-labs-platform/commit/a009b4c65b8ea964b4b43f39ed636f86d56ffe33).
- PR Repository CI [42524475237](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475237) and Browser QA [42524475250](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475250) passed; the latter includes responsive/routes/metadata/keyboard checks and three-host cold-route measurements (artifact [13634757460](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475250/artifacts/13634757460)).
- Post-merge main CI [42524729014](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524729014) passed on the merged commit.
- The merge was documentation/state only. Main branch protection, the three direct-to-main capture publishers, deployment secrets, and all owner/device release gates remain unchanged.

## 2026-11-09 — GitHub Actions permission and branch-governance audit

- Added [GITHUB-REPOSITORY-GOVERNANCE.md](GITHUB-REPOSITORY-GOVERNANCE.md) with the observed unprotected-main state, the ten-workflow permission inventory, current check names, and the safe ruleset setup sequence.
- Confirmed read-only scopes for validation/capture workflows, deployment-specific Pages scopes, and write permissions only on the three reviewed-capture publishers. No `pull_request_target` or `workflow_run` trigger was found.
- Identified that the three capture publishers push directly to `main`; a strict require-PR ruleset must first migrate this path to PR-based publishing or explicitly accept the broader GitHub Actions bypass.
- Updated STATUS, NEXT, ROADMAP, RELEASE, SECURITY-MODEL, and project-state. Documentation only; no GitHub settings, secrets, application source, or deployment changed.

## 2026-11-09 — Source audit and owner packet merged

- Merged PR [#18](https://github.com/pooya-labs/pooya-labs-platform/pull/18) as [`23f1689`](https://github.com/pooya-labs/pooya-labs-platform/commit/23f16896624ef391e284d3579a7f7278f5c8cbaf).
- Repository CI passed on the merged main commit: [42522790018](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522790018). PR Browser QA [42522600586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600586) passed local and both public-host measurements, plus responsive/routes/metadata/keyboard checks.
- The merge contains docs and a contract-test update only. No public app build or deployment changed. Owner approval, Phase 7 manual platform checks, and later Phase 8/9 remain gated.

## 2026-11-09 — Phase 7 upstream source and release-state refresh

- Rechecked the exact current `main` heads, release status, and material open-PR state across all eight independent project repositories; recorded evidence in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). All upstream inspection was read-only.
- Updated the owner-review packet to reflect GlobalCart's published stable v1.0.0 release, merged-main E2E result (163 passed / 9 intentional skips / 0 failed), and source-documented owner confirmation of physical desktop/mobile, actual screen-reader, and full human RTL/LTR QA. Physical tablet and eligible field CWV remain open/unmeasured.
- Recorded AetherFlow's owner-confirmed live Apps Script Sheet write/reload/read acceptance and 12-test browser fixture result. The source correction for pending-only storage semantics still needs manual redeployment to the existing Apps Script Web App.
- Recorded ORBIT PR #138's latest CI-only candidate result and the still-failing strict production-image security scan. No production deployment is implied.
- Updated the owner-packet contract test and synchronized STATUS, NEXT, ROADMAP, CHANGELOG, and project-state. This is documentation/test maintenance only; no application code, public platform deployment, or upstream project repository changed.
- Platform main baseline `8ae608342aaf` had passing Repository CI [42520197557](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42520197557). Explicit portfolio owner approval remains pending.

## 2026-11-09 — Phase 7 upstream source and release-state refresh

- Rechecked the exact current `main` heads and observed open PRs across all eight independent project repositories; recorded the new source inventory in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). All upstream inspection was read-only.
- Corrected the bilingual owner-review packet to identify GlobalCart's published stable portfolio/demo v1.0.0 release. Preserved its marketplace-simulation boundary and distinguished its successful Browser E2E run on UI commit `905c6cf` from physical-device, screen-reader, field-CWV, and owner approval.
- Recorded AetherFlow's storage-only Apps Script persistence action and fixture QA result; live owner-Sheet verification remains pending. Recorded ORBIT PR #138 as open/unmerged with its production Keycloak security gate still blocked.
- Updated the owner-packet contract test for the corrected GlobalCart release status. This is documentation and test maintenance only; no application code, public deployment, or upstream project repository changed.
- Platform main baseline `8ae608342aaf` had passing Repository CI [42520197557](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42520197557). The refreshed packet still requires explicit owner review; Phase 7 manual accessibility/device, deployment/recovery, social-preview, and owner approval gates remain open.

## 2026-11-08 — Owner packet merged and post-merge verification

- Merged bilingual [owner review packet](OWNER-REVIEW-PACKET.md) via PR [#16](https://github.com/pooya-labs/pooya-labs-platform/pull/16), main commit [`aca57350`](https://github.com/pooya-labs/pooya-labs-platform/commit/aca573500192f8581896bde10e68ef82c0ca2256).
- Latest PR CI [42519333195](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519333195) and main CI [42519574691](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519574691) passed with **105/105 tests**, zero dependency vulnerabilities, and a clean credential scan.
- Browser QA [42519333196](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519333196) passed 18/18 routes, zero failures, and zero confirmed Axe violations; 36 incomplete contrast checks remain for human review.
- The packet is not owner approval. All eight project review states remain pending; no new public content or media was authorized.

## 2026-11-08 — Bilingual owner review packet

- Added `docs/OWNER-REVIEW-PACKET.md` to consolidate the current Persian/English homepage copy, presentation defaults, eight-project order, status labels, source-backed role wording, contacts, media inventory, public disclosure boundaries, and the empty Novels decision.
- Added contract tests for all eight project entries and the packet's owner-approval/privacy boundaries.
- The packet completes preparation only. All eight source-registry review states and all owner content/media approvals remain pending; no redesign or release approval is implied.

## 2026-11-08 — CI credential scan for tracked files and public builds

- Added a zero-dependency secret scan to Repository CI for tracked UTF-8 files and the generated GitHub Pages and Cloudflare bundles.
- Common private-key/provider-token formats, quoted credential assignments, and credential-bearing file paths are checked. CI output redacts values and reports only path, line, and rule.
- Repository CI [42517885668](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42517885668) passed: dependency audit **0 vulnerabilities**, scan **no recognized matches**, repository contracts **101/101 passed**.
- This scan does not inspect binary contents or Git history and cannot identify every custom credential format. Broader security/privacy review remains open; no V1 release is claimed.

## 2026-11-08 — Current upstream audit and monogram asset verification

- Rechecked the exact `main` heads and inspected the diffs of all eight independent project repositories; the current SHAs and timestamps are listed in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).
- Seven repositories updated their English and Persian README ownership blocks to the centered rounded black-tile Pooya Labs monogram. GlobalCart added desktop and mobile storefront homepage evidence screenshots. No independent application code was changed.
- The platform's monogram-tile asset revision [`41ea1004`](https://github.com/pooya-labs/pooya-labs-platform/commit/41ea1004433196aa81e4e50b17a1620f110ecea8) passed GitHub Pages build/deploy [42514976384](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976384) and Browser QA [42514976406](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406): 18/18 routes, zero failures, and zero confirmed Axe violations; 36 contrast checks remain incomplete for human review.
- The latest performance run measured p75 CLS 0.0000 on all three hosts and p75 LCP of 316 ms local, 400 ms on GitHub Pages, and 400 ms on Cloudflare Pages.
- Repository CI [42515288490](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42515288490) passed on the current main docs head. Cloudflare production deployment [`107de2a2`](https://107de2a2.pooya-labs-platform.pages.dev/) (ID `107de2a2-d69c-4b9d-ae2c-38da68c7bad4`) now also succeeds from current main commit `a37de4cf`, restoring asset parity with GitHub Pages. The GitHub Actions Cloudflare publisher still requires the private `CLOUDFLARE_API_TOKEN` secret.
- The portfolio remains pre-alpha; no V1 approval or release is claimed.

## 2026-11-08 — CLS remediation, three-host verification, and production parity

- Merged PR [#13](https://github.com/pooya-labs/pooya-labs-platform/pull/13) at application commit [`045bc845`](https://github.com/pooya-labs/pooya-labs-platform/commit/045bc84526ef823a37599c6790d144d68465d35c). Direct case-study pages now share a server-rendered React component that the browser hydrates, preserving crawler-readable markup while avoiding the previous root replacement shift.
- Restored the bespoke animated hero scenes and separate desktop/mobile interface evidence gallery; mobile screenshot frames support native touch scroll chaining to the outer case-study page.
- Repository CI [42513404028](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404028) passed dependency audit (0 reported vulnerabilities), lint/format, TypeScript, all three build targets, and repository contracts.
- Browser QA [42513404040](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404040) attempt 2 passed 18/18 routes and 36/36 viewport checks, zero failures, and zero confirmed axe violations. 36 color-contrast checks remain incomplete for manual review.
- Post-remediation performance artifact [13630148273](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404040/artifacts/13630148273) collected 20 samples per host; p50/p75/maximum CLS were 0.0000 across local build, GitHub Pages, and Cloudflare Pages.
- GitHub Pages deployment [42513404002](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404002) succeeded. Cloudflare production deployment [`592357af`](https://592357af.pooya-labs-platform.pages.dev/) was published through the authorized Pages API and passed build/deploy on the same main application commit.
- Cloudflare GitHub Actions automation still requires the private `CLOUDFLARE_API_TOKEN` secret. Apps Script production publishing remains skipped until `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are configured.
- Performance enforcement remains report-only. Physical Android review, manual contrast/keyboard/screen-reader acceptance, external share-crawler validation, rollback rehearsal, and owner visual/content approval are still required; no V1 release is claimed.

## 2026-11-08 — Phase 7 security and performance baseline

- Added a dependency advisory gate (`npm audit --audit-level=high`) to Repository CI; the current PR run reported **0 vulnerabilities**.
- Added cold-context Chromium performance measurements for the Persian/English homepages and all eight English case-study routes at desktop/mobile sizes, with JSON reports for local build, GitHub Pages, and Cloudflare Pages.
- Corrected the report-filename contract test. Repository CI [42509020236](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42509020236) passed: lint, formatting, TypeScript, all three build targets, and **96/96 contract tests**.
- Browser QA [42509020267](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42509020267) passed 18/18 routes and 36/36 viewports with zero failures and zero confirmed axe violations; 36 contrast checks remain incomplete for human review.
- Measured 20 samples per host. The p75 CLS of 0.1713 exposed a reproducible static-case-study root replacement shift; the confirmed cause and remediation gate are recorded in [PERFORMANCE-BUDGET.md](PERFORMANCE-BUDGET.md). Budgets remain report-only.
- The work is contained in PR [#13](https://github.com/pooya-labs/pooya-labs-platform/pull/13). It does not change the public application build and does not claim a new deployment.


## 2026-11-08 — Repository quality and release conventions

- Added a zero-dependency repository quality command for JavaScript syntax/debugger checks and consistent source/config formatting.
- Added `.editorconfig`, exposed `npm run lint` and `npm run format:check`, and wired both into Repository CI.
- Added contributor workflow guidance and a release checklist that preserves the pre-alpha/V1 approval gates.
- Merged as [PR #12](https://github.com/pooya-labs/pooya-labs-platform/pull/12), main commit [`1746c11`](https://github.com/pooya-labs/pooya-labs-platform/commit/1746c11ee87fba4a37ea8fff0f548cb832fe4b22).
- Repository CI [42504771438](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42504771438) passed the lint, format, TypeScript, all three build targets, and contract-test steps.
- Browser QA [42504771467](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42504771467) passed; report artifact [13627206292](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42504771467).
- No public UI or build output changed, so neither Pages host required a new deployment.

## 2026-11-08 — Accessibility semantics and Cloudflare production refresh

- Fixed the homepage proof-statistics container by assigning a valid `group` role to its descriptive `aria-label`; the four repeated `aria-prohibited-attr` incomplete findings are no longer present in the latest axe report.
- Removed the obsolete decorative pseudo-element from the sticky header and made the header base color opaque in both themes while preserving its frosted blur. A contract test protects the accessible group semantics and header color-surface rules.
- Repository CI [42502717615](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717615) passed TypeScript, all three build targets, and **93/93 contract tests**.
- Browser QA [42502717608](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717608) passed **18/18 routes** and **36/36 viewport checks**, with zero failures and zero confirmed axe violations. The remaining **36 incomplete checks are all color-contrast assessments** where gradient/pseudo backgrounds prevent axe from calculating a definite backdrop; they still require human visual contrast review.
- GitHub Pages deployment [42502717618](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717618) passed for application commit `c7a86a2e2f54d157b7e0b806c9c022afd41fd208`.
- Cloudflare production deployment [`a1a69456`](https://a1a69456.pooya-labs-platform.pages.dev/) (ID `a1a69456-fc5a-4ac3-917b-f5cb0cb909a5`) completed successfully from the same commit; Cloudflare confirmed both `build` and `deploy` stages.
- The GitHub Actions Cloudflare workflow [42502717616](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717616) passed its credential-check job but **skipped its production deployment job** because repository secret `CLOUDFLARE_API_TOKEN` is not configured. Cloudflare project settings show the GitHub `main` source enabled, but a push-triggered production deploy was not observed; the latest release was therefore published explicitly through the authorized Cloudflare Pages API. Do not treat native auto-deployment as verified.
- Physical Android review, owner motion/content approval, and the remaining manual accessibility review are still open. No V1 release is claimed.

## 2026-11-08 — GitHub Actions Node 24 runtime migration

- Updated all 10 workflows to current maintained action majors: [checkout v7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1), [setup-node v7.1.0](https://github.com/actions/setup-node/releases/tag/v7.1.0), [upload-artifact v7.0.2](https://github.com/actions/upload-artifact/releases/tag/v7.0.2), [upload-pages-artifact v5.0.0](https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0), and [deploy-pages v5.0.1](https://github.com/actions/deploy-pages/releases/tag/v5.0.1). The updated action metadata uses the Node 24 runtime.
- Updated the two workflow contract tests that deliberately verify artifact-only uploads; the checks remain enabled and now assert `upload-artifact@v7`.
- Repository CI [42501048926](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42501048926) passed **92/92 tests**, TypeScript, and all three independent build targets. Its log contains no Node.js 20 deprecation warning.
- Browser QA [42501048917](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42501048917) passed **18/18 routes** and **36/36 viewport checks**, with zero failures, zero horizontal overflow, and zero confirmed axe violations. Forty axe checks remain incomplete for manual review.
- GitHub Pages deployment [42500830187](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42500830187) passed with the updated actions.
- No application source files were changed in this maintenance task; the Cloudflare production deployment remains the current application build.

## 2026-11-08 — Cloudflare production parity restored

- Published the current `main` application to the existing Cloudflare Pages project `pooya-labs-platform`, replacing the stale 2026-11-06 production build.
- Cloudflare deployment [`efa5ecb4`](https://efa5ecb4.pooya-labs-platform.pages.dev/) (ID `efa5ecb4-356d-4112-be60-31401506d940`) was created from commit `a0bac438d377571d0a2c2a6a7c46bee8bd7cf746`; the API reported successful `build` and `deploy` stages.
- Enabled the connected GitHub production deployment for `pooya-labs/pooya-labs-platform` on `main`. App changes under `apps/platform/**` and root `package.json` now trigger Cloudflare production deployments automatically; preview-branch deployments remain disabled.
- The deploy also contains the Android homepage Projects visibility fix and the current product-specific motion/case-study redesign. The canonical Cloudflare host is [pooya-labs-platform.pages.dev](https://pooya-labs-platform.pages.dev/).
- Repository CI [42498895229](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498895229) passed on the documentation checkpoint `a0bac438d377571d0a2c2a6a7c46bee8bd7cf746`. The runtime fix's Browser QA [42498428681](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428681) passed 18/18 routes and 36/36 viewports; 40 axe checks remain incomplete for human review.
- Physical Android review, motion approval, owner content approval, and manual accessibility checks remain open. No V1 release is claimed.

## 2026-11-08 — Android homepage Projects visibility fix

- Removed the IntersectionObserver reveal gate from the homepage Projects section, its heading, and all eight project cards. A long mobile section can no longer remain transparent because its full height never reaches an observer threshold.
- Preserved the eight compact project-specific card animations; only the reveal dependency was removed.
- Extended Browser QA to load the homepage independently in Persian and English and verify that the Projects section, heading, and first card all render at full opacity. It also checks all eight project-card animations at desktop and mobile widths.
- Repository CI [42498428514](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428514) passed TypeScript, all three build targets, and **92/92 contract tests**.
- Browser QA [42498428681](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428681) passed **18/18 routes** and **36/36 viewport checks**, with zero failures, zero horizontal overflow, and zero confirmed axe violations. The homepage Projects heading, section, and first card measured opacity 1 in Persian/English at both desktop/mobile widths; 8/8 cards retained active animations.
- GitHub Pages deployment [42498199551](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498199551) passed for application commit `2305f5a68f1148c8293f6e3b55746c01eb52d8f2`. QA harness and the final DOM-measurement correction are in `5131660b0b3e0156ac350f6a9aafc648556fc814`.
- The automated mobile check uses Chromium mobile emulation; physical Android-device confirmation is still useful for final owner acceptance. No independent project repository was changed.

## 2026-11-08 — Product-aligned project motion and Android gallery handoff

- Replaced the repeated abstract case-study hero treatment with eight product-specific compositions: AetherFlow execution stages, ORBIT service health and trace activity, Pooya.OS desktop windows, NexusCanvas service topology, LuminaGlass refraction controls, a clearly simulated AuraPulse market chart, GlobalCart product discovery/compare, and Salon Booking's appointment grid.
- Removed the old monogram/static screenshot layer from the case-study hero. The motion scene now has a clean, dedicated stage; real interface screenshots remain in the evidence gallery below it.
- Added a compact, product-specific animated signature to all eight selected-project cards. Browser QA checks every card at desktop and mobile sizes and records active animation names/counts.
- Changed long mobile screenshot frames to native vertical scrolling with scroll chaining. At the lower edge of the image, an ongoing touch gesture can continue the outer case-study page. Added bilingual guidance below mobile captures.
- **Repository CI:** run [42496528868](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496528868) passed on the latest `main` documentation checkpoint `b429828f0ed8f967317934fffed32daffa7b6a5f`: TypeScript, all three build targets, and **87/87 contract tests**.
- **Browser QA:** run [42496014812](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014812) passed **17/17 localized routes** and **34/34 desktop/mobile viewport checks**, with zero failures, zero horizontal overflow, and zero confirmed axe violations. Thirty-six axe checks remain incomplete for manual human review.
- All eight project cards reported active motion at both viewports. All **16/16** localized project mobile routes passed the Chromium touch test: the inner screenshot reached its lower boundary and the outer portfolio page continued scrolling.
- **GitHub Pages:** run [42496014762](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014762) passed build and deployment for this application checkpoint. Private visual evidence is in artifact [13623776195](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014812).
- A physical Android phone/browser check remains open. Chromium touch emulation is regression evidence, not proof across every Android device/browser. No independent project repository was changed.

## 2026-11-08 — Owner-designed Pooya identity and final visual verification

- Replaced the previous generated monogram with the exact owner-supplied portrait mark in the header, About stamp, and favicon. Removed the enclosing square/badge. The original horizontal POOYA — LABS wordmark is used in About. Both uploads are stored as clean transparent WebP assets; their Git blob hashes were checked against the converted files to catch an incomplete or incorrect logo upload.
- Replaced the incorrect horizontal wordmark file with the byte-for-byte verified asset. Browser QA now waits for the About reveal transition and wordmark entrance animation to finish before capturing its screenshot. Artifact [13621507487](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42491842131) shows the correct wordmark at its intrinsic 390×142 size.
- Reworked the English hero middle line so into thoughtful renders on a single solid-mint LTR row, without background-clip text clipping. The browser measures the rendered Range and final glyph after font loading; desktop and mobile both pass.
- Made the eight product-specific case-study motion scenes plainly visible. Browser QA verifies at least three running animations and a high-visibility motion layer per case-study viewport under normal motion preferences, and separately confirms the reduced-motion fallback.
- Repository CI [42491842095](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42491842095), Browser QA [42491842131](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42491842131), and GitHub Pages deployment [42491842070](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42491842070) passed. Browser QA covered 17 routes / 34 viewport checks with zero failures, zero horizontal overflow, and zero axe violations. Thirty-six axe checks remain incomplete for human review, not confirmed violations.
- No independent project source repositories were changed. Cloudflare Pages and Apps Script production jobs remain skipped because their deployment secrets are not configured. The portfolio remains pre-alpha until owner approval, manual accessibility, social-preview validation, and Phase 8 release hardening are complete.
## 2026-11-08 — Borderless mark, stable hero typography, Instagram glyph, and project motion

- Rebuilt the Pooya monogram as a sharper emerald folded-ribbon mark with more negative space. Removed the square badge treatment from the header and About mark; the favicon remains visually aligned.
- Fixed the persistent English headline defect: `into` and `thoughtful` are separate LTR-isolated runs, with extra terminal-glyph breathing room. Browser QA waits for fonts, measures the text range and final glyph, and checks containment at desktop and mobile widths.
- Replaced the generic Camera icon in Instagram contact links with a dedicated Instagram glyph asset.
- Added eight project-specific case-study motion scenes: AetherFlow worker graph, ORBIT telemetry orbits, Pooya.OS floating windows, NexusCanvas topology, LuminaGlass refractive rings, AuraPulse chart bars, GlobalCart catalog panels, and Salon Booking calendar cells. Reduced-motion fallbacks are preserved.
- Repository CI [42487890470](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42487890470) passed. Browser QA [42487890517](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42487890517) passed 17 routes / 34 viewport checks, with zero failures, zero horizontal overflow, and zero axe violations. The latest report contains 36 incomplete axe checks that still need human review.
- Browser QA artifact [13620068611](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42487890517) contains 18 private visual screenshots, including the homepage at desktop/mobile and every localized case-study hero at desktop. The screenshots were visually inspected and remain artifact-only.
- GitHub Pages [42487890534](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42487890534) deployed successfully. Cloudflare Pages and Apps Script production deploys were skipped because their deployment secrets are not configured.
- No independent project repositories were changed. The portfolio is still pre-alpha; owner approval, manual accessibility, social-crawler checks, and Phase 8 remain open.

## 2026-11-08 — Main-branch motion, identity, and release checkpoint

- Reconciled this handoff against the actual `main` HEAD `7a2d6c38731ea57e66bcedc5363566905ab5affe`; it is eight commits ahead of the prior application checkpoint `fa5d412506387622ca39df792fcaed62eb88cb67`.
- The current homepage includes the Systems in Motion signal map (three nodes) and a four-card craft-principles motion gallery. The headline uses isolated bidirectional text runs; the supplied emerald Pooya mark is used in About and the main SVG/favicon identity is aligned to emerald. The scroll-container and direct-entry fixes remain in place.
- Exact-HEAD Repository CI [42483757067](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757067) passed TypeScript, the three build targets, and the repository contract-test step.
- Exact-HEAD Browser QA [42483757051](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757051) passed the 17-route / 34-viewport matrix. Its report is retained as artifact [13618234167](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757051); its detailed axe output still needs human inspection.
- GitHub Pages [42483757053](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757053) passed build and deploy on the same HEAD.
- Cloudflare Pages [42483757077](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757077) and Apps Script [42483757133](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42483757133) passed their credential/configuration checks, but both actual deployment jobs were skipped because the required repository secrets were unavailable. Do not describe either target as updated to this HEAD.
- Rewrote the continuation handoff and reconciled the project-state ledger. The approved 14 full-page captures across seven projects are complete; the roadmap now marks their review/publication steps as done. Owner review, manual accessibility, external social-preview validation, Phase 8 hardening, and V1 approval remain open.

## 2026-11-07 — Repository checkpoint reconciliation and continuation handoff

- Reconciled the project handoff against `main` at `74b19508e77cf20efe414009bb71ca69f91eb700`. The latest application styling change is `e66f4b42562fb6a164117e2b8a3f9905634a1b9e`, the capture-runner update is `d74c12952be73233f551034d08b5fd212d260d0e`, the final capture-contract correction is `061176326e13ba0ba4239416acd6e1f4db5f7580`, and the latest commit at this audit checkpoint is documentation-only.
- Repository CI [42400540542](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42400540542) passed on the exact checkpoint: **54/54 contract tests**, zero failures, zero skips, TypeScript, Pages/GAS/Cloudflare builds, and bundle assembly.
- Browser QA [42399972654](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972654) passed 17/17 routes, 34/34 desktop/mobile viewports, and zero axe violations on the unchanged application/capture source tree. Thirty-four incomplete contrast checks still need human review.
- GitHub Pages [42399972687](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972687) passed build and deploy on that application/capture source tree. Cloudflare [42399972690](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972690) and Apps Script [42399972770](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972770) completed configuration checks, but their actual production deployment jobs were skipped because required repository secrets are absent.
- Project capture [42399972697](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972697), artifact [13584314344](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972697/artifacts/13584314344), contains 29 PNG screenshot candidates and seven WebM reels. The technical contact-sheet scan is complete; assets remain unpublished pending Pooya's approval.
- No previous-project repository was modified. Remaining work is limited to documented owner-content, project-evidence, manual accessibility/social-preview, Phase 7 design-review, and Phase 8 V1 gates. No V1 release is authorized yet.

## 2026-11-07 — First Framer-referenced motion prototype and private project capture

- Implemented the first motion-led Pooya Labs portfolio prototype: large editorial hero, glass sticky navigation, layered project screenshot stage, moving project ticker, scroll reveals, animated gradients, floating preview surfaces, screenshot-led project cards, and responsive mobile treatment. Reduced-motion preferences remain respected and the previously removed custom cursor lens remains out of scope.
- Latest Repository CI [42400056094](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42400056094) passed **54/54 contract tests**, TypeScript, and Pages/Apps Script/Cloudflare builds. Browser QA [42399972654](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972654) passed 17/17 routes, 34/34 desktop/mobile viewports, and zero axe violations; 34 incomplete axe checks still need manual review. GitHub Pages deploy [42399972687](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972687) passed.
- Added GlobalCart to the project-capture workflow, extended ORBIT capture to Incidents and Metrics/Logs/Traces connection-required states, and generated desktop/mobile screenshots plus one real-browser WebM motion reel for each of seven public projects. Capture workflow [42399972697](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972697), artifact [13584314344](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972697/artifacts/13584314344): 29 PNG candidates and seven WebM reels, all SHA-256 checked in capture-report.json and retained privately/unreviewed. No capture has been committed to the public site.
- Visual inspection found the expected caveats: AetherFlow's M07/duplicate-nav discrepancy; AuraPulse's Binance CORS failure (keep explicitly simulated); ORBIT Metrics/Logs/Traces are connection-required, not live telemetry; LuminaGlass overview retains 32px blur though Audio Lab/task board captures are legible. Salon Booking remains excluded pending owner-approved synthetic/redacted imagery.
- First redesign feedback round is now the immediate owner task; the second review and explicit approval remain release gates. No independent project repository was modified; no Phase 7 completion or V1 release is claimed.

## 2026-11-07 — Late upstream refresh: GlobalCart E2E and Salon Booking date-range QA

- Rechecked all eight independent project main refs. GlobalCart advanced to 9afa4f5d726df51ae4f9b95b30982fb5ecd3482a; Salon Booking advanced to 4c4840c639da099379e8f65b387b1589685c6afd; the other six main heads remained unchanged from the prior checkpoint.
- GlobalCart application SHA 6192f8eccdbf8092c31e06a0f37a53485c3e3589 attempted to derive hero product link names from visible content, but Browser E2E [42393544303](https://github.com/pooya-labs/globalcart/actions/runs/42393544303) still failed with **137 passed / 3 failed / 9 skipped**: two serious axe link-name findings and one Playwright accessible-name assertion all received an empty name on Chromium mobile. Pages [42393544307](https://github.com/pooya-labs/globalcart/actions/runs/42393544307) and Security [42393544310](https://github.com/pooya-labs/globalcart/actions/runs/42393544310) passed; Lighthouse [42393731570](https://github.com/pooya-labs/globalcart/actions/runs/42393731570), visual QA [42393731697](https://github.com/pooya-labs/globalcart/actions/runs/42393731697), and Shopify smoke [42393731548](https://github.com/pooya-labs/globalcart/actions/runs/42393731548) passed. M09.8 remains open; no GlobalCart source files were modified.
- Salon Booking's four commits after the v1.0.0 release checkpoint changed only README, ROADMAP, deployment, and project-state documentation. The current deployment guide records Apps Script owner acceptance and archival-only retention of the old Worker/D1. Current CI [42394326231](https://github.com/pooya-labs/salon-booking/actions/runs/42394326231) failed the owner-dashboard date-range assertion on Linux and Windows (expected 2026-11-06; actual 2026-11-08 at 11:00 / 15 minutes); lint, unit/migration, typecheck/build, general responsive/RTL/keyboard QA, and axe scans passed. Pages workflow [42394326440](https://github.com/pooya-labs/salon-booking/actions/runs/42394326440) passed. The test clock/fixture needs reconciliation; no Salon Booking source was modified.
- ORBIT main remains 268017365cd22f7db9dd8895fb59fbccc76c9b8f. Open PRs #137, #138, #140 (draft), and #142 (draft) remain proposals; none is part of main, and no independent project repository was modified.
- Updated the portfolio dossiers, project-content audit, handoff, status, and machine-readable evidence ledger. The portfolio itself remains pre-alpha with owner content/design gates, privacy-reviewed Salon imagery permission, manual accessibility, social crawler validation, and Phase 7 redesign still pending.

## 2026-11-07 — Final source audit and exact-SHA portfolio verification

- Enumerated the current `main` refs of all eight independent project repositories. Only GlobalCart had advanced beyond the previous platform audit; its latest HEAD and concrete accessibility regression are recorded in `PROJECT-CONTENT-AUDIT.md`.
- Updated the GlobalCart bilingual case-study dossier and source audit to reflect main `119afcd`, app SHA `61ce7f5`, and Browser E2E [42392071315](https://github.com/pooya-labs/globalcart/actions/runs/42392071315): 134 passed / 6 failed / 9 skipped. All failures are serious axe `label-content-name-mismatch` findings on hero product links across Chromium, Firefox and WebKit. No GlobalCart source files were modified.
- Updated handoff/status/state/changelog with the verified blockers and current source commit inventory.
- Exact platform checkpoint `5a379757809888a1a8c98335f6006746372779e1` passed Repository CI [42393819743](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42393819743), **52/52 contract tests**, TypeScript, and all three target builds. Browser QA [42393819729](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42393819729) passed 17/17 routes, 34/34 viewports, and zero axe violations. GitHub Pages [42393819716](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42393819716) passed build and deploy.
- Cloudflare Pages and Apps Script production jobs were skipped due missing deployment secrets; no new production releases on those targets are claimed. Manual contrast/accessibility, owner content/design approval, external social crawler validation, and the required Phase 7 redesign remain release gates.

## 2026-11-07 — GlobalCart M09.8 accessibility regression recheck

- Rechecked upstream `pooya-labs/globalcart` main at `119afcd4924fbdda0287558d00926ab051255e59`. Compared with application-code SHA `61ce7f5da832000b6bcb6fa56b1a4f2fc0c69a0f`, the only later commit changes `data/catalog.json`, so the latest Browser E2E run still represents the current application tree.
- Pages deploy/public smoke [42392071302](https://github.com/pooya-labs/globalcart/actions/runs/42392071302) and Security [42392071307](https://github.com/pooya-labs/globalcart/actions/runs/42392071307) passed.
- Full Browser E2E [42392071315](https://github.com/pooya-labs/globalcart/actions/runs/42392071315) completed with **134 passed / 6 failed / 9 skipped**. All six failures are serious axe `label-content-name-mismatch` findings: visible text in hero-product tiles is not included in link accessible names. The defect reproduces across Chromium, Firefox and WebKit, in homepage and command-palette-open-state tests.
- Lighthouse [42392214241](https://github.com/pooya-labs/globalcart/actions/runs/42392214241) passed six route/mode budgets (home mobile Performance 92, LCP 2.5 s, TBT 260 ms; Accessibility, Best Practices and SEO all 100). Post-deploy image QA [42392214297](https://github.com/pooya-labs/globalcart/actions/runs/42392214297) passed two desktop/mobile checks and skipped two unavailable cases; Shopify smoke [42392214325](https://github.com/pooya-labs/globalcart/actions/runs/42392214325) passed.
- Updated the portfolio's GlobalCart dossier, source audit, handoff, and status to identify the concrete accessibility failure instead of carrying forward the older cancelled-run-only record. No GlobalCart source files were modified; M09.8 and 1.0.0 remain open.

## 2026-11-07 — ORBIT dual-runtime and GlobalCart M09.8 source refresh

- Rechecked ORBIT main at `268017365cd22f7db9dd8895fb59fbccc76c9b8f`. PR #136 added the Cloudflare Worker edge-gateway path; exact-main CI [42223939950](https://github.com/pooya-labs/orbit/actions/runs/42223939950), Security [42223939967](https://github.com/pooya-labs/orbit/actions/runs/42223939967), and Pages [42223939898](https://github.com/pooya-labs/orbit/actions/runs/42223939898) passed. The Worker is not live-connected: workers.dev route is disabled, origin and `ORBIT_GATEWAY_SECRET` are unset, so API routes remain fail-closed.
- Updated the ORBIT bilingual technical dossier and architecture diagram to document the independent Apps Script synthetic demo, Cloudflare Worker-to-Go path, canonical PostgreSQL boundary, and separate authenticated OTLP telemetry pipeline. Explicitly recorded that CF01–CF05 live acceptance remains pending.
- Rechecked GlobalCart main at `8a89f0d612cdf69d619b64049304eaa789b4785c`: v0.2.3-dev / M09.8. Updated the portfolio project-card status and its bilingual dossier with current deployment, Lighthouse, image QA, Shopify smoke, and outstanding Browser E2E evidence.
- GlobalCart Pages run [42387896585](https://github.com/pooya-labs/globalcart/actions/runs/42387896585) passed catalog/image persistence, TypeScript, unit tests, build, deployment, and published-site smoke. Lighthouse [42367298478](https://github.com/pooya-labs/globalcart/actions/runs/42367298478) passed six lab route/mode budgets; home mobile measured LCP 2.4 s / TBT 250 ms. Visual QA [42367298484](https://github.com/pooya-labs/globalcart/actions/runs/42367298484) and Shopify smoke [42367298509](https://github.com/pooya-labs/globalcart/actions/runs/42367298509) passed on an earlier SHA. Browser E2E [42247489435](https://github.com/pooya-labs/globalcart/actions/runs/42247489435) was cancelled; current-SHA full E2E remains open.
- Portfolio code commit [cc157e4](https://github.com/pooya-labs/pooya-labs-platform/commit/cc157e4c9dd3e52a5181fb1a7e5e33821045f41b) passed GitHub Pages build/deploy [42391868126](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42391868126) and Browser QA [42391868133](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42391868133). A stale GlobalCart release-wording assertion was corrected rather than weakening the test; final Repository CI [42392401131](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42392401131) passed **52/52 contract tests**, typecheck, and all three target builds on test checkpoint `087fee17a8bfff503075dbae14609d530a7e63a4`.
- No previous project repository was modified. Cloudflare Pages and Apps Script production deploy jobs were skipped for this platform update because required Actions secrets remain unavailable; their workflow wrapper success is not counted as production deployment.

## 2026-11-07 — Platform handoff and release-gate reconciliation

- Reconciled the platform handoff against the live `main` branch and the latest available repository state.
- Compared current code checkpoint `0f6e8b596b41701954f9e981f38aa7315eb593dd` with the last verified deployed UI source `468c1f60ab11223693f3678213d48848100ae63e`: 12 commits ahead, with changes limited to capture automation, README/docs, and contract tests; no app runtime source changed.
- Rewrote `docs/NEXT.md` into ordered P3-08A/B/C owner-content, project-evidence, accessibility, and social-validation work queues, followed by mandatory Phase 7 redesign and Phase 8 V1 hardening.
- Refreshed `docs/STATUS.md` with explicit distinctions between current main head, last verified UI source, last CI checkpoint, browser QA, and Pages deployment. No fresh CI run is claimed for the newer code head.
- Refreshed `docs/project-state.json` with the reconciliation checkpoint and current release blockers.
- Preserved the portfolio-first product boundary, the intentionally empty novels catalog, independent hosting targets, and Phase 9 deferral for previous-project code integration.
- Validation limitation: this documentation-only reconciliation was committed through GitHub; a new Actions run for the resulting documentation commits has not yet been observed.

## 2026-11-06 — Novels library, Salon Booking v1.0.0 alignment, and final checks
- Added the bilingual novels section with an empty public catalog, responsive cover cards, and an in-site Markdown/TXT reader. The exact GitHub upload instructions are in docs/NOVELS-GUIDE.md; titles and story content remain empty until Pooya supplies them.
- Added six novels-library contract tests covering catalog schema, path validation, publication gating, safe Markdown rendering, homepage wiring, upload guide paths, and Pages catalog packaging.
- Corrected Salon Booking's portfolio status to the owner-accepted product release v1.0.0. The Apps Script source version is 1.5.3; CI and Pages evidence are linked from runs 42086718663 and 42086718821.
- Repository CI [42247729151](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247729151) passed **52/52 tests** on test checkpoint 53c13993ca2aa2dbbb007454729a084fcdce43b4.
- Browser QA [42247171025](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247171025) passed 17/17 routes and 34/34 viewports on UI SHA 468c1f60ab11223693f3678213d48848100ae63e with zero axe violations; 34 color-contrast checks still need human visual review.
- Pages Build and Deploy both succeeded for UI SHA 468c1f6 in run [42247171442](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247171442); artifact [13518846598](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42247171442/artifacts/13518846598) contains the novels catalog and updated app bundle.
- AetherFlow's README and dashboard CORS guidance now use https://pooya-labs.github.io; the landing/dashboard M07 vs README M08 mismatch, duplicate Dashboard navigation, and old owner links still block screenshot approval.


# Changelog

## 2026-11-06 — GitHub Pages release verification and visual screenshot candidate audit
- GitHub Pages run [42238363799](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363799) completed successfully on code SHA `dc991c4a90aad92ec4006332fffccf04fdd09951`; both the build and deploy jobs passed.
- Downloaded and audited deployed artifact [13511808294](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363799/artifacts/13511808294): 17 HTML pages, 17 valid PNG Open Graph cards at 1200×627, 17 sitemap URLs, and robots.txt sitemap pointer. All HTML pages have canonical/OG image/description/JSON-LD; all 16 case-study pages have language alternates.
- Individually inspected the twelve artifact-only screenshot candidates from [42235240283](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42235240283). All twelve returned HTTP 200 and have no horizontal overflow, but remain unpublished and owner-unapproved. The visual audit records AetherFlow's stale M07/duplicate Dashboard, AuraPulse's Binance CORS failure and simulated labels, the visible Pooya.OS portrait needing approval, NexusCanvas's illustrative modelled metrics, LuminaGlass's 32px blur state, and ORBIT's explicit demo/illustrative data disclosure.
- Salon Booking remained excluded from automated capture because it requires owner-approved, privacy-reviewed redacted content.
- Updated STATUS, NEXT, project content audit, and machine-readable project state. The current code UI remains at `dc991c4`; documentation checkpoint is `aa62b23`.

## 2026-11-06 — Portfolio accessibility remediation and strict axe QA
- The first axe scan on commit `2933bad` identified 51 repeated serious findings: 34 brand-name mismatches and 17 undersized navigation targets. Both were fixed centrally in [38203322](https://github.com/pooya-labs/pooya-labs-platform/commit/38203322f11184adb06064a530c5f8b4bc5c05a2).
- QA run [42236238032](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42236238032) passed 17/17 routes and 34/34 desktop/mobile checks with zero axe violations. The first report exposed 36 incomplete rule checks; two `aria-prohibited-attr` cases on the hero artwork were fixed with `role="img"` and localized accessible naming in [dc991c4](https://github.com/pooya-labs/pooya-labs-platform/commit/dc991c4a90aad92ec4006332fffccf04fdd09951).
- Strict browser QA now fails critical/serious axe violations and retains incomplete-rule details. Current-SHA run [42238363900](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363900) passed **17/17 routes, 34/34 viewport checks, zero axe violations, and zero failures**. Its 34 incomplete records are all color-contrast checks that need human visual review because glass/gradient/overlapped backgrounds prevent reliable automatic calculation. No formal WCAG certification is claimed.
- Repository CI [42238363801](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363801) passed all three builds and **46/46 contract tests** on current SHA `dc991c4a90aad92ec4006332fffccf04fdd09951`.
- GitHub Pages build succeeded on current SHA; deployment [42238363799](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42238363799) was still running at this checkpoint.
- Cloudflare and Apps Script actual deploy jobs were skipped because their required Actions secrets are unavailable.

## 2026-11-06 — Portfolio Chromium browser QA
- Added a dedicated Playwright/Chromium workflow for the GitHub Pages build, independent of the external-project screenshot capture workflow.
- The test opens the homepage and all 16 Persian/English case-study routes directly, at desktop 1440×1000 and mobile 390×844.
- Validates HTTP status, title, locale/direction, canonical route, one H1 and main landmark, image alt attributes, horizontal overflow, and keyboard skip-link focus/activation.
- Browser QA [42234110102](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110102) passed **17/17 routes, 34/34 viewport checks, and zero failures**. The JSON report is retained as [artifact 13510613719](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110102/artifacts/13510613719).
- Repository CI [42234110197](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110197) passed TypeScript, all three target builds, artifacts, and **45/45 contract tests** on `515ef71d9105af0faf9fb3208d702520fd37be7f`.
- GitHub Pages build and deploy [42234110256](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110256) succeeded on the same SHA. Manual screen-reader/accessibility and visual review remain open; the automated run is not a WCAG certification.
- Cloudflare and Apps Script deploy jobs were skipped because the required repository Actions secrets are still unavailable.
## 2026-11-06 — Bilingual keyboard skip navigation
- Added a skip-to-main-content link to the homepage and both interactive and crawler-readable static case-study pages in Persian and English.
- Skip links appear when reached by keyboard focus, move focus to the main region, and avoid entrance transitions under reduced-motion preferences.
- Added a regression contract for both locales and all page renderers; existing focus-visible outlines remain in place.
- Repository CI [42231110043](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42231110043) passed TypeScript, all three build targets, artifact uploads, and **42/42 contract tests** on main `fc4d865b8fa4a19a3899f4b72847d39594c201ad`.
- GitHub Pages build and deploy [42231109831](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42231109831) succeeded on `fc4d865b8fa4a19a3899f4b72847d39594c201ad`.
- Cloudflare and Apps Script deployment jobs remained skipped because their required repository Actions secrets were unavailable; no formal accessibility certification or manual screen-reader review is claimed.
## 2026-11-06 — Case-study section hierarchy consistency
- Corrected the final two interactive case-study section labels to 09 and 10, matching the crawler-readable static pages.
- Moved the supplemental interface-capture heading out of the numbered sequence in both renderers, avoiding a duplicate 05 label.
- Added a regression contract that checks both renderers expose the same uninterrupted 01–10 section sequence.
- Repository CI [42227942261](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42227942261) passed TypeScript, all three target builds, artifact uploads, and **41/41 contract tests** on 328de1fc838cb4a5b9af9c3515a7c261cb3e47ec.
- GitHub Pages build and deployment [42227942275](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42227942275) succeeded on the same commit.
- Cloudflare and Apps Script deploy jobs were still skipped because their required GitHub Actions secrets were unavailable; the prior Cloudflare production deployment remains the f9011ec5a3f9eb2faffdac222596b37444184191 build.
## 2026-11-05 — Raster social previews for reliable link sharing
- Added pinned build dependency `@resvg/resvg-js@2.6.2` to render social-card SVGs into real PNG files during the Pages build; editable SVG sources remain available beside each PNG.
- Switched homepage and all 16 localized project case-study Open Graph images to PNG.
- Standardized all 17 PNG cards at **1200×627 (1.91:1)**, matching LinkedIn's published share-preview recommendation; retained large-image Twitter/X card metadata.
- Extended built-output tests to verify PNG signatures, exact pixel dimensions, correct per-project routes, and image/png metadata.
- Repository CI [42072937855](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42072937855) passed TypeScript, Pages/GAS builds, artifact upload, and **34/34 contract tests**.
- Pages deployment containing the PNG generator and social image references [42071642813](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42071642813) succeeded.
- External share-client cache/rendering validation remains open; see the [LinkedIn sharing requirements](https://www.linkedin.com/help/linkedin/answer/a1322434) and [resvg-js package](https://www.npmjs.com/package/@resvg/resvg-js).

## 2026-11-05 — Persian SVG typography and GlobalCart interface evidence
- Improved generated Persian architecture diagrams and social cards with an Amiri/Tahoma fallback stack, RTL alignment, more compact labels, and stable node-number positioning; constrained Persian social-card descriptions to prevent horizontal overflow.
- Added a source-pinned GlobalCart desktop homepage screenshot as the case-study hero and a separate mobile homepage capture section, both with bilingual captions/alt text and lazy loading.
- Added source validation for case-study screenshot URLs, immutable commit pins, and localized captions/alt text.
- Expanded build smoke checks to assert the desktop hero and mobile screenshot appear in the static Persian and English GlobalCart pages.
- Repository CI [42070270418](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42070270418) passed TypeScript, Pages/GAS builds, artifact upload, and **34/34 contract tests**.
- Pages deployment with Persian SVG font/RTL corrections and GlobalCart screenshot integration [42069853533](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42069853533) succeeded.
- GlobalCart's product-detail/gallery screenshot coverage and manual release QA remain open.

## 2026-11-05 — GlobalCart responsive UI evidence
- Added the actual GlobalCart desktop and mobile storefront homepage captures to the case study; the desktop image is the pinned hero visual and the mobile image is shown in a dedicated responsive gallery section.
- Both images were visually inspected: they show the storefront UI and do not expose customer personal data. Asset URLs are pinned to source commit `5ca43e40ff101e673ee7cf261850bff0a679047c`.
- Added regression checks for pinned source URLs, localized captions/alt text, and correct project-only placement in the generated Persian and English pages.
- Repository CI [42070270418](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42070270418) passed TypeScript, Pages/GAS builds, artifact upload, and **34/34 contract tests**.
- Pages deployment containing the screenshots and case-study media section [42069853533](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42069853533) succeeded.
- Remaining screenshot gaps are AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse; Salon Booking requires owner-approved redacted interface evidence.

## 2026-11-05 — Static bilingual case studies and architecture diagrams
- Added build-generated Persian and English static HTML case-study routes for all eight projects (16 pages), including canonical URLs, hreflang alternates, JSON-LD, pre-rendered article content, and direct source links.
- Added 16 per-project/per-language Open Graph SVG cards plus a homepage card, and published robots.txt and a canonical sitemap with locale alternates.
- Added eight project-specific architecture diagrams in Persian and English (16 SVGs), embedded in static and interactive case studies. Diagrams are explicitly distinguished from UI screenshots and production evidence.
- Extended route handling so direct static-page visits and in-page navigation resolve the right project and locale; GAS mode retains the query-string route fallback.
- Added build-output smoke tests for every HTML route, metadata, diagram, social card, sitemap, and robots.txt.
- Repository CI [42066575496](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42066575496) passed TypeScript, Pages/GAS builds, artifact upload, and **32/32 contract tests**.
- Pages deployment containing the static-page and architecture-diagram implementation [42066311960](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42066311960) succeeded.
- Remaining before V1: actual UI screenshots, external social-crawler validation (SVG compatibility/fallback), owner-approved biography/roles/project order/contact, per-project manual QA, and the mandatory two-round full redesign.

## 2026-11-05 — Source-grounded engineering dossiers and release audit
- Expanded all eight bilingual case studies with documented role/attribution, architecture, implementation details, engineering decisions, verification evidence, and direct source/CI references.
- Kept attribution explicit where source READMEs do not identify an individual author; AetherFlow's individual contribution wording remains an owner-review item.
- Aligned GlobalCart and Salon Booking status labels with their current source release lines and disclosed simulated/non-production boundaries.
- Added contract coverage for all eight dossier records and their bilingual sections.
- Added [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md), a per-project checklist of source-confirmed facts and the exact missing information/evidence required before V1.
- Repository CI [42059342492](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42059342492) passed TypeScript, Pages/GAS builds, artifact upload, and **29/29 contract tests**.
- Pages deployment containing the dossier code [42058556955](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42058556955) succeeded; the later 9c2c035 commit changed only a test assertion.

## 2026-11-05 — Project visuals and portfolio metadata
- Added seven visual assets referenced directly from the source project repositories and pinned to immutable commit SHAs; every asset has Persian/English alt text and a semantic visual kind.
- Added lazy-loaded responsive project-card media and matching case-study hero media; failed remote media gracefully falls back to the local project artwork.
- Used an actual GlobalCart storefront screenshot; retained branded artwork/logos for other repositories rather than presenting those as product screenshots. AetherFlow currently keeps its CSS-generated project motif until real visual evidence is available.
- Added bilingual case-study page titles/descriptions, dynamic canonical and Open Graph URL/title/description/locale updates, base social metadata, Person JSON-LD, and a custom SVG favicon.
- CI [42053063421](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42053063421) passed TypeScript, Pages/GAS builds, artifact upload, and **27/27 contract tests**.
- Pages deployment [42053052111](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42053052111) succeeded with the sitemap included.

## 2026-11-05 — Shareable bilingual project case studies
- Added an evidence-based bilingual case-study record for each of the eight featured projects: challenge, approach, engineering highlights, and explicit scope boundaries.
- Added in-site detail views with shareable `?project=<slug>` URLs, Persian/English copy, demo/source links, and an optional existing external case-study link.
- Project cards now link to their live demos, repositories, and detail views.
- Verified public repository and preview URLs against the actual project repositories and READMEs; every project remains marked as needing Pooya's editorial review.
- Repository CI [42048164129](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42048164129) passed TypeScript, both build targets, artifact upload, and 24/24 tests.
- GitHub Pages deployment [42047985066](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42047985066) succeeded.

## 2026-11-05 — Typed portfolio content registry
- Moved the eight initial project records out of the page component into a typed content module.
- Added stable URL-safe project slugs, honest project status keys, explicit owner-review state, localized copy checks, unique-name/slug checks, and validated HTTPS source links.
- Verified exact repo and preview links against the actual GitHub repositories and project READMEs.
- Updated the next milestone to reusable project case-study pages.
- Repository CI [42045396058](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42045396058) passed TypeScript, both build targets, artifact upload, and 23/23 tests.

## 2026-11-05 — Portfolio-first public website
- Reframed the product around Pooya's personal profile and project showcase; the portfolio is now the default root experience.
- Added bilingual intro, About, selected project cards, focus areas, technology list, contact section, and a secondary entry to the Spatial OS workspace.
- Added dark obsidian / cyan / emerald portfolio styling with a restrained, touch-safe and reduced-motion-safe pointer refraction effect.
- Changed the roadmap so a complete redesign using Pooya's feedback is a mandatory pre-release gate with two review rounds and explicit approval.
- Clarified that a generic customer login/dashboard is not part of the portfolio by default and that Apps Script is deferred.
- Added ADR-0006, portfolio product-surface and architecture documentation, and contract tests.


## 2026-11-08 — Portfolio visual polish round 1

- Reworked the portfolio header controls into a compact, clearer utility group and selected the supplied metallic-gold P mark for brand consistency.
- Added an original Stripe-inspired radial light-burst section with truthful Pooya Labs portfolio metrics; no Stripe code, fonts, or proprietary assets are reused.
- Hardened case-study card/grid text wrapping and media-frame sizing to prevent desktop copy from escaping its containers.
- Added paired desktop/mobile media presentation and extended the capture runner to produce full-page desktop/mobile evidence for public projects, including Salon Booking's customer-facing route only.
- New screenshots remain private review artifacts until the capture run succeeds and images pass visual/privacy review.
- Validation: pending GitHub Actions on `feat/portfolio-polish-stripe-motion`.


## 2026-11-08 — Responsive capture review

- Captured 47 real browser screenshots and 8 short motion reels from the public project demos at desktop and mobile viewports.
- Approved 14 full-page desktop/mobile screenshots for seven projects after visual and privacy review; Salon Booking capture is restricted to the customer-facing page.
- Added a publishing workflow that verifies the exact artifact, PNG signatures, dimensions, byte sizes, and SHA-256 checksums before committing screenshots.
- GlobalCart's new full-page capture is held back because the live product collection currently displays blank placeholders; its existing curated screenshots remain active.


## 2026-11-08 — Full-page case-study gallery integration

- Published 14 approved full-page desktop/mobile screenshots from seven public projects under `apps/platform/public/interface-captures/`.
- Added immutable commit-pinned gallery references for AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and Salon Booking.
- Kept GlobalCart's existing curated screenshots in place while its current live catalog grid is repaired.


## 2026-11-08 — Visual feedback round 3 and accessibility follow-up

- Rebuilt the Pooya Labs visual system around a restrained graphite/ivory/emerald palette, a new minimal P monogram and favicon, a theme-aware header, and a redesigned contact/footer close.
- Recreated the requested Stripe-inspired section hierarchy with a centered headline, four metric columns, and a full-width original animated SVG fan of rays and particles. The hero screenshot stage now drifts more slowly with reduced travel and respects reduced-motion preferences.
- Fixed the underlying bilingual architecture SVG generator: node headings, details, and long diagram captions now wrap into bounded lines and use explicit RTL/LTR text direction. Direct project URLs now start at the top instead of restoring a stale scroll position.
- Added Telegram `@pooyayee` and Instagram `@_p.ooya` contact links to the homepage/footer and profile metadata.
- Connected the approved AuraPulse dashboard and Shayan Salon public booking captures to their homepage project cards and case-study media. Salon Booking admin/customer data remain excluded.
- Merged PR [#6](https://github.com/pooya-labs/pooya-labs-platform/pull/6) for visual round 3 and PR [#7](https://github.com/pooya-labs/pooya-labs-platform/pull/7) for unique screenshot-landmark names. The latter removed 32 repeated `landmark-unique` moderate axe findings.
- Validation on main `fa5d412506387622ca39df792fcaed62eb88cb67`: Repository CI **67/67 tests**, Browser QA **17/17 routes and 34/34 viewports with zero axe violations**, GitHub Pages/Cloudflare Pages/Apps Script deployments all succeeded.
- Manual review is still required for 36 incomplete axe checks (34 color-contrast, 2 aria-prohibited-attr), keyboard/screen-reader behavior, external social-preview crawlers, and explicit owner V1 approval.
