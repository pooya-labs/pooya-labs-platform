# Deployment Plan

No production deployment has been configured.

## Candidate targets
1. Google Apps Script HtmlService — candidate integrated hosting/runtime with `google.script.run`.
2. GitHub Pages — candidate static hosting, contingent on verified cross-origin backend transport.
3. Local development — Vite dev server with mocked adapters only for development; mocks must never be confused with live backend behavior.

## Phase 0 required proof
- Deploy a minimal GAS web app with a health action.
- Verify authenticated and unauthenticated access expectations.
- Verify HtmlService RPC from the served page.
- Verify external browser fetch from a real HTTPS origin.
- Record redirect chain, response headers, preflight behavior, browser console/network evidence, and failure modes.
- Confirm redeployment/versioning behavior and owner access.
- Do not publish secrets or production data.

## Release discipline
- Separate development and production Apps Script deployments and spreadsheets.
- Keep script IDs and spreadsheet IDs out of public source when they are sensitive.
- Store secrets in Script Properties; document setup without publishing values.
- Maintain rollback instructions and a tested backup/restore process.
