# Next Task — Close owner-confirmed project evidence and begin final redesign review

**Task ID:** P3-06  
**Title:** Complete project evidence gaps and owner acceptance before Phase 7  
**Status:** Eight bilingual engineering dossiers, eight bilingual architecture diagrams, 16 static case-study pages, and 16 social preview SVGs generated; CI green (32/32); screenshot and owner-review gates remain

## Current implementation
- Public bilingual portfolio is the default root experience; Spatial OS is secondary.
- Eight project case studies include source-grounded role/attribution, challenge, architecture, implementation details, engineering decisions, verification evidence, boundaries, and direct source/CI references.
- Eight architecture diagrams are generated in Persian and English from documented system flows. They are diagrams, not product screenshots or production evidence.
- Sixteen static HTML case-study routes are emitted at build time: `/projects/<slug>/` and `/en/projects/<slug>/`. Each includes rendered article content, canonical URL, hreflang alternates, JSON-LD, social metadata, and source links.
- Sixteen per-project/per-language Open Graph SVG cards plus a homepage card are generated. External social-crawler rendering still needs validation.
- Sitemap and robots.txt advertise the canonical static routes.
- The exact per-project gaps remain in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).

## Verified checks
- Repository CI [42066575496](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42066575496) passed TypeScript, Pages/GAS builds, artifact upload, and 32/32 contract tests, including build-output smoke checks for every static page, diagram, and social card.
- Pages deployment containing the static-page generator and architecture-diagram assets [42066311960](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42066311960) succeeded.
- Public preview: https://pooya-labs.github.io/pooya-labs-platform/

## Next implementation sequence
1. Gather actual UI screenshots for AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse; use only approved/redacted Salon Booking screens. The new architecture diagrams do not replace these.
2. Obtain Pooya's confirmation of biography/positioning, first three featured projects, attribution wording, project statuses, contact channel, and approved assets.
3. Complete AetherFlow M08 and license decision; complete ORBIT's Apps Script smoke and human device accessibility review.
4. Reconcile GlobalCart source documentation and complete M09.6 gallery/deploy E2E acceptance on an exact current SHA.
5. Verify Salon Booking Apps Script 1.4.0, TimeBlocks, relay/bootstrap/booking, actual salon configuration, and FCM push acceptance.
6. Validate SVG social cards in external crawlers/share clients and add PNG/JPEG fallbacks only if required.
7. Complete current-source accessibility, responsive, keyboard, RTL/LTR, reduced-motion, browser, and performance QA.
8. After the factual/evidence gate, begin Phase 7: full redesign with two owner feedback rounds; V1 remains blocked until explicit approval.

## Release boundaries
- No generic customer login/dashboard is added to the portfolio.
- Do not claim real payments, real trades, live infrastructure metrics, hosted production backends, real booking notifications, formal WCAG conformance, or production readiness unless evidence is added to the source record.
- Do not modify previous project repositories.
- No V1 tag/release while any mandatory item in PROJECT-CONTENT-AUDIT.md or Phase 7/8 remains open.
