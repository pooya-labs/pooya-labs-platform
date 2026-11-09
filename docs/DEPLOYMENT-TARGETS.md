# Independent deployment targets

The repository is the shared source of truth, but each host has its own build output, origin, and release mechanism. A deploy to one target must not rewrite the configuration of another.

## Target matrix

| Target | Purpose | Build output | Release mechanism | Current state |
|---|---|---|---|---|
| GitHub Pages | Public static portfolio | `dist/pages` | `.github/workflows/pages-platform.yml` | Live; successful deployment run 42659840309, exact main SHA `e5ef6389`, artifact 13693239378 |
| Cloudflare Pages | Independent public-host mirror | `dist/cloudflare` | Authorized Cloudflare Pages API deployment; native Git push trigger not observed | Live; deployment `ed73cc8e`, exact main SHA `e5ef6389`, all five stages successful |
| Google Apps Script | HtmlService application/runtime | `dist/gas/index.html` plus `Code.gs` and manifest | `.github/workflows/deploy-gas.yml` using `clasp` | Build/artifact verified; automatic deployment is gated on private repository secrets |

## Latest verified production parity — 2026-11-09 16:58 UTC

- Current main: [`e5ef638917d3204025d062af939cf01a28689d3a`](https://github.com/pooya-labs/pooya-labs-platform/commit/e5ef638917d3204025d062af939cf01a28689d3a). Repository CI [42659840758](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840758) passed.
- GitHub Pages: workflow [42659840309](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840309) passed Build and Deploy on exact main `e5ef6389`; artifact `13693239378`; canonical host [https://pooya-labs.github.io/pooya-labs-platform/](https://pooya-labs.github.io/pooya-labs-platform/).
- Cloudflare Pages: deployment [`ed73cc8e`](https://ed73cc8e.pooya-labs-platform.pages.dev/) (ID `ed73cc8e-7fcb-42b7-8ca0-b6e591f9f160`) passed all five stages on the exact same main SHA `e5ef6389`; canonical alias [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/). Trigger was `ad_hoc` via authorized API.
- PR #43's light-theme contrast fix is live on both hosts. Live page and CSS requests each returned HTTP 200; both CSS assets contain `--pf-dim:#58675e` and no longer contain `#728076`. Ratios: 5.50:1, 5.08:1, 5.96:1 across three representative light surfaces.
- Browser QA [42659839780](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659839780) passed on exact main; artifact `13692549570`. Live robots/sitemap response bodies remain verified: HTTP 200, host-specific Sitemap pointers, valid sitemaps with 17 same-origin locations each.
- Native Git-push remains unverified: matching-path PR #39 did not produce a `github:push` Cloudflare deployment. GitHub Cloudflare workflow [42659840434](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840434) skipped the actual deployment because `CLOUDFLARE_API_TOKEN` is absent; no secret or settings changed.
- Apps Script run [42659840240](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840240) passed configuration checking but skipped publishing; no new production Web App version is verified.
- External social crawler/cache, manual accessibility, physical-device, owner content/media, Salon Booking privacy, and rollback gates remain open.

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

The latest verified production deployment is `ed73cc8e-7fcb-42b7-8ca0-b6e591f9f160`, published from exact main commit `e5ef638917d3204025d062af939cf01a28689d3a`. Cloudflare confirmed successful queue, initialize, clone, build, and deploy stages. Its unique deployment URL is [`https://ed73cc8e.pooya-labs-platform.pages.dev/`](https://ed73cc8e.pooya-labs-platform.pages.dev/); the canonical production alias is [`https://pooya-labs-platform.pages.dev/`](https://pooya-labs.pages.dev/).

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
