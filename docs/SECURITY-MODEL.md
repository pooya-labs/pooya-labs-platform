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

## Repository and public-build credential scanning — 2026-11-08

A preventive, dependency-free scanner now runs in Repository CI after the Pages and Cloudflare bundles are built.

- Implementation: `scripts/secret-scan.mjs`; command: `npm run security:secrets`.
- CI scans UTF-8 text in all tracked files and the generated `dist/pages` and `dist/cloudflare` trees. It flags common private-key blocks, selected provider token formats (AWS access-key IDs, GitHub tokens, Google API keys, Slack tokens, Stripe live keys), long quoted credential assignments, and credential-bearing filenames such as `.env`, `.clasp.json`, private-key files, and service-account JSON.
- CI output contains only the file path, line number, and rule name. It never prints matched credential values.
- Repository CI [42519574691](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519574691) passed on main after PR #16: dependency audit reported **0 vulnerabilities**, both public builds completed, the credential scan reported **no recognized matches**, and the contract suite passed **105/105 tests**.
- Contract tests cover positive provider-pattern detection, quoted secret assignments, placeholder exclusions, sensitive filenames, and ordinary link/commit-ID false positives.

**Limitations:** this is a high-confidence pattern scanner, not an exhaustive DLP tool. It does not inspect binary file contents, scan the full Git history, detect every unknown/custom token format, or rotate credentials. It must not be treated as proof that every secret is absent. Continue using private secret stores, review any alert, and manually inspect public/private asset boundaries and deployment permissions before release.

## GitHub repository and Actions permissions — current checkpoint (2026-11-10)

The current configuration and evidence are recorded in [GITHUB-REPOSITORY-GOVERNANCE.md](GITHUB-REPOSITORY-GOVERNANCE.md).

- The active repository ruleset **Protect main — PR + CI** (ID `26861856`) targets only `refs/heads/main`. It requires a pull request and strict success of both required contexts: `Typecheck, three-target build, and contract tests` and `Chromium responsive and keyboard smoke`. Branch deletion and non-fast-forward updates are blocked; the bypass-actor list is empty.
- GitHub reports `main` as protected by the active ruleset. The classic branch-protection endpoint can still report `protection.enabled: false` because protection is implemented through a repository ruleset; do not describe the branch as unprotected.
- The normal PR/check/merge path has been exercised. PRs #48 and #49 passed both required checks on their exact heads and merged normally. PR #49 checks: Repository CI [42724719359](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42724719359) and Browser QA [42724718975](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42724718975), exact PR head `31cc1ed`. The negative path (a deliberately pending/failed check blocks merge) has not been tested; do not create a failing PR solely to test it.
- All eleven workflow files have been reviewed for explicit least-privilege token scopes and sensitive triggers. Validation/capture jobs use read-only default tokens; GitHub Pages has deployment-only scopes. The three reviewed-capture publishers no longer push directly to `main`: they use a single-repository GitHub App token to create reviewable PRs. The dedicated App installation is limited to `pooya-labs/pooya-labs-platform`; its marker-only permission smoke PR [#34](https://github.com/pooya-labs/pooya-labs-platform/pull/34) passed both required checks and merged as `42d12a1`.
- The App's real changed-image PR path remains unexercised because approved capture destinations already matched the committed assets. Do not fabricate screenshot differences to force a test. Exercise that path only when a genuine owner-approved capture changes.
- The pattern-based credential scanner has documented limits: it does not inspect binary image contents or the full Git history and is not exhaustive. Manual public/private asset review remains open; the Salon Booking owner's separate permission for public case-study use is still required.
- This documentation correction does not change repository settings, GitHub App permissions, secrets, or production deployment configuration.

## Preliminary public-asset and external-link audit — 2026-11-10

A read-only source-tree and reference audit was performed as preparation for the manual public/private asset-boundary review.

- The tracked repository tree contains no filename matches for the reviewed sensitive patterns (`.env`, `.clasp.json`, `.clasprc.json`, private-key/certificate/keystore files, credential/service-account JSON, or Terraform state). This is a filename check, not a binary-content or Git-history scan.
- The project registry contains 17 repository/preview/case-study destinations; all 17 use HTTPS. All 16 external anchors in `PortfolioHome.tsx` that set `target="_blank"` also set a `rel` attribute.
- The public Novels tree currently contains an empty `catalog.json` plus `.gitkeep` placeholders only; there are no public manuscript or cover files.
- The public Salon Booking capture directory contains only two full-page PNGs (desktop/mobile). The approved capture manifest records the customer-facing booking page only, with no admin route or customer records, and marks the assets visually/privacy reviewed. The salon owner's separate permission for portfolio publication remains pending.
- The PNG payloads were not independently re-opened in this audit. The pattern-based scanner does not inspect binary image content. Do not mark the complete manual asset/privacy review as passed from these path and metadata checks alone.

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
