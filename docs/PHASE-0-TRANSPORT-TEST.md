# Phase 0 — Transport Validation Record

This file records the deployed proof and browser experiment. The external fetch path is not part of the approved application architecture.

## HtmlService RPC result
The owner deployed the minimal Apps Script web app and reported a successful response from the HtmlService page:
- `ok: true`
- `data.transport: "google.script.run"`
- a server-generated timestamp

This proves the basic HtmlService-to-server RPC path for the health action.

## External browser result
A GitHub Actions job launched real Chromium, opened the published GitHub Pages harness, and submitted the health-only `text/plain` POST to the owner-provided Apps Script `/exec` URL.

Observed result:
- Fetch rejected with `TypeError: Failed to fetch`.
- Chromium Console reported: `No 'Access-Control-Allow-Origin' header is present on the requested resource.`
- The browser could not read the HTTP status or response body.
- The browser job ran under GitHub Actions run [42026786711](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42026786711).
- This is evidence of a CORS restriction for the direct Pages-to-GAS browser request. It is not evidence that the Apps Script service is down or that `doPost` definitely did not execute.

## Architecture consequence
- Use Apps Script HtmlService as the primary UI host.
- Use `google.script.run` for browser-to-server RPC.
- Keep GitHub Pages for documentation, public showcase content, and standalone demos that do not need GAS.
- Do not use `mode: "no-cors"`: it gives JavaScript an opaque response that cannot be inspected.
- Do not use JSONP for protected data or mutations. Google's guidance limits JSONP to read-only, non-sensitive data.
- Do not add an unreviewed third-party proxy as a CORS workaround.

## Repeatability
The diagnostic runner is available via the manual GitHub Actions workflow `External GAS Browser Transport Diagnostic`. Its report redacts the Apps Script deployment identifier and is uploaded as a short-lived artifact.

## Owner deployment sync
The updated canonical source lives in `apps-script/Code.gs` and `apps-script/Index.html`. After copying those into the existing Apps Script project, create a new Web App deployment version and rerun the HtmlService health check.
