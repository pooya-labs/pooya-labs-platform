# Next Task — Close project-content audit and prepare redesign review

**Task ID:** P3-05  
**Title:** Complete the source-backed project content and pre-release evidence audit  
**Status:** Eight bilingual technical dossiers implemented; per-project release audit documented; CI green (29/29); owner/evidence gates remain

## Current implementation
- Public bilingual portfolio is the default root experience; Spatial OS is secondary.
- Eight project records and shareable case-study views are in the typed content registry.
- Every case study now includes challenge, approach, status, boundaries, documented role/attribution, architecture, implementation details, engineering decisions, verification evidence, and direct documentation/CI references.
- Attribution gaps are explicit: AetherFlow's current README does not identify an individual author or personal contribution split.
- Current project states and non-production boundaries are described from source documents, including GlobalCart 0.2.3-dev/M09.6 and Salon Booking frontend 0.7.0 with Apps Script 1.4.0 as the backend target.
- The project-by-project missing-information checklist is in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).

## Verified checks
- Repository CI [42059342492](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42059342492) passed TypeScript, Pages/GAS builds, artifact upload, and 29/29 contract tests.
- The Pages deployment containing the dossier code [42058556955](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42058556955) succeeded.
- Public preview: https://pooya-labs.github.io/pooya-labs-platform/

## Next implementation sequence
1. Use PROJECT-CONTENT-AUDIT.md as the source of truth; complete missing project screenshots, architecture diagrams, current-SHA test evidence, and runtime acceptance.
2. Obtain Pooya's confirmation of biography/positioning, first three featured projects, attribution wording, project statuses, contact channel, and approved assets.
3. Reconcile GlobalCart's historical/current catalog-source documentation and confirm M09.6 gallery/E2E gates.
4. Verify Salon Booking Apps Script 1.4.0/TimeBlocks/relay/bootstrap/booking and FCM push acceptance before making any live-service claim.
5. Add crawler-readable static case-study pages and per-project social previews.
6. Only after the factual/evidence gate, begin Phase 7: full redesign with two owner feedback rounds; V1 remains blocked until explicit approval.

## Release boundaries
- No generic customer login/dashboard is added to the portfolio.
- Do not claim real payments, real trades, live infrastructure metrics, hosted production backends, real booking notifications, formal WCAG conformance, or production readiness unless evidence is added to the source record.
- Do not modify previous project repositories.
- No V1 tag/release while any mandatory item in PROJECT-CONTENT-AUDIT.md or Phase 7/8 remains open.
