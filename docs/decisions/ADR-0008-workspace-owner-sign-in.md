# ADR-0008: Host-independent demo gate for the Workspace

- **Status:** Accepted — demo-only, not security
- **Date:** 2026-11-12

## Context

The owner requested a simple username/password screen before entering the Workspace, with no external service, database, or host-specific integration.

## Decision

1. Keep the portfolio public and show a login screen before the Workspace UI.
2. Verify the demo credentials in the client application.
3. Store only a session flag in sessionStorage for the current tab; clear it when returning to the portfolio.
4. Do not add Firebase, a database, Cloudflare Pages Functions, or another authentication backend.
5. Keep the password out of documentation and commit messages.

## Security boundary

This is a visual/demo gate, not authentication. The username and password are included in the publicly downloadable JavaScript bundle and can be discovered or bypassed. It must not protect confidential content, private files, personal information, or privileged actions. Any such future capability requires real server-side authorization independent of the frontend.

## Portability

Because the implementation uses only browser-side JavaScript and sessionStorage, the same UI behavior works on GitHub Pages, Cloudflare Pages, and static frontends served through Google Apps Script.
