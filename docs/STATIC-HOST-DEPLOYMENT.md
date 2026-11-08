# Static host deployment and rollback runbook

**Scope:** public portfolio on GitHub Pages and Cloudflare Pages. This runbook is separate from the Apps Script proof and does not authorize deployment of independent Workers/D1 projects.

## Source and current deployment baseline

- Repository: `pooya-labs/pooya-labs-platform`; production source branch: `main`.
- GitHub Pages output: `dist/pages`; canonical host: https://pooya-labs.github.io/pooya-labs-platform/.
- Cloudflare Pages output: `dist/cloudflare`; canonical host: https://pooya-labs-platform.pages.dev/.
- Latest application asset revision published to GitHub Pages: [`41ea1004433196aa81e4e50b17a1620f110ecea8`](https://github.com/pooya-labs/pooya-labs-platform/commit/41ea1004433196aa81e4e50b17a1620f110ecea8). Platform GitHub Pages workflow [42514976384](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976384) completed build and deployment successfully on that revision.
- Browser QA [42514976406](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406) passed 18/18 routes with zero failures and zero confirmed Axe violations; 36 incomplete color-contrast checks remain for human review. The run measured 20 cold-context samples per host with p75 CLS 0.0000 on local, GitHub Pages, and Cloudflare Pages.
- Latest Repository CI [42515288490](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42515288490) passed on main docs head `a37de4cf21bc5e41f8fca9ea08ba6d6dfd350b67`.
- Cloudflare production deployment [`107de2a2`](https://107de2a2.pooya-labs-platform.pages.dev/) (ID `107de2a2-d69c-4b9d-ae2c-38da68c7bad4`) was created on 2026-11-08 from main commit `a37de4cf21bc5e41f8fca9ea08ba6d6dfd350b67`. Cloudflare confirmed successful `queued`, `initialize`, `clone_repo`, `build`, and `deploy` stages. Because this commit includes application asset revision `41ea1004`, the latest GitHub Pages and Cloudflare Pages outputs contain the same application assets.
- The GitHub Actions Cloudflare deployment workflow remains credential-gated: the private `CLOUDFLARE_API_TOKEN` secret is still absent. The latest production deployment was nevertheless verified through the authorized Cloudflare API; do not describe automatic push-triggered GitHub Actions publishing as enabled.
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

- GitHub Pages publication has succeeded for previous application commits; a full rollback rehearsal on the current redesigned portfolio has not been recorded here.
- Cloudflare's last verified production deployment succeeded through the authorized API. Automated GitHub Actions publishing is still blocked by the missing private token.
- A real rollback rehearsal remains open in Phase 7. This document is the procedure, not proof that the procedure has been executed.

## Security boundary

Keep API tokens and account credentials in approved secret stores. Do not place them in repository files, public workflow logs, screenshots, browser bundles, or chat. Do not use live customer data for release or rollback smoke tests.
