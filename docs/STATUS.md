## Latest checkpoint — foundation rays start at the bottom focal point (2026-11-11)

- Moved the shared origin of all radial rays from the middle-lower area to the bottom-center edge of the animated field (`y=382` in the SVG viewBox).
- Increased the early horizontal spread of the ray curves so the full fan opens upward from that single point. Moved the halo and focal dot with the origin.
- Kept the section-level bottom fade, and added lower breathing room so the origin remains visible before the page blend begins. Desktop and mobile spacing both updated.
- Preview-only; no tests or QA executed.

## Latest checkpoint — foundation animation now converges at one lower focal point (2026-11-11)

- Refined the “The foundation behind every project” radial animation so all animated rays visibly converge on one focal point near the bottom, rather than disappearing into the center of a broad lower glow.
- Removed the former curved baseline, added a restrained focal glow and point, and adjusted the visual masks so the origin remains visible while the section itself still fades softly into the page at its bottom edge.
- The central artwork, particles, overall layout, and motion timing remain unchanged apart from the ray convergence/origin treatment. Preview only; no test or QA cycle executed.

## Latest checkpoint — foundation section bottom edge blended into page (2026-11-11)

- Corrected the target after owner feedback: the visible divider was the bottom border of the entire `.portfolio-proof` section, not the SVG's internal curved baseline.
- Removed the section's bottom border and applied a bottom-edge mask so the animated field and section surface fade smoothly into the page background. Retained the top edge and restored the SVG baseline to its original styling.
- Preview-only. No tests or QA executed; full validation remains deferred until `بازطراحی پایان یافت`.

## Latest checkpoint — foundation animation baseline softly faded (2026-11-11)

- Applied the owner-requested refinement to the lower curved baseline beneath the animated field in “The foundation behind every project.”
- Replaced the crisp single-color stroke with a very low-opacity horizontal gradient that fades out at both ends and blends into the surrounding surface. No other visual element or animation behavior was changed.
- Preview-only update. No tests, browser QA, or visual QA executed; final validation remains deferred until the owner says `بازطراحی پایان یافت`.

## Latest checkpoint — capability-section light-theme legibility improved (2026-11-11)

- Applied the next owner-requested correction on `redesign/live-site-baseline`, without changing the existing page structure or animation behavior.
- Improved contrast across all three animated capability mockups below “Thoughtful engineering, from interface to infrastructure.”: interface preview, topology/network diagram, and code-terminal scene. Raised visual boundaries, moving lines/bars, small labels, code syntax, and supporting copy in light theme while preserving the dark miniature-scene treatment.
- Published as a Cloudflare Pages preview only. No production deployment, merge to `main`, automated tests, browser QA, or visual QA was run; full validation remains deferred until the owner says `بازطراحی پایان یافت`.

## Latest checkpoint — P8-01 opened by owner; direction selection pending (2026-11-10)

- Pooya explicitly instructed the project to enter Phase 8. Design exploration is now open from main commit [`3888d07`](https://github.com/pooya-labs/pooya-labs-platform/commit/3888d0799afdf4c3bb702489b6f1fc22c98d1f3b).
- Created [PHASE-8-DESIGN-OPTIONS.md](PHASE-8-DESIGN-OPTIONS.md) with two complete directions: A — Obsidian Editorial Systems (recommended), and B — Warm Editorial Gallery. The full UI rebuild has not started because the roadmap requires Pooya to select one before implementation.
- The new brief covers identity, dark/light themes, bilingual RTL/LTR behavior, hero, project grid, case-study system, Novels empty state, motion, accessibility, responsive behavior, and technical boundaries.
- The ORBIT homepage screenshot fix is merged and deployed in PR [#68](https://github.com/pooya-labs/pooya-labs-platform/pull/68) / commit [`3888d07`](https://github.com/pooya-labs/pooya-labs-platform/commit/3888d0799afdf4c3bb702489b6f1fc22c98d1f3b). Exact PR-head CI/Browser QA and post-merge GitHub Pages deployment/Browser QA passed.
- **Phase 7 is not marked complete.** The 72 incomplete Axe contrast checks, physical-device/keyboard/screen-reader acceptance, owner content/media review, Salon Booking permission, authenticated social-cache checks, hosting remediation, asset audit, and rollback rehearsal remain required before V1. Starting design exploration does not waive any of these gates.
- Release remains `pre-alpha`; Phase 9 project-level content/media integration and Phase 10 V1 remain blocked until Phase 8 passes its two owner review rounds and the carry-over publication gates are closed.

---

## Latest checkpoint — P7-33 dual-theme contrast review matrix refreshed (2026-11-10)

- Refreshed [ACCESSIBILITY-MANUAL-REVIEW.md](ACCESSIBILITY-MANUAL-REVIEW.md) against exact-main Browser QA run [42815065767](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42815065767), artifact [13765540433](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42815065767/artifacts/13765540433), source commit `5af6dd2ca19cdc87783f6312f890c6244e9240b1`.
- The report covers 18 localized routes at desktop/mobile sizes. Axe recorded zero confirmed violations in both themes, but 36 incomplete contrast checks remain in dark mode and 36 in light mode. Dark results contain 228 node occurrences / 74 selectors; light results contain 288 / 56; the combined inventory has 87 unique selectors.
- Unresolved-background causes across both themes: 267 pseudo-element/decorative nodes, 201 gradient nodes, 44 overlap nodes, and 4 partial-overlap nodes. These are unresolved measurements, not confirmed failures or passes.
- The matrix includes the current selector counts, background causes, and a pending human-result field. This closes matrix preparation only; no manual contrast pass, WCAG certification, physical-device acceptance, or screen-reader acceptance is claimed.
- The QA artifact also verifies the AetherFlow homepage card image loaded at 1440px natural width in Persian and English desktop/mobile captures; the image now shows the product interface rather than the project mark.

**Release status: pre-alpha / Phase 7.** Human contrast/focus/keyboard/screen-reader review, physical-device acceptance, owner content/media approvals, authenticated social-cache validation, hosting remediation, and rollback rehearsal remain open.

---

## Latest checkpoint — P7-32 complete; light-theme contrast and dual-theme Browser QA verified (2026-11-10)

- Merged the light-theme contrast corrections and regression coverage: PR [#62](https://github.com/pooya-labs/pooya-labs-platform/pull/62) (`bfe775b`), PR [#64](https://github.com/pooya-labs/pooya-labs-platform/pull/64) (`ea52ef5`), and PR [#63](https://github.com/pooya-labs/pooya-labs-platform/pull/63) (`5af6dd2`). The light theme now uses darker emerald/hero-gradient/LTR headline colors, and the small social-proof/scroll-cue labels use the AA-compliant secondary token; nav hover also uses the darker accent.
- Numeric design contracts enforce at least 4.5:1 for the corrected light-theme secondary text and hero gradient stops on the tested ivory/surface colors. Browser QA now runs axe separately in dark and light themes on every route/viewport; it reloads a fresh document before the keyboard skip-link test so the first Tab begins from a clean route state.
- Exact-main verification on `5af6dd2ca19cdc87783f6312f890c6244e9240b1`: Repository CI [42815065743](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42815065743), Browser QA [42815065767](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42815065767), and GitHub Pages build/deploy [42815065770](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42815065770) all passed. The same PR-head CI and two-theme Browser QA passed before merge (runs 42814265497 and 42814265657).
- Main Browser QA report [artifact 13765540433](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42815065767/artifacts/13765540433): 18/18 localized routes, 36/36 desktop/mobile checks, 18/18 keyboard skip-link checks, zero failures, and no horizontal overflow. Axe reports zero confirmed violations in dark and light themes; 36 incomplete contrast checks remain in each theme (72 total) because axe cannot determine some gradient/pseudo-element backgrounds. These are still manual-review items, not passes.
- LinkedInBot and Facebook crawler simulations passed 34/34 route checks. The 20-sample-per-host performance baseline had zero failures and p75 CLS 0 on local, GitHub Pages, and Cloudflare Pages. p75 TTFB/FCP/LCP: local 5/216/288 ms; GitHub Pages 47/292/340 ms; Cloudflare Pages 52/336/404 ms. Budget enforcement remains report-only pending representative physical-device/network review.
- GitHub Pages deployment succeeded on the exact main commit. Cloudflare run [42815065871](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42815065871) and Apps Script run [42815065729](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42815065729) passed credential/configuration preflight but skipped the actual production publish jobs because required private Actions secrets are not configured; no new Cloudflare deployment or Apps Script version is claimed.
- Remaining Phase 7 gates: manually inspect the 36 incomplete contrast checks per theme; complete physical-device, keyboard/focus and screen-reader acceptance; approve owner content/media and Salon Booking publication permission; validate authenticated LinkedIn/Meta cache refresh; resolve owner-approved Cloudflare automation and decide whether Apps Script publishing is required; rehearse non-destructive rollback procedures. Phase 8 redesign, Phase 9 full project integration, and V1 remain blocked until their approval gates close.

---

## Latest checkpoint — P7-30 complete; Browser QA waits for settled hero captures (2026-11-10)

- PR [#59](https://github.com/pooya-labs/pooya-labs-platform/pull/59) was squash-merged to `main` as [`542baa7`](https://github.com/pooya-labs/pooya-labs-platform/commit/542baa7efd5b63b941eb34bbba90a60d047cfa2a).
- Updated only `apps/platform/scripts/portfolio-browser-qa.mjs` and `tests/platform/portfolio-browser-qa-contract.test.mjs`. Private visual evidence now waits for the initial hero/case-study reveal to be visible and fully opaque, waits for finite descendant entrance animations to finish, and decodes images before capture. Infinite ambient motion remains enabled.
- PR-head Repository CI [42806725019](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42806725019) and Browser QA [42806724768](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42806724768) passed. Post-merge main Repository CI [42807667726](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42807667726), Browser QA [42807667588](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42807667588), and GitHub Pages build/deploy [42807667809](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42807667809) all passed on the exact merge commit.
- Post-merge Browser QA artifact [13760621268](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42807667588/artifacts/13760621268): 18/18 routes, 36/36 desktop/mobile viewport checks, zero failures, zero confirmed Axe violations, and 36 incomplete contrast checks retained for human review. All eight project cards remain visible and animated in both homepage locales and both viewport sizes.
- The 20-sample-per-host performance report has zero failures and p75 CLS 0 on all three targets. p75 TTFB/FCP/LCP: local 4/204/320 ms; GitHub Pages 103/316/452 ms; Cloudflare Pages 91/336/460 ms. Enforcement remains report-only pending representative physical-device/network review.
- Cloudflare deployment workflow [42807667601](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42807667601) and Apps Script workflow [42807667583](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42807667583) passed their credential/configuration checks but skipped their actual production publish jobs because the required private Actions secrets are not configured. No new Cloudflare deployment or Apps Script version is claimed.
- Re-opened the approved Salon Booking desktop/mobile full-page PNGs from capture artifact [13611818994](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42468215117/artifacts/13611818994). Visual inspection found customer-facing booking/storefront content and the business contact section; no admin surface or customer appointment records were visible. The separate salon-owner publication permission remains pending, and the broader portfolio binary-asset review remains open.

- Additional visual-media verification: re-opened the 14 approved full-page desktop/mobile PNGs for AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and Salon Booking from artifact [13611818994](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42468215117/artifacts/13611818994). All 14 SHA-256 digests and byte counts match [the approval manifest](approved-interface-captures/portfolio-2026-11-08.json). The comparative contact sheet and desktop captures were visually reviewed. Observed publication boundaries: ORBIT's sample/illustrative environment is labelled as demo; AuraPulse is visibly SIMULATED and its market values are not live; NexusCanvas uses explicitly modelled telemetry; Pooya.OS and NexusCanvas show the owner's profile portrait/metrics and still need owner-content approval; LuminaGlass retains its 32px blur/quality limitation; AetherFlow shows M08 in progress; Salon Booking shows customer-facing booking plus business contact details only, with no admin surface or customer appointment records visible. GlobalCart's separate full-page candidate remains excluded because its public product grid has blank placeholders. This is a scoped visual/integrity review, not blanket publication or rights approval.
**Release status: pre-alpha / Phase 7.** This closes the Browser QA evidence-timing task and the Salon Booking screenshot re-open subtask only. It does not close Phase 7, approve Salon Booking publication, start Phase 8/9, or publish V1.

## Latest checkpoint — P7-29 complete; AetherFlow homepage project card uses its product screenshot (2026-11-10)

- PR [#57](https://github.com/pooya-labs/pooya-labs-platform/pull/57) merged to `main` as [`b137104`](https://github.com/pooya-labs/pooya-labs-platform/commit/b1371043199937f26d717c0518052f32d3f54758).
- The AetherFlow card in the homepage Projects section now displays the approved desktop product-interface capture instead of its SVG logo. Its image source is pinned to immutable platform capture commit `eba5e2d02047375ae8a42514f7bbb58c75106ba7`; the card crops from the top to show the product header and main workflow preview. The dedicated bilingual case-study hero remains unchanged.
- Added a stable project-specific artwork class, updated the visual provenance contract, and extended Chromium Browser QA to decode and verify the AetherFlow project-card image in both homepage locales at desktop and mobile viewports.
- PR-head Repository CI [42802061254](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802061254) and Browser QA [42802061224](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802061224) passed on `4a626e86a89a72970750f953c63db94bb792fcaf`; the browser artifact is [13756243160](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802061224/artifacts/13756243160).
- Post-merge main Repository CI [42802822245](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802822245), Browser QA [42802822186](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802822186), and GitHub Pages build/deploy [42802822225](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802822225) all passed on the exact merge commit. Post-merge browser artifact: [13755679671](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802822186/artifacts/13755679671).
- Cloudflare credential preflight passed, but its actual production deploy job was skipped in run [42802822176](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802822176). Apps Script configuration preflight passed, but its actual stable Web App publish job was skipped in run [42802822508](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802822508). No new deployment to those targets is claimed.

**Release status: pre-alpha / Phase 7.** This closes the AetherFlow homepage-card artwork task only; it does not close Phase 7 or publish a V1 release.

## Latest checkpoint — P7-28 complete; AetherFlow product-page visual published (2026-11-10)

- PR [#55](https://github.com/pooya-labs/pooya-labs-platform/pull/55) merged to `main` as [`463501c`](https://github.com/pooya-labs/pooya-labs-platform/commit/463501cb94d1e36c6062535d6596f876036b87cd).
- AetherFlow's bilingual case-study hero now displays the approved desktop product-page capture rather than the abstract/logo-like motion scene. The homepage card keeps AetherFlow's own SVG mark. The full desktop/mobile evidence gallery below the hero remains intact.
- The page hero reads the image from the same published Pages origin at `/pooya-labs-platform/interface-captures/aetherflow/aetherflow-fullpage-desktop.png`. The asset source is pinned to immutable platform capture commit `eba5e2d02047375ae8a42514f7bbb58c75106ba7`; its Persian/English alt text is retained. The crop shows the top product view (`object-fit: cover; object-position: top center`).
- The Pages capture-pruning script now retains only local interface captures that a built page actually references and continues pruning unused duplicates. A contract verifies the retained file is a valid 1440×3241 PNG after the Pages build.
- PR-head checks passed on `69ec46dd6c9cdd7008891c275d70c1f0da024d7e`: Repository CI [42794855912](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42794855912) and Chromium Browser QA [42794856114](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42794856114).
- Post-merge main checks passed on the exact merge commit: Repository CI [42795404398](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42795404398), Browser QA [42795404244](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42795404244), and GitHub Pages build/deploy [42795404445](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42795404445). Browser QA artifact: [13753565845](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42795404244/artifacts/13753565845). The main Browser QA passed route, viewport, keyboard, metadata, and local/GitHub Pages/Cloudflare performance steps.
- Cloudflare's workflow preflight passed, but the actual production deployment job was skipped in run [42795404418](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42795404418). Apps Script configuration preflight passed, but its publish job was skipped in run [42795404647](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42795404647). No new Cloudflare or Apps Script deployment/version is claimed.
- No independent upstream project repository was modified. AetherFlow M08's matching-runner benchmark and all existing owner-review/manual Phase 7 gates remain open.

**Release status: pre-alpha / Phase 7.** This closes the AetherFlow case-study hero image task only; it does not close Phase 7 or publish a V1 release.

## Latest checkpoint — P7-27 complete; PR #53 merged (2026-11-10)

- PR [#53](https://github.com/pooya-labs/pooya-labs-platform/pull/53) merged to `main` as [`1ba198d`](https://github.com/pooya-labs/pooya-labs-platform/commit/1ba198d1293305c9b0a64c91746989570f952ec2).
- Exact PR-head checks passed on `106db68944b687cad226529053578d61e10525bf`: Repository CI [42786194427](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42786194427) and Chromium Browser QA [42786194426](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42786194426).
- Post-merge checks passed on the exact `main` merge commit: Repository CI [42787101089](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42787101089), Browser QA [42787100812](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42787100812), and GitHub Pages deployment [42787100804](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42787100804). The Browser QA artifact is [13749564097](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42787100812/artifacts/13749564097).
- **Portfolio-layer connection is complete for all eight projects:** the homepage cards expose each official demo, source repository, and internal case-study route; every project has localized artwork, a bilingual case-study dossier, a bilingual static detail route, and an architecture diagram. The static build now also verifies AetherFlow's approved desktop/mobile case-study evidence in both languages.
- AetherFlow's own favicon-derived workflow mark is now included at `apps/platform/public/project-marks/aetherflow.svg`, pinned to immutable source commit [`99dc331`](https://github.com/pooya-labs/pooya-labs-platform/commit/99dc3317afa180058def6f0d860e4b654be62ae2), and used by its homepage card with Persian/English alt text.
- Cloudflare Pages run [42787100754](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42787100754) passed its credential check but skipped the actual deployment job; Apps Script run [42787101214](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42787101214) passed configuration validation but skipped publishing. No fresh Cloudflare or Apps Script deployment is claimed.
- No independent upstream project repository was modified. All eight project review states remain `needs-owner-review`; Salon Booking's separate owner permission is still pending. AetherFlow M08's matched-runner benchmark and the other project-specific upstream release/runtime gates remain unchanged.

**Release status: pre-alpha / Phase 7.** This closes the portfolio-link/artwork wiring task only. It does not close Phase 7, approve portfolio content/media, promote any upstream production runtime, or start Phase 9. Deeper application/API integrations remain deferred under ADR-0001 until the platform's standalone V1 sequence and owner gates are satisfied.

## Latest checkpoint — PR #50 merged; P7-26 handoff synchronized (2026-11-10)

- PR [#50](https://github.com/pooya-labs/pooya-labs-platform/pull/50) merged into main as [a804267](https://github.com/pooya-labs/pooya-labs-platform/commit/a8042675b76e1785865b1956fb8904db788e0b2d).
- Exact PR-head Repository CI [42727164323](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42727164323) and Portfolio Browser QA [42727164249](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42727164249) passed on head e58f284. Browser QA completed route, metadata, keyboard and performance steps.
- The merged changes are documentation/state-only. No application source, independent upstream repo, secret, hosting setting or production deployment changed.
- Preliminary asset/link checks found no sensitive credential filenames, 17/17 project registry URLs use HTTPS, 16/16 new-tab links carry rel attributes, and the public Novels catalog is empty. The public Salon Booking captures are customer-facing only; separate salon-owner permission and independent binary image review remain open.
- All eight project review states remain needs-owner-review. Manual accessibility, physical device, authenticated social-cache, owner-content/privacy, deployment and rollback gates remain open.

**Release status: pre-alpha / Phase 7.** No Phase 8, Phase 9 or V1 gate is closed by this documentation task.

## Latest checkpoint — P7-26 merged; security and owner-review records synchronized (2026-11-10)

- PR [#50](https://github.com/pooya-labs/pooya-labs-platform/pull/50) merged as [a804267](https://github.com/pooya-labs/pooya-labs-platform/commit/a8042675b76e1785865b1956fb8904db788e0b2d). The six changed files are documentation and machine-readable project state only.
- Exact PR-head Repository CI [42727164323](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42727164323) and Portfolio Browser QA [42727164249](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42727164249) both passed on e58f284. Browser QA completed responsive routes, metadata, keyboard, and cold-route/GitHub Pages/Cloudflare Pages performance steps.
- The Security Model now matches active main ruleset 26861856 and GitHub App PR-based screenshot publishing. The owner-review packet now records AetherFlow PR #18/#19, merged ORBIT PR #138 with patched Keycloak published but not promoted, and the GlobalCart FX freshness anomaly.
- Preliminary source-tree/link checks: zero sensitive credential-file-name matches, 17/17 project registry destinations use HTTPS, 16/16 new-tab anchors have rel attributes, and the public Novels catalog has no manuscripts/covers. The two Salon Booking public captures are customer-facing full-page images, but Salon-owner permission and independent binary image review remain open.
- No application code, upstream repository, secret, GitHub setting, or production deployment changed. All eight project registry states remain needs-owner-review.

**Release status: pre-alpha / Phase 7.** Human accessibility/device review, owner content/media approval, Salon Booking permission, authenticated social-cache validation, deployment remediation, and rollback rehearsal remain open.

## Latest checkpoint — P7-26 public-asset preflight added (2026-11-10)

- Added a read-only source-tree/link preflight to [SECURITY-MODEL.md](SECURITY-MODEL.md): no sensitive credential-file-name matches; 17/17 project registry destinations use HTTPS; 16/16 `target="_blank"` anchors have a `rel` attribute; the public Novels catalog is empty.
- The only Salon Booking portfolio captures are two full-page customer-facing PNGs. Their manifest records visual/privacy review and no admin route/customer records, but the salon owner's separate publication permission remains pending.
- The binary PNG payloads were not independently re-opened in this pass, so the complete public/private asset and visual privacy review remains open. No customer/admin asset or screenshot was added or changed.
- The stale governance and owner-packet statements corrected in P7-26 remain documentation-only. All eight owner-review states remain pending.

**Release status: pre-alpha / Phase 7.** This preliminary audit does not close the manual asset, accessibility, physical-device, owner-approval, social-cache, deployment, or rollback gates.
## Latest checkpoint — P7-26 security and owner-packet documentation corrected (2026-11-10)

- A targeted documentation audit found two stale statements and corrected them: [SECURITY-MODEL.md](SECURITY-MODEL.md) now records active ruleset 26861856 and the GitHub App PR-based capture publication boundary; [OWNER-REVIEW-PACKET.md](OWNER-REVIEW-PACKET.md) now reflects current AetherFlow, ORBIT and GlobalCart source facts.
- Main is protected by the active PR + strict-check ruleset; do not confuse the disabled classic branch-protection endpoint with the active repository ruleset. The normal passing-check PR/merge path has been exercised; negative failed/pending-check enforcement remains untested.
- Capture publishers no longer directly push reviewed assets to main. The App's real changed-image PR path remains unexercised because approved files already matched the committed assets.
- Owner review state is unchanged: all eight project registry entries remain needs-owner-review. Salon Booking public case-study permission remains a separate pending owner approval; privacy review of selected screenshots does not substitute for product-owner permission.
- GlobalCart's latest FX snapshot is explicitly freshness-unverified. ORBIT's patched Keycloak digest is published/scanned but not promoted to production. AetherFlow M08 and the matched-runner benchmark remain open.
- No app source, independent upstream repository, private credential, GitHub setting, or production deployment changed in this documentation task.

**Release status: pre-alpha / Phase 7.** No owner approval or V1 release gate is closed here.


## Latest checkpoint — P7-25 merged; handoff synchronized (2026-11-10)

- PR [#48](https://github.com/pooya-labs/pooya-labs-platform/pull/48) merged normally into `main` as [`b3e548e`](https://github.com/pooya-labs/pooya-labs-platform/commit/b3e548ead98103535e7524bf550b7d6689d30720). The seven changed paths are documentation/README and machine-readable project state only.
- Exact PR-head Repository CI [42723838058](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42723838058) and Portfolio Browser QA [42723837697](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42723837697) both passed on `1c2f11e`. Browser QA completed route/metadata/keyboard checks and cold-route, GitHub Pages and Cloudflare Pages performance steps. The main branch merge commit is documentation-only; this PR does not claim a new app build/deployment.
- The read-only eight-repository inventory and corrected AetherFlow/ORBIT/GlobalCart boundaries are in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). No independent repository was modified.
- AetherFlow M08 remains open pending the matching EPYC 9V45 benchmark. ORBIT's patched Keycloak 26.8.2 digest is published and verified but production Compose remains on 26.8.1. GlobalCart's newest FX data snapshot remains freshness-unverified due to its backward source timestamp and skipped CI.
- Platform application-source deployment remains unchanged: GitHub Pages' latest verified build includes the `e5ef6389` application source, and Cloudflare's latest verified deployment remains `ed73cc8e` from the same source. The platform still lacks verified native Cloudflare Git-push publishing and Apps Script stable Web App publishing; both are gated by private configuration.
- Remaining Phase 7 gates are unchanged: manual contrast/focus/keyboard/screen-reader review (36 incomplete Axe contrast records), physical Android/browser acceptance, owner content/order/role/media/Novels approvals, Salon Booking privacy permission, authenticated social-cache validation, deployment remediation and rollback rehearsal.

**Release status: pre-alpha / Phase 7.** PR #48 closes the source-inventory documentation task only; it does not authorize Phase 8, Phase 9, or V1.

## Latest checkpoint — P7-25 upstream source audit refreshed (2026-11-10)

- The current platform `main` checkpoint before this documentation refresh is [`b1db0ccc0b0d`](https://github.com/pooya-labs/pooya-labs-platform/commit/b1db0ccc0b0d2f554338ef0553af342f8c72fd48), following merged PR #47. There are no open platform PRs at the start of this task. The current P7-25 branch changes documentation/project state only; it does not change React/UI source, workflows, secrets, hosting configuration, or production deployments.
- A fresh read-only scan covered all eight independent repositories. **No independent repository was modified.** Current heads and evidence are recorded in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).
- **AetherFlow:** PR #19 and documentation PR #20 are merged. The latest application-code merge is `5cc44c1`; the CLI now enforces a hard 2 MiB control-plane response cap while streaming. PR #19's exact-head Rust and supply-chain checks passed. M08 remains open because the benchmark still needs a matching EPYC 9V45 runner; no stable v1.0.0 production release is claimed.
- **ORBIT:** PR #138 is now merged. Patched Keycloak 26.8.2 with Guava 33.7.2-jre was published as immutable digest `sha256:97cc4590...`; exact-digest strict scans passed for AMD64 and ARM64. The production Compose file still uses Keycloak 26.8.1: there has been no promotion, identity provisioning, routing change, or production deployment of the patched image.
- **GlobalCart:** latest main commit `2ef95fa` changes only `data/fx-rate.json` and skips CI. Its embedded source timestamp moved backward by 80 minutes relative to the previous snapshot. No deployment of this new snapshot is verified; the previous verified Pages deployment is run [42628309742](https://github.com/pooya-labs/globalcart/actions/runs/42628309742) on `1c3d27f`. This FX value must not be described as current without reconciling its source time.
- The five remaining projects (Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and Salon Booking) showed no newer main commits than the previous audit. Feature-level portfolio acceptance and owner/media approvals remain separate.
- The latest verified platform Browser QA remains [run 42666914164](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914164): 18/18 routes, 36/36 viewport checks, 34/34 social-crawler checks, zero failures and zero confirmed Axe violations; 36 incomplete contrast checks still require manual review. Latest Pages deployment remains [run 42666914116](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914116) on the PR #46 main checkpoint. This P7-25 docs-only branch has not yet passed its own required PR checks.
- **Release status remains pre-alpha / Phase 7.** Human contrast/focus/keyboard/screen-reader review, physical Android acceptance, owner approval of content/order/roles/media/Novels, Salon Booking privacy permission, authenticated social-cache validation, Cloudflare Git-trigger remediation, Apps Script production configuration, and controlled rollback rehearsal remain open. Phase 8 redesign, Phase 9 full integration, and V1 are still gated.
## Latest checkpoint — PR #46 merged; repeatable social-crawler QA now runs in Browser QA (2026-11-09)

- PR [#46](https://github.com/pooya-labs/pooya-labs-platform/pull/46) merged as main commit [`5321d3f44298a9d81d3fbc8f0712d4bc9acb8962`](https://github.com/pooya-labs/pooya-labs-platform/commit/5321d3f44298a9d81d3fbc8f0712d4bc9acb8962). It changes four paths: `apps/platform/scripts/portfolio-browser-qa.mjs`, `tests/platform/portfolio-browser-qa-contract.test.mjs`, `docs/ROADMAP.md`, and new `docs/SOCIAL-CRAWLER-QA.md`. It does not change React/UI source, secrets, credentials, Cloudflare settings, or upstream projects.
- PR-head Repository CI [42666346758](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666346758) and Browser QA [42666347072](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666347072) passed on the final PR head `eaf5fec0a3db95ff01ae3431e13b113b4454b8bd`.
- Post-merge exact-main Repository CI [42666914377](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914377) passed.
- Post-merge exact-main Browser QA [42666914164](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914164) passed: **18/18 routes, 36/36 viewport checks, 34/34 social-crawler checks, zero failures, zero confirmed Axe violations**. It retains **36 incomplete Axe contrast checks** for manual review. Artifact: [13697461514](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914164/artifacts/13697461514). All local, GitHub Pages and Cloudflare Pages performance-measurement steps completed successfully.
- GitHub Pages deployment [42666914116](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914116) built and deployed exact main `5321d3f`; artifact [13696229308](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914116/artifacts/13696229308).
- The new browser regression gate reads raw HTML using `LinkedInBot/1.0` and Facebook `facebookexternalhit/1.1` over 17 public routes per User-Agent. It checks title/description, canonical and `og:url` parity, and locally built OG PNG HTTP status, PNG signature and 1200×627 dimensions. See [SOCIAL-CRAWLER-QA.md](SOCIAL-CRAWLER-QA.md). This does not replace the separately completed production-host audit and is not an authenticated platform debugger or cache-refresh result.
- Cloudflare workflow [42666914099](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914099): credential check passed; actual deploy job skipped because `CLOUDFLARE_API_TOKEN` is absent. Latest verified Cloudflare production deployment remains [`ed73cc8e`](https://ed73cc8e.pooya-labs-platform.pages.dev/) from application source `e5ef6389`; no Cloudflare setting or secret was changed.
- Apps Script workflow [42666914071](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914071): configuration check passed; actual stable Web App publish skipped because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are absent. No new Apps Script production version is verified.
- Main's active repository ruleset remains [26861856](https://github.com/pooya-labs/pooya-labs-platform/rules/26861856), requiring a PR and both required checks with strict status; PR #46 passed both and merged through the normal squash path.
- Remaining gates: authenticated LinkedIn/Meta sharing debugger and cache refresh; human contrast/focus/keyboard/screen-reader review; physical Android/browser acceptance; owner approval of copy, order, roles, media and Novels; Salon Booking privacy permission; Cloudflare Git-push remediation approval; Apps Script private deployment configuration; and controlled rollback rehearsal.

**Release status: pre-alpha / Phase 7.** Phase 8/9 and V1 remain gated.
## Latest checkpoint — light-theme contrast fix merged and published on both hosts (2026-11-09 16:58 UTC)

- PR [#43](https://github.com/pooya-labs/pooya-labs-platform/pull/43) merged as [`e5ef638917d3204025d062af939cf01a28689d3a`](https://github.com/pooya-labs/pooya-labs-platform/commit/e5ef638917d3204025d062af939cf01a28689d3a). It changes one final light-theme text token and adds a numerical contrast contract test.
- PR #43 Repository CI [42659360542](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659360542) and Browser QA [42659360713](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659360713) passed. Post-merge main CI [42659840758](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840758) and Browser QA [42659839780](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659839780) also passed; report artifact [13692549570](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659839780/artifacts/13692549570).
- GitHub Pages [42659840309](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840309) passed Build and Deploy on exact main `e5ef6389`; artifact `13693239378`; canonical URL [https://pooya-labs.github.io/pooya-labs-platform/](https://pooya-labs.github.io/pooya-labs-platform/).
- Cloudflare Pages [`ed73cc8e`](https://ed73cc8e.pooya-labs-platform.pages.dev/) (ID `ed73cc8e-7fcb-42b7-8ca0-b6e591f9f160`) passed queue, initialize, clone, build, and deploy on the same exact main SHA. Canonical alias: [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/). Trigger is `ad_hoc` through the authorized Cloudflare Pages API.
- Live asset verification: both homepage and CSS requests returned HTTP 200 on both hosts. Both CSS assets contain `--pf-dim:#58675e`; neither contains the previous `--pf-dim:#728076`. Both CSS payloads are 208,405 bytes.
- Calculated secondary-text contrast is 5.50:1 on `#f5f6f2`, 5.08:1 on `#e9eee9`, and 5.96:1 on `#fffffc`. The automated contract test enforces 4.5:1 across these surfaces. This token-specific test does not replace full manual contrast review.
- Native Cloudflare Git-push remains unverified. GitHub Cloudflare workflow [42659840434](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840434) passed credential checking but skipped deploy because `CLOUDFLARE_API_TOKEN` is absent; the API fallback succeeded without changing secrets or project settings.
- Apps Script workflow [42659840240](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840240) passed configuration checking but skipped actual Web App publishing. No new Apps Script production version is verified.
- Remaining Phase 7 gates: authenticated social-crawler/cache validation; full human contrast, focus, keyboard and screen-reader review; physical Android/browser acceptance; owner content, contribution, media and Novels approval; Salon Booking privacy permission; native Cloudflare Git integration remediation; Apps Script production publishing; and controlled rollback rehearsal. Platform remains **pre-alpha / Phase 7**.

## Latest checkpoint — live robots and sitemaps verified on both static hosts (2026-11-09 16:48 UTC)

- PR [#41](https://github.com/pooya-labs/pooya-labs-platform/pull/41) is merged as main [`b1c0ee7d49b7977d86d7d6029c3f0d44737642fc`](https://github.com/pooya-labs/pooya-labs-platform/commit/b1c0ee7d49b7977d86d7d6029c3f0d44737642fc); superseded PR #29 is closed. PR #41 Repository CI [42656627537](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42656627537), Browser QA [42656627378](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42656627378), and post-merge main Repository CI [42657496037](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42657496037) all passed.
- **Live SEO endpoint verification is now complete for both static hosts.** Using Cloudflare Browser Rendering to fetch the public URLs:
  - GitHub Pages `robots.txt`: HTTP 200, `text/plain; charset=utf-8`, allows `/`, and points to `https://pooya-labs.github.io/pooya-labs-platform/sitemap.xml`.
  - Cloudflare Pages `robots.txt`: HTTP 200, `text/plain; charset=utf-8`, allows `/`, and points to `https://pooya-labs-platform.pages.dev/sitemap.xml`.
  - Both `sitemap.xml` URLs: HTTP 200, `application/xml`; XML parser root is `urlset`, with no parse error. Each contains exactly 17 `loc` entries and every location uses that host's own origin. First location is the host homepage; final location is the English Salon Booking case study.
- Static application-source revision remains `97094ed0cb79f65b0e93bf36d52a2520846e6f1b`; PR #41 and subsequent docs-only changes do not change app bundles or require redeployment.
- The Cloudflare Pages project is connected to `pooya-labs/pooya-labs-platform`, production branch `main`, production deployments enabled, with path includes `apps/platform/**` and `package.json`. The matching-path source PR #39 still did not trigger a `github:push` deployment. Root cause is unknown. Cloudflare's official troubleshooting route is **Settings → Builds → Manage under Git Repository**, then verify the Cloudflare Workers and Pages GitHub App installation. Reinstalling can interrupt Git integration; this remains owner-approval-only and no setting/installation was changed.
- Apps Script workflow [42651297282](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297282) passed configuration checking but skipped the actual publish job; no new production version is verified.
- Remaining gates: authenticated LinkedIn/Facebook crawler and cache-refresh validation; manual contrast, keyboard and screen-reader review; physical Android/browser acceptance; owner biography/project-order/contribution/media and Novels decision; Salon Booking privacy permission; Cloudflare Git integration remediation approval; Apps Script production publishing; and controlled rollback rehearsal. The platform remains **pre-alpha / Phase 7**, not V1.

## Latest checkpoint — P7-18 ownership boundary merged; post-merge CI passed (2026-11-09 16:43 UTC)

- PR [#41](https://github.com/pooya-labs/pooya-labs-platform/pull/41) was squash-merged as [`b1c0ee7d49b7977d86d7d6029c3f0d44737642fc`](https://github.com/pooya-labs/pooya-labs-platform/commit/b1c0ee7d49b7977d86d7d6029c3f0d44737642fc). The nine changed paths are documentation/project-state only. The superseded PR #29 was closed with an explanatory comment.
- PR #41's exact-head Repository CI [42656627537](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42656627537) and Browser QA [42656627378](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42656627378) both passed. Browser QA completed route, metadata, responsive/keyboard, cold-route, GitHub Pages, and Cloudflare Pages checks; report artifact [13692501705](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42656627378/artifacts/13692501705).
- Post-merge exact-main Repository CI [42657496037](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42657496037) passed on `b1c0ee7`. The active ruleset remains in force; no bypass was used.
- The bilingual ownership/IP policy and ten-repository register are now on `main`. The owner's exclusive-control intent is scoped to original Pooya Labs Platform work; third-party/upstream/contributor rights, AetherFlow Apache-2.0, ORBIT's no-license/all-rights-reserved position, and client-controlled Salon Booking assets remain separate. No root LICENSE or reuse grant was added.
- Public application source is still revision `97094ed0cb79f65b0e93bf36d52a2520846e6f1b`; PR #41 and its merge changed documentation only. GitHub Pages deployment [42651297113](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297113) and Cloudflare deployment `a075e139-20d1-4587-91a9-b73904499065` remain the verified app deployments on that exact app source.
- Cloudflare API read confirms the project is connected to `pooya-labs/pooya-labs-platform`, production branch `main`, production deployments enabled, and `path_includes=[apps/platform/**, package.json]`. Despite those matching settings, the earlier source-changing PR #39 did not trigger a `github:push` deployment. Its cause remains unconfirmed. Cloudflare's documented troubleshooting path is to review **Settings → Builds → Manage** under Git Repository and verify the Cloudflare Workers and Pages GitHub App installation; uninstall/reinstall can interrupt the connection and requires owner approval. No Cloudflare setting or installation was changed.
- Direct live response-body checks for `robots.txt` and `sitemap.xml` were attempted for both hosts, but the external fetch tool could not access the URLs. Keep the live-response gate open. Build contracts still verify 17 sitemap locations and host-specific robots targets.
- Apps Script workflow [42651297282](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297282) passed configuration checking but skipped the actual publish job; no new production version is verified.
- Remaining Phase 7 gates: authenticated social-crawler/cache checks; live robots/sitemap response bodies; human contrast, keyboard, and screen-reader review; physical Android/browser acceptance; owner biography/project-order/contribution/media and Novels decisions; Salon Booking privacy approval; Cloudflare Git integration remediation; Apps Script production publishing; and controlled rollback rehearsal. Platform remains **pre-alpha / Phase 7**, not V1.

## Latest checkpoint — current main CI clean; exclusive ownership boundary recorded for review (2026-11-09 16:22 UTC)

- Current `main`: [`dcc9ec6d445cc51b2dbe5c543c113ad16db1cbe8`](https://github.com/pooya-labs/pooya-labs-platform/commit/dcc9ec6d445cc51b2dbe5c543c113ad16db1cbe8). PR [#40](https://github.com/pooya-labs/pooya-labs-platform/pull/40) merged normally and changed documentation/project state only.
- Exact-main Repository CI [42653901311](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42653901311) completed successfully on `dcc9ec6d`. PR #40 Browser QA [42653273680](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42653273680) completed successfully on its exact pre-merge head `6a79750d`; it passed 18/18 routes and 36/36 viewports with zero failures and zero confirmed Axe violations.
- The deployed application-source revision remains `97094ed0cb79f65b0e93bf36d52a2520846e6f1b`: the Pages and Cloudflare production build/deploy evidence below remains valid because the newer `main` commits are documentation-only. No application source or public asset was changed by PR #40.
- GitHub Pages deployment [42651297113](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297113) succeeded on app source `97094ed0`; Cloudflare production deployment `a075e139-20d1-4587-91a9-b73904499065` also passed all five stages on that same app source via an `ad_hoc` API trigger. Do not describe Cloudflare Git-push deployment as working: the matching-path test did not produce a `github:push` deployment.
- Apps Script workflow [42651297282](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297282) passed its configuration-check job, but the actual stable Web App publish job was **skipped**. No new Apps Script production version is verified; required private deployment configuration remains unavailable to this workflow.
- The bilingual ownership/IP policy and ten-repository ownership register record the owner's explicit instruction that **Pooya Labs Platform is the sole project in this portfolio set intended for his exclusive ownership, control, product direction, and use**. This is documented as owner intent, not a legal opinion or rights transfer. Third-party dependencies, upstream work, contributors, AetherFlow's Apache-2.0 license, ORBIT's current rights-reserved/no-license position, and client-controlled Salon Booking assets remain separate.
- The previous ownership-policy PR [#29](https://github.com/pooya-labs/pooya-labs-platform/pull/29) is stale and unmergeable against current `main`; its policy/register work is being superseded on a fresh branch rather than forcing an old base.
- Remaining Phase 7 gates: direct live `robots.txt`/`sitemap.xml` response-body verification; authenticated LinkedIn/Facebook crawler/cache checks; manual contrast, keyboard and screen-reader review; physical Android/browser acceptance; final biography/project-order/contribution/media approval; Salon Booking privacy permission; and production rollback rehearsal. The current runtime could not resolve the public hostnames for direct response fetches, so those checks remain open.
- Platform status remains **pre-alpha / Phase 7**. No V1 tag, release, or Phase 8 redesign start is claimed.

## Latest verified checkpoint — current-main host deploys and Cloudflare trigger test (2026-11-09 16:12 UTC)

- Current main: [`97094ed0cb79f65b0e93bf36d52a2520846e6f1b`](https://github.com/pooya-labs/pooya-labs-platform/commit/97094ed0cb79f65b0e93bf36d52a2520846e6f1b). PR #39 merged through the normal ruleset path; its only application source delta is one explanatory comment in `apps/platform/vite.config.ts`. Repository CI [42651297246](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297246) passed.
- GitHub Pages deploy [42651297113](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297113) passed Build and Deploy on exact main `97094ed0`; artifact `13690386196`; canonical URL [https://pooya-labs.github.io/pooya-labs-platform/](https://pooya-labs.github.io/pooya-labs-platform/).
- Cloudflare Pages deployment `a075e139-20d1-4587-91a9-b73904499065` passed queue/initialize/clone/build/deploy from exact main `97094ed0`; unique URL [https://a075e139.pooya-labs-platform.pages.dev/](https://a075e139.pooya-labs-platform.pages.dev/), canonical alias [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/). Trigger type is `ad_hoc` because it was created through the authorized Cloudflare API.
- The native Cloudflare Git-push test did not pass: matching-path PR #39 merged, but Cloudflare did not create a `github:push` deployment; before manual fallback, the latest remained deployment `76da3cc2`. Project settings still show GitHub source, `main`, production deployments enabled, and the matching `apps/platform/**` path filter. Root cause is not confirmed; don't represent Git auto-deploy as working.
- GitHub Cloudflare workflow [42651297288](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297288) credential check succeeded, but actual deploy job was skipped because `CLOUDFLARE_API_TOKEN` is absent. No token, App installation, permissions, or Cloudflare settings were changed.
- Browser QA [42651297251](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297251) passed 18/18 routes, 36/36 viewports, zero failures, zero confirmed axe violations; artifact `13690630887`. p75 LCP 228/284/384 ms (local/Pages/Cloudflare), CLS 0.000 across all three.
- The current Cloudflare manifest contains 106 files including `robots.txt` and `sitemap.xml`. The multi-host build contract verifies 17 sitemap URLs and correct host-specific robots Sitemap targets. Direct public response bodies and authenticated external crawler/cache behavior are still pending.
- Rollback is documented but not rehearsed. Manual contrast, keyboard/screen-reader, physical device, owner content/media, and privacy gates remain open. The platform is **pre-alpha / Phase 7**, not V1.

## Previous checkpoint — governance PR path and eight-project source audit (2026-11-09)

- Active ruleset [Protect main — PR + CI](https://github.com/pooya-labs/pooya-labs-platform/rules/26861856) was verified and exercised: PR #36 passed both required contexts and merged normally as `82f975a`; no direct push or bypass actor was used. Post-merge main Repository CI [42643318377](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42643318377) passed.
- PR #36 head `2b56ce1` passed Repository CI [42642712582](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42642712582) and Browser QA [42642712314](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42642712314). Browser QA: 18/18 routes, 36/36 viewports, zero failures, zero confirmed axe violations; 36 incomplete contrast checks remain human review. Artifact [13685757493](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42642712314/artifacts/13685757493).
- The eight independent project repositories were rechecked read-only at their current `main` heads; exact SHAs, changed paths, known open blocker, and check/deployment evidence are in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). No independent repo was modified.
- GlobalCart's current main `1c3d27f` is deployed on its exact head; live-catalog, live-visual, and Lighthouse checks passed. This supersedes the previous pending-deployment note.
- AetherFlow PR #14's comparator hardening merged and its exact main-head checks passed; matching-runner benchmark evidence remains open.
- ORBIT PR #138 remains open. Main CI passed on its PR head, and patched amd64/arm64 candidates built, but the deferred upstream Keycloak scan still fails on HIGH CVE-2026-102554 in Guava 33.6.0-jre. Do not present the candidate as published or production-ready.
- The platform remains **pre-alpha / Phase 7**. Owner content approval, manual accessibility, physical-device, social crawler, and host rollback gates remain open; no V1 release is claimed.

## Latest verified governance checkpoint — active main ruleset (2026-11-09)

- The active repository ruleset [Protect main — PR + CI](https://github.com/pooya-labs/pooya-labs-platform/rules/26861856) targets only `refs/heads/main`. It requires a PR and the exact GitHub Actions checks `Typecheck, three-target build, and contract tests` and `Chromium responsive and keyboard smoke`; strict status checks are enabled.
- Deletion and non-fast-forward updates are blocked; required approvals are zero for the single-maintainer workflow; the bypass list is empty and the API reports `current_user_can_bypass: never`.
- GitHub reports `main` as protected under the ruleset. Classic branch-protection `protection.enabled` remains false because this is a repository ruleset, not classic branch protection.
- The current repository connection successfully created a new topic branch after ruleset activation. The in-progress docs-only PR verifies branch writes, PR creation, both required checks, and the standard merge path. No direct push to `main` is attempted.
- The dedicated GitHub App proof remains complete: PR #34 was created by `pooya-labs-capture-publisher[bot]`, passed Repository CI and Browser QA, and merged as `42d12a1`. The capture publishers still have no changed-image PR because approved files were already current; no screenshot publication is claimed.
- Post-merge Repository CI [42639648418](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42639648418) passed on `c65fb4d`.
- The platform remains **pre-alpha / Phase 7**, with no V1 release. Manual accessibility, device, owner content/media, external social-crawler, deployment/rollback, and Phase 8–10 gates remain open.

## GitHub App PR creation verified — smoke PR merged (2026-11-09)

- The dedicated `Pooya Labs Capture Publisher` GitHub App completed the manual permission smoke run [42637851827](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42637851827) successfully. Token creation, marker preparation, App-authenticated branch push, PR creation, and the final PR URL assertion all passed.
- The App-created PR [#34](https://github.com/pooya-labs/pooya-labs-platform/pull/34) was authored by `pooya-labs-capture-publisher[bot]` on `automation/app-publisher-permission-smoke`. Its only changed path was `.github/app-publisher-smoke/latest-run.md` (8 additions, 0 deletions); no product code, screenshots, public assets, independent repositories, credentials, or deployments changed.
- On the exact PR head `e4611d83790be419c03d6b3149bfbeb666144ff5`, Repository CI [42637894225](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42637894225) and Portfolio Browser QA [42637894236](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42637894236) both completed successfully. The Browser QA job completed responsive, route, metadata, keyboard, and local/GitHub Pages/Cloudflare Pages performance steps; report artifact: [13682859892](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42637894236/artifacts/13682859892).
- PR #34 was squash-merged as [`42d12a1`](https://github.com/pooya-labs/pooya-labs-platform/commit/42d12a16354b4fae2d88258c523401fd091ce532). The marker file is present on `main`; the main branch endpoint confirms this commit is the current HEAD.
- The App's **branch-push and PR-creation permission path is now proven**. This is a safe permission smoke test, not a changed screenshot publication; all three real capture publishers previously found no image diff, so no product image PR or image publication is claimed.
- Main governance remains open: `main` is reported `protected: false`, branch protection is disabled, required status contexts are empty, and the repository Rulesets API returns zero rulesets. The observed required check names are `Typecheck, three-target build, and contract tests` and `Chromium responsive and keyboard smoke`.
- Next owner action: create and test an active `main` ruleset that requires PRs and both checks, blocks force pushes and deletion, and has no App bypass. Keep required approvals at zero while this remains a single-maintainer repository; personally inspect and merge each PR. Test that pending/failed checks block merging.
- Existing manual contrast, screen-reader, keyboard, physical-device, owner content/media, social-crawler, deployment/rollback, and later phase gates remain open. The platform remains **pre-alpha / Phase 7**; no V1 tag or production-readiness claim is made.

## Previous checkpoint — smoke harness merged before owner dispatch (2026-11-09)

- PR [#32](https://github.com/pooya-labs/pooya-labs-platform/pull/32) merged as [`7e2e5a2`](https://github.com/pooya-labs/pooya-labs-platform/commit/7e2e5a2ff0e43f46e125e5c63db2d453e9b6bf0c).
- Added [GitHub App Publisher Permission Smoke](https://github.com/pooya-labs/pooya-labs-platform/actions/workflows/app-publisher-smoke.yml). It is manual-only, requires dispatch from `main`, uses the dedicated repository-scoped App token, and stages only `.github/app-publisher-smoke/latest-run.md`. It does not touch app source, product screenshots, public assets, customer data, credentials, or deployment.
- PR CI [42635400246](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400246) passed **112/112 tests**; Browser QA [42635400130](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400130) passed 18/18 routes and 36/36 viewports, zero failures and zero confirmed axe violations; 36 contrast checks remain manual. Twenty performance samples per host completed with no failures; artifact [13683600592](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400130/artifacts/13683600592).
- Post-merge main CI [42635961927](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635961927) passed on exact main `7e2e5a2`.
- **Historical next step at this checkpoint:** dispatch the smoke harness and verify App-authenticated PR creation. This was completed by PR #34 as recorded in the latest checkpoint above.
- The repository workflow inventory now contains 11 files. The main branch remains unprotected with zero rulesets; the platform remains **pre-alpha / Phase 7**, with no V1 tag or public app deployment claimed.

## Dedicated GitHub App activation and publisher smoke verification (2026-11-09)

- The owner confirmed the dedicated `Pooya Labs Capture Publisher` App is installed only on `pooya-labs/pooya-labs-platform` and both private Actions secrets are configured.
- All three manual dispatches completed successfully: ORBIT interface captures [42631761203](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42631761203), portfolio captures [42632714049](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42632714049), and full-page captures [42632732364](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42632732364).
- All three passed approval-manifest and image-integrity checks, detected both secrets, and successfully created a short-lived GitHub App installation token scoped by the workflow to this repository.
- Each PR action completed with `pull-request-operation = none` because the approved images already matched their committed destinations. No automation branch or PR was created, and no images were changed or published.
- App credentials and token generation are verified. Actual App-authenticated branch push/PR creation and CI/Browser QA on such a generated PR remain unverified until a genuine owner-approved capture changes.
- Do not fabricate or modify image assets solely to force a PR. Keep the `main` ruleset inactive until a genuine changed-capture PR passes the required checks. The platform remains **pre-alpha / Phase 7**; no V1 tag or public app deployment is claimed.

## PR #28 merge checkpoint — publisher hardening before owner App activation (2026-11-09)

- PR [#28](https://github.com/pooya-labs/pooya-labs-platform/pull/28) merged to `main` as [`01749d7`](https://github.com/pooya-labs/pooya-labs-platform/commit/01749d717f6e31a1096cde91ff7773a9b58e1626).
- All three reviewed-capture publishers now use a single-repository, least-privilege GitHub App token to open/update PRs; default Actions token is read-only and checkout credentials are not persisted. No direct-push fallback remains.
- PR Repository CI [42624753678](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42624753678) passed. PR Browser QA [42624753816](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42624753816) passed 18/18 routes, 36/36 viewport checks, zero failures and zero confirmed axe violations. 36 color-contrast records remain incomplete for human review, not passed. Performance checks completed 20 samples each on local build, GitHub Pages and Cloudflare Pages with zero failures.
- Post-merge publisher runs all completed successfully in fail-closed mode: portfolio [42625390767](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390767), full-page [42625390703](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390703), reviewed interface [42625390732](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390732). All three skipped token creation and PR creation because the App secrets are not configured and confirmed no images were published or pushed to main.
- At this merge-time checkpoint, the App had not yet been installed and the two repository secrets were absent; the owner completed that setup in the later checkpoint at the top of this file. The main ruleset remains inactive, and a genuine changed-file App PR plus its required checks are still needed before claiming the complete publication path.
- Post-merge Repository CI [42625390685](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42625390685) passed on exact main `01749d7`.
- The public app bundle remains the prior GitHub Pages app commit `558970f`; this workflow-only merge did not deploy an application update.
- Platform remains **pre-alpha / Phase 7**. No V1 tag or production-release claim.

## Phase 7 source refresh and PR #24 merge — 2026-11-09

- PR [#24](https://github.com/pooya-labs/pooya-labs-platform/pull/24) merged to `main` as [`4482c96`](https://github.com/pooya-labs/pooya-labs-platform/commit/4482c96c6a6a8ec2548c8f37210c2f4674f617b2). Merged-main Repository CI [42621840105](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42621840105) passed the typecheck, GitHub Pages and Apps Script builds, Cloudflare build, dependency audit, credential scan, and repository contract tests.
- PR Browser QA [42526817146](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526817146) passed 18/18 routes and 36/36 viewports with zero failures and zero confirmed axe violations. Its 36 incomplete records are all color-contrast reviews that axe could not compute because of pseudo-elements, gradients, overlays, or non-text-only content. They remain manual review items, not passes. The run is on PR head `9f91535`, not on the merged main SHA; no merged-main Browser QA rerun was observed.
- PR #24 was documentation/state-only. It did not change application bundles or public deployments. The last confirmed GitHub Pages deployment remains run [42526088212](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088212) on application commit `558970f`. Cloudflare publishing remains skipped without `CLOUDFLARE_API_TOKEN`; Apps Script publishing remains skipped without `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID`.
- The latest read-only upstream source recheck is recorded in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). AetherFlow main advanced to `cc56560`; GlobalCart main advanced to `ffc51c7` with a catalog-only change not yet observed in a Pages deployment; ORBIT PR #138 advanced to `37ec149`, with its patched candidate matrix passing both architectures but the upstream image scan still failing on Guava 33.6.0-jre / CVE-2026-102554.
- The platform remains **pre-alpha / Phase 7**. Main governance, human contrast/device acceptance, source/deployment parity, owner content approvals, Phase 8 redesign, Phase 9 integration, and Phase 10 V1 gates remain open. No V1 tag or release was created.

## Post-merge verification — Pooya Monogram owner identity (2026-11-09)

- PR [#20](https://github.com/pooya-labs/pooya-labs-platform/pull/20) merged as [`558970f`](https://github.com/pooya-labs/pooya-labs-platform/commit/558970fefad25fa16632a8d740eb1a7a32c8f3bd).
- Main Repository CI [42526088297](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088297) passed: 110 contract tests, zero failures, typecheck, all three build targets, dependency audit, and credential scan.
- Merged-main Browser QA [42526088326](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088326) passed **18/18 localized routes**, **36/36 viewports**, zero confirmed axe violations, and zero failures. Axe still reports **36 incomplete rule checks**; these are not passes and remain in the manual contrast/accessibility review.
- GitHub Pages run [42526088212](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088212) deployed the exact `558970f` commit and reported success at https://pooya-labs.github.io/pooya-labs-platform/.
- Cloudflare workflow [42526088253](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088253) skipped its production publish because `CLOUDFLARE_API_TOKEN` is absent. Apps Script workflow [42526088224](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088224) skipped the actual Web App publish because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are not configured. No deployment to those two targets is claimed for this commit.
- Pooya Monogram / پویا مونوگرام is now the named owner identity on the homepage and all bilingual case-study footers, the English and Persian README ownership blocks, and Person/Brand structured metadata; Pooya Goodarzi is credited as creator and maintainer.
- The owner confirmed the platform identity only. The release remains **pre-alpha** in Phase 7; no V1 tag or release was created. The full-site owner/device/accessibility review, governance hardening, content approvals, Phase 8 redesign, Phase 9 project integration, and Phase 10 release gates remain open.

## Post-merge verification — GitHub governance audit (2026-11-09)

- PR [#22](https://github.com/pooya-labs/pooya-labs-platform/pull/22) merged to `main` as [`a009b4c`](https://github.com/pooya-labs/pooya-labs-platform/commit/a009b4c65b8ea964b4b43f39ed636f86d56ffe33).
- PR Repository CI [42524475237](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475237) passed on PR head `40bd71b5de28f1af6176679e4c64b18772a2730e). Browser QA [42524475250](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475250) also passed responsive/routes/metadata/keyboard checks and cold-route measurements on the local build, GitHub Pages, and Cloudflare Pages. Report artifact: [13634757460](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475250/artifacts/13634757460).
- Post-merge main Repository CI [42524729014](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524729014) passed on the exact merged commit.
- This was documentation and project-state maintenance only. No application bundle, public deployment, branch setting, ruleset, Actions secret, or independent project repository changed.
- At the time of the earlier governance audit, the three reviewed-capture publishers still wrote directly to `main`. PR #28 has since removed those direct writes; `main` remains unprotected and the App-backed publisher still needs owner credentials. See [GITHUB-REPOSITORY-GOVERNANCE.md](GITHUB-REPOSITORY-GOVERNANCE.md).

## GitHub workflow and repository-governance audit — 2026-11-09

- Audited all ten `.github/workflows/*.yml` files on main revision `659189dd99af59154cbfd88ce5f9dcecb23e1e0e`.
- Validation and capture workflows declare `contents: read`; GitHub Pages declares only `contents: read`, `pages: write`, and `id-token: write`; the three reviewed-capture publishers declare `contents: write` and `actions: read`. No `actions: write`, `pull_request_target`, or `workflow_run` permission/trigger was found.
- GitHub reports `main` as unprotected (`protected: false`, `protection.enabled: false`), with no required status contexts. The repository has no rulesets. This is a governance blocker, not a failed CI result.
- Main Repository CI [42523193131](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42523193131) passed the exact `659189d` head. The latest observed Browser QA [42522600586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600586) passed on PR #18.
- At this historical audit checkpoint, the three capture publishers still pushed verified assets directly to `main`. PR #28 has since replaced that design with repository-scoped GitHub App PR creation and a fail-closed pause when App secrets are absent. The real App installation and `main` ruleset remain open owner-side gates. See [GITHUB-REPOSITORY-GOVERNANCE.md](GITHUB-REPOSITORY-GOVERNANCE.md).
- No branch setting, secret, application source, public bundle, or deployment was changed in this audit.

## Owner identity and monogram attribution — 2026-11-09

- Applied Pooya's explicit platform-brand instruction: **Pooya Monogram / پویا مونوگرام** is the displayed project-owner identity, paired with the existing centered black-tile logo. The signature is shared by the homepage and all bilingual case-study footers, both README language sections, and Person/Brand structured metadata.
- **Pooya Goodarzi** is credited as creator and maintainer. No independent project repository or third-party product ownership attribution was changed.
- Added a route-level Browser QA assertion and a repository contract test for the owner name, logo asset, bilingual wording, and metadata. Merged-main Browser QA [42526088326](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088326) confirmed **18/18 routes, 36/36 viewports, zero confirmed axe violations, zero failures**; 36 incomplete axe checks still require manual review.
- This confirms platform brand identity only. Phase 7 remains active; it does not approve the complete portfolio, project copy/media, or the remaining release gates. No V1 tag or release is authorized.

## Post-merge verification — source audit and owner packet (2026-11-09)

- PR [#18](https://github.com/pooya-labs/pooya-labs-platform/pull/18) merged to `main` as commit [`23f1689`](https://github.com/pooya-labs/pooya-labs-platform/commit/23f16896624ef391e284d3579a7f7278f5c8cbaf).
- PR Repository CI [42522600509](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600509) passed. Browser QA [42522600586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600586) passed responsive/routes/metadata/keyboard checks and cold-route measurements on local, GitHub Pages, and Cloudflare Pages. The merged-main Repository CI [42522790018](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522790018) also passed.
- The merged change is documentation and contract-test maintenance only. The portfolio application bundle and both public deployments were not changed by this PR.
- The source audit and owner-review packet remain preparation, not approval. Phase 7 remains active and all eight Pooya Labs project review states remain `needs-owner-review`.

## Latest checkpoint — upstream source refresh and owner-packet correction (2026-11-09)

- Refreshed the read-only branch-head, release, and open-PR inventory for all eight independent projects in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). No upstream repository was modified.
- Corrected the bilingual owner packet's GlobalCart label to the published stable portfolio/demo release **v1.0.0**. Current-main docs confirm the owner completed real desktop/mobile, actual platform screen-reader, and full human RTL/LTR review on 2026-11-08; the exact device/browser matrix was not recorded. Physical tablet and eligible field Core Web Vitals remain unverified.
- GlobalCart merged-main Browser E2E [42516946135](https://github.com/pooya-labs/globalcart/actions/runs/42516946135) passed **163 tests / 9 intentional skips / 0 failures**. Current-main deployment [42521324455](https://github.com/pooya-labs/globalcart/actions/runs/42521324455), Security [42521324428](https://github.com/pooya-labs/globalcart/actions/runs/42521324428), Lighthouse [42521506954](https://github.com/pooya-labs/globalcart/actions/runs/42521506954), visual QA [42521507125](https://github.com/pooya-labs/globalcart/actions/runs/42521507125), and catalog smoke [42521507117](https://github.com/pooya-labs/globalcart/actions/runs/42521507117) passed. PR #23 was closed without merge; closeout facts are present on main commit `220b216`.
- AetherFlow main is `dc1edea3946e`. The owner confirmed the live Apps Script Sheet write/reload/read test; Browser QA [42521608664](https://github.com/pooya-labs/aetherflow/actions/runs/42521608664) passed 12 tests. The checked-in `pending`-state correction still requires manual redeployment of the Apps Script Web App; it is not auto-synced from GitHub. Pages [42522116708](https://github.com/pooya-labs/aetherflow/actions/runs/42522116708) passed; latest Rust CI and supply-chain runs [42522117027](https://github.com/pooya-labs/aetherflow/actions/runs/42522117027) and [42522117055](https://github.com/pooya-labs/aetherflow/actions/runs/42522117055) were in progress at inspection.
- ORBIT PR [#138](https://github.com/pooya-labs/orbit/pull/138) remains open. Its CI-only Keycloak candidate build and repository Security checks passed, but the strict production-image scan [42521243847](https://github.com/pooya-labs/orbit/actions/runs/42521243847) still fails; no candidate deployment is claimed.
- Platform main baseline before this documentation update was `8ae608342aaf`; Repository CI [42520197557](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42520197557) passed. The source refresh and owner-packet correction remain docs/test-only. No platform application code or public deployment changed.
- Phase 7 remains active. Manual contrast/keyboard/screen-reader review and physical Android review for the Pooya Labs platform itself, social crawler validation, current Pages-source confirmation, Cloudflare Actions secret, rollback rehearsal, and owner content/media decisions remain open. All eight portfolio project review states remain pending.

## Latest verified checkpoint — bilingual owner review packet prepared (2026-11-08)

- Added [`docs/OWNER-REVIEW-PACKET.md`](OWNER-REVIEW-PACKET.md), a bilingual snapshot of the current homepage headline/introduction/About copy, language/theme defaults, project order, source-backed status and role wording, public contact links, media inventory, disclosure boundaries, and the empty Novels decision.
- The packet explicitly records the AetherFlow individual-contribution limitation and Salon Booking's separate product owner; it preserves the simulation/synthetic-data, connection-required, privacy, and owner-permission boundaries for each relevant project.
- The packet is a review aid, not approval. All eight project registry entries remain `needs-owner-review`; Salon Booking permission, personal media approval, and the Novels content decision remain open.
- PR [#16](https://github.com/pooya-labs/pooya-labs-platform/pull/16) is merged as [`aca57350`](https://github.com/pooya-labs/pooya-labs-platform/commit/aca573500192f8581896bde10e68ef82c0ca2256). Latest-head Repository CI [42519333195](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519333195) passed with **105/105** tests; Browser QA [42519333196](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519333196) passed **18/18 routes**, zero failures, and zero confirmed Axe violations. **36 incomplete contrast checks** remain for manual review.
- Mainline after PR #15 is healthy: Repository CI [42518373614](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42518373614), Browser QA [42518373619](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42518373619), and GitHub Pages [42518373632](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42518373632) all passed. The Cloudflare Actions deploy job in [42518373586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42518373586) skipped at its credential gate; the prior authorized Cloudflare production deployment remains recorded separately.
- The packet completes preparation only. Owner content approval, manual accessibility/device checks, social crawler verification, deployment automation, and rollback rehearsal remain open.

## Latest verified checkpoint — tracked-source and public-bundle credential scan (2026-11-08)

- Added `scripts/secret-scan.mjs` and the root command `npm run security:secrets`; Repository CI runs it after both static hosting bundles are built.
- The scanner inspects tracked UTF-8 text, `dist/pages`, and `dist/cloudflare`; it checks high-confidence private-key/provider-token patterns, quoted credential assignments, and sensitive credential filenames. Matched values are never printed.
- Repository CI [42519574691](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519574691) passed on main commit `aca573500192`: `npm audit` reported **0 vulnerabilities**, all three build targets passed, the credential scan reported **no recognized matches**, and **105/105** contract tests passed.
- Scanner limitations are recorded in [SECURITY-MODEL.md](SECURITY-MODEL.md): no binary-content or Git-history scan, and only recognized high-confidence patterns are detected. Broader security review and manual public/private asset checks remain open.
- PR [#15](https://github.com/pooya-labs/pooya-labs-platform/pull/15) contains the implementation and tests; browser QA is being run independently. No application runtime, deployment, or project repository was changed by this security task.

## Latest verified checkpoint — monogram asset, current source audit, and host-specific QA (2026-11-08)

- Latest application asset revision: [`41ea1004433196aa81e4e50b17a1620f110ecea8`](https://github.com/pooya-labs/pooya-labs-platform/commit/41ea1004433196aa81e4e50b17a1620f110ecea8), which adds the centered rounded black-tile Pooya Labs monogram asset. GitHub Pages workflow [42514976384](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976384) passed build and deployment for this revision.
- Repository CI [42515288490](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42515288490) passed on current `main` documentation head `a37de4cf21bc5e41f8fca9ea08ba6d6dfd350b67`: dependency audit, lint, format, TypeScript, all three build targets, and repository contract tests.
- Browser QA [42514976406](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406) passed on application asset revision `41ea1004`: 18/18 routes, zero failures, zero confirmed Axe violations, and 36 incomplete color-contrast checks retained for manual review. Report artifact: [13631024148](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406/artifacts/13631024148).
- The latest Browser QA run collected 20 cold-context samples per host. p75 CLS was **0.0000** on the local build, GitHub Pages, and Cloudflare Pages. p75 LCP was **316 ms** locally, **400 ms** on GitHub Pages, and **400 ms** on Cloudflare Pages; detailed figures and measurement limits are in [PERFORMANCE-BUDGET.md](PERFORMANCE-BUDGET.md).
- **Production host parity is verified:** GitHub Pages is deployed from application asset revision `41ea1004`. Cloudflare production deployment [`107de2a2`](https://107de2a2.pooya-labs-platform.pages.dev/) (ID `107de2a2-d69c-4b9d-ae2c-38da68c7bad4`) was built from current main commit `a37de4cf` and all five Cloudflare deployment stages completed successfully; that commit includes the same `41ea1004` application asset. The GitHub Actions Cloudflare publishing workflow still needs the private `CLOUDFLARE_API_TOKEN` secret for repeatable automated publishing.
- Apps Script workflow [42514976476](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976476) completed its credential-check job but skipped the production publish job because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are absent. The static portfolio remains independent of this optional deployment.
- The upstream source audit now records the exact 2026-11-08 main heads for all eight projects. Seven latest commits only update bilingual ownership artwork; GlobalCart adds desktop/mobile storefront screenshots. No independent project repository or project application code was modified in this checkpoint.
- The project remains **pre-alpha**. Human contrast/keyboard/screen-reader review, physical Android acceptance, external social-crawler validation, rollback rehearsal, owner content/design approval, and repeatable GitHub Actions Cloudflare publishing remain open.

## Release sequence decision — 2026-11-08

Pooya requested a strict final-stage order. The roadmap now reserves **Phase 8 for the complete redesign and its two owner approval rounds (penultimate stage)**, then **Phase 9 for full portfolio-level integration of all eight projects (last stage before publication)**, followed by **Phase 10 for V1 release**. Work is currently confined to Phase 7 readiness; final project media/content integration must not be pulled forward.

- Phases 4–6 are closed for current V1 scope by explicit decisions: no owner CMS/customer accounts, direct contact links instead of a backend form, and no heavy embedded demos until Phase 9.
- All eight independent repositories have newer source commits since the previous audit. Their latest observed changes and SHAs are recorded in PROJECT-CONTENT-AUDIT.md; this is an evidence baseline, not final acceptance. No upstream repo was modified.
- Phase 7 will close remaining autonomous engineering, source verification, accessibility, performance, security, crawler, deployment, recovery, and owner/device-readiness tasks before the redesign starts.
- The site remains pre-alpha. Neither the redesign nor final project integration is approved or completed.

## Latest implementation checkpoint — repository quality conventions (2026-11-08)

- Added dependency-free JavaScript syntax/debugger checks and source/config formatting checks; these do not add runtime or development dependencies.
- Added `.editorconfig`, root npm commands `lint` and `format:check`, and required both checks in Repository CI.
- Added [CONTRIBUTING.md](../CONTRIBUTING.md) and [RELEASE.md](RELEASE.md) to standardize local validation, commit/PR expectations, deployment evidence, and V1 restrictions.
- Merged as [PR #12](https://github.com/pooya-labs/pooya-labs-platform/pull/12), commit [`1746c11`](https://github.com/pooya-labs/pooya-labs-platform/commit/1746c11ee87fba4a37ea8fff0f548cb832fe4b22).
- Repository CI [42504771438](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42504771438) passed both new quality checks, TypeScript, all three build targets, and the contract suite. Browser QA [42504771467](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42504771467) also passed (report artifact [13627206292](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42504771467)).
- This is tooling/documentation-only; the public UI and deployed application revision are unchanged. Pre-alpha remains the accurate release label.
- Physical Android review, owner design/content approval, and human accessibility acceptance remain open.

# Project Status

**Last updated:** 2026-11-09  
**Repository:** pooya-labs/pooya-labs-platform  
**Branch:** main  
**Current phase:** Phase 7 — Pre-redesign readiness and engineering closeout  
**Release:** Pre-alpha / portfolio draft

## Previous checkpoint — accessibility semantics and Cloudflare production before PR #13 (2026-11-08)

- Added a valid `role="group"` to the homepage proof statistics container, preserving its descriptive label. The latest axe report no longer contains the four repeated `aria-prohibited-attr` incomplete findings.
- Removed an obsolete header pseudo-element and made the header base color opaque in both themes while preserving its frosted blur. Gradient-backed hero text still prevents axe from calculating definite contrast values.
- Repository CI [42502717615](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717615) passed TypeScript, all three builds, and 93/93 contract tests.
- Browser QA [42502717608](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717608) passed 18/18 routes and 36/36 viewport checks, with zero failures and zero confirmed axe violations. All 36 incomplete records are color-contrast checks on gradient/pseudo backgrounds; manual review remains open.
- GitHub Pages deployment [42502717618](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717618) passed.
- Cloudflare deployment [`a1a69456`](https://a1a69456.pooya-labs-platform.pages.dev/) (ID `a1a69456-fc5a-4ac3-917b-f5cb0cb909a5`) from main commit `c7a86a2e2f54d157b7e0b806c9c022afd41fd208` completed with successful `build` and `deploy` stages.
- The GitHub Cloudflare deployment workflow [42502717616](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717616) passed its credential-check job but skipped production publishing because `CLOUDFLARE_API_TOKEN` is absent. Cloudflare's source settings show the GitHub `main` branch configured, but automatic push-to-production was not observed. The latest deployment was published explicitly through the authorized Pages API; automatic publishing is not yet verified.
- Physical Android review, owner motion/content approval, and human accessibility acceptance remain open. The project remains pre-alpha.



## Latest verified checkpoint — Node 24 Actions runtime migration (2026-11-08)

- Updated all 10 repository workflows to current maintained action majors: checkout v7, setup-node v7, upload-artifact v7, upload-pages-artifact v5, and deploy-pages v5. The exact current minor releases are recorded in CHANGELOG.md.
- Verified the updated checkout, setup-node, upload-artifact, and deploy-pages action manifests use Node 24. The latest successful Repository CI log contains no Node.js 20 deprecation warning.
- Repository CI [42501048926](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42501048926) passed TypeScript, all three build targets, and 92/92 contract tests.
- Browser QA [42501048917](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42501048917) passed 18/18 routes and 36/36 desktop/mobile viewport checks, with zero failures and zero confirmed axe violations. Forty axe checks remain incomplete and are not counted as passed.
- GitHub Pages [42500830187](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42500830187) passed using the updated deployment actions.


## Latest verified checkpoint — Cloudflare production parity (2026-11-08)

- Corrected the stale Cloudflare Pages production host by publishing main commit `a0bac438d377571d0a2c2a6a7c46bee8bd7cf746` to deployment [`efa5ecb4-356d-4112-be60-31401506d940`](https://efa5ecb4.pooya-labs-platform.pages.dev/). Cloudflare confirmed successful `build` and `deploy` stages.
- The canonical Cloudflare alias is [https://pooya-labs-platform.pages.dev/](https://pooya-labs-platform.pages.dev/).
- Cloudflare's project settings show GitHub source, `main` as the production branch, and app-source path filters `apps/platform/**` and `package.json`, with preview deployments disabled. However, automatic deployment on a push was not observed.
- The GitHub Actions `CLOUDFLARE_API_TOKEN` secret is not configured; the explicit deploy job skipped in run 42502717616. Use the direct authorized Pages API until the secret is added and a push-triggered deployment is verified.
- Documentation-checkpoint CI [42498895229](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498895229) passed on `a0bac438d377571d0a2c2a6a7c46bee8bd7cf746`. The latest runtime Browser QA is [42498428681](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428681), with 18/18 routes and 36/36 viewport checks passed.
- A direct visual browser fetch of the public pages.dev host could not be verified by the available page inspector. Cloudflare's deployment API does confirm the production publish stages succeeded.


## Latest verified checkpoint — homepage Projects Android visibility (2026-11-08)

- Latest verified `main` HEAD: `c7a86a2e2f54d157b7e0b806c9c022afd41fd208`; the current homepage Projects visibility fix is `2305f5a68f1148c8293f6e3b55746c01eb52d8f2`.
- Application fix commit: `2305f5a68f1148c8293f6e3b55746c01eb52d8f2`; final Browser QA harness/DOM-measurement commit: `5131660b0b3e0156ac350f6a9aafc648556fc814`.
- Root cause: the homepage Projects section, its heading, and its long list of project cards were hidden behind separate IntersectionObserver reveal gates. On mobile, the reveal conditions could leave the content at opacity zero. All three reveal gates were removed. The card visuals and their own animations remain intact.
- Browser QA now checks both default Persian and English homepage routes. It confirmed the Projects section, heading, and first card at opacity 1 on desktop and mobile in both languages, with all eight project-card animations active.
- Repository CI [42498428514](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428514) passed TypeScript, three build targets, and 92/92 contract tests. The current main checkpoint passed CI in [42502717615](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42502717615), with 93/93 tests.
- Browser QA [42498428681](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498428681) passed 18/18 routes / 36/36 viewports: zero failures, zero horizontal overflow, zero confirmed axe violations. Thirty-six axe contrast checks remain incomplete for manual review.
- GitHub Pages deployment [42498199551](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42498199551) passed on the application fix. Public site: https://pooya-labs.github.io/pooya-labs-platform/.
- Automated mobile checks use Chromium mobile emulation. Physical Android confirmation remains part of owner acceptance on both [GitHub Pages](https://pooya-labs.github.io/pooya-labs-platform/) and [Cloudflare Pages](https://pooya-labs-platform.pages.dev/).

## Latest verified checkpoint — product motion and mobile gallery (2026-11-08)

- Latest verified `main` HEAD: `b429828f0ed8f967317934fffed32daffa7b6a5f`. Documentation-only checkpoint CI [42496528868](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496528868) also passed on this exact HEAD: TypeScript, all three builds, 87/87 tests.
- Application motion and clean case-study hero commit: `714d4ea2ea017189886ddb4e0d2e386e19edcaf3`; browser QA harness update: `549c6a3c66eade850d175cddad3a7b7dea5466e8`.
- Eight case-study hero visuals are product-specific; the old generic orbit composition and static screenshot/monogram overlay were removed from the hero. Screenshots remain in the lower evidence gallery.
- The eight selected-project cards each have their own compact animated scene. Browser QA recorded running animations for all 8 cards at desktop and all 8 at mobile.
- Full-page mobile screenshot frames now allow native vertical touch scroll chaining. Chromium emulation passed on 16/16 localized project routes by verifying that the outer case-study page scroll position advances after the inner image reaches its lower edge.
- Repository CI [42496113019](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496113019) passed TypeScript, all three build targets, and 87/87 contract tests.
- Browser QA [42496014812](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014812) passed 17/17 localized routes and 34/34 desktop/mobile viewport checks: zero failures, zero horizontal overflow, and zero confirmed axe violations. Thirty-six axe rule checks remain incomplete and need manual review.
- Private visual QA artifact: [13623776195](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014812). It includes desktop/mobile route captures and homepage project-grid captures at both viewport sizes.
- GitHub Pages [42496014762](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42496014762) passed build and deployment for the final application checkpoint. Public site: https://pooya-labs.github.io/pooya-labs-platform/.
- Physical Android confirmation is still pending. Desktop Chromium touch emulation is useful regression evidence but is not a substitute for checking an actual Android device/browser.
- No independent project repository was modified.

## Remaining Phase 7 / Phase 8 blockers

- Pooya must review the latest deployed portfolio on real desktop, mobile, and Android hardware, then approve the full visual redesign and project-card/case-study motion.
- Owner content approval remains open for biography/positioning, featured-project order, personal contribution statements, public project statuses, and contact details.
- Manual accessibility acceptance remains open: inspect the 36 incomplete axe checks and manually verify color contrast, focus visibility, keyboard-only operation, and screen-reader flow in both languages and themes.
- External LinkedIn/Facebook social-crawler rendering and cache-refresh validation for the 17 PNG social cards remains open.
- Phase 8 performance/security/privacy/recovery checks and deployment rollback rehearsal remain open.
- No V1 tag or production-readiness claim is authorized.

## Previous verified checkpoints

## Owner instruction — use the live site as the redesign baseline (2026-11-11)

Pooya clarified the review workflow after rejecting the first Phase 8 preview as broken:

- The prior preview branch `phase-8/prototype-a-obsidian-editorial` applied a broad isolated visual-system layer and is **not** the working base for incremental corrections. Do not ask Pooya to review that preview or continue applying his focused instructions there.
- The new working branch `redesign/live-site-baseline` was created directly from the exact current `main` commit `f42e9bd889636b87b7deb774b085f3a90ffbd3f4`. Its site implementation is the current production code, without the Phase 8 prototype stylesheet.
- Apply each owner instruction as a focused change on this baseline branch, preserving the existing website and its behavior.
- After each instruction, publish a Cloudflare Pages **preview** from the current branch head and give Pooya that live preview URL so he can inspect it and report the next correction.
- Publishing the preview requires a deployment build; this is not permission to run a separate test/QA cycle. Do not run CI, test suites, browser QA, screenshot review, performance checks, or a debugging pass between instructions.
- Start the full validation and debugging phase only after Pooya explicitly says **“بازطراحی پایان یافت”**. Do not merge to `main`, publish production, or label the redesign complete before his approval.

### First focused correction on the clean baseline

Updated `apps/platform/src/portfolio.css` to improve light-theme contrast for the existing animated capability/topology preview, system-flow wires, craft-motion miniatures, case-study motion scenes, and project-card motion previews. Kept the existing page layout, components, keyframes, animation timing, and movement. No tests or visual QA were run.

## 2026-11-11 — Android and touch-first responsive correction

- Stabilized the public portfolio's internal scroll viewport on touch devices with `100svh`, avoiding layout-height changes as Android browser chrome expands and collapses while preserving the one-scroll-surface architecture.
- Restored native pinch zoom, kept vertical page scrolling and horizontal mobile navigation touch-friendly, and accounted for the top safe area on sticky headers.
- Flattened the layered hero preview cards on narrow touch screens while preserving their positions and slow motion; increased key control and link hit areas and prevented sticky touch-hover card transforms.
- Kept desktop layout and production/main unchanged. No tests, browser QA, or independent visual review were run; physical Android review remains part of the owner's final redesign acceptance.
- Preview-only iteration on `redesign/live-site-baseline`.

## 2026-11-11 — Mobile foundation radial animation composition

- Corrected the foundation animation below “The foundation behind every project.” on narrow screens.
- The mobile SVG now uses a centered 220%-width crop of the desktop radial field instead of fitting the full 1200×390 composition into a narrow phone viewport, which had compressed the visual.
- Kept the shared ray geometry, single bottom-center origin, origin halo/focal point, particles, gradients, and animation timing in sync with desktop.
- Limited the change to the foundation visual's mobile frame; desktop composition remains unchanged.
- Preview only. No tests, browser QA, or independent visual review were run.

## 2026-11-11 — Mobile foundation animation edge and lower fade

- Added dedicated left/right gradient overlays to the magnified mobile radial animation so the cropped rays dissolve into the section surface instead of ending at hard vertical edges.
- Removed reliance on the outer section's CSS mask for narrow screens. Its lower transition now uses a layered background gradient plus a composited bottom fade overlay, blending the foundation section into the page background.
- Added corresponding light-theme surface colors so the same fade remains continuous in both themes.
- Kept the shared desktop SVG, focal point, ray paths, particles, and animation timing unchanged. Desktop styling is untouched.
- Preview only; no tests, browser QA, or physical Android visual verification were run.

## 2026-11-11 — Restore desktop-style mobile foundation framing

- Removed the dark left/right surface overlays and the lower tinted overlay that made the purple radial artwork appear to darken before fading.
- Restored the foundation section's native desktop background and outer section mask on mobile.
- Kept the centered magnified mobile SVG crop, while using alpha-only horizontal edge fading combined with the existing top fade. The artwork now fades transparently into the section instead of being covered by a dark color.
- The shared SVG, focal origin, rays, particles, and animation timing remain unchanged. Preview only; no tests, browser QA, or physical Android visual verification were run.

## 2026-11-11 — Continuous lower fade on the mobile foundation animation

- Fixed the remaining visible seam at the bottom of the mobile radial scene by moving the fade into the visual frame itself.
- Extended the mobile frame below the unchanged 245px SVG and applied a continuous alpha fade across the frame's lower edge, beginning before the SVG's lower halo reaches the boundary.
- Kept the existing transparent side fades, desktop section mask/background, SVG paths, origin, rays, particles, and animation timing. Preview only; no tests or physical Android verification were run.
