# Changelog

## 2026-11-05 — HtmlService-first architecture decision
- Ran the external health-only POST from real Chromium against the published GitHub Pages origin.
- Confirmed the browser console error: `No 'Access-Control-Allow-Origin' header is present on the requested resource.`
- Recorded that the browser could not read an HTTP status or response body; handler execution is not inferred from this CORS failure.
- Added ADR-0003: Apps Script HtmlService is the primary application runtime; GitHub Pages is static documentation/showcase hosting.
- Replaced the canonical ContentService POST source with an allowlisted `google.script.run` RPC dispatcher; retained `rpcHealth()` temporarily for migration compatibility.
- Added a redacted manual Playwright diagnostic workflow and browser artifact report.

## 2026-11-05 — Repository-side transport test automation
- Added dependency-free Node.js contract tests for the external transport harness.
- Added `npm test`, `npm run test:transport`, and a separate browser diagnostic script.
- Added GitHub Actions CI for pushes and pull requests to `main`.
- Verified the repository CI test run passed: [42026786562](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42026786562).

## 2026-11-05 — Owner-side GAS transport test results
- Owner deployed the Apps Script proof as Version 1.
- Owner confirmed the HtmlService `google.script.run` health check passed with `ok: true`.
- The GitHub Pages external-fetch harness initially returned a browser NetworkError.
- Chromium later confirmed the missing CORS allow-origin header. Direct external browser fetch is not part of the selected architecture.

## 2026-11-05 — Phase 0 inventory and transport proof harness
- Inspected public README and repository metadata for eight existing projects in read-only mode.
- Recorded maturity, technology direction, potential reuse areas, and integration gates in `INTEGRATION-INVENTORY.md`.
- Added GAS feasibility notes based on official Google documentation.
- Added ADR-0002: external Pages-to-GAS transport must be proven in a real browser.
- Added a health-only Apps Script proof harness for HtmlService RPC and ContentService POST.
- Added owner-side deployment and browser test instructions.
- No previous project repository was modified and no source code was imported.

## 2026-11-05 — Repository initialization
- Established Pooya Labs Platform as a separate product repository.
- Added agent instructions, roadmap, status, next-task, recovery, architecture, API contract, and deployment documentation.
- Deferred all previous-project integrations to Phase 9 at the owner's request.
- No production backend deployment or prior-project source was imported.
