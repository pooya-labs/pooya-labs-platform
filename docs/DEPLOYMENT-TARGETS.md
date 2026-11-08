# Independent deployment targets

The repository is the shared source of truth, but each host has its own build output, origin, and release mechanism. A deploy to one target must not rewrite the configuration of another.

## Target matrix

| Target | Purpose | Build output | Release mechanism | Current state |
|---|---|---|---|---|
| GitHub Pages | Public static portfolio | `dist/pages` | `.github/workflows/pages-platform.yml` | Existing host; build/deploy workflow |
| Cloudflare Pages | Independent public-host mirror | `dist/cloudflare` | Connected GitHub production deploy on `main`; optional Pages API workflow | Live; latest deployment `efa5ecb4`; main-branch auto-deploy enabled; previews disabled |
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

The latest verified production deployment is `efa5ecb4-356d-4112-be60-31401506d940`, created on 2026-11-08 from the exact main commit `a0bac438d377571d0a2c2a6a7c46bee8bd7cf746`. Cloudflare's deployment record reports successful `build` and `deploy` stages. Its unique deployment URL is [`https://efa5ecb4.pooya-labs-platform.pages.dev/`](https://efa5ecb4.pooya-labs-platform.pages.dev/); the canonical production alias is [`https://pooya-labs-platform.pages.dev/`](https://pooya-labs-platform.pages.dev/).

The Pages project is connected to GitHub repository `pooya-labs/pooya-labs-platform`. Production auto-deploy is enabled for branch `main`, with path filters `apps/platform/**` and `package.json`. Preview-branch deployments remain disabled. This is the active continuous-deployment path; new application changes on the watched paths do not depend on a GitHub Actions Cloudflare token.

The repository workflow `.github/workflows/deploy-cloudflare.yml` remains an optional explicit Pages API deployment path. It still validates the TypeScript/build/test targets and uses `CLOUDFLARE_API_TOKEN` when available; if that secret is absent, its explicit API deployment job is skipped, but the connected Cloudflare Git integration remains active. Keep all Cloudflare credentials out of the repository and chat.

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
