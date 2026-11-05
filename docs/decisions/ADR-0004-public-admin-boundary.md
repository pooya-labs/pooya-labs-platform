# ADR-0004: Separate the public app from privileged administration

- **Status:** Proposed — owner approval required before privileged features
- **Date:** 2026-11-05

## Context
The primary application now runs inside Google Apps Script HtmlService. A web app configured to execute as its deployer runs server code with the deployer's authority even when another person opens the app. Access permissions and execution identity are separate deployment settings. Google also documents that the active user's email may be unavailable in an execute-as-owner web app.

A visual admin button, client role value, request ID, temporary user key, or email string supplied by the browser is not an authorization boundary.

## Proposal
1. Keep the public-facing application deployment low privilege and expose only intentionally public read/submit operations after server-side validation.
2. Keep privileged administration in a separate Apps Script project/deployment restricted to the deploying owner (`MYSELF`) for the initial single-owner release.
3. Do not place privileged admin actions in the public app and rely on hidden UI controls.
4. If multiple administrators are needed later, evaluate a tested Google Workspace domain restriction or a separately reviewed identity provider. Do not assume `Session.getActiveUser().getEmail()` is populated in every web-app execution mode.
5. Keep separate data boundaries and server-side authorization checks even when the public and admin scripts are owned by the same Google account.

## Consequences
- The public application can be shared without granting visitors owner-level administrative actions.
- Admin UI, admin script, sensitive data, and privileged scopes can be limited to the owner.
- Cross-script communication, shared data access, and duplicated domain logic must be designed carefully; this ADR does not imply automatic authentication between the two deployments.
- No admin or private-data capability is authorized until the owner approves this proposal and the actual deployment access/execution settings are tested.

## Official references
- [Apps Script web apps: execution identity and access controls](https://developers.google.com/apps-script/guides/web)
- [Session: active user email availability](https://developers.google.com/apps-script/reference/base/session)
- [Web app manifest access and executeAs settings](https://developers.google.com/apps-script/manifest/web-app-api-executable)
