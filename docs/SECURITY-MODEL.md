# Security Model — Phase 0 baseline

**Status:** Initial threat model drafted; owner approved the public-app / owner-only-admin separation on 2026-11-05. Exact access and execution settings still require deployment verification.  
**Applies to:** HtmlService-hosted public application, Google Apps Script RPC, future Sheets/Drive data, and the separate static GitHub Pages showcase.

## Security objectives
1. Public visitors must never gain administrator capabilities by invoking client-visible functions directly.
2. The browser must never receive owner OAuth tokens, script properties, signing keys, or private spreadsheet contents.
3. Only explicitly allowlisted RPC actions may run.
4. Every mutation must be validated, authorized, rate-limited, idempotent where appropriate, and auditable before it is enabled.
5. The platform must fail closed when identity or authorization cannot be established.

## Assets and trust boundaries

| Asset | Classification | Main boundary |
|---|---|---|
| Public project pages, docs, public app manifests | Public | GitHub Pages / browser |
| Apps Script source and deployment configuration | Internal | GitHub repo / Apps Script editor |
| Spreadsheet IDs, script IDs, internal configuration | Internal | Script Properties / deployment configuration |
| User inquiries, booking details, email addresses | Private | GAS server / restricted Sheets |
| Admin credentials, OAuth tokens, HMAC keys, API secrets | Restricted | Server-side Script Properties only |
| Admin workflows and privileged records | Restricted | Owner-only administrative runtime |

Trust boundaries:
- Browser UI ↔ HtmlService RPC.
- Public application deployment ↔ owner-authorized Apps Script services.
- Apps Script ↔ Sheets/Drive.
- GitHub Pages ↔ anonymous visitors; this origin has no approved privileged backend channel.
- Third-party mini-app iframe ↔ platform shell, using a separately validated message protocol.
- GitHub Actions ↔ public repository content and test artifacts.

## Threat scenarios and baseline controls

| Threat | Baseline control before feature release |
|---|---|
| Visitor calls a public server function directly | Assume every public top-level RPC function can be invoked by a visitor; expose one action router, allowlist actions, and keep helpers private with trailing underscore names. |
| Client changes action, IDs, amounts, dates, or status | Revalidate every field on the server; never trust UI state or client-supplied role/identity. |
| Admin function accidentally becomes public | Keep admin operations out of the public Apps Script project. Use a separate owner-only administrative project/deployment or a separately reviewed identity design. |
| Identity is blank or spoofed | Never use a supplied email, request ID, temporary key, or browser fingerprint as proof of identity. Fail closed if a required identity claim is unavailable. |
| Replay or duplicate mutation | Require idempotency keys and durable deduplication records; define retention and recovery semantics before writes are enabled. |
| Burst traffic exhausts Apps Script quotas | Apply bounded request sizes, per-action limits, lock timeouts, batching, and observable quota failure handling. Do not rely on CacheService as the only rate-limit or deduplication store. |
| Stored/reflected XSS | Escape output, avoid unsafe `innerHTML`, sanitize user-authored Markdown, and validate iframe messages. |
| Spreadsheet formula injection | Treat user values as text; neutralize formula-leading input before storing or exporting it. |
| Secrets or personal data leak through GitHub/CI | Keep secrets and customer payloads out of source, Pages, logs, test fixtures, and artifacts. Redact deployment identifiers from diagnostic artifacts. |
| Cross-origin request abuse | Do not expose a Pages-to-GAS fetch API. Use the HtmlService runtime and avoid JSONP for protected data or writes. |

## Authentication and deployment baseline

Google Apps Script web apps can run as the deploying user or as the user accessing the app. Access settings separately determine who may open a deployment. When a web app executes as its owner, server code runs with the owner's authority for every visitor who is allowed to access it. Google also documents that `Session.getActiveUser().getEmail()` may be blank in an execute-as-owner web app context.

Therefore:
- Do not treat `Session.getActiveUser().getEmail()` as a universal identity provider.
- Do not assume that "the page loaded" means the visitor is an administrator.
- Do not expose admin functions in the public app and merely hide their buttons in the UI.
- Default direction for an owner-operated admin console: a separate Apps Script project/deployment restricted to the deploying owner (`MYSELF`) or an explicitly tested Workspace access policy.
- The public app, if anonymous access is eventually required, must contain only low-privilege public actions and must validate every write on the server.
- The exact public deployment access mode, execute-as mode, OAuth scopes, and owner admin workflow must be reviewed in a separate deployment checklist before production.

## Phase 0 RPC constraints
The current canonical `rpcCall(request)` exposes only `health.check`. This is a proof endpoint, not a production authentication system. The temporary `rpcHealth()` compatibility wrapper must be removed after the owner updates the deployment. No data mutation or privileged operation is enabled.

## Owner-approved boundary
- Public application and privileged administration are separate deployments/projects.
- The initial admin deployment is restricted to the deploying owner (`MYSELF`).
- The public project exposes no privileged admin actions. The current public RPC still permits only `health.check`.
- This approval does not authorize storing private data or exposing protected operations until their validation, authorization, retention, and backup controls are implemented and tested.

## Open decisions before protected features
- Whether the public app needs anonymous visitors or Google-account sign-in.
- Whether admin access can be owner-only, or needs multiple administrators.
- Exact separation between public intake records and admin-only records.
- Abuse/rate-limit storage and retention strategy.
- Data retention, export, correction, and deletion procedures.
- Spreadsheet backup/restore and access review cadence.
- Whether a non-GAS backend is acceptable if external authenticated clients become mandatory.

## Official platform references
- [Apps Script web app execution and access settings](https://developers.google.com/apps-script/guides/web)
- [Apps Script web app manifest access and executeAs values](https://developers.google.com/apps-script/manifest/web-app-api-executable)
- [Session.getActiveUser and email availability](https://developers.google.com/apps-script/reference/base/session)
- [HTML Service communication and google.script.run behavior](https://developers.google.com/apps-script/guides/html/communication)
