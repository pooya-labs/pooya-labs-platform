# Changelog

## 2026-11-05 — Owner verified revised GAS RPC and Phase 0 runbooks
- Owner deployed the updated HtmlService page and confirmed `rpcCall` returned `ok: true`, `transport: google.script.run`, `error: null`, and a correlated `requestId`.
- Closed owner-side P0-04 deployment sync verification.
- Added provisional performance budgets, deployment rollback/backup/restore runbook, and proposed public/admin deployment boundary.
- Latest repository CI passed 9/9 tests: [42031242334](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42031242334).
- Latest GitHub Pages deployment succeeded: [42031242859](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42031242859).
- Moved the optional browser diagnostic deployment URL to the `GAS_WEB_APP_URL` Actions secret; the diagnostic workflow is manual-only.


## 2026-11-05 — Security and data handling baseline
- Added a Phase 0 threat model and data-classification policy.
- Recorded why execute-as-owner deployments must not use `Session.getActiveUser().getEmail()` as a universal identity check.
- Set a provisional direction to keep privileged admin functions out of the public Apps Script project; final deployment/access design remains open.


## 2026-11-05 — HtmlService-first architecture decision
- Ran the external health-only POST from real Chromium against the published GitHub Pages origin.
- Confirmed the browser console error: `No 'Access-Control-Allow-Origin' header is present on the requested resource.`
- Recorded that the browser could not read an HTTP status or response body; handler execution is not inferred from this CORS failure.
- Added ADR-0003: Apps Script HtmlService is the primary application runtime; GitHub Pages is static documentation/showcase hosting.
- Replaced the canonical ContentService POST source with an allowlisted `google.script.run` RPC dispatcher; retained `rpcHealth()` temporarily for migration compatibility.
- Added a redacted Playwright diagnostic workflow and browser artifact report. Repeat run [42028842302](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42028842302) classified the result as `blocked_by_cors` and completed successfully as a diagnostic.

## 2026-11-05 — Repository-side transport test automation
- Added dependency-free Node.js contract tests for the external transport harness.
- Added `npm test`, `npm run test:transport`, and a separate browser diagnostic script.
- Added GitHub Actions CI for pushes and pull requests to `main`.
- Added four HtmlService RPC source-contract checks; latest repository CI run passed all 9 tests: [42028621321](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42028621321).

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
