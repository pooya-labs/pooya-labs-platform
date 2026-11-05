# Next Task — Phase 0

**Task ID:** P0-02  
**Title:** Deploy and run the minimal GAS transport proof  
**Status:** Waiting for owner-side Google Apps Script deployment

## Repository files ready
- `apps-script/Code.gs`: public health-only doGet/doPost and RPC handlers.
- `apps-script/Index.html`: HtmlService page with google.script.run test.
- `apps-script/appsscript.json`: minimal V8 manifest.
- `tests/transport/external-fetch.html`: external fetch test harness.
- `docs/GAS-FEASIBILITY.md`: official platform constraints and references.
- `docs/PHASE-0-TRANSPORT-TEST.md`: exact deployment and test instructions.

## Owner action required
Follow `docs/PHASE-0-TRANSPORT-TEST.md`:
1. Create a standalone Apps Script project in the owner's Google account.
2. Copy the two source files and manifest into Apps Script.
3. Deploy the health-only web app under a safe test access policy.
4. Verify the HtmlService RPC page.
5. Publish/serve the external test harness on a real HTTPS origin, then test POST from that origin.
6. Share only sanitized results: pass/fail, browser, origin, redirect/final URL behavior, preflight, and console/network error. Do not share credentials or tokens.

## Acceptance criteria
- HtmlService RPC result is recorded with browser evidence.
- External fetch result is recorded from a real HTTPS browser origin.
- Redirect chain, final response readability, preflight, and auth constraints are documented.
- ADR-0002 and ARCHITECTURE.md are updated based on evidence.
- STATUS.md, project-state.json, NEXT.md, and CHANGELOG.md are updated.

## If deployment is not currently possible
Do not claim the test passed. Keep external transport unproven and continue only with tasks that do not depend on it.
