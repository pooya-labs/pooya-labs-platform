# Next Task — Phase 0

**Task ID:** P0-01  
**Title:** Build the feasibility and integration inventory  
**Status:** Ready  
**Do not skip:** This is the next atomic task.

## Objective
Collect evidence about the existing repository ecosystem and current Google Apps Script platform constraints before selecting the final deployment architecture. Do not modify any existing project repository.

## Steps
1. Read the root README, AGENTS.md, this file, STATUS.md, ROADMAP.md, ARCHITECTURE.md, and RECOVERY.md.
2. Inspect public repository structure and documentation for AetherFlow, ORBIT, Pooya.OS, AuraPulse, NexusCanvas, LuminaGlass, Salon Booking, and GlobalCart.
3. Record candidate reusable capabilities, maturity, dependencies, license/attribution considerations, and integration blockers in `docs/INTEGRATION-INVENTORY.md`.
4. Check current official Google documentation for Apps Script quotas, HtmlService, google.script.run, ContentService redirects, CacheService, LockService, PropertiesService, Sheets, Drive, and triggers.
5. Create a minimal Phase 0 transport spike plan. Then implement the smallest safe spike in this repository only, with no secrets committed.
6. Verify the HtmlService path and external-origin path independently; capture browser evidence and exact limitations.
7. Update architecture decision records, STATUS.md, NEXT.md, project-state.json, and CHANGELOG.md.

## Acceptance criteria
- Integration inventory exists and explicitly says no project has been imported or modified.
- Official documentation references are linked with access date.
- Transport test distinguishes HtmlService RPC from external HTTP fetch.
- No CORS bypass is assumed from `text/plain` alone.
- No secrets, private user data, or live booking data are stored in the repository.
- Next task is a single, actionable item.

## Handoff
If browser deployment/testing is unavailable in the current environment, record the blocker and provide exact manual test steps for the owner; do not mark transport proof complete.
