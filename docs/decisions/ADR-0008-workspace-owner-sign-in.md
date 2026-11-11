# ADR-0008: Database-free owner sign-in for the Workspace

- **Status:** Accepted for Cloudflare Pages Preview; host configuration and owner verification pending
- **Date:** 2026-11-12

## Context

The public portfolio and the secondary Workspace share one static React application. The owner wants a simple username/password screen before entering Workspace, without introducing a database or publishing credentials in GitHub.

A purely client-side password check would be trivial to inspect or bypass because the application bundle is public. It would also expose the credential or its verifier to every visitor.

## Decision

1. Keep the public portfolio open; require a sign-in step only when the visitor opens Workspace.
2. Verify the submitted username and password in Cloudflare Pages Functions, using WORKSPACE_USERNAME and WORKSPACE_PASSWORD Preview Secret environment variables.
3. Never put credentials in GitHub, Vite build variables, HTML, or browser storage.
4. On successful sign-in, issue a seven-day HMAC-signed cookie with HttpOnly, Secure, SameSite=Lax, and a restricted /api/workspace path. Provide session-check and logout endpoints.
5. Do not add a database, KV, D1, or another persistence service. The session is self-contained and expires.
6. Treat this as a lightweight entry gate for the Workspace UI, not as protection for static frontend source/assets. Any future sensitive data or privileged operation must independently validate the session server-side.
7. The current implementation targets Cloudflare Pages. GitHub Pages and Apps Script must not be treated as protected until they have separately tested server-side authorization adapters.

## Consequences

- No database or account-management system is needed.
- Credentials remain in Cloudflare Preview secrets and are not committed to the repository.
- Preview environment secrets must be configured before sign-in can work; a fresh deployment is required after changing them.
- A seven-day session avoids repeated logins on the same browser; returning to the portfolio explicitly logs out.
- Static JavaScript remains downloadable. Do not embed secrets, private records, or privileged data in the SPA.

## Alternatives considered

- **Client-only password prompt:** rejected because the verifier and UI can be inspected or bypassed.
- **Database-backed accounts:** rejected as unnecessary for one owner and contrary to the no-database requirement.
- **Cloudflare Access:** not selected for this request because the owner asked for a branded username/password page integrated into the existing Workspace experience.
