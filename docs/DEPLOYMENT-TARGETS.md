# Independent deployment targets

The repository is the shared source of truth, but each host has its own build output, origin, and release mechanism. A deploy to one target must not rewrite the configuration of another.

## Target matrix

| Target | Purpose | Build output | Release mechanism | Current state |
|---|---|---|---|---|
| GitHub Pages | Public static portfolio | `dist/pages` | `.github/workflows/pages-platform.yml` | Live; successful deployment run 42651297113, exact main SHA `97094ed0`, artifact 13690386196 |
| Cloudflare Pages | Independent public-host mirror | `dist/cloudflare` | Authorized Cloudflare Pages API deployment; native Git push trigger not observed | Live; deployment `a075e139`, exact main SHA `97094ed0`, all five stages successful |
| Google Apps Script | HtmlService application/runtime | `dist/gas/index.html` plus `Code.gs` and manifest | `.github/workflows/deploy-gas.yml` using `clasp` | Build/artifact verified; automatic deployment is gated on private repository secrets |

## Latest verified production parity — 2026-11-09 16:12 UTC

- Current repository main: [`97094ed0cb79f65b0e93bf36d52a2520846e6f1b`](https://github.com/pooya-labs/pooya-labs-platform/commit/97094ed0cb79f65b0e93bf36d52a2520846e6f1b). Repository CI [42651297246](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297246) passed.
- GitHub Pages: workflow [42651297113](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297113) passed both Build and Deploy on exact main `97094ed0`; Pages artifact `13690386196`; canonical host [https://pooya-labs.github.io/pooya-labs-platform/](https://pooya-labs.github.io/pooya-labs-platform/).
- Cloudflare Pages: production deployment [`a075e139`](https://a075e139.pooya-labs-platform.pages.dev/) (ID `a075e139-20d1-4587-91a9-b73904499065`) passed queue, initialize, clone, build, and deploy on the exact same main commit `97094ed0`. Canonical alias: [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/).
- Matching-path native trigger test: PR [#39](https://github.com/pooya-labs/pooya-labs-platform/pull/39) merged an `apps/platform/vite.config.ts` change, which matches configured `apps/platform/**` filters. Cloudflare did not create a new `github:push` production deployment; it remained on prior deployment `76da3cc2`. The exact main commit was subsequently deployed via authorized Cloudflare API as `ad_hoc`. Do not claim native Git auto-deployment is operational.
- The separate GitHub Actions Cloudflare deployment workflow [42651297288](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297288) passed credential-check but skipped the production deploy job because `CLOUDFLARE_API_TOKEN` is absent. No secret or connection settings were changed.
- Browser QA [42651297251](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297251) passed 18/18 routes and 36/36 viewports, zero failures, zero confirmed Axe violations; artifact [13690630887](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297251/artifacts/13690630887). p75 LCP: 228 ms local, 284 ms Pages, 384 ms Cloudflare; p75 CLS 0.000 on all three.
- Vite's host-specific `robots.txt` and `sitemap.xml` outputs are verified in the build contract: 17 canonical URLs for each host and matching host-specific Sitemap URLs. Live public response bodies and external share-crawler/cache behavior remain pending. Rollback is documented but not rehearsed.

## GitHub Pages

- Build command: `npm run build:pages`
- Output: `dist/pages`
- Canonical origin: `https://pooya-labs.github.io`
- Site base: `/pooya-labs-platform/`
- Workflow: `.github/workflows/pages-platform.yml`

## Cloudflare Pages

- Project: `pooya-labs-platform`
- Production branch: `main`
- Build command: `npm run build:cloudflare`
- Output: `dist/cloudflare`
- Canonical origin: `https://pooya-labs-platform.pages.dev`
- Site base: `/`
- Hosting mode: static Pages assets; this deployment does not reuse or modify the unrelated `globalcart-catalog`, `orbit-runtime`, or `salon-booking` Workers.

The latest verified production deployment is `a075e139-20d1-4587-91a9-b73904499065`, published from exact main commit `97094ed0cb79f65b0e93bf36d52a2520846e6f1b`. Cloudflare confirmed successful queue, initialize, clone, build, and deploy stages. Its unique deployment URL is [`https://a075e139.pooya-labs-platform.pages.dev/`](https://a075e139.pooya-labs-platform.pages.dev/); the canonical production alias is [`https://pooya-labs-platform.pages.dev/`](https://pooya-labs-platform.pages.dev/).

The Pages project records GitHub as its source, with production branch `main`, `production_deployments_enabled=true`, and path filters `apps/platform/**` and `package.json`. Preview deployments remain disabled. After a matching-path push to main via PR #39, no Cloudflare deployment with `deployment_trigger.type=github:push` appeared; the latest deploy was instead requested through the Pages API as `ad_hoc`. The native Git integration is therefore not operationally verified in this checkpoint. Do not rely on automatic Git deployment until a real `github:push` deployment is observed.

The repository workflow `.github/workflows/deploy-cloudflare.yml` is configured to build, test, request a Pages deployment for the exact commit, and wait for the deployment to succeed. Its latest run [42651297288](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297288) passed the credential-check job but skipped the deploy job because the repository secret `CLOUDFLARE_API_TOKEN` is absent. To enable this repeatable push-based path, create a Cloudflare API token with **Account → Cloudflare Pages → Edit**, then add it under **GitHub repository → Settings → Secrets and variables → Actions**. Set its name to `CLOUDFLARE_API_TOKEN`. Never commit or paste the token. After adding it, make a small application commit and verify that the workflow's build/deploy job completes instead of skipping.

Until that secret is configured and a push-triggered run is verified, publish Cloudflare releases explicitly through the authorized Cloudflare Pages API using the exact, CI-verified main commit. The deployments above were performed this way; they are not proof of native Git auto-deployment.

## Google Apps Script

- Build command: `npm run build:gas`
- Build output: `dist/gas/index.html`
- Deployment payload is assembled into `dist/gas-deploy/`:
  - `Index.html`: generated single-file UI bundle
  - `Code.gs`: allowlisted HtmlService RPC entry point
  - `appsscript.json`: V8 manifest
- The deployment workflow installs `@google/clasp`, pushes this isolated directory, then updates the existing Web App deployment ID.

The workflow is intentionally fail-safe and skips the deploy job until all three repository Actions secrets exist:

1. `CLASPRC_JSON`: private OAuth credentials from the authorized `clasp login` session.
2. `CLASP_JSON`: private project mapping JSON containing the Apps Script `scriptId`. The workflow forces `rootDir` to `dist/gas-deploy`.
3. `GAS_DEPLOYMENT_ID`: existing Web App deployment ID to update in place.

Add these only under **GitHub repository → Settings → Secrets and variables → Actions**. Do not commit them, paste them into source files, or send them in chat. Apps Script API access must also be enabled for the account. The CI currently verifies the build and publishes the HtmlService bundle artifact, but a green build does not mean the GAS Web App has been deployed.

The current Apps Script source is a Phase 0 HtmlService/RPC proof with only `health.check` enabled. Do not describe it as a production backend or expose customer/admin operations until authorization, storage, and deployment acceptance have been implemented.

## Isolation rules

- Each Vite mode writes to a distinct output directory.
- Cloudflare's canonical URL and root base are selected only for the Cloudflare build.
- GitHub Pages keeps its existing project subpath and canonical origin.
- The GAS bundle is a single HTML file prepared for HtmlService; it does not depend on a cross-origin Pages-to-GAS fetch.
- No deployment credential, script ID, or deployment ID belongs in public repository content.
