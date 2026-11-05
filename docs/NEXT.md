# Next Task — Phase 0

**Task ID:** P0-03  
**Title:** Diagnose the failed external GAS POST in browser DevTools  
**Status:** Waiting for owner-side Network and Console evidence

## Current evidence
- The owner deployed the Apps Script proof as Version 1.
- HtmlService `google.script.run.rpcHealth()` passed; the returned object had `ok: true` and `transport: "google.script.run"`.
- The GitHub Pages test harness loaded successfully.
- Its external `text/plain` POST returned `TypeError: NetworkError when attempting to fetch resource` after approximately 704 ms.
- The Apps Script Executions rows supplied by the owner showed `doGet` and `rpcHealth`, but no `doPost` row.
- This does not yet identify whether the request was blocked before reaching Apps Script, failed on a redirect, or reached another stage not represented in the supplied rows. Do not label the root cause yet.

## Owner action required
Use the same GitHub Pages test page and the same deployed `/exec` endpoint:

1. Open the test page.
2. Open browser Developer Tools with `F12`.
3. Select the **Network** tab. Clear the existing entries; enable **Preserve log** if available.
4. Return to the page and click **Test text/plain POST** once.
5. In Network, locate requests whose host is `script.google.com` or `script.googleusercontent.com`. Check both `POST` and any `OPTIONS` request.
6. Record the request method, status (or blocked/failed label), request URL host/path only (do not share the deployment ID), redirect/Location destination host, and whether a response body is readable.
7. Open the **Console** tab and copy the exact CORS/network error text.
8. Re-open Apps Script → Executions and check whether a `doPost` row appeared at that test time.

Share only the sanitized findings. Do not share the full `/exec` URL, cookies, tokens, or request credentials.

## Decision gate
- If the POST reaches `doPost` but the browser cannot read the redirected response, document the redirect/CORS behavior and choose the runtime architecture accordingly.
- If no POST reaches Apps Script, use Network evidence to identify whether the request is blocked by the browser, DNS/network, account access, or another upstream stage.
- Do not add JSONP, `no-cors`, or an unaudited proxy as a claimed fix. `no-cors` produces an opaque response that JavaScript cannot inspect.
- Keep HtmlService + `google.script.run` as the proven internal transport. Treat the external GitHub Pages → GAS transport as unproven until an actual browser response is readable.

## Acceptance criteria
- A sanitized Network/Console trace is recorded.
- The presence or absence of a `doPost` execution is checked after the test.
- ADR-0002, ARCHITECTURE.md, STATUS.md, project-state.json, NEXT.md, and CHANGELOG.md are updated based on the evidence.
- No previous-project repository is modified or imported.
