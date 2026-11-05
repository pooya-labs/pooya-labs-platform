# Next Task — Phase 0

**Task ID:** P0-04  
**Title:** Consolidate the HtmlService-first runtime and verify the revised deployed proof  
**Status:** Repository changes prepared; owner-side GAS sync is the remaining verification step

## Evidence and decision
- The owner previously confirmed that `google.script.run.rpcHealth()` works from the deployed HtmlService page.
- GitHub-hosted Chromium loaded the published Pages harness and attempted the `text/plain` POST against the supplied GAS `/exec` URL.
- Chromium Console reported that the response had no `Access-Control-Allow-Origin` header; Fetch failed with `TypeError: Failed to fetch`.
- The result proves the browser cannot read the direct cross-origin response. It does not independently prove whether `doPost` executed.
- ADR-0003 records the HtmlService-first decision.

## Repository-side changes
- The canonical Apps Script entry serves the UI through `doGet`.
- The public `rpcCall(request)` method accepts a versioned envelope and dispatches only `health.check` during Phase 0.
- The old `rpcHealth()` method remains as a temporary compatibility wrapper.
- The direct ContentService `doPost` endpoint has been removed from the canonical source.
- GitHub Pages is designated for static docs, showcase pages, and isolated demos; it is not a direct GAS API client.

## Owner-side verification needed
1. Copy the current `apps-script/Code.gs` and `apps-script/Index.html` into the already-created Apps Script project.
2. Save and create a new Web App deployment version.
3. Open the new `/exec` URL and run the health check.
4. Verify a response with `ok: true` and `data.transport: "google.script.run"`.

Do not paste the deployment URL into the repository or add customer/admin data to this proof.

## Remaining Phase 0 gates
- Review and approve [SECURITY-MODEL.md](SECURITY-MODEL.md) and [DATA-CLASSIFICATION.md](DATA-CLASSIFICATION.md); finalize admin authorization, abuse controls, and retention/deletion policy.
- Set measurable UI and RPC performance budgets using the intended devices and networks.
- Document data consistency semantics and the operational backup/restore path.
- Establish a repeatable Apps Script source sync/deployment workflow (evaluate `clasp` only after the manual proof is updated).
- No previous project repository may be modified; all integrations remain deferred to Phase 9.
