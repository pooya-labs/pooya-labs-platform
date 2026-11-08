# Deployment Plan — independent Pages hosts and HtmlService proof

The public portfolio is deployed to GitHub Pages and mirrored on Cloudflare Pages. The latest verified Cloudflare production deployment is `a1a69456` from main commit `c7a86a2e`; it was published through the authorized Pages API. GitHub push-based Cloudflare deployment is configured but not yet verified: the repository Actions deploy job currently skips because `CLOUDFLARE_API_TOKEN` is missing. See [DEPLOYMENT-TARGETS.md](DEPLOYMENT-TARGETS.md) for the safe setup. The owner's Apps Script deployment remains a separate Phase 0 HtmlService/RPC proof, not a production backend.

## Hosting roles
1. **GitHub Pages:** existing public static portfolio host, with canonical subpath `/pooya-labs-platform/`.
2. **Cloudflare Pages:** independent static portfolio host with its own root-based build and canonical origin. It does not reuse the GitHub Pages base path.
3. **Google Apps Script HtmlService:** separate RPC/runtime proof. The deployed `/exec` page serves `Index`; client-to-server calls use `google.script.run`. The current implementation is Phase 0 only, not a production backend.
4. **Local development:** Vite/dev server and mocked adapters for UI iteration. A mock success is never presented as live backend success.

## Phase 0 evidence
- The owner confirmed a successful HtmlService RPC health check.
- A real Chromium test ran from the published GitHub Pages origin against the supplied GAS `/exec` URL.
- Chromium reported: `No 'Access-Control-Allow-Origin' header is present on the requested resource.`
- The browser returned `TypeError: Failed to fetch`; it could not read the HTTP status/body.
- This confirms the direct browser transport is blocked by CORS. It does **not** establish whether the Apps Script `doPost` function ran.
- Google documents that ContentService responses redirect to a one-time `script.googleusercontent.com` URL, and `google.script.run` is the supported asynchronous HtmlService-to-server mechanism.

## Sync the revised proof into the owner's Apps Script project
1. Run `npm run build:gas` from the repository root.
2. Copy `apps-script/Code.gs` into the matching Apps Script project file.
3. Copy the generated `dist/gas/index.html` into an Apps Script HTML file named `Index`.
4. Keep the V8 manifest settings from `apps-script/appsscript.json`.
5. Save and create/update the intended Web App deployment version.
6. Open the deployed `/exec` page and run the RPC health check.
7. Confirm the response has `ok: true` and `data.transport: "google.script.run"`.

Do not build the production frontend around a cross-origin fetch from GitHub Pages. Deployment execute-as/access settings and the eventual admin authentication model must be decided before any sensitive feature is added.

## Operational runbook

See [DEPLOYMENT-RUNBOOK.md](DEPLOYMENT-RUNBOOK.md) for the manual source-sync, rollback rehearsal, spreadsheet backup, and restore procedures. The procedures are documented but have not yet been rehearsed with a production data store.

## Release discipline
- Separate development and production Apps Script deployments and spreadsheets.
- Keep script IDs and spreadsheet IDs out of public source when they are sensitive.
- Store secrets in Script Properties; never commit them.
- Maintain rollback instructions and a tested backup/restore process.
