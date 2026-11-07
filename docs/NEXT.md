# Next Task — Close Phase 3 evidence and owner-review gates

**Task ID:** P3-08  
**Priority:** Finish factual/content acceptance before Phase 7 redesign.  
**Checkpoint date:** 2026-11-07  
**Latest verified code/test checkpoint:** `087fee17a8bfff503075dbae14609d530a7e63a4` on `main`.

## Current verified baseline

- The public bilingual portfolio is the root experience; the Spatial OS workspace remains secondary.
- Eight bilingual project dossiers, eight bilingual architecture diagrams, 16 crawler-readable case-study routes, 17 PNG Open Graph cards (with 17 SVG sources), sitemap, robots.txt, and the novels library are implemented.
- The novels catalog at `apps/platform/public/novels/catalog.json` is intentionally empty. Add only owner-supplied titles, descriptions, cover assets, and Markdown/TXT manuscripts using [NOVELS-GUIDE.md](NOVELS-GUIDE.md).
- Latest Repository CI on the refreshed source/test checkpoint passed **52/52 contract tests**, TypeScript, and all three target builds: [42392401131](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42392401131) on `087fee17a8bfff503075dbae14609d530a7e63a4`. A stale GlobalCart wording assertion was corrected; it was not removed or weakened.
- Latest portfolio Browser QA: 17/17 routes and 34/34 desktop/mobile viewports passed on updated UI SHA `cc157e4c9dd3e52a5181fb1a7e5e33821045f41b`, run [42391868133](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42391868133). Zero axe violations were reported; 34 color-contrast checks still require manual review, as do keyboard-only and screen-reader sessions.
- GitHub Pages build and deploy passed on the updated application source SHA `cc157e4c9dd3e52a5181fb1a7e5e33821045f41b`, run [42391868126](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42391868126). Compared with the older verified UI SHA `468c1f6`, main is 24 commits ahead and now includes real bilingual dossier/architecture/project-status changes as well as capture tooling, docs, and tests.
- Cloudflare production workflow requires `CLOUDFLARE_API_TOKEN`; Apps Script deployment requires `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID`. Their builds can pass while actual deployment is skipped. See [DEPLOYMENT-TARGETS.md](DEPLOYMENT-TARGETS.md).

## New source findings — 2026-11-07

- **ORBIT:** main `268017365cd22f7db9dd8895fb59fbccc76c9b8f` includes PR #136, the Cloudflare edge-gateway path. CI [42223939950](https://github.com/pooya-labs/orbit/actions/runs/42223939950), Security [42223939967](https://github.com/pooya-labs/orbit/actions/runs/42223939967), and Pages [42223939898](https://github.com/pooya-labs/orbit/actions/runs/42223939898) passed on that exact main SHA. However, the Worker is not yet live-connected: workers.dev route disabled; origin and gateway secret unset; API remains fail-closed. Keep this as post-v1 CF01–CF05 acceptance, not a release claim.
- **GlobalCart:** main `8a89f0d612cdf69d619b64049304eaa789b4785c` reports v0.2.3-dev / M09.8. Pages deployment [42387896585](https://github.com/pooya-labs/globalcart/actions/runs/42387896585) succeeded. Lighthouse regression budgets [42367298478](https://github.com/pooya-labs/globalcart/actions/runs/42367298478) passed six route/mode lab reports (home mobile TBT 250 ms, LCP 2.4 s). Post-deploy image QA [42367298484](https://github.com/pooya-labs/globalcart/actions/runs/42367298484) and Shopify smoke [42367298509](https://github.com/pooya-labs/globalcart/actions/runs/42367298509) passed on an earlier 7fdb27 SHA, not current HEAD. Latest known Browser E2E [42247489435](https://github.com/pooya-labs/globalcart/actions/runs/42247489435) was cancelled; corrected full E2E is still required.
- **Portfolio code update:** ORBIT dossier/diagram and GlobalCart M09.8 status/dossier were updated in `cc157e4c9dd3e52a5181fb1a7e5e33821045f41b`. Platform Pages deployment [42391868126](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42391868126) and browser QA [42391868133](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42391868133) passed on that code SHA. A stale contract-test assertion was corrected in `087fee17a8bfff503075dbae14609d530a7e63a4`; Repository CI [42392401131](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42392401131) then passed **52/52**.
- **Independent publishing:** the current Pages build and deploy jobs both passed. Cloudflare Pages and Apps Script production deploy jobs were skipped because required secrets are missing; their successful workflow wrapper/check jobs do not prove those targets were deployed.

## Ordered work queue

### P3-08A — Owner content decisions (release gate)
- [ ] Approve public biography and positioning.
- [ ] Select the first three featured projects and final project order.
- [ ] Confirm personal role/contribution wording, public statuses, and descriptions for all eight dossiers.
- [ ] Choose the public contact channel.
- [ ] Approve visible portraits, brand artwork, and all project screenshots intended for publication.

### P3-08B — Project evidence and factual reconciliation
- [ ] **AetherFlow:** keep its new screenshots unpublished until its upstream M07 landing/dashboard badge, M08 README status, duplicate Dashboard navigation, and current links are reconciled. Live API CORS remains unverified. Portfolio work must not silently modify the independent AetherFlow repository.
- [ ] **ORBIT:** capture Incidents, Metrics, Logs, and Traces states; complete owner-run Apps Script bootstrap/mutation/refresh acceptance and human device accessibility review. Keep demo telemetry clearly labelled illustrative.
- [ ] **NexusCanvas:** capture rack view, focused graph analysis, and snapshot import/export. Keep modelled metrics labelled illustrative.
- [ ] **LuminaGlass:** capture a clear low/no-blur state, successful PNG export, Audio Lab, and task board.
- [ ] **AuraPulse:** capture connected/fallback ticker states only after a CORS-safe source is verified. Keep current images labelled SIMULATED; do not claim live market connectivity.
- [ ] **Salon Booking:** obtain permission to publish case-study details and use only owner-approved, privacy-reviewed synthetic/redacted screenshots. The product's source-verified v1.0.0 release does not itself grant portfolio publication permission.
- [ ] **GlobalCart:** reconcile source documentation and complete M09.8 gallery plus exact-current-SHA browser/deployment E2E acceptance.
- [ ] Check every remaining item in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md); do not infer outcomes or metrics.

### P3-08C — Accessibility, visual and social validation
- [ ] Manually inspect the 34 contrast cases against the actual layered/glass backgrounds and fix any failing text/control states.
- [ ] Complete keyboard-only and screen-reader review in Persian/English, RTL/LTR, reduced motion, and representative mobile/desktop browsers.
- [ ] Validate the 1200×627 PNG Open Graph cards in LinkedIn Post Inspector and Facebook Sharing Debugger; confirm cache refresh. Internal artifact checks do not replace external crawler validation.
- [ ] Reconfirm active GitHub Pages source is GitHub Actions and perform a real-browser smoke test of the deployed public site.

### Phase 7 — Full redesign with owner feedback (mandatory before V1)
- [ ] After the factual/content gate is closed, review the complete site with Pooya on desktop and mobile.
- [ ] Record design feedback: identity, hierarchy, navigation, typography, color, motion, project order, case-study format, and imagery.
- [ ] Agree on one visual direction and redesign the whole public portfolio, not isolated sections.
- [ ] Present the redesigned site for a second feedback round and record remaining changes.
- [ ] Obtain explicit owner approval.

### Phase 8 — Release hardening and V1
- [ ] Complete performance, security, accessibility, responsive, RTL/LTR, browser, rollback, and recovery checks.
- [ ] Re-verify every public statement, project status, source link, image, and attribution against the audit.
- [ ] Confirm all owner approvals and repeatable publishing paths.
- [ ] Publish and document a versioned V1 only after every mandatory gate is complete.

## Boundaries

- Do not add a generic customer login/dashboard to this portfolio.
- Do not make Apps Script or Cloudflare a dependency of the static GitHub Pages portfolio.
- Do not claim production readiness, live market feeds, live infrastructure telemetry, real payment flows, or formal WCAG conformance without evidence.
- Keep AetherFlow, ORBIT, GlobalCart, Pooya.OS, AuraPulse, NexusCanvas, LuminaGlass, and Salon Booking repositories independent. Source-code integration remains Phase 9 and requires explicit approval.
- Never publish artifact-only screenshot candidates before owner approval and the existing checksum-gated approval workflow.
- No V1 tag while any mandatory Phase 7/8 or project-content audit item remains open.

## Resume instruction

Start with P3-08A and P3-08B; do not redo completed UI, novel-library, static SEO, screenshot-pipeline, or automated QA work. Update STATUS.md, project-state.json, CHANGELOG.md, and this file together after each coherent milestone.
