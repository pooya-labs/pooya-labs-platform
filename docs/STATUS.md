# Project Status

**Last updated:** 2026-11-08  
**Repository:** pooya-labs/pooya-labs-platform  
**Branch:** main  
**Current phase:** Phase 7 — Owner-led visual redesign and release review  
**Release:** Pre-alpha / portfolio draft

## Latest verified checkpoint — Node 24 Actions runtime migration (2026-11-08)

- Updated all 10 repository workflows to current maintained action majors: checkout v7, setup-node v7, upload-artifact v7, upload-pages-artifact v5, and deploy-pages v5. The exact current minor releases are recorded in CHANGELOG.md.
- Verified the updated checkout, setup-node, upload-artifact, and deploy-pages action manifests use Node 24. The latest successful Repository CI log contains no Node.js 20 deprecation warning.
- Repository CI [42501048926](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42501048926) passed TypeScript, all three build targets, and 92/92 contract tests.
- Browser QA [42501048917](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42501048917) passed 18/18 routes and 36/36 desktop/mobile viewport checks, with zero failures and zero confirmed axe violations. Forty axe checks remain incomplete and are not counted as passed.
- GitHub Pages [42500830187](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42500830187) passed using the updated deployment actions.


## Latest verified checkpoint — Cloudflare production parity (2026-11-08)

- Corrected the stale Cloudflare Pages production host by publishing main commit `a0bac438d377571d0a2c2a6a7c46bee8bd7cf746` to deployment [`efa5ecb4-356d-4112-be60-31401506d940`](https://efa5ecb4.pooya-labs-platform.pages.dev/). Cloudflare confirmed successful `build` and `deploy` stages.
- The canonical Cloudflare alias is [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/).
- Enabled Cloudflare's connected GitHub production deployment on `main`, with app-source path filters `apps/platform/**` and `package.json`; preview deployments remain disabled.
- The direct Pages deploy used the connected Cloudflare account integration. The GitHub Actions `CLOUDFLARE_API_TOKEN` secret is still optional for the workflow's explicit API path and is not required for the native Git integration.
- Documentation-checkpoint CI [42498895229](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498895229) passed on `a0bac438d377571d0a2c2a6a7c46bee8bd7cf746`. The latest runtime Browser QA is [42498428681](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428681), with 18/18 routes and 36/36 viewport checks passed.
- A direct visual browser fetch of the public pages.dev host could not be verified by the available page inspector. Cloudflare's deployment API does confirm the production publish stages succeeded.


## Latest verified checkpoint — homepage Projects Android visibility (2026-11-08)

- Latest verified `main` HEAD: `66c08923be9b814494d17af7ffb9877c5f7c73b1` (workflow/test maintenance checkpoint); the current application fix is `2305f5a68f1148c8293f6e3b55746c01eb52d8f2`.
- Application fix commit: `2305f5a68f1148c8293f6e3b55746c01eb52d8f2`; final Browser QA harness/DOM-measurement commit: `5131660b0b3e0156ac350f6a9aafc648556fc814`.
- Root cause: the homepage Projects section, its heading, and its long list of project cards were hidden behind separate IntersectionObserver reveal gates. On mobile, the reveal conditions could leave the content at opacity zero. All three reveal gates were removed. The card visuals and their own animations remain intact.
- Browser QA now checks both default Persian and English homepage routes. It confirmed the Projects section, heading, and first card at opacity 1 on desktop and mobile in both languages, with all eight project-card animations active.
- Repository CI [42498428514](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428514) passed TypeScript, three build targets, and 92/92 contract tests. The subsequent documentation-only main checkpoint passed CI in [42498895229](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498895229).
- Browser QA [42498428681](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428681) passed 18/18 routes / 36/36 viewports: zero failures, zero horizontal overflow, zero confirmed axe violations. Forty axe checks remain incomplete for manual review.
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

