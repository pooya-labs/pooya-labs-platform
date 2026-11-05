# Phase 0 — Transport Spike: Owner Test Instructions

The repository contains a minimal GAS proof harness. It exposes only a public health check and stores no data or credentials.

## Create the Apps Script project
1. Open https://script.google.com/home and create a standalone project named `Pooya Labs Platform — Transport Proof`.
2. Replace `Code.gs` with the repository file `apps-script/Code.gs`.
3. Add an HTML file named `Index` and paste `apps-script/Index.html`.
4. Enable the appsscript.json manifest in Project Settings if needed; paste `apps-script/appsscript.json`.
5. Save, then choose Deploy → New deployment → Web app.
6. For this health-only test, choose Execute as Me. Choose access only if acceptable for your account and policy. The only exposed operation is a non-sensitive health check. Do not add real data or secrets.
7. Copy the /exec URL. Do not commit it to the public repository.

## Test HtmlService RPC
1. Open the /exec URL.
2. Click Run RPC health check.
3. Expected result: `ok: true` and `transport: "google.script.run"`.
4. Record browser, time, result, and console errors. This does not prove external CORS.

## Test external fetch
The file `tests/transport/external-fetch.html` must be served from a real HTTPS origin, not opened as file://.
1. Once the test harness is published on GitHub Pages, open its HTTPS URL.
2. Paste the /exec URL and click Test text/plain POST.
3. Record status, final URL, redirect flag, timing, content type, and response.
4. Inspect DevTools → Network and Console. Record OPTIONS/preflight, redirect chain, and CORS errors.
5. Repeat from the intended final origin if different.
6. curl success is not browser CORS proof.

## Report
Record HtmlService RPC pass/fail; external fetch pass/fail; browser and origin; preflight; redirect/final URL; response readability; and authentication constraints. Never share tokens or credentials.

Do not add admin, booking, spreadsheet, token, or customer-data endpoints to this proof. If external fetch fails, do not add JSONP or an unreviewed workaround; revisit the architecture.
