# Next Task — Phase 0

**Task ID:** P0-05  
**Title:** Review and approve the public/admin security boundary and Phase 0 release gates  
**Status:** Repository-side proposal prepared; owner approval required before privileged features

## Confirmed progress
- The owner copied the revised `Code.gs` and `Index.html` into the existing Apps Script project, deployed a new Web App version, and ran the revised page.
- The returned response included `ok: true`, `data.transport: "google.script.run"`, `error: null`, and a new `requestId`. This closes the owner-side portion of P0-04.
- Real Chromium reproduced the external Pages-to-GAS CORS restriction. HtmlService is the primary runtime; Pages is public/static only.
- Repository CI passes the current 9 contract tests.

## Proposed security boundary

See [ADR-0004](decisions/ADR-0004-public-admin-boundary.md). It is a proposal, not an owner-approved security decision.


- Public app: a deliberately limited HtmlService deployment. Never expose admin, secret-management, export, or privileged data operations in it.
- Admin app: separate Apps Script project/deployment with access restricted to the deploying owner (`MYSELF`) unless a tested Workspace multi-admin model is later approved.
- Do not use a hidden admin button, a client-side role flag, request IDs, temporary user keys, or `Session.getActiveUser().getEmail()` in an execute-as-owner public deployment as the authorization boundary.
- Keep private/restricted data out of public GitHub Pages and public app responses.
- No protected operation is enabled in the Phase 0 RPC.

## Owner approval needed
Review:
- [SECURITY-MODEL.md](SECURITY-MODEL.md)
- [DATA-CLASSIFICATION.md](DATA-CLASSIFICATION.md)
- [PERFORMANCE-BUDGETS.md](PERFORMANCE-BUDGETS.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
- [DEPLOYMENT-RUNBOOK.md](DEPLOYMENT-RUNBOOK.md)

Confirm the direction before any admin, private-data, or mutation endpoint is implemented.

## Remaining Phase 0 verification
1. Measure first-load and interaction performance on the target desktop and mobile devices against [PERFORMANCE-BUDGETS.md](PERFORMANCE-BUDGETS.md).
2. Run the documented deployment rollback rehearsal while the app still contains only the health check.
3. Approve the eventual storage ownership, access list, backup frequency, retention, and restore procedure before creating production Sheets.
4. Recheck the current Apps Script quotas when estimating a real workload; Google may change limits without notice.
5. Complete the Phase 0 review and only then begin the Phase 1 toolchain.

## Non-negotiable scope
Do not modify or import any previous project repository. All integration remains deferred to Phase 9.
