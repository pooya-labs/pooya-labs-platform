# Independent deployment targets

The repository is the shared source of truth, but each host has its own build output, origin, and release mechanism. A deploy to one target must not rewrite the configuration of another.

## Target matrix

| Target | Purpose | Build output | Release mechanism | Current state |
|---|---|---|---|---|
| GitHub Pages | Public static portfolio | `dist/pages` | `.github/workflows/pages-platform.yml` | Live; latest successful deployment run 42526088212, app SHA `558970f` |
| Cloudflare Pages | Independent public-host mirror | `dist/cloudflare` | Connected Git source via Cloudflare Pages API / authorized API deployment | Live; latest deployment `76da3cc2`, exact main SHA `15203f14`; native Git push trigger not yet verified |
| Google Apps Script | HtmlService application/runtime | `dist/gas/index.html` plus `Code.gs` and manifest | `.github/workflows/deploy-gas.yml` using `clasp` | Build/artifact verified; automatic deployment is gated on private repository secrets |

## Latest verified production parity — 2026-11-09 15:46 UTC

- Current repository main: `15203f14eab12b5c7258a97ecd1b1b4dadd61879`; post-merge Repository CI [42645102359](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42645102359) passed.
- GitHub Pages: workflow [42526088212](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088212) passed both Build and Deploy. It deployed artifact `13635093909` for application commit `558970fefad25fa16632a8d740eb1a7a32c8f3bd` to [the canonical Pages host](https://pooya-labs.github.io/pooya-labs-platform/).
- Cloudflare Pages: deployment [`76da3cc2`](https://76da3cc2.pooya-labs-platform.pages.dev/) (ID `76da3cc2-d231-444e-aaaa-d4d4be96f546`) passed queue, initialize, clone, build, and deploy on exact current main `15203f14`. Canonical alias: [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/).
- The GitHub compare between Pages app SHA `558970f` and current main `15203f14` lists only docs/workflow/test changes and no `apps/platform/**` or root package changes. The two hosts therefore serve the same app source tree despite different complete commit IDs.
- Cloudflare rendered HTML was checked for the homepage and Persian/English ORBIT routes. Canonicals and language alternates resolve on the Cloudflare canonical host; the language-specific title, description, locale, OG image URL, 1200×627 dimensions, and owner monogram were present.
- GitHub Actions Cloudflare deploy path still needs `CLOUDFLARE_API_TOKEN`; native Cloudflare Git-integration push trigger remains unproven. Do not conflate a direct API-triggered deployment with a Git push deployment.
- Current Cloudflare deployment manifest contains `robots.txt` and `sitemap.xml`, but their response bodies and external crawler/cache behavior are not yet verified. Rollback is documented, not rehearsed.

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

The latest verified production deployment is `76da3cc2-d231-444e-aaaa-d4d4be96f546`, published from current main commit `15203f14eab12b5c7258a97ecd1b1b4dadd61879`. Cloudflare confirmed successful queue, initialize, clone, build, and deploy stages. Its unique deployment URL is [`https://76da3cc2.pooya-labs-platform.pages.dev/`](https://76da3cc2.pooya-labs-platform.pages.dev/); the canonical production alias is [`https://pooya-labs-platform.pages.dev/`](https://pooya-labs-platform.pages.dev/).

The Pages project records GitHub as its source, with production branch `main`, `production_deployments_enabled=true`, and path filters `apps/platform/**` and `package.json`. Preview deployments remain disabled. The latest deployment in this checkpoint was explicitly triggered through the Cloudflare Pages API (`deployment_trigger.type=ad_hoc`) using the connected Git repository and exact main commit; it is not evidence of a native push trigger. Do not claim native Git auto-deployment until a production deployment with `deployment_trigger.type=github:push` is observed.

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
