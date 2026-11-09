# Static host deployment and rollback runbook

## Latest verified host parity — 2026-11-09 15:46 UTC

**Current main:** [`15203f14eab12b5c7258a97ecd1b1b4dadd61879`](https://github.com/pooya-labs/pooya-labs-platform/commit/15203f14eab12b5c7258a97ecd1b1b4dadd61879). Post-merge Repository CI [42645102359](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42645102359) passed on this exact main SHA.

### GitHub Pages

- The latest successful GitHub Pages deployment is [workflow run 42526088212](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088212). Both the Pages build and Deploy jobs passed. The deploy log confirms artifact `13635093909`, Pages build version `558970fefad25fa16632a8d740eb1a7a32c8f3bd`, and canonical URL [`https://pooya-labs.github.io/pooya-labs-platform/`](https://pooya-labs.github.io/pooya-labs-platform/).
- The last application-source revision actually published to Pages is `558970f`, which includes the Pooya Monogram owner identity and the current application bundle. The current main `15203f14` is newer, but the GitHub compare endpoint reports only documentation, workflow, and test paths between those two commits; no `apps/platform/**`, root `package.json`, or Pages workflow file changed. Therefore the published application bundle has not gone stale even though the full Git commit IDs differ.
- The current Browser QA PR run [42644621916](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42644621916) also measured the published GitHub Pages host successfully, with zero measurement failures.

### Cloudflare Pages

- Latest production deployment: [`76da3cc2`](https://76da3cc2.pooya-labs-platform.pages.dev/) (deployment ID `76da3cc2-d231-444e-aaaa-d4d4be96f546`), created 2026-11-09 at 15:31 UTC from exact main commit `15203f14`.
- Cloudflare API reports every stage — `queued`, `initialize`, `clone_repo`, `build`, and `deploy` — as successful. Its source remains `pooya-labs/pooya-labs-platform`, production branch `main`, build command `npm run build:cloudflare`, output `dist/cloudflare`. The deployment manifest includes the bilingual project routes, `sitemap.xml`, `robots.txt`, 17 PNG Open Graph cards, and the Pooya Monogram tile.
- The canonical production alias is [`https://pooya-labs-platform.pages.dev/`](https://pooya-labs-platform.pages.dev/). Unique deployment URL: [`https://76da3cc2.pooya-labs-platform.pages.dev/`](https://76da3cc2.pooya-labs-platform.pages.dev/).
- An actual rendered-HTML check via Cloudflare Browser Rendering verified the production homepage and both Persian and English ORBIT case-study routes. The cases returned language-correct titles/descriptions, canonical URLs on the Cloudflare canonical host, `og:locale` (`fa_IR` / `en_US`), matching Open Graph images (`og/orbit.png` / `og/orbit-en.png`) at 1200×627, and `hreflang` alternates for `fa`, `en`, and `x-default`. The Pooya Monogram attribution was present in the rendered HTML.
- This deployment was requested through the authorized Cloudflare Pages API against the already-connected Git repository and is recorded as `ad_hoc` with the exact main SHA. It does **not** prove that a native Git push independently triggered Cloudflare's Git integration. The GitHub Actions `deploy-cloudflare.yml` path remains gated by the absent private `CLOUDFLARE_API_TOKEN` secret.

### Host parity conclusion

The two production hosts now contain the same application source revision: GitHub Pages published `558970f`; Cloudflare was rebuilt from `15203f14`, with no application files changed between them. Do not require the documentation commit IDs to match. The current app bundle, bilingual routes, owner identity, and case-study assets are aligned.

**Limits of this verification:** the generic web fetcher could not retrieve the public `github.io` / `pages.dev` URLs. Browser QA independently measured both published hosts, while Browser Rendering verified the current Cloudflare HTML. Attempts to read `robots.txt` and `sitemap.xml` through Browser Rendering hit its API rate limit; their presence in the production deployment file manifest is verified, but their live response bodies and representative external crawler/share-cache behavior remain unverified. A production rollback rehearsal has not been run; no rollback or destructive deployment action was performed.


**Scope:** public portfolio on GitHub Pages and Cloudflare Pages. This runbook is separate from the Apps Script proof and does not authorize deployment of independent Workers/D1 projects.

## Source and current deployment baseline

- Repository: `pooya-labs/pooya-labs-platform`; production source branch: `main`.
- GitHub Pages output: `dist/pages`; canonical host: https://pooya-labs.github.io/pooya-labs-platform/.
- Cloudflare Pages output: `dist/cloudflare`; canonical host: https://pooya-labs-platform.pages.dev/.
- Latest application asset revision published to GitHub Pages: [`558970fefad25fa16632a8d740eb1a7a32c8f3bd`](https://github.com/pooya-labs/pooya-labs-platform/commit/558970fefad25fa16632a8d740eb1a7a32c8f3bd). The Pages workflow [42526088212](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088212) completed build and deployment successfully; artifact 13635093909 was deployed to the canonical Pages URL.
- Browser QA [42514976406](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406) passed 18/18 routes with zero failures and zero confirmed Axe violations; 36 incomplete color-contrast checks remain for human review. The run measured 20 cold-context samples per host with p75 CLS 0.0000 on local, GitHub Pages, and Cloudflare Pages.
- Latest Repository CI [42515288490](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42515288490) passed on main docs head `a37de4cf21bc5e41f8fca9ea08ba6d6dfd350b67`.
- Latest Cloudflare production deployment [`76da3cc2`](https://76da3cc2.pooya-labs-platform.pages.dev/) (ID `76da3cc2-d231-444e-aaaa-d4d4be96f546`) was created on 2026-11-09 from main commit `15203f14eab12b5c7258a97ecd1b1b4dadd61879`. All five Cloudflare stages succeeded. This is newer than the prior `107de2a2` deployment and includes the same application files as GitHub Pages commit `558970f`.
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

- GitHub Pages build and production deployment both passed on app SHA `558970f`; current main's later changes do not touch application files. The canonical host was also measured by Browser QA with zero failures.
- Cloudflare production deployment `76da3cc2` passed all stages on exact main SHA `15203f14`; rendered homepage and Persian/English ORBIT metadata were verified. Native Git push-trigger behavior and the Actions-secret-based deploy job remain unproven.
- A real production rollback rehearsal remains open. This document is the procedure, not proof that it has been executed; no production rollback was attempted.

## Security boundary

Keep API tokens and account credentials in approved secret stores. Do not place them in repository files, public workflow logs, screenshots, browser bundles, or chat. Do not use live customer data for release or rollback smoke tests.
