# Independent deployment targets

The repository is the shared source of truth, but each host has its own build output, origin, and release mechanism. A deploy to one target must not rewrite the configuration of another.

## Target matrix

| Target | Purpose | Build output | Release mechanism | Current state |
|---|---|---|---|---|
| GitHub Pages | Public static portfolio | `dist/pages` | `.github/workflows/pages-platform.yml` | Live; successful deployment run 42659840309, application source SHA `e5ef6389`, artifact 13693239378 |
| Cloudflare Pages | Independent public-host mirror | `dist/cloudflare` | Authorized Cloudflare Pages API deployment; native Git push trigger not observed | Live; deployment `ed73cc8e`, exact main SHA `e5ef6389`, all five stages successful |
| Google Apps Script | HtmlService application/runtime | `dist/gas/index.html` plus `Code.gs` and manifest | `.github/workflows/deploy-gas.yml` using `clasp` | Build/artifact verified; automatic deployment is gated on private repository secrets |

## Latest verified production parity — 2026-11-09 17:16 UTC

- Repository main is documentation-only commit [`d4402211cc6fcca59f143018574bd3cd9cf64aab`](https://github.com/pooya-labs/pooya-labs-platform/commit/d4402211cc6fcca59f143018574bd3cd9cf64aab). PR #44 exact-head CI [42661281955](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42661281955), Browser QA [42661281908](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42661281908), and post-merge main CI [42661735358](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42661735358) passed.
- Current published application source on both static hosts remains `e5ef6389`; PR #44 changed documentation only.
- GitHub Pages: [42659840309](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840309) deployed artifact `13693239378` from app source `e5ef6389`.
- Cloudflare Pages: deployment [`ed73cc8e`](https://ed73cc8e.pooya-labs-platform.pages.dev/) (ID `ed73cc8e-7fcb-42b7-8ca0-b6e591f9f160`) completed all five stages from app source `e5ef6389`; canonical alias [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/). API trigger was `ad_hoc` because native Git-push remains unverified.
- Bot User-Agent validation: all 17 routes on both hosts passed under `LinkedInBot/1.0` and all 17 passed under `facebookexternalhit/1.1`; 34 route/host checks per User-Agent, zero failures. Every route had OG title/description, correct canonical and matching `og:url`; all same-origin PNGs returned HTTP 200 and decoded to 1200×627. Authenticated share-debugger/cache refresh remains open.
- Live `robots.txt` and `sitemap.xml` response bodies remain verified on both hosts: four HTTP 200 endpoints, correct same-host Sitemap pointers, valid sitemaps with 17 same-origin URLs each.
- Light-theme contrast remains fixed and live on both hosts; full manual contrast and assistive-technology review remain open.
- Apps Script publish, native Cloudflare Git integration, owner content/privacy approval and rollback rehearsal remain open.

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

The latest verified production deployment is `ed73cc8e-7fcb-42b7-8ca0-b6e591f9f160`, published from exact main commit `e5ef638917d3204025d062af939cf01a28689d3a`. Cloudflare confirmed successful queue, initialize, clone, build, and deploy stages. Its unique deployment URL is [`https://ed73cc8e.pooya-labs-platform.pages.dev/`](https://ed73cc8e.pooya-labs-platform.pages.dev/); the canonical production alias is [`https://pooya-labs-platform.pages.dev/`](https://pooya-labs-platform.pages.dev/).

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
