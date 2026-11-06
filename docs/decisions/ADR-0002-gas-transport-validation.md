# ADR-0002: Require real-browser evidence for GAS transport

- **Status:** Accepted (experiment record; superseded by the concrete hosting choice in ADR-0003)
- **Date:** 2026-11-05

## Context
The initial proposal assumed GitHub Pages could call a Google Apps Script web app using a POST with `Content-Type: text/plain`, avoiding a CORS preflight. Avoiding preflight does not grant browser permission to read a response. Google also documents a ContentService redirect to a one-time `script.googleusercontent.com` URL.

## Decision
Do not rely on external Pages-to-GAS browser transport unless a real browser can read the response and the authentication model is verified. Keep HtmlService + `google.script.run` as the proven candidate pending that experiment.

## Evidence
A real Chromium session launched by GitHub Actions opened the GitHub Pages harness and attempted the health-only POST against the deployed GAS `/exec` URL. Its Console reported a missing `Access-Control-Allow-Origin` header and Fetch failed with `TypeError: Failed to fetch`. The browser could not read an HTTP status or body. This does not prove whether `doPost` executed.

## Consequences
- The browser experiment has closed the external transport proof gate with a negative result.
- ADR-0003 chooses HtmlService as the primary runtime and GitHub Pages as static documentation/showcase hosting.
- Keep this record as the rationale for not shipping a CORS workaround.
