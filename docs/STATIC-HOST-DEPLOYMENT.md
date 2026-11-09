## Latest verified host state — PR #46 main QA passed; Cloudflare and Apps Script publish jobs remain skipped (2026-11-09)

**Repository main:** [`5321d3f44298a9d81d3fbc8f0712d4bc9acb8962`](https://github.com/pooya-labs/pooya-labs-platform/commit/5321d3f44298a9d81d3fbc8f0712d4bc9acb8962), merged from PR [#46](https://github.com/pooya-labs/pooya-labs-platform/pull/46). The PR adds crawler-specific Browser QA and docs only; no React/UI source file changed.

### Exact-main verification

- Repository CI [42666914377](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914377): passed on exact main `5321d3f`.
- Portfolio Browser QA [42666914164](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914164): passed on exact main `5321d3f`; artifact [13697461514](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914164/artifacts/13697461514). It passed 18/18 routes, 36/36 desktop/mobile viewports and 34/34 social-crawler checks; zero failures and zero confirmed Axe violations. There are still 36 incomplete Axe contrast checks for human review. Local, GitHub Pages and Cloudflare Pages performance steps also completed successfully.
- GitHub Pages workflow [42666914116](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914116) passed Build and Deploy on exact main `5321d3f`; artifact [13696229308](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914116/artifacts/13696229308). Canonical URL: [https://pooya-labs.github.io/pooya-labs-platform/](https://pooya-labs.github.io/pooya-labs-platform/).

### Application-source and host parity

The PR changes only the Browser QA script, its contract test, and documentation. The React/UI application source remains `e5ef638917d3204025d062af939cf01a28689d3a`; the successful GitHub Pages build on `5321d3f` contains the same end-user application source plus the new QA tooling is not shipped as site runtime code.

- GitHub Pages has a successful fresh build/deploy on main `5321d3f`.
- Cloudflare workflow [42666914099](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914099) passed credential checking but skipped the actual production deploy because the private `CLOUDFLARE_API_TOKEN` secret is absent. No new Cloudflare deployment was created by this workflow.
- The latest separately verified Cloudflare production deployment remains [`ed73cc8e`](https://ed73cc8e.pooya-labs-platform.pages.dev/) (deployment ID `ed73cc8e-7fcb-42b7-8ca0-b6e591f9f160`), created through the authorized API from application source `e5ef6389`. Canonical alias: [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/).
- Native Cloudflare Git-push deployment remains unverified. The matching-path PR #39 did not create a `github:push` deployment. Do not describe native automatic deployment as operational; remediation/reinstallation remains owner-approval-only.

### Apps Script boundary

Apps Script production workflow [42666914071](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914071) passed its configuration-check job but skipped the stable Web App publish because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are not configured. No new Apps Script production version was published or verified. The static portfolio does not depend on Apps Script.

### Social metadata and crawler checks

- The repeatable local Browser QA reads raw HTML under `LinkedInBot/1.0` and Facebook externalhit User-Agents for all 17 public routes (homepage plus eight bilingual project pages): **34/34 checks passed**. It verifies title/description, canonical and `og:url` equality, same-host/base-path OG image URL, and locally built PNG HTTP 200, PNG signature and 1200×627 dimensions.
- The production-host Cloudflare Browser Rendering audit previously passed all 17 routes on both GitHub Pages and Cloudflare Pages under each User-Agent, with zero failures. The live robots/sitemap response bodies also remain verified on both hosts: four HTTP 200 responses, host-specific sitemap pointers and 17 same-origin sitemap URLs per host.
- These User-Agent simulations do not prove that LinkedIn or Meta accepted a URL, refreshed a cached card, or displayed it in an authenticated sharing composer. Authenticated LinkedIn Post Inspector and Meta Sharing Debugger checks remain open.

### Remaining release gates

Manual contrast/focus/keyboard/screen-reader review; physical Android and representative browser acceptance; owner approval of biography, featured order, role wording and media; Salon Booking privacy permission; authenticated social cache inspection; Cloudflare Git integration remediation; Apps Script production configuration; and controlled rollback rehearsal remain open. The 36 incomplete Axe contrast checks are not passes. No rollback has been executed.

The platform remains **pre-alpha / Phase 7**. This runbook records a completed verification; it does not authorize Phase 8, Phase 9, V1 publication, secret changes, or an unapproved rollback.
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

- GitHub Pages production deployment [42659840309](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840309) passed Build and Deploy on exact app SHA `e5ef6389`; artifact `13693239378`.
- Cloudflare production deployment `ed73cc8e` (ID `ed73cc8e-7fcb-42b7-8ca0-b6e591f9f160`) passed all five stages on the same exact app SHA through the authorized Pages API, trigger `ad_hoc`.
- Browser QA [42659839780](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659839780) passed on the same main revision; artifact `13692549570`. Live homepage and CSS assets returned HTTP 200 on both hosts.
- The documented rollback has **not** been rehearsed. This runbook is the procedure, not proof that the procedure has been executed; no production rollback was attempted.

## Security boundary

Keep API tokens and account credentials in approved secret stores. Do not place them in repository files, public workflow logs, screenshots, browser bundles, or chat. Do not use live customer data for release or rollback smoke tests.
