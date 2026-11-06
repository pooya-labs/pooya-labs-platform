# Independent deployment targets

The repository is the shared source of truth, but each host has its own build output, origin, and release mechanism. A deploy to one target must not rewrite the configuration of another.

## Target matrix

| Target | Purpose | Build output | Release mechanism | Current state |
|---|---|---|---|---|
| GitHub Pages | Public static portfolio | `dist/pages` | `.github/workflows/pages-platform.yml` | Existing host; build/deploy workflow |
| Cloudflare Pages | Independent public-host mirror | `dist/cloudflare` | `.github/workflows/deploy-cloudflare.yml` → Pages API, production branch `main` | Production site deployed; next automatic push waits for the Pages API token |
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

The first production deployment completed successfully on 2026-11-06 from commit `6bd645896c5a51cccf1f764c210896d652191d4e`. The latest verified production deployment is `7b544ac0-4d76-451f-aa97-bb1f34515509`, published from main commit `6661532b7061cb3ccff8bbe58dabb25708bb4389`. Cloudflare's deployment record reports all 83 files present and the latest stage `deploy` as `success`. The GitHub repository remains recorded as the source, but native Git push deployments are disabled. A push probe did not create a new deployment even after the API configuration showed production deployments enabled, so native integration is not treated as verified. `.github/workflows/deploy-cloudflare.yml` is the single authoritative release path: it validates the build and tests, sends the exact pushed commit to the Pages deployment API, then waits for its production stage to report success.

The workflow is intentionally gated until the repository Actions secret `CLOUDFLARE_API_TOKEN` is configured. Create a Cloudflare API token with **Account → Cloudflare Pages → Edit**, then add it under **GitHub repository → Settings → Secrets and variables → Actions**. Never commit the token or paste it into chat. The first deployment above was triggered through the Cloudflare account connector; the workflow becomes the repeatable push-based path once the secret exists.

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
