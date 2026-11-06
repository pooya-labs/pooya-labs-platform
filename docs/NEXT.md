# Next Task — Review interface evidence, validate social previews, and close owner gates before Phase 7

**Task ID:** P3-08  
**Title:** Complete remaining project evidence, external share validation, and owner acceptance before Phase 7  
**Status:** Eight bilingual dossiers, eight bilingual architecture diagrams, 16 static case-study pages, 17 PNG social cards plus 17 SVG sources, and GlobalCart desktop/mobile UI screenshots implemented. ORBIT screenshot paths were removed because the PNGs were absent from main; capture workflow is artifact-only. Latest known green CI (34/34) predates current code.

## Current implementation
- Public bilingual portfolio is the default root experience; Spatial OS is secondary.
- Eight project case studies include source-grounded role/attribution, challenge, architecture, implementation details, engineering decisions, verification evidence, boundaries, and direct source/CI references.
- Eight architecture diagrams are generated in Persian and English from documented system flows. They are diagrams, not product screenshots or production evidence.
- Sixteen static HTML case-study routes are emitted at build time: `/projects/<slug>/` and `/en/projects/<slug>/`. Each includes rendered article content, canonical URL, hreflang alternates, JSON-LD, social metadata, and source links.
- Seventeen social preview PNGs (homepage + eight projects × two languages) are primary Open Graph images at 1200×627; seventeen matching SVG sources remain alongside them.
- Sitemap and robots.txt advertise the canonical static routes.
- GlobalCart includes visually inspected desktop and mobile storefront screenshots pinned to source commit `5ca43e40ff101e673ee7cf261850bff0a679047c`; desktop is the hero and mobile is a dedicated screenshot card.
- ORBIT currently uses its pinned project mark only. Earlier local desktop/mobile screenshot references were removed because the PNG files were absent from `main`; no ORBIT UI screenshot is currently published.
- The exact per-project gaps remain in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).

## Verified checks
- The last confirmed green repository CI run [42072937855](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42072937855) passed TypeScript, Pages/GAS builds, artifact upload, and **34/34 contract tests**. It predates the latest main changes and must not be treated as verification of the current SHA.
- Pages deployment containing the Resvg raster-card generator and the bilingual static case-study build [42071642813](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42071642813) succeeded.
- Public preview: https://pooya-labs.github.io/pooya-labs-platform/

## Next implementation sequence
1. Validate the PNG social previews using external share clients/inspectors and confirm cached-card refresh; only add other formats if a real client requires them.
2. Gather actual UI screenshots for AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse; use only owner-approved, redacted Salon Booking screens. Architecture diagrams do not replace screenshots.
3. Obtain Pooya's confirmation of biography/positioning, first three featured projects, attribution wording, project statuses, contact channel, and approved assets.
4. Complete AetherFlow M08 and license decision; complete ORBIT's Apps Script smoke and human device accessibility review.
5. Reconcile GlobalCart source documentation and complete M09.6 gallery/deploy E2E acceptance on an exact current SHA.
6. Verify Salon Booking Apps Script 1.4.0, TimeBlocks, relay/bootstrap/booking, actual salon configuration, and FCM push acceptance.
7. Complete current-source accessibility, responsive, keyboard, RTL/LTR, reduced-motion, browser, and performance QA.
8. After the factual/evidence gate, begin Phase 7: full redesign with two owner feedback rounds; V1 remains blocked until explicit approval.

## Release boundaries
- No generic customer login/dashboard is added to the portfolio.
- Do not claim real payments, real trades, live infrastructure metrics, hosted production backends, real booking notifications, formal WCAG conformance, or production readiness unless evidence is added to the source record.
- Do not modify previous project repositories.
- Do not treat Playwright capture artifacts as human-reviewed or publishable evidence until a person visually inspects them.
- No V1 tag/release while any mandatory item in PROJECT-CONTENT-AUDIT.md or Phase 7/8 remains open.
