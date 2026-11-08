## Phase 7 readiness implementation — security and performance baseline (2026-11-08)

- Added a cold-context Chromium performance probe for the Persian/English homepage and all eight English case-study routes at desktop (1440×1000) and mobile (390×844) sizes. It records navigation timing, FCP/LCP, CLS, resource sizes, route errors, and horizontal overflow.
- Repository CI [42509020236](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42509020236) passed on PR #13 head `0dd3eca221df8e5b28b796b3db7b8e6462382fc4`: dependency audit reported **0 vulnerabilities**, lint and format checks passed for 49 files, TypeScript passed, all three Pages/Apps Script/Cloudflare builds passed, and **96/96 contract tests** passed.
- Browser QA [42509020267](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42509020267) passed **18/18 routes**, **36/36 viewport checks**, and zero failures. Axe reported zero confirmed violations; **36 incomplete color-contrast checks** remain for human review and are not counted as passes.
- Three-host performance measurements completed: **20 samples per host** for the English/Persian homepages and eight English project routes. The report is retained in [artifact 13628113221](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42509020267/artifacts/13628113221). Full p75 values and limitations are in [PERFORMANCE-BUDGET.md](PERFORMANCE-BUDGET.md).
- The measured CLS is not accepted: investigation traced the large desktop case-study shifts to the static HTML case-study markup being inserted into `#root` during the build and then removed when `main.tsx` calls `createRoot` instead of hydrating that markup. This is a confirmed source-level explanation, not a completed fix. Keep performance budgets report-only until a hydration-safe approach is implemented and the three-host baseline is repeated.
- The new audit and performance checks are tooling/readiness work only. The application UI and deployed build are unchanged; no production deployment is implied by these checks.


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

**Last updated:** 2026-11-08  
**Repository:** pooya-labs/pooya-labs-platform  
**Branch:** main  
**Current phase:** Phase 7 — Pre-redesign readiness and engineering closeout  
**Release:** Pre-alpha / portfolio draft

## Latest verified checkpoint — accessibility semantics, theme contrast, and Cloudflare production (2026-11-08)

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

