# ADR-0002: Treat GAS external transport as unproven until browser validation

- **Status:** Accepted
- **Date:** 2026-11-05

## Context
The proposed design assumes that GitHub Pages can call a Google Apps Script web app using a POST with `Content-Type: text/plain`, avoiding preflight. Apps Script ContentService documents a redirect to a one-time `script.googleusercontent.com` URL. Avoiding a preflight does not itself grant CORS permission, and the final redirect response must also be readable by the browser.

## Decision
Keep two explicit transport adapters in the architecture, but do not promise production support for external GitHub Pages-to-GAS calls until a real browser integration test succeeds. HtmlService + `google.script.run` is the initial candidate for the integrated runtime. GitHub Pages remains a candidate static presentation host, demo host, or external client depending on the test outcome.

## Consequences
- Phase 0 includes a minimal deployed GAS transport spike.
- Test both `text/plain` and JSON request content types, record preflight and redirect behavior, and inspect browser console/network results.
- No secrets may be embedded in GitHub Pages assets.
- If external authenticated transport is blocked or fragile, the product must not rely on a CORS workaround that cannot be verified. Prefer HtmlService-hosted app runtime or a different explicitly approved architecture.
- This decision may be revisited only with recorded browser evidence.
