# Independent deployment targets

The repository is the shared source of truth, but each host has its own build output, origin, and release mechanism. A deploy to one target must not rewrite the configuration of another.

## Target matrix

| Target | Purpose | Build output | Release mechanism | Current state |
|---|---|---|---|---|
| GitHub Pages | Public static portfolio | `dist/pages` | `.github/workflows/pages-platform.yml` | Existing host; build/deploy workflow |
| Cloudflare Pages | Independent public-host mirror | `dist/cloudflare` | `.github/workflows/deploy-cloudflare.yml` → Pages API, or authorized direct Pages API deployment | Live; latest deployment `a1a69456`; Git push auto-deploy not yet verified |
| Google Apps Script | HtmlService application/runtime | `dist/gas/index.html` plus `Code.gs` and manifest | `.github/workflows/deploy-gas.yml` using `clasp` | Build/artifact verified; automatic deployment is gated on private repository secrets |

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

The latest verified production deployment is `a1a69456-fc5a-4ac3-917b-f5cb0cb909a5`, published from main commit `c7a86a2e2f54d157b7e0b806c9c022afd41fd208`. Cloudflare confirmed successful `build` and `deploy` stages. Its unique deployment URL is [`https://a1a69456.pooya-labs-platform.pages.dev/`](https://a1a69456.pooya-labs-platform.pages.dev/); the canonical production alias is [`https://pooya-labs-platform.pages.dev/`](https://pooya-labs-platform.pages.dev/).

The Pages project records GitHub as its source, with production branch `main`, `production_deployments_enabled=true`, and path filters `apps/platform/**` and `package.json`. Preview deployments remain disabled. However, the subsequent application push did **not** produce a new Cloudflare deployment automatically. The settings alone are not sufficient evidence that the GitHub push integration is operating; do not claim automatic deployment until a push-triggered production deployment is observed.

The repository workflow `.github/workflows/deploy-cloudflare.yml` is configured to build, test, request a Pages deployment for the exact commit, and wait for the deployment to succeed. Its latest run [42502717616](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717616) passed the credential-check job but skipped the deploy job because the repository secret `CLOUDFLARE_API_TOKEN` is absent. To enable this repeatable push-based path, create a Cloudflare API token with **Account → Cloudflare Pages → Edit**, then add it under **GitHub repository → Settings → Secrets and variables → Actions**. Set its name to `CLOUDFLARE_API_TOKEN`. Never commit or paste the token. After adding it, make a small application commit and verify that the workflow's build/deploy job completes instead of skipping.

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
