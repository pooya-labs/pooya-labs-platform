# Deployment Plan — HtmlService primary

No production deployment has been configured. The owner's current Apps Script deployment is a Phase 0 proof only.

## Hosting roles
1. **Google Apps Script HtmlService:** primary application host and browser runtime. The deployed `/exec` page serves `Index`; client-to-server calls use `google.script.run`.
2. **GitHub Pages:** public documentation, roadmap, changelog, static showcase, and isolated demos. Do not place admin tokens, customer data, or backend-dependent workflows here.
3. **Local development:** Vite/dev server and mocked adapters for UI iteration. A mock success is never presented as live backend success.

## Phase 0 evidence
- The owner confirmed a successful HtmlService RPC health check.
- A real Chromium test ran from the published GitHub Pages origin against the supplied GAS `/exec` URL.
- Chromium reported: `No 'Access-Control-Allow-Origin' header is present on the requested resource.`
- The browser returned `TypeError: Failed to fetch`; it could not read the HTTP status/body.
- This confirms the direct browser transport is blocked by CORS. It does **not** establish whether the Apps Script `doPost` function ran.
- Google documents that ContentService responses redirect to a one-time `script.googleusercontent.com` URL, and `google.script.run` is the supported asynchronous HtmlService-to-server mechanism.

## Sync the revised proof into the owner's Apps Script project
1. Copy `apps-script/Code.gs` from this repository into the Apps Script editor.
2. Copy `apps-script/Index.html` into the HTML file named `Index`.
3. Keep the V8 manifest settings from `apps-script/appsscript.json`.
4. Save and create a **new Web App deployment version**.
5. Open the deployed `/exec` page and run the RPC health check.
6. Confirm the response has `ok: true` and `data.transport: "google.script.run"`.

Do not build the production frontend around a cross-origin fetch from GitHub Pages. Deployment execute-as/access settings and the eventual admin authentication model must be decided before any sensitive feature is added.

## Release discipline
- Separate development and production Apps Script deployments and spreadsheets.
- Keep script IDs and spreadsheet IDs out of public source when they are sensitive.
- Store secrets in Script Properties; never commit them.
- Maintain rollback instructions and a tested backup/restore process.
