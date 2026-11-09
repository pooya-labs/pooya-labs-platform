## Latest verified host parity — 2026-11-09 16:58 UTC

**Current main:** [`e5ef638917d3204025d062af939cf01a28689d3a`](https://github.com/pooya-labs/pooya-labs-platform/commit/e5ef638917d3204025d062af939cf01a28689d3a). PR #43 changes one final light-theme token and adds a numeric contrast contract test. PR CI and Browser QA passed; post-merge main CI [42659840758](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840758) and Browser QA [42659839780](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659839780) passed.

### GitHub Pages

- Workflow [42659840309](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840309) passed Build and Deploy on exact main `e5ef6389`; artifact `13693239378`. Canonical URL: [https://pooya-labs.github.io/pooya-labs-platform/](https://pooya-labs.github.io/pooya-labs-platform/).

### Cloudflare Pages

- Production deployment [`ed73cc8e`](https://ed73cc8e.pooya-labs-platform.pages.dev/) (ID `ed73cc8e-7fcb-42b7-8ca0-b6e591f9f160`) passed queue, initialize, clone, build, and deploy from exact main `e5ef638917d3204025d062af939cf01a28689d3a`. Canonical alias: [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/). Trigger is `ad_hoc` through the authorized Cloudflare Pages API.
- Native Git-push remains unverified: matching-path PR #39 did not create a `github:push` deployment. GitHub Actions Cloudflare workflow [42659840434](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840434) passed credential checking but skipped deploy because `CLOUDFLARE_API_TOKEN` is absent. The API fallback succeeded without changing secrets, installation, or project settings.

### Host parity, CSS asset, and accessibility verification

- Both hosts serve the same main application revision `e5ef6389`.
- Live page and CSS requests returned HTTP 200 on both hosts; each CSS asset is 208,405 bytes.
- Both live CSS assets contain `--pf-dim:#58675e` and do not contain `--pf-dim:#728076`.
- Automated contrast ratios: 5.50:1 on `#f5f6f2`, 5.08:1 on `#e9eee9`, and 5.96:1 on `#fffffc`. Full manual contrast review remains separate.
- Live `robots.txt` and `sitemap.xml` response-body verification remains passed on both hosts: HTTP 200, host-specific Sitemap pointer, valid XML with 17 same-origin `loc` entries.

### Remaining release gates

Apps Script run [42659840240](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840240) passed configuration checking but skipped its actual publish job. No new Apps Script version is verified. External social-crawler/cache validation, manual accessibility/screen-reader, physical-device, owner content/media, Salon Booking privacy, and rollback gates remain open. The platform remains **pre-alpha / Phase 7**.

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
