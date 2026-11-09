# Static host deployment and rollback runbook

## Latest verified host parity — 2026-11-09 16:12 UTC

**Current main:** [`97094ed0cb79f65b0e93bf36d52a2520846e6f1b`](https://github.com/pooya-labs/pooya-labs-platform/commit/97094ed0cb79f65b0e93bf36d52a2520846e6f1b). The only code change since the last host checkpoint is one explanatory comment in `apps/platform/vite.config.ts`; no runtime behavior or generated content changed.

### GitHub Pages

- The latest GitHub Pages workflow [42651297113](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297113) passed both Build and Deploy on exact main `97094ed0`. Pages artifact: `13690386196`. The deploy log records a Pages deployment for the exact commit and the canonical environment URL [`https://pooya-labs.github.io/pooya-labs-platform/`](https://pooya-labs.github.io/pooya-labs-platform/).
- Browser QA [42651297251](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297251) independently measured this published GitHub Pages host with zero measurement failures.

### Cloudflare Pages

- Latest production deployment: [`a075e139`](https://a075e139.pooya-labs-platform.pages.dev/) (ID `a075e139-20d1-4587-91a9-b73904499065`), from exact main `97094ed0`. Cloudflare reports all five stages — queue, initialize, clone, build, and deploy — as successful. Its manifest contains 106 files including the bilingual routes, `robots.txt`, `sitemap.xml`, 17 social PNG cards, and the Pooya Monogram tile.
- Unique deployment URL: [`https://a075e139.pooya-labs-platform.pages.dev/`](https://a075e139.pooya-labs-platform.pages.dev/). Canonical production alias: [`https://pooya-labs-platform.pages.dev/`](https://pooya-labs-platform.pages.dev/).
- The deployment is recorded as `deployment_trigger.type=ad_hoc`: it was started through the authorized Cloudflare Pages API with the connected Git repository and exact main SHA.
- **Native Git-push trigger test:** PR [#39](https://github.com/pooya-labs/pooya-labs-platform/pull/39) changed `apps/platform/vite.config.ts`, which matches the Pages project's configured `apps/platform/**` path filter. After its normal PR merge, Cloudflare did not create a new `github:push` production deployment; the latest deployment was still the earlier `76da3cc2` ad-hoc deployment. The Cloudflare project still reports GitHub source, production branch `main`, and production deployments enabled. The current exact-main deployment was therefore made manually through the API. The test demonstrates that automatic Git deployment is **not currently verified/reliable**; it does not identify the root cause.
- GitHub Actions Cloudflare workflow [42651297288](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297288) passed its credential-check job, but its actual deploy job was skipped because the private `CLOUDFLARE_API_TOKEN` secret is absent. No secret, integration permission, or Cloudflare project setting was changed.

### CI, browser QA, and performance

- Repository CI [42651297246](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297246) passed on exact main `97094ed0`.
- Browser QA [42651297251](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297251) passed 18/18 routes and 36/36 viewports, with zero failures and zero confirmed Axe violations. Report artifact: [`13690630887`](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297251/artifacts/13690630887).
- p75 LCP: 228 ms local, 284 ms GitHub Pages, 384 ms Cloudflare Pages. p75 CLS: 0.000 on all three. All three performance measurements reported zero failures.

### Host parity and remaining limits

Both public hosts now serve builds from the exact same main commit `97094ed0`. The Pages output and Cloudflare output were built separately for their own canonical origins and base paths; Cloudflare deployment source and the Pages deploy log both record the same commit.

The current Vite generator and `tests/platform/multi-host-build-contract.test.mjs` verify 17 canonical sitemap locations per host and a matching host-specific Sitemap target in each built `robots.txt`. Direct public GETs of the live `robots.txt` and `sitemap.xml` response bodies, and authenticated external share-crawler/cache validation, remain unverified. A production rollback rehearsal has not been performed. The documented steps are not proof that the procedure has been executed.

Phase 7 remains open for manual contrast/keyboard/screen-reader review, physical Android/browser acceptance, owner biography/project-order/contribution/media approval, Salon Booking privacy permission, external crawler review, and rollback rehearsal. The platform remains **pre-alpha**; no V1 tag or release is claimed.


**Scope:** public portfolio on GitHub Pages and Cloudflare Pages. This runbook is separate from the Apps Script proof and does not authorize deployment of independent Workers/D1 projects.

## Source and current deployment baseline

- Repository: `pooya-labs/pooya-labs-platform`; production source branch: `main`.
- GitHub Pages output: `dist/pages`; canonical host: https://pooya-labs.github.io/pooya-labs-platform/.
- Cloudflare Pages output: `dist/cloudflare`; canonical host: https://pooya-labs-platform.pages.dev/.
- Latest application source revision published to GitHub Pages: [`97094ed0cb79f65b0e93bf36d52a2520846e6f1b`](https://github.com/pooya-labs/pooya-labs-platform/commit/97094ed0cb79f65b0e93bf36d52a2520846e6f1b). Pages workflow [42651297113](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297113) passed Build and Deploy; artifact 13690386196 was deployed to the canonical Pages URL.
- Browser QA [42514976406](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406) passed 18/18 routes with zero failures and zero confirmed Axe violations; 36 incomplete color-contrast checks remain for human review. The run measured 20 cold-context samples per host with p75 CLS 0.0000 on local, GitHub Pages, and Cloudflare Pages.
- Latest Repository CI [42651297246](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297246) passed on exact main `97094ed0`.
- Latest Cloudflare production deployment [`a075e139`](https://a075e139.pooya-labs-platform.pages.dev/) (ID `a075e139-20d1-4587-91a9-b73904499065`) was created on 2026-11-09 from exact main commit `97094ed0cb79f65b0e93bf36d52a2520846e6f1b`. All five Cloudflare stages succeeded. It serves the same main commit as the successful GitHub Pages deployment.
- The GitHub Actions Cloudflare deployment workflow [42651297288](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297288) passed the credential-check job but skipped its deploy job because the private `CLOUDFLARE_API_TOKEN` secret is absent. The latest production deployment was verified through the authorized Cloudflare API. A native Git push deployment was not observed for matching-path PR #39; do not describe automatic Cloudflare publishing as enabled.
- Apps Script workflow [42514976476](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976476) passed its credential-check job but skipped the actual publish job because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are absent. The static portfolio does not depend on Apps Script deployment.

## Pre-deployment checks

1. Confirm the exact main commit to publish and inspect its diff. Avoid deploying a documentation-only or unrelated commit as if it contained application changes.
2. Confirm Repository CI passes for that source SHA: dependency audit, lint, formatting, TypeScript, all required build targets, and contract tests.
3. Confirm Browser QA passes for the same application source SHA, including route, viewport, keyboard, reduced-motion, accessibility, and performance reports.
4. Build each host independently. GitHub Pages uses the Pages mode and /pooya-labs-platform/ base path; Cloudflare uses the Cloudflare mode and / base path.
5. Retain the build artifact and record the exact source SHA before publishing.

## GitHub Pages publish and smoke test

1. Merge the approved application change to main. The Platform GitHub Pages workflow is triggered by changes under apps/platform, root package.json, or its own workflow file.
2. Confirm the build and Deploy to GitHub Pages job both complete successfully. Record the workflow run ID and published page_url.
3. Open the canonical Pages URL and smoke-test the homepage, one English case study, one Persian case study, the language/theme toggles, the novels route/section, and contact links.
4. Verify canonical URLs and static case-study paths resolve beneath /pooya-labs-platform/ and that no Cloudflare root-base assets are accidentally used.

## Cloudflare Pages publish and smoke test

Preferred automated path:
- Store CLOUDFLARE_API_TOKEN as a GitHub Actions secret with Account → Cloudflare Pages → Edit permission. Never commit it or paste it into chat.
- Confirm the Cloudflare production deploy job runs rather than skipping, builds dist/cloudflare from the exact main SHA, and confirms the deployment's build and deploy stages succeeded.
- Record the workflow run ID, Cloudflare deployment ID, unique deployment URL, source SHA, and canonical production host.

Authorized manual fallback while the secret is absent:
- Use the approved Cloudflare Pages API/deployment interface to publish the Cloudflare build produced from the exact verified commit.
- Do not publish an unverified local folder or a build made from a different SHA.
- Confirm the returned deployment identifier and successful build/deploy stages before declaring the release live.

Smoke test the canonical Cloudflare host independently: homepage, English/Persian project routes, static assets at the root base path, theme/language toggles, and contact links. A successful GitHub Pages deployment does not prove Cloudflare was updated.

## Rollback

Preferred source-consistent rollback for both hosts:
1. Identify the last known-good application commit and the commit being rolled back.
2. Create a normal git revert commit on main for the bad application change. Never reset or force-push shared history.
3. Wait for Repository CI and Browser QA on the revert commit. Do not deploy while required checks fail.
4. Publish the revert commit to GitHub Pages and verify its deploy job.
5. Publish the same revert commit to Cloudflare Pages through the configured GitHub Actions path or the authorized manual API fallback.
6. Confirm both canonical hosts serve the reverted application, then record both run/deployment IDs and the rollback verification.

Emergency host-only rollback:
- Re-publish the previously verified build artifact only when it can be tied to an immutable source SHA and its original CI/Browser QA evidence.
- Record the deployment ID and unique URL; follow immediately with a source-consistent revert on main so repository and production do not remain divergent.
- Never delete prior Cloudflare deployments or rewrite Git history as a substitute for a rollback.

## Recovery evidence

Each release/rollback checkpoint must record the source SHA, CI run, Browser QA run and artifact, host, deployment identifier, unique URL, canonical smoke-test result, and any cache invalidation required. If either host cannot be verified, explicitly report it as not verified.

## Current rehearsal state

- GitHub Pages build and production deployment both passed on app SHA `558970f`; current main's later changes do not touch application files. The canonical host was also measured by Browser QA with zero failures.
- Cloudflare production deployment `76da3cc2` passed all stages on exact main SHA `15203f14`; rendered homepage and Persian/English ORBIT metadata were verified. Native Git push-trigger behavior and the Actions-secret-based deploy job remain unproven.
- A real production rollback rehearsal remains open. This document is the procedure, not proof that it has been executed; no production rollback was attempted.

## Security boundary

Keep API tokens and account credentials in approved secret stores. Do not place them in repository files, public workflow logs, screenshots, browser bundles, or chat. Do not use live customer data for release or rollback smoke tests.
