# Independent deployment targets

The repository is the shared source of truth, but each host has its own build output, origin, and release mechanism. A deploy to one target must not rewrite the configuration of another.

## Target matrix

| Target | Purpose | Build output | Release mechanism | Current state |
|---|---|---|---|---|
| GitHub Pages | Public static portfolio | `dist/pages` | `.github/workflows/pages-platform.yml` | Live; run 43221461285, application source SHA `64c5966cba21a2d25d8f357b351593cbe51f26b2`, artifact 13944694071 |
| Cloudflare Pages | Independent public-host mirror | `dist/cloudflare` | Connected Cloudflare Pages API; native Git push trigger not observed | Live; Production deployment `975b9e6d-8004-447a-9bfe-898c746036a9`, exact main SHA `64c5966cba21a2d25d8f357b351593cbe51f26b2`, all five stages successful |
| Google Apps Script | Optional HtmlService application/runtime | `dist/gas/index.html` plus `Code.gs` and manifest | `.github/workflows/deploy-gas.yml` using `clasp` | Build covered by CI; production publish skipped on run 43221461361 because `CLASPRC_JSON`, `CLASP_JSON` and `GAS_DEPLOYMENT_ID` are not configured; not required for the static Pages portfolio |

## Latest verified production parity — 2026-11-12 (after PR #75)

- Exact main application SHA: [`64c5966cba21a2d25d8f357b351593cbe51f26b2`](https://github.com/pooya-labs/pooya-labs-platform/commit/64c5966cba21a2d25d8f357b351593cbe51f26b2). PR #75 added a semantic group role to the named skill-chip collections; the PR head and merged main tree are identical.
- Main Repository CI [43221461282](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461282) and Browser QA [43221461301](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461301) passed. Browser evidence: 18/18 routes, 36/36 viewport checks, 18/18 keyboard skip links, 12/12 gallery gutter swipes, 34/34 crawler checks, zero confirmed Axe violations, zero ARIA-prohibited-attribute incompletes and 36 contrast-only incompletes per theme.
- GitHub Pages [run 43221461285](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461285) deployed artifact `13944694071` from this SHA. Public URL: [https://pooya-labs.github.io/pooya-labs-platform/](https://pooya-labs.github.io/pooya-labs-platform/).
- Cloudflare Pages Production deployment [`975b9e6d`](https://975b9e6d.pooya-labs-platform.pages.dev/) (ID `975b9e6d-8004-447a-9bfe-898c746036a9`) completed queue, initialize, clone, build and deploy from the same SHA through the connected Cloudflare API. Current canonical URL: [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/).
- GitHub's Cloudflare workflow [43221461407](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461407) skipped its deploy job because `CLOUDFLARE_API_TOKEN` is absent; the direct authenticated API deployment succeeded. This does not prove native `github:push` automation.
- Apps Script publish job [43221461361](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461361) was skipped because its private clasp secrets are not configured; the current static portfolio does not depend on Apps Script.
- The platform remains pre-alpha; Phase 7 human/owner acceptance, Phase 9 complete integration and Phase 10 V1 release gates remain open.

## Previous production parity checkpoint — before PR #75 (superseded)


- The final promoted application source is exact main commit [`b7d4d136d58e2121d6bd2bd11c03ff774431a2d7`](https://github.com/pooya-labs/pooya-labs-platform/commit/b7d4d136d58e2121d6bd2bd11c03ff774431a2d7).
- PR [#71](https://github.com/pooya-labs/pooya-labs-platform/pull/71) promoted the owner-declared-complete redesign; PR [#72](https://github.com/pooya-labs/pooya-labs-platform/pull/72) applied the post-merge light-theme toggle-label contrast correction.
- Repository CI [43215080520](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080520) and Browser QA [43215080506](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080506) passed on the exact main SHA.
- Browser QA passed 18/18 routes, 36/36 desktop/mobile viewports, 18/18 keyboard skip-link checks, 34/34 social crawler checks, and reported zero confirmed Axe violations in either theme. Forty incomplete contrast checks per theme remain for manual review; this is not WCAG certification.
- GitHub Pages [run 43215080845](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080845) deployed artifact `13941954722` from this SHA. Public URL: [https://pooya-labs.github.io/pooya-labs-platform/](https://pooya-labs.github.io/pooya-labs-platform/).
- Cloudflare Pages Production deployment [`b7ed72f1`](https://b7ed72f1.pooya-labs-platform.pages.dev/) (ID `b7ed72f1-7507-4598-9e61-9f5745997751`) completed queue, initialize, clone, build and deploy successfully from the same SHA. Canonical project domain: [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/). Trigger type was `ad_hoc` through the connected Cloudflare API.
- GitHub's Cloudflare workflow [43215080554](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080554) skipped its actual deploy job because `CLOUDFLARE_API_TOKEN` is absent. The direct connected Cloudflare API deployment above succeeded; this does not prove native `github:push` automation. Add the GitHub secret only if automatic workflow deployment is required.
- Apps Script workflow [43215080602](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080602) skipped the actual publish job because its three private deployment secrets are not configured. The current public site is static and does not depend on Apps Script.
- V1 remains blocked by Phase 7 human/owner acceptance, Phase 9 project integration and Phase 10 release gates.

## Historical production parity checkpoint — 2026-11-09 17:16 UTC (superseded)

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

The latest verified Production deployment is `b7ed72f1-7507-4598-9e61-9f5745997751`, published from exact main commit `b7d4d136d58e2121d6bd2bd11c03ff774431a2d7`. Cloudflare confirmed successful queue, initialize, clone, build, and deploy stages. Its unique deployment URL is [`https://b7ed72f1.pooya-labs-platform.pages.dev/`](https://b7ed72f1.pooya-labs-platform.pages.dev/); the canonical production alias is [`https://pooya-labs-platform.pages.dev/`](https://pooya-labs-platform.pages.dev/).

The Pages project records GitHub as its source, with production branch `main`, `production_deployments_enabled=true`, and path filters `apps/platform/**` and `package.json`. Preview deployments remain disabled. After a matching-path push to main via PR #39, no Cloudflare deployment with `deployment_trigger.type=github:push` appeared; the latest deploy was instead requested through the Pages API as `ad_hoc`. The native Git integration is therefore not operationally verified in this checkpoint. Do not rely on automatic Git deployment until a real `github:push` deployment is observed.

The repository workflow `.github/workflows/deploy-cloudflare.yml` is configured to build, test, request a Pages deployment for the exact commit, and wait for the deployment to succeed. Its current run [43215080554](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080554) passed the credential-check job but skipped the deploy job because the repository secret `CLOUDFLARE_API_TOKEN` is absent. For this release, the exact SHA was instead deployed successfully through the authenticated Cloudflare connector API as deployment `b7ed72f1-7507-4598-9e61-9f5745997751`. To enable this repeatable push-based path, create a Cloudflare API token with **Account → Cloudflare Pages → Edit**, then add it under **GitHub repository → Settings → Secrets and variables → Actions**. Set its name to `CLOUDFLARE_API_TOKEN`. Never commit or paste the token. After adding it, make a small application commit and verify that the workflow's build/deploy job completes instead of skipping.

Until that secret is configured and a push-triggered run is verified, publish Cloudflare releases explicitly through the authorized connected Cloudflare Pages API using the exact, CI-verified main commit. The current deployment used that path and succeeded; it is not proof of native Git auto-deployment.

## Google Apps Script

- Build command: `npm run build:gas`
- Build output: `dist/gas/index.html`
- Deployment payload is assembled into `dist/gas-deploy/`:
  - `Index.html`: generated single-file UI bundle
  - `Code.gs`: allowlisted HtmlService RPC entry point
  - `appsscript.json`: V8 manifest
- The deployment workflow installs `@google/clasp`, pushes this isolated directory, then updates the existing Web App deployment ID.

The workflow is intentionally fail-safe and skips the deploy job until all three repository Actions secrets exist. The latest attempt, run [43215080602](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080602), skipped the actual publish job because these values are not configured. Apps Script publishing is optional for the static GitHub Pages/Cloudflare portfolio:

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
