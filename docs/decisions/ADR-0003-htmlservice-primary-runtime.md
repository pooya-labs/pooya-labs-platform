# ADR-0003: Use HtmlService as the primary application runtime

- **Status:** Accepted
- **Date:** 2026-11-05

## Context
The platform initially considered serving the SPA from GitHub Pages and calling Google Apps Script through a cross-origin `fetch()` POST. The minimal Apps Script proof also tested HtmlService `google.script.run`.

The owner confirmed that the HtmlService health call succeeded. A real Chromium session launched in GitHub Actions opened the published Pages harness and submitted the health-only POST to the deployed GAS `/exec` URL. Chromium logged:

```text
Access to fetch ... from origin 'https://pooya-labs.github.io'
has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

Fetch rejected with `TypeError: Failed to fetch`; the browser could not expose an HTTP status or response body. This is evidence that the browser cannot read the direct cross-origin response. It does not independently prove whether Apps Script executed `doPost`.

Google documents that ContentService output is redirected to a one-time `script.googleusercontent.com` URL. The real-browser evidence, not an assumption about the redirect alone, is the basis for this decision.

## Decision
- Host the actual application UI in Google Apps Script HtmlService.
- Use `google.script.run` as the browser-to-server RPC mechanism.
- Keep GitHub Pages for public documentation, static showcase content, design previews, and isolated demos that do not need privileged GAS calls.
- Do not ship direct GitHub Pages → GAS ContentService fetch as an application dependency.
- Do not treat `no-cors`, JSONP, or an unreviewed proxy as a fix for authenticated/mutating RPC.
- If independent external clients become a hard requirement, evaluate a separate CORS-capable backend as a new architecture decision; this must not silently violate the no-Cloudflare/no-paid-service constraints.

## Consequences
- The primary frontend is served from the GAS Web App `/exec` page.
- Client calls must use asynchronous success/failure handlers, request IDs, normalized errors, and bounded concurrency.
- Google documents `google.script.run` as asynchronous, with up to 10 concurrent calls; ordering is not guaranteed.
- GitHub Pages can still provide the public project homepage and showcase, but it cannot own authenticated application flows backed by this GAS deployment.
- The revised proof source removes the `doPost` ContentService endpoint and routes the allowlisted Phase 0 health action through `rpcCall(request)`.
- Existing project repositories remain independent and untouched until Phase 9.
