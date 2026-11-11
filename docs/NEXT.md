## Next refinement — Workspace v2 owner review

- Review the new editorial workspace direction at desktop and narrow Android widths, in Persian/English and light/dark themes.
- Preserve all existing app interactions and backend boundaries. Defer broad QA until `بازطراحی پایان یافت`.
- Continue on `redesign/live-site-baseline`; no production merge/deploy.

## Next refinement — Workspace dashboard owner review

- Review the actual Workspace landing dashboard (not only the Files app) at desktop and narrow Android widths, in Persian/English and light/dark themes.
- Preserve all existing app launch, command palette, local preview, and RPC status behavior.
- Continue on `redesign/live-site-baseline`; do not merge or deploy Production. Defer broad QA until `بازطراحی پایان یافت`.

## Next refinement — My workspace redesign

- Review the redesigned Files app at desktop and narrow mobile widths, including Persian/English and light/dark themes.
- Keep sample/local storage labeling explicit; do not imply cloud sync or functional folder creation.
- Continue on `redesign/live-site-baseline`; no production merge/deploy. Defer broad QA until `بازطراحی پایان یافت`.

## Next refinement — mobile hero headline

- Check the wrapped English hero accent phrase on a narrow Android viewport when convenient; desktop styling is intentionally unchanged.
- Continue on `redesign/live-site-baseline`; defer broad QA until `بازطراحی پایان یافت`.

## Next refinement — social brand icon consistency

- Review the GitHub and Telegram brand marks in the hero, contact section, footer, and hydrated case-study footer.
- Keep the owner monogram and Instagram glyph as their own identity assets.
- Continue on `redesign/live-site-baseline` only; defer tests and broad QA until `بازطراحی پایان یافت`.

## Next refinement — AI engineering and design positioning preview

- Review the updated AI Engineer positioning, C++/Python language entries, seven skill groups / 65 items, UI/UX and motion-design emphasis, and explicit Rust + Tokio wording in AetherFlow.
- Keep AI focus-area labels distinct from verified project integrations; do not add model frameworks or production AI claims without repository evidence.
- Continue on `redesign/live-site-baseline` only; do not merge or deploy Production without explicit approval.
- Defer tests and broad QA until the owner says `بازطراحی پایان یافت`.

## Current preview ready for owner review

- Latest refreshed portfolio preview: `https://099b2bd5.pooya-labs-platform.pages.dev` (Cloudflare build and deploy succeeded on 2026-11-11).
- Review the six bilingual skill groups, seven completed project cards, AetherFlow's in-development state, and corrected project case studies.
- Continue all changes on `redesign/live-site-baseline`; do not merge to `main` or deploy Production without explicit owner approval.
- Defer tests and broad QA until the owner says `بازطراحی پایان یافت`.

## Next checkpoint — review refreshed portfolio copy and skills

- The current portfolio snapshot is 8 projects: ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, GlobalCart, and Salon Booking are complete; AetherFlow is the only active development project.
- The Skills section now lists 53 repository-backed technologies/capabilities across six bilingual groups. Treat the list as demonstrated project experience, not a self-rated proficiency scale.
- Check the updated project summaries and case-study details in the Cloudflare Preview. Any owner feedback should be applied directly to `redesign/live-site-baseline`.
- Keep production and `main` untouched. Defer tests, CI, accessibility sweeps, and broad QA until the owner says `بازطراحی پایان یافت`.

## Owner identity clarification — restore full name (2026-11-11)

- The `PROJECT OWNER` name must display the full identity: `POOYA GOODARZI` / `پویا گودرزی`, not the surname alone.
- Preserve the full creator byline exactly: `Created & maintained by Pooya Goodarzi` / `ایجاد و نگه‌داری: پویا گودرزی`.
- Preserve both copyright lines as `© 2026 POOYA GOODARZI · POOYA LABS` (year remains dynamic in the UI).
- Explicitly bind the full owner name and byline in the shared component so both homepage and case-study footer placements use the same complete text.
- Preview-only on `redesign/live-site-baseline`; no tests or QA run.



- Corrected the footer creator/maintainer byline to `گودرزی` / `Goodarzi` only; removed `پویا` / `Pooya` from that byline in both language modes.
- The primary footer name remains `Goodarzi`; layout, monogram artwork, and all other content remain unchanged.
- Preview-only on `redesign/live-site-baseline`; no tests or QA run.

## Latest owner correction — footer identity label (2026-11-11)

- Replaced the incorrect `پویا مونوگرام / POOYA MONOGRAM` footer name with `Goodarzi` in the shared owner-attribution component, covering both footer placements and both language modes.
- Kept the creator/maintainer byline and surrounding layout unchanged. No other page content or project branding was changed.
- Preview-only on `redesign/live-site-baseline`; no tests or QA run.

## Latest owner correction — use a real screenshot for the Salon Booking homepage card

- Capture the actual published Shayan Salon Booking homepage at the top of the page, not the lower/full-page booking flow and not an isolated hero artwork.
- The new 1440×1000 screenshot is stored at `apps/platform/public/interface-captures/salon-booking/salon-booking-home-hero.png` and is assigned only to Salon Booking's homepage-card `visualAsset`.
- Preserve the full-page desktop/mobile captures for the case-study detail. Keep all other project cards unchanged.
- Continue on `redesign/live-site-baseline`, deploy Preview only, and defer tests/QA until `بازطراحی پایان یافت`.

## Latest owner direction — redesign all remaining project-card mini-scenes

- Extend the successful AuraPulse and GlobalCart mini-scene redesign to all remaining homepage projects.
- Implemented compact product-specific visuals for AetherFlow (workflow execution), Orbit (service health / incidents / telemetry), Pooya OS (desktop / app launcher), Nexus Canvas (connected graph), LuminaGlass (refractive optical lab), and Salon Booking (appointment slots / confirmation).
- Keep all changes limited to homepage compact card windows. Preserve project detail pages and the existing card layout. Continue on `redesign/live-site-baseline`, publish Preview only, and defer QA until `بازطراحی پایان یافت`.

## Latest owner correction — AuraPulse and GlobalCart project-card motion

- AuraPulse must read as a multi-row market / paper-trading dashboard, not one row of bars with a decorative line. The mini scene now has BTC, ETH, and SOL rows, separate animated micro-bars, and a visible SIM marker.
- GlobalCart must read as an actual marketplace storefront. Its compact motion now shows search, category navigation, a cart count, and a three-item product grid.
- Keep the correction scoped to the compact homepage card windows. Continue on `redesign/live-site-baseline`, publish Preview only, and defer tests/QA until `بازطراحی پایان یافت`.

## Latest motion adjustment — rays start from the bottom edge

- The proof-section ray field now begins at one shared point near the bottom center (`y=382`), with the curves fanning outward earlier toward the upper edges.
- The focal halo and center dot follow that point; lower page fade remains below the origin on desktop and mobile.
- Continue using the current Preview branch only. Defer QA until `بازطراحی پایان یافت`.

## Latest refinement — single-point foundation animation origin

- Keep the lower origin of the foundation animation visually anchored at one clear point; the rays should fan outward from it.
- The old curved baseline is removed. The animation visual no longer fades out before its focal origin; only the outer section edge has a short, soft fade into the page.
- Continue owner-led visual iterations on `redesign/live-site-baseline`. No tests/QA until `بازطراحی پایان یافت`; Preview only.

## Corrected target — fade the whole foundation section edge

- The visible dividing line was the `.portfolio-proof` section's bottom border. That border is removed and the section's bottom edge is masked to fade into the page surface.
- The internal curved SVG baseline is restored to its earlier appearance; future changes should target the actual visual surface the owner identifies.
- Continue focused changes on `redesign/live-site-baseline`. No QA until `بازطراحی پایان یافت`; Preview only.

## Most recent owner correction — fade the foundation animation baseline

- The lower curved line beneath the animated foundation graphic now fades smoothly into the page instead of reading as a separate divider.
- Continue from the current live-site baseline branch and preserve every other part of the animation unless the owner requests a specific change.
- Keep all tests and QA deferred until `بازطراحی پایان یافت`; publish only Preview deployments after focused corrections.

## Active owner-led redesign iteration — capability visuals

- Current baseline: `redesign/live-site-baseline`, branched from the live `main` baseline; continue editing this branch only.
- Most recent correction: preserve and strengthen light-theme legibility for the three animated capability mockups directly below the capability heading.
- Continue applying each new owner instruction directly and publish a fresh Cloudflare Preview after each focused correction.
- Do not run tests, CI, Browser QA, accessibility sweeps, or broad visual review until the owner explicitly says `بازطراحی پایان یافت`.
- Preview deployment must remain Preview-only. Do not merge to `main` or deploy Production.

## Current next action — P8-01 owner selects a design direction (2026-11-10)

Pooya authorized Phase 8 design exploration. Review [PHASE-8-DESIGN-OPTIONS.md](PHASE-8-DESIGN-OPTIONS.md): A — Obsidian Editorial Systems (recommended), or B — Warm Editorial Gallery.

The full code redesign does not start until Pooya selects A or B. After selection, P8-02 produces the complete bilingual responsive prototype for owner review round one. The final review round follows revisions and includes physical-device confirmation.

Phase 7's outstanding human acceptance and publication tasks continue in parallel; they remain blockers for V1 and are not considered approved by opening Phase 8.

Latest baseline: [ORBIT fix and release commit](https://github.com/pooya-labs/pooya-labs-platform/commit/3888d0799afdf4c3bb702489b6f1fc22c98d1f3b), [GitHub Pages deployment](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42857733822), [post-merge Browser QA](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42857733886).

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

## Next work — Phase 7 readiness gates remain open

The next autonomous review item is the remaining portfolio-wide public/private binary-asset review. Salon Booking's two approved full-page images have now been re-opened and checked, but owner permission for portfolio publication is still pending; do not treat the capture review as publication approval.

Continue with the remaining human-only gates in dependency order: manual color-contrast evaluation of the 36 incomplete Axe checks; visible-focus, keyboard-only, and screen-reader acceptance in Persian/English and both themes; physical Android/browser review; Pooya's explicit review of biography, featured-project order, roles, media, and the empty Novels decision; authenticated LinkedIn/Meta cache-refresh checks; deployment-secret remediation only through owner action; and a controlled rollback rehearsal only after explicit approval.

Keep the platform in pre-alpha / Phase 7. Do not begin the full Phase 8 redesign, Phase 9 project integration, or Phase 10 V1 publication until the applicable gates close.

## Latest checkpoint — P7-29 complete; AetherFlow homepage project card uses its product screenshot (2026-11-10)

PR [#57](https://github.com/pooya-labs/pooya-labs-platform/pull/57) merged to `main` as [`b137104`](https://github.com/pooya-labs/pooya-labs-platform/commit/b1371043199937f26d717c0518052f32d3f54758). The AetherFlow card in the homepage Projects section now shows its approved desktop product-interface capture instead of its logo. The screenshot remains pinned to capture commit `eba5e2d02047375ae8a42514f7bbb58c75106ba7` and is top-aligned within the landscape card frame. The bilingual product case-study hero is unchanged.

PR-head CI [42802061254](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802061254) and Browser QA [42802061224](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802061224) passed; post-merge main CI [42802822245](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802822245), Browser QA [42802822186](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802822186), and GitHub Pages deployment [42802822225](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802822225) passed. The browser regression now checks that the AetherFlow homepage card image actually decodes in both languages and on desktop/mobile viewports.

Cloudflare production deployment was skipped after credential preflight in run [42802822176](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802822176), and Apps Script publishing was skipped after configuration preflight in run [42802822508](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42802822508). GitHub Pages is the published host for this change.

The platform remains pre-alpha / Phase 7. Existing owner approvals, manual accessibility/device/public-asset gates, AetherFlow M08 matching-runner benchmark, and all other upstream-project release gates remain open. No upstream project repository or live backend was changed.

## Latest checkpoint — P7-28 complete; AetherFlow product-page visual published (2026-11-10)

PR [#55](https://github.com/pooya-labs/pooya-labs-platform/pull/55) merged to `main` as [`463501c`](https://github.com/pooya-labs/pooya-labs-platform/commit/463501cb94d1e36c6062535d6596f876036b87cd). AetherFlow's Persian and English product case-study pages now show its approved desktop product-page screenshot in the hero instead of the abstract/logo-like motion scene. The homepage card continues to use AetherFlow's own mark, and the full desktop/mobile capture gallery remains below the hero.

The screenshot is served locally from the Pages site under `/pooya-labs-platform/interface-captures/aetherflow/aetherflow-fullpage-desktop.png`, with its source pinned to immutable capture commit `eba5e2d02047375ae8a42514f7bbb58c75106ba7`. The Pages cleanup now keeps only referenced local captures and prunes unused copies. Build contracts verify the retained file is a valid 1440×3241 PNG; browser QA verifies the screenshot loads in both locales and retains localized alt text.

Exact PR-head CI [42794855912](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42794855912) and Browser QA [42794856114](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42794856114) passed. Post-merge main CI [42795404398](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42795404398), Browser QA [42795404244](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42795404244), and GitHub Pages deployment [42795404445](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42795404445) passed on the exact merge commit.

Cloudflare's production deploy job was skipped after credential preflight in run [42795404418](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42795404418); Apps Script publishing was skipped after configuration preflight in run [42795404647](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42795404647). Only the GitHub Pages deployment is confirmed by this merge.

The platform remains pre-alpha / Phase 7. All owner approvals and manual accessibility/device/public-asset gates remain open; AetherFlow's M08 matching-runner benchmark remains an independent project gate. No upstream project repository or live backend was changed.

## Latest checkpoint — P7-27 complete; PR #53 merged (2026-11-10)

PR [#53](https://github.com/pooya-labs/pooya-labs-platform/pull/53) merged as [`1ba198d`](https://github.com/pooya-labs/pooya-labs-platform/commit/1ba198d1293305c9b0a64c91746989570f952ec2). Exact PR-head Repository CI [42786194427](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42786194427) and Browser QA [42786194426](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42786194426) passed. Post-merge Repository CI [42787101089](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42787101089), Browser QA [42787100812](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42787100812), and GitHub Pages deployment [42787100804](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42787100804) also passed on the exact merge commit.

**Completed at the portfolio layer:** all eight homepage project cards link to their own demo, source repository, and bilingual internal case study; all eight have localized visual artwork, source-backed bilingual dossiers, architecture diagrams, and static Persian/English case-study routes. AetherFlow now uses its own favicon-derived SVG mark on the homepage, and its approved desktop/mobile full-page evidence is verified in the bilingual static case-study build.

**Not deployed in this merge:** Cloudflare production deployment job was skipped in run [42787100754](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42787100754), and Apps Script publishing was skipped in run [42787101214](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42787101214). GitHub Pages is the host updated by this merge. No independent project repository was changed.

**Remaining Phase 7 gates:** binary/public-asset review and Salon Booking owner permission; manual contrast/focus/keyboard/screen-reader review; physical Android/browser acceptance; owner approval of biography, featured order, role wording, all project copy/media, and Novels decision; authenticated social-cache validation; Cloudflare Git-trigger / credential setup and Apps Script publishing configuration; controlled rollback rehearsal. AetherFlow M08's matched EPYC 9V45 benchmark, ORBIT's unpromoted Keycloak image, and GlobalCart's stale FX snapshot remain upstream-project gates.

No application-source import, live API/backend embedding, Phase 8 redesign, Phase 9 deep integration, or Phase 10 V1 release is claimed. Keep deeper integrations deferred under ADR-0001 until the standalone V1 sequence and owner gates are satisfied.

## Latest checkpoint — PR #50 merged; P7-26 complete (2026-11-10)

PR [#50](https://github.com/pooya-labs/pooya-labs-platform/pull/50) merged as [a804267](https://github.com/pooya-labs/pooya-labs-platform/commit/a8042675b76e1785865b1956fb8904db788e0b2d). Its exact-head Repository CI [42727164323](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42727164323) and Portfolio Browser QA [42727164249](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42727164249) both passed. The changes are documentation/state-only; there is no new app deployment.

**Preserved boundaries:** main uses active ruleset 26861856; ORBIT's patched Keycloak image is published and scanned but not promoted; GlobalCart's FX snapshot remains freshness-unverified; AetherFlow M08/matched-runner benchmark remains open. The asset preflight is preliminary only: binary image payloads were not re-opened, and Salon Booking owner permission remains pending.

**Remaining Phase 7 gates:** manual contrast/focus/keyboard/screen-reader review; physical Android/browser acceptance; owner approval of biography, order, contributions, media and Novels; Salon Booking permission; authenticated social-cache validation; Cloudflare Git-trigger / Apps Script publishing decisions; controlled rollback rehearsal.

Do not begin Phase 8 redesign, Phase 9 integration, or Phase 10 V1 publication until mandatory gates close.

## Latest checkpoint — PR #50 merged; P7-26 documentation work complete (2026-11-10)

PR [#50](https://github.com/pooya-labs/pooya-labs-platform/pull/50) merged as [a804267](https://github.com/pooya-labs/pooya-labs-platform/commit/a8042675b76e1785865b1956fb8904db788e0b2d). Exact PR-head Repository CI [42727164323](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42727164323) and Portfolio Browser QA [42727164249](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42727164249) passed on e58f284. The PR was documentation/state-only and did not publish a new application build.

**Current technical facts:** main's active PR/check ruleset and GitHub App publisher boundary are accurately documented; the owner packet reflects current AetherFlow/ORBIT/GlobalCart source facts; the preliminary static file/link check has been recorded. Binary PNG contents were not independently re-opened in this pass. The two Salon Booking captures remain customer-facing only, but the salon owner's separate public-use permission is still pending.

**Remaining Phase 7 gates:** manual contrast/focus/keyboard/screen-reader review; physical Android/browser acceptance; explicit owner approval of the homepage, eight project descriptions/roles/media and Novels decision; Salon Booking owner permission; authenticated social-cache checks; Cloudflare Git-trigger remediation; Apps Script production configuration; and controlled rollback rehearsal.

Do not begin Phase 8 redesign, Phase 9 project integration, or Phase 10 V1 publication until the mandatory gates close.

## Latest checkpoint — P7-26 preliminary asset/link preflight (2026-11-10)

The read-only source-tree/link preflight found no sensitive credential-like filenames, verified HTTPS for all 17 project registry destinations and `rel` attributes on all 16 new-tab anchors, and confirmed the Novels catalog remains empty. The only Salon Booking assets in the public capture directory are two customer-facing full-page PNGs; their existing manifest records privacy review, but not the salon owner's separate permission.

The binary PNG payloads were not independently re-opened in this pass. Keep the full public/private asset review open; do not treat filename scanning or manifest metadata as proof that no personal data appears inside an image.

**Next:** continue manual/binary asset review and resolve the Salon Booking owner permission. Then proceed with remaining human accessibility/device, owner-content, authenticated social-cache, deployment, and rollback gates. Phase 8/9 and V1 remain blocked.
## Latest checkpoint — P7-26 security and owner packet corrected (2026-11-10)

A targeted review found stale governance and source facts in two documents. [SECURITY-MODEL.md](SECURITY-MODEL.md) now reflects the active main ruleset and App-based screenshot PR workflow. [OWNER-REVIEW-PACKET.md](OWNER-REVIEW-PACKET.md) now reflects the latest read-only AetherFlow, ORBIT and GlobalCart source evidence while explicitly preserving the owner's approval gate.

**Important boundaries preserved:**
- Main requires a PR plus both strict checks under ruleset 26861856. The negative pending/failed-check path remains untested.
- Reviewed screenshot publishers create PRs through the repository-scoped GitHub App; no direct-to-main writes remain. Do not fabricate a capture diff.
- ORBIT's patched Keycloak digest is published and cleanly scanned on both architectures, but production Compose is still 26.8.1.
- GlobalCart's new FX snapshot timestamp regressed and its commit skipped CI; do not present it as a current quote.
- All eight project descriptions/media remain awaiting owner review. Salon Booking permission is still pending.

**Next:** continue the remaining public/private binary-asset and external-link safety review; do not mark it complete based only on a pattern-based text secret scan. Preserve the manual accessibility/device and authenticated social-cache gates.

## Latest checkpoint — PR #48 merged; P7-25 complete (2026-11-10)

PR [#48](https://github.com/pooya-labs/pooya-labs-platform/pull/48) merged as [`b3e548e`](https://github.com/pooya-labs/pooya-labs-platform/commit/b3e548ead98103535e7524bf550b7d6689d30720). Exact PR-head checks passed: Repository CI [42723838058](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42723838058) and Portfolio Browser QA [42723837697](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42723837697), on `1c2f11e`. The PR is documentation/state-only; no new app deployment is claimed.

The eight-project source-of-truth audit is current as of 2026-11-10. No upstream project repository was modified. Key carry-forward facts: AetherFlow M08 and its matched-runner benchmark remain open; ORBIT's patched Keycloak digest is published and scanned but not promoted into production Compose; GlobalCart's latest FX snapshot is not freshness-verified and has no verified deployment.

**Next actions remain the Phase 7 exit gates:**
1. Finish manual contrast, visible-focus, keyboard-only and screen-reader review in Persian/English and both themes; the 36 incomplete Axe contrast checks are not passes.
2. Complete the physical Android/browser review.
3. Obtain owner approval for biography, featured order, role/contribution wording, contacts, public media and the Novels decision.
4. Obtain Salon Booking owner's explicit permission for any customer-facing case-study media.
5. Validate social cards with authenticated LinkedIn/Meta sharing tools and record actual cache refreshes.
6. Keep Cloudflare Git-integration changes, Apps Script production credentials and rollback rehearsal owner-gated.
7. After Phase 7 exits, complete Phase 8 redesign/approval, Phase 9 project integration, then Phase 10 V1 hardening.

**Current release:** pre-alpha / Phase 7. No V1 tag or public release is claimed.

## Latest checkpoint — P7-25 read-only source refresh (2026-11-10)

The platform's latest main checkpoint before this docs-only refresh is [`b1db0ccc`](https://github.com/pooya-labs/pooya-labs-platform/commit/b1db0ccc0b0d2f554338ef0553af342f8c72fd48). The eight independent upstream repositories were rechecked read-only; none was modified. The current source-of-truth inventory is [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md).

**Corrections to carry into future portfolio work:**
- AetherFlow PR #19/#20 are merged; latest application code is `5cc44c1`, including bounded 2 MiB streamed CLI responses. M08 and the matched-runner benchmark remain open.
- ORBIT PR #138 is merged and its patched Keycloak 26.8.2 digest passed strict AMD64/ARM64 scans. Production Compose still uses Keycloak 26.8.1; do not describe the patched digest as deployed.
- GlobalCart's latest FX-only commit `2ef95fa` has an older embedded source timestamp than the preceding snapshot and skipped CI. Treat the quote as freshness-unverified; no deployment of that snapshot is established.
- The other five repositories have no newer main commit in this audit. Their portfolio acceptance is still not owner-approved.

**Next work, in dependency order:**
1. Close the human accessibility review in Persian/English and both themes: inspect the 36 incomplete Axe contrast items, visible focus, keyboard-only operation, and screen-reader flow.
2. Complete Pooya's physical Android/browser review; emulation is not a substitute.
3. Obtain explicit owner approval for biography, featured-project order, role/contribution wording, contact choices, public media, and the Novels decision.
4. Obtain Salon Booking owner's explicit permission before publishing any customer-facing case-study media; use only approved synthetic/redacted material.
5. Validate representative social cards in authenticated LinkedIn and Meta sharing tools and record actual cache refresh results; User-Agent simulations do not establish this.
6. Keep Cloudflare Git-integration remediation, Apps Script production settings, and rollback rehearsal owner-gated. Do not change credentials/settings or perform a destructive production action without approval.
7. Only after Phase 7 exits, proceed to Phase 8 redesign and approval, then Phase 9 project integration, then Phase 10 V1 hardening/publication.

**Current release:** pre-alpha / Phase 7. No V1 tag, redesign start, or new production deployment is claimed by this source-audit refresh.
## Latest checkpoint — repeatable social-crawler QA merged and verified on main (2026-11-09)

PR [#46](https://github.com/pooya-labs/pooya-labs-platform/pull/46) adds a repeatable Chromium regression gate for social-preview metadata. It was squash-merged as main commit [`5321d3f44298a9d81d3fbc8f0712d4bc9acb8962`](https://github.com/pooya-labs/pooya-labs-platform/commit/5321d3f44298a9d81d3fbc8f0712d4bc9acb8962). The four changed files are the Browser QA script, its contract test, the Phase 7 roadmap, and the new [SOCIAL-CRAWLER-QA.md](SOCIAL-CRAWLER-QA.md) runbook. No React/UI source, credentials, Cloudflare settings, Apps Script configuration, or independent project repository was changed.

**Exact-head verification:**
- PR #46 Repository CI [42666346758](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666346758): passed.
- PR #46 Browser QA [42666347072](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666347072): passed; 18/18 routes, 36/36 viewport checks, 34/34 social-crawler checks across two User-Agent strings, zero failures, zero confirmed Axe violations, and 36 incomplete contrast checks retained for human review.
- Post-merge main Repository CI [42666914377](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914377): passed on exact main `5321d3f`.
- Post-merge main Browser QA [42666914164](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914164): passed on exact main `5321d3f`; artifact [13697461514](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914164/artifacts/13697461514). The main run also completed local, GitHub Pages, and Cloudflare Pages performance measurements with zero workflow failures.
- GitHub Pages deployment [42666914116](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914116): build and deploy passed on exact main `5321d3f`; artifact [13696229308](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914116/artifacts/13696229308).

**New repeatable gate:** the Browser QA workflow reads raw static HTML under `LinkedInBot/1.0` and `facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)` across the homepage and all eight Persian/English case-study routes (17 routes × 2 User-Agents = 34 checks). It validates title/description, canonical and `og:url` parity, and the local build's OG PNG response, signature and 1200×627 dimensions. The test checks the PR's own locally generated assets and runs on PRs as well as main. See [SOCIAL-CRAWLER-QA.md](SOCIAL-CRAWLER-QA.md).

**Publishing boundaries:** GitHub Pages was redeployed successfully from main `5321d3f`. The Cloudflare workflow [42666914099](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914099) passed its credential check but skipped the actual deployment because the private `CLOUDFLARE_API_TOKEN` is absent. The latest verified Cloudflare production deployment therefore remains [`ed73cc8e`](https://ed73cc8e.pooya-labs-platform.pages.dev/) from application source `e5ef6389`. The Apps Script workflow [42666914071](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42666914071) passed its configuration check but skipped the stable Web App publish because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are not configured. No private setting or secret was changed.

**Remaining Phase 7 gates:**
1. Use authenticated LinkedIn Post Inspector and Meta Sharing Debugger to inspect cached cards and request refresh where available. User-Agent simulation is not platform authentication and does not prove cache refresh.
2. Complete human contrast, visible-focus, keyboard-only and screen-reader review in Persian/English and both themes. The 36 incomplete Axe contrast checks are not passes.
3. Confirm on a physical Android device and representative browser/network.
4. Obtain owner approval for biography, featured-project order, contribution/role wording, public media, contact choices, and the empty/populated Novels decision. Obtain Salon Booking owner's permission for any public customer-facing case-study media.
5. Resolve Cloudflare native Git-push deployment triggering only with owner approval; the matching-path PR #39 did not produce a `github:push` deployment. Do not change integration settings or secrets here.
6. Restore Apps Script stable production publishing only when the owner provides/configures the required private deployment settings.
7. Rehearse static-host rollback only in an explicitly owner-approved controlled window; no destructive rollback has been performed.

Current release remains **pre-alpha / Phase 7**. Do not begin Phase 8, Phase 9 or V1 until all mandatory exit gates are closed.
## Latest checkpoint — contrast fix is live; remaining gates are external and owner-reviewed (2026-11-09 16:58 UTC)

PR [#43](https://github.com/pooya-labs/pooya-labs-platform/pull/43) merged as current main `e5ef638917d3204025d062af939cf01a28689d3a`. It improves the final light-theme `--pf-dim` token from `#728076` to `#58675e` and adds a numeric contrast test. PR CI [42659360542](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659360542) and Browser QA [42659360713](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659360713) passed. Post-merge main CI [42659840758](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840758) and Browser QA [42659839780](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659839780) passed.

Both public static hosts now serve the same application source revision `e5ef6389`: GitHub Pages deployment [42659840309](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840309), artifact `13693239378`; Cloudflare deployment [`ed73cc8e`](https://ed73cc8e.pooya-labs-platform.pages.dev/) (ID `ed73cc8e-7fcb-42b7-8ca0-b6e591f9f160`), all five stages successful. Live CSS checks on both hosts returned HTTP 200 and confirmed the updated token with the prior value absent. Tested contrast ratios are 5.08–5.96:1. This closes the specific secondary-text token defect, not the complete human contrast/accessibility gate.

**Next actions:**
1. Validate representative Open Graph cards with authenticated LinkedIn/Facebook sharing debuggers and refresh caches where possible.
2. Complete human contrast, visible focus, keyboard-only and screen-reader review in Persian/English and both themes. Review every incomplete Axe contrast item; the new numeric test covers only the final secondary-text token.
3. Confirm on a physical Android device and representative browser.
4. Obtain owner approval for biography, featured-project order, role/contribution wording, images/media, and whether Novels remains empty. Obtain Salon Booking owner's permission for client-owned or sensitive case-study media.
5. Resolve Cloudflare native Git-push triggering. The API deployment works, but no `github:push` deployment has been observed. Reinstalling the Cloudflare Workers and Pages GitHub App may interrupt the integration and still requires explicit owner approval.
6. Restore Apps Script production publishing. Run [42659840240](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42659840240) passed configuration checking but skipped the publish job; no new stable Web App version is verified.
7. Rehearse static-host rollback only in an explicitly owner-approved controlled window.

Do not start Phase 8 or tag V1 until mandatory Phase 7 gates close. Current release: **pre-alpha / Phase 7**.

## Latest checkpoint — live SEO endpoints verified; remaining work is external and owner-gated (2026-11-09 16:48 UTC)

The GitHub Pages and Cloudflare Pages `robots.txt` and `sitemap.xml` response bodies have now been read from the live hosts through Cloudflare Browser Rendering. All four returned HTTP 200. Both robots files are plain text, allow `/`, and point to their corresponding same-host sitemap. Both sitemaps return `application/xml`, parse as a valid `urlset`, have no parser errors, contain exactly 17 `loc` entries, and keep every URL on their own canonical host. The live response-body SEO gate is closed; external LinkedIn/Facebook crawler and cache validation is still separate and open.

PR #41 is merged as main `b1c0ee7`; its exact-head CI and Browser QA passed, and post-merge main Repository CI [42657496037](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42657496037) passed. The owner-exclusive platform boundary is now in the bilingual policy and ownership register. App source deployed on both static hosts remains revision `97094ed0`; the merged ownership changes and this state refresh are documentation-only.

**Next actions:**
1. Validate representative Open Graph cards through authenticated LinkedIn/Facebook crawlers and refresh caches where needed.
2. Complete human contrast, keyboard-only, and screen-reader review in Persian/English and both themes; confirm on a physical Android device.
3. Obtain owner sign-off for biography, featured-project order, roles/contributions, images/media, and whether the Novels library remains empty. Obtain Salon Booking owner's permission for sensitive/client-owned public case-study media.
4. Resolve Cloudflare's native Git-push integration. Read-only API confirms the expected source, `main`, enabled production deployments, and path filter, but matching-path PR #39 did not create a `github:push` deployment. Cloudflare documents checking **Settings → Builds → Manage under Git Repository** and verifying/reinstalling the Cloudflare Workers and Pages GitHub App. Reinstallation may interrupt the connection and requires explicit owner approval; no change was made.
5. Restore Apps Script production publishing. Run [42651297282](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297282) passed its configuration check but skipped the publish job; no new deployment is verified.
6. Rehearse the documented static-host rollback only in an explicitly owner-approved controlled window.

Do not begin Phase 8 or tag V1 until mandatory Phase 7 gates close. Current release: **pre-alpha / Phase 7**.

## Latest checkpoint — P7-18 merged; next work is external and owner-gated (2026-11-09 16:43 UTC)

PR [#41](https://github.com/pooya-labs/pooya-labs-platform/pull/41) merged as main `b1c0ee7d49b7977d86d7d6029c3f0d44737642fc`. Its Repository CI [42656627537](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42656627537) and Browser QA [42656627378](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42656627378) passed on the exact PR head; post-merge Repository CI [42657496037](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42657496037) passed on exact current main. PR #29 was closed as superseded. Owner-exclusive Pooya Labs Platform scope is now in the bilingual policy, ownership register, README, roadmap, and machine-readable state.

**Next actions, ordered by dependency:**
1. Obtain owner permission for the Cloudflare GitHub App integration remediation. Read-only API confirms the expected source repository, `main` production branch, enabled production deployment, and `apps/platform/**` path filter. The matching-path PR #39 still did not trigger deployment. Cloudflare's documented troubleshooting route is **Workers & Pages → project → Settings → Builds → Manage under Git Repository**; reinstalling the Cloudflare Workers and Pages GitHub App may disrupt the integration, so do not uninstall/reinstall without explicit approval. See [Cloudflare Git integration troubleshooting](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/).
2. Re-attempt direct GET response-body verification for live `robots.txt` and `sitemap.xml` on GitHub Pages and Cloudflare Pages. Previous external fetch attempts were inaccessible; do not mark these endpoints verified from build contracts alone.
3. Validate representative social cards using authenticated LinkedIn/Facebook crawler tools and refresh caches where necessary.
4. Complete human contrast, keyboard-only, and screen-reader review in Persian/English and both themes; confirm on a physical Android device.
5. Obtain owner sign-off for biography, featured-project order, project roles/contributions, images/media, and whether the Novels library remains empty. Obtain Salon Booking owner's permission for any sensitive/client-owned public case-study media.
6. Resolve the Apps Script production publish configuration. Current run [42651297282](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297282) passed its configuration check but skipped the publish job; do not claim a new deployment or alter deployment secrets without owner action.
7. Rehearse the documented Pages/Cloudflare rollback only in an explicitly owner-approved controlled window.

Current application artifacts on both static hosts are based on app-source revision `97094ed0`; documentation-only merges do not require redeployment. Do not start Phase 8 or tag V1 until mandatory Phase 7 gates close. Current status: **pre-alpha / Phase 7**.

## Latest checkpoint — Phase 7 remains open; owner-exclusive boundary captured (2026-11-09 16:22 UTC)

Current `main` is `dcc9ec6d445cc51b2dbe5c543c113ad16db1cbe8`; exact-main Repository CI [42653901311](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42653901311) passed. The previous merged docs PR's Browser QA [42653273680](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42653273680) passed on PR #40 head `6a79750d`. Both public static hosts continue to serve application source revision `97094ed0`; subsequent main changes are documentation-only.

The ownership/IP policy and register explicitly record the owner's scope instruction: Pooya Labs Platform is the sole project in this portfolio group intended for Pooya Goodarzi's exclusive ownership, control, direction, and use. This is an owner-intent record, not a legal opinion or a transfer of rights. No reuse license is granted; third-party, upstream, contributor, and client-owned assets remain separately protected. The old PR #29 is stale/unmergeable and will be replaced by a fresh docs-only PR based on current main.

**Next actions, in order:**
1. Complete required CI and Browser QA on the fresh ownership/documentation PR; review the exact diff before any merge.
2. Close the live-host SEO gate with direct response-body checks for `robots.txt` and `sitemap.xml` on both hosts, then validate representative OG cards through authenticated social crawlers and cache refresh.
3. Complete the human gates: contrast, keyboard-only and screen-reader review in Persian/English and both themes; physical Android/browser acceptance; biography, featured-project order, roles/contributions, images and novel-library decision.
4. Obtain explicit Salon Booking owner permission for any public case-study media or attribution beyond already approved material.
5. Rehearse the documented rollback path only with an owner-approved controlled window. No destructive rollback has been run.
6. Resolve the Cloudflare native Git-push trigger without changing credentials/settings until explicitly authorized. The current API fallback is verified; native auto-deploy is not.
7. Treat Apps Script production publishing as unverified: workflow run [42651297282](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297282) skipped the actual publish job. Do not claim a new production version or change private deployment secrets.

Do not start Phase 8 or publish V1 while mandatory Phase 7 exit gates remain open. Current release label: **pre-alpha**.

## Latest checkpoint — both hosts deployed on current main; native Cloudflare push still unverified (2026-11-09 16:12 UTC)

Current `main` is [`97094ed0`](https://github.com/pooya-labs/pooya-labs-platform/commit/97094ed0cb79f65b0e93bf36d52a2520846e6f1b). PR [#39](https://github.com/pooya-labs/pooya-labs-platform/pull/39) merged normally; its only source change is a clarifying comment at Vite's host-specific robots generator. Main Repository CI [42651297246](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297246) passed.

**Both public hosts now serve the exact same main application source commit:**
- GitHub Pages workflow [42651297113](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297113) passed Build and Deploy on `97094ed0`; Pages artifact `13690386196`; canonical URL [pooya-labs.github.io/pooya-labs-platform](https://pooya-labs.github.io/pooya-labs-platform/).
- Cloudflare Pages production deployment [`a075e139`](https://a075e139.pooya-labs-platform.pages.dev/) (ID `a075e139-20d1-4587-91a9-b73904499065`) passed all five stages on exact main `97094ed0`; canonical alias [pooya-labs-platform.pages.dev](https://pooya-labs-platform.pages.dev/). This deployment was explicitly created through the authorized Cloudflare API as `ad_hoc`.
- Browser QA [42651297251](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297251) passed 18/18 routes and 36/36 viewports, zero failures and zero confirmed Axe violations; artifact [13690630887](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297251/artifacts/13690630887). p75 LCP: 228 ms local, 284 ms Pages, 384 ms Cloudflare; CLS 0.000 on all three.

**Cloudflare automation finding:** PR #39 changed `apps/platform/vite.config.ts`, matching the connected Pages project's `apps/platform/**` path filter. After the merge, Cloudflare did not create a new `github:push` production deployment; its latest was still `76da3cc2`. Manual API deployment `a075e139` brought it to current main. Separately, GitHub Cloudflare workflow [42651297288](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42651297288) passed its credential check but skipped actual publish because the private `CLOUDFLARE_API_TOKEN` secret is absent. Do not change secrets or connection permissions without Pooya's explicit action. The native Git trigger is not proven operational and must not be called automatic.

**Next Phase 7 work:** retrieve the live `robots.txt`/`sitemap.xml` response bodies once Browser Rendering rate limits clear; test representative share cards with authenticated LinkedIn/Facebook crawlers when owner access is available; complete public file/privacy/external-link review; and keep production rollback rehearsal pending unless owner approves a controlled rehearsal. The Vite generation and multi-host contract already verify 17 canonical sitemap URLs and host-specific robots targets in both build outputs.

**Owner/device gates remain open:** manual contrast, keyboard and screen-reader review; physical Android/browser acceptance; biography/project order/contribution/media approval; Salon Booking privacy permission. Do not begin Phase 8 or claim V1 while any Phase 7 gate remains open. Release remains **pre-alpha**.

## Previous checkpoint — PR #36 governance and upstream source audit (2026-11-09)

The active `main` ruleset [Protect main — PR + CI](https://github.com/pooya-labs/pooya-labs-platform/rules/26861856) was exercised through the normal connector path. PR [#36](https://github.com/pooya-labs/pooya-labs-platform/pull/36) was created from a working branch after ruleset activation; both exact required checks passed on PR head `2b56ce1`: Repository CI [42642712582](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42642712582) and Browser QA [42642712314](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42642712314). Browser QA passed 18/18 routes and 36/36 viewports with zero failures and zero confirmed axe violations; 36 incomplete contrast checks remain for human review. The report artifact is [13685757493](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42642712314/artifacts/13685757493). The PR squash-merged as [`82f975a`](https://github.com/pooya-labs/pooya-labs-platform/commit/82f975a81e352354bbab1995721ae7ba101d4c02), and post-merge Repository CI [42643318377](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42643318377) passed on that exact main commit.

The ruleset remains active, targets only `refs/heads/main`, and has an empty bypass list. GitHub reports `main` as protected. The positive PR/check/normal-merge path is now verified for both the repository connection and, separately, the dedicated capture App (PR #34). No direct push or bypass was used. No deliberately failing PR was created, so negative pending/failed-check blocking has not been explicitly exercised.

A fresh read-only source audit for all eight independent repositories is recorded in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md), reviewed 2026-11-09 15:25 UTC. Important corrections: GlobalCart's latest main `1c3d27f` is now deployed with live-catalog, visual, and Lighthouse checks passed; AetherFlow's comparator hardening PR #14 and exact-main checks passed while matching-runner benchmark evidence remains open; ORBIT PR #138 remains open because its deferred Keycloak scan reports HIGH CVE-2026-102554 in Guava 33.6.0-jre despite patched candidate architecture builds passing. The other five projects have current ownership documentation and successful exact-head build/deploy checks.

**Next Phase 7 task:** complete the remaining autonomous public-site SEO/social-preview and deployment/rollback evidence where externally accessible, then close the owner/device/accessibility inputs only with real review evidence. Human contrast, keyboard/screen-reader, physical Android, biography/project-order/contribution/media approval, Salon Booking privacy permission, and rollback rehearsal remain open. Do not begin Phase 8 redesign until the Phase 7 exit gate is met.

The platform remains **pre-alpha / Phase 7**. No V1 tag, release, or new public application deployment is claimed by this documentation-only audit.

## Previous checkpoint — App permission smoke harness merged before owner dispatch (2026-11-09)

PR [#32](https://github.com/pooya-labs/pooya-labs-platform/pull/32) merged as [`7e2e5a2`](https://github.com/pooya-labs/pooya-labs-platform/commit/7e2e5a2ff0e43f46e125e5c63db2d453e9b6bf0c). It adds the manual-only workflow [GitHub App Publisher Permission Smoke](https://github.com/pooya-labs/pooya-labs-platform/actions/workflows/app-publisher-smoke.yml), which uses the dedicated App to create a PR containing only `.github/app-publisher-smoke/latest-run.md`. No application code, public/product screenshots, or deployment is changed.

PR Repository CI [42635400246](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400246) passed 112/112 tests. PR Browser QA [42635400130](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400130) passed 18/18 routes and 36/36 viewport checks, with zero failures and zero confirmed axe violations; 36 incomplete contrast checks remain manual. It collected 20 performance samples per host with zero failures; report artifact [13683600592](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635400130/artifacts/13683600592). Main CI [42635961927](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42635961927) passed on exact main `7e2e5a2`.

**Historical next step at this checkpoint:** run the manual smoke workflow and verify an App-created PR. This was completed by PR #34; see the latest checkpoint above for the merged result. The workflow inventory now contains 11 files. The platform remains **pre-alpha / Phase 7**; no V1 tag or release.

## Latest verified main checkpoint — App activation and publisher smoke runs (2026-11-09)

The owner confirmed the dedicated GitHub App is installed only on `pooya-labs/pooya-labs-platform` and both private Actions secrets are configured. The three manual dispatches completed successfully: reviewed ORBIT interface [42631761203](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42631761203), portfolio captures [42632714049](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42632714049), and full-page captures [42632732364](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42632732364).

All three runs validated their manifests and image integrity, detected the secrets, and successfully created a short-lived GitHub App installation token scoped by the workflow to this repository. Each `create-pull-request` step completed, but its log reported `pull-request-operation = none`: all approved image destinations already matched the files on `main`, so no automation branch or new PR was necessary. No images were changed or published.

This proves the credential and installation-token flow and the no-diff behavior. It does not yet prove a real branch push/PR write or downstream CI and Browser QA on a publisher-generated PR. Do not manufacture a screenshot diff. Use the next genuine owner-approved capture update for that test. The `main` ruleset remains inactive until this proof exists. The public application bundle remains GitHub Pages commit `558970f`; these runs changed no app code or deployment. The platform remains **pre-alpha / Phase 7**, with no V1 tag.

## Latest verified main checkpoint — PR #24 (2026-11-09)

PR [#24](https://github.com/pooya-labs/pooya-labs-platform/pull/24) merged as [`4482c96`](https://github.com/pooya-labs/pooya-labs-platform/commit/4482c96c6a6a8ec2548c8f37210c2f4674f617b2). Merged-main Repository CI [42621840105](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42621840105) passed typecheck, all three build targets, dependency audit, credential scan, and repository contract tests.

PR-head Browser QA [42526817146](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526817146) passed 18/18 routes and 36/36 viewport checks with zero failures and zero confirmed axe violations. Its 36 incomplete axe records are all color-contrast reviews that axe could not resolve because of pseudo-elements, gradients, overlays, or non-text-only elements; they remain manual review items and are not recorded as passes. This Browser QA run belongs to PR head `9f91535`, not the merged main SHA; no new merged-main Browser QA run was observed.

PR #24 changed documentation/state only. The latest verified application deployment remains GitHub Pages run [42526088212](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42526088212) on application commit `558970f`; no new public app deployment is claimed for the docs-only merge. The Cloudflare and Apps Script production jobs remain gated by missing private configuration. Pooya Monogram remains the platform owner mark; the platform is still **pre-alpha / Phase 7**, with no V1 tag.

# Next Task — P7-13 publisher PR-path proof and main governance

**Task ID:** P7-13  
**Checkpoint date:** 2026-11-09  
The latest verified `main` checkpoint is PR #32 at `7e2e5a2` (see the new checkpoint above). The latest confirmed public application bundle remains GitHub Pages commit `558970f`; PR #28 changed workflows/tests only and did not alter or deploy the app bundle.  
**Canonical repository:** `pooya-labs/pooya-labs-platform`

## Owner App activation and smoke verification — 2026-11-09

The owner confirmed the dedicated GitHub App installation is restricted to this repository and the two Actions secrets are configured. The three dispatches above generated valid short-lived App tokens. The PR actions made no write because every approved image destination matched `main`; actual PR creation remains unproven until an authentic approved image change exists.

## Post-merge verification — governance audit (2026-11-09)

PR #22 merged as `a009b4c65b8ea964b4b43f39ed636f86d56ffe33`. PR CI [42524475237](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475237), Browser QA [42524475250](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475250), and post-merge main CI [42524729014](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524729014) passed. The browser report artifact is [13634757460](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42524475250/artifacts/13634757460). Scope remained docs/state only; no public deployment changed.

## GitHub governance audit — 2026-11-09

- Main HEAD: `659189dd99af59154cbfd88ce5f9dcecb23e1e0e`; main CI [42523193131](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42523193131) passed.
- The main branch is currently unprotected and the repository has no rulesets or required status-check contexts.
- All ten Actions workflows were checked for declared token permissions. Validation/capture jobs are read-only; Pages has deployment-only scopes; three artifact publishers have `contents: write` and `actions: read`.
- PR #28 removed direct-to-`main` publisher writes. The owner has since configured the dedicated App and secrets; all three manual dispatches succeeded and created App installation tokens, but no PR was needed because there was no image diff.
- See [GITHUB-REPOSITORY-GOVERNANCE.md](GITHUB-REPOSITORY-GOVERNANCE.md) for evidence, observed check names, and the owner-side setup procedure.

**Next atomic task:** dispatch the merged GitHub App Publisher Permission Smoke workflow from `main`; verify its marker-only App-created PR and passing Repository CI plus Portfolio Browser QA, then merge it and configure/test the `main` ruleset against pending/failed checks. Do not fabricate a screenshot diff; the next genuine owner-approved capture change will separately exercise a real image-publisher PR. Keep Phase 7 open for manual contrast, device, content, crawler, and rollback gates.

## Post-merge verification — 2026-11-09

PR [#18](https://github.com/pooya-labs/pooya-labs-platform/pull/18) merged to main as [`23f1689`](https://github.com/pooya-labs/pooya-labs-platform/commit/23f16896624ef391e284d3579a7f7278f5c8cbaf). Repository CI on the merged main commit [42522790018](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522790018) passed. PR Browser QA [42522600586](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42522600586) passed responsive routes, metadata, keyboard checks, cold-route measurements, and published GitHub Pages/Cloudflare Pages measurements. The merge changed documentation and a contract test only; it did not alter the public app bundle or deploy either host.

## Platform owner identity instruction — 2026-11-09

The platform now uses **Pooya Monogram (پویا مونوگرام)** as its displayed owner identity with the centered black-tile logo on the homepage, bilingual case-study pages, bilingual README blocks, and structured metadata. **Pooya Goodarzi** is credited as creator and maintainer. Browser QA verified the signature and loaded tile on all 18 localized routes with 36/36 viewport checks and zero failures. This is the only newly confirmed public identity item; all eight project review states remain `needs-owner-review`, and the full-site approval and Phase 7–10 gates are unchanged.

## Release order (owner-requested)

1. Finish Phase 7: all autonomous engineering, facts/source audit, accessibility, performance, security/privacy, SEO/social, deployment/recovery, and owner/device readiness preparation.
2. Phase 8 is penultimate: complete redesign of the entire public site, two owner feedback rounds, and explicit approval.
3. Phase 9 is the final implementation stage before publication: recheck and fully integrate all eight independent projects into the approved portfolio. Do not copy source code wholesale; retain repo boundaries unless a separate architecture decision is approved.
4. Phase 10: final V1 hardening and publication.

## Latest read-only source recheck — 2026-11-09 13:07 UTC

The refreshed eight-repository source-of-truth table is in [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). Material deltas: AetherFlow main advanced to `cc56560` with Pages deployed on that exact SHA, while the newest Rust CI was still in progress on its preceding commit and three dependency PRs remain open; ORBIT PR #138 advanced to `37ec149`, its patched candidate matrix has passed both architectures, but the published upstream Keycloak image still fails the strict Guava 33.6.0-jre / CVE-2026-102554 scan and no patched image is published; GlobalCart main advanced to `ffc51c7` with a catalog-only snapshot, while the latest observed Pages deployment is on the preceding `aeb0e20` commit. The other five project main heads showed no newer changes in this inspection. No independent project repository was modified.

## Post-remediation verification checkpoint — 2026-11-08

- PR [#13](https://github.com/pooya-labs/pooya-labs-platform/pull/13) is merged. The hydration-safe case-study fix is on application commit [`045bc845`](https://github.com/pooya-labs/pooya-labs-platform/commit/045bc84526ef823a37599c6790d144d68465d35c); the current `main` also includes a later Persian README documentation commit.
- Repository CI [42513404028](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404028) passed dependency audit, lint/format, TypeScript, all three build targets, and repository contracts.
- Browser QA [42513404040](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404040) attempt 2 passed 18/18 routes and 36/36 viewports, zero failures, and zero confirmed axe violations. 36 incomplete gradient/pseudo-background contrast checks remain for manual review.
- Performance artifact [13630148273](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404040/artifacts/13630148273) reports 20 samples per host and p50/p75/maximum CLS **0.0000** on local build, GitHub Pages, and Cloudflare Pages. See [PERFORMANCE-BUDGET.md](PERFORMANCE-BUDGET.md).
- GitHub Pages deployment [42513404002](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404002) succeeded. Cloudflare production deployment [`592357af`](https://592357af.pooya-labs-platform.pages.dev/) succeeded through the authorized Pages API for the same application commit.
- Cloudflare's GitHub Actions automation still requires the private `CLOUDFLARE_API_TOKEN` secret. Apps Script publishing remains skipped until `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are configured; do not represent the Apps Script Web App as updated by this checkpoint.

## Latest verified app/host checkpoint — centered monogram asset (2026-11-08)

- Application asset commit [`41ea1004`](https://github.com/pooya-labs/pooya-labs-platform/commit/41ea1004433196aa81e4e50b17a1620f110ecea8) adds the centered rounded black-tile Pooya Labs monogram asset. GitHub Pages build and deployment [42514976384](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976384) succeeded on that exact commit.
- Browser QA [42514976406](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406) completed successfully: 18/18 routes, zero failures, zero confirmed Axe violations, and 36 incomplete color-contrast checks retained for human review. Artifact: [13631024148](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406/artifacts/13631024148).
- The same run measured 20 cold-context samples per host. p75 CLS was 0.0000 on local build, GitHub Pages, and Cloudflare Pages. p75 LCP was 316 ms local, 400 ms GitHub Pages, and 400 ms Cloudflare Pages. Full navigation/resource figures are recorded in [PERFORMANCE-BUDGET.md](PERFORMANCE-BUDGET.md).
- Repository CI [42515288490](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42515288490) passed on current documentation head `a37de4cf`.
- Cloudflare production deployment [`107de2a2`](https://107de2a2.pooya-labs-platform.pages.dev/) (ID `107de2a2-d69c-4b9d-ae2c-38da68c7bad4`) was verified through the Cloudflare API on current `main` commit `a37de4cf21bc5e41f8fca9ea08ba6d6dfd350b67`; its queue, initialization, clone, build, and deploy stages all succeeded. This commit includes the `41ea1004` monogram-tile asset, so both public hosts now contain the current platform asset revision. The GitHub Actions Cloudflare publish workflow remains separately credential-gated by the private `CLOUDFLARE_API_TOKEN` secret; automatic push-triggered publishing is not yet proven.
- Apps Script workflow [42514976476](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976476) passed its configuration-check job but skipped the actual publish job because `CLASPRC_JSON`, `CLASP_JSON`, and `GAS_DEPLOYMENT_ID` are not configured. This does not block the static portfolio.


## Security automation checkpoint — 2026-11-08

- PR [#15](https://github.com/pooya-labs/pooya-labs-platform/pull/15) adds a dependency-free credential scanner for tracked UTF-8 files and both generated public bundles.
- Repository CI [42517885668](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42517885668) passed on PR head `e7b5d2e4a592700ea309ff55f4428947cd7e2816`: dependency audit **0 vulnerabilities**, three build targets successful, credential scan **no recognized matches**, contract tests **101/101**.
- The scan reports only path/line/rule, not secret values. It does not scan binary contents or Git history and is not exhaustive; these limitations are in [SECURITY-MODEL.md](SECURITY-MODEL.md).
- Continue the broader Phase 7 review: manual public/private asset boundary review, workflow/deployment permissions, link safety, human contrast/keyboard/screen-reader checks, social crawler validation, rollback rehearsal, and owner/device acceptance.


## Owner review packet prepared — 2026-11-08

- [`docs/OWNER-REVIEW-PACKET.md`](OWNER-REVIEW-PACKET.md) now consolidates the current bilingual homepage copy, project order, status and role wording, contact channels, media inventory, public disclosure boundaries, and the empty Novels decision.
- The packet is prepared but **not approved**. All eight project review states remain `needs-owner-review`; owner decisions on biography/copy, featured order, roles, statuses, public media, Salon Booking permission, and Novels content remain pending.
- PR [#16](https://github.com/pooya-labs/pooya-labs-platform/pull/16) includes the packet and a contract test that guards its coverage and non-approval language.


## Latest owner-review and CI checkpoint — 2026-11-08

- Owner review packet: [`OWNER-REVIEW-PACKET.md`](OWNER-REVIEW-PACKET.md), merged via PR [#16](https://github.com/pooya-labs/pooya-labs-platform/pull/16) at main commit `aca573500192`.
- Latest-head Repository CI [42519333195](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519333195) passed **105/105 tests**, 0 dependency vulnerabilities, all three build targets, and the credential scan. Mainline post-merge CI [42519574691](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519574691) also passed.
- Latest-head Browser QA [42519333196](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42519333196) passed 18/18 routes with zero failures and zero confirmed Axe violations; 36 incomplete contrast checks remain for human review.
- All eight project review states remain `needs-owner-review`; the packet is prepared but not owner-approved. The next practical gate is owner review of the packet plus the remaining physical-device, accessibility, Salon Booking permission, social-preview, deployment-automation, and rollback checks.


## Phase 7 work order

1. Complete repository-level quality, security, dependency, secret/asset boundary, and workflow review.
2. Measure baseline performance and define enforceable budgets; inspect the current browser QA artifacts and resolve reproducible defects.
3. Finish accessibility preparation, including a manual contrast matrix for gradient/pseudo backgrounds and keyboard/focus/screen-reader checks where accessible.
4. Configure the Cloudflare Actions secret privately for repeatable automatic publishing (the current manual Pages API production deployment is verified), decide whether Apps Script publishing is required and supply its three secrets if so, then rehearse rollback/recovery.
5. Verify current SEO/social preview behavior, project links and facts, and prepare the owner approval packet.
6. Collect the physical Android/device and owner/content acceptance inputs required to start Phase 8.

## Boundaries

- No V1 tag, no release claim, and no new design rebuild before the Phase 8 gate.
- No final project content/media import until Phase 9.
- Do not modify independent project repositories during this platform readiness pass unless a concrete blocker is explicitly approved as an upstream task.
- A missing owner approval, physical-device test, private credential, or third-party salon permission must remain an explicit blocker; do not mark it complete on the owner's behalf.

## Active owner-directed redesign — clean current-site baseline (2026-11-11)

- Continue on `redesign/live-site-baseline`, created directly from current `main` commit `f42e9bd889636b87b7deb774b085f3a90ffbd3f4`. Do not use the broken broad prototype preview from PR #70 as the new iteration base.
- Each instruction: make the focused change on this branch, publish a fresh Cloudflare Pages preview from its latest head, and send Pooya the live link for immediate visual feedback.
- Skip interim tests and QA. The preview build/deploy is only to make the actual current website visible; it is not a full validation pass.
- Run the full test, browser, responsive, accessibility, performance, and debugging pass only after Pooya explicitly says **“بازطراحی پایان یافت”**.
- Keep `main` and production unchanged until explicit final approval.
- First change on this branch: light-theme contrast correction for the existing site animations. See `apps/platform/src/portfolio.css` and `docs/CHANGELOG.md`.

## Active owner-directed redesign — Android responsive pass (2026-11-11)

- Android/touch correction is implemented in `apps/platform/src/portfolio.css`: stable small-viewport sizing for the dedicated scroll surface, native pinch zoom, touch-safe anchor/navigation behavior, safe-area-aware sticky header positioning, flatter narrow-screen hero cards, and larger touch targets.
- The desktop composition is unchanged. Review the new Cloudflare Pages preview on Android and report any remaining device-specific visual issue.
- Continue the owner-led iteration loop: no tests or QA until **“بازطراحی پایان یافت”**; no merge to main or production deployment.

## Active owner-directed redesign — mobile foundation animation (2026-11-11)

- The radial foundation artwork below “The foundation behind every project.” now crops and magnifies its centered desktop SVG field on screens up to 680px instead of compressing the entire wide composition.
- The same common lower origin, halo, particles, colors, Bézier fan, and animation timing are shared with desktop; only the mobile viewing frame changes.
- Review the updated preview on Android. Continue the owner-led loop without interim QA until **“بازطراحی پایان یافت”**.

## Active owner-directed redesign — Android project-detail gallery scrolling (2026-11-11)

- Mobile interface captures retain a centered, independently scrollable image viewport.
- Invisible side gutters sit outside the inner image viewport and belong to the main case-study document, so swiping beside the narrow phone screenshot advances the page.
- Desktop and non-touch layouts remain unchanged. Verify the interaction on Android; do not run full tests or QA before **“بازطراحی پایان یافت”** and do not merge to main.

## Latest owner-directed correction — Salon Booking homepage image

- تصویر کارت Salon Booking در بخش Projects صفحه اصلی به تصویر اصلی بالای وب‌سایت شایان سالن (`shayan-hero.webp`) تغییر کرد. تصویر تمام‌صفحه قبلی در گالری مطالعه موردی دست‌نخورده باقی ماند.

- Replaced the Salon Booking homepage Projects-card image with the Shayan Salon website hero asset (`shayan-hero.webp`). The previous full-page capture remains unchanged in the case-study gallery.

**Next:** review the fresh Cloudflare Pages preview on the target device and provide the next focused correction. Do not run tests or QA until «بازطراحی پایان یافت».


## Root-cause correction — Salon Booking homepage image (2026-11-11)

- The prior data-only change did not affect the homepage because the Projects-card JSX preferred `caseStudyHeroAsset` before `visualAsset`.
- Fixed the card renderer in `apps/platform/src/PortfolioHome.tsx` to prefer `visualAsset`; the Salon Booking card now uses `shayan-hero.webp`, while case-study media remains unchanged.
- A fresh preview is required for owner review. No tests or QA before «بازطراحی پایان یافت».


## Follow-up correction — keep other project cards unchanged (2026-11-11)

- The initial renderer priority change affected all project cards. It has been narrowed to `salon-booking` only.
- All other project cards retain the prior `caseStudyHeroAsset`-first behavior. Review the fresh preview; no tests/QA until «بازطراحی پایان یافت».


## Latest owner-directed refinement — dark header glass

- The sticky top bar (brand mark, navigation, language/theme controls, workspace action) now has a more visible translucent graphite/teal glass treatment in dark mode.
- Light mode is unchanged. Preview only; no tests or QA before «بازطراحی پایان یافت».
